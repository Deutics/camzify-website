'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { isProductionHost } from '@/lib/production-host';

/**
 * Vercel Web Analytics and Speed Insights, counting the live site only. `beforeSend`
 * drops every event (page views, custom events such as Lead, and vitals) whose URL is
 * not camzify.com, so preview deployments and local builds stay out of the numbers. A
 * client component because the filter is a function, which a server layout cannot pass.
 */
export function SiteAnalytics() {
  return (
    <>
      <Analytics beforeSend={(event) => (isProductionHost(event.url) ? event : null)} />
      <SpeedInsights beforeSend={(event) => (isProductionHost(event.url) ? event : null)} />
    </>
  );
}
