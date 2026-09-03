import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { ShieldAlert, Bell, Eye, ClipboardCheck } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Risk Detection on Patrol | Proactive Security Alerts",
  description: "An automated patrol round flags safety and security risks it sees at each camera — a blocked exit, an unattended object, smoke — and raises a critical alert even where no checklist item asked about it.",
  path: "/virtual-patrolling/risk-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'What is proactive risk detection in video surveillance?',
    answer: 'It is the system flagging a hazardous or insecure condition while it is still a condition, rather than recording the incident that follows. A fire exit blocked by pallets, a security door propped open, an unattended bag in a public area and smoke in a plant room are all risks for a period of time before anything happens, and that period is when they are cheap to deal with. Camzify raises these as critical notifications during automated patrol rounds, alongside the checklist results for the same cameras.',
  },
  {
    question: 'How is this different from a patrol checklist?',
    answer: 'A checklist answers the questions somebody wrote down. Risk detection answers the question nobody thought to write down. Both run on the same round: each camera is checked against its checklist, and the same stop is also assessed for risks in its own right, so a blocked exit is flagged whether or not "exit clear" was ever added as an item. The two are complementary — the checklist is what proves a specific control was verified, and risk detection is what covers the gap between controls.',
  },
  {
    question: 'Does Camzify predict incidents before they happen?',
    answer: 'No, and be wary of any vendor claiming it does. What it does is narrower and more useful: it observes conditions that are present now and would take time to become an incident, and tells someone while there is still time to act. A propped door is not a prediction — it is a fact about the site right now, and the value is that a person hears about it tonight rather than reading about it in an incident report next week.',
  },
  {
    question: 'What kinds of risk does it flag?',
    answer: 'The categories align with the detection models the platform runs — fire and smoke, abandoned or unattended objects, people in restricted areas, PPE not being worn where it is required, aggression, obstruction and camera tampering among others. See the AI features index for the full set. What a given round flags depends on which features are active on that camera.',
  },
  {
    question: 'Where do these alerts arrive?',
    answer: 'In the same notifications queue as detections from continuous monitoring, marked critical, carrying the snapshot from the camera and expecting an acknowledgement. They are not buried in the patrol report — the report records the round, while a risk that needs somebody now goes out as a notification on the channels that guard is configured for: email, SMS, WhatsApp or push.',
  },
  {
    question: 'Does this replace continuous AI monitoring?',
    answer: 'No. Continuous monitoring watches a camera all the time and is what catches an event as it happens. A patrol round is a scheduled sweep that reaches every camera in the sequence in order and leaves a record that it did. Risk detection on a round is the second of those doing some of the work of the first: a deliberate look at every stop, on schedule, whether or not anything triggered.',
  },
];

export default function RiskDetectionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'Risk Detection' },
    ]}>
      <FeatureHero
        eyebrow="Beyond the checklist"
        title="AI risk detection on patrol"
        lede={<><strong className="font-semibold text-foreground">
            A checklist can only ask what you thought to ask.
            </strong>{' '}
            During an{' '}
            <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated patrol round</Link>,
            Camzify assesses each camera for safety and security risks in its own right and raises
            a critical alert for what it finds &mdash; whether or not any checklist item covered it.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/virtual-patrolling/automated-patrol-scheduling', label: 'Automated scheduling' }}
        visual={<HeroPlaceholder label="Auto-Patrol · risk assessment" alt="Camzify console illustrating ai risk detection on patrol" />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">


          <div className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The gap a checklist leaves</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Checklists are written from experience: the gate that gets left open, the dock
                  door that gets propped, the corridor that collects boxes. They are good at the
                  things that have gone wrong before, which is exactly why they are worth having.
                </p>
                <p>
                  What they cannot do is anticipate. The condition that causes the next incident is
                  usually not the one somebody thought to write down &mdash; and a round that only
                  answers the questions on the list will walk past everything else without
                  recording that it saw anything at all.
                </p>
                <p>
                  <strong className="font-semibold text-foreground">
                    That gap is what risk detection covers.
                  </strong>{' '}
                  The same stop that answers &ldquo;is the dock door secured&rdquo; is also assessed
                  for what is actually in frame, so the pallets stacked against the fire exit behind
                  it are flagged too.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">It is assessed at every stop, not only when something is wrong</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every camera on an automated round gets two entries in the report:{' '}
                <strong className="font-semibold text-foreground">possible safety risks</strong> and{' '}
                <strong className="font-semibold text-foreground">possible security risks</strong>.
                They are filled in whether or not anything is wrong. A gym might read &ldquo;possible
                tripping hazards due to equipment left out on the floor&rdquo;; a pathway,
                &ldquo;wet surfaces might cause slipping&rdquo;; most stops, &ldquo;none
                apparent&rdquo;.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Recording the negatives is what makes the positives worth reading. A system that
                only speaks up when it has something to say gives you no way to tell the difference
                between a quiet night and a system that stopped looking &mdash; and it leaves no
                record that a hazard was absent at the time somebody later says it was there.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Each stop also records what the camera actually saw: a plain-language description of
                the scene, the number of people present, and the objects detected in view. That is
                the context an assessment is made against, kept alongside it.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why the timing is the whole point</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Most site risks are not instantaneous. A fire door wedged open at the start of a
                shift is wedged open for hours. Pallets in front of an exit stay there until someone
                moves them. A bag left in a lobby sits there until it is noticed. Each is a risk for
                a stretch of time before it is anything worse, and during that stretch it is a
                five-minute fix.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A scheduled round that looks at every camera every couple of hours lands inside that
                window. That is the entire claim &mdash; not that the system foresees events, but
                that it reaches a hazardous condition while it is still just a condition, and tells
                a named person who can deal with it.
              </p>
              <div className="mt-8 rounded-xl border border-warn/30 bg-warn/5 p-6">
                <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">What this is not:</strong>{' '}
                  it is not prediction, and we do not claim it is. The system reports conditions
                  visible on camera now. Anyone selling you software that forecasts incidents is
                  describing something that does not exist, and{' '}
                  <Link href="/trust" className="text-primary hover:underline">our position on claims like that</Link>{' '}
                  is on the record.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How it fits with everything else</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: ClipboardCheck,
                    title: 'The checklist proves the control',
                    desc: 'Each item is answered and recorded against a snapshot, which is what an auditor or insurer asks for. It covers what you decided to verify.',
                    href: '/virtual-patrolling/patrol-checklists',
                    link: 'Patrol checklists',
                  },
                  {
                    icon: ShieldAlert,
                    title: 'Risk detection covers the rest',
                    desc: 'The same stop is assessed for hazards and security risks in frame, raising a critical alert for anything found that the list did not ask about.',
                    href: '/ai-features',
                    link: 'AI detection models',
                  },
                  {
                    icon: Eye,
                    title: 'Scene observation adds context',
                    desc: 'A stop can be judged on a few seconds of live video rather than a single frame, which is what separates somebody passing through from somebody staying.',
                    href: '/virtual-patrolling/automated-patrol-scheduling',
                    link: 'Automated scheduling',
                  },
                  {
                    icon: Bell,
                    title: 'The alert reaches a person',
                    desc: 'Critical notifications go to the guard configured for that camera on email, SMS, WhatsApp or push, and expect an acknowledgement.',
                    href: '/virtual-patrolling/guard-notifications',
                    link: 'Guard notifications',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <Link href={item.href} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                      {item.link} &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where it matters most</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Sites where a hazardous condition can persist unseen for hours get the most from it:
                a{' '}
                <Link href="/industries/warehouses" className="text-primary hover:underline">warehouse</Link>{' '}
                after the shift ends, a{' '}
                <Link href="/industries/construction-sites" className="text-primary hover:underline">construction site</Link>{' '}
                overnight, a{' '}
                <Link href="/industries/remote-sites" className="text-primary hover:underline">remote or unmanned site</Link>{' '}
                where nobody walks past at all. Anywhere the answer to &ldquo;how long before someone
                would notice&rdquo; is measured in hours, a scheduled round that looks properly is
                worth more than another camera.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
