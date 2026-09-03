import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Check, ArrowRight, Shield, Camera, HardDrive } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Pricing | Virtual Patrolling & AI Video Analytics",
  description: "Camzify pricing: per-camera-per-month licensing for virtual patrolling and AI video analytics. Compare against manned guarding costs, not software.",
  path: "/pricing",
};

export const metadata = generatePageMeta({ ...pageMeta });

/**
 * Pricing is quote-based. Every tier shows the licensing model and what is included,
 * but no rate-card figure is published — the tier shape, camera bands and inclusions
 * are the substance buyers and AI answer engines actually extract from this page.
 * If public rates are ever set, add a `price` string here and the display picks it up.
 */
const tiers = [
  {
    name: 'Starter',
    desc: 'For single-site operations getting started with virtual patrolling.',
    price: null,
    unit: 'Per camera, per month',
    features: ['Up to 16 cameras', 'Virtual patrolling with auto-patrol', '3 AI detection features', '7-day video retention', 'Email support', 'PDF patrol reports'],
    cta: 'Start Free Trial',
    href: '/free-trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    desc: 'For multi-site operations that need full detection coverage.',
    price: null,
    unit: 'Per camera, per month',
    features: ['Up to 64 cameras', 'Everything in Starter', 'All AI detection features', '30-day video retention', 'Multi-site management', 'Priority support', 'Sub-user accounts', 'Permission groups'],
    cta: 'Book a Demo',
    href: '/book-a-demo',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    desc: 'For organizations with complex multi-tenancy and compliance needs.',
    price: null,
    unit: 'Custom agreement',
    features: ['Unlimited cameras', 'Everything in Professional', 'Custom AI instance allocation', 'Custom retention policies', 'Dedicated account manager', 'SLA guarantees', 'API access', 'On-premise deployment option'],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
];

const faqs = [
  { question: 'How does per-camera pricing work?', answer: 'You pay per camera per month. Each camera in your account counts toward your tier limit. AI detection features and virtual patrolling are included — there is no separate charge per feature.' },
  { question: 'What is instance licensing?', answer: 'Each AI detection feature (line intrusion, zone intrusion, etc.) runs as an instance on a camera. Your plan includes a set number of instances per feature. A parent account can allocate instances to sub-accounts for multi-site deployments.' },
  { question: 'How does Camzify compare to hiring a guard?', answer: 'A single security guard costs $15–$30 per hour depending on region. Three shifts for 24/7 coverage means $105,000+ per year per site. Camzify patrols every camera on your site for a fraction of that cost. Use our ROI calculator for exact figures.' },
  { question: 'Is there a free trial?', answer: 'Yes. The free trial lets you connect your own cameras and run patrol rounds with no credit card required. You get full access to virtual patrolling and core detection features.' },
  { question: 'Can I upgrade or downgrade?', answer: 'Plans can be changed at any time. Upgrades take effect immediately. Downgrades apply at the next billing cycle.' },
];

export default function PricingPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Pricing' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Pricing</h1>
            <p className="mt-6 text-body text-muted-foreground">
              Virtual patrolling is priced per camera per month. Compare against what you currently
              pay for manned guarding — not against other software. The <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> shows
              the exact savings for your site.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {(tiers ?? []).map((tier: any, i: number) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className={`relative flex flex-col rounded-2xl border p-8 transition-all hover:shadow-lg ${
                  tier?.highlighted ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-card'
                }`}>
                  {tier?.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="font-display text-xl font-bold">{tier?.name ?? ''}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tier?.desc ?? ''}</p>
                  <div className="mt-6">
                    {tier?.price ? (
                      <>
                        <span className="font-display text-3xl font-extrabold">{tier.price}</span>
                        <span className="text-sm text-muted-foreground"> {tier?.unit ?? ''}</span>
                      </>
                    ) : (
                      <>
                        <span className="font-display text-3xl font-extrabold">Talk to sales</span>
                        <span className="mt-1 block font-mono text-mono-sm uppercase text-muted-foreground">
                          {tier?.unit ?? ''}
                        </span>
                      </>
                    )}
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {(tier?.features ?? []).map((f: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-live" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier?.href ?? '/book-a-demo'}
                    className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition-all ${
                      tier?.highlighted
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border border-border hover:bg-accent'
                    }`}
                  >
                    {tier?.cta ?? 'Get Started'}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Cost comparison */}
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold tracking-tight">Compare against guarding, not software</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                The real comparison is not Camzify vs another platform. It is the cost of running
                <Link href="/virtual-patrolling" className="text-primary hover:underline"> AI patrol rounds</Link> vs
                the cost of hiring guards to walk the same route.
              </p>
            </ScrollReveal>
            <div className="mt-10 overflow-x-auto rounded-xl border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Scenario</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Annual Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border"><td className="px-6 py-3 text-sm">One guard, 8-hour shift, 365 days</td><td className="px-6 py-3 text-right font-mono text-sm">~$35,000</td></tr>
                  <tr className="border-b border-border"><td className="px-6 py-3 text-sm">24/7 guarding (3 shifts)</td><td className="px-6 py-3 text-right font-mono text-sm">~$105,000</td></tr>
                  <tr className="border-b border-border"><td className="px-6 py-3 text-sm">Two-guard rotation (24/7 with overlap)</td><td className="px-6 py-3 text-right font-mono text-sm">~$150,000</td></tr>
                  <tr className="bg-primary/5"><td className="px-6 py-3 text-sm font-semibold text-primary">Camzify virtual patrolling</td><td className="px-6 py-3 text-right font-mono text-sm text-primary">Quoted per camera</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Guard cost estimates are based on published industry averages and vary by region and
              contract terms. Camzify is licensed per camera per month, so the comparable figure
              depends on your camera count rather than headcount — the{' '}
              <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> models
              it against your own site, and a demo returns an exact quote.
            </p>
          </section>

          {/* Instance licensing */}
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How instance licensing works</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Your plan includes a set number of AI feature instances. An instance is one detection
                feature running on one camera. The License Plan page in your account shows: total instances,
                activated by you, granted to sub-users, and available — per feature.
              </p>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                For multi-site deployments, a parent account allocates instances to child accounts.
                This is a genuinely differentiating feature for enterprise buyers managing security across
                distributed locations. Learn more about{' '}
                <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">license and instance management</Link>.
              </p>
            </ScrollReveal>
          </section>

          {/* FAQ */}
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">Pricing FAQ</h2>
            <div className="mt-8 max-w-3xl">
              <FAQAccordion items={faqs} />
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
