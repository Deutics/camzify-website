import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Become a Camzify Reseller | Partner Program",
  description: "Join the Camzify reseller program. Sell AI virtual patrolling to your customers with dedicated support, training, and competitive margins.",
  path: "/partners/become-a-reseller",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function BecomeAResellerPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'Become a Reseller' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Become a Reseller</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Camzify is sold through partners as well as directly, and the reseller track exists for companies that already have a security or facilities customer base and want a recurring-revenue line to sell into it. Virtual patrolling suits that motion well: it attaches to cameras the customer already owns, so there is no hardware supply chain to carry and no rip-and-replace conversation to win first. Commercial terms — discount structure, deal registration and renewal treatment — are agreed per partner rather than published, because they depend on the volume and the level of first-line support you take on.
          </p>
          <div className="mt-12 space-y-8 max-w-prose">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why partner with Camzify</h2>
              <p className="mt-4 text-muted-foreground">
                <Link href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</Link> is a growing category in the security market. As more facilities look to reduce guard dependency while maintaining verifiable compliance, the demand for automated patrol solutions is increasing. Partnering with Camzify gives you access to a proven platform with a clear value proposition.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How to get started</h2>
              <p className="mt-4 text-muted-foreground">
                <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to discuss the partnership opportunity. We will walk you through the platform, the commercial model, and the support structure available to partners.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
