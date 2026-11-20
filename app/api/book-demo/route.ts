export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/lead-mail';
import { sendAcknowledgement } from '@/lib/lead-mail';
import { formatPhone, leadContext, leadRecord } from '@/lib/lead-context';
import { databaseUrl } from '@/lib/database-url';
import { isBot, rateLimited } from '@/lib/lead-guard';
import { siteConfig } from '@/lib/site-config';
import { describeEstimate } from '@/lib/pricing-estimates';
import { schedulingEnabled, signBookingToken, scheduleUrl } from '@/lib/demo-booking';

/**
 * Lead capture. The submission is emailed to the team through ZeptoMail (lib/lead-mail.ts);
 * until the lead database is connected, that email is the record of the lead, so a failed
 * send fails the request and the visitor is told. When the lead database is connected the row is also
 * written to Postgres (lib/database-url.ts), non-fatally: a failed write never loses a lead that was emailed.
 *
 * The row is written first because demo self-scheduling (lib/demo-booking.ts) needs its
 * id: with scheduling on, the reply carries a booking token for the slot picker, and the
 * visitor's confirmation email a link back to it. If the write fails there is simply no
 * token, and the team schedules by email as before.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, cameras } = data ?? {};
    if (isBot(data ?? {})) return NextResponse.json({ success: true });
    if (rateLimited(request)) {
      return NextResponse.json({ success: false, message: `Too many requests from this connection. Please try again in a few minutes, or email ${siteConfig.email}.` }, { status: 429 });
    }

    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and email are required' }, { status: 400 });
    }

    // Optional configuration from the form's estimate section; absent unless the visitor opened it.
    const toNum = (v: unknown) => { const n = Number(v); return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0; };
    const hasConfig = data?.estimateCameras !== undefined;
    const config = hasConfig
      ? { cameras: toNum(data.estimateCameras), patrolCameras: toNum(data.patrolCameras), standardInstances: toNum(data.standardInstances), premiumInstances: toNum(data.premiumInstances), storageTb: toNum(data.storageTb) }
      : null;
    const configuration = config ? `${config.cameras} cameras; ${config.patrolCameras} on patrol rounds; ${config.standardInstances} standard detection instances; ${config.premiumInstances} premium detection instances; ${config.storageTb} TB storage` : undefined;
    const estimate = config ? describeEstimate(config) : undefined;

    const phone = formatPhone(data.phoneCountry, data.phone);

    let token: string | undefined;
    if (databaseUrl) {
      try {
        const { prisma } = await import('@/lib/prisma');
        const offer = schedulingEnabled();
        const row = await prisma.demoRequest.create({
          data: {
            name, email, company: company ?? '', cameras: cameras ?? '', phone: phone ?? '',
            configuration: configuration ?? '', estimate: estimate ?? '', bookingOffered: offer,
            ...leadRecord(request, data),
          },
        });
        if (offer) token = signBookingToken(row.id);
      } catch (dbError: any) {
        console.error('Demo request error (database, non-fatal):', dbError?.message);
      }
    }

    // Tells the team the visitor can book a slot themselves, so nobody writes to schedule
    // a call that may already be in the calendar; a "Demo booked" email follows if they do.
    const scheduling = token ? 'Offered the slot picker. If they book, a "Demo booked" email follows and the call is in the calendar.' : undefined;
    await sendLeadEmail('book-demo', { name, email, phone, company, cameras, configuration, estimate, scheduling, ...leadContext(request, data) }, email);

    // The visitor's copy. Never fails the request: the lead above is already safe.
    try {
      await sendAcknowledgement('book-demo', email, { name, company, cameras, bookingUrl: token ? scheduleUrl(token) : undefined });
    } catch (ackError: any) {
      console.error('Acknowledgement email failed (non-fatal):', ackError?.message);
    }

    return NextResponse.json({ success: true, message: 'Demo request submitted successfully', ...(token ? { booking: { token } } : {}) });
  } catch (error: any) {
    console.error('Demo request error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to submit request' }, { status: 500 });
  }
}
