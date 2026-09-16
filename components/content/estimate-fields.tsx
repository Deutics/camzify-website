'use client';

import { useState } from 'react';
import type { EstimateInput } from '@/lib/pricing-estimates';

/*
 * The five configuration inputs shared by the pricing page quote request and the demo
 * form. No figure is shown to the visitor: the counts travel with the form, and the
 * server works out the list-rate estimate for the team's lead email only. The inputs
 * carry no `name` on purpose; the surrounding form merges the values in its onSubmit,
 * which keeps them from colliding with the demo form's own "cameras" field and from
 * submitting while the section is collapsed.
 */
export const DEFAULT_CONFIG: EstimateInput = { cameras: 20, patrolCameras: 10, standardInstances: 10, premiumInstances: 0, storageTb: 4 };

const FIELDS: { key: keyof EstimateInput; label: string; hint: string; max: number }[] = [
  { key: 'cameras', label: 'Cameras to connect', hint: 'A stream instance each. Motion detection and camera tampering detection are included.', max: 5000 },
  { key: 'patrolCameras', label: 'Cameras on patrol rounds', hint: 'A virtual patrolling instance each, for manual and automated rounds.', max: 5000 },
  { key: 'standardInstances', label: 'Detection instances', hint: 'Intrusion, loitering, PPE, parking and the rest. One instance is one feature on one camera.', max: 20000 },
  { key: 'premiumInstances', label: 'Behavioral anomaly or weapons instances', hint: 'One per camera that carries either feature.', max: 5000 },
  { key: 'storageTb', label: 'Cloud storage (TB)', hint: 'Spent as you set retention per camera or per site.', max: 10000 },
];

export function useEstimateConfig(initial: EstimateInput = DEFAULT_CONFIG) {
  const [config, setConfig] = useState<EstimateInput>(initial);
  const set = (key: keyof EstimateInput, value: number) => setConfig((c) => ({ ...c, [key]: value }));
  return { config, set };
}

/** The configuration as form fields, for the onSubmit merge. */
export function configFields(config: EstimateInput): Record<string, string> {
  return {
    cameras: String(config.cameras),
    patrolCameras: String(config.patrolCameras),
    standardInstances: String(config.standardInstances),
    premiumInstances: String(config.premiumInstances),
    storageTb: String(config.storageTb),
  };
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
