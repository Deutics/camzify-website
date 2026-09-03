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
  title: "Camzify for MSPs | Managed Security Service",
  description: "Offer AI virtual patrolling as a managed service. Multi-tenant client accounts, per-client patrol reporting, and license quota you allocate and reclaim.",
  path: "/partners/for-managed-service-providers",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function ForManagedServiceProvidersPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'For Managed Service Providers' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">For Managed Service Providers</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            MSPs already carry the operational relationship, the network and often the site access — which is most of what a virtual patrolling rollout needs. Camzify adds a security service line on top of that footprint without new hardware to procure or a separate field operation to run: the Connector relays existing cameras from the customer's own network, and multi-site management plus permission groups let you administer many customers from one account while each end client sees only their own sites.
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
