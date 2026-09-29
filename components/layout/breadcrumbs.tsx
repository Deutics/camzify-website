import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from '@/components/system/json-ld';
import { graph, breadcrumbSchema, type Crumb } from '@/lib/seo';
import { LOCALES, type Locale } from '@/lib/i18n';
import { t } from '@/lib/ui-strings';

export type BreadcrumbItem = Crumb;

/**
 * Visual breadcrumb trail plus its BreadcrumbList schema.
 *
 * `path` is the current page's site-relative path. It is used only to give the schema
 * node a unique `@id`; the trail renders fine without it, but passing it keeps every
 * page's breadcrumb node distinct in the entity graph.
 */
export function Breadcrumbs({ items, path, locale = 'en' }: { items: BreadcrumbItem[]; path?: string; locale?: Locale }) {
  const trail = items ?? [];
  const strings = t(locale);

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <JsonLd data={graph(breadcrumbSchema(trail, path, locale))} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href={LOCALES[locale].home} className="flex items-center gap-1 rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">{strings.home}</span>
          </Link>
        </li>
        {trail.map((item: BreadcrumbItem, i: number) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              {item?.href && !isLast ? (
                <Link href={item.href} className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {item?.label ?? ''}
                </Link>
              ) : (
                <span className="font-medium text-foreground" aria-current={isLast ? 'page' : undefined}>
                  {item?.label ?? ''}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
