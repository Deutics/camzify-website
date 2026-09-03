import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual, type SectionVisualVariant } from '@/components/content/section-visual';
import { SiteImage } from '@/components/content/site-image';
import { howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Wifi, Route, ClipboardCheck, Calendar, Cpu, FileText } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How Virtual Patrolling Works | Camera to Report",
  description: "How a virtual patrol round runs: connect cameras, build the sequence, assign checklists and guards, schedule it, let the AI run the round, file the record.",
  path: "/virtual-patrolling/how-it-works",
};

export const metadata = generatePageMeta({ ...pageMeta });

/**
 * Steps are declared once and used twice — rendered on the page and emitted as HowTo
 * schema — so the visible instructions and the structured data cannot drift apart.
 */
type Step = {
  icon: typeof Wifi;
  name: string;
  text: string;
  /** A real product screenshot where one exists… */
  image?: string;
  imageAlt?: string;
  /** …otherwise a design-system illustration of the step. */
  visual?: SectionVisualVariant;
};

const steps: Step[] = [
  { icon: Wifi, name: 'Connect your cameras', text: 'Any IP camera connects over one of three connection types: RTSP, RTMP or HTTPS. An internet-reachable RTSP stream connects directly; cameras on a private network relay through the Camzify Connector with no port forwarding. Stream quality is auto-detected on connect.', image: '/how-it-works-Step-1.jpg', imageAlt: 'A person connecting a physical camera while the Camzify Configuration screen adds it over the network on a laptop' },
  { icon: Route, name: 'Build a patrol sequence', text: 'Define an ordered list of cameras that forms the route. Each sequence is a physical path through the site — main gate, loading dock, server corridor, perimeter — and a site can run several at once.', image: '/how-it-works-Step-2.jpg', imageAlt: 'The Camzify Virtual Patrolling screen with the New Sequence panel open, naming a sequence before creating it' },
  { icon: ClipboardCheck, name: 'Assign checklists and guards', text: 'For each camera in the sequence, write the checklist items it is judged against — "Gate fully closed", "No obstruction in view" — and name the guard responsible, with the message they receive if an item fails.', visual: 'checklist' as const },
  { icon: Calendar, name: 'Schedule it, or start it by hand', text: 'Auto-Patrol runs on a frequency, active hours and active days in the site\'s timezone. A manual round can be started at any time. Either way the round follows the same sequence and checks the same items.', visual: 'schedule' as const },
  { icon: Cpu, name: 'The AI runs the round', text: 'The system steps through every camera, judges each item from a single frame or a short window of live video, records its reasoning, notifies the assigned guard on any failure, and flags safety or security risks it sees even where no item asked.', visual: 'notification' as const },
  { icon: FileText, name: 'Report and log', text: 'A compliance report is filed with every check, the snapshot behind each result, before and after frames on anything fixed, and an overall percentage. The round is logged as Completed, Flagged or Overdue in a history you can filter by sequence, site or status.', visual: 'report' as const },
];

const faqs = [
  { question: 'How long does it take to set up virtual patrolling?', answer: 'It depends on how many cameras and checklist items are involved, but the six steps above are designed to be worked through in a single sitting for a typical site. Connecting cameras is usually the fastest step; writing checklists per camera tends to take the longest, because that is where you decide what actually matters at each stop.' },
  { question: 'Do the six steps have to be done in order?', answer: 'Cameras need to be connected before they can be added to a patrol sequence, and a sequence needs to exist before checklists and guards can be assigned to it. Beyond that dependency, later steps like scheduling can be revisited and adjusted at any time.' },
  { question: 'What happens if a step is skipped, like assigning a guard?', answer: 'A camera without an assigned guard can still be included in a patrol sequence and checked, but there is nobody to notify if an item comes back Not Compliant. Assign a guard to every camera before relying on a sequence for real coverage.' },
  { question: 'Do I need technical staff to set this up?', answer: 'No. Connecting a camera is a matter of entering its stream details, and the rest — building sequences, writing checklist items, assigning guards, scheduling rounds — is done through the same configuration screens without coding or networking expertise.' },
  { question: 'Can I change something after a patrol sequence is live?', answer: 'Yes. Cameras, checklist items, guard assignments and the schedule can all be edited at any time. Changes take effect from the next round onward, so a live sequence never has to be torn down to be adjusted.' },
  { question: 'What is the difference between a manual round and an automated one?', answer: 'A manual round is walked by an operator, camera by camera, making each judgment against the live view. An automated round follows the same sequence on a schedule with the AI making the assessment, recording its reasoning, notifying guards on its own and filing the report without anyone present. Most sites use automated rounds for frequency and manual rounds when a person needs to look properly.' },
];

export default function HowItWorksPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[howToSchema({
        name: 'How virtual patrolling works',
        description: pageMeta.description,
        path: pageMeta.path,
        steps: steps.map((s) => ({ name: s.name, text: s.text })),
      })]}
      breadcrumbs={[{ label: 'Virtual Patrolling', href: '/virtual-patrolling' }, { label: 'How It Works' }]}
    >
      <FeatureHero
        eyebrow="Step by step"
        title="How virtual patrolling works"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Virtual patrolling runs scheduled AI patrol rounds across your existing cameras.
            </strong>{' '}
            Here is exactly how a round moves from camera connection to compliance report, in
            the six steps the product actually follows &mdash; and what each one produces.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'See it on your cameras' }}
        secondary={{ href: '/guides/how-to-run-a-virtual-patrol-round', label: 'Run a round yourself' }}
        facts={['Six steps', 'No new hardware', 'Live from the first round']}
        visual={<HeroPlaceholder label="Perimeter round · 4 stops" alt="Camzify console showing a four-camera patrol sequence with the main gate as the current stop" />}
      />

      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ol className="space-y-16 lg:space-y-20">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const imageFirst = i % 2 === 1;
              return (
                <li key={step.name}>
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                    <ScrollReveal className={imageFirst ? 'lg:order-2' : ''}>
                      <div>
                        <div className="flex items-center gap-4">
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-sm font-medium text-primary tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-primary/40 via-border to-transparent" />
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">{step.name}</h2>
                        <p className="mt-4 max-w-prose text-body leading-relaxed text-muted-foreground">{step.text}</p>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.08} className={imageFirst ? 'lg:order-1' : ''}>
                      {step.image ? (
                        <div className="overflow-hidden rounded-xl border border-border bg-card">
                          <SiteImage src={step.image} alt={step.imageAlt ?? step.name} className="w-full" width={1229} height={692} priority={i === 0} sizes="(max-width: 1024px) 100vw, 50vw" />
                        </div>
                      ) : (
                        <SectionVisual variant={step.visual ?? 'flow'} caption={`Step ${i + 1} · ${step.name}`} alt={`Illustration of step ${i + 1}: ${step.name}`} />
                      )}
                    </ScrollReveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Common questions</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Setting it up, answered</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="mt-10 max-w-3xl"><FAQAccordion items={faqs} /></div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Go deeper</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              ['Patrol sequences', '/virtual-patrolling/patrol-sequences'], ['Patrol checklists', '/virtual-patrolling/patrol-checklists'],
              ['Automated scheduling', '/virtual-patrolling/automated-patrol-scheduling'], ['Patrol reports', '/virtual-patrolling/patrol-reports'],
              ['Risk detection', '/virtual-patrolling/risk-detection'], ['Pricing', '/pricing'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary">{label}</Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
