'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Building2, Calculator, Clock, DollarSign, Repeat, TrendingUp, Users } from 'lucide-react';

/*
 * Two calculators, no Camzify price in either.
 *
 * The previous version subtracted a "placeholder camera cost of $15/camera/month" from
 * the guard bill and called the difference a saving. That number was invented, and
 * the business has decided prices are not published on the site. So the calculator now
 * does the half of the sum that belongs to the reader — what routine guarding costs
 * them today, or what remote patrols would earn them from their own clients — and
 * hands the other half to a quote. Every input is the reader's own figure.
 *
 * Mode is chosen with the tabs, or by arriving with `#agency` in the URL, which the
 * partner pages use. The hash is read in an effect so the server render is stable.
 */
type Mode = 'sites' | 'agency';
type Currency = 'USD' | 'GBP' | 'EUR';

const CURRENCY_LABEL: Record<Currency, string> = { USD: '$', GBP: '£', EUR: '€' };

function fmt(n: number, currency: Currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);
}
function num(n: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
}

function Range({
  label, value, min, max, step = 1, suffix = '', onChange,
}: { label: string; value: number; min: number; max: number; step?: number; suffix?: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium">{label}</label>
        <span className="font-mono text-sm text-primary tabular-nums">{suffix === 'pre' ? '' : ''}{num(value)}{suffix !== 'pre' ? suffix : ''}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-primary"
        aria-label={label}
      />
    </div>
  );
}

function Stat({ icon: Icon, value, label, tone = 'default' }: { icon: any; value: string; label: string; tone?: 'default' | 'live' | 'critical' }) {
  const box = tone === 'live' ? 'border-live/20 bg-live/10' : tone === 'critical' ? 'border-critical/20 bg-critical/5' : 'border-border bg-card';
  const ink = tone === 'live' ? 'text-live' : tone === 'critical' ? 'text-critical' : 'text-primary';
  return (
    <div className={`rounded-xl border p-5 ${box}`}>
      <Icon className={`h-5 w-5 ${ink}`} aria-hidden="true" />
      <div className={`mt-2 font-display text-2xl font-bold tabular-nums ${tone === 'live' ? 'text-live' : ''}`}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export function ROICalculator() {
  const [mode, setMode] = useState<Mode>('sites');
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#agency') setMode('agency');
  }, []);

  // Site operator
  const [sites, setSites] = useState(3);
  const [guardHours, setGuardHours] = useState(56);
  const [guardRate, setGuardRate] = useState(20);
  const [rounds, setRounds] = useState(4);

  // Agency / monitoring company
  const [clientSites, setClientSites] = useState(12);
  const [pricePerSite, setPricePerSite] = useState(400);
  const [unstaffedHours, setUnstaffedHours] = useState(70);
  const [agencyRounds, setAgencyRounds] = useState(4);

  const site = useMemo(() => {
    const annualGuardCost = sites * guardHours * 52 * guardRate;
    const guardHoursYear = sites * guardHours * 52;
    const roundsYear = sites * rounds * 365;
    return { annualGuardCost, guardHoursYear, roundsYear };
  }, [sites, guardHours, guardRate, rounds]);

  const agency = useMemo(() => {
    const mrr = clientSites * pricePerSite;
    const arr = mrr * 12;
    const roundsYear = clientSites * agencyRounds * 365;
    const hoursNotStaffed = clientSites * unstaffedHours * 52;
    return { mrr, arr, roundsYear, hoursNotStaffed };
  }, [clientSites, pricePerSite, unstaffedHours, agencyRounds]);

  const sym = CURRENCY_LABEL[currency];

  return (
    <div>
      {/* Mode + currency */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Who are you calculating for" className="inline-flex rounded-xl border border-border bg-card p-1">
          {([
            ['sites', 'I run sites', Building2],
            ['agency', 'I run a security agency or monitoring company', Users],
          ] as const).map(([m, label, Icon]) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                mode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Currency</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Inputs */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold">{mode === 'sites' ? 'Your guarding today' : 'Your clients and your price'}</h2>
          </div>

          {mode === 'sites' ? (
            <div className="mt-6 space-y-6">
              <Range label="Sites" value={sites} min={1} max={50} onChange={setSites} />
              <Range label="Guard hours per week, per site, on routine rounds" value={guardHours} min={8} max={168} step={8} suffix="h" onChange={setGuardHours} />
              <Range label={`Guard hourly rate (${sym})`} value={guardRate} min={10} max={60} onChange={setGuardRate} />
              <Range label="Patrol rounds per night you would schedule" value={rounds} min={1} max={12} onChange={setRounds} />
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <Range label="Client sites you would offer remote patrols to" value={clientSites} min={1} max={200} onChange={setClientSites} />
              <Range label={`What you would charge per site per month (${sym})`} value={pricePerSite} min={50} max={3000} step={25} onChange={setPricePerSite} />
              <Range label="Guard hours per week, per site, you cannot staff today" value={unstaffedHours} min={0} max={168} step={7} suffix="h" onChange={setUnstaffedHours} />
              <Range label="Rounds per night per site" value={agencyRounds} min={1} max={12} onChange={setAgencyRounds} />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8">
            <h2 className="font-display text-lg font-bold">{mode === 'sites' ? 'What routine rounds cost you now' : 'What remote patrols would earn you'}</h2>
            {mode === 'sites' ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Stat icon={DollarSign} tone="critical" value={fmt(site.annualGuardCost, currency)} label="Annual guard cost on routine rounds" />
                <Stat icon={Clock} value={`${num(site.guardHoursYear)} h`} label="Guard hours a year spent walking rounds" />
                <Stat icon={Repeat} tone="live" value={num(site.roundsYear)} label="Scheduled rounds a year, each with a report" />
                <Stat icon={TrendingUp} value={`${num(site.roundsYear * 4)}`} label="Camera checks a year, at four stops per round" />
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Stat icon={DollarSign} tone="live" value={fmt(agency.mrr, currency)} label="Monthly recurring revenue at your price" />
                <Stat icon={TrendingUp} tone="live" value={fmt(agency.arr, currency)} label="Annual recurring revenue" />
                <Stat icon={Repeat} value={num(agency.roundsYear)} label="Rounds a year delivered to clients, each with a report" />
                <Stat icon={Clock} value={`${num(agency.hoursNotStaffed)} h`} label="Guard hours a year you cover without staffing them" />
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {mode === 'sites' ? (
                <>These are your figures, not ours: what the routine round costs today and how many recorded rounds a schedule would run instead. Camzify is priced per camera and quoted for your site; we do not publish rates. <Link href="/contact" className="text-primary hover:underline">Ask for a quote</Link> with your camera count and the answer comes back against this number.</>
              ) : (
                <>Your price, your clients, your margin. Nothing here assumes what Camzify costs; that is quoted for your camera count so you can set your own rate against it. <Link href="/partners/for-security-agencies" className="text-primary hover:underline">How agencies sell it</Link> and <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">how monitoring companies run it</Link> cover the model.</>
              )}
            </p>
          </div>

          <Link
            href="/contact"
            className="block rounded-xl bg-primary px-8 py-4 text-center font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            {mode === 'sites' ? 'Get a quote for these sites' : 'Talk to us about a partner quote'}
          </Link>
        </div>
      </div>
    </div>
  );
}
