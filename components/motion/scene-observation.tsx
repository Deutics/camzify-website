'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Eye, Camera, CheckCircle, HelpCircle } from 'lucide-react';

/**
 * Scene observation, shown rather than described.
 *
 * The claim — that an automated round can watch a camera for a few seconds instead of
 * judging one still — is abstract until you see the case where it changes the answer.
 * So both modes run on the same corridor at the same moment: a single frame sees a
 * person in a restricted corridor and can only say "someone is there", while a few
 * seconds of watching sees them walk out and closes it without waking anybody.
 *
 * The frames are the demo's own corridor scene and its cleared counterpart, so nothing
 * here is a mock-up of footage that does not exist elsewhere on the site.
 *
 * The loop is driven from useEffect, never from render — a timer read during render is
 * a hydration mismatch. With prefers-reduced-motion the sequence is not animated at
 * all: it renders in its resolved state, which is the state that carries the meaning.
 */
const TICKS = 4;
const TICK_MS = 1300;

export function SceneObservation() {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setTick(TICKS - 1);
      return;
    }
    const id = setInterval(() => setTick((t) => (t + 1) % (TICKS + 1)), TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const elapsed = Math.min(tick, TICKS - 1);
  const cleared = elapsed >= 2;
  const resolved = elapsed >= TICKS - 1;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Single frame */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Single frame</span>
        </div>
        <p className="mt-1 text-sm font-medium">One snapshot per stop</p>

        <div className="relative mt-4 overflow-hidden rounded-lg border border-border">
          <img
            src="/cam-03.jpg"
            alt="Corridor camera showing a person mid-corridor"
            width={480}
            height={270}
            className="w-full"
          />
          <span className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            00:00
          </span>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-warn/30 bg-warn/5 p-3">
          <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-warn">Someone is in the corridor.</span> Passing
            through, or standing there? One frame cannot tell you, so it either wakes a guard for
            nothing or lets a real one go.
          </p>
        </div>
      </div>

      {/* Watch for a while */}
      <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-lg shadow-primary/5">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-mono text-mono-sm uppercase text-primary">Watch for a while</span>
        </div>
        <p className="mt-1 text-sm font-medium">A few seconds of live video per stop</p>

        <div className="relative mt-4 overflow-hidden rounded-lg border border-border">
          <img
            src={cleared ? '/cam-03-after.jpg' : '/cam-03.jpg'}
            alt={cleared ? 'The same corridor once it is clear' : 'Corridor camera showing a person mid-corridor'}
            width={480}
            height={270}
            className="w-full"
          />
          <span className="absolute right-2 top-2 flex items-center gap-1.5 rounded bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-primary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse-dot" />
            00:0{elapsed}
          </span>
          {/* Observation progress across the watch window. */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-background/40">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${((elapsed + 1) / TICKS) * 100}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: TICKS }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= elapsed ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div
          className={`mt-3 flex items-start gap-2 rounded-lg border p-3 transition-colors duration-300 ${
            resolved ? 'border-live/30 bg-live/5' : 'border-border bg-muted/20'
          }`}
        >
          {resolved ? (
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-live" aria-hidden="true" />
          ) : (
            <Eye className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          )}
          <p className="text-xs leading-relaxed text-muted-foreground">
            {resolved ? (
              <>
                <span className="font-medium text-live">Walked through and left.</span> Corridor
                clear, checklist item passed, nobody woken. The same watch window is what catches
                the person who does not leave.
              </>
            ) : (
              <>Observing the scene before deciding&hellip;</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
