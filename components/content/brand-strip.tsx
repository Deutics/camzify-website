import Image from 'next/image';
import { cameraBrands, type CameraBrand } from '@/lib/camera-brands';

/**
 * Camera manufacturer marks.
 *
 * Renders each brand's logo where artwork exists and a typographic wordmark where it
 * does not, so a partially supplied set looks deliberate rather than broken.
 *
 * Two things this gets right that a naive logo wall does not:
 *
 * Optical sizing. Logos arrive at wildly different aspect ratios — Bosch is nearly
 * square, Hanwha Vision is a long lockup. Scaling all of them to the same *width*
 * makes the tall ones tower over the wide ones. Every mark is instead capped to the
 * same height inside a fixed box with object-contain, which is how a logo wall reads
 * as one row rather than a pile.
 *
 * Dark theme. The previous version applied `invert brightness-0` to every mark, which
 * would have turned every coloured logo into a white silhouette — a wrong logo, and a
 * worse trademark problem than no logo. Inversion is now opt-in per brand via
 * `monochrome`, and brands that need a genuinely different file supply `logoDark`.
 */
function BrandMark({ brand }: { brand: CameraBrand }) {
  if (!brand.logo) {
    return (
      <span className="font-display text-base font-bold tracking-tight text-foreground/70 transition-colors duration-normal group-hover:text-foreground">
        {brand.name}
      </span>
    );
  }

  const common = 'max-h-7 w-auto object-contain opacity-75 transition-opacity duration-normal group-hover:opacity-100';

  // A separate dark-theme file: show one, hide the other. Both stay in the DOM.
  if (brand.logoDark) {
    return (
      <>
        <Image src={brand.logo} alt={brand.name} width={140} height={28} className={`${common} dark:hidden`} />
        <Image src={brand.logoDark} alt="" aria-hidden="true" width={140} height={28} className={`hidden ${common} dark:block`} />
      </>
    );
  }

  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={140}
      height={28}
      className={`${common} ${brand.monochrome ? 'dark:brightness-0 dark:invert' : ''}`}
    />
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
            {/* Fixed-height box: every mark is optically the same size whatever its ratio. */}
            <span className="flex h-7 items-center justify-center">
              <BrandMark brand={b} />
            </span>
            {showNotes && (
              <span className="mt-2.5 block text-xs leading-snug text-muted-foreground">{b.note}</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Brand names and logos are trademarks of their respective owners. Listing a manufacturer
        states that its ONVIF-conformant cameras interoperate with Camzify; it does not imply
        partnership, endorsement or certification by that manufacturer.
      </p>
    </div>
  );
}
