import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from '@/components/system/json-ld';
import { graph, breadcrumbSchema, type Crumb } from '@/lib/seo';

export type BreadcrumbItem = Crumb;

/**
 * Visual breadcrumb trail plus its BreadcrumbList schema.
 *
 * `path` is the current page's site-relative path. It is used only to give the schema
 * node a unique `@id`; the trail renders fine without it, but passing it keeps every
 * page's breadcrumb node distinct in the entity graph.
 */
export function Breadcrumbs({ items, path }: { items: BreadcrumbItem[]; path?: string }) {
  const trail = items ?? [];

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <JsonLd data={graph(breadcrumbSchema(trail, path))} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="flex items-center gap-1 rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
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
