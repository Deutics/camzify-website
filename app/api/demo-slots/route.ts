export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { schedulingEnabled, verifyBookingToken } from '@/lib/demo-booking';
import { DEMO_SCHEDULE, openSlots } from '@/lib/demo-scheduling';
import { busyTimes } from '@/lib/google-calendar';
import { rateLimited } from '@/lib/lead-guard';

/**
 * The open demo slots for one demo request (lib/demo-booking.ts). POST, not GET, so the
 * booking token stays out of URLs and request logs. Answers with the slot starts as ISO
 * instants (the scheduler shows them in the visitor's own time zone), or with the slot
 * already booked if this request has one.
 */
export async function POST(request: Request) {
  try {
    if (!schedulingEnabled()) return NextResponse.json({ success: false, message: 'Scheduling is not available' }, { status: 404 });
    if (rateLimited(request, 'booking', 60)) return NextResponse.json({ success: false, message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });

    const data = await request.json().catch(() => ({}));
    const id = verifyBookingToken(data?.token);
    if (!id) return NextResponse.json({ success: false, message: 'This booking link is not valid or has expired.' }, { status: 403 });

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
    const slots = openSlots(now, await busyTimes(now, until)).map((d) => d.toISOString());
    return NextResponse.json({ success: true, minutes: DEMO_SCHEDULE.minutes, slots });
  } catch (error: any) {
    console.error('Demo slots error:', error?.message);
    return NextResponse.json({ success: false, message: 'Could not load times' }, { status: 500 });
  }
}
