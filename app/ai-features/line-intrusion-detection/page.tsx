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
  title: "Line Intrusion Detection | Virtual Tripwire Camera Software",
  description: "Camzify line intrusion detection places a virtual tripwire across any area with directional control. Fires on confirmed object tracks, not pixel motion.",
  path: "/ai-features/line-intrusion-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is line intrusion detection?', answer: 'Line intrusion detection, also called line crossing detection or virtual tripwire, is an AI capability that triggers an alert when a tracked object crosses a defined line in the camera view. Unlike pixel-based motion detection, it operates on confirmed object tracks — meaning shadows, lighting changes, and camera noise do not trigger false alarms.' },
  { question: 'Can I set the crossing direction?', answer: 'Yes. Each line can be configured for directional control — left-to-right, right-to-left, or both directions. This is essential for scenarios like one-way gates, loading dock entrances, or perimeter fences where you only care about inbound crossings.' },
  { question: 'How is this different from motion detection?', answer: 'Motion detection responds to pixel changes in the frame. Line intrusion detection responds to a confirmed object track crossing a specific line. The difference is precision — motion detection catches everything including irrelevant movement; line intrusion catches only what matters.' },
  { question: 'How many lines can I draw on one camera?', answer: 'A single camera can support multiple lines, each with its own direction, sensitivity, and schedule. A wide-angle view of a fence line, for example, can carry separate lines for a vehicle gate and a pedestrian gap without needing a second camera.' },
  { question: 'Will it fire on animals or blowing debris?', answer: 'The underlying object tracker is trained to distinguish people, vehicles, and other confirmed object classes from environmental movement like blowing leaves, rain, or small animals. Object classes to alert on can also be restricted per line, so a perimeter line can be set to ignore anything that isn\'t a person or vehicle.' },
  { question: 'Does line intrusion detection work at night?', answer: 'Detection quality at night depends on the camera\'s own low-light or infrared performance rather than the detection model itself. Any camera feed with enough visibility for a human reviewer to identify a person or vehicle is enough for the tracker to build a confirmed object track.' },
];

export default function LineIntrusionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Line Intrusion Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Line Intrusion Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Line intrusion detection is a virtual tripwire placed across any area in the camera view, with
            directional control. It fires when a confirmed object track crosses the line — not when a shadow
            moves or a light flickers. This is the foundation of perimeter security in Camzify.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• People crossing a perimeter fence line</li>
                  <li className="flex gap-2">• Vehicles entering a restricted loading zone</li>
                  <li className="flex gap-2">• Directional crossings at one-way gates or turnstiles</li>
                  <li className="flex gap-2">• After-hours movement across secured boundaries</li>
                  <li className="flex gap-2">• Repeated crossings at the same line within a short window</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="LINE INTRUSION DETECTION" alt="Camera view showing a virtual tripwire line with directional arrows and detected object crossing" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why line intrusion detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A perimeter fence or boundary line only works as a deterrent if someone — or something — is watching it continuously. A guard on a walking patrol covers a boundary for a few minutes every hour at best; the rest of the time, the line is unmonitored.</p>
                <p>Fixed motion sensors and basic pixel-change alarms fill some of that gap, but they trigger on anything that moves in frame — a delivery truck passing on the street outside a fence, a tree branch in the wind, a cat crossing the yard. Security teams either drown in false alerts or tune sensitivity down until real crossings get missed too.</p>
                <p>Line intrusion detection solves both problems at once: it watches the boundary every second of every day, and it only fires when a confirmed person or vehicle track actually crosses the line in the direction that matters.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="TRIPWIRE LOGIC" alt="Diagram showing a directional line rule evaluating an object track's trajectory before firing an alert" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Detecting the crossing</h3>
                <p className="mt-2 text-muted-foreground">
                  The model uses <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> to
                  maintain a persistent identity for every subject in the frame, frame over frame. A single confirmed track — not a single frame of pixel change — is what the line rule evaluates.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Directional logic</h3>
                <p className="mt-2 text-muted-foreground">
                  When a tracked object's trajectory intersects the defined line, the system checks the direction of travel against the configured rule. A line set to alert only on inbound crossings ignores a subject walking away from the boundary, cutting the alert volume roughly in half at most perimeter points.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Each alert includes the object type, confidence score, timestamp, and — when <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> is enabled — structured attributes like clothing colour and behaviour description. Alerts route through the platform's notification system and appear in the <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification queue</Link> with severity, acknowledgement status, and the option to mark as false positive.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Lines are drawn directly on the camera view in the configuration panel. Each line supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Directional control — A→B, B→A, or bidirectional</li>
                  <li className="flex gap-2">• Sensitivity adjustment per line</li>
                  <li className="flex gap-2">• Schedule-based activation, e.g. after-hours only</li>
                  <li className="flex gap-2">• Object-class filtering, e.g. people and vehicles only</li>
                  <li className="flex gap-2">• Multiple lines per camera, each with independent rules</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="LINE CONFIGURATION" alt="Configuration panel showing a directional line drawn across a camera view with sensitivity and schedule controls" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="PERIMETER MONITORING" alt="Site map showing multiple line intrusion rules placed across a facility's perimeter fence and vehicle gates" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A perimeter fence line monitored after business hours, alerting only on inbound crossings</li>
                  <li className="flex gap-2">• A loading dock lane where vehicle crossings outside scheduled delivery windows trigger an alert</li>
                  <li className="flex gap-2">• A rooftop access hatch where any crossing at all is treated as non-compliant</li>
                  <li className="flex gap-2">• A parking structure boundary that separates public and staff-only areas</li>
                  <li className="flex gap-2">• A construction site fence line active only overnight and on weekends</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                line intrusion alerts contribute to the compliance assessment at each camera stop. If an alert
                fired between rounds, it is logged alongside the checklist results in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                  <Link href="/industries/manufacturing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Manufacturing</Link>
                  <Link href="/industries/construction-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Construction Sites</Link>
                  <Link href="/industries/energy" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Energy</Link>
                  <Link href="/industries/remote-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Remote Sites</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                  <Link href="/use-cases/unauthorized-access-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Unauthorised Access</Link>
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
