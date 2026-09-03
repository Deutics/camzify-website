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
  title: "Zone Intrusion Detection | AI Zone Intrusion Detection Software",
  description: "Camzify zone intrusion detection defines restricted polygonal zones. Any confirmed object entering triggers an alert regardless of entry direction.",
  path: "/ai-features/zone-intrusion-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is zone intrusion detection?', answer: 'Zone intrusion detection defines a polygonal restricted area in the camera view and fires an alert when a confirmed object track is detected inside it, regardless of the direction or path used to enter. It is built for enclosed or irregular areas like rooms, cages, and rooftops rather than a single boundary crossing.' },
  { question: 'How is this different from line intrusion detection?', answer: 'Line intrusion detection fires when a confirmed track crosses a single defined line. Zone intrusion detection fires on presence anywhere inside an enclosed area, which is better suited to rooms, cages, and irregular boundaries that have multiple possible entry points.' },
  { question: 'Can a zone have an unusual shape?', answer: 'Yes. Zones are drawn as arbitrary polygons directly on the camera view, not limited to rectangles, so the boundary can match the physical shape of a room, cage, or partial view around an obstruction.' },
  { question: 'Will it fire on someone briefly passing near the edge of a zone?', answer: 'Each zone can be configured with a dwell-time threshold, so a zone can alert instantly on any confirmed entry or only after a subject remains inside longer than a set number of seconds, which avoids alerting on someone momentarily near the boundary.' },
  { question: 'How many zones can one camera have?', answer: 'A single camera can support multiple zones, each with its own shape, sensitivity, object-class filter, and schedule. A wide-angle view covering a server room and an adjacent storage cage can carry separate zone rules without needing a second camera.' },
  { question: 'Does zone intrusion detection reduce false positives compared to a simple motion alarm?', answer: 'Yes. Because it evaluates confirmed object tracks from multi-object tracking rather than raw pixel change, it does not fire on lighting shifts, shadows, or environmental movement the way a basic motion alarm does.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Zone Intrusion Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Zone Intrusion Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">Zone intrusion detection defines polygonal restricted zones in the camera view. Any confirmed object track entering the zone triggers an alert, regardless of how or from which direction the object entered the frame. This is ideal for restricted areas, server rooms, and hazardous zones.</p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Anyone entering a restricted server room or electrical closet</li>
                  <li className="flex gap-2">• A forklift or vehicle entering a pedestrian-only zone</li>
                  <li className="flex gap-2">• Personnel present in a hazardous or chemical storage area</li>
                  <li className="flex gap-2">• Any object track inside a no-go zone after hours</li>
                  <li className="flex gap-2">• Repeated entries into the same zone within a short window</li>
                  <li className="flex gap-2">• A subject lingering inside a zone past a configured dwell time</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="ZONE INTRUSION DETECTION" alt="Zone Intrusion Detection visualization on camera feed" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why zone intrusion detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Some areas aren't bounded by a single crossing point — a server room, a chemical storage cage, or a rooftop mechanical area has an interior that needs to stay empty of unauthorized people at all times, no matter which door, hatch, or gap someone comes through.</p>
                <p>A line rule only catches one crossing point at a time; an irregular boundary with several possible entry points needs multiple coordinated lines and still leaves gaps at corners. Guards checking a restricted area on a walking round see it for seconds out of every hour, and a fixed door alarm misses anyone who gets in through a service hatch, a dropped ceiling panel, or a window.</p>
                <p>Zone intrusion detection replaces all of that with a single polygon drawn over the area a camera can see. Entry is entry, regardless of the path taken to get there, and the alert fires the moment a confirmed object track is inside the boundary.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="ZONE ENTRY LOGIC" alt="Diagram showing a confirmed object track entering a polygonal restricted zone and triggering an alert" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Defining the zone</h3>
                <p className="mt-2 text-muted-foreground">
                  An operator draws an arbitrary polygon directly over the camera view in the configuration panel — not just a rectangle, but any shape that matches the physical boundary of the restricted area, including irregular rooms, cages, or partial views around obstructions.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Detecting entry</h3>
                <p className="mt-2 text-muted-foreground">
                  The system relies on the same <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> engine used elsewhere in the platform. A track is evaluated against the zone polygon on every frame — the moment any part of a confirmed track's position falls inside the boundary, the zone is considered entered, without the object needing to cross a specific edge first.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Each zone can carry its own object-class filter and dwell-time threshold, so a zone can be set to alert instantly on any person, or only after a subject remains inside longer than a set number of seconds. Alerts include the object type, confidence score, and timestamp, and — when <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> is enabled — structured attributes describing the subject. Alerts route through the <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification queue</Link> with severity and acknowledgment status.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Zones are drawn as polygons directly on the camera view in the configuration panel. Each zone supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Arbitrary polygon shape — not limited to rectangles</li>
                  <li className="flex gap-2">• Dwell-time threshold before an alert fires</li>
                  <li className="flex gap-2">• Schedule-based activation, e.g. after-hours only</li>
                  <li className="flex gap-2">• Object-class filtering, e.g. people only, or people and vehicles</li>
                  <li className="flex gap-2">• Multiple zones per camera, each with independent rules</li>
                  <li className="flex gap-2">• Sensitivity adjustment per zone</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="ZONE CONFIGURATION" alt="Configuration panel showing a polygonal zone drawn over a restricted area with dwell-time and schedule controls" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="RESTRICTED AREA MONITORING" alt="Facility map showing multiple zone intrusion rules placed over restricted rooms and hazardous areas" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A server room where any presence outside scheduled maintenance windows triggers an alert</li>
                  <li className="flex gap-2">• A chemical storage cage where entry without an assigned PPE badge is treated as non-compliant</li>
                  <li className="flex gap-2">• A rooftop mechanical zone where unauthorized presence fires regardless of entry point</li>
                  <li className="flex gap-2">• A loading dock staging area restricted to authorized personnel during active unloading</li>
                  <li className="flex gap-2">• A retail stockroom where after-hours presence trips an immediate alert</li>
                  <li className="flex gap-2">• An electrical switchgear room where dwell time beyond a few seconds indicates unauthorized access</li>
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
