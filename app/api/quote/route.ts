export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/lead-mail';
import { describeEstimate } from '@/lib/pricing-estimates';

/**
 * Quote request from the pricing page estimator. The configuration the visitor built
 * and the estimate they saw travel with the request, so the reply can start from the
 * same numbers. Emailed through ZeptoMail like the other forms; when DATABASE_URL is
 * set it is also stored as a contact submission, non-fatally, so no migration is needed.
 */
const toNum = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, message } = data ?? {};
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

    await sendLeadEmail('quote', { name, email, company, configuration, estimate, message }, email);

    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        await prisma.contactSubmission.create({
          data: { name, email, subject: 'Quote request', message: `${configuration}\n${estimate}\n${message ?? ''}` },
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
