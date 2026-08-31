import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { articleSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Virtual Patrolling Cost | Pricing Guide",
  description: "What does virtual patrolling cost? Per-camera pricing, comparison with guard costs, and how to calculate ROI for your facility.",
  path: "/guides/virtual-patrolling-cost",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function VirtualPatrollingCostPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "Virtual Patrolling Cost", description: "What does virtual patrolling cost? Per-camera pricing, comparison with guard costs, and how to calculate ROI for your facility.", path: "/guides/virtual-patrolling-cost", datePublished: '2026-08-31', dateModified: '2026-08-31' })]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Virtual Patrolling Cost' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Virtual Patrolling Cost</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">Virtual patrolling cost is typically structured as a per-camera, per-month subscription. The total cost depends on the number of cameras monitored, the AI features activated per camera, and the storage retention period. For most facilities, it represents a fraction of the cost of equivalent manned guard coverage.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How virtual patrolling is priced</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify uses per-camera instance licensing. Each camera can have one or more AI features activated — zone intrusion detection, line intrusion detection, motion detection, and others. The <a href="/virtual-patrolling">virtual patrolling</a> system itself (patrol sequences, checklists, scheduling, reports) is included with the camera license. See the <a href="/pricing">pricing page</a> for current tier details.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Cost comparison with manned guarding</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `A single security guard at SGD 12/hour costs approximately SGD 105,120/year for 24/7 coverage (4.5 FTE including relief). Virtual patrolling with 20 cameras costs a fraction of that annually, while providing more consistent coverage with a verified audit trail. Use the <a href="/roi-calculator">ROI calculator</a> to model your specific scenario.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What affects the price</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `The primary cost drivers are: number of cameras, AI features per camera, video retention period, and number of sites. Multi-site operations typically see the strongest ROI because the per-camera cost scales linearly while guard costs multiply per location.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Hidden costs to consider</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Internet bandwidth (2-4 Mbps per camera), the Camzify Connector for sites with local-only cameras, and any additional camera hardware if existing cameras lack ONVIF/RTSP support. These are typically minor compared to the guard cost savings.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling</Link>
              <Link href="/guides/security-guard-cost-per-hour" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Guard Cost Per Hour</Link>
              <Link href="/guides/ai-video-analytics-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Ai Video Analytics Cost</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
