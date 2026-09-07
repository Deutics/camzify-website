/**
 * IP camera manufacturers whose ONVIF-conformant models work with Camzify.
 *
 * Compatibility here is a property of the protocol, not of the brand: any camera that
 * speaks ONVIF Profile S or exposes an RTSP stream works, regardless of who made it.
 * This list exists because buyers search by brand name, not by protocol — it is a
 * recognition aid, not an exhaustive compatibility matrix, and the pages say so.
 *
 * TRADEMARKS: every name and mark below belongs to its owner. Listing a manufacturer
 * states an interoperability fact; it does not assert partnership, endorsement or
 * certification. Both placements carry that disclaimer in visible text.
 *
 * ADDING ARTWORK
 *   1. Put the file in public/brands/ named <slug>.svg (SVG strongly preferred — a
 *      raster mark fringes badly at this size on hidpi).
 *   2. Set `logo` to '/brands/<slug>.svg'.
 *   3. Nothing else. Marks render on a white plate in both themes, so a dark-on-
 *      transparent logo needs no variant and no inversion — see brand-strip.tsx for
 *      why recoloring a trademark is not on the table.
 *   4. Brands with no artwork keep rendering as wordmarks, so a partial set is fine.
 *
 * ARTWORK PROVENANCE
 *   The eight marks below were retrieved from Wikimedia Commons through the Wikipedia
 *   API on 2026-09-03 and visually verified against each vendor's current branding
 *   before being committed. Commons hosts company logos under trademark notices; the
 *   use here is nominative — identifying whose cameras interoperate — and both
 *   placements carry a visible disclaimer saying exactly that.
 *
 *   The remaining brands have no logo file on Wikipedia and keep their wordmark. They
 *   were deliberately not scraped from vendor websites: those pages serve logos through
 *   JavaScript and sprite sheets, and what comes back is inconsistent, frequently
 *   outdated, and of unclear provenance. Several of these companies have rebranded
 *   (Hanwha Vision was Hanwha Techwin, and Wisenet before that), so a stale mark is a
 *   live risk. A clean wordmark beats a wrong logo.
 *
 * @see components/content/brand-strip.tsx for how a mark is rendered.
 */
export interface CameraBrand {
  name: string;
  /** Path under /public once artwork is in place, e.g. '/brands/axis.svg'. */
  logo: string | null;
  /** Light-theme-hostile marks: supply a variant for the dark theme. */
  logoDark?: string | null;
  /** True only for genuinely single-colour marks that survive being inverted. */
  monochrome?: boolean;
  /** Why this brand is commonly seen — kept factual, no performance claims. */
  note: string;
}

export const cameraBrands: CameraBrand[] = [
  { name: 'Axis', logo: '/brands/axis.svg', note: 'ONVIF Profile S across current IP ranges' },
  { name: 'Hikvision', logo: '/brands/hikvision.svg', note: 'ONVIF and RTSP on standard IP models' },
  { name: 'Dahua', logo: '/brands/dahua.svg', note: 'ONVIF and RTSP on standard IP models' },
  { name: 'Hanwha Vision', logo: '/brands/hanwha-vision.svg', note: 'Formerly Wisenet; ONVIF conformant' },
  { name: 'Bosch', logo: null, note: 'ONVIF Profile S and T on IP ranges' },
  { name: 'Uniview', logo: '/brands/uniview.png', note: 'ONVIF and RTSP on standard IP models' },
  { name: 'Vivotek', logo: null, note: 'ONVIF conformant IP cameras' },
  { name: 'Honeywell', logo: '/brands/honeywell.svg', note: 'ONVIF on commercial IP ranges' },
  { name: 'Pelco', logo: null, note: 'ONVIF Profile S on Sarix and later' },
  { name: 'Reolink', logo: null, note: 'RTSP on most models; ONVIF on many' },
  { name: 'TP-Link VIGI', logo: '/brands/tp-link-vigi.svg', note: 'ONVIF and RTSP on the VIGI range' },
  { name: 'Ubiquiti', logo: '/brands/ubiquiti.svg', note: 'RTSP on UniFi Protect cameras' },
  { name: 'Amcrest', logo: null, note: 'ONVIF and RTSP on IP models' },
  { name: 'Lorex', logo: null, note: 'RTSP on IP models' },
  { name: 'Milesight', logo: null, note: 'ONVIF conformant IP cameras' },
  { name: 'Tiandy', logo: null, note: 'ONVIF and RTSP on IP models' },
];
