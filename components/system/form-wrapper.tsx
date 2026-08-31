'use client';

import { useState, FormEvent, ReactNode } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

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

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res?.json?.();
      if (result?.success) {
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
      {children({ loading })}
      {error && <p className="text-sm text-critical">{error}</p>}
      <p className="text-xs text-muted-foreground">
        By submitting, you agree that we may store and process your information to respond to your request.
      </p>
    </form>
  );
}
