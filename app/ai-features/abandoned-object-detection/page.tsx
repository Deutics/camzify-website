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
  title: "Abandoned Object Detection | AI Unattended Bag Detection Software",
  description: "Camzify abandoned object detection flags unattended bags and packages the moment they\\'re left behind and remain unclaimed.",
  path: "/ai-features/abandoned-object-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How long does an object need to sit before it\'s flagged?', answer: 'The system tracks the moment an object separates from the person who was carrying it and starts a configurable dwell timer. If the object remains unclaimed past that threshold, an alert fires — filtering out items briefly set down and immediately picked back up.' },
  { question: 'Does it work in crowded areas?', answer: 'The model relies on multi-object tracking to associate an object with the person who dropped it, which holds up in moderately busy areas. Very dense crowds can reduce tracking confidence, and confidence scores are included on every alert so a reviewer can judge reliability.' },
  { question: 'What counts as an abandoned object?', answer: 'Bags, boxes, and packages that separate from their carrier and remain stationary and unclaimed past the configured dwell time. The threshold and object types monitored are configurable per site.' },
  { question: 'Does it distinguish a deliberate drop-off, like a delivery, from a security concern?', answer: 'The base detection flags anything that separates from its carrier and stays unclaimed past the dwell threshold. Zones with expected drop-off activity, such as a loading dock or a designated parcel area, can be configured with a longer threshold or excluded from monitoring so routine deliveries don\'t generate alerts.' },
  { question: 'How is the dwell-time threshold chosen for a site?', answer: 'It\'s set per camera or zone based on how sensitive that area needs to be. Security teams commonly use a shorter threshold in high-security zones like transit platforms or government checkpoints, and a longer one in general public areas like a lobby or waiting room.' },
  { question: 'How is this different from general motion or zone intrusion detection?', answer: 'Motion and zone intrusion detection respond to people or objects moving through or into an area. Abandoned object detection specifically tracks the association between a person and the object they were carrying, and times how long that object stays unclaimed once separated — a different mechanism aimed at a different problem.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Abandoned Object Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Abandoned Object Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A bag left behind? We notice. Abandoned object detection flags unattended bags and packages the
            moment they separate from their carrier and stay unclaimed past a configurable dwell time.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Bags or packages separated from the person who was carrying them</li>
                  <li className="flex gap-2">• Objects remaining unclaimed past a configurable dwell-time threshold</li>
                  <li className="flex gap-2">• Unattended items in lobbies, entrances, and public waiting areas</li>
                  <li className="flex gap-2">• Objects left in transit hubs, stations, or other high-traffic public areas</li>
                  <li className="flex gap-2">• Repeated abandonment activity at the same location over time</li>
                  <li className="flex gap-2">• A timestamped clip showing exactly when and where the item was left</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="ABANDONED OBJECT DETECTION" alt="Camera view of a lobby with an unattended bag highlighted by a detection bounding box" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why abandoned object detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>An unattended bag in a busy lobby, station, or waiting area is a genuine security concern, but it's also easy to miss. Guards watching a floor in person can't track every bag in a crowded space continuously, and a package that's been sitting alone for several minutes doesn't stand out visually unless someone is specifically looking for it.</p>
                <p>The legacy fallback is a staff member or bystander noticing and reporting it, or a security operator spotting it while reviewing footage after the fact across dozens of camera feeds. Both depend on someone happening to pay attention to the right frame at the right time — which does not scale as the number of cameras and the size of the space grows.</p>
                <p>Continuous AI monitoring solves this by tracking the association between a person and what they're carrying automatically, the moment it starts a dwell timer as soon as separation happens. The alert fires when the object crosses the configured threshold — no one has to have been watching that exact spot for it to be caught.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="CARRIER-OBJECT ASSOCIATION" alt="Diagram showing an object separating from its carrier and a dwell timer counting toward an alert threshold" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Associating an object with its carrier</h3>
                <p className="mt-2 text-muted-foreground">
                  Built on <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link>, the
                  model associates carried objects with the person holding them, maintaining that link frame over frame as they move through the scene.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">The dwell timer</h3>
                <p className="mt-2 text-muted-foreground">
                  When an object separates and its carrier moves away, a dwell timer starts on the object. If it remains stationary and unclaimed past the configured threshold, an alert fires with the object's location, a clip of the moment it was left, and the elapsed dwell time.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> for the assigned guard to investigate.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Abandoned object detection is enabled per camera or zone. Configurable options include:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Dwell-time threshold before an alert fires</li>
                  <li className="flex gap-2">• Object types monitored, e.g. bags, boxes, packages</li>
                  <li className="flex gap-2">• Zone-specific thresholds, e.g. shorter in high-security areas</li>
                  <li className="flex gap-2">• Notification window per camera: notifications only in the hours you set</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="DWELL-TIME CONFIGURATION" alt="Configuration panel showing dwell-time threshold and monitored object types for a camera zone" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="PUBLIC SPACE MONITORING" alt="Facility map showing abandoned object detection coverage across lobbies and entrances" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A transit station platform where an unattended bag sits past the dwell threshold</li>
                  <li className="flex gap-2">• An airport or event venue lobby with high foot traffic and many bags in transit</li>
                  <li className="flex gap-2">• A bank lobby where a package left near a teller line triggers immediate review</li>
                  <li className="flex gap-2">• A campus building entrance monitored for unattended items after hours</li>
                  <li className="flex gap-2">• A government building checkpoint with a short dwell threshold for heightened security</li>
                  <li className="flex gap-2">• A retail store where an abandoned shopping bag sits unclaimed near an exit</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                an unresolved abandoned object at a monitored location contributes to the compliance assessment
                at that camera stop and is logged alongside the checklist results in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
                  <Link href="/industries/education-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Education</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
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
