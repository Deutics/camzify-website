import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { SectionVisual } from '@/components/content/section-visual';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * License plate recognition: a custom detection, not one of the 23 standard ones.
 *
 * Facts stated by the business on 2026-09-28: LPR is built; it is currently set up for
 * US and Singapore plates only; a watchlist (the business calls it a blacklist) of plate
 * numbers raises a notification when a listed plate is recognized. Everything else that
 * applies to custom detections (per-camera licensing, cloud or on premises) comes from
 * /ai-features/custom-detections. No accuracy, speed, distance, angle or camera-model
 * figures were given, and an approved-list ("whitelist") rule was not confirmed: do not
 * add either.
 *
 * No German counterpart on purpose: German plates are not supported, and a German page
 * would promise German readers something the detection does not do for them yet.
 */
const pageMeta = {
  title: 'License Plate Recognition (LPR) Software',
  description: 'Camzify license plate recognition reads US and Singapore plates from your security cameras and alerts you when a plate on your watchlist is seen.',
  path: '/ai-features/license-plate-recognition',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'What is license plate recognition?', answer: 'License plate recognition (LPR), also called automatic number plate recognition (ANPR), reads the characters on a vehicle\'s plate from a camera image and turns them into text that can be checked against a list. In Camzify it is a custom detection: set up for your site rather than switched on from the list of 23 standard detections.' },
  { question: 'Which countries\' plates does it read?', answer: 'US and Singapore plates. Plates from other countries are not supported yet; if you need them, raise it and it is scoped like any other custom detection.' },
  { question: 'Can it alert me when a particular vehicle arrives?', answer: 'Yes. You keep a watchlist of plate numbers, and when a plate on that list is recognized, the people you designate are notified.' },
  { question: 'Can it flag vehicles that are not on an approved list?', answer: 'The rule in place today is the watchlist: an alert when a listed plate is seen. If you need a different rule, such as flagging any plate that is not on an approved list, raise it when the detection is set up and it is scoped as part of the build.' },
  { question: 'Does it work on my existing cameras?', answer: 'It runs on the cameras you already have, but plate reading asks more of a camera than detecting a vehicle does: the plate has to be legible in the frame. A camera on a gate or an entry lane is usually framed for it; a wide view of a whole car park usually is not. Which of your cameras suit it is checked when the detection is set up.' },
  { question: 'Does it identify the driver?', answer: 'No. It reads the plate, not the person. None of the 23 standard detections identifies anyone.' },
  { question: 'Can it run on premises?', answer: 'Yes. Like every custom detection, it runs in the cloud or on premises.' },
  { question: 'How is it priced?', answer: 'As a custom detection, quoted per site, and licensed per camera once it is live, one detection instance per camera it runs on.' },
];

export default function LicensePlateRecognitionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Custom Detections', href: '/ai-features/custom-detections' },
      { label: 'License Plate Recognition' },
    ]}>
      <FeatureHero
        eyebrow="Custom detection · License plate recognition"
        title="License plate recognition on your security cameras"
        lede={<><strong className="font-semibold text-foreground">Camzify&apos;s license plate recognition reads vehicle plates from your security cameras and alerts you when a plate on your watchlist is seen.</strong> It reads US and Singapore plates today. It is a custom detection, set up for your site, rather than one of the 23 standard detections.</>}
        facts={['US and Singapore plates', 'Watchlist alerts', 'Cloud or on premises']}
        primary={{ href: '/book-a-demo', label: 'Set up plate recognition' }}
        secondary={{ href: '/ai-features/custom-detections', label: 'All custom detections' }}
        visual={<SectionVisual variant="flow" caption="License plate recognition · watchlist" alt="Four steps: a vehicle enters the frame, the plate is read, it is checked against the watchlist, and a listed plate raises an alert" steps={['Vehicle in frame', 'Plate read', 'Checked against watchlist', 'Listed plate: alert']} />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What it does</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Reads the plate of a vehicle in the camera frame and turns it into text</li>
                  <li className="flex gap-2">• Checks each plate against a watchlist of plate numbers you keep</li>
                  <li className="flex gap-2">• Notifies the people you designate when a listed plate is recognized</li>
                  <li className="flex gap-2">• Reads US and Singapore plates</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div>
                <h2 className="font-display text-2xl font-bold">What it does not do</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Read plates from other countries yet: those would be scoped as a new build</li>
                  <li className="flex gap-2">• Identify the driver: it reads the plate, not the person</li>
                  <li className="flex gap-2">• Read a plate the camera cannot see clearly: framing matters, see below</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Watchlist</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Know when a particular vehicle is back</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                The watchlist is a list of plate numbers you keep: a vehicle banned from a car park, one linked to an earlier incident, one you have been asked to look out for. When a camera reads a plate on the list, the people you designate are notified.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Cameras</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Which cameras can read plates</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Plate reading asks more of a camera than spotting a vehicle does, because the characters have to be legible in the frame. A camera on a gate, a barrier or an entry lane, where vehicles pass close and slowly, is usually framed for it. A wide view over a whole car park usually is not, and it keeps doing the job it was placed for:{' '}
                <Link href="/use-cases/vehicle-monitoring" className="text-primary hover:underline">tracking vehicles as objects</Link>{' '}
                and{' '}
                <Link href="/ai-features/illegal-parking-detection" className="text-primary hover:underline">flagging a vehicle parked where it should not be</Link>. Which of your cameras suit plate reading is checked when the detection is set up.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-2xl font-bold">Where it runs</h2>
              <p className="mt-4 text-muted-foreground">
                In the cloud or on premises, the same choice as the rest of the platform. See the{' '}
                <Link href="/platform/deployment-options" className="text-primary hover:underline">deployment options</Link>.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div>
              <h2 className="font-display text-2xl font-bold">How it is priced</h2>
              <p className="mt-4 text-muted-foreground">
                As a{' '}
                <Link href="/ai-features/custom-detections" className="text-primary hover:underline">custom detection</Link>: quoted per site, and licensed per camera once it is live, one detection instance for each camera it runs on.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Related</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: '/use-cases/parking-lot-surveillance', title: 'Parking lot surveillance', desc: 'People after hours, fire lanes and vehicles left where they should not be.' },
              { href: '/use-cases/vehicle-monitoring', title: 'Vehicle monitoring', desc: 'Vehicles tracked as objects at gates, yards and bays.' },
              { href: '/ai-features/custom-detections', title: 'Custom detections', desc: 'Everything else built to order, and how a build works.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
