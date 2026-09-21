import { gone } from '@/lib/gone';

/** A WordPress-era path. See lib/gone.ts. */
export const dynamic = 'force-static';
export function GET() {
  return gone();
}
export function HEAD() {
  return gone();
}
