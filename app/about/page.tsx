import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { siteConfig, formattedAddress } from '@/lib/site-config';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "About Camzify | AI Video Surveillance from Singapore",
  description: "Camzify is an AI video analytics and virtual patrolling platform by Deutics Global Pte Ltd, headquartered in Singapore.",
  path: "/about",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function AboutPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'About' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">About Camzify</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Camzify is an AI video analytics and <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> platform built by Deutics Global Pte Ltd, headquartered in Singapore. The platform turns existing security cameras into an active verification system — running scheduled AI patrol rounds, checking defined conditions at each camera, and notifying the right person when something fails.
          </p>
          <div className="mt-16 space-y-12 max-w-prose">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What we do</h2>
              <p className="mt-4 text-muted-foreground">We build software that makes security cameras useful beyond recording. Our virtual patrolling system runs automated rounds on existing cameras — checking doors, verifying perimeters, confirming zones are clear — and delivers a structured compliance report. Every patrol round is timestamped, verifiable, and audit-ready.</p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why we exist</h2>
              <p className="mt-4 text-muted-foreground">Most security cameras record footage that no one watches. Guards cannot be everywhere, and monitoring centres scale poorly. We believe AI should handle the routine verification — checking the same conditions at the same cameras on the same schedule — so that humans can focus on response, judgment, and the exceptions that genuinely need attention.</p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Company information</h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li><strong>Company:</strong> {siteConfig.legalName}</li>
                <li><strong>Trading as:</strong> {siteConfig.name}</li>
                <li><strong>Headquarters:</strong> {siteConfig.address.countryName}</li>
                <li><strong>Address:</strong> {formattedAddress}</li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
