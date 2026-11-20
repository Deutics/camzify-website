import { createHmac, timingSafeEqual } from 'node:crypto';
import { calendarConfigured } from '@/lib/google-calendar';
import { databaseUrl } from '@/lib/database-url';
import { siteConfig } from '@/lib/site-config';

/**
 * Self-scheduling for demo requests: after the demo form, the visitor picks a slot from
 * the team's Google Calendar on camzify.com (components/content/demo-scheduler.tsx, the
 * /api/demo-slots and /api/demo-booking endpoints). Server only.
 *
 * It is on when the calendar is connected (GOOGLE_* variables), a signing secret is set
 * (BOOKING_TOKEN_SECRET) and the lead database is connected, since a booking belongs to
 * a stored demo request. When any is missing, everything reads as before: the team
 * schedules by email.
 *
 * The booking token. The demo endpoint answers a stored request with a token that lets
 * that request, and only it, book one slot. It is the request's row id, an expiry and an
 * HMAC signature: no name or email, so it is safe in a link. The confirmation email
 * carries it in the URL fragment (/book-a-demo/schedule#<token>), which browsers never
 * send to a server.
 */
export function schedulingEnabled(): boolean {
  return calendarConfigured() && Boolean(secret()) && Boolean(databaseUrl);
}

const secret = () => process.env.BOOKING_TOKEN_SECRET?.trim() ?? '';
const TTL_DAYS = 21;

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function signBookingToken(demoRequestId: string): string {
  const exp = Math.floor(Date.now() / 1000) + TTL_DAYS * 86_400;
  const payload = `${demoRequestId}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

/** The demo request id the token was issued for, or null if it is forged or expired. */
export function verifyBookingToken(token: unknown): string | null {
  if (typeof token !== 'string' || token.length > 200 || !secret()) return null;
  const [id, exp, sig] = token.split('.');
  if (!id || !exp || !sig || !/^[a-z0-9]+$/i.test(id) || !/^\d+$/.test(exp)) return null;
  const expected = Buffer.from(sign(`${id}.${exp}`));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  if (Number(exp) * 1000 < Date.now()) return null;
  return id;
}

/** The page a visitor can come back to from their confirmation email. */
export function scheduleUrl(token: string): string {
  return `${siteConfig.url}/book-a-demo/schedule#${token}`;
}
