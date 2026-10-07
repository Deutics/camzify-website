import { track } from '@vercel/analytics';

/**
 * Records a successful form submission in both analytics tools, so leads can be counted
 * and traced back to the pages and sources that produced them. Before this, a submission
 * only sent an email (lib/lead-mail.ts) and neither dashboard knew it had happened.
 *
 * - Vercel Web Analytics: a custom event. Cookieless and always on, so it counts every
 *   submission; it is the number to trust.
 * - Google Analytics: GA4's recommended `generate_lead` event (newsletter: `sign_up`).
 *   `gtag` only exists where analytics-consent.tsx loaded Google Analytics (the live
 *   site, and not in a browser that turned analytics off), so elsewhere this is skipped,
 *   never queued.
 *
 * Only the form's name is sent, never anything the visitor typed: no email, company or
 * message text leaves the site through analytics. Call it from event handlers only;
 * it touches `window` and must not run during render.
 */
export type ConversionForm = 'book-demo' | 'contact' | 'quote' | 'newsletter';

type Gtag = (command: 'event', name: string, params: Record<string, string>) => void;

export function trackConversion(form: ConversionForm): void {
  const isLead = form !== 'newsletter';
  try {
    track(isLead ? 'Lead' : 'Newsletter signup', { form });
  } catch {
    // Analytics must never break a form that has already succeeded.
  }
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    gtag?.('event', isLead ? 'generate_lead' : 'sign_up', isLead ? { form_name: form } : { method: 'newsletter' });
  } catch {
    // As above.
  }
}

/** The form name for a FormWrapper endpoint, e.g. '/api/book-demo' -> 'book-demo'. */
export function formFromEndpoint(endpoint: string): ConversionForm | null {
  const name = endpoint.replace(/^\/api\//, '').replace(/\/$/, '');
  return (['book-demo', 'contact', 'quote', 'newsletter'] as const).find((f) => f === name) ?? null;
}
