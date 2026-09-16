/*
 * Approximate list rates, stated by the business on 2026-09-16, and the one place on
 * the site that holds them. They are NOT shown to visitors: the business withdrew the
 * public estimate on 2026-09-17 after reviewing how comparable vendors handle pricing.
 * The API routes use them to put a list-rate estimate in the team's lead email, so a
 * reply can start from a number. Do not import them into a client component.
 *
 * The one public figure is PUBLIC_FLOOR_PER_CAMERA: a stream instance comes down to $5
 * per camera per month with the discounts the business gives, and the site may say
 * "from $5 per camera per month" and nothing more precise.
 *
 * They are list rates before discounts. The business quotes lower for an annual term
 * and for accounts that license more features per camera, so an estimate is the upper
 * end of what a quote will say, never the lower end. Most detections are priced under
 * the standard figure; it is used as a ceiling so the estimate does not come in under
 * the quote. Motion detection and camera tampering detection are included with a
 * stream instance at no charge.
 */
export const LIST_RATES = {
  /** Per connected camera per month. Includes motion detection and camera tampering detection. */
  streamInstance: 6,
  /** Per terabyte of cloud storage per month. */
  storagePerTb: 12,
  /** Per camera per month. One instance puts a camera on manual and automated patrol rounds. */
  patrolInstance: 35,
  /** Ceiling for most detections (intrusion, loitering, PPE, parking and the rest) per camera per month. */
  standardDetection: 20,
  /** Behavioral anomaly detection and weapons detection, per camera per month. */
  premiumDetection: 40,
} as const;

export const CURRENCY = 'USD';

/** The only figure the site publishes: a stream instance after discount, per camera per month. */
export const PUBLIC_FLOOR_PER_CAMERA = 5;

export const ESTIMATE_DISCLAIMER =
  'An estimate at approximate list rates, before discounts. Quotes are lower with an annual term and with more features per camera, and are set for your site.';

/** Detections that carry the premium rate; everything else not included free is standard. */
export const PREMIUM_DETECTIONS = ['Behavioral Anomaly Detection', 'Weapons Detection'] as const;
export const INCLUDED_DETECTIONS = ['Motion Detection', 'Camera Tampering Detection'] as const;

export type EstimateInput = {
  cameras: number;
  patrolCameras: number;
  standardInstances: number;
  premiumInstances: number;
  storageTb: number;
};

export type EstimateLine = { label: string; qty: number; rate: number; total: number };

export type Estimate = { lines: EstimateLine[]; monthly: number; annual: number };

const clamp = (n: number) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 0);

export function estimateMonthly(input: EstimateInput): Estimate {
  const cameras = clamp(input.cameras);
  const patrol = Math.min(clamp(input.patrolCameras), cameras);
  const standard = clamp(input.standardInstances);
  const premium = clamp(input.premiumInstances);
  const storage = clamp(input.storageTb);
  const lines: EstimateLine[] = [
    { label: 'Camera stream instances', qty: cameras, rate: LIST_RATES.streamInstance, total: cameras * LIST_RATES.streamInstance },
    { label: 'Virtual patrolling instances', qty: patrol, rate: LIST_RATES.patrolInstance, total: patrol * LIST_RATES.patrolInstance },
    { label: 'Detection instances (standard, up to)', qty: standard, rate: LIST_RATES.standardDetection, total: standard * LIST_RATES.standardDetection },
    { label: 'Detection instances (behavioral anomaly, weapons)', qty: premium, rate: LIST_RATES.premiumDetection, total: premium * LIST_RATES.premiumDetection },
    { label: 'Cloud storage (TB)', qty: storage, rate: LIST_RATES.storagePerTb, total: storage * LIST_RATES.storagePerTb },
  ];
  const monthly = lines.reduce((sum, l) => sum + l.total, 0);
  return { lines, monthly, annual: monthly * 12 };
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 }).format(n);
}

/** One-line summary for a lead email. */
export function describeEstimate(input: EstimateInput): string {
  const e = estimateMonthly(input);
  const parts = e.lines.filter((l) => l.qty > 0).map((l) => `${l.qty} x ${l.label} at ${formatUsd(l.rate)} = ${formatUsd(l.total)}`);
  return `${parts.join('; ')}. Estimated ${formatUsd(e.monthly)} per month (${formatUsd(e.annual)} per year) at list rates before discounts.`;
}
