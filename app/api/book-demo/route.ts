export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Lead capture. Writes the submission to Postgres and returns.
 *
 * There is intentionally NO notification step. Leads are read from the database —
 * see the `DemoRequest` table. If a notification channel is added later
 * (email provider, Slack webhook), it must stay non-fatal: a failed notification
 * must never lose a lead that has already been written.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, cameras } = data ?? {};

    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and email are required' }, { status: 400 });
    }

    await prisma.demoRequest.create({
      data: { name, email, company: company ?? '', cameras: cameras ?? '' },
    });

    // Send notification email
    return NextResponse.json({ success: true, message: 'Demo request submitted successfully' });
  } catch (error: any) {
    console.error('Demo request error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to submit request' }, { status: 500 });
  }
}
