import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * "Intelligent video analytics" is the most-searched relevant term in the US market
 * (12,100 a month) and is a definition query, so it gets a guide rather than a hub
 * retitle. The guide defines the term, separates it from motion detection, and is
 * honest about accuracy without quoting a rate.
 */
const pageMeta = {
  title: "What Is Intelligent Video Analytics? | Guide",
  description: "Intelligent video analytics reads camera footage for objects and events and raises the ones that matter. What it detects, how it works, its limits.",
  path: "/guides/what-is-intelligent-video-analytics",
};

const published = '2026-09-07';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: published, modifiedTime: published });

const faqs = [
  { question: 'What is intelligent video analytics in one sentence?', answer: 'Software that watches camera footage the way a person would, recognizing people, vehicles and objects and what they are doing, and raises the events that match a rule you set, instead of recording everything for someone to review later.' },
  { question: 'Is it the same as motion detection?', answer: 'No. Motion detection reacts to any change between frames, so headlights, rain and a swaying branch all count. Intelligent video analytics first works out what is in the frame, then tracks it, then asks whether what it is doing matches a rule. A branch is not a person, so a person rule stays quiet.' },
  { question: 'Does it need special cameras?', answer: 'No. It runs on the video stream, so any camera that produces one will do. On Camzify that means any RTSP, RTMP or HTTPS stream, with cameras on a private network relayed through the Camzify Connector. Some cameras run analytics on the camera itself; the trade-offs are covered in the guide.' },
  { question: 'How accurate is it?', answer: 'Accurate enough to be useful and not accurate enough to act on unread. Every detection depends on the camera angle, the lighting and the distance, so a rate quoted without those is meaningless, and we do not publish one. What matters is that each detection carries the frame it was judged from, so a person can confirm it in seconds.' },
  { question: 'What does it cost?', answer: 'On Camzify each detection feature is licensed per camera it is enabled on, quoted for the site. We do not publish rates. The AI video analytics cost guide explains what the price depends on and how to compare quotes.' },
  { question: 'Where does it fit with virtual patrolling?', answer: 'Analytics watch each camera between rounds and notify within the window set for that camera. A patrol round is scheduled, steps through the cameras in order and answers a checklist at each one from the frame. Both use the same object tracking underneath and both land in the same alert queue.' },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-bold">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-prose text-muted-foreground">{children}</p>;
}
const link = 'text-primary hover:underline';

export default function WhatIsIntelligentVideoAnalyticsPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[
        articleSchema({ headline: 'What Is Intelligent Video Analytics?', description: pageMeta.description, path: pageMeta.path, datePublished: published, dateModified: published }),
        personSchema(),
      ]}
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'What Is Intelligent Video Analytics?' }]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What is intelligent video analytics?</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">Intelligent video analytics is software that reads camera footage for what is in it, people, vehicles, objects and what they are doing, and raises the events that match a rule you have set.</strong>{' '}
            It is the difference between a camera that records and a camera that notices. This guide explains what the phrase covers, how it differs from the motion detection built into most recorders, what it can and cannot see, and how to judge a vendor&apos;s claims about it.
          </p>

          <section className="mt-16">
            <ScrollReveal>
              <H2>What the &ldquo;intelligent&rdquo; part means</H2>
              <P>
                Plain video surveillance produces footage. Somebody has to watch it live, or search it after something has happened, and neither scales: a person watching sixteen screens misses most of what happens on them, and a search through a week of footage takes the better part of a day. Intelligent video analytics moves the watching into software. The software looks at every frame from every camera, all the time, and its job is to reduce that to a short list of events worth a person&apos;s attention.
              </P>
              <P>
                The word covers a wide range of ability. At the simple end, a rule that fires when a tracked person crosses a line. At the far end, a model that reads a scene and describes it in words, or that reconstructs the path one person took across several cameras. The <Link href="/ai-features" className={link}>AI detection features</Link> on Camzify span that range, and each one is a separate capability switched on per camera.
              </P>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <H2>How it differs from motion detection</H2>
              <P>
                Motion detection compares one frame with the next and reacts to change. It has no idea what changed, so a headlight sweep, a cloud shadow, rain and a swaying branch all trigger it, which is why the motion alerts on most recorders are switched off within a month of being switched on.
              </P>
              <P>
                Intelligent video analytics starts by working out what is in the frame. A detection model finds the people, vehicles and objects; a tracker follows each one from frame to frame so that it stays the same person as they walk across the view; and only then does a rule ask a question about that tracked thing: has it crossed this line, entered this zone, stayed here too long, is it wearing a hard hat. A branch is not a person, so a person rule stays quiet when the branch moves. The <Link href="/compare/ai-video-analytics-vs-motion-detection" className={link}>comparison page</Link> puts the two side by side, and the <Link href="/guides/how-to-reduce-false-alarms" className={link}>false alarms guide</Link> covers what to do when a rule is still too noisy.
              </P>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <H2>What it can detect</H2>
              <P>The capabilities group into five kinds of question, each of which the software answers about a tracked object rather than about pixels.</P>
              <ul className="mt-4 max-w-prose space-y-3 text-muted-foreground">
                {[
                  <><strong className="font-semibold text-foreground">Where something is.</strong> A person or vehicle crossing a <Link href="/ai-features/line-intrusion-detection" className={link}>line</Link>, entering a <Link href="/ai-features/zone-intrusion-detection" className={link}>zone</Link>, parked where it should not be, or driving the <Link href="/ai-features/wrong-way-vehicle-detection" className={link}>wrong way</Link>.</>,
                  <><strong className="font-semibold text-foreground">How long it has been there.</strong> <Link href="/ai-features/loitering-detection" className={link}>Loitering</Link> in a doorway, an <Link href="/ai-features/abandoned-object-detection" className={link}>object left</Link> in a corridor, a <Link href="/ai-features/tailgating-detection" className={link}>second person</Link> through a door on one badge.</>,
                  <><strong className="font-semibold text-foreground">What it is wearing or carrying.</strong> <Link href="/ai-features/ppe-violation-detection" className={link}>Hard hats, vests and gloves</Link> against the policy for a zone; a <Link href="/ai-features/weapons-detection" className={link}>visible weapon</Link>.</>,
                  <><strong className="font-semibold text-foreground">What is happening to people.</strong> A <Link href="/ai-features/slip-and-fall-detection" className={link}>fall</Link>, an <Link href="/ai-features/aggression-and-fight-detection" className={link}>altercation</Link>, a crowd forming where one should not.</>,
                  <><strong className="font-semibold text-foreground">What is happening to the scene.</strong> <Link href="/ai-features/fire-and-smoke-detection" className={link}>Flame or smoke</Link> in frame, a camera <Link href="/ai-features/camera-tampering-detection" className={link}>covered, turned or defocused</Link>, occupancy climbing past a limit.</>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /><span>{item}</span></li>
                ))}
              </ul>
              <P>
                A newer class of feature reads the scene in words rather than by rule. <Link href="/ai-features/ai-attribute-extraction" className={link}>Attribute extraction</Link> describes who was seen, <Link href="/ai-features/forensic-video-search" className={link}>forensic search</Link> finds them again by that description, and <Link href="/ai-features/behavioral-anomaly-detection" className={link}>behavioral anomaly detection</Link> lets you describe in plain language what to watch for.
              </P>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <H2>How a detection becomes a notification</H2>
              <P>
                A detection is not yet an alert. On Camzify every feature on every camera has a notification window: detection runs all the time, and only a detection inside the window becomes a message. A person in the loading bay is a detection at 14:00 and a notification at 02:00. Each notification carries the frame, the timestamp, the rule it matched and a link to the recorded clip, goes to the channels set for that camera and that severity, and can be acknowledged or escalated from the <Link href="/platform/notifications-and-alerts" className={link}>alert queue</Link>. The <Link href="/guides/how-to-manage-security-alerts" className={link}>alerts guide</Link> covers setting this up so the queue stays readable.
              </P>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <H2>Where it runs: on the camera, on a server, or in the cloud</H2>
              <P>
                Some cameras run analytics on the camera itself. That needs no bandwidth and no other equipment, and it is limited to what that camera&apos;s chip can do and what its maker chose to ship. A server on site runs richer models across every camera on the network, and has to be bought, housed and maintained. Cloud analytics run on the streams after they leave the site, so any camera qualifies and models improve without anyone touching hardware, at the cost of needing the upstream bandwidth to carry the streams.
              </P>
              <P>
                Camzify is the third kind. Cameras connect by RTSP, directly or through the <Link href="/camzify-connector" className={link}>Connector</Link>, and every feature is available on every connected camera. The <Link href="/platform/ai-architecture" className={link}>architecture page</Link> describes the layers from stream to notification, and <Link href="/cloud-video-surveillance" className={link}>cloud video surveillance</Link> covers the recording underneath.
              </P>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <H2>Accuracy, and why no rate is quoted here</H2>
              <P>
                Every vendor is asked how accurate it is, and the honest answer is that it depends on the camera. A person at ten meters in daylight from a well-placed camera is easy; the same person at forty meters, at night, from a camera pointed into a floodlight, is not. A detection rate quoted without the angle, the lighting and the distance is a marketing figure, and we do not publish one; the <Link href="/trust" className={link}>trust page</Link> lists what else we leave out.
              </P>
              <P>
                What replaces the number is evidence. Every detection carries the frame it was judged from, so a person can confirm or dismiss it in seconds, and every rule has a sensitivity, a minimum duration and a notification window that can be tuned against the false alerts it actually produces on that camera. The <Link href="/guides/how-to-choose-video-analytics-software" className={link}>buyer&apos;s guide</Link> lists the questions to ask a vendor, and a demo on your own cameras answers most of them.
              </P>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <H2>What it will not do</H2>
              <P>
                It will not see what the camera cannot: a corner without coverage, a lens that is dirty or dark, a person behind a vehicle. It will not know intent; it reports a person in a zone, not a burglar. It will not attend, and it should not act unread, which is why a person is always in the loop between a notification and a response. And it is not a patrol: analytics answer &ldquo;did this happen&rdquo; the moment it happens, while a <Link href="/virtual-patrolling" className={link}>patrol round</Link> answers &ldquo;is everything as it should be&rdquo; at the scheduled time, camera by camera, with a report. The two are built on the same tracking and are usually run together.
              </P>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/how-to-choose-video-analytics-software" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How to Choose Video Analytics Software</Link>
              <Link href="/guides/ai-video-analytics-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">AI Video Analytics Cost</Link>
              <Link href="/guides/how-to-reduce-false-alarms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How to Reduce False Alarms</Link>
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling?</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/ai-features" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">See every detection feature</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Book a demo on your cameras</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
