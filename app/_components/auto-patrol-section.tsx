import Link from 'next/link';
import { ArrowRight, Clock, Eye, FileText, ShieldAlert } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { SceneObservation } from '@/components/motion/scene-observation';

/**
 * Auto-Patrol, placed directly after the manual demo.
 *
 * The order is the argument: the visitor has just walked a round themselves and knows
 * what it involves, which is the moment "and it runs itself every two hours, all
 * night" means something. Leading with automation before showing the round makes it
 * sound like a scheduler.
 *
 * Scene observation gets the visual because it is the part that is genuinely hard to
 * believe from a sentence — that the system looks at moving video rather than a still,
 * and that this is what keeps it from waking someone over a person walking past.
 */
export function AutoPatrolSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <SectionAtmosphere variant="left" />

      <div className="relative z-10 mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">Auto-Patrol</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              The same round, walked by AI, all night
            </h2>
            <p className="mt-5 max-w-prose text-body leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Auto-Patrol runs the sequence you built on a schedule you set &mdash; every fifteen
                minutes, every two hours, only after closing.
              </strong>{' '}
              It stops at each camera in order, works through that camera&rsquo;s checklist, messages
              the guard responsible for anything that fails, and files the report before anyone opens
              a laptop &mdash; no operator approving each step. The 3am round happens at 3am, on the
              fourth night as reliably as the first.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
          <ScrollReveal>
            <div>
              <h3 className="font-display text-xl font-bold">It watches. It does not glance.</h3>
              <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
                Set a stop to observe the scene for a moment and the AI assesses live video rather
                than one still frame &mdash; the difference between knowing somebody is in a
                corridor and knowing whether they stayed. That context is what makes an automated
                round feel like a guard walking the floor instead of a script ticking boxes.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  [Clock, 'On a schedule', 'Frequency, active hours and active days, in the site’s own timezone.'],
                  [Eye, 'With context', 'Judge each stop on a single frame, or on a few seconds of live video.'],
                  [ShieldAlert, 'With judgement', 'Flags safety and security risks it sees, even where no checklist item asked.'],
                  [FileText, 'With a record', 'Every round files a compliance report whether or not anyone was watching.'],
                ].map(([Icon, title, desc]) => {
                  const I = Icon as typeof Clock;
                  return (
                    <li key={title as string} className="flex items-start gap-3.5">
                      <span className="mt-0.5 rounded-lg bg-primary/10 p-2">
                        <I className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{title as string}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                          {desc as string}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/virtual-patrolling/risk-detection"
                className="mt-8 mr-6 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Risks it flags beyond the checklist <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/virtual-patrolling/automated-patrol-scheduling"
                className="mt-8 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                How automated patrolling is scheduled <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <SceneObservation />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
