'use client';

import { useState, type ReactNode } from 'react';
import { MousePointerClick } from 'lucide-react';

/*
 * Frames the interactive patrol demo so nobody mistakes it for a screenshot.
 *
 * The demo used to sit in a card like every other illustration on the page, and a
 * reader who did not happen to hover it had no way to know it was a working loop. Two
 * cues fix that: a badge that stays on the card at all times, and an invitation over
 * the card until the first click. The invitation is hidden with `inert` and opacity,
 * not unmounted, so the text stays in the markup for crawlers.
 */
export function DemoFrame({ children, label = 'Interactive demo' }: { children: ReactNode; label?: string }) {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative" onPointerDownCapture={() => setStarted(true)}>
      <div
        className="pointer-events-none absolute -top-3 left-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary-foreground shadow-md"
        aria-hidden="true"
      >
        <MousePointerClick className="h-3.5 w-3.5" />
        {label} · click to run
      </div>

      {children}

      <div
        // React 18's types do not know `inert`; the attribute itself is what hides
        // the overlay from assistive tech and pointer input once the demo starts.
        {...((started ? { inert: '' } : {}) as Record<string, unknown>)}
        aria-hidden={started}
        className={`absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/70 p-6 backdrop-blur-[2px] transition-opacity duration-300 ${
          started ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-xl">
          <span className="inline-flex items-center gap-2 font-mono text-mono-sm uppercase text-primary">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-live" aria-hidden="true" />
            This is a working demo, not a screenshot
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Step through three cameras, mark each checklist item, message the guard when one
            fails, and see the report the round produces.
          </p>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:animate-pulse-cta"
          >
            <MousePointerClick className="h-4 w-4" aria-hidden="true" />
            Start the round
          </button>
        </div>
      </div>
    </div>
  );
}
