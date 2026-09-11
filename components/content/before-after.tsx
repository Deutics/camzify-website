import { SiteImage } from '@/components/content/site-image';

/*
 * Two frames from the same camera, before and after: the state a round found, and
 * the state after the guard dealt with it. This is the record a Camzify report
 * carries for every fixed item, and the one image that explains the product to an
 * agency or monitoring company faster than a paragraph does.
 */
export function BeforeAfter({
  before,
  after,
  caption,
  priority = false,
}: {
  before: { src: string; alt: string; label: string };
  after: { src: string; alt: string; label: string };
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid grid-cols-2 gap-1 bg-border p-1">
        {[before, after].map((f, i) => (
          <div key={f.src} className="camera-tile-frame relative aspect-video overflow-hidden rounded-md">
            <SiteImage src={f.src} alt={f.alt} width={1229} height={692} priority={priority && i === 0} sizes="(max-width: 1024px) 50vw, 25vw" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[hsl(216_22%_4%/0.85)] to-transparent" aria-hidden="true" />
            <span className={`camera-tile absolute bottom-2 left-2 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${i === 0 ? 'bg-critical text-white' : 'bg-live text-[hsl(216_22%_6%)]'}`}>
              {f.label}
            </span>
          </div>
        ))}
      </div>
      {caption && <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
