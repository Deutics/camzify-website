import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { MultiSiteMockup } from '@/components/mockups/multi-site-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { Building2, SlidersHorizontal, BarChart3, Camera } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Multi-Site Video Surveillance | Centralised Management",
  description: "Camzify multi-site management: centralised console for cameras, alerts, and patrol compliance across all distributed locations.",
  path: "/platform/multi-site-management",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does adding a site change my license or require a new plan?', answer: 'Adding a site itself doesn\'t consume anything from your plan — the license pool tracked on Plan & Usage is instance- and storage-based, not site-based. Cameras and AI-feature instances at the new site draw from the same account-wide pool, so what you need is enough available instances, not a plan upgrade just to add a location.' },
  { question: 'Can each site have different AI features active?', answer: 'Yes. Across this account, 6 of 9 AI features are active account-wide, but which of those run at any given site is configured independently — a warehouse might run Zone Intrusion and Camera Tampering while a retail site runs Heatmaps instead, based on what each location actually needs.' },
  { question: 'How does compliance or reporting roll up across sites versus stay per-site?', answer: 'Both views exist. Each site keeps its own configuration, cameras, and event history as a distinct record, but the Dashboard and Analytics & Reporting screens can combine every site into one account-wide picture — so a compliance report can be pulled per location or aggregated across all of them depending on what\'s needed.' },
  { question: 'Can a sub-user be scoped to only some sites?', answer: 'Yes — site-level access works alongside permission groups, so a sub-user can be granted visibility into specific sites only, rather than the full set. A guard assigned to Retail - Downtown, for instance, doesn\'t need to see Warehouse - Sector 4 to do their job, and their access can reflect that.' },
  { question: 'What happens operationally when one site loses connectivity while others stay up?', answer: 'The affected site is flagged distinctly rather than blended into the account-wide numbers — its camera-online ratio drops and it shows up clearly in the site list, while the other sites continue reporting normally. See the Live Streaming and Dashboard pages for how a full site outage is surfaced in those views specifically.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Multi-Site Video Surveillance' },
    ]}>
      <FeatureHero
        eyebrow="Centralised Oversight"
        title="Multi-site video surveillance"
        lede={<><strong className="font-semibold text-foreground">Multi-site management in Camzify provides a single console to oversee cameras, detection alerts, and patrol compliance across all locations.</strong> Each site is a separate entity with its own cameras, sequences, and operators, but the parent account has visibility into everything. This account runs 4 sites with 15 cameras configured and 6 of 9 AI features active, and every dashboard, live view, and notification feed can be filtered by site.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/partners/for-security-agencies', label: 'For security agencies' }}
        visual={<div className="overflow-hidden rounded-xl border border-border bg-card">
            <SiteImage
              src="/multi-site-video-surveillance.jpg"
              alt="A laptop showing the Camzify Live Streaming grid with camera feeds grouped across four sites — Warehouse, HQ Campus, Retail Downtown, and Parking Structure B"
              className="w-full"
              width={1229}
              height={692}
              priority
            sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <MultiSiteMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In practice</span>
            <h2 className="mt-2 font-display text-2xl font-bold">How sites are managed together</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, title: 'Centralized multi-site oversight', desc: 'One console rolls up cameras, events, and compliance from every site — 4 sites and 15 cameras on this account, all visible from a single view.' },
              { icon: SlidersHorizontal, title: 'Per-site independent configuration', desc: 'Each site keeps its own cameras, patrol sequences, and operators, configured separately from every other location on the account.' },
              { icon: BarChart3, title: 'Account-wide AI feature rollout tracking', desc: '6 of 9 AI features are active account-wide, with visibility into which sites are running which detection models.' },
              { icon: Camera, title: 'Distributed camera and storage allocation', desc: 'Cameras and storage are allocated from the same account-wide pool, distributed across sites based on where they\'re actually needed.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Adding A Site</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Independent setup, one dashboard</h2>
                <p className="mt-4 text-muted-foreground">
                  A new site is added and configured on its own — its own address, its own cameras, its own patrol
                  sequences and AI-feature selection — without touching how any existing site is set up. Parking
                  Structure B, for example, runs 2 of 3 cameras online independently of how HQ Campus or Retail -
                  Downtown are configured.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Once configured, the new site rolls straight into the same account-wide dashboard, event feed,
                  and notifications as every other location — no separate login, no separate report to pull.
                  Camera counts, 7-day event trends, and AI feature coverage all show up alongside the sites
                  already on the account.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Account Snapshot</span>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Sites', detail: '4 locations, each independently configured' },
                    { label: 'Cameras', detail: '15 configured across all sites' },
                    { label: 'AI Features', detail: '6 of 9 active account-wide' },
                    { label: 'HQ Campus', detail: '4/4 cameras online · 101 events, up 23%' },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div>
                        <div className="text-sm font-medium">{r.label}</div>
                        <div className="text-xs text-muted-foreground">{r.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/platform" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Platform Overview</Link>
              <Link href="/platform/dashboard" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Dashboard</Link>
              <Link href="/platform/user-management" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">User Management</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Book a Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
