import { demoBookingUrl } from '@/lib/demo-booking';

/**
 * What a visitor is told after sending a form: shown on the page by FormWrapper and
 * repeated in the acknowledgement email (lib/lead-mail.ts), so the two never disagree.
 */
export const LEAD_MESSAGES = {
  // With a booking page configured (lib/demo-booking.ts) the visitor can pick the time
  // themselves; the button sits under this line on the page and in the email.
  'book-demo': demoBookingUrl
    ? 'Demo request submitted. Pick a time for your session now, or we will contact you within one business day to schedule it.'
    : 'Demo request submitted. We will contact you within one business day to schedule your session.',
  contact: 'Message sent. We will respond within one business day.',
  quote: 'Quote request received. We will reply with a quote for this configuration within one business day.',
} as const;

export type AcknowledgedKind = keyof typeof LEAD_MESSAGES;
