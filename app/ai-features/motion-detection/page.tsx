import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Motion Detection | AI Motion Detection Software",
  description: "Camzify AI motion detection filters noise, lighting shifts and environmental change. Intelligent background subtraction reduces false alarms.",
  path: "/ai-features/motion-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is motion detection and how is it different from line or zone intrusion detection?', answer: 'Motion detection flags meaningful movement anywhere in the frame using background-subtraction analysis, without evaluating a specific line or zone. Line and zone intrusion detection go a step further, requiring a confirmed object track to cross a defined boundary or enter a defined area before firing.' },
  { question: 'Does motion detection replace multi-object tracking?', answer: 'No. Motion detection identifies candidate regions of meaningful change in the frame. Those candidates are then handed off to multi-object tracking, which confirms whether the movement corresponds to an actual person, vehicle, or other object before an alert is generated.' },
  { question: 'How does Camzify avoid the false-alarm problem of legacy motion detection?', answer: 'Instead of comparing raw pixel values frame to frame, the system models what the static background of a scene normally looks like and only flags regions that deviate from that model, filtering out lighting transitions, auto-exposure changes, and small repetitive movement like foliage in wind.' },
  { question: 'Can I stop a camera alerting on animals or on anything that is not a person?', answer: 'Yes. Each camera carries an object filter that restricts alerts to Person, Vehicle or Animal, so a car park camera can ignore a cat crossing at 3am while still reporting a person on foot. It works alongside the sensitivity setting and the minimum object size threshold rather than replacing them.' },
  { question: 'What is the difference between an inclusion zone and an exclusion zone?', answer: 'An inclusion zone limits assessment to the area you draw, so everything outside it is ignored. An exclusion zone does the reverse: the rest of the frame is assessed and the area you draw is left out. Most false-alarm problems are solved with an exclusion zone over the specific thing that moves and does not matter — a tree line, a public pavement, a flapping banner.' },
  { question: 'Can I mask out parts of the camera view?', answer: 'Yes. Masked regions can be drawn over areas like public streets, tree lines, or reflective surfaces that would otherwise generate motion candidates, so the system only evaluates the parts of the frame that matter.' },
  { question: 'Does motion detection work with PTZ (moving) cameras?', answer: 'Motion detection is built around a modeled static background, so it performs best on fixed camera views. A PTZ camera that is actively panning or zooming will temporarily invalidate the background model until it settles on a new fixed position.' },
  { question: 'What happens after a motion event is confirmed?', answer: 'A confirmed motion event includes a timestamp, the affected region of the frame, and a snapshot, and routes through the notification queue with the same acknowledgement and false-positive marking workflow as every other alert type.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Motion Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Motion Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">Motion detection uses background-subtraction analysis to identify meaningful movement in the camera view while filtering out camera noise, lighting shifts, and environmental changes. Unlike legacy pixel-based motion detection — which generates an estimated 90% false alarm rate across the industry — Camzify applies intelligent filtering to separate real activity from noise.</p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Vehicles entering a driveway or parking area after hours</li>
                  <li className="flex gap-2">• People walking through a loading zone during closed hours</li>
                  <li className="flex gap-2">• Package or equipment movement in a storage area</li>
                  <li className="flex gap-2">• Any activity in a room that should be empty overnight</li>
                  <li className="flex gap-2">• Movement near an entrance during non-business hours</li>
                  <li className="flex gap-2">• Sudden activity in an area with no scheduled foot traffic</li>
                </ul>
              </div>
            </ScrollReveal>
            <div className="overflow-hidden rounded-xl bg-card">
              <SiteImage
              src="/motion-detection-1.jpg"
                alt="Camzify motion detection zone configuration showing a shipment truck flagged inside a drawn detection zone at a warehouse entry point"
                className="aspect-video w-full object-cover"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            </div>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why motion detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Every camera-based security system starts with the same basic question: did something change in this frame? Naive pixel-difference motion detection answers that question too literally — a passing cloud shadow, a fluttering flag, autoexposure hunting in low light, or a spider building a web in front of the lens all register as "motion" exactly the same as a person walking through frame.</p>
                <p>That literalism is why legacy motion detection has a reputation for flooding operators with alerts nobody trusts. Once an alert feed is mostly noise, people stop looking at it, and the one alert that mattered gets lost in the pile with the hundreds that didn't.</p>
                <p>Camzify's motion detection separates the two by modeling what "normal" looks like for a scene and only flagging genuine deviations — a foreground object entering a background that has been established as static — before that candidate is handed off to object detection and tracking for confirmation.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="BACKGROUND MODEL" alt="Diagram showing background subtraction isolating a moving foreground object from a static modeled background" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Background subtraction</h3>
                <p className="mt-2 text-muted-foreground">
                  The engine continuously builds a statistical model of the static background for every camera feed. Regions of the frame are flagged only where pixels deviate from that model beyond a threshold — not simply anywhere the raw image differs from one frame to the next.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Noise filtering</h3>
                <p className="mt-2 text-muted-foreground">
                  Candidate motion regions are filtered against known sources of noise — lighting transitions, camera auto-exposure adjustments, compression artifacts, and small repetitive movement like foliage in wind — before being passed on. Motion candidates that survive filtering are handed to <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> for object confirmation, which is what ultimately determines whether an alert fires.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Confirmed motion events include a timestamp, the affected region of the frame, and a snapshot. They route through the <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification queue</Link> alongside every other alert type, with the same acknowledgement and false-positive marking workflow.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Motion detection is tuned per camera in the configuration panel. Each camera supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Sensitivity set to Low, Medium, High or a custom level, to match scene complexity</li>
                  <li className="flex gap-2">• Inclusion and exclusion zones, so a tree line or a public pavement is never assessed at all</li>
                  <li className="flex gap-2">• A minimum object size threshold, to ignore movement below the size you care about</li>
                  <li className="flex gap-2">• An object filter, so a camera alerts only on Person, Vehicle or Animal rather than on any motion</li>
                  <li className="flex gap-2">• Schedule-based activation, e.g. after-hours only</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  These stack. A loading yard that alerts all night on foliage usually needs an
                  exclusion zone over the tree line and an object filter set to Person and Vehicle —
                  after which the same camera reports the arrivals that matter and stays quiet for
                  everything else.
                </p>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="MOTION SENSITIVITY" alt="Configuration panel showing motion sensitivity, masked regions, and schedule controls for a camera feed" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="AFTER-HOURS MONITORING" alt="Facility view showing motion detection masked zones covering entrances and storage areas during closed hours" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A warehouse floor that should show zero activity between closing and the morning shift</li>
                  <li className="flex gap-2">• A parking lot where vehicle movement after hours warrants a check</li>
                  <li className="flex gap-2">• A rooftop or utility area masked to ignore blowing debris but still catch a person</li>
                  <li className="flex gap-2">• A retail storeroom monitored for movement outside stocking hours</li>
                  <li className="flex gap-2">• A construction site where any nighttime movement is worth a look</li>
                  <li className="flex gap-2">• A back office corridor where motion outside business hours is unexpected</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                alerts from this detection model contribute to the compliance assessment at each camera stop
                and are logged in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 text-center">
              <h3 className="font-display text-lg font-bold">Related</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href="/ai-features" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">All AI Features</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
              <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
              <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
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
