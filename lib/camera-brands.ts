/**
 * IP camera manufacturers whose ONVIF-conformant models work with Camzify.
 *
 * Compatibility here is a property of the protocol, not of the brand: any camera that
 * speaks ONVIF Profile S or exposes an RTSP stream works, regardless of who made it.
 * This list exists because buyers search by brand name, not by protocol — it is a
 * recognition aid, not an exhaustive compatibility matrix, and the pages say so.
 *
 * TRADEMARKS: every name below belongs to its owner. Listing a manufacturer states an
 * interoperability fact; it does not assert partnership, endorsement or certification
 * by that manufacturer. Before adding actual logo artwork, check each brand's trademark
 * usage policy — several require written permission for third-party marketing use, and
 * a few prohibit it outright. `logo` stays null until a file has been cleared; the
 * component falls back to a typographic wordmark, which carries none of that risk.
 */
export interface CameraBrand {
  name: string;
  /** Path under /public once artwork is cleared for use, e.g. '/brands/axis.svg'. */
  logo: string | null;
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
