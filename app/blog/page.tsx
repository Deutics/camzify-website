import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SiteImage } from '@/components/content/site-image';
import { longDate } from '@/components/content/author-byline';
import { BLOG_POSTS_NEWEST, blogImageStem, blogThumbStem, deliveredImage, type BlogPost } from '@/lib/blog-posts';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * The index of lib/blog-posts.ts, newest first. Adding a post there lists it here and in
 * the sitemap; see that file for how posts and their image briefs are declared.
 */
const pageMeta = {
  title: "Blog | Video Security, Patrolling and AI Detection",
  description: "Articles on virtual patrolling, AI video analytics, security operations, and industry insights from the Camzify team.",
  path: "/blog",
};

export const metadata = generatePageMeta({ ...pageMeta });

// Read on the server at prerender time, like ImageSlot: previews show the outstanding
// thumbnail brief, the live site a stand-in image.
const SHOW_BRIEFS = process.env.VERCEL_ENV !== 'production';

/** The card image: the designer's thumbnail, else the post's hero, else its stand-in. */
function cardImage(post: BlogPost): string | undefined {
  const hero = post.images.find((i) => i.n === 1);
  return (
    deliveredImage(blogThumbStem(post.slug)) ??
    (hero && deliveredImage(blogImageStem(post.slug, 1))) ??
    hero?.fallback?.src
  );
}

function CardImage({ post, priority }: { post: BlogPost; priority: boolean }) {
  const thumb = deliveredImage(blogThumbStem(post.slug));
  if (!thumb && SHOW_BRIEFS) {
    return (
      <div className="flex aspect-video w-full flex-col justify-center gap-2 border-b-2 border-dashed border-primary/40 bg-primary/5 p-4">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-primary">Card thumbnail · 821 × 462 · {blogThumbStem(post.slug)}</span>
        <span className="line-clamp-4 text-xs leading-relaxed text-foreground/85">{post.thumbBrief}</span>
      </div>
    );
  }
  const src = cardImage(post);
  // No thumbnail, hero or stand-in yet: no image area at all, rather than an empty box.
  if (!src) return null;
  return (
    <div className="aspect-video w-full overflow-hidden border-b border-border bg-muted/30">
      <SiteImage src={src} alt={`Cover illustration for the article ${post.title}`} width={821} height={462} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" priority={priority} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
    </div>
  );
}

export default function BlogPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Blog' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Articles on <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>, AI video analytics, security operations and the questions buyers ask before they choose a system. For step-by-step reference material, see the <Link href="/guides" className="text-primary hover:underline">guides</Link>.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS_NEWEST.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <CardImage post={post} priority={i === 0} />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-xs text-muted-foreground"><time dateTime={post.published}>{longDate(post.published)}</time></p>
                    <h2 className="mt-2 font-display text-base font-bold group-hover:text-primary">{post.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                    <span className="mt-4 text-sm font-semibold text-primary">Read the article →</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
