'use client';

import { resetConsent } from '@/components/system/analytics-consent';

/**
 * Clears the stored cookie choice and reloads, so the banner in
 * analytics-consent.tsx asks again. The only UI for withdrawing consent — giving it
 * has to be as easy to undo as it was to give.
 */
export function ManageCookiePreferences() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted/40"
    >
      Change my cookie choice
    </button>
  );
}
