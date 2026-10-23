/**
 * Any /blog/<slug> with no post behind it: a WordPress-era post that was not carried over.
 * They go to the guides hub, where their subjects now live; a permanent redirect beats a
 * 404 for the reader and for inbound links nobody catalogued.
 *
 * This was a `/blog/:slug+` redirect in next.config.js until the blog came back
 * (lib/blog-posts.ts). Config redirects run before the filesystem, so it sent the new
 * posts to /guides too. As a catch-all route it only answers what no page does: a post's
 * own app/blog/<slug>/page.tsx is a static segment and always wins. The old posts that
 * had a direct replacement keep their specific redirects in next.config.js.
 */
export const dynamic = 'force-static';

const toGuides = () => new Response(null, { status: 308, headers: { Location: '/guides' } });

export function GET() {
  return toGuides();
}
export function HEAD() {
  return toGuides();
}
