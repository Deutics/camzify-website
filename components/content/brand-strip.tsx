import Image from 'next/image';
import { cameraBrands, type CameraBrand } from '@/lib/camera-brands';

/**
 * Camera manufacturer marks.
 *
 * Renders `logo` when artwork has been cleared for use, and a typographic wordmark
 * otherwise — so the section works today and upgrades in place the moment a logo file
 * is dropped in and its path added to `lib/camera-brands.ts`.
 *
 * The wordmark fallback is not a placeholder to be replaced in a hurry: reproducing a
 * manufacturer's logo without checking their trademark policy is a real risk, and a
 * clean typographic list carries none of it while saying exactly the same thing.
 */
function BrandMark({ brand }: { brand: CameraBrand }) {
  if (brand.logo) {
    return (
      <Image
        src={brand.logo}
        alt={brand.name}
        width={140}
        height={40}
        className="h-7 w-auto opacity-70 transition-opacity duration-normal group-hover:opacity-100 dark:invert dark:brightness-0 dark:contrast-200"
      />
    );
  }
  return (
    <span className="font-display text-base font-bold tracking-tight text-foreground/70 transition-colors duration-normal group-hover:text-foreground">
      {brand.name}
    </span>
  );
}

export function BrandStrip({
  limit,
  showNotes = false,
  className = '',
}: {
  limit?: number;
  showNotes?: boolean;
  className?: string;
}) {
  const brands = limit ? cameraBrands.slice(0, limit) : cameraBrands;

  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => (
          <li key={b.name} className="group flex flex-col justify-center bg-card px-5 py-6 text-center">
            <span className="flex items-center justify-center">
              <BrandMark brand={b} />
            </span>
            {showNotes && (
              <span className="mt-2 block text-xs leading-snug text-muted-foreground">{b.note}</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Brand names are trademarks of their respective owners. Listing a manufacturer states
        that its ONVIF-conformant cameras interoperate with Camzify; it does not imply
        partnership, endorsement or certification by that manufacturer.
      </p>
    </div>
  );
}
