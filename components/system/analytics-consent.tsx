'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useMounted } from '@/components/system/client-only';
import Link from 'next/link';

/**
 * Cookie-gated analytics: a small consent banner, then Google Analytics and
 * Microsoft Clarity, only after a visitor accepts.
 *
 * Vercel Web Analytics and Speed Insights (mounted separately in app/layout.tsx) are
 * cookieless and always on — they need no gate. GA4 and Clarity both set cookies and
 * record real behavior (Clarity records session replay), so they wait for consent.
 * app/cookie-policy/page.tsx lists exactly what each one sets; if this file's gating
 * logic changes, that page changes with it.
 *
 * Consent is a single choice stored in localStorage, read only after mount (a
 * server-rendered default of "undecided" would always show the banner). Reject and
 * "no choice yet" both render nothing beyond the banner itself, so nothing loads until
 * a visitor actively accepts.
 */
const CONSENT_KEY = 'camzify-cookie-consent';
type Consent = 'accepted' | 'rejected';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'rejected' ? v : null;
  } catch {
    return null;
  }
}

function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable: the choice only holds for this page view */
  }
}

/**
 * Clears the stored choice and reloads, so the banner asks again. Used by the
 * "change your cookie choice" control on the cookie policy page — withdrawing consent
 * needs to be as easy as giving it.
 */
export function resetConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.location.reload();
}

export function AnalyticsConsent() {
  const mounted = useMounted();
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    if (mounted) setConsent(readConsent());
  }, [mounted]);

  // Nothing configured: no banner to show, nothing to gate.
  if (!GA_ID && !CLARITY_ID) return null;
  if (!mounted) return null;

  if (consent === 'accepted') {
    return (
      <>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        )}
        {CLARITY_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");`}
          </Script>
        )}
      </>
    );
  }

  if (consent === 'rejected') return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-md rounded-xl border border-border bg-card p-4 shadow-2xl sm:inset-x-auto sm:left-6 sm:bottom-6"
    >
      <p className="text-sm font-semibold">Cookies on this site</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        With your permission we&apos;d like to use analytics cookies to see how the site is used, so we can improve it. See the{' '}
        <Link href="/cookie-policy" className="text-primary hover:underline">
          cookie policy
        </Link>{' '}
        for exactly what that sets.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            writeConsent('accepted');
            setConsent('accepted');
          }}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => {
            writeConsent('rejected');
            setConsent('rejected');
          }}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted/40"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
