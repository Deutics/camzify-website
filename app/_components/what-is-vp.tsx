import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ProductShot } from '@/components/content/product-shot';

/**
 * The definitional section.
 *
 * The opening paragraph is written to be extracted whole: it answers "what is virtual
 * patrolling" in one self-contained sentence before elaborating, because this is the
 * passage AI answer engines are most likely to quote from the site. Left-aligned and
 * set to `max-w-prose` — the previous centred treatment made a long definition harder
 * to scan for no gain.
 */
export function WhatIsVP() {
  return (
    <section id="what-is-virtual-patrolling" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <ScrollReveal>
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">The category</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                What is virtual patrolling?
              </h2>
              <div className="mt-6 max-w-prose space-y-4 text-body leading-relaxed text-muted-foreground">
                <p>
                  <strong className="font-semibold text-foreground">
                    Virtual patrolling is a scheduled, AI-driven patrol round run across the
                    cameras a site already has.
                  </strong>{' '}
                  The system follows a defined camera route, checks a per-camera list of conditions
                  at each stop, scores the round, and notifies the guard responsible when a check
                  fails.
                </p>
                <p>
                  It produces the same artefact a physical guard tour produces — a timestamped,
                  per-checkpoint compliance record — without a person walking the route. The
                  difference is that it runs identically at 03:00 as it does at 15:00, and every
                  round is auditable afterwards.
                </p>
              </div>
              <Link
                href="/virtual-patrolling"
                className="mt-8 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                How the patrol system works <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ProductShot
              src="/product-virtual-patrolling"
              alt="Camzify virtual patrolling screen showing three patrol sequences, auto-patrol scheduling with round frequency and active hours, and per-round reporting settings"
              label="Virtual Patrolling · Camzify console"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
