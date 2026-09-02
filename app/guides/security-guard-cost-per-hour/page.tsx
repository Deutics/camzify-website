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
  title: "Security Guard Cost Per Hour | Rates & True Cost",
  description: "What does a security guard cost per hour? Rates by region, total cost of 24/7 coverage, and how to calculate your annual guard spend.",
  path: "/guides/security-guard-cost-per-hour",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function SecurityGuardCostPerHourPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "Security Guard Cost Per Hour", description: "What does a security guard cost per hour? Rates by region, total cost of 24/7 coverage, and how to calculate your annual guard spend.", path: "/guides/security-guard-cost-per-hour", datePublished: '2026-08-31', dateModified: '2026-08-31' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Security Guard Cost Per Hour' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Security Guard Cost Per Hour</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">Security guard cost per hour varies by region, level of training, and contract terms. In Singapore, unarmed security guards typically cost SGD 8-15 per hour. In the US, rates range from USD 15-35 per hour. The true cost of guard coverage goes far beyond the hourly rate — it includes overtime, benefits, training, supervision, and the 4.5 FTE required for genuine 24/7 coverage.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How to work out your real hourly cost</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The hourly rates above are the starting point, not the answer. The rate a guarding
                  contractor quotes is a billed rate, not your cost of coverage, and the gap between
                  the two is where security budgets get missed. Rates also move with local labour
                  markets and licensing regimes, so treat any published figure — including ours — as
                  indicative and confirm it with two or three quotes in your own market.
                </p>
                <p>
                  Start with the <strong className="font-semibold text-foreground">billed hourly
                  rate</strong> from your contractor, then account for the four things it usually
                  excludes:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong className="font-semibold text-foreground">Shift loading.</strong> Nights,
                    weekends and public holidays carry a premium in most markets. A site needing
                    genuine 24/7 cover pays a blended rate well above the daytime headline.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Coverage ratio.</strong> One
                    guarded post is not one guard. Allowing for leave, sickness, training and breaks,
                    continuous cover of a single post typically requires four to five people on the
                    roster — so the annual cost of a post is a multiple of one salary.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Turnover.</strong> Guarding has
                    high churn. Recruitment, vetting, site induction and the productivity cost of a
                    guard who does not yet know the site are recurring, not one-off.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Supervision and admin.</strong>
                    {' '}Rostering, contract management, incident reporting and audits consume
                    management time that never appears on the contractor invoice.
                  </li>
                </ul>
                <p>
                  As an order of magnitude, a single staffed post covering one eight-hour shift every
                  day of the year commonly lands in the tens of thousands of dollars annually, and
                  genuine round-the-clock cover of the same post is roughly three times that before
                  supervision. Those are the figures used in the{' '}
                  <a href="/roi-calculator" className="text-primary hover:underline">ROI calculator</a>,
                  which lets you substitute your own rate rather than an industry average.
                </p>
                <p>
                  Rates vary widely by country, by licensing regime and by whether the officer is
                  armed, so confirm your own market with two or three contractor quotes before
                  building a business case. What does not vary is the structure of the calculation
                  above — and that the routine patrol round, the part{' '}
                  <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a>{' '}
                  replaces, is the largest single consumer of those paid hours.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The true cost of 24/7 coverage</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `24/7 guard coverage requires 4.5 full-time equivalents (FTEs) per post when accounting for shifts, breaks, sick leave, holidays, and relief coverage. A single post at SGD 12/hour costs approximately SGD 105,120/year — not SGD 105,120 × 1, but × 4.5 to maintain continuous coverage. Many buyers underestimate this multiplier.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where the money actually goes</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Beyond hourly wages: employer contributions (CPF in Singapore, social security elsewhere), uniforms, training and re-certification, supervision, scheduling and payroll administration, liability insurance, and recruitment costs for the industry's high turnover rate.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The alternative: virtual patrolling</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `For facilities where the primary guard function is patrol — checking doors, verifying perimeters, confirming areas are clear — <a href="/virtual-patrolling">virtual patrolling</a> provides equivalent coverage at a fraction of the cost. The <a href="/roi-calculator">ROI calculator</a> models the specific comparison for your situation.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/virtual-patrolling-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Virtual Patrolling Cost</Link>
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling</Link>
              <Link href="/guides/remote-guarding-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Remote Guarding Cost</Link>
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
