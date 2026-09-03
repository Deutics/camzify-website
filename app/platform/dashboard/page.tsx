import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { DashboardMockup } from '@/components/mockups/dashboard-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Building2, ShieldAlert, ClipboardList, HardDrive } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Video Surveillance Dashboard",
  description: "Camzify dashboard: active sites, camera uptime, AI alerts, patrol compliance, storage, live detection event trends, severity mix, and critical-event queue.",
  path: "/platform/dashboard",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What refresh rates does the dashboard support?', answer: 'The live views (detection events, alert feed) can be set to refresh every 1, 2, 5, 10, 15, or 30 seconds, or every 1 minute — whatever balance of freshness and readability fits how closely you\'re watching it at the time.' },
  { question: 'Can I see data for sub-accounts, or only my own?', answer: 'The Operations Overview toggles between "This Account" and "All Sub-Users Combined," so an account owner can view their own sites in isolation or roll every sub-user\'s sites into one combined picture.' },
  { question: 'What counts toward Retention Coverage?', answer: 'It\'s the number of cameras whose recorded footage currently meets the retention period configured for that camera. A camera drops out of coverage if its actual stored history falls short of its target — usually from a storage cap being reached sooner than expected.' },
  { question: 'How is Patrol Compliance calculated on the dashboard?', answer: 'It\'s the share of scheduled and manual patrol rounds completed today, out of the total scheduled for today across all patrol sequences — the same figure that appears on the Virtual Patrolling page, surfaced here for a quick operational check.' },
  { question: 'Does acknowledging an alert here affect Notifications elsewhere?', answer: 'Yes. Acknowledgement state is shared — acknowledging a critical event from the dashboard\'s queue marks it acknowledged in the Notifications feed too, and vice versa.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Video Surveillance Dashboard' },
    ]}>
      <FeatureHero
        eyebrow="Central Operations Screen"
        title="Video surveillance dashboard"
        lede={<><strong className="font-semibold text-foreground">The Camzify dashboard is the first screen every operator sees: cameras online with uptime percentage, AI alerts across all detection models, patrol compliance, retention coverage, and a critical-event acknowledgement queue.</strong> It combines your own sites with sub-user sites in one combined view when you need it, and refreshes live from every 1 second to every 1 minute.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/platform/live-streaming', label: 'Live streaming' }}
        visual={<ProductShot
            src="/product-dashboard"
            alt="The Camzify Video Surveillance Dashboard showing live stat tiles, detection events, alert feed, site health, and sub-user summary"
            label="Dashboard · Camzify console"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <DashboardMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In practice</span>
            <h2 className="mt-2 font-display text-2xl font-bold">What the dashboard puts on one screen</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, title: 'Site Health at a glance', desc: 'Cameras online, alerts today, and retention status per site — Warehouse, HQ Campus, Retail, Parking, whatever you run.' },
              { icon: ShieldAlert, title: 'Critical queue up front', desc: 'Unacknowledged high-severity detections sit at the top, oldest first, with one-click acknowledge and review.' },
              { icon: ClipboardList, title: 'Patrol status, live', desc: 'Auto-Patrol and manual round counts side by side, with compliance percentage for each, updating as rounds complete.' },
              { icon: HardDrive, title: 'Retention coverage', desc: 'Cameras whose footage currently meets their configured retention target, flagged the moment one falls short.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Everything In One Place</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Part of every patrol</h2>
                <p className="mt-4 text-muted-foreground">
                  This module integrates with <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> to
                  provide a complete operations picture. Patrol results, detection alerts, and platform status
                  all feed into the same console — so a supervisor checking in doesn't need to jump between screens
                  to see whether last night's rounds ran, or which camera just flagged something.
                </p>
                <p className="mt-4 text-muted-foreground">
                  The detection-events panel breaks activity down per AI model, so a spike in one feature — say, camera
                  tampering across a site — is visible immediately rather than buried in a single combined alert count.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Site Health</span>
                <div className="mt-4 space-y-3">
                  {[
                    { site: 'Warehouse - Sector 4', cams: '18 of 20', status: '2 cameras offline' },
                    { site: 'HQ Campus', cams: '24 of 24', status: 'All cameras up' },
                    { site: 'Retail - Downtown', cams: '7 of 9', status: '2 cameras offline' },
                    { site: 'Parking Structure B', cams: '0 of 8', status: 'Site down' },
                  ].map((s) => (
                    <div key={s.site} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div>
                        <div className="text-sm font-medium">{s.site}</div>
                        <div className="text-xs text-muted-foreground">{s.status}</div>
                      </div>
                      <span className="font-mono text-mono-sm text-muted-foreground">{s.cams}</span>
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
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/platform/notifications-and-alerts" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Notifications & Alerts</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Book a Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
