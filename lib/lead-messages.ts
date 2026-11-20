/**
 * What a visitor is told after sending a form: shown on the page by FormWrapper and
 * repeated in the acknowledgement email (lib/lead-mail.ts), so the two never disagree.
 */
export const LEAD_MESSAGES = {
  'book-demo': 'Demo request submitted. We will contact you within one business day to schedule your session.',
  contact: 'Message sent. We will respond within one business day.',
  quote: 'Quote request received. We will reply with a quote for this configuration within one business day.',
} as const;

/**
 * The demo confirmation when the visitor can pick a slot themselves (lib/demo-booking.ts):
 * the slot picker sits under this line on the page, the button under it in the email.
 */
export const BOOK_DEMO_WITH_SCHEDULING =
  'Demo request submitted. Pick a time for your demo below, or we will contact you within one business day to schedule it.';

export type AcknowledgedKind = keyof typeof LEAD_MESSAGES;
