'use client';

import { useRef } from 'react';
import { AlertTriangle, Camera, ShieldCheck, Database, Activity } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

const statTiles = [
  { label: 'Cameras Live', value: 49, of: 61, sub: '80% uptime · 4 sites', icon: Camera },
  { label: 'Critical Open', value: 19, sub: 'awaiting acknowledgment', icon: AlertTriangle, tone: 'critical' as const },
  { label: 'Alerts Today', value: 527, sub: 'across all sites', icon: Activity },
  { label: 'Patrol Compliance', value: 75, suffix: '%', sub: '18/24 rounds today', icon: ShieldCheck },
  { label: 'Retention Coverage', value: 50, of: 61, sub: '11 cameras below target', icon: Database },
];

const detectionEvents = [
  { label: 'Camera Tampering', count: 228 },
  { label: 'Zone Intrusion', count: 131 },
  { label: 'Line Intrusion', count: 120 },
  { label: 'Heatmap Anomalies', count: 99 },
  { label: 'Fire & Smoke', count: 67 },
  { label: 'PPE Violations', count: 47 },
];
const maxEvents = Math.max(...detectionEvents.map((d) => d.count));

const alertFeed = [
  { severity: 'critical', feature: 'Weapons Detection', detail: 'Object flagged at Gate 2 camera', site: 'Warehouse - Sector 4', time: '03:14 PM' },
  { severity: 'critical', feature: 'Camera Stream Down', detail: 'Camera dropped connection', site: 'Retail - Downtown', time: '03:14 PM' },
  { severity: 'warning', feature: 'Line Intrusion', detail: 'Perimeter line crossed — Zone 3', site: 'Warehouse - Sector 4', time: '03:14 PM' },
];

export function DashboardMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);

    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: stat tiles lift slightly (GSAP handles motion; Tailwind's hover: handles
    // the border-color glow — border/primary are HSL-component CSS vars here, not full
    // color values, so they're not safe to hand to GSAP as color animation targets).
    gsap.utils.toArray<HTMLElement>('[data-stat-tile]').forEach((tile) => {
      const onEnter = contextSafe(() => gsap.to(tile, { y: -3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(tile, { y: 0, duration: 0.25, ease: 'power2.out' }));
      tile.addEventListener('mouseenter', onEnter);
      tile.addEventListener('mouseleave', onLeave);
    });

    // Hover: alert rows nudge right slightly
    gsap.utils.toArray<HTMLElement>('[data-alert-row]').forEach((row) => {
      const onEnter = contextSafe(() => gsap.to(row, { x: 3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(row, { x: 0, duration: 0.25, ease: 'power2.out' }));
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Stat tiles: count up
    gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      const of = el.dataset.of;
      const suffix = el.dataset.suffix ?? '';
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => {
          const rounded = Math.round(counter.val);
          el.textContent = of ? `${rounded}/${of}` : `${rounded}${suffix}`;
        },
      });
    });

    // Detection event bars: grow from 0
    gsap.from('[data-bar-fill]', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.15,
      scrollTrigger: st,
    });

    // Alert feed: stagger in
    gsap.from('[data-alert-row]', {
      opacity: 0,
      x: 12,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.3,
      scrollTrigger: st,
    });
  });

  return (
    <div ref={containerRef} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-live" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Camzify Dashboard · Live</span>
        </div>
        <span className="font-mono text-mono-sm text-muted-foreground/60">Refresh: 5s</span>
      </div>

      <div className="p-5">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {statTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div key={tile.label} data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
                <Icon className={`h-3.5 w-3.5 ${tile.tone === 'critical' ? 'text-critical' : 'text-primary'}`} />
                <div
                  data-stat-value
                  data-target={tile.value}
                  data-of={tile.of ?? ''}
                  data-suffix={tile.suffix ?? ''}
                  className={`mt-2 font-display text-xl font-bold tabular-nums ${tile.tone === 'critical' ? 'text-critical' : ''}`}
                >
                  {tile.of ? `${tile.value}/${tile.of}` : `${tile.value}${tile.suffix ?? ''}`}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{tile.label}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground/70">{tile.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Detection events + alert feed */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div>
            <div className="font-mono text-mono-sm uppercase text-muted-foreground">Detection Events · 7 Days</div>
            <div className="mt-3 space-y-2">
              {detectionEvents.map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="w-28 flex-shrink-0 truncate text-[11px] text-muted-foreground">{d.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      data-bar-fill
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(d.count / maxEvents) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 flex-shrink-0 text-right font-mono text-[11px] text-muted-foreground">{d.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-mono-sm uppercase text-muted-foreground">Live Alert Feed</div>
            <div className="mt-3 space-y-2">
              {alertFeed.map((a, i) => (
                <div key={i} data-alert-row className="rounded-lg border border-border bg-background/50 px-3 py-2 transition-colors hover:border-primary/50">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[10px] uppercase ${a.severity === 'critical' ? 'text-critical' : 'text-warn'}`}>
                      {a.severity}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">{a.time}</span>
                  </div>
                  <div className="mt-1 text-[12px] font-medium">{a.feature}</div>
                  <div className="text-[11px] text-muted-foreground">{a.detail} · {a.site}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
