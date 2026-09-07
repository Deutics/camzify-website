'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, XCircle, Radio } from 'lucide-react';

/*
 * The hero visual: one patrol round, shown as the operator sees it.
 *
 * The previous version was a 3x4 wall of tiles, each dimmed to 35% until the sweep
 * reached it and darkened again by a heavy scrim so that its labels stayed legible.
 * The effect was that the real camera frames the business supplied were never
 * actually visible; a viewer saw a dark grid with red text on it.
 *
 * This version shows one frame at a time, at full opacity, large enough to read as a
 * photograph, with the checklist verdict for that stop animating in over it. The
 * round advances through six real stops on a timer, and a strip of thumbnails below
 * shows where the round is. Only the bottom edge of the frame carries a gradient, and
 * only as far as the camera label needs.
 *
 * SSR safety: the timer runs in an effect; the server renders stop 0 in its resting
 * state. With prefers-reduced-motion the round holds on a stop that shows a failed
 * check, which is the frame that carries the meaning.
 */
type Stop = {
  id: string;
  loc: string;
  src: string;
  thumb: string;
  item: string;
  ok: boolean;
};

const STOPS: Stop[] = [
  { id: 'CAM 01', loc: 'Main gate', src: '/hero-cam-main-gate-960.webp', thumb: '/hero-cam-main-gate-640.webp', item: 'Gate closed and latched', ok: true },
  { id: 'CAM 04', loc: 'Loading dock', src: '/hero-cam-loading-dock-960.webp', thumb: '/hero-cam-loading-dock-640.webp', item: 'Dock doors down after hours', ok: false },
  { id: 'CAM 02', loc: 'Parking lot A', src: '/hero-cam-parking-lot-960.webp', thumb: '/hero-cam-parking-lot-640.webp', item: 'No person in the lot', ok: true },
  { id: 'CAM 07', loc: 'Server room', src: '/hero-cam-server-room-960.webp', thumb: '/hero-cam-server-room-640.webp', item: 'Room empty, door closed', ok: true },
  { id: 'CAM 05', loc: 'Warehouse east', src: '/hero-cam-warehouse-east-960.webp', thumb: '/hero-cam-warehouse-east-640.webp', item: 'Aisle clear of obstructions', ok: true },
  { id: 'CAM 03', loc: 'Rear entrance', src: '/hero-cam-rear-entrance-960.webp', thumb: '/hero-cam-rear-entrance-640.webp', item: 'Rear door closed', ok: true },
];

const STEP_MS = 3200;

export function PatrolSweepHero() {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setI(1);
      return;
    }
    const t = setInterval(() => setI((n) => (n + 1) % STOPS.length), STEP_MS);
    return () => clearInterval(t);
  }, [reduceMotion]);

  const stop = STOPS[i];
  const done = STOPS.filter((_, k) => k < i);
  const failed = done.filter((s) => !s.ok).length + (stop.ok ? 0 : 1);

  return (
    <figure
      className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden"
      role="img"
      aria-label={`A patrol round in progress: stop ${i + 1} of ${STOPS.length}, ${stop.loc}, ${stop.item}, ${stop.ok ? 'compliant' : 'not compliant, guard notified'}`}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-live">
          <Radio className="h-3.5 w-3.5 motion-safe:animate-pulse-dot" aria-hidden="true" />
          Perimeter round
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">in progress</span>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-muted-foreground">
          Stop {i + 1} / {STOPS.length}
        </span>
      </div>

      {/* The frame */}
      <div className="relative aspect-video w-full overflow-hidden bg-[hsl(216_22%_6%)]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={stop.src}
            src={stop.src}
            alt=""
            aria-hidden="true"
            width={960}
            height={540}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Only the bottom edge is shaded, and only enough for the label. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[hsl(216_22%_4%/0.85)] to-transparent" />

        {/* Camera label */}
        <div className="camera-tile absolute bottom-3 left-3 flex items-center gap-2">
          <span className="rounded bg-background/60 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground backdrop-blur-sm">
            {stop.id} · {stop.loc}
          </span>
        </div>

        {/* The verdict for this stop */}
        {/* Keyed on the stop and entered in sync with the frame, so the verdict never
            lags a stop behind the picture it belongs to. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={stop.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.45 }}
            className={`camera-tile absolute right-3 top-3 flex max-w-[85%] items-start gap-2 rounded-lg border px-3 py-2 shadow-lg backdrop-blur-sm ${
              stop.ok ? 'border-live/40 bg-[hsl(216_22%_8%/0.85)]' : 'border-critical/50 bg-[hsl(216_22%_8%/0.9)]'
            }`}
          >
            {stop.ok ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-live" aria-hidden="true" />
            ) : (
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-critical" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-tight text-foreground">{stop.item}</div>
              <div className={`mt-0.5 font-mono text-[10px] uppercase tracking-wider ${stop.ok ? 'text-live' : 'text-critical'}`}>
                {stop.ok ? 'Compliant' : 'Not compliant · guard notified'}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress across the round */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-background/30">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${((i + 1) / STOPS.length) * 100}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.4 }}
          />
        </div>
      </div>

      {/* The stops */}
      <div className="grid grid-cols-6 gap-1.5 p-2 sm:gap-2 sm:p-3">
        {STOPS.map((s, k) => {
          const visited = k < i;
          const active = k === i;
          return (
            <div
              key={s.id}
              className={`relative aspect-video overflow-hidden rounded-md border transition-all duration-300 ${
                active ? 'border-primary ring-2 ring-primary/40' : visited ? (s.ok ? 'border-live/40' : 'border-critical/50') : 'border-border'
              }`}
            >
              <img src={s.thumb} alt="" aria-hidden="true" width={480} height={270} loading="lazy" className="h-full w-full object-cover" />
              {visited && (
                <span className="absolute right-1 top-1" aria-hidden="true">
                  {s.ok ? <CheckCircle2 className="h-3.5 w-3.5 text-live drop-shadow" /> : <XCircle className="h-3.5 w-3.5 text-critical drop-shadow" />}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <figcaption className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
        <span>Sample round on real camera frames. Interface illustration, not customer footage.</span>
        <span className="font-mono tabular-nums">{failed} flagged</span>
      </figcaption>
    </figure>
  );
}
