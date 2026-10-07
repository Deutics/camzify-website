import Image from 'next/image';
import Link from 'next/link';
import { cameraBrands, type CameraBrand } from '@/lib/camera-brands';

/**
 * Camera manufacturer marks.
 *
 * Every cell is a white plate. That is not a styling preference — it is what the
 * artwork requires. Four of the eight marks (Axis, Dahua, Hanwha Vision, Uniview)
 * carry black or near-black lettering and vanish against the dark theme, and the fix
 * cannot be to recolor them: altering a trademark is worse than omitting it, and
 * inverting a two-colour mark yields something that is not the logo. On a white plate
 * each mark renders in exactly the colors its owner published, in both themes.
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
      className="max-h-11 w-auto max-w-[min(180px,100%)] object-contain"
    />
  );
}

function BrandTile({ brand, link, showNotes }: { brand: CameraBrand; link?: { href: string; label: string }; showNotes: boolean }) {
  const body = (
    <>
      <span className="brand-plate flex h-20 items-center justify-center px-5">
        <BrandMark brand={brand} />
      </span>
      {showNotes && (
        <span className="block px-5 py-3 text-xs leading-snug text-muted-foreground">
          {brand.note}
          {link && <span className="mt-1 block font-medium text-primary group-hover:underline">{link.label} &rarr;</span>}
        </span>
      )}
    </>
  );
  if (!link) return body;
  return (
    <Link href={link.href} className="group flex h-full flex-col no-underline transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
      {body}
    </Link>
  );
}

export function BrandStrip({
  brands: brandList = cameraBrands,
  limit,
  showNotes = false,
  className = '',
  protocolClaim,
  locale = 'en',
  linkFor,
}: {
  /** Defaults to the ONVIF/RTSP camera list; pass a different array (e.g. rtmpStreamingBrands) to render that instead. */
  brands?: CameraBrand[];
  limit?: number;
  showNotes?: boolean;
  className?: string;
  /** The interoperability fact the disclaimer states, since it differs by list — e.g. ONVIF/RTSP vs native RTMP push. */
  protocolClaim?: string;
  /** Language of the trademark disclaimer. On a German page pass 'de' and a German `protocolClaim`. */
  locale?: 'en' | 'de';
  /**
   * Where each tile links, or undefined to leave it plain. Clarity (October 2026) showed
   * visitors clicking the logos on /supported-cameras and getting nothing: they want to
   * know how *their* brand connects. A tile is a link only when a page answers that.
   */
  linkFor?: (brand: CameraBrand) => { href: string; label: string } | undefined;
}) {
  const claim = protocolClaim ?? (locale === 'de'
    ? 'ONVIF-konformen Kameras über RTSP mit Camzify zusammenarbeiten'
    : 'ONVIF-conformant cameras interoperate with Camzify over RTSP');
  const brands = limit ? brandList.slice(0, limit) : brandList;

  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => (
          <li key={b.name} className="flex flex-col bg-card">
            <BrandTile brand={b} link={linkFor?.(b)} showNotes={showNotes} />
          </li>
        ))}
      </ul>
      {locale === 'de' ? (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Markennamen und Logos sind Marken ihrer jeweiligen Inhaber. Die Nennung eines Herstellers
          besagt, dass seine {claim}; sie bedeutet keine Partnerschaft, Empfehlung oder
          Zertifizierung durch diesen Hersteller.
        </p>
      ) : (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Brand names and logos are trademarks of their respective owners. Listing a manufacturer
          states that its {claim}; it does not imply
          partnership, endorsement or certification by that manufacturer.
        </p>
      )}
    </div>
  );
}
