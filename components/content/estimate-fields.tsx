'use client';

import { useMemo, useState } from 'react';
import { ESTIMATE_DISCLAIMER, estimateMonthly, formatUsd, LIST_RATES, type EstimateInput } from '@/lib/pricing-estimates';

/*
 * The five configuration inputs and the live estimate they produce, shared by the
 * pricing page estimator and the demo form. The inputs carry no `name` on purpose: the
 * surrounding form merges the values in its onSubmit, which keeps them from colliding
 * with the demo form's own "cameras" field and from submitting while collapsed.
 */
export const DEFAULT_CONFIG: EstimateInput = { cameras: 20, patrolCameras: 10, standardInstances: 10, premiumInstances: 0, storageTb: 4 };

const FIELDS: { key: keyof EstimateInput; label: string; hint: string; max: number }[] = [
  { key: 'cameras', label: 'Cameras to connect', hint: `A stream instance each, ${formatUsd(LIST_RATES.streamInstance)} a month. Motion and camera tampering detection are included.`, max: 5000 },
  { key: 'patrolCameras', label: 'Cameras on patrol rounds', hint: `A virtual patrolling instance each, ${formatUsd(LIST_RATES.patrolInstance)} a month, for manual and automated rounds.`, max: 5000 },
  { key: 'standardInstances', label: 'Detection instances', hint: `Intrusion, loitering, PPE, parking and the rest: up to ${formatUsd(LIST_RATES.standardDetection)} a month each. One instance is one feature on one camera.`, max: 20000 },
  { key: 'premiumInstances', label: 'Behavioral anomaly or weapons instances', hint: `About ${formatUsd(LIST_RATES.premiumDetection)} a month each.`, max: 5000 },
  { key: 'storageTb', label: 'Cloud storage (TB)', hint: `About ${formatUsd(LIST_RATES.storagePerTb)} per TB a month, spent as you set retention per camera.`, max: 10000 },
];

export function useEstimate(initial: EstimateInput = DEFAULT_CONFIG) {
  const [config, setConfig] = useState<EstimateInput>(initial);
  const estimate = useMemo(() => estimateMonthly(config), [config]);
  const set = (key: keyof EstimateInput, value: number) => setConfig((c) => ({ ...c, [key]: value }));
  return { config, estimate, set };
}

export function EstimateFields({ config, onChange, compact = false }: { config: EstimateInput; onChange: (key: keyof EstimateInput, value: number) => void; compact?: boolean }) {
  return (
    <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
      {FIELDS.map((f) => (
        <div key={f.key}>
          <label htmlFor={`est-${f.key}`} className="text-sm font-medium">{f.label}</label>
          <input
            id={`est-${f.key}`}
            type="number"
            inputMode="numeric"
            min={0}
            max={f.max}
            value={config[f.key]}
            onChange={(e) => onChange(f.key, Math.max(0, Math.min(f.max, Number(e.target.value) || 0)))}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm tabular-nums focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {!compact && <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.hint}</p>}
        </div>
      ))}
    </div>
  );
}

export function EstimateSummary({ config, detailed = true }: { config: EstimateInput; detailed?: boolean }) {
  const e = estimateMonthly(config);
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-mono-sm uppercase text-primary">Estimated at list rates</p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums">{formatUsd(e.monthly)}<span className="text-base font-medium text-muted-foreground"> / month</span></p>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">{formatUsd(e.annual)} a year</p>
      </div>
      {detailed && (
        <dl className="mt-4 divide-y divide-border border-t border-border text-sm">
          {e.lines.map((l) => (
            <div key={l.label} className="flex items-center justify-between gap-4 py-2">
              <dt className="text-muted-foreground">{l.qty.toLocaleString('en-US')} × {l.label} at {formatUsd(l.rate)}</dt>
              <dd className="font-medium tabular-nums">{formatUsd(l.total)}</dd>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{ESTIMATE_DISCLAIMER}</p>
    </div>
  );
}
