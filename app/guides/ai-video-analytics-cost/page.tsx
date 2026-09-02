import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Video Analytics Cost | Pricing Guide",
  description: "What does AI video analytics cost? Per-camera pricing models, cloud vs on-premise, and how to evaluate ROI for your security budget.",
  path: "/guides/ai-video-analytics-cost",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function AiVideoAnalyticsCostPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "AI Video Analytics Cost", description: "What does AI video analytics cost? Per-camera pricing models, cloud vs on-premise, and how to evaluate ROI for your security budget.", path: "/guides/ai-video-analytics-cost", datePublished: '2026-08-31', dateModified: '2026-08-31' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'AI Video Analytics Cost' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Video Analytics Cost</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">AI video analytics cost is the price of adding automated detection, classification, and alerting capabilities to your existing camera infrastructure. Pricing models vary: per-camera subscriptions, per-channel licenses, or hardware-bundled solutions. Cloud-based analytics like Camzify typically offer the lowest entry cost with subscription pricing.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Pricing models in the market</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `The three dominant pricing models are: per-camera subscription (Camzify, Eagle Eye), per-channel perpetual license (Milestone, Genetec), and hardware-bundled (Verkada). Subscription models have the lowest upfront cost; perpetual licenses have lower long-term cost but require on-premise infrastructure.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What drives the cost</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Number of cameras, types of analytics (basic motion vs AI detection vs attribute extraction), video retention period, cloud vs on-premise deployment, and integration requirements. More advanced AI capabilities command higher per-camera prices.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Cloud vs on-premise cost comparison</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Cloud analytics (like Camzify) eliminate server hardware, GPU costs, and on-site IT maintenance. On-premise solutions require upfront hardware investment but may have lower long-term per-camera costs at scale. See the <a href="/compare/cloud-vms-vs-on-premise">cloud vs on-premise comparison</a> for details.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Evaluating ROI</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `The ROI of AI video analytics is measured against the cost it replaces — guard hours, incident investigation time, compliance reporting effort, and loss prevention outcomes. Use the <a href="/roi-calculator">ROI calculator</a> to model the comparison for your <a href="/virtual-patrolling">virtual patrolling</a> deployment.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/virtual-patrolling-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Virtual Patrolling Cost</Link>
              <Link href="/guides/security-guard-cost-per-hour" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Guard Cost Per Hour</Link>
              <Link href="/guides/how-to-choose-video-analytics-software" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How To Choose Video Analytics Software</Link>
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
