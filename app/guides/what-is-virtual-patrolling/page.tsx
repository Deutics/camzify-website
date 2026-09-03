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
  title: "What Is Virtual Patrolling? | Guide",
  description: "Virtual patrolling is a system that runs scheduled AI patrol rounds on existing cameras, checking a defined checklist at each point. Complete guide.",
  path: "/guides/what-is-virtual-patrolling",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function WhatIsVirtualPatrollingPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "What Is Virtual Patrolling?", description: "Virtual patrolling is a system that runs scheduled AI patrol rounds on existing cameras, checking a defined checklist at each point. Complete guide.", path: "/guides/what-is-virtual-patrolling", datePublished: '2026-08-31', dateModified: '2026-08-31' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'What Is Virtual Patrolling?' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What Is Virtual Patrolling?</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">Virtual patrolling is a system that runs scheduled AI patrol rounds across your existing security cameras. At each camera stop, the system checks a defined list of conditions — is the door closed, is the area clear, is the perimeter intact — and flags failures to the assigned security contact. It is an alternative to physical guard patrols that provides consistent, verifiable, and auditable coverage.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How virtual patrolling works</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `A virtual patrol consists of a sequence of cameras, each with a checklist of conditions to verify. The system moves through the sequence on a configurable schedule — every 15, 30, or 60 minutes. At each camera, AI detections assess the scene against the checklist. Passed checks are logged; failed checks trigger a notification to the assigned guard with the camera snapshot, timestamp, and failure details.

The entire round produces a compliance report — exportable as PDF — showing what was checked, when, and the result. This is the audit trail that insurers, regulators, and operations managers need.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What virtual patrolling is not</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Virtual patrolling is not live monitoring by a human operator. It is not a video management system (VMS) that simply records and plays back footage. It is not a guard tour system that confirms physical presence at checkpoints. Virtual patrolling verifies the condition at each point using AI — it checks what the camera sees, not whether someone stood in front of it.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Who uses virtual patrolling</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Virtual patrolling is used by facility managers, security directors, and property management companies who need consistent overnight coverage without the cost of 24/7 manned guarding. It is particularly effective for <a href="/industries/warehouses">warehouses</a>, <a href="/industries/retail">retail chains</a>, <a href="/industries/self-storage">self-storage facilities</a>, and <a href="/use-cases/remote-site-monitoring">remote sites</a> where staffing is impractical.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Virtual patrolling vs security guards</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `The comparison is not binary — many facilities use both. Virtual patrolling provides the consistent, verifiable baseline; guards provide the physical response capability. The cost difference is significant: a single guard at SGD 12/hour for overnight coverage costs roughly SGD 43,800/year. Camzify monitors the same cameras for a fraction of that. See the full comparison at <a href="/virtual-patrolling/vs-security-guards">virtual patrolling vs security guards</a>, or model your specific scenario with the <a href="/roi-calculator">ROI calculator</a>.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/virtual-patrolling-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Virtual Patrolling Cost</Link>
              <Link href="/guides/security-guard-cost-per-hour" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Guard Cost Per Hour</Link>
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
