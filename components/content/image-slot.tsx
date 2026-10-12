import { ImageIcon } from 'lucide-react';
import { PhotoFigure } from '@/components/content/photo-figure';
import { blogPost, blogImageStem, deliveredImage } from '@/lib/blog-posts';

/**
 * A numbered image position in a blog post, declared in lib/blog-posts.ts with a brief for
 * the designer.
 *
 * - Delivered (the file `blog-<slug>-<n>` is in the image manifest): the image itself.
 * - Not delivered, on a preview or local build: a dashed box with the slot number and the
 *   brief, so the team can see on the page where each image goes and what it should show.
 * - Not delivered, on the live site: the slot's fallback image if it has one, otherwise
 *   nothing. A designer's brief is never shown to visitors.
 *
 * VERCEL_ENV is read on the server while the page is prerendered, so the choice is baked
 * into the static HTML of each deployment and cannot cause a hydration mismatch.
 */
const SHOW_BRIEFS = process.env.VERCEL_ENV !== 'production';

export function ImageSlot({ post, n, priority = false }: { post: string; n: number; priority?: boolean }) {
  const image = blogPost(post).images.find((i) => i.n === n);
  if (!image) throw new Error(`Blog post "${post}" declares no image ${n} in lib/blog-posts.ts`);

  const stem = blogImageStem(post, n);
  const delivered = deliveredImage(stem, image.kind);
  if (delivered) return <PhotoFigure src={delivered} alt={image.alt} caption={image.caption} priority={priority} />;

  if (!SHOW_BRIEFS) {
    return image.fallback ? <PhotoFigure src={image.fallback.src} alt={image.fallback.alt} caption={image.fallback.caption} priority={priority} /> : null;
  }

  return (
    <figure className="flex min-h-56 w-full flex-col justify-center gap-3 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-6 sm:aspect-video sm:p-8">
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-primary">
        <ImageIcon className="h-4 w-4" aria-hidden="true" />
        Image {n} · {image.kind === 'photo' ? 'photo, 1600 × 900 JPEG' : 'render, 1600 × 900 PNG'} · {stem}
      </div>
      <p className="text-sm leading-relaxed text-foreground/85">{image.brief}</p>
      <p className="text-xs text-muted-foreground">
        Preview only: the live site shows {image.fallback ? <>the stand-in <span className="font-mono">{image.fallback.src}</span></> : 'nothing'} here until this image is delivered.
      </p>
    </figure>
  );
}
