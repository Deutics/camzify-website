'use client';

import { useEffect, useState } from 'react';
import { useMounted } from '@/components/system/client-only';
import {
  REQUIRE_CONSENT,
  resetConsent,
  readAnalyticsOptOut,
  setAnalyticsOptOut,
} from '@/components/system/analytics-consent';

/**
 * The one control on the cookie policy page for analytics choices.
 *
 * With the banner on (REQUIRE_CONSENT), it clears the stored choice so the banner asks
 * again. With the banner off, analytics run by default, so it offers the opt-out instead:
 * turning analytics off (or back on) for this browser. Either way, withdrawing has to be
 * as easy as one click.
 */
export function ManageCookiePreferences() {
  const mounted = useMounted();
  const [optedOut, setOptedOut] = useState(false);

  useEffect(() => {
    if (mounted) setOptedOut(readAnalyticsOptOut());
  }, [mounted]);

  const className =
    'rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted/40';

  if (REQUIRE_CONSENT) {
    return (
      <button type="button" onClick={resetConsent} className={className}>
        Change my cookie choice
      </button>
    );
  }

  return (
    <button type="button" onClick={() => setAnalyticsOptOut(!optedOut)} className={className}>
      {optedOut ? 'Turn analytics back on for this browser' : 'Turn off analytics for this browser'}
    </button>
  );
}
