'use client';

import { useRef } from 'react';
import { Video, VideoOff, Zap, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

const sites = [
  { code: 'WH4', name: 'Warehouse - Sector 4', online: 7, total: 7 },
  { code: 'HQ', name: 'HQ Campus', online: 7, total: 8 },
  { code: 'RTD', name: 'Retail - Downtown', online: 9, total: 9 },
  { code: 'PKB', name: 'Parking Structure B', online: 0, total: 6, down: true },
];

/*
 * Tiles carry the site's own synthesized camera frames (public/cam-*.jpg) rather than
 * a flat gray box with the word LIVE on it. A live wall whose tiles show nothing read
 * as a wireframe; the frames make it read as the product. The offline tile stays
 * frameless on purpose — no signal should look like no signal.
 */
const cameraTiles = [
  { name: 'WH-Bay 5', user: 'Rahul Khanna', res: '720p · 30fps', live: true, frame: '/cam-05.jpg' },
  { name: 'WH-Dock A', user: 'My Account', res: '1080p · 25fps', live: true, frame: '/cam-02.jpg' },
  { name: 'WH-Gate 1', user: 'My Account', res: '1080p · 25fps', live: true, frame: '/cam-06.jpg' },
  { name: 'WH-Interior 1', user: 'My Account', res: '4K · 15fps', live: true, frame: '/cam-03.jpg' },
  { name: 'HQ-Cafeteria', user: 'Ayesha Malik', res: '720p · 30fps', live: true, frame: '/cam-01.jpg' },
  { name: 'PKB-Level1', user: 'James Torres', res: '1080p · 25fps', live: false, frame: null },
];

const aiFilters = [
  { label: 'Line Intrusion', count: 9 },
  { label: 'Zone Intrusion', count: 12 },
  { label: 'Camera Tampering', count: 30 },
  { label: 'Heatmap Anomalies', count: 7 },
  { label: 'PPE Violations', count: 4 },
];

export function LiveStreamingMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);
    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: camera tiles lift + scale up slightly
    gsap.utils.toArray<HTMLElement>('[data-cam-tile]').forEach((tile) => {
      const onEnter = contextSafe(() => gsap.to(tile, { scale: 1.02, y: -2, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(tile, { scale: 1, y: 0, duration: 0.25, ease: 'power2.out' }));
      tile.addEventListener('mouseenter', onEnter);
      tile.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Stat counters
    gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => { el.textContent = String(Math.round(counter.val)); },
      });
    });

    // Camera tiles stagger in
    gsap.from('[data-cam-tile]', {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.1,
      scrollTrigger: st,
    });

    // AI filter bars stagger
    gsap.from('[data-filter-row]', {
      opacity: 0,
      x: -10,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.06,
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
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Live Streaming · 30 Cameras</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-mono-sm text-muted-foreground/60">
          <span className="inline-flex items-center gap-1"><Zap className="h-3 w-3" /> Low Latency</span>
          <span>Slideshow: 5s</span>
        </div>
      </div>

      <div className="p-5">
        {/* Live/offline stats + site strip */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-live" />
            <span data-stat-value data-target="23" className="font-display text-xl font-bold tabular-nums">23</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Live</span>
          </div>
          <div className="flex items-center gap-2">
            <VideoOff className="h-4 w-4 text-critical" />
            <span data-stat-value data-target="7" className="font-display text-xl font-bold tabular-nums">7</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Offline</span>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            {sites.map((s) => (
              <span
                key={s.code}
                className={`rounded-md border px-2 py-1 font-mono text-[10px] ${
                  s.down ? 'border-critical/30 bg-critical/10 text-critical' : 'border-border bg-background/50 text-muted-foreground'
                }`}
              >
                {s.code} · {s.down ? 'SITE DOWN' : `${s.online}/${s.total} online`}
              </span>
            ))}
          </div>
        </div>

        {/* Site-down alert */}
        <div className="mt-4 rounded-lg border border-critical/30 bg-critical/5 px-4 py-2.5 text-[12px] text-critical">
          Parking Structure B is fully offline — all 6 cameras are down. Streams will resume once connectivity is restored.
        </div>

        {/* Camera grid */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {cameraTiles.map((cam) => (
            <div
              key={cam.name}
              data-cam-tile
              className="cursor-default rounded-lg border border-border bg-background/50 p-2.5 transition-colors hover:border-primary/50"
            >
              <div className={`relative flex aspect-video items-center justify-center overflow-hidden rounded ${cam.live && cam.frame ? 'camera-tile-frame' : 'bg-muted/50'}`}>
                {cam.live && cam.frame ? (
                  <>
                    <img
                      src={cam.frame}
                      alt=""
                      aria-hidden="true"
                      width={480}
                      height={270}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                    <div aria-hidden="true" className="camera-tile-scrim absolute inset-0" />
                    <span className="camera-tile absolute left-1.5 top-1.5 flex items-center gap-1 font-mono text-[9px] uppercase text-live">
                      <span className="h-1.5 w-1.5 rounded-full bg-live" /> Live
                    </span>
                  </>
                ) : (
                  <span className="font-mono text-[9px] uppercase text-muted-foreground/50">No Signal</span>
                )}
              </div>
              <div className="mt-2 truncate text-[11px] font-medium">{cam.name}</div>
              <div className="truncate text-[10px] text-muted-foreground">{cam.user} · {cam.res}</div>
            </div>
          ))}
        </div>

        {/* AI feature filters */}
        <div className="mt-5">
          <div className="font-mono text-mono-sm uppercase text-muted-foreground">Filter By AI Feature · Cameras Assigned</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {aiFilters.map((f) => (
              <div key={f.label} data-filter-row className="flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-2.5 py-1.5">
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span className="text-[11px]">{f.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{f.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
