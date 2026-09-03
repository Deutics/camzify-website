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
  title: "Fire & Smoke Detection | AI Visual Fire Detection Software",
  description: "Camzify fire and smoke detection spots visual smoke and flame directly from camera feeds, often before a heat sensor would trigger.",
  path: "/ai-features/fire-and-smoke-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How is this different from a smoke alarm?', answer: 'A smoke alarm reacts to particles or heat reaching the sensor itself, which takes time in a large or open space. Visual fire and smoke detection watches the camera feed directly and can catch visible smoke or flame the moment it appears in frame, often before it reaches a fixed sensor.' },
  { question: 'Does this replace fire alarm systems?', answer: 'No. It is a visual early-warning layer that complements existing fire alarm and suppression systems, not a certified life-safety replacement for them. It gives security teams an earlier visual alert and a timestamped clip to act on.' },
  { question: 'What triggers a false alarm risk, and how is it handled?', answer: 'Steam, dust, and fog can visually resemble smoke. The model is trained to reduce false positives from these sources, and every alert includes a clip and confidence score so a human can verify quickly before escalating to emergency response.' },
  { question: 'Does it need special cameras, like thermal cameras?', answer: 'No. Fire and smoke detection runs on the same standard visual camera feeds used for other Camzify detections. It doesn\'t require thermal or infrared hardware, though it can sit alongside those systems as an additional layer.' },
  { question: 'Can sensitivity be tuned per site?', answer: 'Yes. The confidence threshold that determines when a visual match fires an alert, along with the escalation rules for who gets notified, are both configurable per site or camera.' },
  { question: 'What happens if the camera\'s view is partially blocked by racking or equipment?', answer: 'Detection is limited to what is actually visible in frame, so a smoke source developing entirely behind tall racking or equipment may not be seen until it becomes visible. Camera placement with clear sightlines over the monitored area gets the most reliable coverage.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Fire & Smoke Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Fire & Smoke Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Catch smoke before it's a fire. Fire and smoke detection watches live camera feeds for visible flame
            and smoke, often flagging an event before it reaches a fixed heat or particle sensor.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Visible flame anywhere in the camera's field of view</li>
                  <li className="flex gap-2">• Visible smoke developing in storage, electrical, or industrial areas</li>
                  <li className="flex gap-2">• Early-stage events in large or open spaces before a fixed sensor triggers</li>
                  <li className="flex gap-2">• Smoke or flame in unattended areas overnight or on weekends</li>
                  <li className="flex gap-2">• Multiple simultaneous smoke sources indicating a fast-developing event</li>
                  <li className="flex gap-2">• Immediate, critical-severity alert routing to on-site staff</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="FIRE & SMOKE DETECTION" alt="Camera view of a storage area with visible smoke highlighted by a detection bounding box" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why fire and smoke detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Fixed heat and particle sensors only trigger once smoke or heat physically reaches the sensor location. In a large warehouse with high ceilings, an open yard, or a space with strong airflow, that can take long enough for a fire to become well established before the alarm sounds — the sensor is, by design, always reacting after the fact.</p>
                <p>The legacy backstop for that gap is staff simply noticing — someone smelling smoke or spotting flame and raising the alarm manually. That works during busy hours with people on the floor. It does not work overnight, in unattended buildings, or in areas with infrequent foot traffic, which is exactly when an undetected fire has the most time to spread before anyone responds.</p>
                <p>Visual detection watches the space itself rather than waiting for smoke to travel to a fixed point, so it can flag flame or smoke as soon as it is visible in frame — independent of ceiling height, airflow, or whether anyone happens to be nearby. It runs continuously, which is the part a human observer or a periodically-checked sensor cannot guarantee.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="VISUAL SIGNATURE MATCHING" alt="Diagram showing a camera feed analyzed for flame and smoke visual signatures before a critical alert fires" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Reading the visual signature</h3>
                <p className="mt-2 text-muted-foreground">
                  The model analyzes each camera's live feed for the visual signatures of flame and smoke — color, texture, and motion patterns distinct from ordinary movement in the scene. A confirmed match above the confidence threshold fires an alert immediately.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Filtering false triggers</h3>
                <p className="mt-2 text-muted-foreground">
                  Steam, dust, and fog can visually resemble smoke at a glance, so the model is trained to separate their distinct color, texture, and motion characteristics from an actual smoke or flame event before an alert fires.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Critical alert routing</h3>
                <p className="mt-2 text-muted-foreground">
                  Every alert is tagged critical severity by default and includes a clip, confidence score, and timestamp so the reviewing team can confirm and escalate to emergency response without delay. Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> with escalation rules configurable per site.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Fire and smoke detection is enabled per camera with default critical-severity alerting. Configurable options include:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Default critical-severity alerting per camera</li>
                  <li className="flex gap-2">• Continuous monitoring with no schedule restriction by default</li>
                  <li className="flex gap-2">• Optional schedule restriction for sites that want one</li>
                  <li className="flex gap-2">• Escalation rules per site, e.g. who is notified first</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="FIRE & SMOKE CONFIGURATION" alt="Configuration panel showing critical-severity alerting and escalation rules for a camera" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="FACILITY-WIDE FIRE MONITORING" alt="Site map showing fire and smoke detection coverage across storage, electrical, and warehouse areas" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A storage area with racked combustible materials where smoke in an aisle triggers an immediate alert</li>
                  <li className="flex gap-2">• An electrical room where any visible flame is treated as critical regardless of time of day</li>
                  <li className="flex gap-2">• A large, high-ceilinged warehouse where a fixed heat sensor sits far from where a fire could start</li>
                  <li className="flex gap-2">• An unattended facility overnight, when no staff are present to notice smoke directly</li>
                  <li className="flex gap-2">• A self-storage site with many separate units and limited continuous foot traffic</li>
                  <li className="flex gap-2">• An outdoor waste or recycling yard where a fire could develop before it reaches an indoor sensor</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fire and smoke detection runs continuously rather than only during scheduled checks, but an
                event during an active <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round
                is logged immediately as a critical non-compliance event in the patrol report.
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
                  <Link href="/industries/self-storage" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Self-Storage</Link>
                  <Link href="/industries/energy" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Energy</Link>
                  <Link href="/industries/waste-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Waste Management</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering</Link>
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/remote-site-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Remote Site Monitoring</Link>
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
