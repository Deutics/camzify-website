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
  title: "Wrong-Way Vehicle Detection | AI Traffic Direction Camera Software",
  description: "Camzify wrong-way vehicle detection alerts on vehicles travelling against a defined direction of traffic, before a collision.",
  path: "/ai-features/wrong-way-vehicle-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How is the correct direction of travel defined?', answer: 'A directional rule is drawn on the camera view for each one-way lane, ramp, or entry/exit point, similar to configuring a line intrusion rule. Any confirmed vehicle track moving against that direction triggers an alert.' },
  { question: 'Where does this get used?', answer: 'One-way site roads, parking garage ramps, loading dock lanes, and gated entry or exit lanes — anywhere a wrong-way vehicle creates a collision risk with oncoming traffic or pedestrians.' },
  { question: 'How fast is the alert after a wrong-way vehicle is detected?', answer: 'Detection and alert routing happen in near real time from the moment the vehicle\'s track crosses the directional rule, so security can respond or warn oncoming traffic before a collision occurs.' },
  { question: 'Does it only flag vehicles, or can pedestrians trigger it too?', answer: 'Wrong-way detection is built around vehicle lanes and ramps, and object-class filtering is typically set to vehicles only. The underlying tracker can identify other object classes, but the directional rule itself is intended for traffic direction, not pedestrian flow.' },
  { question: 'What if a vehicle briefly reverses, for example to park or turn around?', answer: 'The directional rule evaluates a vehicle track\'s sustained direction of travel across the defined line, not a single momentary movement, which keeps the feature focused on vehicles actually travelling the wrong way rather than routine maneuvering near the rule.' },
  { question: 'Can wrong-way detection and line intrusion detection run on the same camera?', answer: 'Yes. Directional rules and line intrusion rules are independent configurations, so a single camera covering a ramp or gated lane can run both at once, each with its own alert logic.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Wrong-Way Vehicle Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Wrong-Way Vehicle Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Going the wrong way? Alerted in seconds. Wrong-way vehicle detection watches one-way lanes and ramps
            and fires an alert the moment a vehicle travels against the defined direction of traffic.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Vehicles travelling against the defined direction on a one-way lane</li>
                  <li className="flex gap-2">• Wrong-way entries on parking garage ramps</li>
                  <li className="flex gap-2">• Wrong-way movement through gated entry or exit lanes</li>
                  <li className="flex gap-2">• Immediate alert routing before a collision develops</li>
                  <li className="flex gap-2">• Wrong-way movement on shared vehicle and pedestrian ramps</li>
                  <li className="flex gap-2">• A timestamped clip and direction of travel for every violation</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="WRONG-WAY VEHICLE DETECTION" alt="Camera view of a one-way ramp with a wrong-way vehicle highlighted by a directional detection overlay" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why wrong-way vehicle detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A one-way ramp or lane only works as intended if every driver follows the arrows. In practice, a wrong turn, a missed sign, or a driver trying to save thirty seconds by cutting against traffic can put a vehicle head-on into oncoming cars or pedestrians with almost no warning.</p>
                <p>Static signage can't stop a driver who isn't looking for it, and a guard stationed at a ramp entrance can't watch every lane on a site at once. By the time someone notices a vehicle going the wrong way, it may already be most of the way down the ramp.</p>
                <p>Continuous AI monitoring catches the violation at the moment it starts — the instant a tracked vehicle crosses the directional rule against traffic — giving security or on-site staff the seconds they need to warn oncoming vehicles or intervene before a collision.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="DIRECTIONAL RULE LOGIC" alt="Diagram showing a vehicle track evaluated against a directional rule before firing a wrong-way alert" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Setting the directional rule</h3>
                <p className="mt-2 text-muted-foreground">
                  A directional rule is drawn across the lane in the camera view, similar to configuring <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion detection</Link>.
                  The rule defines which direction of travel is legal for that lane or ramp.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Confirming the violation</h3>
                <p className="mt-2 text-muted-foreground">
                  <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-object tracking</Link> confirms
                  each vehicle's direction of travel against that rule. A vehicle track moving against the
                  defined direction fires an alert with a clip, direction of travel, and timestamp.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> to
                  on-site staff for immediate response, with enough detail to act before the vehicle reaches oncoming traffic.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Directional rules are drawn per lane or ramp in the configuration panel. Each rule supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Directional orientation set per lane or ramp</li>
                  <li className="flex gap-2">• Sensitivity adjustment per rule</li>
                  <li className="flex gap-2">• Schedule-based activation, e.g. active only during operating hours</li>
                  <li className="flex gap-2">• Object-class filtering, e.g. vehicles only</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="DIRECTIONAL RULE CONFIGURATION" alt="Configuration panel showing a directional rule drawn across a ramp with sensitivity and schedule controls" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="RAMP & LANE MONITORING" alt="Site map showing directional rules placed across parking garage ramps and one-way site roads" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A vehicle entering a parking garage exit ramp instead of the entrance ramp</li>
                  <li className="flex gap-2">• A delivery truck reversing the wrong way down a one-way site road to save time</li>
                  <li className="flex gap-2">• A visitor vehicle exiting through an entry-only gated lane</li>
                  <li className="flex gap-2">• A driver cutting across a one-way loop road against the flow near a building entrance</li>
                  <li className="flex gap-2">• A wrong-way vehicle on a ramp shared with pedestrian foot traffic</li>
                  <li className="flex gap-2">• A contractor vehicle entering a restricted one-way service lane from the wrong end</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Wrong-way detection runs continuously rather than only during scheduled checks, but an event
                during an active <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round
                is logged immediately as a non-compliance event in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/manufacturing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Manufacturing</Link>
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                  <Link href="/industries/energy" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Energy</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/illegal-parking-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Illegal Parking Detection</Link>
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/parking-lot-surveillance" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Parking Lot Surveillance</Link>
                  <Link href="/use-cases/vehicle-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Vehicle Monitoring</Link>
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
