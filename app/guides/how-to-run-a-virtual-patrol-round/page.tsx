import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { howToSchema } from '@/lib/seo';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How to Run a Virtual Patrol Round | Step-by-Step Guide",
  description: "A walkthrough of a manual virtual patrol round: judging each checklist item against the live view, messaging the guard on a failure, resolving it as fixed or pending, and reading the compliance report.",
  path: "/guides/how-to-run-a-virtual-patrol-round",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article' });

/**
 * Steps are declared once and used twice — rendered on the page and emitted as HowTo
 * schema — so the visible instructions and the structured data cannot drift apart.
 */
const steps = [
  {
    name: 'Choose a sequence and start the round',
    text: 'A patrol sequence is an ordered list of camera stops, each carrying its own checklist. Start a manual round and the first camera opens with its live view and that camera’s items beneath it. The guard responsible for the camera is named on the stop, so there is no ambiguity about who to contact if something is wrong.',
  },
  {
    name: 'Judge each item against the live view',
    text: 'Read the live feed and mark each checklist item Compliant or Not Compliant. This is the part a paper round asks you to take on trust: here the frame you judged is captured with the result, so the answer can be reviewed later against what the camera actually showed.',
  },
  {
    name: 'Decide whether to message the guard',
    text: 'Marking an item Not Compliant captures the snapshot and offers a pre-written message to the guard for that camera — for example that a gate was found open and needs securing. Send it and the guard is notified immediately with the specifics; decline and the failure is still recorded, and the guard can be notified later from the same item.',
  },
  {
    name: 'Resolve the item: fixed, or pending with a reason',
    text: 'A failed item cannot be left failing. Either it is dealt with and re-checked, at which point a second snapshot is captured and the item is marked Fixed and verified, or it is held as Pending with a written reason — a contractor blocking a camera view, a part on order. The round will not close until every item has one of those answers.',
  },
  {
    name: 'Close the round and read the report',
    text: 'Ending the round generates a compliance report, available as a web report or a PDF. It carries the overall compliance percentage, every camera and item with its result, the guard message sent on any failure, the reason on anything pending, and for each fixed item both frames: the camera as found and the same camera afterwards.',
  },
];

const faqs = [
  {
    question: 'Can a patrol round be completed with an item still marked Not Compliant?',
    answer: 'No. Not Compliant is a verdict, not a resting state. Every failed item has to be resolved before the round closes, either as fixed and re-checked or as pending with a written reason. This is the difference between a virtual round and a paper one: a clipboard can be handed in with a blank line on it, and the record never shows what happened next.',
  },
  {
    question: 'Does marking an item Pending hide the problem?',
    answer: 'The opposite. A pending item counts against the compliance percentage for that round, and its written reason is carried in the report. It exists so an operator who genuinely cannot resolve something on the spot can still close the round honestly, with the problem visible, rather than being pushed to record a false pass.',
  },
  {
    question: 'What are the before and after images in the report?',
    answer: 'When an item fails and is then fixed during the round, the report carries two frames from that camera: the view as found when the item was failed, and the view after the fix was made and re-checked. That pair is what turns a report from a list of problems reported into a record of problems closed, which is the form an insurer or auditor can actually use.',
  },
  {
    question: 'How is the compliance percentage calculated?',
    answer: 'Items marked Compliant and items resolved as Fixed both count toward it. Items left Pending count against it. The score describes the round rather than the site, so a round that found two problems and closed one of them reads differently from a round that found nothing.',
  },
  {
    question: 'How is a manual round different from an automated one?',
    answer: 'A manual round is walked by a person, camera by camera, with the operator making each judgment. An automated round follows the same sequence on a schedule with AI making the assessment, either from a single frame or from a short window of live video, and files its report without anyone stepping through it. Most sites use both: automated rounds for frequency, manual rounds when a person needs to look properly.',
  },
];

export default function HowToRunAVirtualPatrolRoundPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[howToSchema({
        name: 'How to run a virtual patrol round',
        description: pageMeta.description,
        path: pageMeta.path,
        steps: steps.map((s) => ({ name: s.name, text: s.text })),
      })]}
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'How to Run a Virtual Patrol Round' }]}
    >
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            How to run a virtual patrol round
          </h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              A virtual patrol round is a walk through a defined sequence of cameras, checking a
              short list of specific things at each one and recording the answer with the frame it
              was judged against.
            </strong>{' '}
            This guide covers a manual round from start to report. For the automated version, see{' '}
            <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">
              automated patrol scheduling
            </Link>.
          </p>

          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">The rule that matters most</h2>
            <p className="mt-3 max-w-prose text-muted-foreground">
              An item marked Not Compliant cannot stay that way. Before the round can close it has
              to be fixed and re-checked, or held as pending with a written reason. That single
              constraint is what separates a patrol record from a patrol log &mdash; a clipboard
              can be handed in with a problem noted and nothing after it, and nobody finds out
              until the incident.
            </p>
          </div>

          <ol className="mt-14 max-w-prose space-y-10">
            {steps.map((step, i) => (
              <ScrollReveal key={step.name} delay={i * 0.06}>
                <li className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold">{step.name}</h2>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Try the round yourself</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The <Link href="/" className="text-primary hover:underline">homepage</Link> carries
                a working version of this loop: three cameras, live views, and the same rule about
                resolving a failed item before the round will close. It takes about twenty seconds
                and ends on a report with the before and after frames attached.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Related reading:{' '}
                <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">how checklists are built</Link>,{' '}
                <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">what the report contains</Link>, and{' '}
                <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">how guards are notified</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
