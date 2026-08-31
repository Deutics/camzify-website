'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const cameras = [
  { id: 'CAM 01', loc: 'MAIN GATE', status: 'checked' },
  { id: 'CAM 02', loc: 'PARKING LOT A', status: 'checked' },
  { id: 'CAM 03', loc: 'REAR ENTRANCE', status: 'checked' },
  { id: 'CAM 04', loc: 'LOADING DOCK', status: 'checked' },
  { id: 'CAM 05', loc: 'WAREHOUSE EAST', status: 'checked' },
  { id: 'CAM 06', loc: 'OFFICE LOBBY', status: 'checked' },
  { id: 'CAM 07', loc: 'SERVER ROOM', status: 'fail' },
  { id: 'CAM 08', loc: 'STAIRWELL B', status: 'checked' },
  { id: 'CAM 09', loc: 'ROOFTOP', status: 'checked' },
  { id: 'CAM 10', loc: 'STORAGE UNIT', status: 'checked' },
  { id: 'CAM 11', loc: 'FIRE EXIT C', status: 'checked' },
  { id: 'CAM 12', loc: 'DELIVERY BAY', status: 'checked' },
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
              className={`relative overflow-hidden rounded-lg border transition-all duration-300 ${
                isFail
                  ? 'border-critical/60 bg-critical/10'
                  : isActive
                  ? 'border-primary/60 bg-primary/10'
                  : isChecked
                  ? 'border-live/30 bg-live/5'
                  : 'border-border bg-card/50'
              }`}
            >
              <div className="aspect-video p-2 sm:p-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider sm:text-[10px] ${
                      isFail ? 'text-critical' : isChecked ? 'text-live/80' : 'text-muted-foreground/50'
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
                        ? 'text-foreground/70'
                        : 'text-muted-foreground/30'
                    }`}
                  >
                    {cam?.loc ?? ''}
                  </div>
                  {isChecked && (
                    <div
                      className={`mt-1 font-mono text-[8px] uppercase tracking-wider sm:text-[9px] ${
                        isFail ? 'text-critical font-bold' : 'text-live/70'
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
