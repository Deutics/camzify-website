import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { Wifi, Route, Cpu, Bell, FileText, BarChart3 } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How Virtual Patrolling Works | Step-by-Step Guide",
  description: "Learn how Camzify\\'s virtual patrolling system runs AI-driven patrol rounds across your cameras in six clear steps.",
  path: "/virtual-patrolling/how-it-works",
};

export const metadata = generatePageMeta({ ...pageMeta });

const steps = [
  { icon: Wifi, title: '1. Connect your cameras', desc: 'Any IP camera connects over one of three connection types: RTSP, RTMP or HTTPS. An internet-reachable RTSP stream connects directly, and the Camzify Connector handles local network cameras. Stream quality is auto-detected on connect — no manual configuration needed.', image: '/how-it-works-Step-1.jpg', imageAlt: 'A person connecting a physical camera while the Camzify Configuration screen adds it over the network on a laptop' },
  { icon: Route, title: '2. Build a patrol sequence', desc: 'Define an ordered list of cameras that forms the patrol route. Each sequence represents a physical path through your site — main gate, loading dock, server room, perimeter fence.', image: '/how-it-works-Step-2.jpg', imageAlt: 'The Camzify Virtual Patrolling screen with the New Sequence panel open, naming a sequence before creating it' },
  { icon: Cpu, title: '3. Assign checklists and guards', desc: 'For each camera in the sequence, add checklist items ("Gate fully closed", "No obstruction in view") and assign a named guard with contact details. Set predefined escalation messages per item.' },
  { icon: Bell, title: '4. Schedule or start manually', desc: 'Auto-Patrol runs on a configured frequency, active hours, and active days. Manual patrols can be triggered on demand. Either way, the round follows the same sequence and checks the same items.' },
  { icon: FileText, title: '5. AI runs the round', desc: 'The system steps through each camera, evaluates every checklist item, marks it Compliant or Not Compliant, and notifies the assigned guard immediately on any failure.' },
  { icon: BarChart3, title: '6. Report and log', desc: 'A PDF report is emailed to designated recipients. The round is logged with its compliance percentage. The patrol log provides a filterable history across all sequences and sites.' },
];

const faqs = [
  { question: 'How long does it take to set up virtual patrolling?', answer: 'It depends on how many cameras and checklist items are involved, but the six steps above are designed to be worked through in a single sitting for a typical site. Connecting cameras is usually the fastest step; building out checklists per camera tends to take the longest.' },
  { question: 'Do the six steps have to be done in order?', answer: 'Cameras need to be connected before they can be added to a patrol sequence, and a sequence needs to exist before checklists and guards can be assigned to it. Beyond that dependency, later steps like scheduling can be revisited and adjusted at any time.' },
  { question: 'What happens if a step is skipped, like assigning a guard?', answer: 'A camera without an assigned guard can still be included in a patrol sequence and checked, but there is nobody to notify if an item comes back Not Compliant. It is worth assigning a guard to every camera before relying on a sequence for real coverage.' },
  { question: 'Do I need technical staff to set this up?', answer: 'No. Connecting a camera is a matter of entering its stream details, and the rest of the setup — building sequences, writing checklist items, assigning guards, scheduling rounds — is done through the same configuration screens without any coding or networking expertise.' },
  { question: 'Can I change something after a patrol sequence is live?', answer: 'Yes. Cameras, checklist items, guard assignments, and the schedule can all be edited at any time. Changes take effect from the next round onward, so a live sequence never has to be torn down to be adjusted.' },
];

export default function HowItWorksPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'How It Works' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Step By Step</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            How Virtual Patrolling Works
          </h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Virtual patrolling is the process of running scheduled AI patrol rounds across
            your existing cameras. Here is exactly how a patrol round moves from camera
            connection to compliance report, step by step.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <div className="space-y-12">
            {(steps ?? []).map((step: any, i: number) => {
              const Icon = step?.icon ?? Wifi;
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className={`grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] ${!isEven ? 'lg:grid-cols-[1.2fr_1fr]' : ''}`}>
                    <div className={!isEven ? 'lg:order-2' : ''}>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="font-display text-xl font-bold">{step?.title ?? ''}</h2>
                      </div>
                      <p className="mt-4 text-muted-foreground">{step?.desc ?? ''}</p>
                    </div>
                    {step?.image ? (
                      <div className={`overflow-hidden rounded-xl bg-card ${!isEven ? 'lg:order-1' : ''}`}>
                        <SiteImage
                          src={step.image}
                          alt={step.imageAlt ?? step?.title ?? ''}
                          className="w-full"
                          width={1229}
                          height={692}
                          // Only the first step is above the fold.
                          priority={i === 0}
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      </div>
                    ) : (
                      <PlaceholderVisual
                        type={i === 4 ? 'camera-feed' : 'diagram'}
                        caption={step?.title ?? ''}
                        alt={`Step ${i + 1}: ${step?.title ?? ''} in the virtual patrolling process`}
                        className={!isEven ? 'lg:order-1' : ''}
                      />
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
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

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Explore More</span>
          <h2 className="mt-2 font-display text-2xl font-bold">Related pages</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/virtual-patrolling/patrol-sequences" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Patrol Sequences</Link>
            <Link href="/virtual-patrolling/patrol-checklists" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Patrol Checklists</Link>
            <Link href="/virtual-patrolling/automated-patrol-scheduling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Automated Scheduling</Link>
            <Link href="/virtual-patrolling/patrol-reports" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Patrol Reports</Link>
            <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
