import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { ArrowLeftRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Comparisons | Camzify vs Alternatives",
  description: "Honest side-by-side comparisons: virtual patrolling vs security guards, guard tour systems, traditional VMS, and more.",
  path: "/compare",
};

export const metadata = generatePageMeta({ ...pageMeta });

const items = [
  { slug: 'virtual-patrolling-vs-security-guards', title: 'Virtual Patrolling vs Security Guards' },
  { slug: 'virtual-patrolling-vs-guard-tour-systems', title: 'Virtual Patrolling vs Guard Tour Systems' },
  { slug: 'camzify-vs-traditional-vms', title: 'Camzify vs Traditional VMS' },
  { slug: 'ai-video-analytics-vs-motion-detection', title: 'AI Video Analytics vs Motion Detection' },
  { slug: 'cloud-vms-vs-on-premise', title: 'Cloud VMS vs On-Premise VMS' },
];

export default function CompareHub() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Compare' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Comparisons</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Honest, side-by-side comparisons to help you evaluate <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> against alternative approaches to physical security.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.05}>
                <Link href={`/compare/${item.slug}`} className="group flex items-start gap-4 rounded-xl bg-card p-6 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <ArrowLeftRight className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h2 className="font-display text-lg font-bold">{item.title}</h2>
                    <span className="mt-2 block text-sm font-semibold text-primary">Read comparison →</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
