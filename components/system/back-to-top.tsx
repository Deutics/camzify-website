'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/*
 * Back to top. Guides and hub pages run to several screens, and a reader who has
 * reached the FAQ should not have to scroll back through all of it.
 *
 * Behaviour: hidden until the reader is more than a viewport below the top, then a
 * quiet control in the bottom-right corner. A thin ring around it fills with how far
 * down the page they are, so it also reads as a progress indicator. Clicking scrolls
 * to the top (smoothly, unless the reader prefers reduced motion) and moves focus to
 * the main landmark so keyboard and screen-reader users land where the page starts.
 *
 * Never unmounted: hidden with opacity and `inert`, so it cannot be tabbed to while
 * invisible and there is no layout work when it appears. Scroll work runs in effects
 * only and is throttled to one frame.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      raf.current = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(100 - progress * 100);
      setVisible(window.scrollY > window.innerHeight * 1.1);
    };
    const onScroll = () => {
      if (raf.current === null) raf.current = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf.current !== null) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    const main = document.getElementById('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      {...((visible ? {} : { inert: '' }) as Record<string, unknown>)}
    >
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        title="Back to top"
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Progress ring: a circle of circumference 100 so the dash offset is a percentage. */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="15.915" fill="none" className="stroke-border" strokeWidth="1.5" />
          <circle
            ref={ringRef}
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            className="stroke-primary transition-[stroke-dashoffset] duration-150 ease-linear"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        </svg>
        <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
      </button>
    </div>
  );
}
