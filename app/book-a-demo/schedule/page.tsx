import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScheduleFromLink } from './_components/schedule-from-link';

/**
 * Where the demo confirmation email's "Pick a time" button lands
 * (/book-a-demo/schedule#<token>, lib/demo-booking.ts). It only works with the token from
 * that email, so it is noindex and deliberately left out of lib/routes.ts and the
 * sitemap: a page that asks search engines not to index it does not belong in a sitemap.
 */
const pageMeta = {
  title: 'Pick a Time for Your Demo',
  description: 'Choose a time for the Camzify demo you requested.',
  path: '/book-a-demo/schedule',
};

export const metadata = generatePageMeta({ ...pageMeta, noIndex: true });

export default function ScheduleDemoPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Book a Demo', href: '/book-a-demo' }, { label: 'Pick a time' }]} showCTA={false}>
      <section className="pb-20">
        <div className="mx-auto max-w-xl px-6">
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Pick a time for your demo</h1>
          <p className="mt-4 text-muted-foreground">Choose any open time below. You will get a Google Calendar invitation with the video link.</p>
          <div className="mt-8">
            <ScheduleFromLink />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
