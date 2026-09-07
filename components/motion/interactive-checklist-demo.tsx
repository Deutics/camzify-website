'use client';

import { useState, useCallback, useMemo } from 'react';
import { Camera, ChevronRight, RotateCcw, Shield, CheckCircle, XCircle, FileText, Lock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * The manual patrol round, as the product actually runs it.
 *
 * The earlier version let a visitor mark an item Not Compliant and walk away, which
 * inverted the single most important rule of a real round: an item cannot be left
 * failing. Once it is marked Not Compliant the operator is offered the guard message,
 * and the item then has to be resolved — either fixed and re-verified against a fresh
 * snapshot, or held as Pending with a written reason. The round will not close until
 * every item has an answer, which is why the finish control is locked rather than
 * merely discouraged.
 *
 * That rule is the product's argument in miniature. A paper round can be handed in with
 * a blank line on it; this one cannot, and the report carries the before and after
 * frames to show what changed.
 *
 * Scoring follows the application: Compliant and Fixed both count as compliant, and a
 * Pending item counts against the percentage. Pending is an honest way to close a round
 * with the problem recorded, not a way to make it disappear.
 */
interface DemoItem {
  label: string;
  /** The message offered to the guard when this item fails. */
  guardMsg: string;
}

interface DemoCamera {
  id: string;
  name: string;
  zone: string;
  guard: string;
  /** The frame as found. See public/cam-*.jpg. */
  frame: string;
  /** The same camera after rectification. See scripts/assets/camera-frame-*-after.html. */
  afterFrame: string;
  frameAlt: string;
  afterAlt: string;
  items: DemoItem[];
}

const demoCameras: DemoCamera[] = [
  {
    id: 'CAM 01',
    name: 'Main Gate',
    zone: 'PERIMETER',
    guard: 'Ahmad K.',
    frame: '/cam-06.jpg',
    afterFrame: '/cam-06-after.jpg',
    frameAlt: 'Gate camera showing the sliding gate part open with a person walking through',
    afterAlt: 'The same gate camera after the gate has been closed across the full opening',
    items: [
      { label: 'Gate fully closed', guardMsg: 'Gate left open after delivery — close and secure immediately.' },
      { label: 'No tailgating observed', guardMsg: 'Possible tailgating at the gate — verify the entry log.' },
    ],
  },
  {
    id: 'CAM 04',
    name: 'Loading Dock',
    zone: 'LOGISTICS',
    guard: 'Priya R.',
    frame: '/cam-02.jpg',
    afterFrame: '/cam-02-after.jpg',
    frameAlt: 'Loading dock camera showing three bay doors with the middle bay open and a pallet on the floor',
    afterAlt: 'The same dock camera after the bay has been shut and the floor cleared',
    items: [
      { label: 'Dock door secured', guardMsg: 'Dock door unsecured — lock it and confirm.' },
      { label: 'No unauthorized persons in zone', guardMsg: 'Unregistered person at the dock — investigate.' },
    ],
  },
  {
    id: 'CAM 09',
    name: 'Server Room Corridor',
    zone: 'RESTRICTED',
    guard: 'David L.',
    frame: '/cam-03.jpg',
    afterFrame: '/cam-03-after.jpg',
    frameAlt: 'Corridor camera showing a person mid-corridor with doors along one wall',
    afterAlt: 'The same corridor camera once the corridor is clear',
    items: [
      { label: 'Corridor clear of obstructions', guardMsg: 'Obstruction in the corridor — clear it for fire safety.' },
      { label: 'Access door closed', guardMsg: 'Server room door ajar — secure it immediately.' },
    ],
  },
];

/** Where an item currently sits. `failed` is a staging state, not a final answer. */
type Stage = 'unanswered' | 'notify' | 'failed' | 'resolved';

interface ItemState {
  stage: Stage;
  /** Final answer once resolved. */
  outcome?: 'compliant' | 'fixed' | 'pending';
  /** null until the notify question has been answered. */
  notified?: boolean;
  reason?: string;
  at?: string;
}

/**
 * Wall-clock time of a check, as HH:MM:SS. Only ever called from an event handler and
 * stored in state, never computed during render — a clock read in render is a hydration
 * mismatch. Formatted by hand so it does not pick up the runtime's locale either.
 */
function captureTime(): string {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
}

const KEY = (camId: string, i: number) => `${camId}#${i}`;

export function InteractiveChecklistDemo() {
  const [cameraIndex, setCameraIndex] = useState(0);
  const [state, setState] = useState<Record<string, ItemState>>({});
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<'patrol' | 'report'>('patrol');

  const currentCam = demoCameras[cameraIndex] ?? demoCameras[0];

  const get = useCallback(
    (camId: string, i: number): ItemState => state[KEY(camId, i)] ?? { stage: 'unanswered' },
    [state]
  );
  const set = useCallback((camId: string, i: number, patch: Partial<ItemState>) => {
    setState((prev) => ({ ...prev, [KEY(camId, i)]: { ...(prev[KEY(camId, i)] ?? { stage: 'unanswered' }), ...patch } }));
  }, []);

  const camResolved = (cam: DemoCamera) => cam.items.every((_, i) => get(cam.id, i).stage === 'resolved');
  const allResolved = demoCameras.every(camResolved);
  const outstanding = demoCameras.reduce(
    (n, cam) => n + cam.items.filter((_, i) => get(cam.id, i).stage !== 'resolved').length,
    0
  );

  const handleReset = useCallback(() => {
    setCameraIndex(0);
    setState({});
    setDraft({});
    setPhase('patrol');
  }, []);

  const score = useMemo(() => {
    const all = demoCameras.flatMap((cam) => cam.items.map((_, i) => get(cam.id, i)));
    const total = all.length;
    const ok = all.filter((s) => s.outcome === 'compliant' || s.outcome === 'fixed').length;
    const pending = all.filter((s) => s.outcome === 'pending').length;
    return { total, ok, pending, percent: total ? Math.round((ok / total) * 100) : 0 };
  }, [get]);

  return (
    <div className="mx-auto max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-mono text-mono-md uppercase">
              {phase === 'patrol' ? 'Patrol round in progress' : 'Patrol compliance report'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {phase === 'patrol' && (
              <span className="font-mono text-mono-sm text-muted-foreground">
                {cameraIndex + 1} / {demoCameras.length}
              </span>
            )}
            <button
              onClick={handleReset}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Restart the demo"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: phase === 'report'
                ? '100%'
                : `${((score.total - outstanding) / score.total) * 100}%`,
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {phase === 'patrol' ? (
            <motion.div
              key={currentCam.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-5"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg border border-border">
                <img src={currentCam.frame} alt={currentCam.frameAlt} width={480} height={270} className="w-full" />
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-2.5">
                  <span className="flex items-center gap-1.5 rounded bg-background/75 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-live backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-live motion-safe:animate-pulse-dot" />
                    Live
                  </span>
                  <span className="rounded bg-background/75 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                    {currentCam.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Camera className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-mono text-mono-sm text-muted-foreground">
                    {currentCam.id} · {currentCam.zone} · Guard: {currentCam.guard}
                  </div>
                  <div className="font-display text-lg font-bold">{currentCam.name}</div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {currentCam.items.map((item, i) => {
                  const st = get(currentCam.id, i);
                  const key = KEY(currentCam.id, i);
                  const tone =
                    st.outcome === 'compliant' || st.outcome === 'fixed'
                      ? 'border-live/30 bg-live/5'
                      : st.outcome === 'pending'
                      ? 'border-warn/40 bg-warn/5'
                      : st.stage === 'unanswered'
                      ? 'border-border'
                      : 'border-critical/30 bg-critical/5';

                  return (
                    <div key={key} className={`rounded-xl border p-4 transition-all duration-200 ${tone}`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium">{item.label}</span>
                        {st.outcome && (
                          <span
                            className={`shrink-0 font-mono text-mono-sm uppercase ${
                              st.outcome === 'pending' ? 'text-warn' : 'text-live'
                            }`}
                          >
                            {st.outcome === 'compliant' ? '✓ Compliant' : st.outcome === 'fixed' ? '✓ Fixed & verified' : '⚠ Still pending'}
                          </span>
                        )}
                      </div>

                      {/* 1 — the verdict */}
                      {st.stage === 'unanswered' && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => set(currentCam.id, i, { stage: 'resolved', outcome: 'compliant', at: captureTime() })}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-live/15 px-3 py-2.5 text-sm font-medium text-live transition-all hover:bg-live/25"
                          >
                            <CheckCircle className="h-4 w-4" aria-hidden="true" />
                            Compliant
                          </button>
                          <button
                            onClick={() => set(currentCam.id, i, { stage: 'notify', at: captureTime() })}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-critical/15 px-3 py-2.5 text-sm font-medium text-critical transition-all hover:bg-critical/25"
                          >
                            <XCircle className="h-4 w-4" aria-hidden="true" />
                            Not Compliant
                          </button>
                        </div>
                      )}

                      {/* 2 — the guard message */}
                      {st.stage === 'notify' && (
                        <div className="mt-3">
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            Snapshot captured. Notify {currentCam.guard}? &ldquo;{item.guardMsg}&rdquo;
                          </p>
                          <div className="mt-2.5 flex gap-2">
                            <button
                              onClick={() => set(currentCam.id, i, { stage: 'failed', notified: true })}
                              className="flex-1 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                            >
                              Send message
                            </button>
                            <button
                              onClick={() => set(currentCam.id, i, { stage: 'failed', notified: false })}
                              className="flex-1 rounded-lg border border-border px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent"
                            >
                              Don&rsquo;t send
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 3 — resolve it: fixed, or pending with a reason */}
                      {st.stage === 'failed' && (
                        <div className="mt-3">
                          <p className="font-mono text-mono-sm text-critical">
                            {st.notified ? `▶ Guard notified: ${item.guardMsg}` : '▶ Marked not compliant — guard not notified'}
                          </p>
                          <div className="mt-2.5 flex gap-2">
                            <button
                              onClick={() => set(currentCam.id, i, { stage: 'resolved', outcome: 'fixed' })}
                              className="flex-1 rounded-lg bg-live/15 px-3 py-2.5 text-sm font-medium text-live transition-all hover:bg-live/25"
                            >
                              Mark fixed
                            </button>
                            <button
                              onClick={() =>
                                set(currentCam.id, i, {
                                  stage: 'resolved',
                                  outcome: 'pending',
                                  reason: (draft[key] ?? '').trim() || 'No reason given',
                                })
                              }
                              className="flex-1 rounded-lg border border-warn/40 bg-warn/10 px-3 py-2.5 text-sm font-medium text-warn transition-all hover:bg-warn/20"
                            >
                              Keep pending
                            </button>
                          </div>
                          <label className="mt-2.5 block">
                            <span className="sr-only">Reason the issue is still pending</span>
                            <input
                              type="text"
                              value={draft[key] ?? ''}
                              onChange={(e) => setDraft((p) => ({ ...p, [key]: e.target.value }))}
                              placeholder="Reason the issue is still pending…"
                              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                          </label>
                        </div>
                      )}

                      {st.outcome === 'pending' && st.reason && (
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          Reason: {st.reason}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* The rule that makes the round worth anything: it cannot be left half-answered. */}
              <div className="mt-5">
                {camResolved(currentCam) ? (
                  cameraIndex < demoCameras.length - 1 ? (
                    <button
                      onClick={() => setCameraIndex((p) => p + 1)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      Next camera
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setPhase('report')}
                      disabled={!allResolved}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {allResolved ? 'End patrol & generate report' : <><Lock className="h-4 w-4" aria-hidden="true" /> End patrol</>}
                    </button>
                  )
                ) : (
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Every item needs an answer before the round can move on. A failed item is
                      either fixed and re-checked, or held as pending with a reason.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="report" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-mono text-mono-sm uppercase text-muted-foreground">Manual patrol · completed</div>
                  <div className="font-display text-lg font-bold">Patrol Compliance Report</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div
                  className={`inline-flex h-24 w-24 items-center justify-center rounded-full border-4 ${
                    score.percent >= 80 ? 'border-live text-live' : score.percent >= 50 ? 'border-warn text-warn' : 'border-critical text-critical'
                  }`}
                >
                  <span className="font-display text-3xl font-bold">{score.percent}%</span>
                </div>
                <p className="mt-2 font-mono text-mono-sm uppercase text-muted-foreground">Overall compliance</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full bg-live/15 px-3 py-1 text-xs font-medium text-live">
                    {score.ok} compliant / fixed
                  </span>
                  <span className="rounded-full bg-warn/15 px-3 py-1 text-xs font-medium text-warn">
                    {score.pending} pending
                  </span>
                </div>
                {score.pending > 0 && (
                  <p className="mx-auto mt-3 flex max-w-sm items-start gap-1.5 text-left text-xs leading-relaxed text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warn" aria-hidden="true" />
                    A pending item counts against the score. The round closes with the problem on
                    the record rather than written off.
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h4 className="font-mono text-mono-sm uppercase text-muted-foreground">Evidence attached</h4>
                <ul className="mt-3 space-y-2.5">
                  {demoCameras.map((cam) => {
                    const results = cam.items.map((_, i) => get(cam.id, i));
                    const ok = results.filter((s) => s.outcome === 'compliant' || s.outcome === 'fixed').length;
                    const clean = ok === cam.items.length;
                    const anyFixed = results.some((s) => s.outcome === 'fixed');
                    return (
                      <li key={cam.id} className={`rounded-xl border p-3 ${clean ? 'border-border bg-muted/20' : 'border-warn/30 bg-warn/5'}`}>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="truncate text-sm font-medium">{cam.name}</span>
                          <span className={`shrink-0 font-mono text-mono-sm ${clean ? 'text-live' : 'text-warn'}`}>
                            {ok}/{cam.items.length} OK
                          </span>
                        </div>

                        <div className="mt-2 flex gap-2">
                          <figure className="relative w-28 shrink-0">
                            <img src={cam.frame} alt={cam.frameAlt} width={112} height={64} className="h-[64px] w-full rounded-md border border-border object-cover" />
                            <figcaption className="mt-1 text-center font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                              {anyFixed ? 'Before' : 'Proof'}
                            </figcaption>
                          </figure>
                          {anyFixed && (
                            <figure className="relative w-28 shrink-0">
                              <img src={cam.afterFrame} alt={cam.afterAlt} width={112} height={64} className="h-[64px] w-full rounded-md border border-border object-cover" />
                              <figcaption className="mt-1 text-center font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                                After
                              </figcaption>
                            </figure>
                          )}
                          <ul className="min-w-0 flex-1 space-y-1">
                            {cam.items.map((item, i) => {
                              const st = results[i];
                              const good = st.outcome === 'compliant' || st.outcome === 'fixed';
                              return (
                                <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-muted-foreground">
                                  <span aria-hidden="true" className={`mt-px font-mono ${good ? 'text-live' : 'text-warn'}`}>
                                    {good ? '✓' : '⚠'}
                                  </span>
                                  <span className="min-w-0">
                                    {item.label}
                                    {st.outcome === 'fixed' && <span className="text-live"> — fixed</span>}
                                    {st.outcome === 'pending' && <span className="text-warn"> — pending</span>}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  A fixed item carries the frame as found and the frame after the guard dealt with
                  it, so the report proves the problem was closed rather than only reported.
                </p>
              </div>

              <div className="mt-6 flex gap-2">
                <a
                  href="/book-a-demo"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Book a Demo
                </a>
                <button
                  onClick={handleReset}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium transition-all hover:bg-accent"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Run again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
