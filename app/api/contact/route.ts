export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Lead capture. Writes the submission to Postgres and returns.
 *
 * There is intentionally NO notification step. Leads are read from the database —
 * see the `ContactSubmission` table. If a notification channel is added later
 * (email provider, Slack webhook), it must stay non-fatal: a failed notification
 * must never lose a lead that has already been written.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Name, email and message are required' }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: { name, email, subject: subject ?? '', message },
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Contact error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
  }
}
