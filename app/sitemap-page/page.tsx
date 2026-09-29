import { readFileSync } from 'node:fs';
import path from 'node:path';
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { SITEMAP_ENTRIES } from '@/lib/routes';
import { GLOSSARY_TERMS } from '@/lib/glossary-terms';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';

/**
 * The human site map. Built from the same route list as sitemap.xml (lib/routes.ts), so
 * every indexed page is listed here and nothing is maintained by hand. It used to be a
 * hand-kept list that had fallen to 56 of 267 pages.
 *
 * Link labels are each page's own title, read from its `pageMeta` at build time (this
 * page is statically prerendered, so the source files are read once, during the build).
 * Sections are assigned by path prefix; a route that matches no section still appears,
 * under "More".
 */
const pageMeta = {
  title: 'Sitemap | Every Page on Camzify',
  description: 'Every page on the Camzify website in one list: virtual patrolling, platform, AI detections, use cases, industries, guides, comparisons and the German pages.',
  path: '/sitemap-page',
};

export const metadata = generatePageMeta(pageMeta);

const SECTIONS: { title: string; match: (p: string) => boolean }[] = [
  { title: 'Start here', match: (p) => ['/', '/pricing', '/book-a-demo', '/free-trial', '/roi-calculator', '/contact'].includes(p) },
  { title: 'Virtual patrolling', match: (p) => p.startsWith('/virtual-patrolling') || p === '/virtual-guard' },
  { title: 'Platform', match: (p) => p.startsWith('/platform') || p === '/cloud-video-surveillance' || p === '/camzify-connector' },
  { title: 'AI features', match: (p) => p.startsWith('/ai-features') },
  { title: 'Use cases', match: (p) => p.startsWith('/use-cases') },
  { title: 'Industries', match: (p) => p.startsWith('/industries') },
  { title: 'Partners', match: (p) => p.startsWith('/partners') },
  { title: 'Cameras and connectivity', match: (p) => p.startsWith('/camera-connectivity') || p === '/supported-cameras' },
  { title: 'Guides', match: (p) => p.startsWith('/guides') },
  { title: 'Comparisons and alternatives', match: (p) => p.startsWith('/compare') || p.startsWith('/alternatives') },
  { title: 'Glossary', match: (p) => p.startsWith('/glossary') },
  { title: 'Company and trust', match: (p) => ['/faqs', '/trust', '/security-and-compliance', '/roadmap', '/blog'].includes(p) || p.startsWith('/about') },
  { title: 'Legal', match: (p) => ['/privacy-policy', '/terms-of-service', '/cookie-policy', '/accessibility'].includes(p) },
  { title: 'Deutsch', match: (p) => p === '/de' || p.startsWith('/de/') },
];

const glossaryNames = new Map(GLOSSARY_TERMS.map((t) => [`/glossary/${t.slug}`, t.term]));

/** The page's own title from its pageMeta, without the " | ..." qualifier. */
function titleFor(route: string): string {
  if (route === '/') return 'Home';
  const term = glossaryNames.get(route);
  if (term) return term;
  // The author page builds its title from siteConfig rather than a literal.
  if (route === `/about/${siteConfig.author.slug}`) return siteConfig.author.name;
  try {
    const file = path.join(process.cwd(), 'app', route === '/' ? '' : route, 'page.tsx');
    const source = readFileSync(file, 'utf8');
    const meta = source.match(/const pageMeta\s*=\s*\{[\s\S]*?title:\s*(['"`])(.+?)\1/);
    const title = meta?.[2] ?? source.match(/title:\s*(['"`])(.+?)\1/)?.[2];
    // A title assembled from variables cannot be read from source; fall back to the slug.
    if (title && !title.includes('${')) return title.split(' | ')[0].replace(/\\'/g, "'").trim();
  } catch {
    // No readable source: fall back to the slug.
  }
  const slug = route.split('/').filter(Boolean).pop() ?? route;
  return slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

// Hoisted to module scope: computed once while the page is prerendered, never in render.
const GROUPS = (() => {
  const routes = SITEMAP_ENTRIES.map((e) => e.path).filter((p) => p !== pageMeta.path);
  const seen = new Set<string>();
  const groups = SECTIONS.map((s) => {
    const links = routes.filter((p) => !seen.has(p) && s.match(p)).map((p) => {
      seen.add(p);
      return { href: p, label: titleFor(p) };
    });
    return { title: s.title, links };
  });
  const rest = routes.filter((p) => !seen.has(p)).map((p) => ({ href: p, label: titleFor(p) }));
  if (rest.length) groups.push({ title: 'More', links: rest });
  return groups.filter((g) => g.links.length > 0);
})();

const TOTAL = GROUPS.reduce((n, g) => n + g.links.length, 0);

export default function SitemapPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Sitemap' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Sitemap</h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Every page on the site, {TOTAL} in all, grouped by section. The German pages are listed under Deutsch.
          </p>
          <div className="mt-12 gap-x-10 sm:columns-2 lg:columns-3 xl:columns-4">
            {GROUPS.map((g) => (
              <div key={g.title} className="mb-10 break-inside-avoid">
                <h2 className="font-display text-lg font-bold">
                  {g.title} <span className="font-mono text-mono-sm font-normal text-muted-foreground">{g.links.length}</span>
                </h2>
                <ul className="mt-3 space-y-2" lang={g.title === 'Deutsch' ? 'de' : undefined}>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
