'use client';

import { type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Runs GSAP setup scoped to `scope`, deferred by one frame.
 *
 * Why the defer: when the scoped element is already in the viewport at mount time
 * (very common for above-the-fold mockups), ScrollTrigger fires `onEnter`
 * SYNCHRONOUSLY while gsap.from()/to() is still constructing the tween — the "play"
 * gets silently overwritten once construction finishes, leaving the animation stuck
 * at its start state forever (0-values, opacity:0, etc). Deferring the whole setup by
 * one requestAnimationFrame — and running it through `contextSafe` since it now fires
 * after useGSAP's own synchronous pass — avoids that race and keeps proper cleanup on
 * unmount. Always build ScrollTrigger-driven reveals through this hook rather than
 * calling useGSAP directly, so this fix can't accidentally get skipped.
 *
 * `setup` receives `{ prefersReducedMotion, contextSafe }`. When prefersReducedMotion
 * is true, entrance/count-up/stagger animations should be skipped (render final
 * values immediately) — a subtle opacity fade is fine to keep either way.
 */
export function useDeferredGsap(
  scope: RefObject<HTMLElement>,
  setup: (ctx: { prefersReducedMotion: boolean; contextSafe: (fn: () => void) => () => void }) => void
) {
  useGSAP(
    (_context, contextSafe) => {
      const safeContextSafe = contextSafe!;
      const run = safeContextSafe(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setup({ prefersReducedMotion, contextSafe: safeContextSafe });
      });
      const raf = requestAnimationFrame(run);
      return () => cancelAnimationFrame(raf);
    },
    { scope }
  );
}

/** Standard scroll-trigger config for a one-time reveal keyed off a container ref. */
export function revealTrigger(el: Element | null) {
  return { trigger: el, start: 'top 85%', once: true } as const;
}
