'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

/*
 * The newsletter block in the footer's brand row, and the one place the newsletter
 * endpoint is posted to. Name, headline, one sentence that says what is in it, the form. /api/newsletter existed with no
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

  return (
    <div className={className}>
      <span className="font-mono text-mono-sm uppercase tracking-wider text-primary">The patrol brief</span>
      <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
        Run better rounds. Sell them with confidence.
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        A short brief from the people who build Camzify, sent only when there is something worth your time: checklists you can copy into your own sites, how agencies price and pitch remote patrols, and what changed in the console before you notice it.
      </p>
      {state === 'done' ? (
        <p className="mt-5 flex max-w-xl items-start gap-3 rounded-lg border border-live/30 bg-live/10 px-4 py-3 text-sm" role="status">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-live" aria-hidden="true" />
          <span><strong className="font-semibold">You are in.</strong> The first brief arrives when there is something worth your time, not on a calendar, and one click takes you off the list.</span>
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 max-w-xl" aria-label="Subscribe to the patrol brief">
          <label htmlFor="footer-email" className="sr-only">Work email</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {state === 'sending' ? 'Sending…' : 'Get the brief'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground" aria-live="polite">
            {state === 'error' ? (
              <span className="text-critical">That did not go through. Check the address and try again, or email us directly.</span>
            ) : (
              <>No sales sequence, no sharing, one click to leave. Your address is used for the brief and nothing else; see the <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>.</>
            )}
          </p>
        </form>
      )}
    </div>
  );
}
