import { ReactNode } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@/components/layout/breadcrumbs';
import { CTABand } from '@/components/layout/cta-band';
import { JsonLd } from '@/components/system/json-ld';
import { graph, webPageSchema, faqSchema, type QA } from '@/lib/seo';
import { localeFromPath, LOCALES } from '@/lib/i18n';

/**
 * Standard wrapper for every content page: breadcrumb trail, page-level structured
 * data, and the closing CTA band.
 *
 * `path` is the page's site-relative path. Passing it lets the shell emit a WebPage
 * node with a stable absolute `@id`, which is what joins this page to the site's
 * entity graph. `faqs` emits the FAQPage node — pass the same array given to
 * `<FAQAccordion>` so the schema and the visible answers can never disagree, which is
 * a hard requirement for the FAQ rich result.
 *
 * The page's language follows from its path (/de/... is German; lib/i18n.ts). A German
 * page gets German breadcrumbs and CTA band, `inLanguage: 'de'` in its schema, and its
 * content wrapped in `lang="de"` so assistive technology and crawlers read it as German
 * even though the document root, shared by every route, says `en` until hydration.
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
  inLanguage,
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
  /** WebPage schema language, e.g. 'de'. Derived from `path` when omitted. */
  inLanguage?: string;
}) {
  const locale = localeFromPath(path);
  const lang = inLanguage ?? LOCALES[locale].htmlLang;
  const nodes: object[] = [];

  if (path && title) {
    nodes.push(webPageSchema({ name: title, description: description ?? '', path, inLanguage: lang }));
  }
  if (faqs?.length) {
    nodes.push(faqSchema(faqs, path));
  }
  if (schema?.length) {
    nodes.push(...schema);
  }

  const body = (
    <>
      {nodes.length > 0 && <JsonLd data={graph(...nodes)} />}
      <div className="pt-32 pb-8 lg:pt-36">
        <div className="mx-auto max-w-site px-6">
          <Breadcrumbs items={breadcrumbs ?? []} path={path} locale={locale} />
        </div>
      </div>
      {children}
      {showCTA && <CTABand locale={locale} {...(ctaProps ?? {})} />}
    </>
  );

  return locale === 'en' ? body : <div lang={LOCALES[locale].htmlLang}>{body}</div>;
}
