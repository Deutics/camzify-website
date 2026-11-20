import { siteConfig, formattedAddress } from '@/lib/site-config';
import { DEMO_SCHEDULE } from '@/lib/demo-scheduling';

/**
 * The visitor's confirmation of a booked demo, sent from camzify.com through ZeptoMail.
 *
 * The calendar event is created with the visitor as a guest but with Google's own emails
 * switched off (lib/google-calendar.ts, sendUpdates=none). Being a guest is what lets them
 * into the Meet call without asking to join; switching Google's email off means this is
 * the only message they get, from the Camzify address, never from the Gmail account that
 * owns the calendar. A calendar file (.ics) is attached so the call lands in any calendar
 * app in one click, with a Google Calendar link for people who prefer that.
 *
 * Inline styles and the palette match the acknowledgement email (lib/lead-mail.ts).
 */
export type BookingDetails = {
  bookingId: string;
  name: string;
  email: string;
  start: Date;
  end: Date;
  meetUrl: string;
  /** The visitor's browser time zone from the demo form, or '' if unknown. */
  timeZone: string;
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

function validZone(tz: string): string | null {
  if (!tz) return null;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return tz;
  } catch {
    return null;
  }
}

function when(date: Date, timeZone: string, withDay = true): string {
  return date.toLocaleString('en-US', {
    timeZone,
    ...(withDay ? { weekday: 'long', month: 'long', day: 'numeric' } : {}),
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

/** 20261124T050000Z */
const icsTime = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** RFC 5545 text escaping and 75-octet line folding. */
function icsText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (Buffer.byteLength(rest) > 75) {
    let cut = 75;
    while (Buffer.byteLength(rest.slice(0, cut)) > 75) cut--;
    out.push(rest.slice(0, cut));
    rest = ' ' + rest.slice(cut);
  }
  out.push(rest);
  return out.join('\r\n');
}

const SUMMARY = `${siteConfig.name} demo (${DEMO_SCHEDULE.minutes} minutes)`;

function description(meetUrl: string): string {
  return [
    `A ${DEMO_SCHEDULE.minutes}-minute live demo of ${siteConfig.name}: a patrol round run across real cameras, and a quote for your sites.`,
    meetUrl ? `Join with Google Meet: ${meetUrl}` : '',
    `To move or cancel, reply to the confirmation email or write to ${siteConfig.email}.`,
  ].filter(Boolean).join('\n\n');
}

/** A calendar file any calendar app can add. METHOD:PUBLISH: an event to save, not an invitation to answer. */
export function bookingIcs(b: BookingDetails): string {
  const domain = siteConfig.url.replace(/^https?:\/\//, '');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${siteConfig.name}//Demo booking//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${b.bookingId}@${domain}`,
    `DTSTAMP:${icsTime(new Date())}`,
    `DTSTART:${icsTime(b.start)}`,
    `DTEND:${icsTime(b.end)}`,
    `SUMMARY:${icsText(SUMMARY)}`,
    `DESCRIPTION:${icsText(description(b.meetUrl))}`,
    ...(b.meetUrl ? [`LOCATION:${icsText(b.meetUrl)}`, `URL:${b.meetUrl}`] : []),
    `ORGANIZER;CN=${icsText(siteConfig.name)}:mailto:${siteConfig.email}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsText(SUMMARY)}`,
    'TRIGGER:-PT15M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].map(fold).join('\r\n') + '\r\n';
}

export function googleCalendarLink(b: BookingDetails): string {
  const u = new URL('https://calendar.google.com/calendar/render');
  u.search = new URLSearchParams({
    action: 'TEMPLATE',
    text: SUMMARY,
    dates: `${icsTime(b.start)}/${icsTime(b.end)}`,
    details: description(b.meetUrl),
    ...(b.meetUrl ? { location: b.meetUrl } : {}),
  }).toString();
  return u.toString();
}

export function renderBookingConfirmation(b: BookingDetails): { subject: string; html: string; text: string } {
  const site = siteConfig.url;
  const domain = site.replace(/^https?:\/\//, '');
  const zone = validZone(b.timeZone);
  const theirs = when(b.start, zone ?? DEMO_SCHEDULE.timeZone);
  const singapore = zone && zone !== DEMO_SCHEDULE.timeZone ? `${when(b.start, DEMO_SCHEDULE.timeZone, false)} in Singapore` : '';
  const first = b.name.trim().split(/\s+/)[0]?.slice(0, 40);
  const heading = first ? `You're booked, ${first}.` : "You're booked.";
  const gcal = googleCalendarLink(b);
  const subject = `Your ${siteConfig.name} demo: ${theirs}`;

  const RED = '#A70101';
  const INK = '#131921';
  const MUTED = '#5B6472';
  const LINE = '#E6E9EE';
  const SOFT = '#F6F7F9';
  const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  const html =
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"><title>${esc(subject)}</title></head>` +
    `<body style="margin:0;padding:0;background:#EEF1F4;-webkit-text-size-adjust:100%">` +
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(`${theirs}. Join with Google Meet.`)}</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF1F4"><tr><td align="center" style="padding:32px 12px">` +
    `<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${LINE}">` +
    `<tr><td style="height:4px;background:${RED};font-size:0;line-height:0">&nbsp;</td></tr>` +
    `<tr><td style="padding:28px 32px 8px 32px"><a href="${esc(site)}" style="text-decoration:none"><img src="${esc(site + siteConfig.logo)}" width="150" height="31" alt="${esc(siteConfig.name)}" style="display:block;border:0;width:150px;height:auto"></a></td></tr>` +
    `<tr><td style="padding:24px 32px 0 32px"><div style="font:600 12px/1.4 ${FONT};letter-spacing:1px;text-transform:uppercase;color:${RED}">Demo booked</div>` +
    `<h1 style="margin:10px 0 0;font:700 26px/1.25 ${FONT};color:${INK}">${esc(heading)}</h1></td></tr>` +
    `<tr><td style="padding:20px 32px 8px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SOFT};border:1px solid ${LINE};border-radius:10px"><tr><td style="padding:18px 20px">` +
    `<div style="font:700 17px/1.4 ${FONT};color:${INK}">${esc(theirs)}</div>` +
    (singapore ? `<div style="margin-top:4px;font:14px/1.5 ${FONT};color:${MUTED}">${esc(singapore)}</div>` : '') +
    `<div style="margin-top:8px;font:14px/1.5 ${FONT};color:${MUTED}">${DEMO_SCHEDULE.minutes}-minute video call on Google Meet</div>` +
    `</td></tr></table></td></tr>` +
    (b.meetUrl
      ? `<tr><td style="padding:18px 32px 6px 32px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:8px;background:${RED}">` +
        `<a href="${esc(b.meetUrl)}" style="display:inline-block;padding:13px 24px;font:600 15px/1.2 ${FONT};color:#ffffff;text-decoration:none;border-radius:8px">Join with Google Meet &rarr;</a></td></tr></table>` +
        `<p style="margin:10px 0 0;font:13px/1.5 ${FONT};color:${MUTED}">${esc(b.meetUrl)}</p></td></tr>`
      : '') +
    `<tr><td style="padding:14px 32px 24px 32px"><p style="margin:0;font:15px/1.6 ${FONT};color:${INK}">Add it to your calendar: open the attached <strong>camzify-demo.ics</strong>, or <a href="${esc(gcal)}" style="color:${RED};text-decoration:none">add it to Google Calendar</a>.</p>` +
    `<p style="margin:14px 0 0;font:15px/1.6 ${FONT};color:${INK}">We'll run a patrol round across real cameras and bring a quote for your sites. To move or cancel, just reply to this email.</p>` +
    `<p style="margin:18px 0 0;font:15px/1.6 ${FONT};color:${INK}">The ${esc(siteConfig.name)} team</p></td></tr>` +
    `<tr><td style="background:${SOFT};border-top:1px solid ${LINE};padding:22px 32px">` +
    `<p style="margin:0;font:13px/1.6 ${FONT};color:${MUTED}"><strong style="color:${INK}">${esc(siteConfig.legalName)}</strong><br>${esc(formattedAddress)}<br>` +
    `<a href="mailto:${esc(siteConfig.email)}" style="color:${MUTED}">${esc(siteConfig.email)}</a> &nbsp;&middot;&nbsp; <a href="${esc(site)}" style="color:${MUTED}">${esc(domain)}</a></p>` +
    `<p style="margin:12px 0 0;font:12px/1.6 ${FONT};color:#8A93A0">You received this email because a demo was booked with this address at ${esc(domain)}. If that was not you, reply and we will cancel it.</p></td></tr>` +
    `</table></td></tr></table></body></html>`;

  const text = [
    heading,
    '',
    theirs,
    ...(singapore ? [singapore] : []),
    `${DEMO_SCHEDULE.minutes}-minute video call on Google Meet`,
    '',
    ...(b.meetUrl ? [`Join with Google Meet: ${b.meetUrl}`, ''] : []),
    `Add it to your calendar: open the attached camzify-demo.ics, or ${gcal}`,
    '',
    "We'll run a patrol round across real cameras and bring a quote for your sites. To move or cancel, just reply to this email.",
    '',
    `The ${siteConfig.name} team`,
    `${siteConfig.legalName}, ${formattedAddress}`,
    `${siteConfig.email} | ${domain}`,
  ].join('\n');

  return { subject, html, text };
}

export async function sendBookingConfirmation(b: BookingDetails): Promise<void> {
  const token = (process.env.ZEPTOMAIL_TOKEN || '').trim().replace(/^Zoho-enczapikey\s+/i, '');
  const from = (process.env.ZEPTOMAIL_FROM_ADDRESS || '').trim();
  const { subject, html, text } = renderBookingConfirmation(b);
  if (!token || !from) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[demo-confirmation] ZeptoMail is not configured; not sent (development only). To ${b.email}: ${subject}`);
      return;
    }
    throw new Error('ZeptoMail is not configured: set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_ADDRESS');
  }
  const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';
  const res = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Zoho-enczapikey ${token}` },
    body: JSON.stringify({
      from: { address: from, name: siteConfig.name },
      to: [{ email_address: { address: b.email, name: b.name || b.email } }],
      reply_to: [{ address: siteConfig.email, name: siteConfig.name }],
      subject,
      textbody: text,
      htmlbody: html,
      attachments: [{ name: 'camzify-demo.ics', mime_type: 'text/calendar', content: Buffer.from(bookingIcs(b)).toString('base64') }],
    }),
  });
  if (!res.ok) {
    const detail = (await res.text().catch(() => '')).slice(0, 300);
    throw new Error(`ZeptoMail booking confirmation responded ${res.status} ${res.statusText}${detail ? `: ${detail}` : ''}`);
  }
}
