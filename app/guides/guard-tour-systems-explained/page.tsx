import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
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
  title: "Guard Tour Systems Explained",
  description: "What is a guard tour system? How NFC/QR guard tour systems work, their limitations, and how virtual patrolling offers a different approach.",
  path: "/guides/guard-tour-systems-explained",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

const faqs = [
  { question: 'What does a guard tour system actually prove?', answer: 'That a guard reached a checkpoint at a time: a tag was scanned or a code was read. It does not prove what the guard saw or whether the condition at the checkpoint was in order.' },
  { question: 'Can virtual patrolling and a guard tour system run together?', answer: "Yes. Keep the tag system for the guard's own record and run the virtual round over the same points. The two records line up by time and either agree or do not, which is the point of guard tour verification." },
  { question: 'Which is cheaper?', answer: 'They are not priced alike. A tag system is priced per device and per guard; a virtual round is priced per camera. The honest comparison is what each proves, and the comparison page sets that out.' },
  { question: 'Is one better for compliance?', answer: 'A record with the frame behind each check is stronger evidence than a timestamp beside a checkpoint ID, and it exists whether or not a guard was on shift. Where a client asks for proof of the condition, not proof of presence, the virtual round is what answers.' },
];

export default function GuardTourSystemsExplainedPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "Guard Tour Systems Explained", description: "What is a guard tour system? How NFC/QR guard tour systems work, their limitations, and how virtual patrolling offers a different approach.", path: "/guides/guard-tour-systems-explained", datePublished: '2026-08-31', dateModified: '2026-08-31' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Guard Tour Systems Explained' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Guard tour systems explained</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">A guard tour system is a technology used to verify that security guards complete their assigned patrol routes. Traditional systems use NFC tags, QR codes, or Bluetooth beacons placed at checkpoints. The guard scans each checkpoint during their round, and the system logs the timestamp to prove they were there.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How traditional guard tour systems work</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `NFC tags or QR codes are placed at physical checkpoints around the facility. The guard carries a reader device or uses a smartphone app to scan each tag during their round. The system records the scan timestamp, creating a log of which checkpoints were visited and when.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The fundamental limitation</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Guard tour systems verify presence, not verification. A guard can tap the NFC tag and walk past without checking whether the door is locked, the area is clear, or the perimeter is intact. The log shows they were there — not that they actually checked anything.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where guard tour systems work well</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `They are effective for accountability — ensuring the guard walked the route. Combined with clear SOPs, they provide a basic compliance record. They are also simple, low-cost, and require minimal training.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Virtual patrolling: the condition-first approach</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `<a href="/virtual-patrolling">Virtual patrolling</a> inverts the approach. Instead of confirming the guard was present, it confirms the condition is correct — is the door closed, is the zone clear, is the camera unobstructed. The AI checks the camera feed regardless of whether a guard is present. See the <a href="/compare/virtual-patrolling-vs-guard-tour-systems">comparison</a> for a detailed side-by-side.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling</Link>
              <Link href="/guides/security-guard-cost-per-hour" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Guard Cost Per Hour</Link>
              <Link href="/guides/security-audit-checklist" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Audit Checklist</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
