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
  title: "Camzify for Security Integrators | Partner Program",
  description: "Add AI virtual patrolling to your security integration offering. Camzify works with cameras you already install and maintain.",
  path: "/partners/for-security-integrators",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function ForSecurityIntegratorsPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'For Security Integrators' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">For Security Integrators</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Integrators are usually the reason a site's cameras exist in the first place, which makes virtual patrolling a natural extension rather than a new product to introduce. Because Camzify runs on any ONVIF or RTSP feed, it can be attached to systems you have already installed — including installations several years old — without displacing the VMS or the hardware you specified. That turns a completed project into an ongoing service line, and gives you a reason to revisit an installed base you would otherwise only see for maintenance.
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
