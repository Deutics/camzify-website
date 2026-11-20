export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { schedulingEnabled, verifyBookingToken } from '@/lib/demo-booking';
import { DEMO_SCHEDULE, openSlots, slotEnd } from '@/lib/demo-scheduling';
import { busyTimes, createDemoEvent, eventStillBooked } from '@/lib/google-calendar';
import { rateLimited } from '@/lib/lead-guard';
import { sendLeadEmail } from '@/lib/lead-mail';
import { sendBookingConfirmation } from '@/lib/demo-confirmation';
import { siteConfig } from '@/lib/site-config';

/**
 * Books one demo slot for one demo request (lib/demo-booking.ts).
 *
 * 1. The token names the request; a request books once.
 * 2. The slot is checked against the calendar again, since the list the visitor saw may
 *    be minutes old.
 * 3. A DemoBooking row claims the slot (its `start` is unique), so two visitors choosing
 *    the same time at the same moment cannot both get it. A row whose calendar event has
 *    since been cancelled or deleted no longer holds the slot and is replaced.
 * 4. The Google Calendar event is created with a Meet link and the visitor as a guest,
 *    with Google's own emails off. If that fails the claim is released.
 * 5. The visitor gets the confirmation from camzify.com with the Meet link and a
 *    calendar file (lib/demo-confirmation.ts); the team gets a "Demo booked" email.
 *    Neither ever fails the booking: the booked screen shows the Meet link as well.
 */
const taken = (message: string) => NextResponse.json({ success: false, taken: true, message }, { status: 409 });

function when(date: Date, timeZone: string): string {
  return date.toLocaleString('en-US', { timeZone, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
}

export async function POST(request: Request) {
  try {
    if (!schedulingEnabled()) return NextResponse.json({ success: false, message: 'Scheduling is not available' }, { status: 404 });
    if (rateLimited(request, 'booking', 60)) return NextResponse.json({ success: false, message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });

    const data = await request.json().catch(() => ({}));
    const id = verifyBookingToken(data?.token);
    if (!id) return NextResponse.json({ success: false, message: 'This booking link is not valid or has expired.' }, { status: 403 });
    const start = new Date(typeof data?.start === 'string' ? data.start : NaN);
    if (Number.isNaN(start.getTime())) return NextResponse.json({ success: false, message: 'Pick a time first.' }, { status: 400 });

    const { prisma } = await import('@/lib/prisma');
    const lead = await prisma.demoRequest.findUnique({ where: { id }, include: { booking: true } });
    if (!lead) return NextResponse.json({ success: false, message: 'This booking link is not valid or has expired.' }, { status: 403 });
    if (lead.booking) {
      const b = lead.booking;
      return NextResponse.json({ success: true, booked: { start: b.start.toISOString(), end: b.end.toISOString(), meetUrl: b.meetUrl } });
    }

    // A request handler, not render: reading the clock here is the point.
    const now = new Date();
    const until = new Date(now.getTime() + (DEMO_SCHEDULE.horizonDays + 1) * 86_400_000);
    const open = openSlots(now, await busyTimes(now, until));
    if (!open.some((s) => s.getTime() === start.getTime())) return taken('That time has just been taken. Please pick another.');
    const end = slotEnd(start);

    // Claim the slot.
    const claim = () => prisma.demoBooking.create({ data: { demoRequestId: lead.id, start, end } });
    let booking;
    try {
      booking = await claim();
    } catch (e: any) {
      if (e?.code !== 'P2002') throw e;
      const stale = await prisma.demoBooking.findUnique({ where: { start } });
      if (!stale || stale.demoRequestId === lead.id || (stale.eventId && (await eventStillBooked(stale.eventId)))) {
        return taken('That time has just been taken. Please pick another.');
      }
      await prisma.demoBooking.delete({ where: { id: stale.id } });
      booking = await claim();
    }

    let event;
    try {
      event = await createDemoEvent({
        start,
        end,
        timeZone: DEMO_SCHEDULE.timeZone,
        requestId: booking.id,
        summary: `${siteConfig.name} demo: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
        description: [
          `A ${DEMO_SCHEDULE.minutes}-minute live demo of ${siteConfig.name}: a patrol round run across real cameras, and a quote for your sites.`,
          '',
          `Join with the Google Meet link on this event. To move or cancel, reply to the confirmation email or write to ${siteConfig.email}.`,
          '',
          siteConfig.url,
        ].join('\n'),
        attendee: { email: lead.email, name: lead.name },
      });
    } catch (e) {
      await prisma.demoBooking.delete({ where: { id: booking.id } }).catch(() => {});
      throw e;
    }
    await prisma.demoBooking.update({ where: { id: booking.id }, data: { eventId: event.id, meetUrl: event.meetUrl } });

    try {
      await sendBookingConfirmation({ bookingId: booking.id, name: lead.name, email: lead.email, start, end, meetUrl: event.meetUrl, timeZone: lead.timeZone });
    } catch (mailError: any) {
      console.error('Booking confirmation email failed (non-fatal):', mailError?.message);
    }

    try {
      await sendLeadEmail('demo-booked', {
        name: lead.name,
        email: lead.email,
        company: lead.company || undefined,
        phone: lead.phone || undefined,
        cameras: lead.cameras || undefined,
        'Time (Singapore)': when(start, DEMO_SCHEDULE.timeZone),
        'Their time': lead.timeZone ? when(start, lead.timeZone) : undefined,
        'Google Meet': event.meetUrl || undefined,
        'Calendar event': event.htmlLink || undefined,
      }, lead.email);
    } catch (mailError: any) {
      console.error('Demo booked email failed (non-fatal):', mailError?.message);
    }

    return NextResponse.json({ success: true, booked: { start: start.toISOString(), end: end.toISOString(), meetUrl: event.meetUrl } });
  } catch (error: any) {
    console.error('Demo booking error:', error?.message);
    return NextResponse.json({ success: false, message: 'Could not book that time' }, { status: 500 });
  }
}
