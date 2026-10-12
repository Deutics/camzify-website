import { generatePageMeta } from '@/lib/page-utils';
import { PhotoFigure } from '@/components/content/photo-figure';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * The buyer's guide behind "people counter" / "people counting" / "footfall counter" (one
 * Google Ads cluster, ~2,400 US searches a month, KD 1, ~640 AI searches) and the sensor,
 * retail-traffic and foot-traffic terms around it (DataForSEO, 2026-10-12). It answers the
 * comparison and cost questions the SERP asks and hands the reader to the feature page
 * /ai-features/occupancy-and-peak-hour-trends, which keeps "people counting camera"; the
 * two pages must not compete for one query.
 *
 * Facts and where they come from:
 * - Counting in and out: a line across an entrance counts people entering and leaving
 *   separately (confirmed by the business 2026-10-12); direction rules per line are on
 *   /ai-features/line-intrusion-detection. Occupancy per zone and hour/day trends are on
 *   /ai-features/occupancy-and-peak-hour-trends, including its dense-crowd caveat.
 * - Counter types and the accuracy ranges quoted are Wikipedia's ("People counter"),
 *   device prices are IDT Electronics' own homepage: both opened 2026-10-12, listed in
 *   Sources. Camzify has no verified accuracy figure; none is stated or implied.
 * - Pricing: the two public figures only (CLAUDE.md rule 2).
 */
const pageMeta = {
  title: 'People Counters: Sensors vs the Cameras You Own',
  description: 'What a people counter is, how sensors and cameras count foot traffic, what each costs, and how to count people in and out with the security cameras you own.',
  path: '/guides/people-counters-sensors-vs-cameras',
};

const publishedTime = '2026-10-12';
const modifiedTime = '2026-10-12';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'What is a people counter?', answer: 'A device or software that counts the people passing through an entrance or present in an area. Types range from manual clickers and infrared beams to thermal sensors, Wi-Fi counting and video counting from cameras.' },
  { question: 'Can I count people with the security cameras I already have?', answer: 'Yes, if a camera has a clear view of the entrance or area. With Camzify, a line drawn across the entrance counts people entering and leaving separately, and occupancy per zone builds hour-by-hour and day-by-day trends, with no counting hardware added.' },
  { question: 'How much does a people counter cost?', answer: 'Dedicated counters are bought per entrance: IDT Electronics, for example, lists models from $139 to $889 each. Counting on cameras you already own is a software cost instead: Camzify starts from $5 per camera per month, with most cameras between $20 and $90 per camera per month depending on which detections run.' },
  { question: 'Which type of people counter is most accurate?', answer: 'Wikipedia\'s overview of people counters gives an expected accuracy of 60% to 80% for first-generation infrared beam counters and 80% to 95% for third-generation video counters. Accuracy at a real door depends on the mounting, the light and how crowded it gets, so test at your own entrance.' },
  { question: 'Does camera-based counting identify people?', answer: 'Not on Camzify. The standard detections count and track people as anonymous subjects; none of them identifies anyone.' },
  { question: 'How do I count foot traffic across several stores?', answer: 'With one platform for every site. Dedicated counters report per device; a cloud video management system counts on each store\'s cameras and rolls the figures up across every site on one login.' },
];

export default function PeopleCountersGuidePage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[
        articleSchema({ headline: 'People counters: sensors vs the cameras you already own', description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }),
        personSchema(),
      ]}
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'People Counters' },
      ]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">People counters: sensors vs the cameras you already own</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">A people counter is a sensor over a door, or software reading camera video, that measures how many people pass through an entrance or occupy a space.</strong>{' '}
            Most businesses that want the numbers already have the second kind of hardware on the wall: a security camera watching the entrance. This guide compares the two routes, what each costs, how accurate each tends to be, and what counting with the cameras you already own looks like in practice.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/feature-occupancy-and-peak-hour-trends-1.webp" alt="The Camzify console showing occupancy and peak-hour trends from a site's existing cameras" caption="Occupancy and peak-hour trends from existing cameras" priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What is a people counter?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A people counter is any method of counting the people who pass a point or occupy an area: a staff member with a clicker, a beam across a doorway, a sensor in the ceiling, or software counting people in a camera&rsquo;s view. Wikipedia defines it as &ldquo;an electronic device that is used to measure the number of people traversing a certain passage or entrance&rdquo;. In retail the result is usually called footfall or foot traffic; in a venue or office, occupancy.
                </p>
                <p>
                  Two different numbers hide behind the word. <em>Entries</em> (or footfall) is how many people came in over a period. <em>Occupancy</em> is how many are inside right now. A door counter gives the first; working out the second means subtracting exits from entries, which only works if the counter tells the two directions apart.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does a people counter work, and what are the main types?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Every type detects a person passing a point and adds one to a total. They differ in what they sense:</p>
                <PointList items={[
                  'Infrared beam: a beam across the doorway, broken by each person who walks through. Cheap and simple; Wikipedia notes that early beam counters halved their total on the assumption that people leave by the door they came in.',
                  'Thermal: an overhead sensor that counts heat signatures. Wikipedia notes thermal counters have difficulty measuring how long people stay beyond a few seconds.',
                  '3D or overhead: a unit above the doorway that counts people from overhead and senses their direction of travel.',
                  'Wi-Fi and Bluetooth: counting the phones nearby. It covers wide areas, but not everyone carries a phone, and phones now rotate the identifiers this method relies on.',
                  'AI video: software that tracks people in a camera\'s view and counts them as they cross a line drawn across the entrance, in each direction, or as they occupy a zone. It runs on a camera that is already there.',
                ]} />
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Which type of people counter is most accurate?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The published ranges favor overhead and video counting. Wikipedia&rsquo;s overview gives first-generation infrared beam counters an &ldquo;expected accuracy level of 60% to 80%&rdquo;, and third-generation video counters an &ldquo;expected accuracy rate of the device&rdquo; of 80% to 95%.
                </p>
                <p>
                  The figure that matters, though, is the one at your door. Every type loses accuracy to the same things: a mounting angle that sees people overlap, strong backlight from a glass entrance, and crowds that bunch at peak times. Camera counting built on tracking holds up well in moderately busy areas; in a very dense crowd individual tracks are harder to separate, so at that density the figure is best read as a reliable trend rather than an exact headcount. Test any method at your own entrance before you rely on it for staffing or conversion figures.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How much does a people counter cost?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Dedicated counters are bought per entrance. IDT Electronics, for example, lists models from $139 for a battery unit that counts door swings to $889 for an overhead unit with directional sensing that saves hourly totals, before installation and before any software to bring several doors together.
                </p>
                <p>
                  Counting with cameras you already own moves the cost from hardware to software. On{' '}
                  <Link href="/pricing" className="text-primary hover:underline">Camzify</Link>, pricing is per instance per month and quoted for the site: it starts from $5 per camera per month, and most cameras land between $20 and $90 per camera per month depending on which detections run. The same camera keeps its other jobs, recording and security detections, so the counting is not paying for a camera on its own.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Can you count people with the security cameras you already have?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Yes, and in both ways a business needs. A virtual line drawn across the entrance in the camera view counts people as they cross it, entering and leaving separately, using the same{' '}
                  <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line crossing</Link>{' '}
                  that sets a direction rule per line for security alerts. And{' '}
                  <Link href="/ai-features/occupancy-and-peak-hour-trends" className="text-primary hover:underline">occupancy and peak-hour trends</Link>{' '}
                  count the people in each zone of a camera&rsquo;s view continuously, building a live figure and a history by hour of day and day of week.
                </p>
                <p>
                  Both run on cameras already installed, from any maker, as long as the camera&rsquo;s stream reaches the platform:{' '}
                  <Link href="/supported-cameras" className="text-primary hover:underline">any camera with an RTSP stream</Link>{' '}
                  works, and cameras on a local network connect through the{' '}
                  <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>{' '}
                  without port forwarding. Nothing is mounted over the door.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <div className="mt-12 max-w-3xl">
            <PhotoFigure src="/feature-line-intrusion-detection-2.webp" alt="A camera view with a virtual line drawn across an entrance, the kind of line that counts people entering and leaving" caption="A line across the entrance counts each direction separately" />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you measure foot traffic, and which numbers matter?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Count at the entrance, keep the history, and read four numbers from it:</p>
                <PointList items={[
                  'Entries per day and per hour: the footfall figure itself, the basis for every comparison week on week and store to store.',
                  'Peak hours and days: when the building is busiest, which is the number staffing decisions are made on.',
                  'Live occupancy: how many people are inside now, from entries minus exits or from a zone count, which matters wherever a space has a limit.',
                  'Conversion rate: transactions divided by visitors, the retail figure that turns footfall into a measure of how well the store sells.',
                ]} />
                <p>
                  The first three come straight from the counts. Conversion needs your sales figure alongside them, which is why it is the number most counting projects are bought for and the last one to arrive.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where should a people counter or counting camera go?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Over or facing the entrance, with the whole doorway in view and people passing through one or two at a time. For a camera, that usually means an angle from above rather than straight on, so people do not hide behind each other, and the counting line drawn across the doorway itself rather than across the open floor. Glass entrances that throw strong backlight at the camera are worth checking at the brightest time of day.
                </p>
                <p>
                  Many sites find a camera already in that position, because the entrance is the first thing a security camera is put on. Where one is not, adding a camera there gives counting and security from the same device.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Is camera-based people counting private?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Counting does not need to know who anyone is, and on Camzify it does not: the standard detections count and track people as anonymous subjects, and none of them identifies anyone. The count is a number per line, zone and hour. Footage is recorded only under the retention period set for that camera, and in the cloud deployment it is kept in Amazon S3 in the AWS region nearest your sites; where it must stay on site, Camzify is{' '}
                  <Link href="/platform/deployment-options" className="text-primary hover:underline">deployed on premises</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Dedicated counters or camera software: which fits a business with many sites?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A dedicated counter suits one door where no camera can see the entrance and nothing else is needed from the hardware. Camera software suits almost everything else, and the gap widens with every site:
                </p>
                <PointList items={[
                  'No device per door: each entrance is counted by the camera already covering it.',
                  'Every site in one place: counts from every store roll up on one login, instead of one device and one report per door.',
                  'More than a number: the same cameras record, run security detections and, if you choose, scheduled patrol rounds, so counting is one use of a system you would run anyway.',
                  'Security on the same feed: the detections that watch for intrusion or loitering on those cameras notify the right person within seconds of a confirmed detection; the counts themselves are read, not alarmed.',
                ]} />
                <p>
                  For chains and franchises, see{' '}
                  <Link href="/guides/cloud-vms-for-multiple-sites" className="text-primary hover:underline">a cloud VMS for multiple sites</Link>{' '}
                  and the{' '}
                  <Link href="/industries/retail" className="text-primary hover:underline">retail</Link>{' '}
                  page; for venues with a capacity limit,{' '}
                  <Link href="/use-cases/occupancy-limits-for-venues-and-public-spaces" className="text-primary hover:underline">occupancy limits for venues and public spaces</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16 max-w-prose">
            <h2 className="font-display text-2xl font-bold">Sources, checked 12 October 2026</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                <a href="https://en.wikipedia.org/wiki/People_counter" className="text-primary hover:underline" rel="noopener nofollow" target="_blank">Wikipedia: People counter</a>: definition, counter types, the accuracy ranges quoted, and the limits of thermal and Wi-Fi counting.
              </li>
              <li>
                <a href="https://idtelectronics.com/" className="text-primary hover:underline" rel="noopener nofollow" target="_blank">IDT Electronics</a>: device prices and features as listed on its homepage.
              </li>
            </ul>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Count people on the cameras you have</h2>
            <p className="mt-3 max-w-prose text-muted-foreground">
              See footfall, occupancy and peak hours from your own entrance cameras in a demo, before anything is bought.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/ai-features/occupancy-and-peak-hour-trends" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Occupancy and peak-hour trends</Link>
              <Link href="/use-cases/occupancy-monitoring" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Occupancy monitoring</Link>
              <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Using existing cameras with a cloud VMS</Link>
              <Link href="/business-security-cameras" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Business security cameras</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/book-a-demo" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">Book a demo on your cameras</Link>
              <Link href="/pricing" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">See pricing</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
