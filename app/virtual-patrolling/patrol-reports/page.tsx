import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Security Patrol Reports | Automated PDF Patrol Reports",
  description: "Every virtual patrol round generates a timestamped PDF report with compliance results and the camera snapshot behind every check. Exportable for audits and insurance.",
  path: "/virtual-patrolling/patrol-reports",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does the patrol report include camera images?', answer: 'Yes. Every checklist result carries the snapshot from the camera at the moment that item was checked, so the report shows what was actually on screen rather than only the verdict. This is what makes it usable as evidence: an insurer, auditor or manager reviewing a round months later can see the gate, the dock door or the corridor for themselves instead of relying on the recorded result alone.' },
  { question: 'How long are patrol reports kept?', answer: 'Reports stay in the patrol log for as long as the account is active, so a report from months back is still available if an insurer or auditor asks for it. There\'s no separate archiving step required.' },
  { question: 'Can a report be exported for a date range instead of a single round?', answer: 'Yes. A date range covering multiple rounds can be exported together, which is typically faster than pulling individual reports one at a time for an audit or an insurance claim.' },
  { question: 'Who gets emailed when a report is generated?', answer: 'Whoever is configured as a recipient on that site\'s distribution list. Recipients can be added, removed, or changed at any time, and the change applies to the next report onward.' },
  { question: 'What\'s the difference between a Flagged report and an Overdue one?', answer: 'Flagged means the round ran and at least one checklist item came back Not Compliant. Overdue means a scheduled round didn\'t run at all — the schedule fired but the round wasn\'t completed.' },
  { question: 'Can I see the report history for one specific camera across many past rounds?', answer: 'Yes. Historical reports can be filtered by camera, site, or status, which makes it straightforward to spot a pattern — like one camera repeatedly failing the same checklist item.' },
];

export default function PatrolReportsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'Patrol Reports' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Automated Reporting</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Security Patrol Reports</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A security patrol report is the PDF document generated after every <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round.
            It contains the patrol sequence name, date and time, every camera checked, each checklist item with its
            compliance status, the camera snapshot that item was judged against, the guard notified on any failure,
            and an overall compliance percentage. Reports are emailed automatically and stored in the patrol log.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">Report Contents</span>
              <h2 className="mt-2 font-display text-2xl font-bold">What the report includes</h2>
              <ul className="mt-6 space-y-3">
                {[
                  'Patrol sequence name and site',
                  'Date, start time, and end time',
                  'Each camera in the sequence with its checklist results',
                  'Compliant and Not Compliant status per item',
                  'The camera snapshot each item was judged against',
                  'Guard notifications sent on failures',
                  'Overall compliance percentage for the round',
                  'Patrol type (Manual or Auto)',
                  'Status: Completed, Flagged, or Overdue',
                ].map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-live flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PlaceholderVisual type="report" caption="PATROL REPORT PDF" alt="Sample patrol report PDF showing camera checks, compliance scores, and audit trail" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Why Reports Matter</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Why reports matter</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Insurers ask for proof of patrol coverage. Regulators want timestamped records. Auditors need
                to verify that checks happened and failures were escalated. The patrol report is the document
                that answers all three — generated automatically, every round, with zero manual input.
              </p>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Combined with <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance tracking</Link>,
                these reports create a continuous audit trail that proves patrol discipline across every site.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="REPORT GENERATION FLOW" alt="Diagram showing a patrol round finishing and its results being compiled into a PDF report" />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">How It Runs</span>
                <h2 className="mt-2 font-display text-2xl font-bold">How a patrol report gets generated</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="font-mono text-primary">01</span> The patrol round reaches its final camera stop, whether manual or run on an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated schedule</Link></li>
                  <li className="flex gap-3"><span className="font-mono text-primary">02</span> Every checklist result from the round is compiled into a single record, each one paired with the snapshot taken at that camera</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">03</span> The record is formatted into a PDF with the sequence name, timestamps, and per-camera results</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">04</span> The report is emailed automatically to configured recipients</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">05</span> The report is stored in the patrol log, linked to that round's <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance percentage</Link></li>
                </ol>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Configuration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Recipients, retention &amp; export formats</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Set a distribution list per site — every recipient gets the PDF as soon as a round finishes</li>
                  <li className="flex gap-2">• Reports are retained in the patrol log for later lookup — pull up a specific week, site, or camera on demand</li>
                  <li className="flex gap-2">• Export a single report or a date range together for insurance claims, regulator requests, or internal audits</li>
                  <li className="flex gap-2">• Filter historical reports by status — Completed, Flagged, or Overdue — to spot patterns fast</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="REPORT SETTINGS" alt="Configuration screen for report recipients, retention, and export options" />
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
              <Link href="/virtual-patrolling/patrol-compliance-tracking" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Compliance Tracking <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/virtual-patrolling/automated-patrol-scheduling" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Automated Scheduling <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/platform/analytics-and-reporting" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Analytics & Reporting <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/industries/healthcare" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Healthcare <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
