import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { SITEMAP_ENTRIES } from '@/lib/routes';

/**
 * Static sitemap, generated at build time from the route list in lib/routes.ts, which the
 * human site map at /sitemap-page reads too.
 *
 * Previously this read `headers()` to derive the host, which forced the route (and by
 * extension every crawl of it) to render dynamically. Canonical host now comes from
 * `siteConfig.url`, matching the canonical tags — a sitemap whose URLs disagree with
 * the page canonicals is a self-inflicted duplicate-content signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_ENTRIES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
