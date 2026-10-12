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
 *
 * DESIGN. Built for email clients, not browsers: a 600px table layout with inline styles
 * only (Gmail strips <style>, Outlook ignores most CSS), the logo as a hosted PNG with
 * explicit size and alt text, a hidden preheader for the inbox preview, and colors
 * pinned to light so dark-mode clients do not invert them into something unreadable.
 * Every line of copy about what happens next is wording already on the site
 * (/book-a-demo, the pricing quote step, the forms' confirmations): CLAUDE.md rule 2.
 * Preview it with renderAcknowledgement() before changing it.
 */
const ACK: Record<AcknowledgedKind, { subject: string; eyebrow: string; heading: string; steps: string[]; cta: [string, string] }> = {
  'book-demo': {
    subject: 'We received your demo request',
    eyebrow: 'Demo request received',
    heading: 'we have your demo request',
    steps: [
      'We get in touch to schedule your session.',
      '15 minutes, no slides, just the live product: a patrol round run across real cameras.',
      'A custom quote based on your sites and camera count. No commitment: nothing is agreed until a quote says so.',
    ],
    cta: ['See how a patrol round works', '/virtual-patrolling/how-it-works'],
  },
  quote: {
    subject: 'We received your quote request',
    eyebrow: 'Quote request received',
    heading: 'we have your quote request',
    steps: [
      'We review the configuration you built.',
      'We send you a quote for it, set for your site.',
      'Any annual-term or volume discount is applied to the quote.',
    ],
    cta: ['Review pricing', '/pricing'],
  },
  contact: {
    subject: 'We received your message',
    eyebrow: 'Message received',
    heading: 'we have your message',
    steps: [
      'Your message is with our team.',
      'We reply to you at this email address.',
    ],
    cta: ['Explore Camzify', '/'],
  },
};

/** A short, link-free value safe to repeat back, or undefined. */
function safeEcho(v: unknown, max = 80): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.replace(/\s+/g, ' ').trim();
  if (!s || s.length > max) return undefined;
  if (/(https?:|www\.|\.[a-z]{2,}\/|@|<|>)/i.test(s)) return undefined;
  return s;
}

type AckFields = { name?: unknown; company?: unknown; cameras?: unknown; configuration?: unknown };

/** Subject, HTML and plain-text bodies of the acknowledgement. Pure: safe to preview. */
export function renderAcknowledgement(kind: AcknowledgedKind, fields: AckFields): { subject: string; html: string; text: string } {
  const c = ACK[kind];
  const site = siteConfig.url;
  const domain = site.replace(/^https?:\/\//, '');
  const first = safeEcho(fields.name, 60)?.split(' ')[0];
  const sentence = `${c.heading.charAt(0).toUpperCase()}${c.heading.slice(1)}.`;
  const heading = first ? `Thanks, ${first}. ${sentence}` : `Thank you. ${sentence}`;
  const confirmation = LEAD_MESSAGES[kind];
  const rows = ([
    ['Company', safeEcho(fields.company)],
    ['Cameras', safeEcho(fields.cameras, 20)],
    // Counts only, built by the endpoint from numbers (never the estimate).
    ['Configuration', safeEcho(fields.configuration, 200)],
  ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
  // The button already links one of these; do not list it twice.
  const links = ([
    ['How a virtual patrol round works', `${site}/virtual-patrolling/how-it-works`],
    ['Cameras that work with Camzify', `${site}/supported-cameras`],
    ['Pricing', `${site}/pricing`],
  ] as [string, string][]).filter(([, u]) => u !== site + c.cta[1]);
  const phoneHref = `tel:${siteConfig.phone.replace(/\s/g, '')}`;
  const why = `You received this email because this address was entered on a form at ${domain}. If that was not you, you can ignore it; nothing else will follow.`;

  // Palette from the site: primary is hsl(0 99% 33%), foreground hsl(215 25% 10%).
  const RED = '#A70101';
  const INK = '#131921';
  const MUTED = '#5B6472';
  const LINE = '#E6E9EE';
  const SOFT = '#F6F7F9';
  const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const e = escapeHtml;

  const stepRows = c.steps
    .map(
      (t, i) =>
        `<tr><td valign="top" style="padding:0 14px 14px 0;width:28px"><div style="width:26px;height:26px;border-radius:13px;background:${RED};color:#ffffff;font:600 13px/26px ${FONT};text-align:center">${i + 1}</div></td>` +
        `<td valign="top" style="padding:3px 0 14px 0;font:15px/1.55 ${FONT};color:${INK}">${e(t)}</td></tr>`,
    )
    .join('');

  const summary = rows.length
    ? `<tr><td style="padding:0 32px 28px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SOFT};border:1px solid ${LINE};border-radius:10px"><tr><td style="padding:18px 20px">` +
      `<div style="font:600 11px/1.4 ${FONT};letter-spacing:1px;text-transform:uppercase;color:${MUTED};margin:0 0 10px">Your request</div>` +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">` +
      rows.map(([k, v]) => `<tr><td valign="top" style="padding:4px 14px 4px 0;font:14px/1.5 ${FONT};color:${MUTED};white-space:nowrap;width:96px">${e(k)}</td><td style="padding:4px 0;font:14px/1.5 ${FONT};color:${INK}">${v.split('; ').map(e).join('<br>')}</td></tr>`).join('') +
      `</table></td></tr></table></td></tr>`
    : '';

  const html =
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"><title>${e(c.subject)}</title></head>` +
    `<body style="margin:0;padding:0;background:#EEF1F4;-webkit-text-size-adjust:100%">` +
    // Preheader: the line inbox lists show after the subject. Hidden in the body.
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${e(confirmation)}</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF1F4"><tr><td align="center" style="padding:32px 12px">` +
    `<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${LINE}">` +
    `<tr><td style="height:4px;background:${RED};font-size:0;line-height:0">&nbsp;</td></tr>` +
    `<tr><td style="padding:28px 32px 8px 32px"><a href="${e(site)}" style="text-decoration:none"><img src="${e(site + siteConfig.logo)}" width="150" height="31" alt="${e(siteConfig.name)}" style="display:block;border:0;width:150px;height:auto"></a></td></tr>` +
    `<tr><td style="padding:24px 32px 0 32px"><div style="font:600 12px/1.4 ${FONT};letter-spacing:1px;text-transform:uppercase;color:${RED}">${e(c.eyebrow)}</div>` +
    `<h1 style="margin:10px 0 0;font:700 26px/1.25 ${FONT};color:${INK}">${e(heading)}</h1>` +
    `<p style="margin:14px 0 26px;font:16px/1.6 ${FONT};color:${MUTED}">${e(confirmation)}</p></td></tr>` +
    summary +
    `<tr><td style="padding:0 32px 8px 32px"><div style="font:700 17px/1.4 ${FONT};color:${INK};margin:0 0 16px">What happens next</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${stepRows}</table></td></tr>` +
    `<tr><td style="padding:10px 32px 30px 32px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:8px;background:${RED}">` +
    `<a href="${e(site + c.cta[1])}" style="display:inline-block;padding:13px 24px;font:600 15px/1.2 ${FONT};color:#ffffff;text-decoration:none;border-radius:8px">${e(c.cta[0])} &rarr;</a></td></tr></table></td></tr>` +
    `<tr><td style="padding:0 32px"><div style="height:1px;background:${LINE};font-size:0;line-height:0">&nbsp;</div></td></tr>` +
    `<tr><td style="padding:24px 32px 6px 32px"><div style="font:700 15px/1.4 ${FONT};color:${INK};margin:0 0 10px">While you wait</div>` +
    links.map(([l, u]) => `<div style="margin:0 0 8px"><a href="${e(u)}" style="font:15px/1.5 ${FONT};color:${RED};text-decoration:none">${e(l)} &rsaquo;</a></div>`).join('') +
    `</td></tr>` +
    `<tr><td style="padding:16px 32px 32px 32px"><p style="margin:0;font:15px/1.6 ${FONT};color:${INK}">Questions before then? Just reply to this email, or call us on <a href="${e(phoneHref)}" style="color:${RED};text-decoration:none;white-space:nowrap">${e(siteConfig.phone)}</a>.</p>` +
    `<p style="margin:18px 0 0;font:15px/1.6 ${FONT};color:${INK}">The ${e(siteConfig.name)} team</p></td></tr>` +
    `<tr><td style="background:${SOFT};border-top:1px solid ${LINE};padding:22px 32px">` +
    `<p style="margin:0;font:13px/1.6 ${FONT};color:${MUTED}"><strong style="color:${INK}">${e(siteConfig.legalName)}</strong><br>${e(formattedAddress)}<br>` +
    `<a href="mailto:${e(siteConfig.email)}" style="color:${MUTED}">${e(siteConfig.email)}</a> &nbsp;&middot;&nbsp; <a href="${e(site)}" style="color:${MUTED}">${e(domain)}</a></p>` +
    `<p style="margin:12px 0 0;font:12px/1.6 ${FONT};color:#8A93A0">${e(why)}</p></td></tr>` +
    `</table></td></tr></table></body></html>`;

  const text = [
    heading,
    '',
    confirmation,
    '',
    ...(rows.length ? ['Your request', ...rows.map(([k, v]) => `  ${k}: ${v}`), ''] : []),
    'What happens next',
    ...c.steps.map((t, i) => `  ${i + 1}. ${t}`),
    '',
    `${c.cta[0]}: ${site}${c.cta[1]}`,
    '',
    'While you wait:',
    ...links.map(([l, u]) => `  ${l}: ${u}`),
    '',
    `Questions before then? Reply to this email, or call us on ${siteConfig.phone}.`,
    '',
    `The ${siteConfig.name} team`,
    `${siteConfig.legalName}, ${formattedAddress}`,
    `${siteConfig.email} | ${domain}`,
    '',
    why,
  ].join('\n');

  return { subject: `${c.subject} | ${siteConfig.name}`, html, text };
}

export async function sendAcknowledgement(kind: AcknowledgedKind, to: string, fields: AckFields): Promise<void> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return;
  const token = (process.env.ZEPTOMAIL_TOKEN || '').trim().replace(/^Zoho-enczapikey\s+/i, '');
  const from = (process.env.ZEPTOMAIL_FROM_ADDRESS || '').trim();
  if (!token || !from) return;
  const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';
  const { subject, html, text } = renderAcknowledgement(kind, fields);
  const name = safeEcho(fields.name, 60);

  const res = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Zoho-enczapikey ${token}` },
    body: JSON.stringify({
      from: { address: from, name: siteConfig.name },
      to: [{ email_address: { address: to, name: name || to } }],
      reply_to: [{ address: siteConfig.email, name: siteConfig.name }],
      subject,
      textbody: text,
      htmlbody: html,
    }),
  });
  if (!res.ok) throw new Error(`ZeptoMail acknowledgement responded ${res.status} ${res.statusText}`);
}
