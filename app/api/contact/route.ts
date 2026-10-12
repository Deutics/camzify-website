export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/lead-mail';
import { sendAcknowledgement } from '@/lib/lead-mail';
import { formatPhone, leadContext } from '@/lib/lead-context';
import { isBot, rateLimited } from '@/lib/lead-guard';
import { siteConfig } from '@/lib/site-config';

/**
 * Lead capture. The submission is emailed to the team through ZeptoMail (lib/lead-mail.ts);
 * until the lead database is connected, that email is the record of the lead, so a failed
 * send fails the request and the visitor is told. When DATABASE_URL is set the row is also
 * written to Postgres, non-fatally: a failed write never loses a lead that was emailed.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data ?? {};
    if (isBot(data ?? {})) return NextResponse.json({ success: true });
    if (rateLimited(request)) {
      return NextResponse.json({ success: false, message: `Too many requests from this connection. Please try again in a few minutes, or email ${siteConfig.email}.` }, { status: 429 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Name, Email and message are required' }, { status: 400 });
    }

    const phone = formatPhone(data.phoneCountry, data.phone);
    await sendLeadEmail('contact', { name, email, phone, subject, message, ...leadContext(request, data) }, email);

    // The visitor's copy. Never fails the request: the lead above is already safe.
    try {
      await sendAcknowledgement('contact', email, { name });
    } catch (ackError: any) {
      console.error('Acknowledgement email failed (non-fatal):', ackError?.message);
    }

    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        await prisma.contactSubmission.create({ data: { name, email, subject: subject ?? '', message } });
      } catch (dbError: any) {
        console.error('Contact error (database, non-fatal):', dbError?.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Contact error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
  }
}
