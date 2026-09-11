export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/lead-mail';

/**
 * Lead capture. The submission is emailed to the team through ZeptoMail (lib/lead-mail.ts);
 * until the lead database is connected, that email is the record of the lead, so a failed
 * send fails the request and the visitor is told. When DATABASE_URL is set the row is also
 * written to Postgres, non-fatally: a failed write never loses a lead that was emailed.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, cameras } = data ?? {};

    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and email are required' }, { status: 400 });
    }

    await sendLeadEmail('free-trial', { name, email, company, cameras }, email);

    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        await prisma.freeTrialRequest.create({ data: { name, email, company: company ?? '', cameras: cameras ?? '' } });
      } catch (dbError: any) {
        console.error('Free trial error (database, non-fatal):', dbError?.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Free trial request submitted successfully' });
  } catch (error: any) {
    console.error('Free trial error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to submit request' }, { status: 500 });
  }
}
