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

/*
 * The brief itself is written in English, so the German form says so rather than
 * implying a German newsletter.
 */
const COPY = {
  en: {
    eyebrow: 'The patrol brief',
    heading: 'Run better rounds. Sell them with confidence.',
    body: 'A short brief from the people who build Camzify, sent only when there is something worth your time: checklists you can copy into your own sites, how agencies price and pitch remote patrols, and what changed in the console before you notice it.',
    doneStrong: 'You are in.',
    done: 'The first brief arrives when there is something worth your time, not on a calendar, and one click takes you off the list.',
    formLabel: 'Subscribe to the patrol brief',
    emailLabel: 'Work email',
    placeholder: 'you@yourcompany.com',
    sending: 'Sending…',
    submit: 'Get the brief',
    error: 'That did not go through. Check the address and try again, or email us directly.',
    finePrintBefore: 'No sales sequence, no sharing, one click to leave. Your address is used for the brief and nothing else; see the',
    privacy: 'privacy policy',
    finePrintAfter: '.',
  },
  de: {
    eyebrow: 'Der Patrol Brief (auf Englisch)',
    heading: 'Bessere Rundgänge. Überzeugend verkauft.',
    body: 'Ein kurzer Brief vom Camzify-Team, nur wenn es etwas Lohnendes gibt: Checklisten zum Übernehmen für Ihre Standorte, wie Sicherheitsdienste Fernrundgänge kalkulieren und anbieten, und was sich in der Konsole geändert hat. Der Brief erscheint auf Englisch.',
    doneStrong: 'Sie sind dabei.',
    done: 'Der erste Brief kommt, wenn es etwas Lohnendes gibt, nicht nach Kalender, und ein Klick trägt Sie wieder aus.',
    formLabel: 'Patrol Brief abonnieren',
    emailLabel: 'Geschäftliche E-Mail-Adresse',
    placeholder: 'sie@ihrefirma.de',
    sending: 'Wird gesendet…',
    submit: 'Abonnieren',
    error: 'Das hat nicht geklappt. Prüfen Sie die Adresse und versuchen Sie es erneut, oder schreiben Sie uns direkt.',
    finePrintBefore: 'Keine Verkaufssequenz, keine Weitergabe, ein Klick zum Austragen. Ihre Adresse wird nur für den Brief verwendet; siehe die',
    privacy: 'Datenschutzerklärung (auf Englisch)',
    finePrintAfter: '.',
  },
} as const;

export function NewsletterForm({ className = '', locale = 'en' }: { className?: string; locale?: 'en' | 'de' }) {
  const c = COPY[locale];
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
      <span className="font-mono text-mono-sm uppercase tracking-wider text-primary">{c.eyebrow}</span>
      <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
        {c.heading}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {c.body}
      </p>
      {state === 'done' ? (
        <p className="mt-5 flex max-w-xl items-start gap-3 rounded-lg border border-live/30 bg-live/10 px-4 py-3 text-sm" role="status">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-live" aria-hidden="true" />
          <span><strong className="font-semibold">{c.doneStrong}</strong> {c.done}</span>
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 max-w-xl" aria-label={c.formLabel}>
          <label htmlFor="footer-email" className="sr-only">{c.emailLabel}</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={c.placeholder}
              className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {state === 'sending' ? c.sending : c.submit}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground" aria-live="polite">
            {state === 'error' ? (
              <span className="text-critical">{c.error}</span>
            ) : (
              <>{c.finePrintBefore} <Link href="/privacy-policy" className="text-primary hover:underline">{c.privacy}</Link>{c.finePrintAfter}</>
            )}
          </p>
        </form>
      )}
    </div>
  );
}
