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
  title: "AI Suspect Search | Forensic Video Search Software",
  description: "Camzify AI suspect search lets investigators describe a person in plain language and retrieve every matching appearance across indexed cameras and time windows.",
  path: "/ai-features/forensic-video-search",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is AI suspect search?', answer: 'AI suspect search (also called forensic video search) lets an investigator type a plain-language description — clothing color, bag type, approximate age — and retrieve every camera appearance that matches, across every indexed camera and time window on the site. It replaces manually scrubbing through hours of footage per camera.' },
  { question: 'How accurate is the match?', answer: 'Every result is a confirmed object track scored with a confidence value, and results are ranked by match strength. It is a search and shortlist tool for investigators, not an identity-verification system — final confirmation is always a human decision.' },
  { question: 'Does it work across multiple cameras and sites?', answer: 'Yes. Suspect search runs against the appearance index built from every connected camera on a site, and can be scoped to a single site or across a multi-site account. Combine it with the cross-camera journey map to see a matched subject\'s full path.' },
  { question: 'How is this different from typical VMS video search?', answer: 'Most video management systems search by camera and timestamp only, which means an investigator already has to know where and when to look. AI suspect search matches on a plain-language description across every indexed camera and time window at once, so no starting point is needed.' },
  { question: 'Do I need a photo of the suspect to search?', answer: 'No. A plain-language description is enough — clothing color, bag type, approximate age, direction of travel. A photo isn\'t required, though richer attribute detail generally narrows results faster.' },
  { question: 'Is this facial recognition?', answer: 'No. AI suspect search matches on confirmed object tracks and structured attributes like clothing and general appearance, not facial biometrics. It is built for retrieval and shortlisting, with final identification always left to a human reviewer.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'AI Suspect Search' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Suspect Search</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            AI suspect search builds a per-camera appearance index and lets investigators describe a person
            in plain language — no photo required — to retrieve every matching appearance across indexed
            cameras and time windows. What used to take hours of manual footage review takes seconds.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability finds:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A person matching a plain-language description across every camera on-site</li>
                  <li className="flex gap-2">• Every timestamped appearance of that match, ranked by confidence</li>
                  <li className="flex gap-2">• Matches across a single site or a full multi-site account</li>
                  <li className="flex gap-2">• A starting point for a <Link href="/ai-features/cross-camera-journey-map" className="text-primary hover:underline">cross-camera journey map</Link> of the same subject</li>
                  <li className="flex gap-2">• Matches without a reference photo, sketch, or facial recognition template</li>
                  <li className="flex gap-2">• Historical appearances going back through the full retention window</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="AI SUSPECT SEARCH" alt="Camera feed with a search query overlay and highlighted matching subject" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why AI suspect search matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>When an incident is reported after the fact, the usual starting point is a camera and an approximate time — and from there, an investigator scrubs through footage frame by frame hoping to spot the right person. On a site with dozens of cameras, that process doesn't scale: every extra camera in the search radius adds hours, and a subject who moved through several areas means repeating the same manual review again and again.</p>
                <p>Standard video management systems make this worse by design. Search is built around camera and timestamp, which assumes the investigator already knows where and when to look. When the only lead is a description — "a man in a gray jacket with a backpack" — there's no way to query for that directly, so the review still comes down to eyes on footage.</p>
                <p>AI suspect search removes that bottleneck by indexing every subject's appearance as it happens, so a description becomes a query instead of a starting assumption. What would have been an afternoon of manual review across multiple cameras becomes a search that returns ranked results in seconds.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="APPEARANCE INDEX" alt="Diagram showing camera feeds building a searchable appearance index matched against a plain-language description" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the appearance index</h3>
                <p className="mt-2 text-muted-foreground">
                  Every camera on the site feeds <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> and <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link>, which
                  together build a searchable index of every subject and their structured attributes — clothing color, object type, general appearance. Indexing runs continuously in the background, so there's no separate step to trigger before a search is possible.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Matching a description</h3>
                <p className="mt-2 text-muted-foreground">
                  An investigator types a plain-language description into the search bar — clothing color, bag type, approximate age. The system matches the description against the index directly, with no need to know which camera or time window to start from.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Ranked results</h3>
                <p className="mt-2 text-muted-foreground">
                  Matches return as a ranked list with thumbnail, camera, timestamp, and confidence score, so the strongest matches surface first. Results feed directly into <Link href="/ai-features/cross-camera-journey-map" className="text-primary hover:underline">cross-camera journey map</Link> to reconstruct a subject's full path across the site from a single search.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  No manual setup is required per camera — indexing runs automatically wherever AI attribute
                  extraction is enabled. Search can be configured with:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Date-range scoping, from the last hour to the full retention window</li>
                  <li className="flex gap-2">• Site-level or multi-site account-wide search scope</li>
                  <li className="flex gap-2">• Attribute filters such as clothing color, object type, and general appearance</li>
                  <li className="flex gap-2">• Exportable results for incident reports or law enforcement requests</li>
                  <li className="flex gap-2">• Saved searches for recurring investigation patterns</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="SEARCH CONFIGURATION" alt="Configuration panel showing search scope, date range, and attribute filters for AI suspect search" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="INVESTIGATION USE" alt="Investigator screen showing AI suspect search results across multiple camera thumbnails ranked by confidence" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A loss-prevention team searching for a shoplifting suspect by clothing description after the person has already left the store</li>
                  <li className="flex gap-2">• An investigator locating every appearance of a subject named in a report across a week of footage in seconds</li>
                  <li className="flex gap-2">• A property manager confirming whether a person seen on one camera also appeared at a different building entrance</li>
                  <li className="flex gap-2">• A security team building an incident timeline by searching for a subject's description instead of scrubbing each camera individually</li>
                  <li className="flex gap-2">• A multi-site retailer checking whether the same individual has appeared at other locations</li>
                  <li className="flex gap-2">• An HR investigation confirming the movements of an employee described in a complaint</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Suspect search is an investigation tool used after an incident, rather than a per-camera
                checklist item during a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round.
                When a patrol flags a non-compliant camera, suspect search can pull every earlier appearance
                of the same subject to build a fuller picture before the guard is notified.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/education-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Education</Link>
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/cross-camera-journey-map" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Cross-Camera Journey Map</Link>
                  <Link href="/ai-features/ai-attribute-extraction" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">AI Attribute Extraction</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Theft Prevention</Link>
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
