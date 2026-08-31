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
  title: "Cloud VMS vs On-Premise | Video Management Comparison",
  description: "Compare cloud video management with on-premise VMS solutions. Understand the trade-offs in cost, maintenance, scalability, and remote access.",
  path: "/compare/cloud-vms-vs-on-premise",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'Cloud VMS vs On-Premise VMS'.split(' vs ');

export default function CloudVmsVsOnPremisePage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Cloud VMS vs On-Premise VMS' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cloud VMS vs On-Premise VMS</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            An honest comparison of cloud vms vs on-premise vms across the dimensions that matter most to security decision-makers. Both approaches have strengths — this table helps you decide which fits your facility.
          </p>

          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable
                columns={[sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                rows={[
                  { label: "Upfront cost", values: ["Low — subscription per camera", "High — server hardware, NVR, licenses"] },
                  { label: "Maintenance", values: ["Managed by provider — updates automatic", "On-site IT team required for updates and repairs"] },
                  { label: "Remote access", values: ["Native — access from any device, anywhere", "VPN or port forwarding required"] },
                  { label: "Multi-site", values: ["Centralised dashboard for all locations", "Separate systems per site or complex networking"] },
                  { label: "Scalability", values: ["Add cameras instantly", "Hardware upgrade required at capacity"] },
                  { label: "AI capabilities", values: ["Cloud-native AI processing", "Limited — requires dedicated GPU hardware"] },
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
