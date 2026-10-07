import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { SITEMAP_ENTRIES } from '@/lib/routes';
import { lastModifiedFor } from '@/lib/lastmod';

/**
 * Static sitemap, generated at build time from the route list in lib/routes.ts, which the
 * human site map at /sitemap-page reads too.
 *
 * Previously this read `headers()` to derive the host, which forced the route (and by
 * extension every crawl of it) to render dynamically. Canonical host now comes from
 * `siteConfig.url`, matching the canonical tags — a sitemap whose URLs disagree with
 * the page canonicals is a self-inflicted duplicate-content signal.
 *
 * `lastmod` is each page's last real content change, from git (lib/lastmod.ts), not the
 * build time: stamping every page with the build date told crawlers all 267 pages
 * changed on every release. A page whose date git cannot establish has no lastmod.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ENTRIES.map(({ path, priority, changeFrequency }) => {
    const lastModified = lastModifiedFor(path);
    return {
      url: `${siteConfig.url}${path === '/' ? '' : path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
    };
  });
}
