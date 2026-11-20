'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DemoScheduler } from '@/components/content/demo-scheduler';

/** Reads the booking token from the URL fragment after mount (lib/demo-booking.ts). */
export function ScheduleFromLink() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const read = () => setToken(window.location.hash.replace(/^#/, '').trim() || null);
    read();
    // Following the email link while this page is already open only changes the hash.
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  if (token === undefined) return null;
  if (token === null) {
    return (
      <p className="text-muted-foreground">
        This page opens from the link in your demo confirmation email. To request a demo,{' '}
        <Link href="/book-a-demo" className="text-primary hover:underline">use the demo form</Link>.
      </p>
    );
  }
  return <DemoScheduler token={token} />;
}
