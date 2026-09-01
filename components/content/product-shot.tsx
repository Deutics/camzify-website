import Image from 'next/image';

/**
 * A product screenshot in a console frame.
 *
 * The `label` renders in a chrome bar above the image so every shot is explicitly
 * identified as the Camzify console rather than presented as an unlabelled hero image.
 * The figures visible inside these screenshots are interface illustrations — sample
 * sites, sample camera counts — not customer data, and the caption says so once per
 * page rather than on every frame.
 *
 * Dimensions are fixed because every capture is produced at the same size; passing the
 * real intrinsic size is what stops the frame reserving the wrong space and shifting
 * layout while the image loads.
 */
export function ProductShot({
  src,
  alt,
  label,
  priority = false,
  className = '',
  sizes = '(max-width: 1024px) 100vw, 55vw',
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        </span>
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">{label}</span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1224}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className="w-full transition-transform duration-slow ease-out motion-safe:group-hover:scale-[1.015]"
      />
    </figure>
  );
}
