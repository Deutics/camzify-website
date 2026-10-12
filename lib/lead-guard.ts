/**
 * Cheap protection for the lead forms, mainly because they now send an acknowledgement
 * email to the address entered: without it, anyone could use the forms to mail someone
 * else from camzify.com.
 *
 * - Honeypot: FormWrapper renders a field named `website` that people never see or fill
 *   in; bots that fill every field do. Such a submission gets a normal-looking success
 *   reply and nothing is sent, so the bot learns nothing.
 * - Rate limit: at most LIMIT submissions per connection per WINDOW. It is held in the
 *   memory of one server instance, so it slows a burst rather than guaranteeing a cap;
 *   a stronger limit would need a shared store.
 */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const seen = new Map<string, number[]>();

export function isBot(data: Record<string, unknown>): boolean {
  return typeof data.website === 'string' && data.website.trim() !== '';
}

export function rateLimited(request: Request): boolean {
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const recent = (seen.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  seen.set(ip, recent);
  if (seen.size > 5000) seen.clear(); // keep memory bounded on a long-lived instance
  return recent.length > LIMIT;
}
