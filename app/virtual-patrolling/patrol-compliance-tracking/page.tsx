import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { BarChart3, TrendingUp, ArrowRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Patrol Compliance Tracking | Guard Tour Compliance",
  description: "Track patrol completion rates and compliance scores across all sites. Every round is logged as Completed, Flagged, or Overdue with a compliance percentage.",
  path: "/virtual-patrolling/patrol-compliance-tracking",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What counts as an Overdue round?', answer: 'Overdue means a scheduled round never ran at all — it\'s distinct from Flagged, which means the round did run but at least one checklist item came back Not Compliant. Keeping the two separate makes it obvious whether the problem is a missed patrol or a real failure on site.' },
  { question: 'Can I export compliance data for a specific date range?', answer: 'Yes. Reports can be exported for any custom date range and filtered by site or patrol sequence, so a monthly compliance review doesn\'t require pulling every round the system has ever logged.' },
  { question: 'How is the compliance percentage calculated?', answer: 'It\'s the proportion of compliant checklist items out of the total items checked, calculated per round and rolled up into an aggregate figure across sequences and sites.' },
  { question: 'Can I get alerted when compliance drops below a certain level?', answer: 'Yes. Alert thresholds can be set so that a compliance percentage falling below a chosen level flags on the dashboard, rather than only being visible if someone happens to check the report.' },
  { question: 'Does editing a checklist change historical compliance figures?', answer: 'No. Historical reports retain the checklist and status that were active when that round actually ran, so past compliance figures stay accurate even after the checklist itself is updated.' },
];

export default function ComplianceTrackingPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'Compliance Tracking' },
    ]}>
      <FeatureHero
        eyebrow="Compliance Visibility"
        title="Patrol compliance tracking"
        lede={<>Patrol compliance tracking is the measurement of rounds completed versus rounds scheduled across
            all <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> sequences.
            Every round is logged with a status — Completed, Flagged, or Overdue — and a compliance percentage.
            The dashboard surfaces a single compliance figure across all sites.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/virtual-patrolling/patrol-reports', label: 'Patrol reports' }}
        visual={<HeroPlaceholder label="Compliance · 4 sites" alt="Camzify console illustrating patrol compliance tracking" />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">


          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Why It Matters</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Why compliance tracking matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A scheduled patrol that silently fails to run leaves no obvious signal. Nobody gets an alert when a round simply doesn't happen — the gap only surfaces later, if someone notices footage was never reviewed or an incident report comes up with nothing to reference.</p>
                <p>Tracking compliance by memory or a paper sign-off sheet doesn't scale once there are multiple sequences, shifts, and sites involved, and it can't distinguish a round that happened and found something wrong from one that never happened at all.</p>
                <p>Logging every round's status and compliance percentage against a timestamp turns patrol activity into a number that can be tracked over time — per site, per sequence, or across the whole operation — so a slipping trend shows up on the dashboard well before it becomes an incident.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual variant="flow" caption="Status Determination" alt="Diagram showing how a patrol round's checklist results roll up into a compliance percentage and status" steps={['Round scheduled', 'Did it run on time?', 'Did every item pass?', 'Completed · Flagged · Overdue']} />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">How It's Determined</span>
                <h2 className="mt-2 font-display text-2xl font-bold">How a round's status is determined</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">01</span><span>The round completes and every checklist item's result is collected</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">02</span><span>Compliant items are divided by total items to give the round's compliance percentage</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">03</span><span>If any item came back Not Compliant, the round is marked Flagged</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">04</span><span>If the round never executed by its scheduled time, it's marked Overdue instead</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">05</span><span>The status and percentage are written to the patrol log for that round</span></li>
                </ol>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">What You Get</span>
                <h2 className="mt-2 font-display text-2xl font-bold">What compliance tracking provides</h2>
                <div className="mt-6 space-y-4">
                  {[
                    { title: 'Round status', desc: 'Every patrol is categorised: Completed (all items answered), Flagged (failures found), or Overdue (scheduled round did not execute).' },
                    { title: 'Compliance percentage', desc: 'Per-round and aggregate. Shows compliant items as a proportion of total items checked.' },
                    { title: 'Filterable patrol log', desc: 'Filter by sequence, patrol type (manual or auto), status, and date range.' },
                    { title: 'Dashboard integration', desc: 'The overall patrol compliance percentage appears on the main dashboard alongside camera uptime and AI alert counts.' },
                  ].map((item: any, i: number) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-5">
                      <h3 className="font-display text-base font-bold">{item?.title ?? ''}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item?.desc ?? ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <SectionVisual variant="compliance" caption="Compliance Dashboard" alt="Patrol compliance dashboard showing completion rates, status breakdown, and compliance trends" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual variant="flow" caption="Reporting & Thresholds" steps={['Set a compliance threshold', 'Each round is scored', 'Falls below it?', 'Flagged and exportable']} alt="Configuration screen for exporting compliance reports and setting low-compliance alert thresholds" />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Configuration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Exporting reports and setting thresholds</h2>
                <p className="mt-4 text-muted-foreground">Compliance data isn't only for the live dashboard. Most teams also need to pull it into a broader review process, or get flagged before a shift ends rather than after.</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Compliance reports can be exported for a custom date range, filtered by site or sequence</li>
                  <li className="flex gap-2">• Alert thresholds can be set so a compliance percentage dropping below a chosen level flags on the dashboard</li>
                  <li className="flex gap-2">• Overdue rounds are called out separately from low-compliance rounds, so a missed patrol doesn't get buried in an otherwise healthy score</li>
                  <li className="flex gap-2">• Historical reports keep the checklist and status active at the time, so past exports stay accurate after checklists change</li>
                </ul>
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
              <Link href="/virtual-patrolling/patrol-reports" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Patrol Reports <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/platform/dashboard" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Platform Dashboard <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/platform/analytics-and-reporting" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Analytics <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
