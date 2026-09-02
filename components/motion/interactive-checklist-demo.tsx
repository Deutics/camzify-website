'use client';

import { useState, useCallback } from 'react';
import { Camera, ChevronRight, RotateCcw, Shield, CheckCircle, XCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoCamera {
  id: string;
  name: string;
  zone: string;
  /** Scene shown while the operator judges this stop. See public/cam-*.jpg. */
  frame: string;
  frameAlt: string;
  items: { label: string; guard: string; guardMsg: string }[];
}

const demoCameras: DemoCamera[] = [
  {
    id: 'CAM 01',
    name: 'Main Gate',
    zone: 'PERIMETER',
    frame: '/cam-06.jpg',
    frameAlt: 'Camera view of a site entrance gate at night, partly open, with a person approaching',
    items: [
      { label: 'Gate fully closed', guard: 'Ahmad K.', guardMsg: 'Gate left open after delivery — close immediately.' },
      { label: 'No tailgating observed', guard: 'Ahmad K.', guardMsg: 'Possible tailgating incident — verify entry log.' },
    ],
  },
  {
    id: 'CAM 04',
    name: 'Loading Dock',
    zone: 'LOGISTICS',
    frame: '/cam-02.jpg',
    frameAlt: 'Camera view of a loading dock with three bay doors, one open, and a pallet on the floor',
    items: [
      { label: 'Dock door secured', guard: 'Priya R.', guardMsg: 'Dock door unsecured — lock and report.' },
      { label: 'No unauthorised persons in zone', guard: 'Priya R.', guardMsg: 'Unregistered person at dock — investigate.' },
    ],
  },
  {
    id: 'CAM 09',
    name: 'Server Room Corridor',
    zone: 'RESTRICTED',
    frame: '/cam-03.jpg',
    frameAlt: 'Camera view down an interior corridor with doors along one wall and a person mid-corridor',
    items: [
      { label: 'Corridor clear of obstructions', guard: 'David L.', guardMsg: 'Obstruction in corridor — clear for fire safety.' },
      { label: 'Access door closed', guard: 'David L.', guardMsg: 'Server room door ajar — secure immediately.' },
    ],
  },
];

type ItemStatus = 'compliant' | 'not-compliant' | 'pending';

export function InteractiveChecklistDemo() {
  const [cameraIndex, setCameraIndex] = useState(0);
  const [results, setResults] = useState<Record<string, Record<number, ItemStatus>>>({});
  const [phase, setPhase] = useState<'patrol' | 'report'>('patrol');

  const currentCam = demoCameras[cameraIndex] ?? demoCameras[0];
  const camResults = results[currentCam?.id ?? ''] ?? {};
  const allItemsAnswered = (currentCam?.items ?? []).every((_: any, i: number) => camResults[i] !== undefined);

  const handleAnswer = useCallback(
    (itemIndex: number, status: ItemStatus) => {
      setResults((prev: any) => ({
        ...(prev ?? {}),
        [currentCam?.id ?? '']: {
          ...((prev ?? {})[currentCam?.id ?? ''] ?? {}),
          [itemIndex]: status,
        },
      }));
    },
    [currentCam?.id]
  );

  const handleNext = useCallback(() => {
    if (cameraIndex < (demoCameras?.length ?? 0) - 1) {
      setCameraIndex((p: number) => p + 1);
    } else {
      setPhase('report');
    }
  }, [cameraIndex]);

  const handleReset = useCallback(() => {
    setCameraIndex(0);
    setResults({});
    setPhase('patrol');
  }, []);

  // Calculate report
  const totalItems = (demoCameras ?? []).reduce((sum: number, cam: DemoCamera) => sum + (cam?.items?.length ?? 0), 0);
  const compliantCount = Object.values(results ?? {}).reduce((sum: number, camR: any) => {
    return sum + Object.values(camR ?? {}).filter((s: any) => s === 'compliant').length;
  }, 0);
  const compliancePercent = totalItems > 0 ? Math.round((compliantCount / totalItems) * 100) : 0;

  return (
    <div className="mx-auto max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-mono text-mono-md uppercase">
              {phase === 'patrol' ? 'PATROL ROUND IN PROGRESS' : 'PATROL REPORT'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {phase === 'patrol' && (
              <span className="font-mono text-mono-sm text-muted-foreground">
                {cameraIndex + 1} / {demoCameras?.length ?? 0}
              </span>
            )}
            <button
              onClick={handleReset}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Reset demo"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: phase === 'report'
                ? '100%'
                : `${((cameraIndex + (allItemsAnswered ? 1 : 0)) / (demoCameras?.length ?? 1)) * 100}%`,
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {phase === 'patrol' ? (
            <motion.div
              key={currentCam?.id ?? ''}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-5"
            >
              {/*
                The live view. Without it the demo asked the visitor to rule on
                "gate fully closed" with nothing to look at, which is not what the
                real product does — a manual round shows the footage and the operator
                judges against it.
              */}
              <div className="relative mb-4 overflow-hidden rounded-lg border border-border">
                <img
                  src={currentCam?.frame ?? '/cam-01.jpg'}
                  alt={currentCam?.frameAlt ?? ''}
                  width={480}
                  height={270}
                  className="w-full"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-2.5">
                  <span className="flex items-center gap-1.5 rounded bg-background/75 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-live backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-live motion-safe:animate-pulse-dot" />
                    Live
                  </span>
                  <span className="rounded bg-background/75 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                    {currentCam?.id ?? ''}
                  </span>
                </div>
              </div>

              {/* Camera info */}
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Camera className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-mono-sm text-muted-foreground">
                    {currentCam?.id ?? ''} · {currentCam?.zone ?? ''}
                  </div>
                  <div className="font-display text-lg font-bold">
                    {currentCam?.name ?? ''}
                  </div>
                </div>
              </div>

              {/* Checklist items */}
              <div className="mt-5 space-y-3">
                {(currentCam?.items ?? []).map((item: any, i: number) => {
                  const status = camResults[i];
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border p-4 transition-all duration-200 ${
                        status === 'compliant'
                          ? 'border-live/30 bg-live/5'
                          : status === 'not-compliant'
                          ? 'border-critical/30 bg-critical/5'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item?.label ?? ''}</span>
                        {status && (
                          <span
                            className={`font-mono text-mono-sm uppercase ${
                              status === 'compliant' ? 'text-live' : 'text-critical'
                            }`}
                          >
                            {status === 'compliant' ? '✓ PASS' : '✗ FAIL'}
                          </span>
                        )}
                      </div>
                      {!status && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => handleAnswer(i, 'compliant')}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-live/15 px-3 py-2.5 text-sm font-medium text-live transition-all hover:bg-live/25"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Compliant
                          </button>
                          <button
                            onClick={() => handleAnswer(i, 'not-compliant')}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-critical/15 px-3 py-2.5 text-sm font-medium text-critical transition-all hover:bg-critical/25"
                          >
                            <XCircle className="h-4 w-4" />
                            Not Compliant
                          </button>
                        </div>
                      )}
                      {status === 'not-compliant' && (
                        <div className="mt-2 rounded-md bg-critical/10 px-3 py-2 font-mono text-mono-sm text-critical">
                          ▶ GUARD NOTIFIED: {item?.guardMsg ?? ''}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Next button */}
              {allItemsAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5"
                >
                  <button
                    onClick={handleNext}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    {cameraIndex < (demoCameras?.length ?? 0) - 1 ? 'Next Camera' : 'View Report'}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="report"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-mono-sm text-muted-foreground">COMPLETED</div>
                  <div className="font-display text-lg font-bold">Patrol Report Card</div>
                </div>
              </div>

              {/* Compliance score */}
              <div className="mt-6 text-center">
                <div
                  className={`inline-flex h-24 w-24 items-center justify-center rounded-full border-4 ${
                    compliancePercent >= 80
                      ? 'border-live text-live'
                      : compliancePercent >= 50
                      ? 'border-warn text-warn'
                      : 'border-critical text-critical'
                  }`}
                >
                  <span className="font-display text-3xl font-bold">{compliancePercent}%</span>
                </div>
                <p className="mt-2 font-mono text-mono-sm text-muted-foreground uppercase">
                  Compliance Score
                </p>
              </div>

              {/* Per-camera results */}
              <div className="mt-6 space-y-2">
                {(demoCameras ?? []).map((cam: DemoCamera) => {
                  const camR = results[cam?.id ?? ''] ?? {};
                  const passed = Object.values(camR ?? {}).filter((s: any) => s === 'compliant').length;
                  const total = cam?.items?.length ?? 0;
                  return (
                    <div key={cam?.id ?? ''} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div>
                        <span className="font-mono text-mono-sm text-muted-foreground">{cam?.id ?? ''}</span>
                        <span className="mx-2 text-muted-foreground/40">·</span>
                        <span className="text-sm font-medium">{cam?.name ?? ''}</span>
                      </div>
                      <span
                        className={`font-mono text-mono-sm ${
                          passed === total ? 'text-live' : 'text-critical'
                        }`}
                      >
                        {passed}/{total} PASSED
                      </span>
                    </div>
                  );
                })}
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
                  <RotateCcw className="h-3.5 w-3.5" />
                  Run Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
