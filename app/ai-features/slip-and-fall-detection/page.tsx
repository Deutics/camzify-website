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
 */
const pageMeta = {
  title: "Slip & Fall Detection | AI Fall Detection Camera Software",
  description: "Camzify slip and fall detection flags falls in real time and routes an alert to the nearest guard, before it becomes an unresolved liability claim.",
  path: "/ai-features/slip-and-fall-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How does the system tell a fall apart from someone bending down?', answer: 'The model looks at the speed and pattern of a person\'s posture change and whether they remain on the ground afterward, rather than a single frame. A brief crouch or bend doesn\'t match the pattern; a rapid, uncontrolled drop followed by staying down does.' },
  { question: 'What happens after a fall is detected?', answer: 'An alert with a timestamped clip routes immediately to the nearest available guard through the notification system, so someone can respond in person or dispatch help, and the event is logged with a timestamp for incident records.' },
  { question: 'Is this useful for slip-and-fall liability claims?', answer: 'Yes. Every detected fall produces a timestamped clip that documents exactly what happened and when, which is useful both for getting help to the person quickly and for producing an accurate record if a claim is filed later.' },
  { question: 'Does it work in low light or at night?', answer: 'Detection quality depends on the camera\'s own low-light performance rather than the fall-detection model itself. Any feed with enough visibility for a human reviewer to make out a person\'s posture is enough for the tracker to register a fall pattern.' },
  { question: 'Does every camera need to be repositioned for reliable fall detection?', answer: 'It works with existing camera coverage of aisles, walkways, and entrances. Cameras with a clear view of the ground plane in the monitored area give the most reliable results, but no dedicated fall-detection hardware is required.' },
  { question: 'How is this different from a wearable fall-detection device?', answer: 'A wearable depends on the individual choosing to wear it, keeping it charged, and it functioning correctly at the moment of the fall. Camera-based detection covers anyone who passes through the monitored area without requiring them to opt in or wear anything.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Slip & Fall Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Slip & Fall Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A fall happens, help gets notified fast. Slip and fall detection flags falls in real time and routes
            an alert to the nearest guard — before an incident goes unnoticed and becomes an unresolved claim.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Rapid, uncontrolled posture changes consistent with a fall</li>
                  <li className="flex gap-2">• A person remaining on the ground after a fall event</li>
                  <li className="flex gap-2">• Falls in aisles, entrances, and walkways during business hours</li>
                  <li className="flex gap-2">• Falls near stairs, ramps, or wet-floor areas where risk is elevated</li>
                  <li className="flex gap-2">• A fallen individual who doesn't get back up within a short window</li>
                  <li className="flex gap-2">• Immediate alert routing to the nearest available guard</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="SLIP & FALL DETECTION" alt="Camera view of a retail aisle with a fallen person highlighted by a detection bounding box" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why slip and fall detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Falls tend to happen when no one is looking directly at the spot where it occurs — an aisle with no other customers nearby, a hallway between patrol rounds, an entrance during a quiet stretch. The gap between the fall and someone noticing is exactly the time when a minor injury can become a serious one, and it's the hardest part of the incident to control with staffing alone.</p>
                <p>The usual backstop is the person themselves calling for help, or a passerby happening to notice. Both are unpredictable — someone who is injured, disoriented, or elderly may not be able to call out, and low-traffic areas or off-hours periods can go long stretches without anyone walking through at all. A scheduled patrol round covers a location for a moment every so often, not continuously.</p>
                <p>Continuous AI monitoring removes the dependency on a witness being present. The moment a tracked subject's posture matches a fall pattern, an alert reaches the nearest guard directly, cutting the time between the event and a response — and producing a timestamped record of exactly what happened, independent of whether anyone saw it live.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="FALL PATTERN DETECTION" alt="Diagram showing a tracked subject's posture change over time crossing the fall-detection threshold" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Tracking posture over time</h3>
                <p className="mt-2 text-muted-foreground">
                  Built on <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link>, the
                  model watches each tracked subject's posture over time rather than evaluating a single frame in isolation.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Confirming a fall pattern</h3>
                <p className="mt-2 text-muted-foreground">
                  A rapid downward posture change followed by the subject remaining low or motionless crosses the alert threshold. Every alert includes a clip of the moments before and after the fall, timestamp, and location, so the responding guard has full context before arriving.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> with priority routing to the nearest assigned guard.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Slip and fall detection is enabled per camera. Configurable options include:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Operating hours during which the detection is active</li>
                  <li className="flex gap-2">• Sensitivity threshold for what counts as a fall pattern</li>
                  <li className="flex gap-2">• Priority routing rules to the nearest assigned guard</li>
                  <li className="flex gap-2">• Zone exclusions, e.g. seating or exercise areas where lying down is expected</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="FALL DETECTION CONFIGURATION" alt="Configuration panel showing sensitivity and priority routing settings for slip and fall detection" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="FALL RISK MONITORING" alt="Facility map showing camera coverage across aisles, entrances, and walkways for fall detection" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A grocery aisle where a customer slips on a wet floor and doesn't get back up</li>
                  <li className="flex gap-2">• A hospital or care facility corridor where a patient falls out of a chair</li>
                  <li className="flex gap-2">• A stairwell landing where a fall could otherwise go unnoticed for a long stretch</li>
                  <li className="flex gap-2">• An apartment building lobby or hallway during a quiet period</li>
                  <li className="flex gap-2">• A restaurant dining area during off-peak hours with few staff on the floor</li>
                  <li className="flex gap-2">• A building entrance during icy or wet weather conditions</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Slip and fall detection runs continuously rather than only during scheduled checks, but an
                event during an active <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round
                is logged immediately as a non-compliance event in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/healthcare" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Healthcare</Link>
                  <Link href="/industries/restaurants" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Restaurants</Link>
                  <Link href="/industries/residential" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Residential</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                  <Link href="/ai-features/behavioral-anomaly-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Behavioral Anomaly Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/incident-investigation" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Incident Investigation</Link>
                  <Link href="/use-cases/guard-tour-verification" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification</Link>
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
