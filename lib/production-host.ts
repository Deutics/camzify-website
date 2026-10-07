import { siteConfig } from '@/lib/site-config';

/**
 * Whether a URL or hostname is the live site, camzify.com.
 *
 * Analytics count real visitors only. Vercel preview deployments
 * (camzify-website-git-*.vercel.app), local builds and any other host are the team testing,
 * and before this check they were inflating every dashboard: Clarity showed preview URLs among
 * the top pages in October 2026. www.camzify.com is not counted either; it redirects to
 * camzify.com before a page ever loads.
 */
const PRODUCTION_HOST = new URL(siteConfig.url).hostname;

export function isProductionHost(urlOrHost: string): boolean {
  try {
    const host = urlOrHost.includes('://') ? new URL(urlOrHost).hostname : urlOrHost;
    return host === PRODUCTION_HOST;
  } catch {
    return false;
  }
}
