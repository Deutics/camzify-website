'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DIAL_CODES } from '@/lib/dial-codes';

/**
 * Optional phone number with a country calling code (submitted as `phoneCountry` and
 * `phone`; the server formats and checks it with libphonenumber-js).
 *
 * The country is pre-selected for the visitor: from their connection's country via
 * /api/geo, falling back to the region in their browser's language (en-GB -> GB), then
 * US. Pre-selection waits for mount so server and client render the same markup, and it
 * never overrides a country the visitor picked.
 */
const INPUT = 'mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary';

export function PhoneField({ id = 'phone' }: { id?: string }) {
  const [country, setCountry] = useState('US');
  // A ref, not state: the detection below must see a choice made while it was in flight.
  const touched = useRef(false);

  const options = useMemo(() => {
    let names: Intl.DisplayNames | null = null;
    try {
      names = new Intl.DisplayNames(['en'], { type: 'region' });
    } catch {
      names = null;
    }
    return DIAL_CODES.map(([region, code]) => ({ region, code, label: names?.of(region) ?? region })).sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fromLanguage = () => {
      const m = /-([A-Z]{2})$/.exec(navigator.language || '');
      return m && DIAL_CODES.some(([r]) => r === m[1]) ? m[1] : null;
    };
    fetch('/api/geo')
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((geo: { country?: string | null } | null) => {
        if (cancelled || touched.current) return;
        const detected = geo?.country && DIAL_CODES.some(([r]) => r === geo.country) ? geo.country : fromLanguage();
        if (detected) setCountry(detected);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">Phone (optional)</label>
      <div className="mt-1.5 flex gap-2">
        <select
          aria-label="Country calling code"
          name="phoneCountry"
          value={country}
          onChange={(e) => {
            touched.current = true;
            setCountry(e.target.value);
          }}
          className="w-28 shrink-0 rounded-lg border border-border bg-background px-2 py-3 text-sm sm:w-40 sm:px-3 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          {options.map((o) => (
            <option key={o.region} value={o.region}>
              +{o.code} {o.label}
            </option>
          ))}
        </select>
        <input id={id} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" className={INPUT.replace('mt-1.5 ', '')} placeholder="Phone number" />
      </div>
    </div>
  );
}
