import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Cost comparison.
 *
 * The previous version led with an animated "70% average cost reduction" headline.
 * That figure was not substantiated anywhere, and /trust publicly commits to not
 * publishing numbers the business has not verified — so the page was contradicting
 * its own stated policy in its largest type.
 *
 * The guard-side figures below are retained because they are attributed to published
 * industry averages and the page says so. The Camzify side stays quote-based, and the
 * reader is sent to the ROI calculator to run their own numbers, which is a stronger
 * close than an unverifiable percentage.
 */
const rows = [
  { label: 'One guard, one 8-hour shift, every day', cost: '~$35,000/yr', width: '33%', tone: 'critical' },
  { label: '24/7 cover, three shifts', cost: '~$105,000/yr', width: '100%', tone: 'critical' },
  { label: 'Camzify virtual patrolling', cost: 'Quoted per camera', width: '14%', tone: 'primary' },
];

export function CostVsGuards() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">Cost Comparison</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Stop paying guard rates for camera checks
              </h2>
              <div className="mt-5 max-w-prose space-y-4 text-body text-muted-foreground">
                <p>
                  A security guard costs roughly $15–$30 an hour depending on the market, and one
                  staffed post is not one guard. Allowing for leave, sickness and breaks,
                  continuous cover of a single post typically needs four to five people on the
                  roster.
                </p>
                <p>
                  Most of those paid hours go on the routine round: walking the same route,
                  checking the same doors, confirming the same areas are clear. That is the part
                  virtual patrolling replaces, not the response and not the judgment.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/roi-calculator"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-fast hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Run your own numbers <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/guides/security-guard-cost-per-hour"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  How guard cost is calculated
                </Link>
              </div>

              {/*
                This section argues from the end user's side. A guarding company reading
                it is being told its own model is the cost, so it gets the other door.
              */}
              <p className="mt-8 rounded-lg border border-border bg-card/60 p-4 text-sm text-muted-foreground">
                <strong className="font-semibold text-foreground">Run a security agency?</strong>{' '}
                For you this is coverage to sell rather than a cost to cut: overnight rounds across
                every client site, alongside the guards you already provide.{' '}
                <Link href="/partners/for-security-agencies" className="text-primary hover:underline">
                  Camzify for security agencies
                </Link>
                . Monitor on an agency&apos;s behalf? See{' '}
                <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">
                  Camzify for monitoring companies
                </Link>
                .
              </p>

              <p className="mt-6 text-sm text-muted-foreground">
                Weighing the options?{' '}
                <Link href="/virtual-patrolling/vs-security-guards" className="text-primary hover:underline">
                  Virtual patrolling vs security guards
                </Link>
                ,{' '}
                <Link href="/compare/virtual-patrolling-vs-guard-tour-systems" className="text-primary hover:underline">
                  vs guard tour systems
                </Link>{' '}
                and{' '}
                <Link href="/compare/camzify-vs-eagle-eye-networks" className="text-primary hover:underline">
                  Camzify vs Eagle Eye Networks
                </Link>
                .
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-7 sm:p-8">
              <h3 className="font-mono text-mono-sm uppercase text-muted-foreground">
                Annual cost of one patrolled site
              </h3>
              <div className="mt-8 space-y-7">
                {rows.map((r) => (
                  <div key={r.label}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span
                        className={`text-sm ${r.tone === 'primary' ? 'font-semibold text-primary' : ''}`}
                      >
                        {r.label}
                      </span>
                      <span
                        className={`font-mono text-sm tabular-nums ${
                          r.tone === 'primary' ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {r.cost}
                      </span>
                    </div>
                    <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          r.tone === 'primary' ? 'bg-primary' : 'bg-critical/70'
                        }`}
                        style={{ width: r.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                Guard figures are order-of-magnitude estimates from published industry averages and
                vary widely by market and contract. Camzify is licensed per camera per month, so the
                comparable figure depends on your camera count rather than headcount, and the ROI
                calculator works it out against your own site.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
