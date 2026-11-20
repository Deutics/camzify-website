'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarCheck, Loader2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

/**
 * The demo slot picker (lib/demo-booking.ts): open times from the team's Google Calendar,
 * shown in the visitor's own time zone, booked with one click. Rendered after the demo
 * form succeeds and on /book-a-demo/schedule from the confirmation email.
 *
 * Everything here happens after mount and from fetched data: the clock, the browser's
 * time zone and every formatted date are read in effects and handlers, never in render
 * from server state, so there is nothing for hydration to disagree about.
 */
type Slot = { iso: string; time: string };
type Day = { key: string; weekday: string; date: string; slots: Slot[] };
type State =
  | { kind: 'loading' }
  | { kind: 'ready'; days: Day[]; minutes: number }
  | { kind: 'empty' }
  | { kind: 'error'; message: string }
  | { kind: 'booked'; label: string; meetUrl: string };

function zoneName(timeZone: string): string {
  try {
    const part = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'long' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName');
    return part?.value ?? timeZone;
  } catch {
    return timeZone;
  }
}

function group(isos: string[], timeZone: string): Day[] {
  const keyFmt = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
  const weekdayFmt = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short' });
  const dateFmt = new Intl.DateTimeFormat('en-US', { timeZone, month: 'short', day: 'numeric' });
  const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' });
  const days = new Map<string, Day>();
  for (const iso of isos) {
    const d = new Date(iso);
    const key = keyFmt.format(d);
    if (!days.has(key)) days.set(key, { key, weekday: weekdayFmt.format(d), date: dateFmt.format(d), slots: [] });
    days.get(key)!.slots.push({ iso, time: timeFmt.format(d) });
  }
  return [...days.values()];
}

function bookedLabel(iso: string, timeZone: string): string {
  return new Date(iso).toLocaleString('en-US', { timeZone, weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
}

/** Only a Google Meet address is ever shown as the join link. */
function meetLink(url: unknown): string {
  return typeof url === 'string' && /^https:\/\/meet\.google\.com\//.test(url) ? url : '';
}

const FALLBACK = 'We will contact you within one business day to schedule it instead.';

export function DemoScheduler({ token }: { token: string }) {
  const [state, setState] = useState<State>({ kind: 'loading' });
  const [zone, setZone] = useState({ id: 'UTC', name: 'UTC' });
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);
  const [notice, setNotice] = useState('');
  const bookedRef = useRef<HTMLDivElement>(null);

  // The picker is taller than the confirmation that replaces it, so bring that into view.
  useEffect(() => {
    if (state.kind === 'booked') bookedRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [state.kind]);

  const load = useCallback(async (timeZone: string) => {
    setState({ kind: 'loading' });
    setSlot(null);
    try {
      const res = await fetch('/api/demo-slots', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
      const body = await res.json().catch(() => ({}));
      if (body?.booked?.start) return setState({ kind: 'booked', label: bookedLabel(body.booked.start, timeZone), meetUrl: meetLink(body.booked.meetUrl) });
      if (!res.ok || !body?.success) return setState({ kind: 'error', message: body?.message ?? 'We could not load the available times.' });
      const days = group(body.slots ?? [], timeZone);
      if (!days.length) return setState({ kind: 'empty' });
      setDay((current) => (current && days.some((d) => d.key === current) ? current : days[0].key));
      setState({ kind: 'ready', days, minutes: body.minutes ?? 30 });
    } catch {
      setState({ kind: 'error', message: 'We could not load the available times.' });
    }
  }, [token]);

  useEffect(() => {
    let id = 'UTC';
    try {
      id = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
      /* fall back to UTC */
    }
    setZone({ id, name: zoneName(id) });
    load(id);
  }, [load]);

  const book = async () => {
    if (!slot) return;
    setBooking(true);
    setNotice('');
    try {
      const res = await fetch('/api/demo-booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, start: slot }) });
      const body = await res.json().catch(() => ({}));
      if (body?.booked?.start) {
        setState({ kind: 'booked', label: bookedLabel(body.booked.start, zone.id), meetUrl: meetLink(body.booked.meetUrl) });
      } else if (body?.taken) {
        setNotice(body.message ?? 'That time has just been taken. Please pick another.');
        await load(zone.id);
      } else {
        setNotice(`${body?.message ?? 'We could not book that time.'} Please try again, or email ${siteConfig.email}.`);
      }
    } catch {
      setNotice(`We could not book that time. Please try again, or email ${siteConfig.email}.`);
    } finally {
      setBooking(false);
    }
  };

  if (state.kind === 'booked') {
    return (
      <div ref={bookedRef} className="w-full scroll-mt-24 rounded-xl border border-live/30 bg-background p-5 text-left" role="status">
        <div className="flex items-start gap-3">
          <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-live" aria-hidden="true" />
          <div>
            <p className="font-semibold">Your demo is booked</p>
            <p className="mt-1 text-sm text-muted-foreground">{state.label}.</p>
            {state.meetUrl && (
              <a
                href={state.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Google Meet link
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            <p className="mt-3 text-sm text-muted-foreground">
              A confirmation with the join link and a calendar file is on its way to your inbox from {siteConfig.name}. To move or cancel, reply to it or email {siteConfig.email}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const current = state.kind === 'ready' ? state.days.find((d) => d.key === day) ?? state.days[0] : null;
  const chosen = current?.slots.find((s) => s.iso === slot);

  return (
    <div className="w-full min-w-0 rounded-xl border border-border bg-background p-4 text-left sm:p-5">
      <p className="font-semibold">Pick a time for your demo</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {state.kind === 'ready' ? `${state.minutes}-minute video call. ` : ''}Times are shown in your time zone ({zone.name}).
      </p>

      <div aria-live="polite" className="sr-only">{state.kind === 'loading' ? 'Loading available times' : ''}</div>

      {state.kind === 'loading' && (
        <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading available times…
        </div>
      )}

      {state.kind === 'error' && <p className="mt-4 text-sm text-muted-foreground">{state.message} {FALLBACK}</p>}
      {state.kind === 'empty' && <p className="mt-4 text-sm text-muted-foreground">There are no open times in the next two weeks. {FALLBACK}</p>}

      {state.kind === 'ready' && current && (
        <>
          <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2" role="group" aria-label="Day">
            {state.days.map((d) => (
              <button
                key={d.key}
                type="button"
                aria-pressed={d.key === current.key}
                onClick={() => {
                  setDay(d.key);
                  setSlot(null);
                }}
                className={`flex shrink-0 flex-col items-center rounded-lg border px-3 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  d.key === current.key ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground hover:border-foreground/30'
                }`}
              >
                <span className="font-medium uppercase tracking-wide">{d.weekday}</span>
                <span className="mt-0.5 whitespace-nowrap">{d.date}</span>
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(5.25rem,1fr))] gap-2" role="group" aria-label={`Times on ${current.weekday} ${current.date}`}>
            {current.slots.map((s) => (
              <button
                key={s.iso}
                type="button"
                aria-pressed={s.iso === slot}
                onClick={() => setSlot(s.iso)}
                className={`whitespace-nowrap rounded-lg border px-2 py-2 text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  s.iso === slot ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-foreground/30'
                }`}
              >
                {s.time}
              </button>
            ))}
          </div>

          {notice && <p className="mt-3 text-sm text-critical" role="alert">{notice}</p>}

          <button
            type="button"
            onClick={book}
            disabled={!slot || booking}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {booking && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {booking ? 'Booking…' : chosen ? `Book ${current.weekday} ${current.date}, ${chosen.time}` : 'Choose a time'}
          </button>
        </>
      )}
    </div>
  );
}
