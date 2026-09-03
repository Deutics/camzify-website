import Image from 'next/image';
import { cameraBrands, type CameraBrand } from '@/lib/camera-brands';

/**
 * Camera manufacturer marks.
 *
 * Every cell is a white plate. That is not a styling preference — it is what the
 * artwork requires. Four of the eight marks (Axis, Dahua, Hanwha Vision, Uniview)
 * carry black or near-black lettering and vanish against the dark theme, and the fix
 * cannot be to recolour them: altering a trademark is worse than omitting it, and
 * inverting a two-colour mark yields something that is not the logo. On a white plate
 * each mark renders in exactly the colours its owner published, in both themes.
 *
 * Brands still awaiting artwork render a wordmark on the same plate, so the grid stays
 * one visual treatment rather than splitting into logos and text.
 *
 * Optical sizing: logos arrive at very different aspect ratios — Ubiquiti's is nearly
 * square, Axis is a wide lockup. Every mark is capped to the same height inside a fixed
 * box with object-contain, which is what makes the row read as one row.
 */
function BrandMark({ brand }: { brand: CameraBrand }) {
  if (!brand.logo) {
    return (
      <span className="font-display text-base font-bold tracking-tight">{brand.name}</span>
    );
  }

  // Capped on both axes rather than one. A single height cap crushes stacked lockups
  // (Hanwha Vision and Uniview set their mark above the wordmark) while wide lockups
  // like Axis and TP-Link are limited by width anyway, so the two constraints together
  // are what make marks of different shapes read as the same size.
  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={180}
      height={44}
      className="max-h-11 w-auto max-w-[180px] object-contain"
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
          <li key={b.name} className="flex flex-col bg-card">
            <span className="brand-plate flex h-20 items-center justify-center px-5">
              <BrandMark brand={b} />
            </span>
            {showNotes && (
              <span className="block px-5 py-3 text-xs leading-snug text-muted-foreground">
                {b.note}
              </span>
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
