import { siteConfig, formattedAddress } from '@/lib/site-config';
import { LEAD_MESSAGES, type AcknowledgedKind } from '@/lib/lead-messages';

/*
 * Lead notification by email, through ZeptoMail (Zoho's transactional mail API).
 *
 * The five form endpoints call this first. Until the lead database is connected, the
 * email IS the record of the lead, so a failure here fails the request and the visitor
 * is told to try again or email us directly. When DATABASE_URL is present the routes
 * also write the row, non-fatally, so nothing changes here when the database arrives.
 *
 * Configuration (see .env.example): ZEPTOMAIL_TOKEN is the "Send Mail Token" from the
 * Mail Agent in the ZeptoMail console; ZEPTOMAIL_FROM_ADDRESS must be an address on a
 * domain verified in that account; LEADS_TO_EMAIL is where the leads land (defaults to
 * the public contact address); LEADS_CC_EMAIL is an optional comma-separated list of
 * addresses copied on every lead. ZEPTOMAIL_API_URL only changes for the EU or India
 * data centres (api.zeptomail.eu, api.zeptomail.in).
 */
export type LeadKind = 'contact' | 'book-demo' | 'newsletter' | 'quote';

const KIND_LABEL: Record<LeadKind, string> = {
  contact: 'Contact form',
  'book-demo': 'Demo request',
  newsletter: 'Newsletter subscription',
  quote: 'Quote request',
};

export function mailConfigured(): boolean {
  return Boolean(process.env.ZEPTOMAIL_TOKEN && process.env.ZEPTOMAIL_FROM_ADDRESS);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

export async function sendLeadEmail(kind: LeadKind, fields: Record<string, string | undefined>, replyTo?: string): Promise<void> {
  // The console shows the token as `Zoho-enczapikey <value>`; accept it pasted either way.
  const token = (process.env.ZEPTOMAIL_TOKEN || '').trim().replace(/^Zoho-enczapikey\s+/i, '');
  const from = (process.env.ZEPTOMAIL_FROM_ADDRESS || '').trim();
  if (!token || !from) throw new Error('ZeptoMail is not configured: set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_ADDRESS');
  const to = process.env.LEADS_TO_EMAIL || siteConfig.email;
  const cc = (process.env.LEADS_CC_EMAIL || '')
    .split(/[,;]/)
    .map((a) => a.trim())
    .filter((a) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a) && a.toLowerCase() !== to.toLowerCase());
  const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';

  const rows = Object.entries(fields).filter(([, v]) => v !== undefined && v !== '');
  const label = KIND_LABEL[kind];
  const when = new Date().toISOString();
  const textbody = [`${label} from the ${siteConfig.name} website`, '', ...rows.map(([k, v]) => `${k}: ${v}`), '', `Received: ${when}`].join('\n');
  const htmlbody =
    `<p style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;margin:0 0 12px"><strong>${escapeHtml(label)}</strong> from the ${escapeHtml(siteConfig.name)} website</p>` +
    `<table style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(String(v))}</td></tr>`).join('') +
    `</table><p style="font:12px/1.5 -apple-system,Segoe UI,sans-serif;color:#888;margin:12px 0 0">Received ${when}</p>`;

  const payload: Record<string, unknown> = {
    from: { address: from, name: process.env.ZEPTOMAIL_FROM_NAME || `${siteConfig.name} website` },
    to: [{ email_address: { address: to, name: `${siteConfig.name} leads` } }],
    ...(cc.length ? { cc: cc.map((address) => ({ email_address: { address, name: address } })) } : {}),
    subject: `[${siteConfig.name}] ${label}${fields.name ? `: ${fields.name}` : ''}${fields.company ? ` (${fields.company})` : ''}`,
    textbody,
    htmlbody,
  };
  if (replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) payload.reply_to = [{ address: replyTo, name: fields.name || replyTo }];

  const res = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Zoho-enczapikey ${token}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = (await res.text().catch(() => '')).slice(0, 300);
    // An empty 500 is what the .com endpoint returns for a token issued in another data
    // centre; a 401 with a JSON body is a wrong token; a 4xx with details is a request
    // problem (an unverified from-domain, most often). Say which, so the log is enough.
    const hint =
      res.status >= 500 && !detail
        ? ' (empty response: if the ZeptoMail console is at zeptomail.zoho.eu or zeptomail.zoho.in, set ZEPTOMAIL_API_URL to https://api.zeptomail.eu/v1.1/email or https://api.zeptomail.in/v1.1/email)'
        : res.status === 401
          ? ' (the Send Mail Token is not accepted; copy it again from the Mail Agent in the ZeptoMail console)'
          : '';
    throw new Error(`ZeptoMail responded ${res.status} ${res.statusText} via ${url}${detail ? `: ${detail}` : ''}${hint}`);
  }
}

/*
 * Acknowledgement to the visitor: the confirmation the page shows, sent to the address
 * they entered, with what happens next and a way to reply.
 *
 * Kept deliberately separate from the team email above, which carries the internal
 * estimate built from list rates (lib/pricing-estimates.ts) and the visitor's free text:
 * neither may ever reach this email. Anyone can type someone else's address into a form,
 * so this email repeats only short, checked fields (a name and company with no links,
 * counts) and never a free-text message; the endpoints also run lib/lead-guard.ts first.
 * It is sent after the team email and never fails the request: the lead is already safe.
 */

const ACK: Record<AcknowledgedKind, { subject: string; thanks: string }> = {
  'book-demo': { subject: 'We received your demo request', thanks: 'Thank you for requesting a demo of Camzify.' },
  quote: { subject: 'We received your quote request', thanks: 'Thank you for requesting a quote from Camzify.' },
  contact: { subject: 'We received your message', thanks: 'Thank you for getting in touch with Camzify.' },
};

/** A short, link-free value safe to repeat back, or undefined. */
function safeEcho(v: unknown, max = 80): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.replace(/\s+/g, ' ').trim();
  if (!s || s.length > max) return undefined;
  if (/(https?:|www\.|\.[a-z]{2,}\/|@|<|>)/i.test(s)) return undefined;
  return s;
}

export async function sendAcknowledgement(
  kind: AcknowledgedKind,
  to: string,
  fields: { name?: unknown; company?: unknown; cameras?: unknown; configuration?: unknown },
): Promise<void> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return;
  const token = (process.env.ZEPTOMAIL_TOKEN || '').trim().replace(/^Zoho-enczapikey\s+/i, '');
  const from = (process.env.ZEPTOMAIL_FROM_ADDRESS || '').trim();
  if (!token || !from) return;
  const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';

  const name = safeEcho(fields.name, 60);
  const echo: [string, string | undefined][] = [
    ['Company', safeEcho(fields.company)],
    ['Cameras', safeEcho(fields.cameras, 20)],
    // Counts only, built by the endpoint from numbers (never the estimate).
    ['Configuration', safeEcho(fields.configuration, 200)],
  ];
  const rows = echo.filter(([, v]) => v) as [string, string][];
  const site = siteConfig.url;
  const links: [string, string][] = [
    ['How a virtual patrol round works', `${site}/virtual-patrolling/how-it-works`],
    ['Cameras that work with Camzify', `${site}/supported-cameras`],
    ['Pricing', `${site}/pricing`],
  ];
  const { subject, thanks } = ACK[kind];
  const greeting = name ? `Hi ${name},` : 'Hello,';
  const confirmation = LEAD_MESSAGES[kind];
  const footer = `You received this because this address was entered on a form at ${site.replace(/^https?:\/\//, '')}. If that was not you, you can ignore this email.`;

  const textbody = [
    greeting, '', thanks, confirmation, '',
    ...(rows.length ? ['What you sent us:', ...rows.map(([k, v]) => `  ${k}: ${v}`), ''] : []),
    'While you wait:', ...links.map(([l, u]) => `  ${l}: ${u}`), '',
    `Reply to this email, or call us on ${siteConfig.phone}.`, '',
    `The ${siteConfig.name} team`, siteConfig.legalName, formattedAddress, '', footer,
  ].join('\n');

  const p = 'font:15px/1.6 -apple-system,Segoe UI,sans-serif;margin:0 0 14px;color:#111';
  const small = 'font:12px/1.5 -apple-system,Segoe UI,sans-serif;color:#777;margin:18px 0 0';
  const htmlbody =
    `<div style="max-width:560px">` +
    `<p style="${p}">${escapeHtml(greeting)}</p>` +
    `<p style="${p}">${escapeHtml(thanks)} ${escapeHtml(confirmation)}</p>` +
    (rows.length
      ? `<p style="${p};margin-bottom:6px"><strong>What you sent us</strong></p><table style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;border-collapse:collapse;margin:0 0 14px">` +
        rows.map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#666">${escapeHtml(k)}</td><td style="padding:2px 0">${escapeHtml(v)}</td></tr>`).join('') +
        `</table>`
      : '') +
    `<p style="${p};margin-bottom:6px"><strong>While you wait</strong></p><ul style="font:14px/1.7 -apple-system,Segoe UI,sans-serif;margin:0 0 14px;padding-left:20px">` +
    links.map(([l, u]) => `<li><a href="${escapeHtml(u)}" style="color:#c0392b">${escapeHtml(l)}</a></li>`).join('') +
    `</ul>` +
    `<p style="${p}">Reply to this email, or call us on ${escapeHtml(siteConfig.phone)}.</p>` +
    `<p style="${p}">The ${escapeHtml(siteConfig.name)} team<br><span style="color:#666">${escapeHtml(siteConfig.legalName)}, ${escapeHtml(formattedAddress)}</span></p>` +
    `<p style="${small}">${escapeHtml(footer)}</p></div>`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Zoho-enczapikey ${token}` },
    body: JSON.stringify({
      from: { address: from, name: siteConfig.name },
      to: [{ email_address: { address: to, name: name || to } }],
      reply_to: [{ address: siteConfig.email, name: siteConfig.name }],
      subject: `${subject} | ${siteConfig.name}`,
      textbody,
      htmlbody,
    }),
  });
  if (!res.ok) throw new Error(`ZeptoMail acknowledgement responded ${res.status} ${res.statusText}`);
}
