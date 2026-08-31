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
  title: "Littering Detection | AI Litter Detection Camera Software",
  description: "Camzify littering detection catches items discarded outside designated bins the moment it happens, with a timestamped clip.",
  path: "/ai-features/littering-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What counts as a littering event?', answer: 'The model watches for an object being dropped or thrown by a confirmed subject and left on the ground outside a designated bin area. A brief drop-and-pick-up doesn\'t match the pattern; the object needs to remain on the ground unclaimed.' },
  { question: 'Can it identify who littered?', answer: 'Every alert includes a clip of the moment the item was discarded and, when AI attribute extraction is enabled, structured attributes of the person involved — useful for enforcement in municipal or campus settings with posted littering policies.' },
  { question: 'Where does this typically get deployed?', answer: 'Outdoor and semi-outdoor areas with existing camera coverage — parking lots, plazas, campus grounds, and streets — rather than requiring new dedicated hardware.' },
  { question: 'Does it tell the difference between littering and legitimate disposal near a bin?', answer: 'Bin zones are marked directly on the camera view, so an item placed inside or immediately at a bin is treated as normal disposal, while an item left on the ground outside that zone is what triggers a littering alert.' },
  { question: 'Can littering hotspots be identified over time?', answer: 'Yes. Because every event is logged with location and timestamp, alerts can be aggregated to show which spots see repeated littering, which is useful for deciding where to add signage, bins, or enforcement attention.' },
  { question: 'Does weather or wind cause false alerts?', answer: 'The model evaluates a confirmed object separating from a tracked subject and remaining on the ground, not simple debris movement, which reduces false triggers from wind-blown litter that was already on the ground before monitoring began.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Littering Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Littering Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Trash tossed? We catch the moment. Littering detection flags items discarded outside designated
            bins the instant it happens, with a timestamped clip for enforcement or site upkeep records.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Objects dropped or thrown by a confirmed subject outside a bin area</li>
                  <li className="flex gap-2">• Litter left unclaimed on the ground in monitored outdoor areas</li>
                  <li className="flex gap-2">• Repeated littering activity at the same location over time</li>
                  <li className="flex gap-2">• A timestamped clip for site upkeep or enforcement records</li>
                  <li className="flex gap-2">• Recurring hotspot locations aggregated across multiple events</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="LITTERING DETECTION" alt="Camera view of an outdoor area with a littering event highlighted by a detection bounding box" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why littering detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Litter in a parking lot, plaza, or campus doesn't just look bad — it takes ongoing cleaning staff time to keep pace with, and by the time someone notices a pile of discarded items, there's no way to know who's responsible or how it started.</p>
                <p>Signage and occasional patrols only work if someone happens to see the moment it happens. Most littering goes completely unwitnessed, which means there's no way to enforce a posted policy or identify a recurring hotspot without hard evidence.</p>
                <p>Littering detection turns every camera already covering an outdoor area into a continuous witness — catching the exact moment an item is discarded, where, and by whom, without needing a person stationed there to see it.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="DISCARD EVENT LOGIC" alt="Diagram showing an object separating from a tracked subject and remaining outside a marked bin zone" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Watching bin zones</h3>
                <p className="mt-2 text-muted-foreground">
                  Built on <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link>, the model watches for an object leaving a person's possession and remaining on the ground outside a designated bin zone marked on the camera view.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Confirming a discard event</h3>
                <p className="mt-2 text-muted-foreground">
                  A confirmed event requires the item to separate from a tracked subject and stay on the ground, unclaimed, outside the bin zone — filtering out a dropped item that's immediately picked back up.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  The alert fires with a clip, location, and timestamp, and — when <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> is enabled — structured attributes of the person involved. Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> and can be aggregated to identify recurring hotspot locations.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Bin zones are marked on the camera view so the system knows where discarded items are expected versus flagged. Each camera supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Bin-zone boundaries drawn directly on the camera view</li>
                  <li className="flex gap-2">• Schedule-based activation, e.g. daytime hours only</li>
                  <li className="flex gap-2">• Sensitivity adjustment per zone</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="BIN ZONE SETUP" alt="Configuration panel showing designated bin zones marked on a camera view of an outdoor plaza" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="HOTSPOT TRACKING" alt="Site map highlighting recurring littering hotspot locations aggregated from multiple detection events" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A parking lot where cigarette packaging and cups are regularly discarded near vehicles</li>
                  <li className="flex gap-2">• A campus plaza with posted anti-littering signage and enforcement policy</li>
                  <li className="flex gap-2">• A retail entrance where food wrappers accumulate near, but not in, a trash bin</li>
                  <li className="flex gap-2">• A residential common area where recurring dumping needs to be documented</li>
                  <li className="flex gap-2">• A municipal street corner identified as a recurring litter hotspot</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                littering activity at a monitored area contributes to the compliance assessment at that camera
                stop and is logged alongside the checklist results in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/waste-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Waste Management</Link>
                  <Link href="/industries/restaurants" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Restaurants</Link>
                  <Link href="/industries/education-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Education</Link>
                  <Link href="/industries/residential" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Residential</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
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
