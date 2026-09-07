'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Check, Radio } from 'lucide-react';

/*
 * The hero visual: a live wall of twelve real camera frames, and one patrol round
 * moving across it. This is what the product looks like on an operator's screen, so
 * the wall is shown as a wall: every frame fully visible, small labels, thin borders,
 * and the round marked by a slow pass over the tile it is checking rather than by
 * anything that flashes or bounces.
 *
 * Each stop plays in two phases: a soft scan band passes over the frame in the live
 * colour while the footer names the item being checked, then the verdict lands and
 * holds. Two of the twelve fail, and those are the two the pictures actually show:
 * dock door 1 standing open with a truck on it, and the rear door open. Every other
 * item was checked against its frame by eye. Hovering or focusing the panel pauses it.
 *
 * Nothing is dimmed to make text legible. On the first lap, frames the round has not
 * reached yet sit a touch darker and wake as it arrives; from the second lap on every
 * frame stays lit and only the verdict marks fade out and return, so the end of a round
 * never snaps the wall back to dark. Marks fade rather than mount, for the same reason.
 *
 * `contain: inline-size` on the figure keeps its intrinsic width at zero, so a long
 * footer line (the round-complete summary is the longest) cannot widen the hero's grid
 * column and shove the panel sideways; the panel always takes the width the column gives.
 *
 * SSR safety: timers run in effects only; the server renders the first stop in its
 * "looking" state. Under reduced motion the wall holds on the finished round.
 */
type Stop = { id: string; loc: string; frame: string; item: string; failed?: string };

const STOPS: Stop[] = [
  { id: 'CAM 01', loc: 'Main gate', frame: 'main-gate', item: 'Guard present at the gatehouse' },
  { id: 'CAM 02', loc: 'Parking lot A', frame: 'parking-lot', item: 'Drive lanes clear' },
  { id: 'CAM 03', loc: 'Rear entrance', frame: 'rear-entrance', item: 'Rear door closed', failed: 'Rear door open' },
  { id: 'CAM 04', loc: 'Loading dock', frame: 'loading-dock', item: 'Dock door 1 closed', failed: 'Dock door 1 open' },
  { id: 'CAM 05', loc: 'Warehouse east', frame: 'warehouse-east', item: 'High-visibility vests worn' },
  { id: 'CAM 06', loc: 'Office lobby', frame: 'office-lobby', item: 'Reception desk staffed' },
  { id: 'CAM 07', loc: 'Server room', frame: 'server-room', item: 'Aisle clear of obstructions' },
  { id: 'CAM 08', loc: 'Stairwell B', frame: 'stairwell', item: 'Fire extinguisher in place' },
  { id: 'CAM 09', loc: 'Rooftop plant', frame: 'rooftop', item: 'Hard hats worn on the roof' },
  { id: 'CAM 10', loc: 'Storage corridor', frame: 'storage-unit', item: 'Unit doors closed and locked' },
  { id: 'CAM 11', loc: 'Fire exit C', frame: 'fire-exit', item: 'Exit route clear' },
  { id: 'CAM 12', loc: 'Delivery bay', frame: 'delivery-bay', item: 'Forklift lane clear' },
];

const LOOK_MS = 2200; // the scan pass over the frame
const HOLD_MS = 1100; // the verdict holds before the round moves on
const SUMMARY_MS = 4200; // "round complete" between loops
const FLAGGED = STOPS.filter((s) => s.failed).length;

type Phase = 'look' | 'verdict' | 'summary';

export function PatrolSweepHero() {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>('look');
  const [paused, setPaused] = useState(false);
  // Laps completed. The first lap wakes the wall tile by tile; later laps keep every
  // frame lit and only re-mark the verdicts, so the loop never snaps back to dark.
  const [lap, setLap] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setI(STOPS.length - 1);
      setPhase('summary');
      return;
    }
    if (paused) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'look') t = setTimeout(() => setPhase('verdict'), LOOK_MS);
    else if (phase === 'verdict') t = setTimeout(() => (i === STOPS.length - 1 ? setPhase('summary') : (setI(i + 1), setPhase('look'))), HOLD_MS);
    else t = setTimeout(() => (setLap((l) => l + 1), setI(0), setPhase('look')), SUMMARY_MS);
    return () => clearTimeout(t);
  }, [i, phase, paused, reduceMotion]);

  const stop = STOPS[i];
  const decided = (k: number) => k < i || (k === i && phase !== 'look');
  const done = phase === 'summary' ? STOPS.length : i + (phase === 'verdict' ? 1 : 0);
  const flaggedSoFar = STOPS.filter((s, k) => decided(k) && s.failed).length;

  const message =
    phase === 'summary'
      ? `Round complete · ${STOPS.length} stops checked · ${FLAGGED} notified · report filed`
      : phase === 'look'
        ? `Checking: ${stop.item}`
        : stop.failed
          ? `${stop.failed} · night guard notified`
          : `${stop.item} · compliant`;

  const label =
    phase === 'summary'
      ? `Patrol round complete: ${STOPS.length} camera stops checked, ${FLAGGED} flagged and the guard notified, report filed.`
      : `Patrol round in progress, stop ${i + 1} of ${STOPS.length}, ${stop.loc}. ${message}`;

  return (
    <figure
      className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden [contain:inline-size]"
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

      {/* The wall */}
      <div className="grid grid-cols-3 gap-1.5 bg-[hsl(216_22%_6%)] p-1.5 sm:grid-cols-4 sm:gap-2 sm:p-2" aria-hidden="true">
        {STOPS.map((s, k) => {
          const current = k === i && phase !== 'summary';
          const isDecided = decided(k);
          const looking = current && phase === 'look';
          const failed = isDecided && !!s.failed;
          return (
            <div
              key={s.id}
              className={`camera-tile-frame relative aspect-video overflow-hidden rounded-[5px] border transition-[border-color,box-shadow] duration-500 ${
                failed ? 'border-critical/70' : current ? 'border-live/70 shadow-[0_0_0_1px_hsl(168_100%_42%/0.35)]' : 'border-[hsl(0_0%_100%/0.12)]'
              }`}
            >
              <img
                src={`/hero-cam-${s.frame}-640.webp`}
                alt=""
                width={640}
                height={360}
                loading={k < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ${
                  lap === 0 && !isDecided && !current ? 'brightness-[0.78] saturate-[0.85]' : ''
                }`}
              />
              {/* Only the bottom edge carries a gradient, and only as far as the label needs. */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[hsl(216_22%_4%/0.85)] to-transparent" />

              {/* The scan pass: a soft wash in the live colour, top to bottom, once per stop. */}
              {looking && !reduceMotion && !paused && (
                <div className="pointer-events-none absolute inset-x-0 h-[30%] bg-gradient-to-b from-transparent via-live/15 to-live/45 animate-[tile-sweep_2.2s_ease-in-out_forwards]" />
              )}

              <div className="camera-tile absolute inset-0 flex flex-col justify-between p-1.5 sm:p-2">
                <div className="flex items-start justify-between">
                  <span className={`font-mono text-[8px] uppercase tracking-wider sm:text-[9px] ${failed ? 'text-critical' : 'camera-tile-label-dim'}`}>{s.id}</span>
                  <span className="relative flex h-3 items-center">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-[background-color,opacity] duration-500 ${
                        failed ? 'opacity-0' : isDecided ? 'bg-live' : current ? 'bg-live/70' : 'bg-[hsl(0_0%_100%/0.3)]'
                      }`}
                    />
                    <span
                      className={`absolute right-0 top-0 whitespace-nowrap rounded-sm bg-critical px-1 py-px font-mono text-[7px] uppercase tracking-wider text-white transition-opacity duration-500 sm:text-[8px] ${
                        failed ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      Not compliant
                    </span>
                  </span>
                </div>
                <div className="flex items-end justify-between gap-1">
                  <span className="truncate font-mono text-[8px] uppercase tracking-wider camera-tile-label sm:text-[9px]">{s.loc}</span>
                  <span
                    className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-live text-[hsl(216_22%_6%)] transition-opacity duration-500 ${
                      isDecided && !failed ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer strip: progress and the item being checked, in words. */}
      <div className="flex items-center gap-3 border-t border-border bg-muted/30 px-4 py-2.5">
        <div className="h-1 w-20 shrink-0 overflow-hidden rounded-full bg-border sm:w-28">
          <div className={`h-full rounded-full bg-live ease-out ${done === 0 ? 'transition-none' : 'transition-[width] duration-700'}`} style={{ width: `${(done / STOPS.length) * 100}%` }} />
        </div>
        <span className={`min-w-0 flex-1 truncate font-mono text-[11px] tabular-nums ${phase === 'summary' ? 'text-live' : phase === 'verdict' && stop.failed ? 'text-critical' : 'text-muted-foreground'}`}>
          {message}
        </span>
        <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground sm:inline">
          {flaggedSoFar} flagged
        </span>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
