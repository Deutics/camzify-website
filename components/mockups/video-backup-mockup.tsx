'use client';

import { useRef } from 'react';
import { HardDrive, Database, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

const provisioned = 17.5;
const allocatedPct = 86;

const allocationSegments = [
  { label: 'Used on your cameras', value: 11.1, colorClass: 'bg-primary' },
  { label: 'Assigned to child accounts', value: 4.0, colorClass: 'bg-warn' },
  { label: 'Remaining to assign', value: 2.4, colorClass: 'bg-live' },
];

const sites = [
  { name: 'Warehouse - Sector 4', cams: 5, tb: 3.7, pct: 21 },
  { name: 'HQ Campus', cams: 4, tb: 3.2, pct: 18 },
  { name: 'Retail - Downtown', cams: 3, tb: 2.1, pct: 12 },
  { name: 'Parking Structure B', cams: 3, tb: 2.1, pct: 12 },
];
const maxSitePct = Math.max(...sites.map((s) => s.pct));

const presets = ['7 days', '30 days', '60 days', '90 days'];

const cameraRows = [
  { name: 'WH-Gate 1', res: '3840×2160', mode: '24/7', est: '≈1.1 TB', rate: '≈80 GB/day · 14d' },
  { name: 'WH-Dock A', res: '1920×1080', mode: '24/7', est: '≈490 GB', rate: '≈35 GB/day · 14d' },
  { name: 'HQ-Lobby', res: '3840×2160', mode: '—', est: '≈1.1 TB', rate: '—' },
  { name: 'RT-Storefront', res: '3840×2160', mode: '—', est: '≈1.1 TB', rate: '—' },
];

export function VideoBackupMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);

    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: stat tiles + site rows lift slightly (motion only — Tailwind handles the
    // border-color glow since --primary/--border are HSL-component vars GSAP can't tween).
    gsap.utils.toArray<HTMLElement>('[data-stat-tile]').forEach((tile) => {
      const onEnter = contextSafe(() => gsap.to(tile, { y: -3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(tile, { y: 0, duration: 0.25, ease: 'power2.out' }));
      tile.addEventListener('mouseenter', onEnter);
      tile.addEventListener('mouseleave', onLeave);
    });

    gsap.utils.toArray<HTMLElement>('[data-site-row]').forEach((row) => {
      const onEnter = contextSafe(() => gsap.to(row, { y: -2, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(row, { y: 0, duration: 0.25, ease: 'power2.out' }));
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
    });

    // Hover: camera rows nudge right slightly
    gsap.utils.toArray<HTMLElement>('[data-cam-row]').forEach((row) => {
      const onEnter = contextSafe(() => gsap.to(row, { x: 3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(row, { x: 0, duration: 0.25, ease: 'power2.out' }));
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Count-up on TB / % figures
    gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      const suffix = el.dataset.suffix ?? '';
      const decimals = Number(el.dataset.decimals ?? 0);
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => {
          el.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
        },
      });
    });

    // Allocation bar + per-site bars grow from 0
    gsap.from('[data-bar-fill]', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.15,
      scrollTrigger: st,
    });

    // Preset chips stagger
    gsap.from('[data-preset-chip]', {
      opacity: 0,
      y: 8,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.05,
      delay: 0.2,
      scrollTrigger: st,
    });

    // Camera rows stagger in
    gsap.from('[data-cam-row]', {
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
          <HardDrive className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Video Backup · Storage Allocation</span>
        </div>
        <span className="font-mono text-mono-sm text-muted-foreground/60">Provisioned by plan admin</span>
      </div>

      <div className="p-5">
        {/* Top stat tiles */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
            <Database className="h-3.5 w-3.5 text-primary" />
            <div data-stat-value data-target={provisioned} data-suffix=" TB" data-decimals="1" className="mt-2 font-display text-xl font-bold tabular-nums">
              {provisioned.toFixed(1)} TB
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Provisioned</div>
          </div>
          <div data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
            <div className="h-3.5 w-3.5 rounded-sm bg-primary" />
            <div data-stat-value data-target={allocationSegments[0].value} data-suffix=" TB" data-decimals="1" className="mt-2 font-display text-xl font-bold tabular-nums">
              {allocationSegments[0].value.toFixed(1)} TB
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Used on cameras</div>
          </div>
          <div data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
            <div className="h-3.5 w-3.5 rounded-sm bg-warn" />
            <div data-stat-value data-target={allocationSegments[1].value} data-suffix=" TB" data-decimals="1" className="mt-2 font-display text-xl font-bold tabular-nums">
              {allocationSegments[1].value.toFixed(1)} TB
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Assigned to children</div>
          </div>
          <div data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
            <div className="h-3.5 w-3.5 rounded-sm bg-live" />
            <div data-stat-value data-target={allocationSegments[2].value} data-suffix=" TB" data-decimals="1" className="mt-2 font-display text-xl font-bold tabular-nums">
              {allocationSegments[2].value.toFixed(1)} TB
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Remaining to assign</div>
          </div>
        </div>

        {/* Stacked allocation bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-mono-sm uppercase text-muted-foreground">Overall Allocation</span>
            <span data-stat-value data-target={allocatedPct} data-suffix="% allocated" data-decimals="0" className="font-mono text-mono-sm text-primary">
              {allocatedPct}% allocated
            </span>
          </div>
          <div className="mt-2 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
            {allocationSegments.map((seg) => (
              <div
                key={seg.label}
                data-bar-fill
                className={`h-full ${seg.colorClass}`}
                style={{ width: `${(seg.value / provisioned) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Per-site breakdown */}
        <div className="mt-5">
          <div className="font-mono text-mono-sm uppercase text-muted-foreground">Storage By Site</div>
          <div className="mt-3 space-y-2">
            {sites.map((s) => (
              <div key={s.name} data-site-row className="rounded-lg border border-border bg-background/50 px-3 py-2 transition-colors hover:border-primary/50">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium">{s.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{s.cams} cams · {s.tb} TB · {s.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    data-bar-fill
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(s.pct / maxSitePct) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick-apply retention presets */}
        <div className="mt-5">
          <div className="font-mono text-mono-sm uppercase text-muted-foreground">Quick-Apply Retention · All Cameras</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {presets.map((p) => (
              <div key={p} data-preset-chip className="flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-2.5 py-1.5">
                <Clock className="h-3 w-3 text-primary" />
                <span className="text-[11px]">{p}</span>
              </div>
            ))}
            <div data-preset-chip className="flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-2.5 py-1.5">
              <Clock className="h-3 w-3 text-primary" />
              <span className="text-[11px]">24/7 continuous</span>
            </div>
          </div>
        </div>

        {/* Per-camera retention sample */}
        <div className="mt-5">
          <div className="font-mono text-mono-sm uppercase text-muted-foreground">Retention By Camera · Sample</div>
          <div className="mt-3 overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-5 gap-2 bg-muted/30 px-3 py-2 font-mono text-[10px] uppercase text-muted-foreground">
              <span>Camera</span>
              <span>Resolution</span>
              <span>Mode</span>
              <span>Est. Storage</span>
              <span className="text-right">Daily Rate</span>
            </div>
            {cameraRows.map((c) => (
              <div
                key={c.name}
                data-cam-row
                className="grid grid-cols-5 items-center gap-2 border-t border-border bg-background/50 px-3 py-2 transition-colors hover:border-primary/50"
              >
                <span className="truncate text-[12px] font-medium">{c.name}</span>
                <span className="text-[11px] text-muted-foreground">{c.res}</span>
                <span className="text-[11px] text-muted-foreground">{c.mode}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{c.est}</span>
                <span className="text-right font-mono text-[11px] text-muted-foreground">{c.rate}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground/70">
            The Est. Storage column is a planning estimate, calculated from each camera's typical bitrate for its resolution — actual usage varies with scene activity and compression.
          </p>
        </div>
      </div>
    </div>
  );
}
