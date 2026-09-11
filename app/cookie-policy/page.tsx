import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Every item in the table below was checked in code on 2026-09-07. If an analytics
 * or consent tool is ever added, this page changes first.
 */
const pageMeta = {
  title: "Cookie Policy",
  description: "What the Camzify website keeps in your browser and why. No advertising or analytics cookies; a theme preference and two session flags, each listed here.",
  path: "/cookie-policy",
};

export const metadata = generatePageMeta({ ...pageMeta });

const UPDATED = '7 September 2026';

const items = [
  { name: 'theme', type: 'Local storage', set: 'When you choose light or dark mode', purpose: 'Remembers the theme you picked so the site does not flash the other one on the next page.', lasts: 'Until you clear it or change it' },
  { name: 'exitModalShown', type: 'Session storage', set: 'When a reminder to book a demo has been shown once', purpose: 'Stops the same reminder appearing again during the same visit.', lasts: 'Until you close the browser tab' },
  { name: 'camzify-maintenance-notice-dismissed', type: 'Session storage', set: 'When you dismiss the maintenance notice', purpose: 'Keeps the notice closed for the rest of your visit.', lasts: 'Until you close the browser tab' },
];

const faqs = [
  { question: 'Why is there no cookie banner?', answer: 'Because there is nothing to consent to. The site sets no advertising or analytics cookies and does not track you across sites. The three items it keeps in your browser are needed for the site to behave as you asked, which the law does not require consent for.' },
  { question: 'Does the hosting provider set cookies?', answer: 'Our hosting provider may set technical cookies needed to serve the site securely, such as for load balancing. They identify a connection, not a person, and are not used by us for anything.' },
  { question: 'Will this change?', answer: 'If we add an analytics service to understand which pages help readers, this page will list it first and, where the law requires, the site will ask before setting anything. This page carries the date it was last checked.' },
  { question: 'How do I clear these?', answer: 'The two session items disappear when you close the tab. The theme preference clears when you clear site data in your browser, or simply pick the other theme.' },
];

export default function CookiePolicyPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Cookie Policy' }]} showCTA={false}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Legal · last checked {UPDATED}</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cookie policy</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">The {siteConfig.name} website sets no advertising or analytics cookies and does not track you across other sites.</strong>{' '}
            It keeps three small items in your browser so the site behaves the way you asked it to. Each is listed below with what it does and how long it lasts.
          </p>

          <div className="mt-10 overflow-x-auto rounded-xl border border-border">
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
                {items.map((it) => (
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

          <h2 className="mt-12 font-display text-2xl font-bold">What is not on this site</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            No Google Analytics or equivalent, no advertising pixels, no social-media tracking, no session recording, no A/B testing service. The forms on the site send what you type to us by email, which is described in the{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>, and that is the only personal data the site handles.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold">Technical cookies from hosting</h2>
          <p className="mt-4 max-w-prose text-muted-foreground">
            The provider that serves the site may set cookies needed to deliver it securely and reliably. They identify a connection rather than a person and we do not read them. Server logs held by the provider are covered in the privacy policy.
          </p>

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
