# Demo self-scheduling

After someone sends the demo form, they can pick a time for the call on camzify.com. The
slot picker reads the team's Google Calendar, books the slot and adds a Google Meet link.
The visitor's confirmation comes from camzify.com, not from Google. No third-party
booking tool is involved.

## How it works

1. `/api/book-demo` stores the request (Neon) and replies with a **booking token**: the
   row id, an expiry (21 days) and an HMAC signature. No name or email is in it.
2. The confirmation screen shows the picker (`components/content/demo-scheduler.tsx`). The
   confirmation email has a **Pick a time** button to `/book-a-demo/schedule#<token>` for
   anyone who closes the tab. The token is in the URL fragment, which browsers never send
   to a server. That page is noindex and is not in the sitemap.
3. `/api/demo-slots` asks Google Calendar when the calendar is busy (free/busy only, never
   event details) and returns the open slots. The picker shows them in the visitor's own
   time zone.
4. `/api/demo-booking` checks the slot again and claims it in the `DemoBooking` table (one
   booking per request, one request per slot). It then creates the calendar event with a
   Meet link, adding the visitor as a guest so Meet admits them without "ask to join".
   Google's own emails are off (`sendUpdates=none`).
5. The visitor gets a confirmation from the Camzify address (`lib/demo-confirmation.ts`):
   - the time in their time zone and in Singapore
   - a **Join with Google Meet** button
   - a calendar file (`camzify-demo.ics`) and an "add to Google Calendar" link

   The booked screen on the site shows the Meet link too. The team gets **Demo booked**
   with both time zones and the Meet link.

**The rules** live in `lib/demo-scheduling.ts`, set by the business on 2026-11-20:

| Rule | Setting |
|---|---|
| Days and hours | Monday to Friday, 9am to 6pm Singapore time (last start 5:30pm) |
| Call length | 30 minutes |
| Gap | 15 minutes clear before and after anything in the calendar |
| Start times | On the hour and half hour |
| Notice | At least 4 hours |
| Window | Up to 14 days ahead |

Anything in the calendar marked **Busy** blocks time, demo or not, with the 15-minute gap
around it. Two things do not block:

- **All-day events.** Google creates these as "Free". For a day off, use an **Out of
  office** event, or set the all-day event to **Show as: Busy**.
- **Events marked Free.**

Only the connected calendar is checked, not other calendars on other accounts.

**Moving or cancelling.** The visitor replies to the confirmation email, which goes to the
team's address. The team moves or deletes the event in Google Calendar. When Google asks
whether to email the guest about the change, choose **Don't send** and reply to the
visitor yourself, so everything they get comes from Camzify. A deleted or cancelled event
frees its slot for the next booking.

## Switched on by five variables

Scheduling is on only when the lead database is connected **and** all of these are set
(Vercel → camzify-website → Settings → Environment Variables, Production and Preview):

| Variable | What it is |
|---|---|
| `GOOGLE_CLIENT_ID` | The OAuth client ID (step 4 below) |
| `GOOGLE_CLIENT_SECRET` | The OAuth client secret (step 4) |
| `GOOGLE_REFRESH_TOKEN` | Printed by `scripts/google-calendar-auth.mjs` (step 5) |
| `BOOKING_TOKEN_SECRET` | Any long random string: `openssl rand -base64 32` |
| `GOOGLE_CALENDAR_ID` | Optional. Defaults to the account's main calendar (`primary`) |

When any is missing, the site behaves as before: the team schedules by email.

## One-time setup (personal Gmail)

The demo calendar is a personal Gmail account. Prospects never get email from it: their
confirmation comes from Camzify. The Gmail account is still the Meet call's host, so
whoever runs demos signs in to it to start the call. A dedicated Gmail account for demos
is easiest to share.

1. **Create a Google Cloud project.** Go to <https://console.cloud.google.com>, signed in
   as the demo Gmail account. Use the project picker → New project, and name it
   "Camzify website".
2. **Turn on the Calendar API.** Go to APIs & Services → Library, search for "Google
   Calendar API" and click Enable.
3. **Set up the consent screen.** Go to APIs & Services → OAuth consent screen (also
   called Google Auth Platform).
   - **Branding:** app name "Camzify website", with your email as the support and
     developer contact.
   - **Audience:** External.
   - **Publish the app** (Audience → Publish app → "In production"). **This step
     matters.** In "Testing", Google expires the connection after 7 days and booking
     stops. Google does not need to verify the app for this, because only you sign in
     to it.
4. **Create the client.** Go to Clients (or Credentials) → Create client → Application
   type **Desktop app**, named "Camzify website". Copy the client ID and secret.
5. **Connect the calendar.** In a terminal, in this repository, run:

   ```bash
   GOOGLE_CLIENT_ID="…" GOOGLE_CLIENT_SECRET="…" node scripts/google-calendar-auth.mjs
   ```

   - A Google sign-in opens. Choose the demo Gmail account.
   - Google warns "Google hasn't verified this app", because it's your own app. Click
     **Advanced → Go to Camzify website**.
   - Tick **both** permissions: see when the calendar is free or busy, and view and edit
     events.
   - The terminal prints the refresh token.
6. **Add the variables in Vercel** (the table above), then redeploy.
7. **Test it.** Send a demo request on camzify.com with your own email, pick a time, and
   confirm the event appears in the calendar with a Meet link and the invitation arrives.
   Delete the test event and the test rows in Neon afterwards.

If booking ever stops with `invalid_grant` in the logs, the connection was revoked or the
app went back to Testing. Repeat step 5 and replace `GOOGLE_REFRESH_TOKEN`.

## Trying it locally

`npm run dev` with a local Postgres and these in `.env.local`. The stand-in calendar
reports 11:00–12:00 Singapore busy each day and never calls Google; it is ignored outside
development.

```bash
DATABASE_URL="postgresql://…"
BOOKING_TOKEN_SECRET="anything"
GOOGLE_CALENDAR_MOCK="1"
```
