#!/usr/bin/env node
/**
 * One-time: connects the demo calendar. Prints the GOOGLE_REFRESH_TOKEN that lets the
 * site read busy times and create demo events in one Google account's calendar
 * (lib/google-calendar.ts). docs/DEMO-SCHEDULING.md has the whole setup.
 *
 *   GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/google-calendar-auth.mjs
 *
 * The client is a Google Cloud OAuth client of type "Desktop app". The script listens
 * on a loopback port, opens Google's consent page in the browser, and exchanges the code
 * for a refresh token. Sign in as the account whose calendar should take the demos.
 * Nothing is written to disk; copy the printed token into Vercel yourself.
 */
import http from 'node:http';
import { execFile } from 'node:child_process';
import { createInterface } from 'node:readline/promises';

const SCOPES = ['https://www.googleapis.com/auth/calendar.freebusy', 'https://www.googleapis.com/auth/calendar.events'];

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question(question)).trim();
  rl.close();
  return answer;
}

const clientId = process.env.GOOGLE_CLIENT_ID?.trim() || (await ask('OAuth client ID: '));
const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim() || (await ask('OAuth client secret: '));
if (!clientId || !clientSecret) {
  console.error('Both the client ID and the client secret are needed.');
  process.exit(1);
}

const server = http.createServer();
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const redirectUri = `http://127.0.0.1:${server.address().port}`;

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.search = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: 'code',
  scope: SCOPES.join(' '),
  access_type: 'offline',
  prompt: 'consent',
}).toString();

console.log('\nOpening Google sign-in. If the browser does not open, visit:\n\n' + authUrl + '\n');
execFile(process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer' : 'xdg-open', [authUrl.toString()], () => {});

const code = await new Promise((resolve, reject) => {
  server.on('request', (req, res) => {
    const url = new URL(req.url, redirectUri);
    const error = url.searchParams.get('error');
    const value = url.searchParams.get('code');
    if (!error && !value) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(error ? `<p>Google returned: ${error}. You can close this tab.</p>` : '<p>Calendar connected. You can close this tab and go back to the terminal.</p>');
    server.close();
    error ? reject(new Error(`Google returned: ${error}`)) : resolve(value);
  });
});

const res = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
});
const body = await res.json();
if (!res.ok || !body.refresh_token) {
  console.error('No refresh token came back:', body.error ?? res.status, body.error_description ?? '');
  console.error('If you connected this app before, remove it at https://myaccount.google.com/permissions and run this again.');
  process.exit(1);
}
const granted = String(body.scope ?? '').split(' ');
const missing = SCOPES.filter((s) => !granted.includes(s));
if (missing.length) console.warn('\nWarning: these permissions were not granted (tick both boxes on the consent screen):', missing.join(', '));

console.log('\nGOOGLE_REFRESH_TOKEN (add it in Vercel; keep it secret):\n\n' + body.refresh_token + '\n');
