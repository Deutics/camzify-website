'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { CounterAnimation } from '@/components/motion/counter-animation';
import { Calculator, ArrowRight, TrendingDown } from 'lucide-react';

export function CostVsGuards() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ScrollReveal>
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">Cost Comparison</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Stop paying guard rates for camera checks
              </h2>
              <p className="mt-4 text-body text-muted-foreground">
                A single security guard costs between $15–$30 per hour depending on region.
                Three shifts to cover 24/7 means three guards minimum. Camzify patrols every
                camera on your site for a fraction of that cost — every hour, every day, with
                a timestamped compliance record.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-5">
                  <TrendingDown className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-display text-3xl font-bold">
                    <CounterAnimation value={70} suffix="%" />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">Average cost reduction vs manned guarding</div>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <Calculator className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-display text-3xl font-bold">
                    <CounterAnimation value={365} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">Days per year of consistent patrol coverage</div>
                </div>
              </div>
              <Link
                href="/roi-calculator"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Calculate your savings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-mono text-mono-sm uppercase text-muted-foreground">Annual Cost Comparison</h3>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>One guard (8h shift)</span>
                    <span className="font-mono text-muted-foreground">~$35,000/yr</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-muted">
                    <div className="h-full w-[35%] rounded-full bg-critical/70" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>24/7 guarding (3 shifts)</span>
                    <span className="font-mono text-muted-foreground">~$105,000/yr</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-muted">
                    <div className="h-full w-full rounded-full bg-critical" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-primary">Camzify virtual patrolling</span>
                    <span className="font-mono text-primary">Quoted per camera</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-muted">
                    <div className="h-full w-[15%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Guard cost estimates based on industry averages. Actual figures vary by region and contract terms.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
