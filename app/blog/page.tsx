import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Blog",
  description: "Articles on virtual patrolling, AI video analytics, security operations, and industry insights from the Camzify team.",
  path: "/blog",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function BlogPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Blog' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Articles on <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>, AI video analytics, security operations, and industry insights.
          </p>
          <div className="mt-14 rounded-xl bg-card p-12 text-center shadow">
            <p className="text-muted-foreground">Blog posts are coming soon. In the meantime, explore our <Link href="/guides" className="text-primary hover:underline">in-depth guides</Link>.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
