import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { InteractiveChecklistDemo } from '@/components/motion/interactive-checklist-demo';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { ClipboardCheck, ListChecks, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Security Patrol Checklists | Per-Camera Compliance Checks",
  description: "Define per-camera checklist items for every patrol round. Each item is marked Compliant or Not Compliant, and failures trigger automatic guard notifications.",
  path: "/virtual-patrolling/patrol-checklists",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How many checklist items can one camera have?', answer: 'There is no fixed limit — a camera covering a single gate might carry one item, while a wider-angle loading dock view might carry four or five. Most deployments keep each camera to 2-4 items so a round stays fast to evaluate and easy to review.' },
  { question: 'Can checklist items be reused across cameras?', answer: 'Yes. A checklist item like "No unauthorised persons in zone" can be applied to any number of cameras that share that requirement, rather than writing it out fresh for every stop in the sequence.' },
  { question: 'What happens to an item during a manual patrol versus Auto-Patrol?', answer: 'The evaluation logic is identical either way — the same checklist runs whether an operator is stepping through it in real time or the schedule triggers it unattended. The only difference is who (or what) advances the round from camera to camera.' },
  { question: 'Can I change a checklist after a patrol sequence is live?', answer: 'Yes. Checklist items can be added, edited, or removed at any time. Changes apply to the next round onward — past patrol reports keep the checklist that was active when that round ran, so historical records stay accurate.' },
  { question: 'Do checklist items need to match exactly what the camera can see?', answer: 'They should. A checklist item only works if a human reviewer — or the AI evaluating it — can genuinely confirm it from that camera\'s field of view. Items are written per camera specifically so they stay checkable rather than generic.' },
];

export default function PatrolChecklistsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'Patrol Checklists' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Per-Camera Compliance</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Security Patrol Checklists</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A security patrol checklist is a set of compliance items assigned to each camera in a <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">patrol sequence</Link>.
            During every <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round, each item is evaluated and marked Compliant or Not Compliant.
            Failed items trigger an automatic notification to the guard assigned to that camera.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: ClipboardCheck, title: 'Plain-language items', desc: 'Each item is a simple statement the camera view either confirms or denies — no ambiguity.' },
              { icon: UserCheck, title: 'Tied to a guard', desc: 'Every checklist sits behind a camera with a named guard who gets notified on failure.' },
              { icon: ShieldCheck, title: 'Consistent every round', desc: 'The same items get checked the same way, whether the round is manual or scheduled.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Why Checklists Matter</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Why patrol checklists matter</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A guard doing a physical round carries a mental checklist that varies slightly every time — what gets checked closely on a slow night gets glanced at on a busy one. There's no record of which specific items were verified, only that the round happened.</p>
                <p>A camera without a checklist has the opposite problem: it records everything and confirms nothing. Footage exists, but nobody can say whether the gate was actually closed at 2am without watching the clip back.</p>
                <p>A patrol checklist fixes both. Every item is evaluated the same way, every round, and the result — Compliant or Not Compliant — is logged with a timestamp against that specific camera and that specific item.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Try It</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Try the checklist experience</h2>
              <p className="mt-2 text-muted-foreground">Click through three cameras and see how checklist items work in a real patrol round.</p>
            </ScrollReveal>
            <div className="mt-8">
              <InteractiveChecklistDemo />
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <ScrollReveal>
              <div className="space-y-4">
                <span className="font-mono text-mono-sm uppercase text-primary">Examples</span>
                <h2 className="font-display text-2xl font-bold">What checklist items look like</h2>
                <p className="text-muted-foreground">Each item is a plain-language statement that the camera view either confirms or denies. Items are specific to the camera and the environment it monitors.</p>
                <div className="space-y-3">
                  {[
                    'Gate fully closed',
                    'No tailgating observed',
                    'Dock door secured',
                    'No unauthorised persons in zone',
                    'Corridor clear of obstructions',
                    'Access door closed',
                    'Fire exit unblocked',
                    'Vehicle in designated bay',
                  ].map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                      <ClipboardCheck className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <PlaceholderVisual type="checklist" caption="CHECKLIST CONFIGURATION" alt="Patrol checklist configuration panel showing per-camera compliance items" />
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="CHECKLIST EVALUATION FLOW" alt="Diagram showing a checklist item being evaluated against a camera view and logged as compliant or not" />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">How It Runs</span>
                <h2 className="mt-2 font-display text-2xl font-bold">How a checklist gets evaluated</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="font-mono text-primary">01</span> The patrol round reaches this camera's stop in the sequence</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">02</span> Every item assigned to that camera is checked against the current view</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">03</span> Each item is marked Compliant or Not Compliant, with a timestamp</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">04</span> Any Not Compliant item triggers a <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">guard notification</Link></li>
                  <li className="flex gap-3"><span className="font-mono text-primary">05</span> Results are written into that round's <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">patrol report</Link></li>
                </ol>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Configuration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Setting up checklists for a site</h2>
                <p className="mt-4 text-muted-foreground">Checklists are configured per camera when a patrol sequence is built. Most deployments follow the same pattern:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Write 2-4 items per camera, specific to what that view actually covers</li>
                  <li className="flex gap-2">• Reuse common items (e.g. "Zone clear") across cameras with the same requirement</li>
                  <li className="flex gap-2">• Pair each item with a <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">predefined escalation message</Link></li>
                  <li className="flex gap-2">• Review and adjust items after the first few rounds, once real results come in</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="CHECKLIST SETUP" alt="Configuration screen for adding and editing per-camera checklist items" />
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/virtual-patrolling/guard-notifications" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Guard Notifications <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/virtual-patrolling/patrol-compliance-tracking" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Compliance Tracking <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/virtual-patrolling/patrol-reports" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Patrol Reports <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/use-cases/guard-tour-verification" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
