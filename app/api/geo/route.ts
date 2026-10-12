export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

/**
 * The visitor's country, from Vercel's geolocation header, so the phone field can
 * pre-select a calling code. Returns nothing else and stores nothing; absent outside
 * Vercel (local builds), where the field falls back to the browser's language region.
 */
export function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country');
  return NextResponse.json(
    { country: country && /^[A-Z]{2}$/.test(country) ? country : null },
    { headers: { 'cache-control': 'no-store' } },
  );
}
