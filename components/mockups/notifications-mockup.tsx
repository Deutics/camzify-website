'use client';

import { useRef } from 'react';
import { Bell, BellRing, AlertTriangle, Timer } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

const statTiles = [
  { label: 'Total Events · 30d', value: 54, icon: Bell },
  { label: 'Unread', value: 18, icon: BellRing },
  { label: 'Critical', value: 15, icon: AlertTriangle, tone: 'critical' as const, sub: 'weapons & fire/smoke' },
  { label: 'Avg Time To Ack', value: 6, suffix: 'm', icon: Timer, sub: 'across 12 resolved criticals' },
];

const severityBreakdown = [
  { label: 'Critical', value: 15, colorClass: 'bg-critical' },
  { label: 'Warning', value: 30, colorClass: 'bg-warn' },
  { label: 'Info', value: 9, colorClass: 'bg-primary' },
];
const severityTotal = 54;

const alertRows = [
  { time: '4h ago', camera: 'HQ-Parking', site: 'HQ Campus', message: 'HQ-Parking stream went offline unexpectedly', category: 'Stream Status', status: 'ACK REQUIRED', severity: 'warning' as const },
  { time: '4h ago', camera: 'HQ-Entrance', site: 'HQ Campus', message: 'Smoke detected in monitored area', category: 'Fire & Smoke', status: 'UNREAD · ACK REQUIRED', severity: 'critical' as const },
  { time: '2h ago', camera: 'WH-Interior 1', site: 'Warehouse - Sector 4', message: 'Possible firearm detected in frame', category: 'Weapons Detection', status: 'ACK REQUIRED', severity: 'critical' as const },
  { time: 'just now', camera: 'WH-Gate 1', site: 'Warehouse - Sector 4', message: 'Person crossed Perimeter Line — Entrance direction', category: 'Line Intrusion', status: 'UNREAD', severity: 'info' as const },
];

const severityText: Record<string, string> = {
  critical: 'text-critical',
  warning: 'text-warn',
  info: 'text-primary',
};
const severityBorder: Record<string, string> = {
  critical: 'border-l-red-400',
  warning: 'border-l-amber-400',
  info: 'border-l-primary',
};

export function NotificationsMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);

    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: stat tiles lift (motion only — border glow handled by Tailwind hover: class)
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
      const suffix = el.dataset.suffix ?? '';
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => {
          el.textContent = `${Math.round(counter.val)}${suffix}`;
        },
      });
    });

    // Severity bars grow from 0
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
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-critical" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Notifications · 3 Require Acknowledgement</span>
        </div>
        <span className="font-mono text-mono-sm text-muted-foreground/60">Oldest: HQ-Parking · 4h 47m ago</span>
      </div>

      <div className="p-5">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {statTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div key={tile.label} data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
                <Icon className={`h-3.5 w-3.5 ${tile.tone === 'critical' ? 'text-critical' : 'text-primary'}`} />
                <div
                  data-stat-value
                  data-target={tile.value}
                  data-suffix={tile.suffix ?? ''}
                  className={`mt-2 font-display text-xl font-bold tabular-nums ${tile.tone === 'critical' ? 'text-critical' : ''}`}
                >
                  {tile.value}{tile.suffix ?? ''}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{tile.label}</div>
                {tile.sub && <div className="mt-0.5 text-[11px] text-muted-foreground/70">{tile.sub}</div>}
              </div>
            );
          })}
        </div>

        {/* Severity breakdown */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-mono-sm uppercase text-muted-foreground">Severity Breakdown · {severityTotal} Total</span>
          </div>
          <div className="mt-2 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
            {severityBreakdown.map((seg) => (
              <div
                key={seg.label}
                data-bar-fill
                className={`h-full ${seg.colorClass}`}
                style={{ width: `${(seg.value / severityTotal) * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {severityBreakdown.map((seg) => (
              <span key={seg.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className={`h-1.5 w-1.5 rounded-full ${seg.colorClass}`} />
                {seg.label} · {seg.value}
              </span>
            ))}
          </div>
        </div>

        {/* Alert feed */}
        <div className="mt-5">
          <div className="font-mono text-mono-sm uppercase text-muted-foreground">Recent Alerts</div>
          <div className="mt-3 space-y-2">
            {alertRows.map((a, i) => (
              <div
                key={i}
                data-alert-row
                className={`rounded-lg border border-l-2 border-border ${severityBorder[a.severity]} bg-background/50 px-3 py-2 transition-colors hover:border-primary/50`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-mono text-[10px] uppercase ${severityText[a.severity]}`}>{a.category}</span>
                  <span className="flex-shrink-0 text-[10px] text-muted-foreground/60">{a.time}</span>
                </div>
                <div className="mt-1 text-[12px] font-medium">{a.message}</div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-muted-foreground">{a.camera} · {a.site}</span>
                  <span className={`flex-shrink-0 font-mono text-[9px] uppercase ${a.status.includes('REQUIRED') ? 'text-critical' : 'text-muted-foreground/70'}`}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
