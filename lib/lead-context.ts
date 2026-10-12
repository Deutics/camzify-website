import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/core';
// Metadata passed explicitly (the `core` API): the bundled entry points rely on resolver
// conditions that not every runtime honours, and failed with "reading 'hasOwnProperty'".
import metadata from 'libphonenumber-js/metadata.min.json';

/**
 * Server-side context for a lead, so the team knows where a person is and when to call
 * them back. Used by the demo, quote and contact endpoints; the result is added to the
 * team's lead email only (never to the visitor's acknowledgement).
 *
 * Sources, in order of trust:
 * - The browser's time zone (Intl, sent by FormWrapper): what the visitor's own clock is
 *   set to. The most reliable signal for "when to call".
 * - Vercel's geolocation headers (x-vercel-ip-*): country, region and city from the
 *   connection. Free and automatic on Vercel, but a VPN or a company network can place
 *   someone elsewhere, so it is labelled approximate. Absent in local builds.
 * - The page the form was sent from and the referring page, sent by FormWrapper.
 * The IP address itself is not recorded. The privacy policy says all of this.
 */

const MAX = { page: 200, referrer: 300, language: 35, phone: 30 };

function header(request: Request, name: string): string | undefined {
  const v = request.headers.get(name);
  if (!v) return undefined;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

function validTimeZone(tz: unknown): string | undefined {
  if (typeof tz !== 'string' || tz.length > 60) return undefined;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return tz;
  } catch {
    return undefined;
  }
}

function countryName(code: string | undefined): string | undefined {
  if (!code || !/^[A-Z]{2}$/.test(code)) return undefined;
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
}

function clean(v: unknown, max: number): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  return s ? s.slice(0, max) : undefined;
}

/** The visitor's phone number in international format, or the raw entry marked unverified. */
export function formatPhone(country: unknown, number: unknown): string | undefined {
  const raw = clean(number, MAX.phone);
  if (!raw) return undefined;
  const region = typeof country === 'string' && /^[A-Z]{2}$/.test(country) ? (country as CountryCode) : undefined;
  const parsed = parsePhoneNumberFromString(raw, { defaultCountry: region }, metadata);
  if (parsed?.isValid()) return parsed.formatInternational();
  return `${raw}${region ? ` (country ${region})` : ''} (could not be verified as a valid number)`;
}

/** Labelled lines for the team's lead email: location, time zone, local time, page. */
export function leadContext(request: Request, data: Record<string, unknown>): Record<string, string | undefined> {
  const ipCountry = header(request, 'x-vercel-ip-country');
  const ipRegion = header(request, 'x-vercel-ip-country-region');
  const ipCity = header(request, 'x-vercel-ip-city');
  const ipTimeZone = validTimeZone(header(request, 'x-vercel-ip-timezone'));
  const browserTimeZone = validTimeZone(data.timeZone);
  const timeZone = browserTimeZone ?? ipTimeZone;

  const place = [ipCity, ipRegion && ipRegion !== ipCity ? ipRegion : undefined, countryName(ipCountry)].filter(Boolean).join(', ');

  let localTime: string | undefined;
  if (timeZone) {
    // A server-side request handler, not render: the clock is meant to be read here.
    localTime = new Date().toLocaleString('en-US', { timeZone, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
  }

  const zoneNote = browserTimeZone
    ? ipTimeZone && ipTimeZone !== browserTimeZone
      ? `${browserTimeZone} (from their browser; their connection suggests ${ipTimeZone})`
      : `${browserTimeZone} (from their browser)`
    : ipTimeZone
      ? `${ipTimeZone} (from their connection)`
      : undefined;

  const page = clean(data.page, MAX.page);
  const referrer = clean(data.referrer, MAX.referrer);

  return {
    'Location (approximate, from their connection)': place || undefined,
    'Time zone': zoneNote,
    'Their local time when they sent it': localTime,
    'Browser language': clean(data.language, MAX.language),
    'Sent from page': page && page.startsWith('/') ? page : undefined,
    'Came to that page from': referrer,
  };
}
