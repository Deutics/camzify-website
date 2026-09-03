import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { InteractiveChecklistDemo } from '@/components/motion/interactive-checklist-demo';
import { ComparisonTable } from '@/components/content/comparison-table';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { FeatureHero } from '@/components/content/feature-hero';
import { SiteImage } from '@/components/content/site-image';
import Link from 'next/link';
import {
  Camera, ClipboardCheck, Bell, FileText, Route, CheckCircle, BarChart3, Users, Calendar, ShieldAlert,
} from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Virtual Patrolling System | Automated AI Security Patrols",
  description: "A virtual patrolling system runs scheduled AI patrol rounds across your cameras, checking a defined checklist at each point, notifying the assigned guard on failure, and filing a compliance report with the evidence attached.",
  path: "/virtual-patrolling",
};

export const metadata = generatePageMeta({ ...pageMeta });

const comparisonRows = [
  { feature: '24/7 coverage without shift changes', camzify: true, competitor: false, traditional: false },
  { feature: 'Per-camera compliance checklist', camzify: true, competitor: false, traditional: false },
  { feature: 'Assigned guard per check point', camzify: true, competitor: true, traditional: false },
  { feature: 'Report with the frame behind every check', camzify: true, competitor: false, traditional: false },
  { feature: 'Timestamped audit trail', camzify: true, competitor: 'Partial', traditional: false },
  { feature: 'Compliance % scoring', camzify: true, competitor: false, traditional: false },
  { feature: 'Risks flagged beyond the checklist', camzify: true, competitor: false, traditional: false },
  { feature: 'Scales across multiple sites', camzify: true, competitor: false, traditional: 'Partial' },
  { feature: 'Zero fatigue or human error', camzify: true, competitor: false, traditional: true },
  { feature: 'Cost per site per month', camzify: 'Quoted per camera', competitor: '$3,000–$8,000', traditional: '$50–$200' },
];

/**
 * Exported so the same array feeds both the visible accordion and `faqSchema()` via
 * PageShell. This page previously rendered the accordion without ever passing the
 * array to the shell, so the flagship page carried no FAQPage schema at all.
 */
const faqs = [
  { question: 'What is virtual patrolling?', answer: 'Virtual patrolling is the practice of running scheduled, AI-driven patrol rounds across your existing cameras. The system follows a defined camera sequence, checks a per-camera compliance checklist, flags failures, notifies the assigned guard, and generates a timestamped report with the snapshot behind every result — all without a human operator walking the route.' },
  { question: 'How is virtual patrolling different from a guard tour system?', answer: 'Guard tour systems verify that a physical guard visited a checkpoint — typically via NFC tags or QR codes — and say nothing about what was there. Virtual patrolling checks a defined condition at each camera and stores the frame it was judged against, so the record shows the gate was actually closed rather than that somebody stood next to it.' },
  { question: 'Does virtual patrolling replace security guards?', answer: 'It replaces the routine patrol round — the repetitive walk-and-check that occupies most of a guard\'s shift. Guards are still needed for physical response, and security agencies sell virtual patrolling alongside their guards as overnight coverage across every client site rather than instead of them.' },
  { question: 'What happens when a checklist item fails?', answer: 'The item is marked Not Compliant and the snapshot is kept. On an automated round the guard assigned to that camera is notified immediately with a predefined message; on a manual round the operator is offered it. The item then has to be resolved before the round can close — fixed and re-checked, capturing a second frame, or held as Pending with a written reason, which counts against the compliance score.' },
  { question: 'Can patrols run automatically?', answer: 'Yes. Auto-Patrol runs on a configured schedule — you set the frequency, active hours and active days in the site\'s own timezone. The system steps through each camera in the sequence, evaluates every checklist item from a single frame or a short window of live video, notifies guards on failure, and files the report without an operator present.' },
  { question: 'What is in the patrol report?', answer: 'Each camera checked, every checklist item with its result, the snapshot the item was judged against, before and after frames on anything fixed during the round, the written reason on anything pending, the guard notified on any failure, and an overall compliance percentage. Reports open as a web report or a PDF. The snapshots are what make it usable as proof — a reviewer months later sees what the camera showed rather than taking the result on trust.' },
  { question: 'Does virtual patrolling only check what is on the checklist?', answer: 'A manual round does — the operator answers the items in front of them. An automated round also assesses each camera for safety and security risks in its own right and raises a critical notification for anything it finds, even where no item covered it. A checklist can only ask what somebody thought to ask when it was written, and the condition that causes an incident is often not on it.' },
  { question: 'Which cameras work with virtual patrolling?', answer: 'Any IP camera that supports ONVIF or RTSP, which covers effectively every IP camera made in the last decade, plus RTMP and HTTPS (HLS or WebRTC) streams. Cameras are added over one of three connection types, stream quality is auto-detected on connect, and no proprietary hardware is required.' },
];

const anatomy = [
  { icon: Route, title: 'Patrol sequence', desc: 'An ordered list of cameras defining the route the round follows across the site.', href: '/virtual-patrolling/patrol-sequences' },
  { icon: Camera, title: 'Camera stop', desc: 'At each camera in the sequence the system pauses and evaluates that camera\'s checklist.', href: '/virtual-patrolling/how-it-works' },
  { icon: ClipboardCheck, title: 'Checklist evaluation', desc: 'Each item is marked Compliant or Not Compliant — gate closed, zone clear, access secured.', href: '/virtual-patrolling/patrol-checklists' },
  { icon: Bell, title: 'Guard notification', desc: 'A failed item notifies the guard assigned to that camera, with a message written for that item.', href: '/virtual-patrolling/guard-notifications' },
  { icon: ShieldAlert, title: 'Risk detection', desc: 'Automated rounds also flag safety and security risks in frame, even where no item asked.', href: '/virtual-patrolling/risk-detection' },
  { icon: FileText, title: 'Compliance report', desc: 'Every camera, every item, every result — with the snapshot behind each check.', href: '/virtual-patrolling/patrol-reports' },
  { icon: BarChart3, title: 'Patrol log', desc: 'Every round logged as Completed, Flagged or Overdue, with a compliance percentage.', href: '/virtual-patrolling/patrol-compliance-tracking' },
  { icon: Calendar, title: 'Schedule', desc: 'Frequency, active hours and active days, in the site\'s own timezone.', href: '/virtual-patrolling/automated-patrol-scheduling' },
];

export default function VirtualPatrollingPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Virtual Patrolling' }]}>
      <FeatureHero
        eyebrow="Flagship capability"
        title="Virtual patrolling system"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              A virtual patrolling system runs scheduled, AI-driven patrol rounds across the
              cameras a site already has
            </strong>{' '}
            &mdash; following a defined route, checking a per-camera checklist at each stop,
            notifying the guard responsible when something fails, and filing a timestamped
            compliance report with the frame behind every result. The same record a physical
            guard tour produces, without a person walking it, and identical at 03:00 and 15:00.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/virtual-patrolling/how-it-works', label: 'How it works' }}
        facts={['Manual or automated', 'Evidence on every check', 'Runs on existing cameras']}
        visual={
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <SiteImage
              src="/Virtual-Patrolling-System-1.jpg"
              alt="A person reviewing the Camzify Virtual Patrolling dashboard on a laptop, showing an active patrol round and camera sequence"
              className="w-full"
              width={1000}
              height={563}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        }
      />

      {/* Interactive demo */}
      <section className="relative overflow-hidden border-t border-border bg-muted/20 py-20 sm:py-24">
        <SectionAtmosphere variant="right" />
        <div className="relative z-10 mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Try it yourself</span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Run a patrol round in 20 seconds
                </h2>
                <p className="mt-5 max-w-prose text-body leading-relaxed text-muted-foreground">
                  Step through three cameras and mark each item. Fail one and you will be asked
                  whether to message the guard &mdash; and the round will not let you move on
                  until the item is fixed and re-checked, or held as pending with a reason.
                  That rule is the whole product in miniature.
                </p>
                <Link
                  href="/guides/how-to-run-a-virtual-patrol-round"
                  className="mt-8 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Read the full walkthrough <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <InteractiveChecklistDemo />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Anatomy of a round */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Anatomy of a round</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Eight parts, every round, in this order
              </h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Whether started by an operator or by the schedule, a round is the same sequence
                of parts. Each has its own page.
              </p>
            </div>
          </ScrollReveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {anatomy.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.href} delay={i * 0.05}>
                  <li className="h-full">
                    <Link
                      href={item.href}
                      className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-primary/10 p-2"><Icon className="h-4 w-4 text-primary" aria-hidden="true" /></span>
                        <span className="font-mono text-mono-sm text-muted-foreground tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="mt-4 font-display text-base font-bold transition-colors group-hover:text-primary">{item.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                      <span className="mt-3 text-sm font-semibold text-primary opacity-0 transition-opacity duration-normal group-hover:opacity-100">Learn more <span aria-hidden="true">&rarr;</span></span>
                    </Link>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Manual vs Auto-Patrol */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Two ways to run it</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Manual round, or Auto-Patrol</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Same sequence, same checklists, same report. The difference is who makes each judgment and when the round happens.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ScrollReveal>
              <div className="h-full rounded-xl border border-border bg-card p-8">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">Manual round</h3>
                </div>
                <p className="mt-4 text-muted-foreground">
                  An operator steps camera to camera and answers each checklist item against the
                  live view. A failed item offers the guard message and then has to be resolved
                  before the round can end. Right for ad-hoc inspections and for verifying an
                  incident response.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {['Operator judges each stop in real time', 'No item can be skipped or left failing', 'Guard message offered on every failure'].map((t) => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-live" aria-hidden="true" /> {t}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="h-full rounded-xl border border-primary/30 bg-card p-8 shadow-lg shadow-primary/5">
                <div className="flex flex-wrap items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">Auto-Patrol</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-mono-sm uppercase text-primary">Recommended</span>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Scheduled rounds by frequency, active hours and active days, unattended. The
                  AI judges each stop from a frame or a few seconds of video, records its
                  reasoning, flags risks beyond the checklist, notifies guards on its own, and
                  files the report.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {['Runs on schedule with nobody on shift', 'Scene observation for stops that need context', 'Safety and security risks assessed at every stop'].map((t) => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-live" aria-hidden="true" /> {t}</li>
                  ))}
                </ul>
                <Link href="/virtual-patrolling/automated-patrol-scheduling" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  How scheduling works <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Compliance record */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">The record</span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Proof, not a promise</h2>
                <p className="mt-5 max-w-prose text-body text-muted-foreground">
                  Insurers, auditors and clients want evidence that patrols happened, that every
                  checkpoint was checked, and that failures were acted on. Every round files a{' '}
                  <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link>{' '}
                  carrying the snapshot behind each check and both frames on anything fixed.
                </p>
                <p className="mt-4 max-w-prose text-body text-muted-foreground">
                  The patrol log keeps every round as Completed, Flagged or Overdue with its
                  compliance percentage, and{' '}
                  <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance tracking</Link>{' '}
                  rolls that up per site so one number says whether coverage is holding.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <SiteImage
                  src="/Virtual-Patrolling-System-2.jpg"
                  alt="Camzify patrol history screen listing completed, flagged, and overdue rounds with a patrol health score across all sites"
                  className="w-full"
                  width={1000}
                  height={563}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">How it compares</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Against a guard tour and against plain CCTV</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Guard-tour figures are order-of-magnitude industry estimates; Camzify is quoted per camera.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-10">
            <ComparisonTable
              rows={comparisonRows}
              columns={['Capability', 'Camzify Virtual Patrolling', 'Manned Guard Tours', 'Traditional CCTV']}
            />
          </div>
        </div>
      </section>

      {/* Where it is used */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Industries using virtual patrolling</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ['Warehouses', '/industries/warehouses'], ['Retail', '/industries/retail'], ['Manufacturing', '/industries/manufacturing'],
                  ['Construction', '/industries/construction-sites'], ['Healthcare', '/industries/healthcare'], ['Property management', '/industries/property-management'],
                  ['Security agencies', '/partners/for-security-agencies'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Related use cases</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ['Guard tour verification', '/use-cases/guard-tour-verification'], ['After-hours monitoring', '/use-cases/after-hours-monitoring'],
                  ['Perimeter security', '/use-cases/perimeter-security'], ['Remote site monitoring', '/use-cases/remote-site-monitoring'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Common questions</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Virtual patrolling, answered</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="mt-10 max-w-3xl">
              <FAQAccordion items={faqs} />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  );
}
