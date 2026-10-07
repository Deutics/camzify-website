'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useMounted } from '@/components/system/client-only';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeFromPath, LOCALES } from '@/lib/i18n';
import { t } from '@/lib/ui-strings';
import { isProductionHost } from '@/lib/production-host';

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
/**
 * THE SWITCH. false (since 2026-10-08, the business's decision while it checks the
 * analytics): no banner, and Google Analytics and Clarity load on every visit to
 * camzify.com unless the visitor has turned analytics off on the cookie policy page.
 * true: the original behavior, nothing loads until the banner is accepted.
 * Flipping it back to true also needs the privacy and cookie policies' analytics wording
 * restored: both describe the current mode (see git history of 2026-10-08).
 */
export const REQUIRE_CONSENT = false;

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

/** Whether this browser has turned analytics off (stored as a 'rejected' choice). */
export function readAnalyticsOptOut(): boolean {
  return readConsent() === 'rejected';
}

/** Turn analytics off (true) or back on (false) for this browser, then reload. */
export function setAnalyticsOptOut(optOut: boolean) {
  try {
    if (optOut) window.localStorage.setItem(CONSENT_KEY, 'rejected');
    else window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* storage unavailable: nothing to remember */
  }
  window.location.reload();
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
  const locale = localeFromPath(usePathname());
  const c = t(locale).cookies;
  const [consent, setConsent] = useState<Consent | null>(null);
  // Whether this is camzify.com itself, read after mount (window is not available in render).
  const [live, setLive] = useState(false);
  useEffect(() => {
    setLive(isProductionHost(window.location.hostname));
  }, []);

  useEffect(() => {
    if (mounted) setConsent(readConsent());
  }, [mounted]);

  // Nothing configured: no banner to show, nothing to gate.
  if (!GA_ID && !CLARITY_ID) return null;
  if (!mounted) return null;

  // Only the live site loads Google Analytics and Clarity: preview deployments and local
  // builds are the team testing, and counting them skewed both dashboards.
  // No-banner mode: load for everyone on the live site, unless this browser opted out.
  if (!REQUIRE_CONSENT) {
    if (!live || consent === 'rejected') return null;
    return <AnalyticsScripts />;
  }

  // Banner mode: the banner still shows on previews, so it can be checked before a release.
  if (consent === 'accepted') {
    if (!live) return null;
    return <AnalyticsScripts />;
  }

  if (consent === 'rejected') return null;

  return (
    <div
      role="region"
      lang={LOCALES[locale].htmlLang}
      aria-label={c.region}
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-md rounded-xl border border-border bg-card p-4 shadow-2xl sm:inset-x-auto sm:left-6 sm:bottom-6"
    >
      <p className="text-sm font-semibold">{c.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {c.bodyBefore}{' '}
        <Link href="/cookie-policy" className="text-primary hover:underline">
          {c.policy}
        </Link>
        {c.bodyAfter === '.' ? '.' : ` ${c.bodyAfter}`}
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
          {c.accept}
        </button>
        <button
          type="button"
          onClick={() => {
            writeConsent('rejected');
            setConsent('rejected');
          }}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted/40"
        >
          {c.reject}
        </button>
      </div>
    </div>
  );
}

/** Google Analytics and Clarity. Rendered only on the live site, per the rules above. */
function AnalyticsScripts() {
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
