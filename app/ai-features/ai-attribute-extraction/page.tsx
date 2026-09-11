import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Attribute Extraction | Describe Who Was Seen",
  description: "Camzify AI attribute extraction uses a vision-language model to attach structured attributes, clothing, object type, behavior, to every detection.",
  path: "/ai-features/ai-attribute-extraction",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is AI attribute extraction?', answer: 'AI attribute extraction uses a vision-language model to read the scene the moment an alert fires and attach structured, human-readable attributes to it, clothing color, object type, general behavior, with no operator input required.' },
  { question: 'How is this different from AI suspect search?', answer: 'Attribute extraction runs at the moment of detection, attaching structured attributes to a specific alert. AI suspect search uses those same attributes, indexed over time, to let an investigator retrieve every matching appearance later using a plain-language description.' },
  { question: 'What kinds of attributes does it capture?', answer: 'Typical attributes include clothing color and type, carried objects, general behavior description, and object classification, the same kind of detail a human reviewer would note when describing what they saw on camera.' },
  { question: 'Does this replace facial recognition?', answer: 'No. Attribute extraction describes general visual characteristics like clothing and behavior rather than identifying a specific individual\'s identity, which keeps it useful for investigation and search without functioning as a biometric identification system.' },
  { question: 'Does attribute extraction slow down alert delivery?', answer: 'Attributes are generated as part of the same alert pipeline, so an alert isn\'t delayed waiting on attribute extraction — the structured description is attached alongside the standard alert details.' },
  { question: 'Which other features depend on attribute extraction?', answer: 'AI suspect search and cross-camera journey map both rely on the structured attributes this feature generates to match and link appearances. Several detection features, including PPE violation detection, also use it to identify specific missing items on a subject.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'AI Attribute Extraction' },
    ]}>
      <FeatureHero
        eyebrow="AI detection · AI attribute extraction"
        title="AI attribute extraction"
        lede={<><strong className="font-semibold text-foreground">AI attribute extraction uses a vision-language model to read the scene when an alert fires and attach structured attributes to each detection — clothing color, object type, behavior description — with no operator input.</strong> This transforms a basic alert into an information-rich event that operators can act on immediately.</>}
        facts={['Structured clothing color and type attributes for every…', 'Object classification for vehicles, bags, and other carried…', 'Plain-language behavior descriptions attached to each alert']}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/ai-features', label: 'All 22 detections' }}
        visual={<PhotoFigure src="/feature-ai-attribute-extraction-1.webp" alt="The console live view with a attribute extraction alert drawn on the camera frame" caption="Ai attribute extraction" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">This capability generates and enables:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
                  <li className="flex gap-2">• Structured clothing color and type attributes for every detected subject</li>
                  <li className="flex gap-2">• Object classification for vehicles, bags, and other carried items</li>
                  <li className="flex gap-2">• Plain-language behavior descriptions attached to each alert</li>
                  <li className="flex gap-2">• The searchable index that powers AI suspect search</li>
                  <li className="flex gap-2">• Richer alert context without any operator input</li>
                </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why AI attribute extraction matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A bare alert, "person detected, camera 7, 02:34", tells a reviewer almost nothing. They still have to pull up the clip, watch it, and describe what they saw before they can act, search for related footage, or hand the incident off to someone else.</p>
                <p>That manual description step is slow and inconsistent, two reviewers describing the same clip might use different words for the same clothing color or miss a detail the other caught. Multiplied across dozens of alerts a day, it adds real delay between something happening and someone being able to act on it.</p>
                <p>AI attribute extraction does that description work automatically, the instant an alert fires, in a consistent structured format that both a human reviewer and other AI features, like suspect search, can use immediately.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-ai-attribute-extraction-2.webp" alt="A sequence of frames from one camera showing a attribute extraction event build up to the alert" caption="Attribute pipeline" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Reading the scene</h3>
                <p className="mt-2 text-muted-foreground">
                  When any detection feature fires an alert, a vision-language model reads the relevant frame or clip and identifies the visual details a human reviewer would naturally describe, what the subject is wearing, what they're carrying, and what they appear to be doing.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Structured attributes</h3>
                <p className="mt-2 text-muted-foreground">
                  Those details are converted into structured fields, clothing color, object type, behavior description, rather than free-form text, so they can be filtered, searched, and compared consistently across thousands of alerts.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Where attributes get used</h3>
                <p className="mt-2 text-muted-foreground">
                  Attributes are attached to the alert in the <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification queue</Link> for immediate context, and indexed over time to power <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">AI suspect search</Link> and <Link href="/ai-features/cross-camera-journey-map" className="text-primary hover:underline">cross-camera journey map</Link>.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  AI attribute extraction runs automatically alongside other detection features, with a few settings:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Which detection features trigger attribute extraction</li>
                  <li className="flex gap-2">• Attribute categories captured, clothing, objects, behavior</li>
                  <li className="flex gap-2">• Retention period for indexed attributes used by search</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/feature-ai-attribute-extraction-3.webp" alt="Configuration panel showing attribute categories and retention settings for AI attribute extraction" caption="Attribute settings" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-ai-attribute-extraction-4.webp" alt="Camera scenes across several sites where attribute extraction detection is used" caption="Richer alert context" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A line intrusion alert arrives already describing the subject's clothing and carried items</li>
                  <li className="flex gap-2">• A PPE violation alert identifies specifically which required item is missing</li>
                  <li className="flex gap-2">• An investigator searches for "person in a red jacket carrying a backpack" using suspect search</li>
                  <li className="flex gap-2">• A vehicle-related alert includes the vehicle's color and general type</li>
                  <li className="flex gap-2">• A shift handoff report includes attribute summaries instead of requiring reviewers to rewatch clips</li>
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

      <FaqSection items={faqs} />
    </PageShell>
  );
}
