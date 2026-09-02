import { generatePageMeta } from '@/lib/page-utils';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { CTABand } from '@/components/layout/cta-band';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { InteractiveChecklistDemo } from '@/components/motion/interactive-checklist-demo';
import { ComparisonTable } from '@/components/content/comparison-table';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import {
  Shield, ArrowRight, Camera, ClipboardCheck, Bell, FileText,
  Route, Clock, CheckCircle, XCircle, BarChart3, Users, Calendar, ShieldAlert,
} from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Virtual Patrolling System | Automated AI Security Patrols",
  description: "A virtual patrolling system runs scheduled AI patrol rounds across your cameras, checking a defined checklist at each point and notifying the assigned guard on failure.",
  path: "/virtual-patrolling",
};

export const metadata = generatePageMeta({ ...pageMeta });

const comparisonRows = [
  { feature: '24/7 coverage without shift changes', camzify: true, competitor: false, traditional: false },
  { feature: 'Per-camera compliance checklist', camzify: true, competitor: false, traditional: false },
  { feature: 'Assigned guard per check point', camzify: true, competitor: true, traditional: false },
  { feature: 'Automated PDF patrol report', camzify: true, competitor: false, traditional: false },
  { feature: 'Timestamped audit trail', camzify: true, competitor: 'Partial', traditional: false },
  { feature: 'Compliance % scoring', camzify: true, competitor: false, traditional: false },
  { feature: 'Scales across multiple sites', camzify: true, competitor: false, traditional: 'Partial' },
  { feature: 'Zero fatigue or human error', camzify: true, competitor: false, traditional: true },
  { feature: 'Cost per site per month', camzify: 'Quoted per camera', competitor: '$3,000–$8,000', traditional: '$50–$200' },
];

const faqs = [
  { question: 'What is virtual patrolling?', answer: 'Virtual patrolling is the practice of running scheduled, AI-driven patrol rounds across your existing cameras. The system follows a defined camera sequence, checks a per-camera compliance checklist, flags failures, notifies the assigned guard, and generates a timestamped PDF report — all without a human operator.' },
  { question: 'How is virtual patrolling different from a guard tour system?', answer: 'Guard tour systems verify that a physical guard visited a checkpoint — typically via NFC tags or QR codes. Virtual patrolling eliminates the guard from the round entirely. The AI checks the cameras on schedule, evaluates compliance, and notifies the responsible person only when something fails.' },
  { question: 'Does virtual patrolling replace security guards?', answer: 'It replaces the routine patrol round — the repetitive walk-and-check that occupies most of a guard\'s shift. Guards are still needed for physical response, but they no longer spend hours walking routes that cameras can check in minutes.' },
  { question: 'What happens when a checklist item fails?', answer: 'The system marks the item as Not Compliant, logs the failure with a timestamp, and sends an automatic notification to the guard assigned to that specific camera. The guard receives a predefined message explaining what was found and what action is expected.' },
  { question: 'Can patrols run automatically?', answer: 'Yes. Auto-Patrol runs on a configured schedule — you set the frequency (e.g. every 2 hours), active hours, and active days. The system steps through each camera in the sequence, evaluates every checklist item, and emails the completed PDF report.' },
  { question: 'What is in the patrol report?', answer: 'The PDF report includes: patrol sequence name, date and time, each camera checked, every checklist item with its compliance status, the camera snapshot each item was judged against, before and after frames on anything fixed during the round, the guard notified on any failure, and an overall compliance percentage for the round. The snapshots are what make the report usable as proof — a reviewer months later can see what the camera showed rather than taking the result on trust.' },
  { question: 'Does virtual patrolling only check what is on the checklist?', answer: 'A manual round does — the operator answers the items in front of them. An automated round does both: it works through the checklist and also assesses each camera for safety and security risks in its own right, raising a critical notification for anything it finds even where no item covered it. That matters because a checklist can only ask what somebody thought to ask when it was written, and the condition that causes an incident is often not on it.' },
  { question: 'Which cameras work with virtual patrolling?', answer: 'Any IP camera that supports RTSP, RTMP or HTTPS — the three connection types Camzify offers, where HTTPS covers both HLS and WebRTC streams. Camzify connects via four ingest paths and auto-detects stream quality. No proprietary hardware is required.' },
];

export default function VirtualPatrollingPage() {
  return (
    <>
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-site px-6">
          <Breadcrumbs items={[{ label: 'Virtual Patrolling' }]} />

          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-mono text-mono-sm uppercase text-primary">Flagship Feature</span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Virtual Patrolling System
              </h1>

              <p className="mt-6 text-body text-muted-foreground">
                A virtual patrolling system is a scheduled, AI-driven process that follows a
                defined camera route across your site, checks a per-camera compliance checklist
                at each point, flags what fails, notifies the guard responsible, and generates
                a timestamped PDF report — all without a human operator stepping through the
                round.
              </p>
              <p className="mt-4 text-body text-muted-foreground">
                Camzify's virtual patrolling module is a fully built, shipping product — not
                a concept, not a roadmap item. It runs scheduled rounds across the cameras you
                already own, produces an auditable compliance record, and delivers the report
                to your inbox. Every round is logged, scored, and exportable.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/book-a-demo"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  Book a Demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/virtual-patrolling/how-it-works"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-accent"
                >
                  How it works
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-card">
              <SiteImage
              src="/Virtual-Patrolling-System-1.jpg"
                alt="A person reviewing the Camzify Virtual Patrolling dashboard on a laptop, showing an active patrol round and camera sequence"
                className="w-full"
              width={1000}
              height={563}
            />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="mx-auto max-w-prose text-center">
              <span className="font-mono text-mono-sm uppercase text-primary">Interactive Demo</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
                Experience a patrol round
              </h2>
              <p className="mt-4 text-muted-foreground">
                Click through three cameras, answer each checklist item, and see the
                compliance report generated at the end.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12">
            <InteractiveChecklistDemo />
          </div>
        </div>
      </section>

      {/* Anatomy of a patrol */}
      <section className="py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">Anatomy of a patrol round</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Every patrol follows the same reliable sequence, whether triggered manually or on schedule.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Route, title: 'Patrol sequence', desc: 'An ordered list of cameras defining the route the patrol follows across the site.' },
              { icon: Camera, title: 'Camera stop', desc: 'At each camera in the sequence, the system pauses and evaluates the assigned checklist.' },
              { icon: ClipboardCheck, title: 'Checklist evaluation', desc: 'Each item is marked Compliant or Not Compliant — gate closed, zone clear, access secured.' },
              { icon: Bell, title: 'Guard notification', desc: 'Non-compliant items trigger an automatic notification to the guard assigned to that camera.' },
              { icon: ShieldAlert, title: 'Risk detection', desc: 'On an automated round the AI also flags safety and security risks it sees at a stop — raising a critical alert even where no checklist item asked about it.' },
              { icon: FileText, title: 'PDF report', desc: 'A complete report lands in your inbox: every camera, every item, every result, timestamped, with the snapshot behind each check.' },
              { icon: BarChart3, title: 'Patrol log', desc: 'Every round is logged with status — Completed, Flagged, or Overdue — and a compliance percentage.' },
            ].map((item: any, i: number) => {
              const Icon = item?.icon ?? Route;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-base font-bold">{item?.title ?? ''}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item?.desc ?? ''}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manual vs Auto-Patrol */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">Manual vs Auto-Patrol</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <ScrollReveal>
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="font-display text-xl font-bold">Manual Patrol</h3>
                </div>
                <p className="mt-4 text-muted-foreground">
                  An operator steps camera to camera, answers each checklist item in real time.
                  The round cannot be ended until every item is answered. Ideal for ad-hoc inspections
                  and incident response verification.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-live flex-shrink-0" /> Operator-initiated, real-time</li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-live flex-shrink-0" /> Cannot skip checklist items</li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-live flex-shrink-0" /> Immediate guard notification on failure</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-xl border border-primary/30 bg-card p-8">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h3 className="font-display text-xl font-bold">Auto-Patrol</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-mono-sm text-primary">RECOMMENDED</span>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Scheduled rounds run by frequency, active hours, and active days — completely
                  unattended. The system auto-checks each item, notifies guards on failure, and
                  emails the completed PDF report.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-live flex-shrink-0" /> Runs on schedule, zero operator needed</li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-live flex-shrink-0" /> Configurable frequency, hours, days</li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-live flex-shrink-0" /> PDF report emailed automatically</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">What gets configured</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              A <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">patrol sequence</Link> is
              the foundation. From there, every variable is set per camera and per round.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Patrol sequences', desc: 'Ordered camera routes across any site, up to licensed VPS camera allocation.' },
              { title: 'Per-camera checklists', desc: 'Custom checklist items per camera — "Gate closed", "No obstruction", "Access door secured".' },
              { title: 'Guard contacts', desc: 'Named guard and contact number attached to each camera in the sequence.' },
              { title: 'Predefined messages', desc: 'Pre-written escalation messages per checklist item, sent automatically on failure.' },
              { title: 'Frequency and hours', desc: 'How often rounds run, during which hours, and on which days of the week.' },
              { title: 'Report delivery', desc: 'PDF reports emailed to designated recipients after every completed round.' },
            ].map((item: any, i: number) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-sm font-bold">{item?.title ?? ''}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item?.desc ?? ''}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance record */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight">The compliance record</h2>
                <p className="mt-4 text-muted-foreground">
                  This is the section that closes enterprise deals. Insurers, auditors, and regulators
                  want proof that patrols happened, that every checkpoint was checked, and that failures
                  were acted on.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Camzify's <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">patrol log</Link> provides
                  a filterable history by sequence, type (manual or auto), and status — Completed,
                  Flagged, or Overdue. Every round shows its compliance percentage. Reports are
                  exportable as PDF for audit submission.
                </p>
                <p className="mt-4 text-muted-foreground">
                  The <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance percentage</Link> —
                  rounds completed vs scheduled — is surfaced on the main dashboard, giving operations
                  managers a single number for patrol health across all sites.
                </p>
              </div>
              <div className="overflow-hidden rounded-xl bg-card">
                <SiteImage
              src="/Virtual-Patrolling-System-2.jpg"
                  alt="Camzify patrol history screen listing completed, flagged, and overdue rounds with a 94% patrol health score across all sites"
                  className="w-full"
              width={1000}
              height={563}
            />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Three-way comparison */}
      <section className="py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">How it compares</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Virtual patrolling vs manned guard tours vs traditional CCTV — across the metrics that matter.
            </p>
          </ScrollReveal>
          <div className="mt-10">
            <ComparisonTable
              rows={comparisonRows}
              columns={['Capability', 'Camzify Virtual Patrolling', 'Manned Guard Tours', 'Traditional CCTV']}
            />
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-mono text-mono-sm uppercase text-muted-foreground">Industries Using Virtual Patrolling</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { label: 'Warehouses', href: '/industries/warehouses' },
                  { label: 'Retail', href: '/industries/retail' },
                  { label: 'Manufacturing', href: '/industries/manufacturing' },
                  { label: 'Construction', href: '/industries/construction-sites' },
                  { label: 'Healthcare', href: '/industries/healthcare' },
                  { label: 'Property Management', href: '/industries/property-management' },
                ].map((ind: any) => (
                  <Link key={ind?.href} href={ind?.href ?? '/'} className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-all hover:border-primary/30 hover:text-primary">
                    {ind?.label ?? ''}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-mono text-mono-sm uppercase text-muted-foreground">Related Use Cases</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { label: 'Guard Tour Verification', href: '/use-cases/guard-tour-verification' },
                  { label: 'After-Hours Monitoring', href: '/use-cases/after-hours-monitoring' },
                  { label: 'Perimeter Security', href: '/use-cases/perimeter-security' },
                  { label: 'Remote Site Monitoring', href: '/use-cases/remote-site-monitoring' },
                ].map((uc: any) => (
                  <Link key={uc?.href} href={uc?.href ?? '/'} className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-all hover:border-primary/30 hover:text-primary">
                    {uc?.label ?? ''}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">Frequently asked questions</h2>
          </ScrollReveal>
          <div className="mt-10 max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
