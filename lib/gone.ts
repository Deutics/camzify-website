/**
 * 410 Gone for paths the old WordPress site served and this site never will:
 * feeds, tag and category archives, the REST and XML-RPC endpoints, wp-admin and the
 * theme's helper paths. Search Console kept reporting them as crawled-not-indexed,
 * 403 or 404, and a 404 is retried for months. A 410 tells Google the URL is gone on
 * purpose, and it drops out of the index within days. The response carries noindex
 * as well, in case a crawler treats a 410 body as content.
 */
export function gone(): Response {
  return new Response('Gone. This address belonged to the previous version of the site and has no replacement.', {
    status: 410,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=86400' },
  });
}
