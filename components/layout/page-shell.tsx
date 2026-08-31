import { ReactNode } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@/components/layout/breadcrumbs';
import { CTABand } from '@/components/layout/cta-band';
import { JsonLd } from '@/components/system/json-ld';
import { graph, webPageSchema, faqSchema, type QA } from '@/lib/seo';

/**
 * Standard wrapper for every content page: breadcrumb trail, page-level structured
 * data, and the closing CTA band.
 *
 * `path` is the page's site-relative path. Passing it lets the shell emit a WebPage
 * node with a stable absolute `@id`, which is what joins this page to the site's
 * entity graph. `faqs` emits the FAQPage node — pass the same array given to
 * `<FAQAccordion>` so the schema and the visible answers can never disagree, which is
 * a hard requirement for the FAQ rich result.
 */
export function PageShell({
  path,
  title,
  description,
  breadcrumbs,
  children,
  showCTA = true,
  ctaProps,
  faqs,
  schema,
}: {
  path?: string;
  title?: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  showCTA?: boolean;
  ctaProps?: Record<string, string>;
  faqs?: QA[];
  /** Extra schema.org nodes for this page, e.g. Service, Article, HowTo. */
  schema?: object[];
}) {
  const nodes: object[] = [];

  if (path && title) {
    nodes.push(webPageSchema({ name: title, description: description ?? '', path }));
  }
  if (faqs?.length) {
    nodes.push(faqSchema(faqs, path));
  }
  if (schema?.length) {
    nodes.push(...schema);
  }

  return (
    <>
      {nodes.length > 0 && <JsonLd data={graph(...nodes)} />}
      <div className="pt-28 pb-8">
        <div className="mx-auto max-w-site px-6">
          <Breadcrumbs items={breadcrumbs ?? []} path={path} />
        </div>
      </div>
      {children}
      {showCTA && <CTABand {...(ctaProps ?? {})} />}
    </>
  );
}
