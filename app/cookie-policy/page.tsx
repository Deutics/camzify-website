import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { siteConfig } from '@/lib/site-config';
import { ManageCookiePreferences } from '@/components/system/manage-cookie-preferences';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Checked in code on 2026-09-22, the day analytics were added. Vercel Web Analytics
 * and Speed Insights (app/layout.tsx) are cookieless and always on. Google Analytics
 * and Microsoft Clarity (components/system/analytics-consent.tsx) set the cookies
 * listed below. Since 2026-10-08 (REQUIRE_CONSENT = false) there is no banner: they load
 * on every visit unless the visitor turns analytics off below. If the switch or either
 * service changes, this page changes with it.
 */
const pageMeta = {
  title: "Cookie Policy",
  description: "What the Camzify website keeps in your browser and why, including the analytics cookies it sets and how to turn them off for your browser.",
  path: "/cookie-policy",
};

export const metadata = generatePageMeta({ ...pageMeta });

const UPDATED = '8 October 2026';

const storageItems = [
  { name: 'theme', type: 'Local storage', set: 'When you choose light or dark mode', purpose: 'Remembers the theme you picked so the site does not flash the other one on the next page.', lasts: 'Until you clear it or change it' },
  { name: 'exitModalShown', type: 'Session storage', set: 'When a reminder to book a demo has been shown once', purpose: 'Stops the same reminder appearing again during the same visit.', lasts: 'Until you close the browser tab' },
  { name: 'camzify-maintenance-notice-dismissed', type: 'Session storage', set: 'When you dismiss the maintenance notice', purpose: 'Keeps the notice closed for the rest of your visit.', lasts: 'Until you close the browser tab' },
  { name: 'camzify-cookie-consent', type: 'Local storage', set: 'When you turn analytics off below', purpose: 'Remembers that you turned analytics off on this browser.', lasts: 'Until you clear it or turn analytics back on below' },
];

const analyticsCookies = [
  { name: '_ga', type: 'Cookie · Google Analytics', purpose: 'Distinguishes you from other visitors so page and event counts are accurate.', lasts: '2 years' },
  { name: '_ga_<container-id>', type: 'Cookie · Google Analytics', purpose: 'Holds the state of your current session (per GA4 property).', lasts: '2 years' },
  { name: '_clck', type: 'Cookie · Microsoft Clarity', purpose: 'A persistent ID so Clarity can group session recordings and heatmap data from the same browser.', lasts: '1 year' },
  { name: '_clsk', type: 'Cookie · Microsoft Clarity', purpose: 'Groups multiple page views from one visit into a single session recording.', lasts: '1 day' },
];

const faqs = [
  { question: 'Why does the site use analytics cookies?', answer: 'To understand how the site is used: Google Analytics for traffic, and Microsoft Clarity for session recordings and heatmaps of how pages are actually used. Both run on every visit; turn them off for your browser with the button at the bottom of this page, and neither one runs again in that browser.' },
  { question: 'Does Vercel Web Analytics need my consent too?', answer: 'No, and it stays on whatever you choose below. It is cookieless: it counts page visits in aggregate without a cookie, a persistent ID or anything that identifies your browser across visits. The same is true of Vercel Speed Insights, which measures how fast pages load. Neither can be tied back to you individually, which is why they run without asking.' },
  { question: 'What does Microsoft Clarity actually record?', answer: 'Mouse movement, scrolling, clicks and page navigation, played back as a session recording, plus aggregate heatmaps of where visitors click and how far they scroll. It masks text you type into form fields by default. It does not record audio or video from your device, and it stops running in your browser if you turn analytics off below.' },
  { question: 'Does the hosting provider set cookies?', answer: 'Our hosting provider may set technical cookies needed to serve the site securely, such as for load balancing. They identify a connection, not a person, and are not used by us for anything.' },
  { question: 'How do I clear or change these?', answer: 'Use "Turn off analytics for this browser" below to stop Google Analytics and Clarity; the same button turns them back on. The two session items disappear when you close the tab. The theme preference clears when you clear site data in your browser, or simply pick the other theme.' },
];

export default function CookiePolicyPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Cookie Policy' }]} showCTA={false}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Legal · last checked {UPDATED}</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cookie policy</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">The {siteConfig.name} website uses two kinds of analytics: cookieless traffic and performance measurement that is always on, and cookie-based traffic and session-recording analytics that you can turn off for your browser.</strong>{' '}
            Below is everything the site keeps in your browser, whether it needs your consent, and how to change your mind.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold">Browser storage (no consent needed)</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            These are small flags the site keeps in your browser to behave the way you asked it to. None of them identify you, none are shared with anyone, and the law does not require consent for them.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Set when</th>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                  <th className="px-4 py-3 font-semibold">Lasts</th>
                </tr>
              </thead>
              <tbody>
                {storageItems.map((it) => (
                  <tr key={it.name} className="border-b border-border align-top last:border-0">
                    <td className="px-4 py-3 font-mono text-xs">{it.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.set}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.lasts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 font-display text-2xl font-bold">Cookieless analytics (always on)</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Vercel Web Analytics and Vercel Speed Insights measure page visits and page-load performance in aggregate, without a cookie or any identifier that could tie a visit back to your browser across sessions. Vercel Web Analytics also counts completed form submissions by form name only, never their contents. They cannot recognize you individually, which is why they run without asking.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold">Analytics cookies (on unless you turn them off)</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            These load on every visit unless you have turned analytics off for this browser at the bottom of this page. Google Analytics measures traffic and where visitors come from; Microsoft Clarity records session playback and heatmaps of how pages are actually used. Turn analytics off and none of these are set again.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                  <th className="px-4 py-3 font-semibold">Lasts</th>
                </tr>
              </thead>
              <tbody>
                {analyticsCookies.map((it) => (
                  <tr key={it.name} className="border-b border-border align-top last:border-0">
                    <td className="px-4 py-3 font-mono text-xs">{it.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.lasts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 font-display text-2xl font-bold">What is not on this site</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            No advertising pixels, no ad-network cookies, no cross-site retargeting, no A/B testing service, and no selling or sharing of analytics data with advertisers. The forms on the site send what you type to us by email, which is described in the{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold">Technical cookies from hosting</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            The provider that serves the site may set cookies needed to deliver it securely and reliably. They identify a connection rather than a person and we do not read them. Server logs held by the provider are covered in the privacy policy.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold">Turn analytics off</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            The choice is stored in your browser, not on our servers, so you can change it any time.
          </p>
          <div className="mt-4">
            <ManageCookiePreferences />
          </div>

          <h2 className="mt-12 font-display text-2xl font-bold">If this changes</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Adding anything to this list means updating this page first and, where the law requires, asking before it is set. The date at the top is the day the list was last checked against the site&apos;s code.
          </p>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
