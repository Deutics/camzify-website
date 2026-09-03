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
  title: "Illegal Parking Detection | AI Parking Enforcement Camera Software",
  description: "Camzify illegal parking detection flags vehicles blocking fire lanes, loading zones, or reserved spots instantly, with a timestamped clip.",
  path: "/ai-features/illegal-parking-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What areas can be monitored?', answer: 'Any zone visible to a connected camera can be marked as restricted — fire lanes, loading docks, reserved or accessible spots, and gated-community driveways. A vehicle parked in a marked zone past a configurable grace period triggers an alert.' },
  { question: 'How is a vehicle plate captured?', answer: 'When AI attribute extraction is enabled, alerts can include vehicle attributes such as color and type. Plate-level detail depends on camera angle and resolution at that location.' },
  { question: 'Does it distinguish a quick stop from illegal parking?', answer: 'Yes. A configurable grace period filters out brief stops for loading or drop-off, so only vehicles that remain in a restricted zone past the threshold trigger an alert.' },
  { question: 'Does it require a specific camera angle?', answer: 'A wide, unobstructed view of the restricted zone gives the most reliable dwell-time tracking. Angled or partially obstructed views still work, but a clear line of sight to the zone boundary reduces the chance of a vehicle being lost from the track mid-dwell.' },
  { question: 'How does this compare to physical parking sensors or barriers?', answer: 'Physical sensors and barriers control access at a single point and require dedicated hardware per space. Illegal parking detection runs on the same cameras already covering the site, monitors an entire zone rather than one spot, and produces a reviewable clip rather than just a binary occupied/unoccupied signal.' },
  { question: 'Can enforcement staff dispute a flagged alert?', answer: 'Yes. Every alert appears in the notification queue with its clip and dwell time, and can be marked as a false positive by the reviewing staff member, which helps refine sensitivity for that zone over time.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Illegal Parking Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Illegal Parking Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Parked where it shouldn't be? Flagged instantly. Illegal parking detection watches fire lanes,
            loading zones, and reserved spots, and alerts the moment a vehicle overstays a restricted area.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Vehicles blocking marked fire lanes or emergency access routes</li>
                  <li className="flex gap-2">• Vehicles occupying loading zones or reserved parking beyond a grace period</li>
                  <li className="flex gap-2">• Unauthorized vehicles in gated or accessible-only spots</li>
                  <li className="flex gap-2">• A timestamped clip for enforcement or towing requests</li>
                  <li className="flex gap-2">• Vehicles parked in accessible spots without a visible permit</li>
                  <li className="flex gap-2">• Repeated illegal parking in the same restricted zone across multiple visits</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="ILLEGAL PARKING DETECTION" alt="Camera view of a fire lane with an illegally parked vehicle highlighted by a detection bounding box" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why illegal parking detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A fire lane or loading zone is only as clear as the last person who checked it. On a site covered by walking patrols or occasional drive-throughs, a vehicle can block emergency access or a delivery bay for hours before anyone notices — and by the time it's noticed, the disruption has already happened.</p>
                <p>Manual enforcement also runs into a consistency problem. A guard who has to remember which spots are reserved, which zones allow a short grace period, and which don't, will apply the rule differently shift to shift. Signage helps, but signage doesn't stop a vehicle from parking illegally — it only sets the expectation that someone is watching.</p>
                <p>Continuous AI monitoring closes that gap. Every restricted zone is watched every minute the camera is live, the grace period is applied identically every time, and enforcement or property staff get a timestamped clip instead of a verbal report written after the fact.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="DWELL TIMER LOGIC" alt="Diagram showing a vehicle track entering a restricted zone and a dwell timer counting toward the grace period threshold" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Marking restricted zones</h3>
                <p className="mt-2 text-muted-foreground">
                  Restricted zones are marked on the camera view — a fire lane, a loading dock, a reserved or
                  accessible spot, a gated driveway. Any area a camera can see can be defined as restricted.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">The dwell timer</h3>
                <p className="mt-2 text-muted-foreground">
                  <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-object tracking</Link> confirms
                  when a vehicle enters a marked zone and how long it dwells there. A vehicle remaining past
                  the configured grace period fires an alert; one that leaves within the grace period never does.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Every alert includes a clip, dwell time, and — when <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> is
                  enabled — vehicle color and type. Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> to
                  the guard or property team responsible for enforcement.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Restricted zones and grace periods are configured per camera. Each zone supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Zone boundaries drawn directly on the camera view</li>
                  <li className="flex gap-2">• Grace period duration, independently set per zone</li>
                  <li className="flex gap-2">• Notification window per camera, e.g. notify in enforcement hours only</li>
                  <li className="flex gap-2">• Vehicle-class filtering for the alerted zone</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="ZONE & GRACE PERIOD CONFIGURATION" alt="Configuration panel showing a restricted parking zone drawn on a camera view with a grace period slider" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="PARKING ENFORCEMENT" alt="Site map showing multiple restricted parking zones monitored across a property's fire lanes and loading docks" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A delivery van parked in a fire lane longer than the grace period during business hours</li>
                  <li className="flex gap-2">• A vehicle occupying a reserved accessible spot without a visible permit</li>
                  <li className="flex gap-2">• A guest vehicle left overnight in a staff-only loading zone</li>
                  <li className="flex gap-2">• A car blocking a gated community's fire access lane during an evening event</li>
                  <li className="flex gap-2">• Repeated illegal parking in the same loading zone across a week, visible in the historical record</li>
                  <li className="flex gap-2">• A vehicle parked across two reserved spots flagged for review</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                an active illegal-parking event at a monitored zone contributes to the compliance assessment
                at that camera stop and is logged alongside the checklist results in the patrol report.
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
                  <Link href="/industries/healthcare" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Healthcare</Link>
                  <Link href="/industries/construction-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Construction Sites</Link>
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/wrong-way-vehicle-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Wrong-Way Vehicle Detection</Link>
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
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
