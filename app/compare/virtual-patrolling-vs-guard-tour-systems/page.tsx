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
  title: "Virtual Patrolling vs Guard Tour Systems | Comparison",
  description: "Compare Camzify virtual patrolling with traditional guard tour systems like PIPE and Trackforce. Understand the difference between presence verification and condition verification.",
  path: "/compare/virtual-patrolling-vs-guard-tour-systems",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'Virtual Patrolling vs Guard Tour Systems'.split(' vs ');

export default function VirtualPatrollingVsGuardTourSystemsPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Virtual Patrolling vs Guard Tour Systems' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Virtual Patrolling vs Guard Tour Systems</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            An honest comparison of virtual patrolling vs guard tour systems across the dimensions that matter most to security decision-makers. Both approaches have strengths — this table helps you decide which fits your facility.
          </p>

          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable
                columns={[sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                rows={[
                  { label: "What it verifies", values: ["The condition at each checkpoint — is the door closed, is the area clear", "That the guard was physically present at the checkpoint"] },
                  { label: "Requires on-site staff", values: ["No — runs on existing cameras remotely", "Yes — requires a guard to walk the route"] },
                  { label: "False compliance risk", values: ["Low — AI checks the actual condition", "High — guard can tap tag and walk past"] },
                  { label: "Report quality", values: ["Camera snapshots, AI analysis, compliance %", "Timestamp + checkpoint ID"] },
                  { label: "Cost", values: ["Per camera per month", "Per guard per shift + device costs"] },
                  { label: "Overnight capability", values: ["Runs continuously without staffing", "Requires overnight guard shift"] },
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
