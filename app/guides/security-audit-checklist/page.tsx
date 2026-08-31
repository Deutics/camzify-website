import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { articleSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Security Audit Checklist | Site Security Assessment",
  description: "A practical security audit checklist for evaluating your facility\\'s physical security posture — cameras, access control, lighting, procedures, and monitoring.",
  path: "/guides/security-audit-checklist",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function SecurityAuditChecklistPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "Security Audit Checklist", description: "A practical security audit checklist for evaluating your facility\\'s physical security posture — cameras, access control, lighting, procedures, and monitoring.", path: "/guides/security-audit-checklist", datePublished: '2026-08-31', dateModified: '2026-08-31' })]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Security Audit Checklist' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Security Audit Checklist</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">A security audit checklist is a structured assessment tool for evaluating the physical security posture of a facility. It covers camera coverage, access control, lighting, perimeter integrity, monitoring procedures, and incident response capabilities. Regular audits identify gaps before they become incidents.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Camera coverage assessment</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Review every camera position: Does it cover the intended area? Is the field of view obstructed? Is the image quality sufficient for identification? Are there blind spots between cameras? Are cameras tamper-resistant? Camzify's <a href="/ai-features/camera-tampering-detection">camera tampering detection</a> automates part of this check.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Access control review</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Verify all access points: Are doors secured with appropriate locks or access control? Are emergency exits alarmed? Are badge/key records current? Are former employee credentials revoked promptly? <a href="/use-cases/unauthorized-access-detection">Unauthorized access detection</a> adds a visual verification layer.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Monitoring and response</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Evaluate your monitoring program: Who watches the cameras? How quickly are alerts acknowledged? What is the escalation procedure? Is there a verified audit trail? <a href="/virtual-patrolling">Virtual patrolling</a> addresses these questions systematically with automated rounds and compliance reporting.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Perimeter integrity</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Inspect the physical perimeter: fences, gates, barriers, lighting. Camera coverage of the perimeter should be continuous with no gaps. <a href="/use-cases/perimeter-security">Perimeter security</a> details how AI detection reinforces physical barriers.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Documentation and compliance</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Verify that security logs, incident reports, and patrol records are maintained according to regulatory requirements. Camzify's <a href="/virtual-patrolling/patrol-reports">patrol reports</a> and <a href="/virtual-patrolling/patrol-compliance-tracking">compliance tracking</a> automate this documentation.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling</Link>
              <Link href="/guides/video-retention-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Video Retention Requirements</Link>
              <Link href="/guides/guard-tour-systems-explained" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Guard Tour Systems Explained</Link>
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
