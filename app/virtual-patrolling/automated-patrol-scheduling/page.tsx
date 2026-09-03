import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import { SceneObservation } from '@/components/motion/scene-observation';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Calendar, Clock, Repeat, ArrowRight, ShieldAlert } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Automated Security Patrol Scheduling",
  description: "Schedule automated AI patrol rounds by frequency, active hours, and active days. Camzify runs every round unattended and emails the completed PDF report.",
  path: "/virtual-patrolling/automated-patrol-scheduling",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does an automated round only check the items on the checklist?', answer: 'No. It works through the checklist, and it also assesses each stop for safety and security risks in its own right, raising a critical notification for anything it finds even where no checklist item covered it. A checklist can only ask what somebody thought to ask when the sequence was written, and the useful things a round finds are often not on it — a blocked exit, an unattended bag, smoke, somebody in a place they should not be.' },
  { question: 'Does a failed item notify the guard without anyone approving it?', answer: 'On an automated round, yes. The notification goes to the guard assigned to that camera as the round runs, with no operator in the loop. That is the point of running it at 3am. On a manual round the operator is already looking at the camera, so the message is offered rather than sent automatically, and they can send it, skip it, or send it later from the same item.' },
  { question: 'What is scene observation in automated patrolling?', answer: 'It lets an automated round judge a camera from a short window of live video, one to three seconds, instead of a single still frame. A frame tells you someone is in a corridor; a few seconds tell you whether they walked through or stayed. Single frame is faster and right for static checks like a gate or a roller door; watching is worth the extra seconds anywhere people are involved, because it is what stops a round waking a guard over somebody walking past a camera.' },
  { question: 'Does an automated round feel different from a guard walking the site?', answer: 'It covers the same sequence with the same checks at the same times, and unlike a physical round it happens at 3am on the fourth night as reliably as the first. What it does not do is intervene. It observes, judges, notifies the responsible guard and files the record, so a person is dispatched to the things that need a person rather than to everything.' },
  { question: 'Can different cameras in the same sequence run on different schedules?', answer: 'No. A patrol sequence runs as one unit, so every camera in it fires together on the same schedule. If two groups of cameras need different frequencies or active hours, split them into separate sequences, each with its own schedule.' },
  { question: 'What happens if a scheduled round is still running when the next one is due?', answer: 'The current round finishes its remaining stops before the next scheduled trigger is allowed to start, so rounds don\'t overlap or stack on top of each other. A tightly spaced frequency should leave enough time for a full round to complete.' },
  { question: 'Can I pause a schedule without losing its configuration?', answer: 'Yes. Pausing keeps the frequency, active hours, and active days exactly as configured. No rounds fire while paused, and resuming picks the schedule back up unchanged.' },
  { question: 'Does automated scheduling account for holidays?', answer: 'Yes. Specific dates can be marked as exceptions so the schedule skips them without needing to be rebuilt or re-enabled afterward.' },
  { question: 'Who receives the report from a scheduled round?', answer: 'Whoever is configured as a recipient for that site. The PDF report is emailed automatically the moment the round finishes, with no manual step required to generate or send it.' },
];

export default function AutomatedSchedulingPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'Automated Scheduling' },
    ]}>
      <FeatureHero
        eyebrow="Automated Scheduling"
        title="Automated patrol scheduling"
        lede={<>Automated patrol scheduling is the ability to configure <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> rounds
            to run at a defined frequency, during specific active hours, on selected days of the week, completely
            unattended. The system handles every round, from the first camera to the final report.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/virtual-patrolling/risk-detection', label: 'Risk detection on patrol' }}
        visual={<HeroPlaceholder label="Auto-Patrol · Perimeter round" alt="Camzify console illustrating automated patrol scheduling" />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">


          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Repeat, title: 'Frequency', desc: 'Set how often rounds run: every 30 minutes, every hour, every 2 hours. The system follows the schedule precisely.' },
              { icon: Clock, title: 'Active hours', desc: 'Define the window when patrols are active. Night-only, business hours or 24/7, matched to your operational needs.' },
              { icon: Calendar, title: 'Active days', desc: 'Select which days of the week the schedule applies. Weekdays only, weekends only, or every day.' },
            ].map((item: any, i: number) => {
              const Icon = item?.icon ?? Calendar;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item?.title ?? ''}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item?.desc ?? ''}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Why Scheduling Matters</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Why automated scheduling matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Physical guard rounds depend on someone remembering to run them. A scheduled patrol slips when a site is short-staffed, when other calls take priority, or simply when a written schedule doesn't get checked. The gap in coverage isn't discovered until something goes wrong and nobody can say when the area was last looked at.</p>
                <p>Running virtual patrols manually has the same weakness in a different form. Someone still has to log in and start the round at the right time, every time, across every site, which works fine until they don't.</p>
                <p>Automated scheduling removes the dependency on memory entirely. Once frequency, active hours, and active days are set, every round fires exactly on time, unattended, whether it's 3am on a Tuesday or a day nobody happened to be tracking.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">How It Runs</span>
                <h2 className="mt-2 font-display text-2xl font-bold">What happens during an auto-patrol</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">01</span><span>Schedule triggers at the configured time</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">02</span><span>System steps through each camera in the <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">patrol sequence</Link></span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">03</span><span>Each <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist item</Link> is auto-evaluated</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">04</span><span>Non-compliant items notify the assigned guard automatically &mdash; no operator has to approve the message</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">05</span><span>Safety and security risks spotted at a stop raise a critical notification, whether or not a checklist item covered them</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">06</span><span>PDF <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is emailed to designated recipients</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">07</span><span>Round is logged with <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance percentage</Link></span></li>
                </ul>
              </div>
            </ScrollReveal>
            <SectionVisual variant="schedule" caption="Schedule Configuration" alt="Auto-patrol scheduling interface showing frequency, active hours, and day selection" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Configuration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Scene observation: judging on more than one frame</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    An automated round can judge a camera from a short window of live video rather
                    than a single still frame.
                  </strong>{' '}
                  Scene observation watches the feed for one, two or three seconds before deciding.
                  A single frame is enough to tell whether a shutter is down, but not whether a
                  person in view is walking through or loitering &mdash; the kind of check that needs
                  a moment of context to call correctly.
                </p>
                <p className="mt-4 max-w-prose text-muted-foreground">
                  Single frame is the faster of the two and the right choice for anything static: a
                  gate, a barrier, a roller door. Watching costs a little more time per stop and
                  earns it back on anything involving people, where the question is almost never
                  &ldquo;is someone there&rdquo; but &ldquo;is someone still there&rdquo;.
                </p>

                <div className="mt-8">
                  <SceneObservation />
                </div>

                <div className="mt-16 rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="font-mono text-mono-sm uppercase text-primary">Beyond the checklist</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold">Risks nobody thought to put on the list</h2>
                  <p className="mt-4 max-w-prose text-muted-foreground">
                    <strong className="font-semibold text-foreground">
                      A checklist can only ask what you thought to ask.
                    </strong>{' '}
                    An automated round also assesses each stop for safety and security risks in its
                    own right and raises a critical notification when it finds one, whether or not
                    any checklist item covered it. The blocked fire exit, the unattended bag, the
                    smoke, the person somewhere they should not be &mdash; these do not need to
                    have been anticipated when the sequence was written.
                  </p>
                  <p className="mt-4 max-w-prose text-muted-foreground">
                    The point is when the alert arrives. A condition like a propped-open door or an
                    obstructed exit is a risk for a while before it is an incident, and that window
                    is when it is cheap to fix. A round that only answers the questions on the list
                    walks past everything else; this one flags it while it is still just a
                    condition.
                  </p>
                  <p className="mt-4 max-w-prose text-muted-foreground">
                    <strong className="font-semibold text-foreground">
                      Both assessments are written into the report at every stop, not only when
                      something is found.
                    </strong>{' '}
                    Alongside them each camera records a plain-language description of the scene,
                    the number of people present, and the objects detected in view &mdash; so a
                    risk entry can be read against what the camera was actually looking at.
                  </p>
                  <p className="mt-4 max-w-prose text-muted-foreground">
                    More on what this covers and where it fits:{' '}
                    <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">AI risk detection on patrol</Link>.
                    These arrive as{' '}
                    <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">critical notifications</Link>,
                    in the same queue as{' '}
                    <Link href="/ai-features" className="text-primary hover:underline">AI detections</Link> from
                    continuous monitoring, with the snapshot attached and an acknowledgment expected.
                  </p>
                </div>

                <h2 className="mt-16 font-display text-2xl font-bold">Timezone, holidays &amp; pause/resume</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Schedules run in the site's local timezone, not the account default, so multi-region deployments stay accurate</li>
                  <li className="flex gap-2">• Mark specific dates as exceptions so the schedule skips holidays or closures without being rebuilt</li>
                  <li className="flex gap-2">• Pause a schedule during maintenance and resume it later with the same frequency, hours, and days intact</li>
                  <li className="flex gap-2">• The next scheduled run time for each sequence is visible at a glance from the schedule list</li>
                </ul>
              </div>
            </ScrollReveal>
            <SectionVisual variant="flow" caption="Schedule Exceptions" steps={['Runs in the site timezone', 'Mark holiday dates', 'Pause for maintenance', 'Resume with settings intact']} alt="Configuration screen for timezone, holiday exceptions, and pause or resume controls on a patrol schedule" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual variant="flow" caption="Scheduled Round Delivery" alt="Diagram showing a scheduled patrol round completing and its report and notifications being delivered" steps={['Schedule fires', 'Round runs unattended', 'Guard notified on failure', 'Report emailed and logged']} />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">After The Round</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Recipients and escalation for scheduled rounds</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A distribution list per site controls who receives the PDF <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> the moment a round finishes</li>
                  <li className="flex gap-2">• Any Not Compliant item still triggers its normal guard notification, scheduled or manual</li>
                  <li className="flex gap-2">• A skipped or overdue round is flagged in <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance tracking</Link> the same way a missed manual round would be</li>
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
              <Link href="/use-cases/after-hours-monitoring" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/industries/warehouses" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Warehouses <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/pricing" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
