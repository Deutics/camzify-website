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
  title: "Remote Guarding Cost | Pricing Guide",
  description: "What does remote guarding cost? Compare virtual monitoring center rates with on-site guards and automated virtual patrolling.",
  path: "/guides/remote-guarding-cost",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function RemoteGuardingCostPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "Remote Guarding Cost", description: "What does remote guarding cost? Compare virtual monitoring center rates with on-site guards and automated virtual patrolling.", path: "/guides/remote-guarding-cost", datePublished: '2026-08-31', dateModified: '2026-08-31' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Remote Guarding Cost' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Remote Guarding Cost</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">Remote guarding cost is the price of having a human operator in a monitoring center watch your camera feeds and respond to alerts. It sits between on-site guarding (most expensive) and fully automated virtual patrolling (least expensive). Typical remote guarding services charge per camera per month, with rates varying by hours of coverage and response protocol.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How remote guarding is priced</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Remote guarding services typically charge SGD 50-200 per camera per month for after-hours monitoring. 24/7 coverage costs more. The service includes human operators who review alerts and follow a response protocol — calling on-site contacts, dispatching guards, or contacting police.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Remote guarding vs on-site guards</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Remote guarding is typically 40-60% cheaper than on-site guards because one operator monitors multiple sites. However, response time is slower — the operator can verify and call, but cannot physically intervene.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Remote guarding vs virtual patrolling</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `<a href="/virtual-patrolling">Virtual patrolling</a> automates the monitoring function entirely — no human operator required for routine patrol rounds. This reduces cost further while increasing consistency. Camzify can alert the same on-call contacts that a remote guarding service would call, but without the per-camera monitoring fee.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">When remote guarding makes sense</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Remote guarding adds value when human judgment is needed for alert verification — ambiguous situations, customer interaction via intercom, or complex response protocols. For routine patrol verification (doors locked, areas clear, perimeters intact), automated <a href="/virtual-patrolling">virtual patrolling</a> is more cost-effective.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/security-guard-cost-per-hour" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Guard Cost Per Hour</Link>
              <Link href="/guides/virtual-patrolling-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Virtual Patrolling Cost</Link>
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling</Link>
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
