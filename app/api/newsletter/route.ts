export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/lead-mail';

/**
 * Newsletter subscription. Emailed to the team through ZeptoMail (lib/lead-mail.ts) so a
 * subscriber is never lost; when DATABASE_URL is set the address is also upserted into
 * the subscription table, non-fatally.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email } = data ?? {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'A valid email is required' }, { status: 400 });
    }

    await sendLeadEmail('newsletter', { email }, email);

    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        await prisma.newsletterSubscription.upsert({ where: { email }, update: {}, create: { email } });
      } catch (dbError: any) {
        console.error('Newsletter error (database, non-fatal):', dbError?.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    console.error('Newsletter error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to subscribe' }, { status: 500 });
  }
}
