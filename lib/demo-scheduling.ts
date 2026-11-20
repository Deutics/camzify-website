/**
 * When a demo can be booked, and which slots are open. Pure: no I/O, safe on the server
 * and in the browser.
 *
 * The rules were set by the business on 2026-11-20: Monday to Friday, 9am to 6pm
 * Singapore time; 30-minute calls with at least 15 minutes clear on either side; at
 * least 4 hours' notice; up to 14 days ahead. The booking API, the scheduler and the
 * confirmation email read these values. The page copy says "30-minute demo" in its own
 * words (book-a-demo page, lib/ui-strings.ts, lib/cta-by-section.ts, the CCTV blog post):
 * change it there too if the length changes.
 *
 * Slots start on the hour and half hour. A slot is open when nothing in the calendar
 * overlaps it, including the 15-minute gap before and after, so a call already at 10:00
 * blocks 9:30 (its gap runs into 9:45) and 10:30 (the gap runs to 10:45), and 11:00 is
 * the next one free. The calendar is the source of truth: anything the team puts in it,
 * a demo or not, blocks the time.
 */
export const DEMO_SCHEDULE = {
  /** IANA time zone the hours below are in. */
  timeZone: 'Asia/Singapore',
  /** Days of the week, 0 = Sunday. */
  days: [1, 2, 3, 4, 5],
  /** First start and the time by which a call must end, in minutes after midnight. */
  open: 9 * 60,
  close: 18 * 60,
  /** Call length, clear gap either side, and the spacing of start times, in minutes. */
  minutes: 30,
  gap: 15,
  step: 30,
  /** Booking window. */
  noticeHours: 4,
  horizonDays: 14,
} as const;

/** The call length, for copy: "a 30-minute demo". */
export const DEMO_MINUTES = DEMO_SCHEDULE.minutes;

export type Busy = { start: Date; end: Date };

const MINUTE = 60_000;

/** Wall-clock parts of an instant in a time zone. */
function partsIn(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute'), second: get('second') };
}

/** How far the zone's wall clock is ahead of UTC at an instant, in milliseconds. */
function offsetAt(date: Date, timeZone: string): number {
  const p = partsIn(date, timeZone);
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - date.getTime();
}

/** The instant at which the zone's wall clock reads the given date and time. */
export function zonedTime(year: number, month: number, day: number, minutes: number, timeZone: string): Date {
  const guess = Date.UTC(year, month - 1, day, 0, minutes);
  // Twice, so a guess that lands across a daylight-saving change settles.
  const first = guess - offsetAt(new Date(guess), timeZone);
  return new Date(guess - offsetAt(new Date(first), timeZone));
}

/** Every open slot start between `now` + notice and `now` + horizon, earliest first. */
export function openSlots(now: Date, busy: Busy[], rules = DEMO_SCHEDULE): Date[] {
  const earliest = now.getTime() + rules.noticeHours * 60 * MINUTE;
  const latest = now.getTime() + rules.horizonDays * 24 * 60 * MINUTE;
  const today = partsIn(now, rules.timeZone);
  const slots: Date[] = [];

  for (let offset = 0; offset <= rules.horizonDays + 1; offset++) {
    // Date.UTC rolls the day over months and years; only the calendar date is used.
    const day = new Date(Date.UTC(today.year, today.month - 1, today.day + offset));
    if (!(rules.days as readonly number[]).includes(day.getUTCDay())) continue;
    for (let m = rules.open; m + rules.minutes <= rules.close; m += rules.step) {
      const start = zonedTime(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate(), m, rules.timeZone);
      const t = start.getTime();
      if (t < earliest || t > latest) continue;
      const from = t - rules.gap * MINUTE;
      const to = t + (rules.minutes + rules.gap) * MINUTE;
      if (busy.some((b) => b.start.getTime() < to && b.end.getTime() > from)) continue;
      slots.push(start);
    }
  }
  return slots;
}

/** The end of a call that starts at `start`. */
export function slotEnd(start: Date, rules = DEMO_SCHEDULE): Date {
  return new Date(start.getTime() + rules.minutes * MINUTE);
}
