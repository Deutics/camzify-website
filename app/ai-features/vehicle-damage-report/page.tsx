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
  title: "Vehicle Damage Report | AI Vehicle Condition Camera Software",
  description: "Camzify vehicle damage report documents dents and scratches on vehicles entering or leaving a site, timestamped and logged automatically.",
  path: "/ai-features/vehicle-damage-report",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'When is a vehicle checked for damage?', answer: 'A vehicle is checked as it passes through a configured entry or exit point on-site, so a condition record is captured automatically at hand-off — for example when a rental, fleet, or valet vehicle enters or leaves.' },
  { question: 'What counts as documented damage?', answer: 'The system flags visible dents, scratches, and other exterior condition changes captured in the camera view, with a timestamped clip attached to the vehicle\'s entry or exit event for later comparison.' },
  { question: 'Can I compare a vehicle\'s condition between two visits?', answer: 'Yes. Because each entry and exit produces a timestamped record, two records for the same vehicle can be compared side by side to establish whether damage occurred during the time it was on-site.' },
  { question: 'Does it identify who caused the damage?', answer: 'No. The system documents a timestamped condition record at entry and exit — it doesn\'t determine fault or liability. That record is meant to support a human review or dispute process, not replace it.' },
  { question: 'How accurate is automated damage detection compared to a manual inspection?', answer: 'It reliably flags visible exterior condition changes captured in the camera view, but it isn\'t a substitute for a close-up manual inspection. It works best as a consistent record layer that captures condition at every pass, something a manual check at a busy checkpoint often misses.' },
  { question: 'Can I retrieve a damage record for a specific vehicle later?', answer: 'Yes. Records are retrievable through the platform\'s analytics and reporting module and can be pulled up by checkpoint and time range when a dispute or claim needs supporting footage.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Vehicle Damage Report' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Vehicle Damage Report</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A dent, a scratch, documented. Vehicle damage report captures the exterior condition of vehicles
            as they enter or leave a site, timestamped and logged automatically for later comparison.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Visible dents and scratches on vehicles at entry or exit points</li>
                  <li className="flex gap-2">• A timestamped condition record attached to each vehicle event</li>
                  <li className="flex gap-2">• Side-by-side comparison between entry and exit records for the same vehicle</li>
                  <li className="flex gap-2">• A defensible record for disputed damage claims</li>
                  <li className="flex gap-2">• Condition records retrievable per vehicle for insurance or liability review</li>
                  <li className="flex gap-2">• Coverage across multiple checkpoints for fleet or rental operations</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="VEHICLE DAMAGE REPORT" alt="Camera view of a vehicle at an entry point with a highlighted area of exterior damage" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why vehicle damage report matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Vehicle condition disputes almost always come down to a "he said, she said" problem. A rental customer says the scratch was already there; a fleet driver says the dent happened somewhere else; a valet guest says the car was fine when they handed it over. Without a record from the moment of hand-off, there's no way to settle it other than taking someone's word for it.</p>
                <p>A manual walk-around inspection can catch this, but it depends on a person doing it consistently, every single time, at every entry and exit — and writing down what they saw in a way that holds up later. On a busy site with dozens of vehicles moving through checkpoints a day, that consistency breaks down fast.</p>
                <p>An automated condition record removes the dependency on someone remembering to check and write it down. Every vehicle that passes a configured checkpoint gets a timestamped clip, whether it's the first vehicle of the day or the fiftieth.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="CONDITION RECORD LOGIC" alt="Diagram showing entry and exit condition records for the same vehicle being compared to identify a damage change" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Capturing condition at checkpoints</h3>
                <p className="mt-2 text-muted-foreground">
                  Cameras positioned at entry and exit points run <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> against
                  each vehicle passing through, capturing exterior condition alongside vehicle type and colour.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Building a comparable record</h3>
                <p className="mt-2 text-muted-foreground">
                  Each pass produces a timestamped record with a clip. Two records for the same vehicle — one
                  at entry, one at exit — can be compared to identify condition changes that occurred while it was on-site.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Where reports get used</h3>
                <p className="mt-2 text-muted-foreground">
                  Records are retrievable through the platform's <Link href="/platform/analytics-and-reporting" className="text-primary hover:underline">analytics and reporting</Link> module,
                  ready to pull up when a damage claim or dispute needs supporting evidence.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Entry and exit cameras are configured as vehicle checkpoints. Each checkpoint supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Checkpoint role — entry, exit, or both</li>
                  <li className="flex gap-2">• Vehicle-class filtering, e.g. passenger vehicles only</li>
                  <li className="flex gap-2">• Schedule-based activation, e.g. active only during operating hours</li>
                  <li className="flex gap-2">• Record retention window for stored condition clips</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="CHECKPOINT CONFIGURATION" alt="Configuration panel showing an entry checkpoint camera assigned to capture vehicle condition records" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="VEHICLE CHECKPOINTS" alt="Site map showing entry and exit checkpoint cameras positioned to capture vehicle condition records" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A rental vehicle checked at both pickup and return to establish condition change</li>
                  <li className="flex gap-2">• A valet operation documenting vehicle condition on arrival and at retrieval</li>
                  <li className="flex gap-2">• A fleet vehicle entering and leaving a depot multiple times a day, each pass logged</li>
                  <li className="flex gap-2">• A logistics yard capturing trailer or truck condition at gate entry</li>
                  <li className="flex gap-2">• A dispute over pre-existing damage resolved using timestamped entry footage</li>
                  <li className="flex gap-2">• A multi-site operator comparing condition records for the same vehicle across locations</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Vehicle damage records are captured continuously at checkpoints rather than as part of a
                scheduled checklist, but summary activity at a monitored entry or exit point can be reviewed
                alongside <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> reports for that site.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/automotive" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Automotive</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/energy" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Energy</Link>
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/wrong-way-vehicle-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Wrong-Way Vehicle Detection</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/vehicle-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Vehicle Monitoring</Link>
                  <Link href="/use-cases/incident-investigation" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Incident Investigation</Link>
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
