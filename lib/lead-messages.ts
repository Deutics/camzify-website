/**
 * What a visitor is told after sending a form: shown on the page by FormWrapper and
 * repeated in the acknowledgement email (lib/lead-mail.ts), so the two never disagree.
 */
export const LEAD_MESSAGES = {
  'book-demo': 'Demo request submitted. We will contact you within one business day to schedule your session.',
  contact: 'Message sent. We will respond within one business day.',
  quote: 'Quote request received. We will reply with a quote for this configuration within one business day.',
} as const;

export type AcknowledgedKind = keyof typeof LEAD_MESSAGES;
