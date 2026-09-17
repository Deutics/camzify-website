import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { definedTermSchema } from '@/lib/seo';
import { GLOSSARY_TERMS } from '@/lib/glossary-terms';

/**
 * One glossary entry, rendered from lib/glossary-terms.ts. Every term is prerendered
 * (generateStaticParams), carries a DefinedTerm node inside the site's DefinedTermSet,
 * and follows the same page contract as every other page: one H1, FAQs fed to both
 * PageShell and FaqSection, breadcrumbs, and an entry in the sitemap (derived from the
 * same array in app/sitemap.ts).
 */
export function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ slug: t.slug }));
}

function find(slug: string) {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = find(params.slug);
  if (!t) return {};
  return generatePageMeta({ title: t.title, description: t.description, path: `/glossary/${t.slug}`, type: 'article', publishedTime: '2026-09-17', modifiedTime: '2026-09-17' });
}

export default function GlossaryTermPage({ params }: { params: { slug: string } }) {
  const t = find(params.slug);
  if (!t) notFound();
  const path = `/glossary/${t.slug}`;
  const pageMeta = { title: t.title, description: t.description, path };
  const others = GLOSSARY_TERMS.filter((o) => o.slug !== t.slug).slice(0, 6);
  return (
    <PageShell
      {...pageMeta}
      faqs={t.faqs}
      schema={[definedTermSchema({ term: t.term, definition: t.definition, path })]}
      breadcrumbs={[{ label: 'Glossary', href: '/glossary' }, { label: t.term }]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Glossary</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t.term}
            {t.abbreviation && <span className="ml-3 font-mono text-2xl font-medium text-muted-foreground sm:text-3xl">({t.abbreviation})</span>}
          </h1>
          <p className="mt-6 max-w-prose text-body font-semibold leading-relaxed text-foreground">{t.definition}</p>

          <div className="mt-10 max-w-prose space-y-4 text-muted-foreground">
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ScrollReveal>
            <section className="mt-16 rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold">On the site</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.related.map((r) => (
                  <Link key={r.href} href={r.href} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {r.label}
                  </Link>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <section className="mt-10">
            <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">More terms</h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/glossary/${o.slug}`} className="text-primary hover:underline">{o.term}</Link>
                </li>
              ))}
              <li><Link href="/glossary" className="text-muted-foreground hover:text-primary">All terms</Link></li>
            </ul>
          </section>
        </div>
      </article>
      <FaqSection items={t.faqs} />
    </PageShell>
  );
}
