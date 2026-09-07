'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, XCircle, Radio, ScanSearch, FileCheck2 } from 'lucide-react';

/*
 * The hero visual: one patrol round, shown as the operator sees it.
 *
 * Each stop plays in two phases, because that is how a round works and the viewer
 * should be able to see it: the frame settles and the system looks at it (a scan
 * band passes over the picture, the item being checked is named), then the verdict
 * lands and holds long enough to read. Six stops, then a short "round complete"
 * beat with the tally, then it starts again. Hovering or focusing the panel pauses
 * it, so a reader can study a frame.
 *
 * Every verdict was checked against its frame by eye: the gate is open with a guard at
 * the post, dock door 1 is open, a person is walking the lot, a technician is in the
 * server aisle, the warehouse crew wear hi-vis, and the rear door stands open. The
 * checklist items say what the picture shows.
 *
 * Only the bottom edge of the frame carries a gradient, and only as far as the camera
 * label needs; the picture itself is never dimmed.
 *
 * SSR safety: all timers run in effects; the server renders stop 0 in its "looking"
 * state. With prefers-reduced-motion nothing moves: the panel holds on the loading
 * dock with its verdict shown, which is the frame that carries the meaning.
 */
type Stop = { id: string; loc: string; src: string; thumb: string; item: string; ok: boolean };

const STOPS: Stop[] = [
  { id: 'CAM 01', loc: 'Main gate', src: '/hero-cam-main-gate-960.webp', thumb: '/hero-cam-main-gate-640.webp', item: 'Guard present at the gatehouse', ok: true },
  { id: 'CAM 04', loc: 'Loading dock', src: '/hero-cam-loading-dock-960.webp', thumb: '/hero-cam-loading-dock-640.webp', item: 'Dock door 1 closed', ok: false },
  { id: 'CAM 02', loc: 'Parking lot A', src: '/hero-cam-parking-lot-960.webp', thumb: '/hero-cam-parking-lot-640.webp', item: 'Drive lanes clear of obstruction', ok: true },
  { id: 'CAM 07', loc: 'Server room', src: '/hero-cam-server-room-960.webp', thumb: '/hero-cam-server-room-640.webp', item: 'Aisle clear of obstructions', ok: true },
  { id: 'CAM 05', loc: 'Warehouse east', src: '/hero-cam-warehouse-east-960.webp', thumb: '/hero-cam-warehouse-east-640.webp', item: 'High-visibility vests worn', ok: true },
  { id: 'CAM 03', loc: 'Rear entrance', src: '/hero-cam-rear-entrance-960.webp', thumb: '/hero-cam-rear-entrance-640.webp', item: 'Rear door closed', ok: false },
];

const LOOK_MS = 2200; // the system looks at the frame
const HOLD_MS = 3600; // the verdict holds
const STEP_MS = LOOK_MS + HOLD_MS;
const SUMMARY_MS = 2600; // "round complete" between loops
const FLAGGED = STOPS.filter((s) => !s.ok).length;

type Phase = 'look' | 'verdict' | 'summary';

export function PatrolSweepHero() {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>('look');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setI(1);
      setPhase('verdict');
      return;
    }
    if (paused) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'look') t = setTimeout(() => setPhase('verdict'), LOOK_MS);
    else if (phase === 'verdict') t = setTimeout(() => (i === STOPS.length - 1 ? setPhase('summary') : (setI(i + 1), setPhase('look'))), HOLD_MS);
    else t = setTimeout(() => (setI(0), setPhase('look')), SUMMARY_MS);
    return () => clearTimeout(t);
  }, [i, phase, paused, reduceMotion]);

  const stop = STOPS[i];
  const decided = (k: number) => k < i || (k === i && phase !== 'look');
  const flaggedSoFar = STOPS.filter((s, k) => decided(k) && !s.ok).length;
  const label =
    phase === 'summary'
      ? `Round complete, ${STOPS.length} stops checked, ${FLAGGED} flagged, report filed`
      : `Patrol round in progress: stop ${i + 1} of ${STOPS.length}, ${stop.loc}. ${phase === 'look' ? `Checking: ${stop.item}` : `${stop.item}: ${stop.ok ? 'compliant' : 'not compliant, guard notified'}`}`;

  return (
    <figure
      className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden"
      role="img"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-live">
          <Radio className="h-3.5 w-3.5 motion-safe:animate-pulse-dot" aria-hidden="true" />
          Perimeter round
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {phase === 'summary' ? 'complete' : paused ? 'paused' : 'in progress'}
        </span>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-muted-foreground">
          Stop {Math.min(i + 1, STOPS.length)} / {STOPS.length}
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
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: reduceMotion || paused ? 1 : 1.04 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ opacity: { duration: reduceMotion ? 0 : 0.7 }, scale: { duration: STEP_MS / 1000, ease: 'linear' } }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transformOrigin: '50% 60%' }}
          />
        </AnimatePresence>

        {/* The look: a scan band passes over the frame while the system checks it. */}
        {phase === 'look' && !reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary/25 to-transparent"
            initial={{ top: '-16%' }}
            animate={{ top: '100%' }}
            transition={{ duration: LOOK_MS / 1000, ease: 'easeInOut' }}
          />
        )}

        {/* Only the bottom edge is shaded, and only enough for the label. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[hsl(216_22%_4%/0.85)] to-transparent" />

        {/* Camera label */}
        <div className="camera-tile absolute bottom-3 left-3">
          <span className="rounded bg-background/60 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground backdrop-blur-sm">
            {stop.id} · {stop.loc}
          </span>
        </div>

        {/* What the system is doing at this stop: checking, then the verdict. */}
        <AnimatePresence initial={false} mode="wait">
          {phase === 'look' ? (
            <motion.div
              key={`look-${stop.id}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, delay: 0.5 }}
              className="camera-tile absolute right-3 top-3 flex max-w-[85%] items-start gap-2 rounded-lg border border-border/60 bg-[hsl(216_22%_8%/0.8)] px-3 py-2 backdrop-blur-sm"
            >
              <ScanSearch className="mt-0.5 h-4 w-4 shrink-0 text-foreground/80 motion-safe:animate-pulse" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight text-foreground">{stop.item}</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70">Checking…</div>
              </div>
            </motion.div>
          ) : phase === 'verdict' ? (
            <motion.div
              key={`verdict-${stop.id}`}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35 }}
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
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4 }}
              className="camera-tile absolute inset-x-3 top-3 flex items-start gap-3 rounded-lg border border-primary/40 bg-[hsl(216_22%_8%/0.9)] px-4 py-3 shadow-lg backdrop-blur-sm sm:inset-x-auto sm:right-3 sm:max-w-[85%]"
            >
              <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight text-foreground">Round complete · report filed</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                  {STOPS.length} stops checked · {FLAGGED} flagged · guard notified twice
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The stops, with a timeline under the one in progress */}
      <div className="grid grid-cols-6 gap-1.5 p-2 sm:gap-2 sm:p-3">
        {STOPS.map((s, k) => {
          const active = k === i && phase !== 'summary';
          const shown = decided(k) || phase === 'summary';
          return (
            <div
              key={s.id}
              className={`relative aspect-video overflow-hidden rounded-md border transition-colors duration-500 ${
                active ? 'border-primary' : shown ? (s.ok ? 'border-live/40' : 'border-critical/50') : 'border-border'
              }`}
            >
              <img src={s.thumb} alt="" aria-hidden="true" width={480} height={270} loading="lazy" className={`h-full w-full object-cover transition-opacity duration-500 ${active || shown ? 'opacity-100' : 'opacity-70'}`} />
              {shown && (
                <span className="absolute right-1 top-1" aria-hidden="true">
                  {s.ok ? <CheckCircle2 className="h-3.5 w-3.5 text-live drop-shadow" /> : <XCircle className="h-3.5 w-3.5 text-critical drop-shadow" />}
                </span>
              )}
              {active && !reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  key={`${s.id}-${phase}`}
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: phase === 'look' ? '0%' : `${(LOOK_MS / STEP_MS) * 100}%` }}
                  animate={{ width: phase === 'look' ? `${(LOOK_MS / STEP_MS) * 100}%` : '100%' }}
                  transition={{ duration: (phase === 'look' ? LOOK_MS : HOLD_MS) / 1000, ease: 'linear' }}
                />
              )}
            </div>
          );
        })}
      </div>

      <figcaption className="flex items-center justify-between gap-3 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
        <span>Sample round on real camera frames. Interface illustration, not customer footage. Hover to pause.</span>
        <span className="shrink-0 font-mono tabular-nums">{phase === 'summary' ? FLAGGED : flaggedSoFar} flagged</span>
      </figcaption>
    </figure>
  );
}
