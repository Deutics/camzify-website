export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/lead-mail';
import { sendAcknowledgement } from '@/lib/lead-mail';
import { formatPhone, leadContext, leadRecord } from '@/lib/lead-context';
import { databaseUrl } from '@/lib/database-url';
import { isBot, rateLimited } from '@/lib/lead-guard';
import { siteConfig } from '@/lib/site-config';
import { describeEstimate } from '@/lib/pricing-estimates';

/**
 * Quote request from the pricing page estimator. The configuration the visitor built
 * and the estimate they saw travel with the request, so the reply can start from the
 * same numbers. Emailed through ZeptoMail like the other forms; when the lead database
 * is connected (lib/database-url.ts) it is also stored as a QuoteRequest row, non-fatally.
 */
const toNum = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, message } = data ?? {};
    if (isBot(data ?? {})) return NextResponse.json({ success: true });
    if (rateLimited(request)) {
      return NextResponse.json({ success: false, message: `Too many requests from this connection. Please try again in a few minutes, or email ${siteConfig.email}.` }, { status: 429 });
    }
    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and email are required' }, { status: 400 });
    }
    const config = {
      cameras: toNum(data?.cameras),
      patrolCameras: toNum(data?.patrolCameras),
      standardInstances: toNum(data?.standardInstances),
      premiumInstances: toNum(data?.premiumInstances),
      storageTb: toNum(data?.storageTb),
    };
    const configuration = `${config.cameras} cameras; ${config.patrolCameras} on patrol rounds; ${config.standardInstances} standard detection instances; ${config.premiumInstances} premium detection instances; ${config.storageTb} TB storage`;
    const estimate = describeEstimate(config);

    const phone = formatPhone(data.phoneCountry, data.phone);
    await sendLeadEmail('quote', { name, email, phone, company, configuration, estimate, message, ...leadContext(request, data) }, email);

    // The visitor's copy. Never fails the request: the lead above is already safe.
    try {
      await sendAcknowledgement('quote', email, { name, company, configuration });
    } catch (ackError: any) {
      console.error('Acknowledgement email failed (non-fatal):', ackError?.message);
    }

    if (databaseUrl) {
      try {
        const { prisma } = await import('@/lib/prisma');
        await prisma.quoteRequest.create({
          data: { name, email, company: company ?? '', message: message ?? '', configuration, estimate: estimate ?? '', phone: phone ?? '', ...leadRecord(request, data) },
        });
      } catch (dbError: any) {
        console.error('Quote request error (database, non-fatal):', dbError?.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Quote request submitted' });
  } catch (error: any) {
    console.error('Quote request error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to submit request' }, { status: 500 });
  }
}
