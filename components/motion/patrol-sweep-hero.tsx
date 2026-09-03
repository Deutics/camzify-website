'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

/*
 * Frames are synthesized camera views — perspective geometry, IR or low-light grade,
 * grain, scanlines and vignette rendered from vector sources. Deliberately stylized
 * rather than photographic: they read unmistakably as camera feeds without being
 * mistaken for footage from a real customer site, and nothing here is licensed from
 * a third party.
 *
 * Each camera gets the scene that matches its location, so a tile labelled
 * PARKING LOT A shows a parking lot rather than an arbitrary frame.
 */
const FRAME = {
  gate: '06',
  perimeter: '01',
  parking: '04',
  dock: '02',
  warehouse: '05',
  corridor: '03',
} as const;

const cameras = [
  { id: 'CAM 01', loc: 'MAIN GATE', status: 'checked', frame: FRAME.gate },
  { id: 'CAM 02', loc: 'PARKING LOT A', status: 'checked', frame: FRAME.parking },
  { id: 'CAM 03', loc: 'REAR ENTRANCE', status: 'checked', frame: FRAME.gate },
  { id: 'CAM 04', loc: 'LOADING DOCK', status: 'checked', frame: FRAME.dock },
  { id: 'CAM 05', loc: 'WAREHOUSE EAST', status: 'checked', frame: FRAME.warehouse },
  { id: 'CAM 06', loc: 'OFFICE LOBBY', status: 'checked', frame: FRAME.corridor },
  { id: 'CAM 07', loc: 'SERVER ROOM', status: 'fail', frame: FRAME.corridor },
  { id: 'CAM 08', loc: 'STAIRWELL B', status: 'checked', frame: FRAME.corridor },
  { id: 'CAM 09', loc: 'ROOFTOP', status: 'checked', frame: FRAME.perimeter },
  { id: 'CAM 10', loc: 'STORAGE UNIT', status: 'checked', frame: FRAME.warehouse },
  { id: 'CAM 11', loc: 'FIRE EXIT C', status: 'checked', frame: FRAME.corridor },
  { id: 'CAM 12', loc: 'DELIVERY BAY', status: 'checked', frame: FRAME.dock },
];

export function PatrolSweepHero() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [checkedSet, setCheckedSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (prefersReducedMotion) {
      setCheckedSet(new Set(cameras.map((_: any, i: number) => i)));
      return;
    }

    let idx = 0;
    const interval = setInterval(() => {
      setActiveIndex(idx);
      setCheckedSet((prev: Set<number>) => {
        const next = new Set(prev);
        next.add(idx);
        return next;
      });
      idx++;
      if (idx >= (cameras?.length ?? 0)) {
        idx = 0;
        setCheckedSet(new Set());
      }
    }, 1160); // ~14s / 12 tiles

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Scan line */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl">
          <div
            className="absolute inset-y-0 w-0.5 bg-primary shadow-[0_0_20px_4px_rgba(167,1,1,0.4)]"
            style={{
              left: `${((activeIndex + 1) / (cameras?.length ?? 12)) * 100}%`,
              transition: 'left 1.1s linear',
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {(cameras ?? []).map((cam: any, i: number) => {
          const isActive = activeIndex === i;
          const isChecked = checkedSet.has(i);
          const isFail = cam?.status === 'fail' && isChecked;

          return (
            <div
              key={i}
              className={`camera-tile-frame relative overflow-hidden rounded-lg border transition-all duration-300 ${
                isFail
                  ? 'border-critical/60'
                  : isActive
                  ? 'border-primary/60'
                  : isChecked
                  ? 'border-live/30'
                  : 'border-border'
              }`}
            >
              {/* Camera frame + scrim. Dimmed until the sweep reaches this tile, so the
                  grid visibly "wakes up" camera by camera as the round progresses. */}
              <img
                src={`/cam-${cam.frame}.jpg`}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={480}
                height={270}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
                  isActive ? 'opacity-95 saturate-110' : isChecked ? 'opacity-70' : 'opacity-35 saturate-75'
                }`}
              />
              <div aria-hidden="true" className="camera-tile-scrim absolute inset-0" />

              {/*
                `camera-tile` re-declares the color tokens at their dark-surface values
                for everything inside it. The labels sit on a dark camera frame in both
                themes, so they must not follow the page theme — in light mode that
                resolved to near-black text on a dark photograph.
              */}
              <div className="camera-tile relative aspect-video p-2 sm:p-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider sm:text-[10px] ${
                      isFail ? 'text-critical' : isChecked ? 'text-live/90' : 'camera-tile-label'
                    }`}
                  >
                    {cam?.id ?? ''}
                  </span>
                  {isChecked && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isFail ? 'bg-critical animate-pulse-dot' : 'bg-live'
                      }`}
                    />
                  )}
                </div>
                <div className="mt-auto pt-2">
                  <div
                    className={`font-mono text-[8px] uppercase tracking-wider sm:text-[9px] ${
                      isFail
                        ? 'text-critical'
                        : isChecked
                        ? 'camera-tile-label'
                        : 'camera-tile-label-dim'
                    }`}
                  >
                    {cam?.loc ?? ''}
                  </div>
                  {isChecked && (
                    <div
                      className={`mt-1 font-mono text-[8px] uppercase tracking-wider sm:text-[9px] ${
                        isFail ? 'text-critical font-bold' : 'text-live'
                      }`}
                    >
                      {isFail ? 'NOT COMPLIANT · GUARD NOTIFIED' : 'CHECKED ✓'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
