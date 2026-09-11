import { siteConfig } from '@/lib/site-config';

/*
 * Lead notification by email, through ZeptoMail (Zoho's transactional mail API).
 *
 * The four form endpoints call this first. Until the lead database is connected, the
 * email IS the record of the lead, so a failure here fails the request and the visitor
 * is told to try again or email us directly. When DATABASE_URL is present the routes
 * also write the row, non-fatally, so nothing changes here when the database arrives.
 *
 * Configuration (see .env.example): ZEPTOMAIL_TOKEN is the "Send Mail Token" from the
 * Mail Agent in the ZeptoMail console; ZEPTOMAIL_FROM_ADDRESS must be an address on a
 * domain verified in that account; LEADS_TO_EMAIL is where the leads land (defaults to
 * the public contact address). ZEPTOMAIL_API_URL only changes for the EU or India data
 * centres (api.zeptomail.eu, api.zeptomail.in).
 */
export type LeadKind = 'contact' | 'book-demo' | 'free-trial' | 'newsletter';

const KIND_LABEL: Record<LeadKind, string> = {
  contact: 'Contact form',
  'book-demo': 'Demo request',
  'free-trial': 'Free trial request',
  newsletter: 'Newsletter subscription',
};

export function mailConfigured(): boolean {
  return Boolean(process.env.ZEPTOMAIL_TOKEN && process.env.ZEPTOMAIL_FROM_ADDRESS);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

export async function sendLeadEmail(kind: LeadKind, fields: Record<string, string | undefined>, replyTo?: string): Promise<void> {
  const token = process.env.ZEPTOMAIL_TOKEN;
  const from = process.env.ZEPTOMAIL_FROM_ADDRESS;
  if (!token || !from) throw new Error('ZeptoMail is not configured: set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_ADDRESS');
  const to = process.env.LEADS_TO_EMAIL || siteConfig.email;
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
    const detail = await res.text().catch(() => '');
    throw new Error(`ZeptoMail responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}
