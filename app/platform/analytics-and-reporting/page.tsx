import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { AnalyticsMockup } from '@/components/mockups/analytics-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Gauge, FileDown, Layers } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Video Surveillance Analytics & Reporting",
  description: "Camzify analytics: detection breakdowns by feature and object type, attribute trends, confidence splits, exportable reports.",
  path: "/platform/analytics-and-reporting",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What does "at capacity" mean for an AI feature?', answer: 'It means every licensed camera instance for that feature is actively running — active instances equal the licensed total, like Zone Intrusion at 7/7 or Camera Tampering at 15/15. Adding coverage on more cameras for that feature means licensing additional instances.' },
  { question: 'How often do trend percentages update?', answer: 'The trend shown is the current rolling 7-day event count compared against the 7 days before it, so the percentage moves as each day rolls out of the window and a new day rolls in.' },
  { question: 'Can reports be scheduled, or are they on-demand only?', answer: 'Every breakdown on this screen is exportable on demand — pull it whenever you need it for a shift handoff, a client update, or an audit trail, rather than waiting on a fixed delivery schedule.' },
  { question: 'Can analytics be filtered to one site?', answer: 'Yes. Detection breakdowns can be scoped down to a single site, in addition to slicing by feature, object type, and severity, so a multi-site account isn\'t stuck reading one combined total.' },
  { question: 'Is there a way to compare period-over-period beyond 7 days?', answer: 'The live breakdown here is built around a rolling 7-day window, which is the fastest way to catch a feature drifting toward — or already at — capacity. For a longer comparison, export the data for each period and compare them directly.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Video Surveillance Analytics & Reporting' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Detection Data, Broken Down</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Video Surveillance Analytics & Reporting</h1>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[2fr_3fr]">
            <p className="text-body text-muted-foreground">Camzify analytics provides detection breakdowns by feature, object type, site, and severity. Attribute trends track people vs vehicles with distributions, and the detection-confidence split shows High, Medium, and Low confidence levels across all alerts. Every AI feature also carries its own 7-day event trend against the prior week, plus how many of its licensed camera instances are actively running — so a feature quietly nearing its limit shows up before it becomes a blind spot. All data is exportable.</p>
            <Image
              src="/video-surveillance-analytics-and-reporting.jpg"
              alt="A laptop showing the Camzify Configuration AI Features screen with per-feature active-camera counts and 7-day event trends for Line Intrusion, Zone Intrusion, Heatmap Anomalies, and Camera Tampering"
              className="w-full"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-12">
            <AnalyticsMockup />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, title: 'Per-feature trend visibility', desc: 'Every AI feature shows its own 7-day event count and week-over-week percentage change, not just a combined total.' },
              { icon: Gauge, title: 'Capacity and licensing at a glance', desc: 'Active camera instances against licensed or capacity limits per feature, so a feature nearing its limit is visible before it becomes a blind spot.' },
              { icon: FileDown, title: 'Exportable reports', desc: 'Pull the same breakdown out whenever you need it for a shift handoff, a client update, or an audit trail.' },
              { icon: Layers, title: 'Site and severity breakdowns', desc: 'Slice detection activity by site or by severity to see where activity is concentrated, not just how much of it there is.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Why It Matters</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Trend context, not just a total</h2>
                <p className="mt-4 text-muted-foreground">
                  A raw event count doesn't tell you whether a feature is behaving normally or drifting. Camera Tampering
                  sitting at 228 events with a flat week-over-week trend reads very differently from Heatmap Anomalies
                  jumping 50% — one is steady state, the other is worth a closer look, and the 7-day comparison is what
                  makes that visible at a glance instead of buried in a raw log.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Capacity utilization matters just as much. A feature running at 7/7 or 15/15 active instances has no
                  room left to cover another camera without licensing more — catching that before a rollout stalls is
                  easier than discovering it mid-deployment. This module integrates with{' '}
                  <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>, so
                  detection trends, patrol results, and platform status all feed into the same operational picture.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Capacity Snapshot</span>
                <div className="mt-4 space-y-3">
                  {[
                    { feature: 'Camera Tampering', status: '15/15 · at capacity' },
                    { feature: 'Zone Intrusion', status: '7/7 · at capacity' },
                    { feature: 'Line Intrusion', status: '4/10 · licensed' },
                    { feature: 'Heatmap Anomalies', status: '4/6 · licensed' },
                    { feature: 'PPE Violations', status: '3/6 · licensed' },
                    { feature: 'Fire & Smoke', status: '2/3 · licensed' },
                  ].map((s) => (
                    <div key={s.feature} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div className="text-sm font-medium">{s.feature}</div>
                      <span className="font-mono text-mono-sm text-muted-foreground">{s.status}</span>
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
              <Link href="/platform/license-and-instance-management" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">License & Instance Management</Link>
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
