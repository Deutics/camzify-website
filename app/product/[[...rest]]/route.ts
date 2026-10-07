import { gone } from '@/lib/gone';

/** A WordPress-era product page (one, "active-volcano", unrelated to Camzify, surfaced in Search Console in October 2026). See lib/gone.ts. */
export const dynamic = 'force-static';
export function GET() {
  return gone();
}
export function HEAD() {
  return gone();
}
