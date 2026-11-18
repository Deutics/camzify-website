'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
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
        <CountryPicker
          value={country}
          onChange={(region) => {
            touched.current = true;
            setCountry(region);
          }}
        />
        <input id={id} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" className={INPUT.replace('mt-1.5 ', '')} placeholder="Phone number" />
      </div>
    </div>
  );
}

/** The flag emoji for a two-letter region code. Pure, so server and browser agree. */
function flagOf(region: string): string {
  return /^[A-Z]{2}$/.test(region) ? String.fromCodePoint(...[...region].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65)) : '';
}

/**
 * The calling-code picker: a button showing the flag and code, opening a searchable list
 * (by country name, region code or calling code). It replaced a native <select>, whose
 * 245 unsearchable rows rendered in the operating system's own colors. Submitted as
 * `phoneCountry` through a hidden input, as before.
 *
 * The list stays in the DOM while closed, hidden and `inert` (CLAUDE.md rule 7). It
 * follows the ARIA combobox pattern: the search box owns the listbox and moves the
 * active option with the arrow keys; Enter picks, Escape closes and returns focus.
 */
function CountryPicker({ value, onChange }: { value: string; onChange: (region: string) => void }) {
  const uid = useId();
  const listId = `${uid}-list`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const current = DIAL_CODES.find(([r]) => r === value) ?? DIAL_CODES[0];
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, '');
    if (!q) return DIAL_CODES;
    return DIAL_CODES.filter(([region, code, name]) => name.toLowerCase().includes(q) || region.toLowerCase() === q || code.startsWith(q));
  }, [query]);

  const show = () => {
    setQuery('');
    setActive(Math.max(0, DIAL_CODES.findIndex(([r]) => r === value)));
    setOpen(true);
  };
  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  };
  const pick = (region: string) => {
    onChange(region);
    close(true);
  };

  // Focus the search box when the list opens; close on a click outside.
  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Keep the active option in view as it moves.
  useEffect(() => {
    if (!open) return;
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open, matches]);

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const m = matches[active];
      if (m) pick(m[0]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close(true);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className="relative shrink-0">
      <input type="hidden" name="phoneCountry" value={current[0]} />
      <button
        ref={trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Country calling code: ${current[2]} +${current[1]}`}
        onClick={() => (open ? close(false) : show())}
        onKeyDown={(e) => {
          if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault();
            show();
          }
        }}
        className="flex h-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-3 text-sm transition-colors hover:border-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <span aria-hidden="true" className="text-base leading-none">{flagOf(current[0])}</span>
        <span className="tabular-nums">+{current[1]}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <div
        {...({ inert: open ? undefined : '' } as Record<string, string | undefined>)}
        className={`${open ? 'block' : 'hidden'} absolute left-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-3rem)] overflow-hidden rounded-xl border border-border bg-card shadow-xl`}
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={search}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={matches[active] ? `${uid}-${matches[active][0]}` : undefined}
            aria-label="Search countries"
            placeholder="Search country or code"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onSearchKey}
            className="w-full bg-transparent py-3 text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <ul ref={list} id={listId} role="listbox" aria-label="Countries" className="max-h-64 overflow-y-auto py-1">
          {matches.map(([region, code, name], i) => {
            const selected = region === current[0];
            return (
              <li
                key={region}
                id={`${uid}-${region}`}
                data-index={i}
                role="option"
                aria-selected={selected}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(region)}
                className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm ${i === active ? 'bg-muted' : ''}`}
              >
                <span aria-hidden="true" className="w-5 text-base leading-none">{flagOf(region)}</span>
                <span className={`flex-1 truncate ${selected ? 'font-medium text-foreground' : ''}`}>{name}</span>
                <span className="tabular-nums text-muted-foreground">+{code}</span>
                <Check className={`h-4 w-4 shrink-0 text-primary ${selected ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              </li>
            );
          })}
          {matches.length === 0 && <li className="px-3 py-3 text-sm text-muted-foreground">No country matches</li>}
        </ul>
      </div>
    </div>
  );
}
