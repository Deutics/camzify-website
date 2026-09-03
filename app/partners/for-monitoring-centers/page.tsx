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
  title: "Camzify for Monitoring Centers | CMS, ARC and GSOC",
  description: "Augment human monitoring with AI patrol automation. For central monitoring stations, alarm receiving centers and GSOCs — Camzify handles routine verification so operators focus on verified threats.",
  path: "/partners/for-monitoring-centers",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function ForMonitoringCentresPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'For Monitoring Centers' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">For Monitoring Centers</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            For central monitoring stations (CMS), alarm receiving centers (ARC) and global
            security operations centers (GSOC). If you provide guarding rather than staffed
            monitoring, see{' '}
            <Link href="/partners/for-security-agencies" className="text-primary hover:underline">Camzify for security agencies</Link>.
          </p>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            For a monitoring center the constraint is operator attention, not camera count. Camzify's value in an ARC or central station is filtering: scheduled patrol rounds verify the routine conditions automatically and escalate only the checks that fail, so operators spend their time on events that need a human decision rather than on rounds that pass. Every round produces a timestamped compliance record, which gives you an auditable service deliverable to show the end client alongside your existing response reporting.
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
