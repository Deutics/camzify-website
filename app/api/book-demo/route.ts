export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/lead-mail';
import { sendAcknowledgement } from '@/lib/lead-mail';
import { formatPhone, leadContext } from '@/lib/lead-context';
import { isBot, rateLimited } from '@/lib/lead-guard';
import { siteConfig } from '@/lib/site-config';
import { describeEstimate } from '@/lib/pricing-estimates';

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
    await sendLeadEmail('book-demo', { name, email, phone, company, cameras, configuration, estimate, ...leadContext(request, data) }, email);

    // The visitor's copy. Never fails the request: the lead above is already safe.
    try {
      await sendAcknowledgement('book-demo', email, { name, company, cameras });
    } catch (ackError: any) {
      console.error('Acknowledgement email failed (non-fatal):', ackError?.message);
    }

    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        await prisma.demoRequest.create({ data: { name, email, company: company ?? '', cameras: cameras ?? '' } });
      } catch (dbError: any) {
        console.error('Demo request error (database, non-fatal):', dbError?.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Demo request submitted successfully' });
  } catch (error: any) {
    console.error('Demo request error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to submit request' }, { status: 500 });
  }
}
