import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * This page supersedes /ai-features/behavioral-analytics, which described a roadmap
 * set of fixed models (running, abandonment, crowd formation). The shipping feature
 * is broader and works differently — the operator describes the behaviour in their
 * own words instead of picking from a catalogue — so the old slug redirects here.
 */
const pageMeta = {
  title: 'Behavioral Anomaly Detection | Describe What to Watch For',
  description:
    'Describe the behaviour you want watched in plain language — fights, smoking, vandalism, trespassing — and Camzify monitors for it continuously and notifies you when it happens.',
  path: '/ai-features/behavioral-anomaly-detection',
};

export const metadata = generatePageMeta({ ...pageMeta });

const examplePrompts = [
  { prompt: 'Alert me if anyone starts fighting', watches: 'Physical altercation between two or more people' },
  { prompt: 'Tell me if someone is smoking in the loading bay', watches: 'Smoking in a zone where it is prohibited' },
  { prompt: 'Notify me about vandalism or damage to property', watches: 'Deliberate damage to fixtures, vehicles or signage' },
  { prompt: 'Watch for anyone climbing the fence', watches: 'Trespassing over a boundary rather than through a gate' },
  { prompt: 'Flag people hanging around the entrance after closing', watches: 'Sustained presence with no apparent purpose' },
  { prompt: 'Let me know if someone is tampering with the cameras', watches: 'Interference with equipment' },
];

const faqs = [
  {
    question: 'What is behavioral anomaly detection?',
    answer:
      'Behavioral anomaly detection lets an operator describe, in ordinary language, a behaviour they want monitored — for example "alert me if anyone starts fighting" or "tell me if someone is smoking near the loading bay". Camzify interprets that description, watches the people appearing in the selected camera views, and raises a notification when the described activity is observed. It differs from a conventional detection model because the behaviour is defined by the operator in words rather than chosen from a fixed list.',
  },
  {
    question: 'How is this different from the other detection models?',
    answer:
      'The other models are purpose-built for one thing each: a line-crossing model watches a tripwire, a PPE model watches for helmets and vests. Behavioral anomaly detection is defined at the point of use. You describe the behaviour and the system interprets it, so you are not limited to the behaviours someone anticipated when the model catalogue was built.',
  },
  {
    question: 'What kinds of behaviour can I ask it to watch for?',
    answer:
      'Behaviours that are visible in the camera view and describable in a sentence. Fighting, smoking, vandalism, climbing a fence, loitering near an entrance and interfering with equipment are all typical. Behaviours that depend on information the camera cannot see — intent, identity, or anything happening off-frame — are outside what any video system can determine.',
  },
  {
    question: 'Do I need to write the description in a particular format?',
    answer:
      'No. The input is ordinary language. Natural-language processing interprets the description into what the system should watch for, so "alert me if people start fighting" and "notify me about physical altercations" resolve to the same monitoring behaviour. Being specific about the location or time window narrows it usefully.',
  },
  {
    question: 'Does it run continuously or only during a patrol round?',
    answer:
      'It runs continuously on the cameras you activate it for, and notifies in real time when the described behaviour is observed. It also contributes to virtual patrolling: anything it flagged between rounds is logged against the relevant camera in that round\'s report, so the patrol record reflects what happened while nobody was checking.',
  },
  {
    question: 'How does a notification arrive?',
    answer:
      'Through the same queue as every other detection, with severity, site, camera and a timestamp, routed to the contact assigned to that camera. It carries an acknowledgement state and can be marked a false positive, which records the system\'s behaviour on that camera and that description.',
  },
  {
    question: 'Can I run more than one behaviour on the same camera?',
    answer:
      'Yes. A camera can carry several descriptions at once — a loading bay might watch for both smoking and vandalism — and each is evaluated independently, so a notification names which description it matched.',
  },
];

export default function BehavioralAnomalyDetectionPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      breadcrumbs={[
        { label: 'AI Features', href: '/ai-features' },
        { label: 'Behavioral Anomaly Detection' },
      ]}
    >
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-live">Now shipping</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Behavioral Anomaly Detection
          </h1>
          <p className="mt-6 max-w-prose text-body leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Describe the behaviour you want watched, in your own words, and Camzify monitors for
              it.
            </strong>{' '}
            Type &ldquo;alert me if anyone starts fighting&rdquo; or &ldquo;tell me if someone is
            smoking in the loading bay&rdquo;. Natural-language processing interprets what you have
            asked for, the system watches the people appearing in the cameras you selected, and a
            notification is raised when that activity is observed.
          </p>
          <p className="mt-4 max-w-prose text-body leading-relaxed text-muted-foreground">
            Every other detection model on the platform is built for one job decided in advance.
            This one is defined at the point of use, which means you are not restricted to the
            behaviours someone anticipated when the catalogue was written.
          </p>

          <div className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Describe it the way you would say it</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                There is no rule syntax and no zone geometry to draw. These are the kinds of
                descriptions operators actually write, and what each one puts the system on watch
                for.
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {examplePrompts.map((e) => (
                <div key={e.prompt} className="console-panel p-6">
                  <p className="font-mono text-sm leading-relaxed text-primary">
                    &ldquo;{e.prompt}&rdquo;
                  </p>
                  <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
                    <span className="font-mono text-mono-sm uppercase text-muted-foreground">
                      Watches for
                    </span>
                    <br />
                    {e.watches}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Interpreting the description</h3>
                <p className="mt-2 text-muted-foreground">
                  Natural-language processing turns what you typed into what the system should watch
                  for. Two differently-worded descriptions of the same behaviour resolve to the same
                  monitoring, so you do not have to learn a phrasing convention.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Watching the subjects</h3>
                <p className="mt-2 text-muted-foreground">
                  The people appearing in the selected views are tracked using{' '}
                  <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">
                    multi-object tracking
                  </Link>
                  , so a subject keeps a persistent identity across frames while their behaviour is
                  assessed against the description rather than judged from a single frame.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Raising the notification</h3>
                <p className="mt-2 text-muted-foreground">
                  When the described activity is observed, an alert enters the{' '}
                  <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">
                    notification queue
                  </Link>{' '}
                  naming the camera, the time and which description it matched, routed to the
                  contact assigned to that camera.
                </p>
              </div>
            </ScrollReveal>
            <PlaceholderVisual
              type="config-ui"
              caption="BEHAVIOUR DESCRIPTION"
              alt="Configuration panel showing a plain-language behaviour description entered against a selected group of cameras"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why this matters operationally</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Every site has behaviours that matter locally and appear on no vendor&rsquo;s
                  feature list. Smoking beside a fuel store. People climbing on stacked pallets.
                  Someone propping a fire door. These are obvious to whoever runs the site and
                  invisible to a fixed model catalogue.
                </p>
                <p>
                  Historically the only options were to accept the gap or commission a custom model.
                  Describing the behaviour in a sentence removes that trade-off, and it means the
                  system can be adjusted by the person who understands the site rather than by the
                  vendor.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual
              type="report"
              caption="BEHAVIOUR ALERT"
              alt="Notification showing a matched behaviour description with camera, timestamp and acknowledgement state"
            />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
                <p className="mt-4 text-muted-foreground">
                  Behavioural alerts run continuously rather than only at patrol time, but they feed
                  the same record. Anything flagged between rounds is logged against the relevant
                  camera in the next{' '}
                  <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">
                    patrol report
                  </Link>
                  , so the round reflects what happened while nobody was checking rather than only
                  what was true at the moment of the check.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {[
                    ['Retail', '/industries/retail'],
                    ['Construction Sites', '/industries/construction-sites'],
                    ['Education Facilities', '/industries/education-facilities'],
                    ['Property Management', '/industries/property-management'],
                  ].map(([l, h]) => (
                    <Link key={h} href={h} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {[
                    ['Aggression & Fight', '/ai-features/aggression-and-fight-detection'],
                    ['Multi-Object Tracking', '/ai-features/multi-object-tracking'],
                    ['AI Suspect Search', '/ai-features/forensic-video-search'],
                  ].map(([l, h]) => (
                    <Link key={h} href={h} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {[
                    ['Vandalism Prevention', '/use-cases/vandalism-prevention'],
                    ['Trespassing Detection', '/use-cases/trespassing-detection'],
                    ['After-Hours Monitoring', '/use-cases/after-hours-monitoring'],
                  ].map(([l, h]) => (
                    <Link key={h} href={h} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <div className="mx-auto mt-8 max-w-3xl text-left">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
