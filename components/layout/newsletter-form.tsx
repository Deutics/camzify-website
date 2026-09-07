'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

/*
 * The one place the newsletter endpoint is posted to. /api/newsletter existed with no
 * UI for months; the privacy policy describes a newsletter form, so the form should
 * exist. Success and error states are rendered in place, and the input keeps its value
 * on error so nobody retypes an address.
 */
type State = 'idle' | 'sending' | 'done' | 'error';

export function NewsletterForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === 'sending') return;
    setState('sending');
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const body = await res.json().catch(() => ({}));
      setState(res.ok && body?.success ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p className={`flex items-start gap-2 text-sm text-muted-foreground ${className}`} role="status">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-live" aria-hidden="true" />
        You are in. The first brief arrives when there is something worth your time, not on a calendar, and one click takes you off the list.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={`rounded-xl border border-border bg-background/60 p-5 ${className}`} aria-label="Subscribe to the patrol brief">
      <span className="font-mono text-mono-sm uppercase tracking-wider text-primary">The patrol brief</span>
      <p className="mt-2 font-display text-lg font-bold leading-snug tracking-tight">
        Run better rounds. Sell them with confidence.
      </p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        A short brief from the people who build Camzify, sent only when there is something worth your time.
      </p>
      <ul className="mt-3 max-w-md space-y-1.5 text-sm text-muted-foreground">
        {[
          'Checklists and round designs you can copy into your own sites',
          'How agencies and monitoring companies price and pitch remote patrols',
          'What changed in the console, and why, before you notice it',
        ].map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-live" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <label htmlFor="footer-email" className="sr-only">Work email</label>
      <div className="mt-4 flex max-w-md gap-2">
        <input
          id="footer-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourcompany.com"
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {state === 'sending' ? 'Sending…' : 'Get the brief'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
        {state === 'error' ? (
          <span className="text-critical">That did not go through. Check the address and try again, or email us directly.</span>
        ) : (
          <>No sales sequence, no sharing, one click to leave. Your address is used for the brief and nothing else; see the <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>.</>
        )}
      </p>
    </form>
  );
}
