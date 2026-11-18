/**
 * The public booking page where a visitor who has just requested a demo can pick a time
 * for it themselves: the team's Zoho Bookings page for the 15-minute demo.
 *
 * Set NEXT_PUBLIC_DEMO_BOOKING_URL (.env.example) to that page's https link. While it is
 * unset or not an https URL this is null and nothing changes: the confirmation screen,
 * the visitor's email and the team's lead email all say the team will be in touch to
 * schedule, as before. NEXT_PUBLIC_ because the confirmation screen reads it in the
 * browser; Next inlines it at build, so server and client see the same value and the
 * value is safe to read during render. A change needs a redeploy.
 *
 * Nothing about the visitor is put in the link (no prefilled name or email): the booking
 * page asks for them itself, and personal data never goes into a URL.
 */
function parse(raw: string | undefined): string | null {
  const value = (raw || '').trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export const demoBookingUrl: string | null = parse(process.env.NEXT_PUBLIC_DEMO_BOOKING_URL);
