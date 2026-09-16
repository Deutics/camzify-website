import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * Loitering detection shipped in September 2026. This page used to describe it as a
 * roadmap item; the roadmap, the detection hub, the homepage grid and /llms.txt were
 * updated in the same change, so none of them should still call it "in development".
 * Only the hero render exists so far; the figures for the sections below are on the
 * design team's list in docs/design/IMAGE-REQUESTS.md.
 */
const pageMeta = {
  title: "Loitering Detection | Dwell Time Alerts",
  description: "Camzify loitering detection alerts when a person or vehicle stays in a defined zone beyond a dwell time you set. A pass through is ignored.",
  path: "/ai-features/loitering-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is loitering detection?', answer: 'Loitering detection raises an alert when a tracked person or vehicle remains inside a defined zone for longer than a dwell time you set. Someone walking through the zone does not qualify. Someone who stays does.' },
  { question: 'How is it different from zone intrusion detection?', answer: 'Zone intrusion fires on entry: any confirmed track inside the zone raises an alert. Loitering detection waits. It measures how long the track stays and alerts only when that time passes the threshold, which suits places where people are allowed to pass but not to linger.' },
  { question: 'Does it identify the person?', answer: 'No. It follows a track from multi-object tracking, not a face or an identity. The alert carries the frame, the time, how long the subject has been in the zone and, with AI attribute extraction enabled, a plain description such as clothing color.' },
  { question: 'Can I set different dwell times for different areas?', answer: 'Yes. Each zone carries its own dwell-time threshold, so an ATM lobby can alert after a short stay while a car park aisle allows longer, and each camera can carry more than one zone.' },
  { question: 'Will it fire on staff who work in the zone?', answer: 'A notification window per camera keeps it quiet during the hours staff are expected. Outside that window, or on a zone where nobody should wait at any hour, a long stay raises the alert.' },
  { question: 'Does it need new cameras or a separate license?', answer: 'It runs on the same cameras and the same account as every other detection and is licensed per camera instance, so only the cameras that watch a loitering zone carry it.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Loitering Detection' },
    ]}>
      <FeatureHero
        eyebrow="AI detection · Loitering detection"
        title="Loitering detection"
        lede={<><strong className="font-semibold text-foreground">Loitering detection alerts when a person or vehicle remains in a defined zone beyond a dwell time you set.</strong> A brief pass through the zone is ignored. A subject who stays is raised with the frame, the time and how long they have been there, so the difference between someone crossing a forecourt and someone waiting at a back door is the alert itself.</>}
        facts={['A person waiting at a rear entrance after closing', 'A vehicle parked at a gate or fence line for longer than a drop-off', 'Someone lingering in an ATM lobby or a stairwell']}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/ai-features', label: 'All 23 detections' }}
        visual={<PhotoFigure src="/feature-loitering-detection-1.webp" alt="The console live view with a loitering alert drawn on the camera frame" caption="Loitering detection" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
              <li className="flex gap-2">• A person waiting at a rear entrance or service door after hours</li>
              <li className="flex gap-2">• A vehicle stopped at a gate, fence line or loading bay beyond a drop-off</li>
              <li className="flex gap-2">• Someone lingering in an ATM lobby, stairwell or car park aisle</li>
              <li className="flex gap-2">• A subject standing near a display, cage or stockroom door longer than a shopper would</li>
              <li className="flex gap-2">• A person remaining on a school perimeter or in a playground after the grounds close</li>
              <li className="flex gap-2">• A group gathering in a zone where nobody is expected to wait</li>
            </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why loitering detection matters</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Most of what precedes a break-in, a theft or an assault is not a crossing. It is a wait. Someone stands at a back door to see whether anyone comes, sits in a car facing a gate, or circles a cage in a stockroom before reaching in.</p>
                <p>Entry-based rules have no way to see that.</p>
                <PointList items={[
                  'A zone rule fires on everyone who steps in, so a forecourt or a lobby that people are allowed to cross produces alerts nobody reads.',
                  'A motion alarm cannot tell a delivery from a stakeout, because both move.',
                  'A guard on a walking round sees the area for seconds an hour and has no way of knowing how long the person was there before the round.',
                ]} />
                <p>Loitering detection measures the one thing those tools cannot: time in place. The zone stays quiet for everyone who passes through and raises the person who does not leave, while there is still something to be done about it.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <div className="max-w-prose">
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Defining the zone</h3>
                <p className="mt-2 text-muted-foreground">
                  An operator draws a polygon over the part of the camera view where waiting matters: the strip in front of a rear door, the ATM vestibule, the approach to a gate. The zone can follow an irregular boundary rather than a rectangle, and a camera can carry more than one.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Measuring dwell time</h3>
                <p className="mt-2 text-muted-foreground">
                  The detection follows tracks from the same <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> engine used across the platform. When a confirmed track enters the zone, a timer starts for that track. Leaving the zone ends it. A track that is still inside when the timer passes the threshold you set is the event; a track that left earlier never was.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  The alert carries the frame at the moment the threshold was crossed, the time, the elapsed dwell time and the object type. It follows the same route as every other detection.
                </p>
                <PointList className="mt-3" items={[
                  <>With <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> enabled, the alert also carries a plain description of the subject, such as clothing color, so a guard knows who to look for.</>,
                  <>It lands in the <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification queue</Link> with a severity per camera and an acknowledgment status, and reaches the assigned person by email, SMS, WhatsApp or push.</>,
                  <>Nothing in it identifies the person. It is a track with a duration, not a face.</>,
                ]} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Loitering zones are drawn on the camera view in the configuration panel. Each zone supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A dwell-time threshold of its own, so a vestibule and a car park aisle can differ</li>
                  <li className="flex gap-2">• A polygon of any shape, matched to the area where waiting matters</li>
                  <li className="flex gap-2">• A notification window per camera, so the zone is quiet while staff are expected</li>
                  <li className="flex gap-2">• A choice of what counts: people only, or people and vehicles</li>
                  <li className="flex gap-2">• More than one zone per camera, each with its own rules</li>
                  <li className="flex gap-2">• A severity per camera, so a rear door can rank above a forecourt</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A retail rear entrance where a person waiting after closing is raised before the door is tried</li>
                  <li className="flex gap-2">• A bank branch or ATM lobby where a long stay outside banking hours reaches the monitoring desk</li>
                  <li className="flex gap-2">• A warehouse fence line where a vehicle parked facing the yard is flagged while it is still parked</li>
                  <li className="flex gap-2">• A school perimeter or playground where presence after the grounds close is raised to the caretaker</li>
                  <li className="flex gap-2">• A residential car park where someone moving between vehicles without leaving is the event</li>
                  <li className="flex gap-2">• A stockroom or cage where a subject standing at the door longer than a pick takes is flagged to the floor lead</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                alerts from this detection model contribute to the compliance assessment at each camera stop
                and are logged in the patrol report. On an automated round, <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">scene observation</Link> watches each stop for a short window as well, which is how a round tells a person walking through from a person who is still there.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 text-center">
              <h3 className="font-display text-lg font-bold">Related</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href="/ai-features" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">All AI Features</Link>
              <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion Detection</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
              <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
              <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
              <Link href="/use-cases/car-theft-and-vandalism-in-parking-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Car theft and vandalism in parking facilities</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
