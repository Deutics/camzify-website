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
 *   The first eight marks were retrieved from Wikimedia Commons through the Wikipedia
 *   API on 2026-09-03 and visually verified against each vendor's current branding
 *   before being committed. Commons hosts company logos under trademark notices; the
 *   use here is nominative — identifying whose cameras interoperate — and both
 *   placements carry a visible disclaimer saying exactly that.
 *
 *   A further eight marks (Bosch, Vivotek, Pelco, i-PRO, Reolink, Lorex, AVer, Marshall
 *   Electronics) were added 2026-09-24, same standard: Commons first (Bosch, Vivotek,
 *   Pelco, i-PRO, Reolink, Lorex), each fetched via the Wikipedia API and visually
 *   checked against current branding; AVer and Marshall Electronics had no current
 *   Commons file, so their marks came from each company's own official brand-assets
 *   page instead (aver.com's logo guidelines page; marshall-usa.com's logos.php), not
 *   scraped from a marketing homepage. Panasonic's security-camera business was spun
 *   off in 2019 into an independent company, i-PRO Co., Ltd. — that is the current
 *   brand, so the entry is named and marked as i-PRO, not Panasonic.
 *
 *   The business's own image delivery of 2026-09-25 supplied transparent marks for
 *   Milesight and Tiandy (both previously wordmarks) and a transparent Reolink mark that
 *   replaced the earlier flattened JPEG. Its Amcrest file is the hexagon icon alone,
 *   without the wordmark; at strip size an unlabelled icon would not identify the brand,
 *   so Amcrest stays a wordmark until a full lockup is supplied.
 *
 *   The remaining brands have no logo of confirmed current provenance and keep their
 *   wordmark. They were deliberately not scraped from vendor marketing pages or
 *   third-party logo-aggregator sites: those sources are inconsistent, frequently
 *   outdated, and of unclear provenance. Several companies in this industry have
 *   rebranded (Hanwha Vision was Hanwha Techwin, and Wisenet before that; Panasonic's
 *   camera business is now i-PRO), so a stale mark is a live risk. A clean wordmark
 *   beats a wrong logo.
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
  { name: 'Bosch', logo: '/brands/bosch.svg', note: 'ONVIF Profile S and T on IP ranges' },
  { name: 'Uniview', logo: '/brands/uniview.png', note: 'ONVIF and RTSP on standard IP models' },
  { name: 'Vivotek', logo: '/brands/vivotek.png', note: 'ONVIF conformant IP cameras' },
  { name: 'Honeywell', logo: '/brands/honeywell.svg', note: 'ONVIF on commercial IP ranges' },
  { name: 'Pelco', logo: '/brands/pelco.svg', note: 'ONVIF Profile S on Sarix and later' },
  { name: 'Reolink', logo: '/brands/reolink.png', note: 'RTSP on most models; ONVIF on many' },
  { name: 'TP-Link VIGI', logo: '/brands/tp-link-vigi.svg', note: 'ONVIF and RTSP on the VIGI range' },
  { name: 'Ubiquiti', logo: '/brands/ubiquiti.svg', note: 'RTSP on UniFi Protect cameras' },
  { name: 'Amcrest', logo: null, note: 'ONVIF and RTSP on IP models' },
  { name: 'Lorex', logo: '/brands/lorex.png', note: 'RTSP on IP models' },
  { name: 'Milesight', logo: '/brands/milesight.png', note: 'ONVIF conformant IP cameras' },
  { name: 'Tiandy', logo: '/brands/tiandy.png', note: 'ONVIF and RTSP on IP models' },
  { name: 'i-PRO', logo: '/brands/i-pro.png', note: 'ONVIF Profile S on i-PRO IP ranges; formerly Panasonic Security' },
];

/**
 * PTZ and streaming cameras that push RTMP directly, no separate encoder needed.
 *
 * A different claim from the ONVIF/RTSP list above, and deliberately a separate array:
 * ordinary IP cameras generally do not push RTMP on their own (see
 * app/camera-connectivity/rtmp-setup, which is explicit that most sources need an
 * encoder to convert an RTSP stream to a push). The brands here are conferencing and
 * live-streaming PTZ cameras built for platforms like YouTube Live and Twitch, where
 * native RTMP output is the point of the product, not an add-on. Same trademark rule
 * as above: listing a manufacturer here states a protocol fact, not a partnership.
 */
export const rtmpStreamingBrands: CameraBrand[] = [
  { name: 'PTZOptics', logo: null, note: 'PTZ cameras built for direct RTMP streaming' },
  { name: 'Marshall Electronics', logo: '/brands/marshall-electronics.png', note: 'PTZ cameras with built-in RTMP output' },
  { name: 'Vaddio', logo: null, note: 'PTZ cameras with native RTMP streaming' },
  { name: 'AVer', logo: '/brands/aver.png', note: 'PTZ conferencing cameras with RTMP on select models' },
  { name: 'BirdDog', logo: null, note: 'NDI-first PTZ cameras with RTMP support' },
];
