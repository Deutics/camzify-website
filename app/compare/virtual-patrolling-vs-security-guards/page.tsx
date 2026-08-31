import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Virtual Patrolling vs Security Guards | Comparison",
  description: "Compare virtual patrolling with manned security guards across cost, coverage, consistency, and audit trail. See which model fits your facility.",
  path: "/compare/virtual-patrolling-vs-security-guards",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'Virtual Patrolling vs Security Guards'.split(' vs ');

export default function VirtualPatrollingVsSecurityGuardsPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Virtual Patrolling vs Security Guards' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Virtual Patrolling vs Security Guards</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            An honest comparison of virtual patrolling vs security guards across the dimensions that matter most to security decision-makers. Both approaches have strengths — this table helps you decide which fits your facility.
          </p>

          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable
                columns={[sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                rows={[
                  { label: "Coverage", values: ["Every camera, every round, 24/7", "Limited by physical patrol route and fatigue"] },
                  { label: "Cost", values: ["Per camera per month — fraction of guard hourly rates", "SGD 8–25/hour per guard, 24/7 requires 4.5 FTE"] },
                  { label: "Consistency", values: ["Identical checklist every round, zero fatigue", "Varies by guard alertness, morale, weather"] },
                  { label: "Audit trail", values: ["Timestamped PDF report with snapshots", "Paper log or NFC tap — confirms presence, not verification"] },
                  { label: "Response time", values: ["Seconds from detection to notification", "Depends on guard location and awareness"] },
                  { label: "Scalability", values: ["Add cameras, extend the patrol sequence", "Hire and train additional guards"] },
                ]}
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Neither approach is universally better. The right choice depends on your facility size, risk profile, budget, and existing infrastructure. <a href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</a> is strongest where consistency, audit trails, and cost efficiency matter most — typically multi-site operations, after-hours coverage, and facilities where guard costs are the dominant security spend.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Use the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> to model the cost comparison for your specific scenario, or <Link href="/pricing" className="text-primary hover:underline">review pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
