import { SiteImage } from '@/components/content/site-image';

/*
 * A photograph or product screenshot in the same frame the section illustrations use,
 * so a page can mix the two without the eye noticing a change of treatment. Images
 * come from the business's own set (public/, staged 2026-09-04) and are served as
 * responsive WebP through SiteImage.
 */
export function PhotoFigure({ src, alt, caption, priority = false, className = '' }: { src: string; alt: string; caption?: string; priority?: boolean; className?: string }) {
  return (
    <figure className={`w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card ${className}`}>
      <SiteImage src={src} alt={alt} className="w-full" width={1600} height={900} priority={priority} sizes="(max-width: 1024px) 100vw, 50vw" />
      {caption && <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
