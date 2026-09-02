import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Route, Camera, Plus, ArrowRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Camera Patrol Sequences | Virtual Patrol Routes",
  description: "Build ordered camera patrol sequences that define the route your AI patrol follows across every site. Assign cameras, guards, and checklists per stop.",
  path: "/virtual-patrolling/patrol-sequences",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How many cameras can one patrol sequence include?', answer: 'A sequence can include as many cameras as fit within your licensed VPS camera allocation. There\'s no separate cap on sequence length beyond that — a perimeter route might carry six stops, a loading dock route might carry two.' },
  { question: 'Can a single site have more than one patrol sequence?', answer: 'Yes. Most multi-zone sites run several sequences at once — a warehouse might have a perimeter sequence and a loading dock sequence, each with its own cameras, checklist items, and schedule.' },
  { question: 'What happens if I reorder a sequence while a round is in progress?', answer: 'The round already running finishes on the order it started with. A reordered sequence takes effect from the next round onward, so an in-progress patrol never jumps stops mid-way through.' },
  { question: 'Do all cameras in a sequence have to run on the same schedule?', answer: 'The sequence itself runs as one unit under a single automated patrol scheduling configuration — every stop in that sequence fires together. If you need different timing for different cameras, split them into separate sequences.' },
  { question: 'What is the difference between a patrol sequence and a patrol checklist?', answer: 'A sequence is the ordered route — which cameras get visited and in what order. A checklist is what gets checked at each individual stop in that route. A sequence can\'t run without cameras assigned to it, and each of those cameras carries its own checklist.' },
];

export default function PatrolSequencesPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'Patrol Sequences' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Site-Level Routing</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Camera Patrol Sequences
          </h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A patrol sequence is an ordered list of cameras that defines the route a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> follows
            across a site. Each camera in the sequence carries its own checklist items, assigned guard, and
            predefined escalation messages. The sequence determines the exact path the AI takes during every round.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-6">
              <ScrollReveal>
                <div className="rounded-xl border border-border bg-card p-6">
                  <Route className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-bold">Site-level routes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Build one or more sequences per site. A warehouse might have a perimeter sequence and
                    a loading dock sequence. Each runs independently on its own schedule.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.06}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <Camera className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-bold">Camera allocation</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add cameras up to your licensed VPS camera allocation. Any camera connected to
                    the platform can be included — over RTSP, RTMP or HTTPS.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.12}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <Plus className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-bold">Per-camera configuration</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Each stop in the sequence gets its own <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist</Link>,
                    guard contact, and predefined <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">notification messages</Link>.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.06}>
              <PlaceholderVisual type="patrol-route" caption="PATROL SEQUENCE BUILDER" alt="Patrol sequence configuration showing ordered camera list with per-camera checklist assignments" />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Why Sequences Matter</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Why patrol sequences matter</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Without a defined route, "patrolling" a set of cameras usually means someone flipping between live feeds and deciding on the fly what to look at and in what order. That routine drifts every time it runs — the cameras checked first get attention, the ones checked last (or skipped when time runs short) don't.</p>
                <p>A fixed order also matters for accountability. If a round has a defined start and end, and it's the same route every time, a report showing eight of ten stops complete means something concrete. Without a sequence, there's no baseline to compare a round against.</p>
                <p>A patrol sequence turns the route into a configured object — built once, assigned a schedule, and run identically every time — rather than something that depends on whichever guard happens to be on duty and how much time they have left in their shift.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="SEQUENCE EXECUTION ORDER" alt="Diagram showing a patrol sequence advancing in order from one camera stop to the next" />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">How It Runs</span>
                <h2 className="mt-2 font-display text-2xl font-bold">How a patrol sequence executes</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="font-mono text-primary">01</span> The schedule (or a guard starting a manual round) begins the sequence at its first camera stop</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">02</span> Each stop is evaluated in order — its <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist</Link> items are checked and the results logged</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">03</span> The sequence advances automatically to the next camera once the current stop is complete</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">04</span> Any Not Compliant item along the way triggers a <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">guard notification</Link> for that specific stop</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">05</span> The sequence finishes at the final camera and the round is complete</li>
                </ol>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Configuration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">What you can configure per sequence</h2>
                <p className="mt-4 text-muted-foreground">Sequences are built once and adjusted as a site's layout or coverage needs change.</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Give each sequence a descriptive name tied to the zone it covers, e.g. "Perimeter — Night"</li>
                  <li className="flex gap-2">• Build more than one sequence per site, each on its own <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated schedule</Link></li>
                  <li className="flex gap-2">• Reorder stops at any time — the next round picks up the new order immediately</li>
                  <li className="flex gap-2">• Reassign a camera to a different position in the sequence without rebuilding the whole route</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="SEQUENCE CONFIGURATION" alt="Configuration screen for naming, reordering, and assigning cameras within a patrol sequence" />
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
              <Link href="/virtual-patrolling/patrol-checklists" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Patrol Checklists <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/virtual-patrolling/automated-patrol-scheduling" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Automated Scheduling <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/virtual-patrolling/for-multi-site-operations" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Multi-Site Operations <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/industries/warehouses" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Warehouses <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
