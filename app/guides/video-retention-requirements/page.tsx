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
  title: "Video Retention Requirements | Storage Guide",
  description: "How long should you retain security camera footage? Legal requirements, industry standards, and storage planning for video surveillance.",
  path: "/guides/video-retention-requirements",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function VideoRetentionRequirementsPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "Video Retention Requirements", description: "How long should you retain security camera footage? Legal requirements, industry standards, and storage planning for video surveillance.", path: "/guides/video-retention-requirements", datePublished: '2026-08-31', dateModified: '2026-08-31' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Video Retention Requirements' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Video Retention Requirements</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">Video retention requirements define how long security camera footage must be stored before it can be deleted. Requirements vary by jurisdiction, industry, and insurance policy. Getting retention wrong — too short and you lose evidence; too long and storage costs escalate.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How to set a defensible retention period</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  There is no single legal retention period you can look up and apply. Surveillance
                  retention is governed by a mix of data-protection law, sector regulation, local
                  licensing conditions and your own insurer's requirements, and those interact
                  differently at every site — which is why the industry figures further down this
                  page are norms to calibrate against, not a compliance answer.
                </p>
                <p>
                  What <em>is</em> consistent across the major regimes — Singapore's PDPA, the EU and
                  UK GDPR, and US state privacy law — is the shape of the obligation rather than the
                  duration:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong className="font-semibold text-foreground">You need a stated purpose.</strong>{' '}
                    Footage is personal data. Recording it requires a specific, documented reason —
                    typically security of premises — not a general intention to have cameras.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Retention must be no longer
                    than necessary for that purpose.</strong> This is the operative test almost
                    everywhere. Keeping footage indefinitely is the most common compliance failure,
                    and it is a failure regardless of jurisdiction.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">The period must be defined and
                    applied.</strong> A written retention period that your system does not actually
                    enforce provides no protection. Automatic deletion at the stated period is the
                    control that matters.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">People have rights over the
                    footage.</strong> Subject-access, notification signage and the ability to
                    retrieve or delete specific footage on request are near-universal requirements.
                  </li>
                </ul>
                <p>
                  In practice most commercial sites settle between roughly one and three months, set
                  by whichever of these bites first: how long an incident typically takes to surface,
                  what your insurer or sector regulator requires, and what your storage budget
                  supports. Sites subject to specific licensing conditions — gaming, banking, some
                  transport and healthcare settings — are frequently required to hold footage longer,
                  and those conditions override the general rule.
                </p>
                <p>
                  Confirm your own position with your data-protection officer or legal counsel before
                  fixing a policy. Once you have the number, Camzify's{' '}
                  <a href="/platform/video-backup-and-retention" className="text-primary hover:underline">retention management</a>{' '}
                  enforces it per camera and deletes automatically at the boundary, so the policy on
                  paper and the policy in the system stay identical.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Industry-specific standards</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Financial services often require 90 days minimum. Healthcare facilities may need 30-90 days depending on the area monitored. Retail loss prevention typically retains 30-60 days. Construction sites may only need footage for the project duration plus a liability period.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Insurance and compliance</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Insurance policies may specify minimum retention periods as a condition of coverage. Compliance frameworks (ISO 27001, SOC 2) may require documented retention policies with periodic review. Verify your specific obligations with your insurer and compliance team.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Storage planning</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify's <a href="/platform/video-backup-and-retention">video backup and retention</a> module manages storage automatically based on your configured retention policy. Storage costs scale with camera count, resolution, and retention period. The platform provides usage analytics to help plan capacity. <a href="/virtual-patrolling">Virtual patrolling</a> logs are retained separately from raw video footage.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/security-audit-checklist" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Audit Checklist</Link>
              <Link href="/guides/onvif-and-rtsp-explained" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Onvif And Rtsp Explained</Link>
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
