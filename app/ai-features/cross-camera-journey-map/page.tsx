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
  title: "Cross-Camera Journey Map | AI Path Reconstruction Software",
  description: "Camzify cross-camera journey map stitches one subject\\'s path across every camera on-site into a single timeline, built from confirmed object tracks.",
  path: "/ai-features/cross-camera-journey-map",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is a cross-camera journey map?', answer: 'It reconstructs one subject\'s full path across a site by stitching together their appearances across every camera that captured them, in order, into a single timeline — instead of an investigator manually cross-referencing footage from each camera separately.' },
  { question: 'How do you know it\'s the same person across cameras?', answer: 'The system matches confirmed object tracks and structured attributes from AI attribute extraction — clothing, general appearance, timing — across camera boundaries. Results are shown with confidence scores so an investigator can verify each hop in the path.' },
  { question: 'Can I start a journey map from a search?', answer: 'Yes. Run an AI suspect search first to find a subject, then build the journey map from that match to see every camera they crossed, in sequence, with timestamps.' },
  { question: 'What happens when a subject leaves camera coverage entirely?', answer: 'The timeline shows the last confirmed appearance and the gap in coverage rather than guessing at a path. If the subject reappears on a camera later, that appearance is linked back in as a new hop, with the coverage gap visible between them.' },
  { question: 'Does the journey map work across separate buildings or sites?', answer: 'It works across every camera within the scope it\'s run against, which can be a single building, a full site, or a multi-site account where camera coverage is connected. Journeys are not inferred across sites with no camera continuity between them.' },
  { question: 'How far back can a journey map be built?', answer: 'As far back as the underlying footage retention window allows. Any confirmed track within that window can be linked into a journey, whether the investigation starts hours or weeks after the event.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Cross-Camera Journey Map' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cross-Camera Journey Map</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            One person, every camera, one timeline. Cross-camera journey map stitches a subject's path across
            every camera on-site into a single reconstructed route — replacing hours of manually cross-referencing
            footage from camera to camera.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability builds:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A single stitched timeline of one subject across every camera that saw them</li>
                  <li className="flex gap-2">• Ordered, timestamped hand-offs between cameras with confidence scores</li>
                  <li className="flex gap-2">• A route map view showing where a subject entered, moved, and exited</li>
                  <li className="flex gap-2">• A starting point built directly from an <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">AI suspect search</Link> result</li>
                  <li className="flex gap-2">• A record of coverage gaps where the subject left camera view entirely</li>
                  <li className="flex gap-2">• An exportable route for incident reports or law enforcement handoff</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="patrol-route" caption="CROSS-CAMERA JOURNEY MAP" alt="Site map showing a single subject's path connected across multiple camera coverage zones" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why cross-camera journey map matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A single camera only ever shows part of the story. Once a subject leaves that camera's frame, reconstructing where they went next means an investigator has to guess which neighbouring camera they might have entered, pull up that feed, scrub to the right moment, and repeat — camera by camera, for as long as the path continues.</p>
                <p>On a site with more than a handful of cameras, that manual cross-referencing becomes the slowest part of any investigation. Each hand-off between cameras adds a fresh round of searching, and there's no guarantee the investigator picks the right next camera on the first try, or that they catch every appearance along the way.</p>
                <p>Cross-camera journey map removes the guesswork by linking appearances automatically as they happen, so the full route — not just one camera's slice of it — is available as a single ordered timeline from the start.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="PATH RECONSTRUCTION" alt="Diagram showing tracked appearances from separate cameras linked into a single ordered subject timeline" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Linking appearances across cameras</h3>
                <p className="mt-2 text-muted-foreground">
                  Each camera's <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> output feeds a site-wide appearance index. When a subject leaves one camera's frame and enters another's, the system matches the track using timing and <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> to link the two appearances as the same person.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Building the timeline</h3>
                <p className="mt-2 text-muted-foreground">
                  Linked appearances are ordered into a single path — camera, timestamp, direction of travel — rendered on a site map or as a chronological list of clips. Coverage gaps, where the subject wasn't visible on any camera, are shown rather than filled in with a guess.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Starting from a search</h3>
                <p className="mt-2 text-muted-foreground">
                  Investigators typically start from an <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">AI suspect search</Link> match and build the journey map from there, rather than searching camera by camera.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  No per-camera setup is required beyond having multi-object tracking and AI attribute
                  extraction enabled on the relevant cameras. A journey map can be configured with:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Site-level or multi-site scope for the search that seeds the journey</li>
                  <li className="flex gap-2">• Map view or chronological clip-list view of the same timeline</li>
                  <li className="flex gap-2">• Confidence threshold for what counts as a linked hop between cameras</li>
                  <li className="flex gap-2">• Export with timestamps and clip references for incident reports</li>
                  <li className="flex gap-2">• Date-range scoping across the available retention window</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="JOURNEY MAP CONFIGURATION" alt="Configuration panel showing route view options, confidence threshold, and export settings for a journey map" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="ROUTE RECONSTRUCTION" alt="Site map view showing a reconstructed subject route spanning several buildings and camera zones" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Tracing a shoplifting suspect's full route from entrance to exit across every aisle camera</li>
                  <li className="flex gap-2">• Reconstructing a visitor's path through a multi-building campus after a reported incident</li>
                  <li className="flex gap-2">• Confirming whether two separate camera sightings, hours apart, are actually the same person</li>
                  <li className="flex gap-2">• Building a full route for a law enforcement handoff instead of exporting clips camera by camera</li>
                  <li className="flex gap-2">• Verifying a delivery driver's path matched their expected route through a facility</li>
                  <li className="flex gap-2">• Reviewing a subject's movement immediately before and after a flagged alert</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Journey mapping is used for investigation after an event rather than as a live checklist item
                during a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round.
                When a patrol logs a non-compliant camera, a journey map can show what happened at that location
                immediately before and after, across neighbouring cameras.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/forensic-video-search" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">AI Suspect Search</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/incident-investigation" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Incident Investigation</Link>
                  <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Theft Prevention</Link>
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
