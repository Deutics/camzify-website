import type { Busy } from '@/lib/demo-scheduling';

/**
 * The team's Google Calendar, over Google's REST API with plain fetch (no SDK). Server
 * only: it holds OAuth credentials.
 *
 * Access is an OAuth refresh token for the Google account whose calendar takes the
 * demos, made once with `node scripts/google-calendar-auth.mjs` (docs/DEMO-SCHEDULING.md
 * walks through it). The Google Cloud OAuth app must be published ("In production"):
 * in "Testing" Google expires refresh tokens after seven days and booking stops.
 *
 * Scopes: calendar.freebusy (read busy times, never event details) and calendar.events
 * (create the demo event with a Meet link and invite the visitor).
 */
const env = () => ({
  clientId: process.env.GOOGLE_CLIENT_ID?.trim() ?? '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET?.trim() ?? '',
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN?.trim() ?? '',
  calendarId: process.env.GOOGLE_CALENDAR_ID?.trim() || 'primary',
});

/**
 * A stand-in calendar for trying the scheduler under `npm run dev` without a Google
 * account: GOOGLE_CALENDAR_MOCK=1. It reports one busy hour each weekday at 11:00
 * Singapore time and "creates" events without calling Google. Ignored anywhere else.
 */
const mock = () => process.env.NODE_ENV === 'development' && process.env.GOOGLE_CALENDAR_MOCK === '1';

export function calendarConfigured(): boolean {
  if (mock()) return true;
  const e = env();
  return Boolean(e.clientId && e.clientSecret && e.refreshToken);
}

const API = 'https://www.googleapis.com/calendar/v3';
let cached: { token: string; expires: number } | null = null;

async function accessToken(): Promise<string> {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const e = env();
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: e.clientId, client_secret: e.clientSecret, refresh_token: e.refreshToken, grant_type: 'refresh_token' }),
  });
  const body = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: string; error_description?: string };
  if (!res.ok || !body.access_token) {
    // invalid_grant almost always means the refresh token expired (the OAuth app is still
    // in "Testing") or was revoked; scripts/google-calendar-auth.mjs makes a new one.
    throw new Error(`Google token refresh failed: ${res.status} ${body.error ?? ''} ${body.error_description ?? ''}`.trim());
  }
  cached = { token: body.access_token, expires: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return cached.token;
}

async function call<T>(path: string, init: RequestInit = {}): Promise<{ status: number; body: T }> {
  const token = await accessToken();
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
  const body = (await res.json().catch(() => ({}))) as T;
  return { status: res.status, body };
}

/** Busy periods in the demo calendar between two instants. */
export async function busyTimes(timeMin: Date, timeMax: Date): Promise<Busy[]> {
  if (mock()) {
    const busy: Busy[] = [];
    for (let t = timeMin.getTime(); t < timeMax.getTime(); t += 86_400_000) {
      const day = new Date(t);
      const start = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 3)); // 11:00 SGT
      busy.push({ start, end: new Date(start.getTime() + 3_600_000) });
    }
    return busy;
  }
  const { calendarId } = env();
  const { status, body } = await call<{ calendars?: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }> }>('/freeBusy', {
    method: 'POST',
    body: JSON.stringify({ timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString(), items: [{ id: calendarId }] }),
  });
  const cal = body.calendars ? Object.values(body.calendars)[0] : undefined;
  if (status !== 200 || !cal || cal.errors?.length) throw new Error(`Google freeBusy failed: ${status} ${JSON.stringify(cal?.errors ?? body).slice(0, 300)}`);
  return (cal.busy ?? []).map((b) => ({ start: new Date(b.start), end: new Date(b.end) }));
}

export type CreatedEvent = { id: string; htmlLink: string; meetUrl: string };

/**
 * Creates the demo event with a Google Meet link and the visitor as a guest. Google
 * sends nothing (sendUpdates=none): the visitor's confirmation comes from camzify.com
 * (lib/demo-confirmation.ts). Being a guest is what lets them into the Meet call
 * without asking to join.
 */
export async function createDemoEvent(input: {
  start: Date;
  end: Date;
  summary: string;
  description: string;
  attendee: { email: string; name?: string };
  requestId: string;
  timeZone: string;
}): Promise<CreatedEvent> {
  if (mock()) {
    console.warn('[google-calendar] mock: would create', input.summary, input.start.toISOString(), 'for', input.attendee.email);
    return { id: `mock${input.requestId}`, htmlLink: 'https://calendar.google.com/', meetUrl: 'https://meet.google.com/mock-demo' };
  }
  const { calendarId } = env();
  const { status, body } = await call<{ id?: string; htmlLink?: string; hangoutLink?: string; error?: { message?: string } }>(
    `/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=none`,
    {
      method: 'POST',
      body: JSON.stringify({
        summary: input.summary,
        description: input.description,
        start: { dateTime: input.start.toISOString(), timeZone: input.timeZone },
        end: { dateTime: input.end.toISOString(), timeZone: input.timeZone },
        attendees: [{ email: input.attendee.email, displayName: input.attendee.name }],
        conferenceData: { createRequest: { requestId: input.requestId, conferenceSolutionKey: { type: 'hangoutsMeet' } } },
        guestsCanInviteOthers: true,
        guestsCanSeeOtherGuests: false,
        reminders: { useDefault: true },
      }),
    },
  );
  if (status !== 200 || !body.id) throw new Error(`Google event insert failed: ${status} ${body.error?.message ?? ''}`.trim());
  return { id: body.id, htmlLink: body.htmlLink ?? '', meetUrl: body.hangoutLink ?? '' };
}

/** False when the event was deleted or cancelled in the calendar, so its slot is free again. */
export async function eventStillBooked(eventId: string): Promise<boolean> {
  if (mock()) return true;
  const { calendarId } = env();
  const { status, body } = await call<{ status?: string }>(`/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`);
  if (status === 404 || status === 410) return false;
  if (status !== 200) throw new Error(`Google event lookup failed: ${status}`);
  return body.status !== 'cancelled';
}
