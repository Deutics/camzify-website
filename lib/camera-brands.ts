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
 *   1. Put the file in public/brands/ named <slug>.svg (SVG strongly preferred — these
 *      render at 28px tall and raster marks fringe badly at that size on hidpi).
 *   2. Set `logo` to '/brands/<slug>.svg'.
 *   3. If the mark is dark-on-transparent it will disappear on the dark theme. Either
 *      supply a light variant as `logoDark`, or set `monochrome: true` to let the
 *      component invert it. Only set `monochrome` on marks that are genuinely one
 *      colour — inverting a coloured logo produces a wrong logo, which is worse than
 *      no logo.
 *   4. Brands with no artwork keep rendering as wordmarks, so a partial set is fine.
 *
 * Source artwork from the manufacturer's own brand or press-kit page, not from a logo
 * aggregator: aggregators carry outdated marks and redrawn approximations, and several
 * of these companies have rebranded (Hanwha Vision was Hanwha Techwin, and Wisenet
 * before that).
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
  { name: 'Axis', logo: null, note: 'ONVIF Profile S across current IP ranges' },
  { name: 'Hikvision', logo: null, note: 'ONVIF and RTSP on standard IP models' },
  { name: 'Dahua', logo: null, note: 'ONVIF and RTSP on standard IP models' },
  { name: 'Hanwha Vision', logo: null, note: 'Formerly Wisenet; ONVIF conformant' },
  { name: 'Bosch', logo: null, note: 'ONVIF Profile S and T on IP ranges' },
  { name: 'Uniview', logo: null, note: 'ONVIF and RTSP on standard IP models' },
  { name: 'Vivotek', logo: null, note: 'ONVIF conformant IP cameras' },
  { name: 'Honeywell', logo: null, note: 'ONVIF on commercial IP ranges' },
  { name: 'Pelco', logo: null, note: 'ONVIF Profile S on Sarix and later' },
  { name: 'Reolink', logo: null, note: 'RTSP on most models; ONVIF on many' },
  { name: 'TP-Link VIGI', logo: null, note: 'ONVIF and RTSP on the VIGI range' },
  { name: 'Ubiquiti', logo: null, note: 'RTSP on UniFi Protect cameras' },
  { name: 'Amcrest', logo: null, note: 'ONVIF and RTSP on IP models' },
  { name: 'Lorex', logo: null, note: 'RTSP on IP models' },
  { name: 'Milesight', logo: null, note: 'ONVIF conformant IP cameras' },
  { name: 'Tiandy', logo: null, note: 'ONVIF and RTSP on IP models' },
];
