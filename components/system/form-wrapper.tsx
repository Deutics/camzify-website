'use client';

import { useState, FormEvent, ReactNode } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { trackConversion, formFromEndpoint } from '@/components/system/track-conversion';

export function FormWrapper({
  endpoint,
  successMessage = 'Submitted successfully. We will be in touch shortly.',
  children,
  onSubmit,
}: {
  endpoint: string;
  successMessage?: string;
  children: (props: { loading: boolean }) => ReactNode;
  onSubmit?: (formData: Record<string, string>) => Record<string, string>;
}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault?.();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e?.currentTarget);
      let data: Record<string, string> = {};
      formData?.forEach?.((value: any, key: string) => {
        data[key] = value?.toString?.() ?? '';
      });

      if (onSubmit) {
        data = onSubmit(data);
      }

      // Context so the team can reply at a sensible time (lib/lead-context.ts): the
      // browser's time zone and language, the page the form was sent from and the page
      // before it. Read here, in the submit handler, never during render.
      try {
        data.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      } catch {
        /* older browsers: the server falls back to the connection's time zone */
      }
      data.page = window.location.pathname;
      data.referrer = document.referrer || '';
      data.language = navigator.language || '';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res?.json?.();
      if (result?.success) {
        const form = formFromEndpoint(endpoint);
        if (form) trackConversion(form);
        setSubmitted(true);
      } else {
        setError(result?.message ?? 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-live/30 bg-live/5 p-12 text-center">
        <CheckCircle className="h-12 w-12 text-live" />
        <h3 className="font-display text-xl font-bold">Thank you</h3>
        <p className="text-muted-foreground">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot (lib/lead-guard.ts): hidden from people and screen readers, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      {children({ loading })}
      {error && <p className="text-sm text-critical">{error}</p>}
      <p className="text-xs text-muted-foreground">
        By submitting, you agree that we may store and process your information to respond to your request.
      </p>
    </form>
  );
}
