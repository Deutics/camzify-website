'use client';

import { useState, useEffect } from 'react';
import { SiteImage } from '@/components/content/site-image';
import { motion, useReducedMotion } from 'framer-motion';
import { Eye, Camera, CheckCircle, HelpCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

/**
 * Scene observation, shown rather than described.
 *
 * The claim — that an automated round can watch a camera for a few seconds instead of
 * judging one still — is abstract until you see the case where it changes the answer.
 * So both modes run on the same corridor at the same moment: a single frame sees a
 * person in a restricted corridor and can only say "someone is there", while a few
 * seconds of watching sees them walk out and closes it without waking anybody.
 *
 * The single frame is served as its JPEG source: at 60,860 bytes it sits just under the
 * pipeline's 60KB threshold, so no WebP ladder exists for it and the 640px variant the
 * component once pointed at was a 404.
 *
 * The frames are the business's own corridor stills: one still for the single-frame
 * case, and four consecutive frames for the watch window, in which the person walks
 * the length of the corridor and out.
 *
 * The loop is driven from useEffect, never from render — a timer read during render is
 * a hydration mismatch. With prefers-reduced-motion the sequence is not animated at
 * all: it renders in its resolved state, which is the state that carries the meaning.
 *
 * `locale="de"` switches the explanatory prose and alt text to German (the German home
 * passes it through AutoPatrolSection). The default is English, so every other page that
 * uses this component renders exactly as before. The timestamps are not prose.
 */
const TICKS = 4;
const TICK_MS = 1300;

const COPY = {
  en: {
    singleLabel: 'Single frame',
    singleTitle: 'One snapshot per stop',
    singleAlt: 'Corridor camera showing a person mid-corridor',
    singleLead: 'Someone is in the corridor.',
    singleRest:
      ' Passing through, or standing there? One frame cannot tell you, so it either wakes a guard for nothing or lets a real one go.',
    watchLabel: 'Watch for a while',
    watchTitle: 'A few seconds of live video per stop',
    watchAltCleared: 'The same corridor a few seconds later, the person walking out',
    watchAltTracked: 'Corridor camera showing a person mid-corridor, tracked',
    resolvedLead: 'Walked through and left.',
    resolvedRest:
      ' Corridor clear, checklist item passed, nobody woken. The same watch window is what catches the person who does not leave.',
    observing: 'Observing the scene before deciding…',
  },
  de: {
    singleLabel: 'Einzelbild',
    singleTitle: 'Ein Standbild je Kontrollpunkt',
    singleAlt: 'Flurkamera mit einer Person in der Mitte des Flurs',
    singleLead: 'Jemand ist im Flur.',
    singleRest:
      ' Geht die Person durch, oder steht sie dort? Ein einzelnes Bild kann das nicht sagen: Es weckt entweder eine Wachperson umsonst oder lässt einen echten Vorfall durch.',
    watchLabel: 'Eine Weile beobachten',
    watchTitle: 'Einige Sekunden Live-Video je Kontrollpunkt',
    watchAltCleared: 'Derselbe Flur einige Sekunden später, die Person geht hinaus',
    watchAltTracked: 'Flurkamera mit einer Person in der Mitte des Flurs, verfolgt',
    resolvedLead: 'Durchgegangen und hinaus.',
    resolvedRest:
      ' Flur frei, Checklistenpunkt erfüllt, niemand geweckt. Dasselbe Beobachtungsfenster erfasst auch die Person, die nicht wieder geht.',
    observing: 'Die Szene wird beobachtet, bevor entschieden wird…',
  },
} as const;

export function SceneObservation({ locale = 'en' }: { locale?: Locale } = {}) {
  const c = COPY[locale];
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
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">{c.singleLabel}</span>
        </div>
        <p className="mt-1 text-sm font-medium">{c.singleTitle}</p>

        <div className="relative mt-4 overflow-hidden rounded-lg border border-border">
          <SiteImage
            src="/scene-single-frame"
            alt={c.singleAlt}
            width={480}
            height={270}
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full"
          />
          <span className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            00:00
          </span>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-warn/30 bg-warn/5 p-3">
          <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-warn">{c.singleLead}</span>{c.singleRest}
          </p>
        </div>
      </div>

      {/* Watch for a while */}
      <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-lg shadow-primary/5">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-mono text-mono-sm uppercase text-primary">{c.watchLabel}</span>
        </div>
        <p className="mt-1 text-sm font-medium">{c.watchTitle}</p>

        <div className="relative mt-4 overflow-hidden rounded-lg border border-border">
          <img
            src={`/scene-watch-0${elapsed + 1}-640.webp`}
            alt={cleared ? c.watchAltCleared : c.watchAltTracked}
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
                <span className="font-medium text-live">{c.resolvedLead}</span>{c.resolvedRest}
              </>
            ) : (
              <>{c.observing}</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
