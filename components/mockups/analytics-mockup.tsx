'use client';

import { useRef } from 'react';
import { ArrowUp, ArrowDown, Minus, FileBarChart2 } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

// Real per-feature 7-day figures from the product's Configuration > AI Features screen.
const featureRows = [
  { name: 'Camera Tampering', count: 228, trend: 0, active: 15, total: 15 },
  { name: 'Zone Intrusion', count: 131, trend: -5, active: 7, total: 7 },
  { name: 'Line Intrusion', count: 120, trend: 27, active: 4, total: 10 },
  { name: 'Heatmap Anomalies', count: 99, trend: 50, active: 4, total: 6 },
  { name: 'Fire & Smoke', count: 67, trend: 9, active: 2, total: 3 },
  { name: 'PPE Violations', count: 47, trend: -13, active: 3, total: 6 },
];
const maxCount = Math.max(...featureRows.map((f) => f.count));
const totalEvents = featureRows.reduce((sum, f) => sum + f.count, 0);
const atCapacity = featureRows.filter((f) => f.active === f.total).length;
const withHeadroom = featureRows.length - atCapacity;

export function AnalyticsMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);
    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: summary tiles lift slightly
    gsap.utils.toArray<HTMLElement>('[data-stat-tile]').forEach((tile) => {
      const onEnter = contextSafe(() => gsap.to(tile, { y: -3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(tile, { y: 0, duration: 0.25, ease: 'power2.out' }));
      tile.addEventListener('mouseenter', onEnter);
      tile.addEventListener('mouseleave', onLeave);
    });

    // Hover: feature rows nudge right slightly
    gsap.utils.toArray<HTMLElement>('[data-analytics-row]').forEach((row) => {
      const onEnter = contextSafe(() => gsap.to(row, { x: 3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(row, { x: 0, duration: 0.25, ease: 'power2.out' }));
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Count-up: summary tiles + per-row event counts
    gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      const suffix = el.dataset.suffix ?? '';
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.3,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => { el.textContent = `${Math.round(counter.val)}${suffix}`; },
      });
    });

    // Bars grow from 0
    gsap.from('[data-bar-fill]', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.15,
      scrollTrigger: st,
    });

    // Rows stagger in
    gsap.from('[data-analytics-row]', {
      opacity: 0,
      x: 12,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.2,
      scrollTrigger: st,
    });
  });

  return (
    <div ref={containerRef} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <FileBarChart2 className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Analytics &amp; Reporting · 7-Day Trend</span>
        </div>
        <span className="font-mono text-mono-sm text-muted-foreground/60">vs. prior week</span>
      </div>

      <div className="p-5">
        {/* Summary tiles — derived arithmetically from the six rows below */}
        <div className="grid grid-cols-3 gap-2.5">
          <div data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
            <div data-stat-value data-target={totalEvents} className="font-display text-xl font-bold tabular-nums">{totalEvents}</div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Events · 7 Days</div>
          </div>
          <div data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
            <div data-stat-value data-target={atCapacity} className="font-display text-xl font-bold tabular-nums text-warn">{atCapacity}</div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Features At Capacity</div>
          </div>
          <div data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
            <div data-stat-value data-target={withHeadroom} className="font-display text-xl font-bold tabular-nums text-live">{withHeadroom}</div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">With Licensed Headroom</div>
          </div>
        </div>

        {/* Per-feature breakdown */}
        <div className="mt-5">
          <div className="font-mono text-mono-sm uppercase text-muted-foreground">Detection Events By Feature</div>
          <div className="mt-3 space-y-2">
            {featureRows.map((f) => {
              const isUp = f.trend > 0;
              const isDown = f.trend < 0;
              const TrendIcon = isUp ? ArrowUp : isDown ? ArrowDown : Minus;
              const trendColor = isDown ? 'text-live' : isUp ? 'text-warn' : 'text-muted-foreground';
              const atCap = f.active === f.total;
              return (
                <div
                  key={f.name}
                  data-analytics-row
                  className="rounded-lg border border-border bg-background/50 px-3 py-2.5 transition-colors hover:border-primary/50"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="w-32 flex-shrink-0 truncate text-[12px] font-medium">{f.name}</span>
                    <div className="h-2 min-w-[60px] flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        data-bar-fill
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(f.count / maxCount) * 100}%` }}
                      />
                    </div>
                    <span data-stat-value data-target={f.count} className="w-9 flex-shrink-0 text-right font-mono text-[12px] tabular-nums">{f.count}</span>
                    <span className={`flex w-14 flex-shrink-0 items-center gap-0.5 font-mono text-[11px] ${trendColor}`}>
                      <TrendIcon className="h-3 w-3" />
                      {Math.abs(f.trend)}%
                    </span>
                    <span
                      className={`flex-shrink-0 rounded-md border px-1.5 py-0.5 font-mono text-[10px] ${
                        atCap ? 'border-warn/30 bg-warn/10 text-warn' : 'border-border bg-background text-muted-foreground'
                      }`}
                    >
                      {f.active}/{f.total} · {atCap ? 'at capacity' : 'licensed'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
