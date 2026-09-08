'use client';

import { useEffect, useState } from 'react';
import { Wrench, X } from 'lucide-react';

/*
 * A small, dismissible notice that the site is being worked on.
 *
 * Deliberately a card in the corner rather than a modal: it must not block reading,
 * must not trap focus, and must not hide the page from a crawler. It is rendered on
 * the server in its visible state so the markup carries the text, then hidden on the
 * client if this browser has already dismissed it. Dismissal is per browser session:
 * a visitor sees it once per visit, not on every page.
 *
 * SSR safety: nothing here reads storage or the window during render. The storage
 * read happens in an effect after hydration, which is why the first paint can show the
 * notice for a moment to a visitor who has dismissed it; that is the cheaper failure
 * compared with a hydration mismatch.
 *
 * Remove the mount in app/layout.tsx when the site leaves maintenance.
 */
const KEY = 'camzify-maintenance-notice-dismissed';

export function MaintenanceNotice() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(KEY) === '1') setDismissed(true);
    } catch {
      /* storage unavailable: show the notice; it can still be dismissed for this page */
    }
  }, []);

  const close = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      {...((dismissed ? { inert: '' } : {}) as Record<string, unknown>)}
      aria-hidden={dismissed}
      className={`fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-xl border border-warn/40 bg-card p-4 shadow-2xl transition-all duration-300 sm:inset-x-auto sm:left-6 sm:bottom-6 ${
        dismissed ? 'pointer-events-none translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warn/15 text-warn" aria-hidden="true">
          <Wrench className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">This site is being updated</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            We are rebuilding pages as you read this, so an image, a link or a section may
            look unfinished for a while. The product itself is unaffected. If something
            important is broken, tell us at the contact page and we will fix it.
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          className="-mr-1 -mt-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Dismiss this notice"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
