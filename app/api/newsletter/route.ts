export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email } = data ?? {};

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    await prisma.newsletterSubscription.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    console.error('Newsletter error:', error?.message);
    return NextResponse.json({ success: false, message: 'Failed to subscribe' }, { status: 500 });
  }
}
