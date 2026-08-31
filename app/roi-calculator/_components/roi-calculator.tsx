'use client';

import { useState, useMemo } from 'react';
import { Calculator, TrendingDown, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export function ROICalculator() {
  const [sites, setSites] = useState(1);
  const [camerasPerSite, setCamerasPerSite] = useState(16);
  const [guardHours, setGuardHours] = useState(40);
  const [guardRate, setGuardRate] = useState(20);
  const [patrolRounds, setPatrolRounds] = useState(4);
  const [region, setRegion] = useState('us');

  const results = useMemo(() => {
    const annualGuardCost = sites * guardHours * 52 * guardRate;
    const camzifyCostPerCamMonth = 15; // Placeholder
    const annualCamzifyCost = sites * camerasPerSite * camzifyCostPerCamMonth * 12;
    const netSaving = Math.max(0, annualGuardCost - annualCamzifyCost);
    const paybackDays = annualCamzifyCost > 0 ? Math.round((annualCamzifyCost / annualGuardCost) * 365) : 0;
    const patrolRoundsPerYear = sites * patrolRounds * 365;

    return { annualGuardCost, annualCamzifyCost, netSaving, paybackDays, patrolRoundsPerYear };
  }, [sites, camerasPerSite, guardHours, guardRate, patrolRounds, region]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-bold">Your current setup</h2>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Number of sites</label>
            <input
              type="range" min={1} max={50} value={sites}
              onChange={(e: any) => setSites(Number(e?.target?.value ?? 1))}
              className="mt-2 w-full accent-primary"
            />
            <div className="mt-1 text-right font-mono text-sm text-primary">{sites}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Cameras per site</label>
            <input
              type="range" min={4} max={128} step={4} value={camerasPerSite}
              onChange={(e: any) => setCamerasPerSite(Number(e?.target?.value ?? 16))}
              className="mt-2 w-full accent-primary"
            />
            <div className="mt-1 text-right font-mono text-sm text-primary">{camerasPerSite}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Guard hours per week (per site)</label>
            <input
              type="range" min={8} max={168} step={8} value={guardHours}
              onChange={(e: any) => setGuardHours(Number(e?.target?.value ?? 40))}
              className="mt-2 w-full accent-primary"
            />
            <div className="mt-1 text-right font-mono text-sm text-primary">{guardHours}h</div>
          </div>
          <div>
            <label className="text-sm font-medium">Guard hourly rate ($)</label>
            <input
              type="range" min={10} max={50} value={guardRate}
              onChange={(e: any) => setGuardRate(Number(e?.target?.value ?? 20))}
              className="mt-2 w-full accent-primary"
            />
            <div className="mt-1 text-right font-mono text-sm text-primary">${guardRate}/hr</div>
          </div>
          <div>
            <label className="text-sm font-medium">Patrol rounds per night</label>
            <input
              type="range" min={1} max={12} value={patrolRounds}
              onChange={(e: any) => setPatrolRounds(Number(e?.target?.value ?? 4))}
              className="mt-2 w-full accent-primary"
            />
            <div className="mt-1 text-right font-mono text-sm text-primary">{patrolRounds}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Region</label>
            <select
              value={region}
              onChange={(e: any) => setRegion(e?.target?.value ?? 'us')}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="sg">Singapore</option>
              <option value="au">Australia</option>
              <option value="eu">Europe</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8">
          <h2 className="font-display text-lg font-bold">Your estimated savings</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-card p-5 border border-border">
              <DollarSign className="h-5 w-5 text-critical" />
              <div className="mt-2 font-display text-2xl font-bold">{formatCurrency(results?.annualGuardCost ?? 0)}</div>
              <div className="mt-1 text-xs text-muted-foreground">Current annual guard cost</div>
            </div>
            <div className="rounded-xl bg-card p-5 border border-border">
              <DollarSign className="h-5 w-5 text-primary" />
              <div className="mt-2 font-display text-2xl font-bold">{formatCurrency(results?.annualCamzifyCost ?? 0)}</div>
              <div className="mt-1 text-xs text-muted-foreground">Camzify annual cost (est.)</div>
            </div>
            <div className="rounded-xl bg-live/10 p-5 border border-live/20">
              <TrendingDown className="h-5 w-5 text-live" />
              <div className="mt-2 font-display text-2xl font-bold text-live">{formatCurrency(results?.netSaving ?? 0)}</div>
              <div className="mt-1 text-xs text-muted-foreground">Net annual saving</div>
            </div>
            <div className="rounded-xl bg-card p-5 border border-border">
              <Calendar className="h-5 w-5 text-warn" />
              <div className="mt-2 font-display text-2xl font-bold">{results?.paybackDays ?? 0} days</div>
              <div className="mt-1 text-xs text-muted-foreground">Payback period</div>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-card p-5 border border-border">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div className="mt-2 font-display text-2xl font-bold">{(results?.patrolRoundsPerYear ?? 0).toLocaleString('en-US')}</div>
            <div className="mt-1 text-xs text-muted-foreground">Patrol rounds per year with Camzify</div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            These estimates use a placeholder camera cost of $15/camera/month. Actual pricing depends on
            your plan tier and camera count. <Link href="/book-a-demo" className="text-primary hover:underline">Book a demo</Link> for
            a custom quote. See our <Link href="/guides/security-guard-cost-per-hour" className="text-primary hover:underline">guard cost guide</Link> for
            detailed hourly rates by region.
          </p>
        </div>

        <Link
          href="/book-a-demo"
          className="block rounded-xl bg-primary px-8 py-4 text-center font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          Book a Demo for Exact Pricing
        </Link>
      </div>
    </div>
  );
}
