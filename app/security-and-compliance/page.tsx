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
  title: "Security & Compliance | Data Protection",
  description: "Camzify security practices: encryption, access control, data residency, and compliance framework. Transparent documentation of our security posture.",
  path: "/security-and-compliance",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function SecurityCompliancePage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Security & Compliance' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Security & Compliance</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Security is foundational to a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> platform. This page documents our security practices, data protection measures, and compliance posture. Where we have not yet obtained a certification, we state that plainly.
          </p>
          <div className="mt-16 space-y-12 max-w-prose">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Encryption</h2>
              <p className="mt-4 text-muted-foreground">All camera streams are transmitted over encrypted connections (TLS 1.2+). Video footage at rest is encrypted using AES-256. API communications use HTTPS with certificate pinning where supported.</p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Access control</h2>
              <p className="mt-4 text-muted-foreground">The platform supports role-based access control through <Link href="/platform/user-management" className="text-primary hover:underline">user management</Link> and <Link href="/platform/permission-groups" className="text-primary hover:underline">permission groups</Link>. Every action is logged in the audit trail.</p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Certification status</h2>
              <p className="mt-4 text-muted-foreground">
                We list certification work honestly, including where it is unfinished. Everything
                below is <strong className="font-semibold text-foreground">in progress and not yet
                held</strong>. Camzify should not be described as certified under any of these
                frameworks until this page says otherwise.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  {
                    name: 'Singapore PDPA',
                    detail: 'Personal Data Protection Act alignment for data handling, consent and breach notification, covering our Singapore operations and customers.',
                  },
                  {
                    name: 'GDPR',
                    detail: 'General Data Protection Regulation alignment for EU data subjects, covering lawful basis, data-subject rights and processor obligations.',
                  },
                  {
                    name: 'SOC 2 Type II',
                    detail: 'Controls across security, availability and confidentiality, evidenced over an observation window rather than at a point in time.',
                  },
                  {
                    name: 'ISO 27001',
                    detail: 'Information security management system covering risk assessment, controls and continuous improvement.',
                  },
                ].map((item) => (
                  <li key={item.name} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display font-bold">{item.name}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-warn/15 px-3 py-1 font-mono text-mono-sm uppercase text-warn">
                        In progress
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Target dates are not published because we will not commit to a date we cannot
                guarantee. If your procurement process needs current status in writing,{' '}
                <Link href="/contact" className="text-primary hover:underline">contact us</Link> and
                we will tell you exactly where each item stands.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
