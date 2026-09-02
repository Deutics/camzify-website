import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { HowToSteps, HowToNote, type HowToStep } from '@/components/content/how-to-steps';
import { howToSchema } from '@/lib/seo';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How to Configure Cloud Video Backup | Retention & Storage Guide",
  description: "Choose which cameras record, pick continuous or scheduled recording, set retention per camera, read the storage estimate honestly, and export a clip when you need it.",
  path: "/guides/how-to-configure-cloud-video-backup",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article' });

const steps: HowToStep[] = [
  {
    name: 'Choose which cameras record at all',
    text: 'Pick cameras individually, by site, or all at once. Not every camera needs recording: a camera that exists to trigger a detection, on a view nobody would ever review footage of, can run without backup. Deciding this first is the cheapest decision in the whole configuration.',
  },
  {
    name: 'Pick continuous or scheduled recording',
    text: 'Continuous records around the clock. Scheduled records only during hours you define per day of week. Continuous is right where an incident could happen at any hour or where an insurer expects unbroken coverage; scheduled is right for interior cameras watching space that is empty and locked overnight. Most sites run both.',
  },
  {
    name: 'Set retention per camera, not per account',
    text: 'Each camera keeps footage for its own retention window, and older recordings are deleted automatically once it passes. Per-camera is the point: a 4K entrance camera on a busy forecourt consumes storage far faster than a quiet stockroom at 1080p, and forcing both to the same window means overpaying for one or under-covering the other.',
  },
  {
    name: 'Read the storage estimate as an estimate',
    text: 'The figure shown during configuration is derived from each stream’s bitrate, the recording hours and the retention days. It is a planning number, not a guarantee: bitrate rises with scene activity and falls at night, so real consumption moves around it. Watch actual usage in Plan and Usage for the first full retention cycle, after which it stabilises.',
  },
  {
    name: 'Know how to get footage out before you need it',
    text: 'Playback scrubs recordings; downloads export a clip for a chosen time range. Do this once as a drill rather than for the first time during an incident, when someone is asking for a specific two minutes and the clock is running.',
  },
];

const faqs = [
  {
    question: 'How much cloud storage will my cameras actually use?',
    answer: 'It scales with bitrate, hours recorded and retention days, so the three levers are resolution, recording schedule and how long you keep footage. The estimate shown during configuration multiplies those out, but treat it as a planning figure — scene activity moves bitrate around, so a busy forecourt overshoots and a still corridor undershoots. Usage settles into a steady state after the first full retention cycle, because from then on old footage is deleted at the same rate new footage arrives.',
  },
  {
    question: 'Which saves more, shorter retention or scheduled recording?',
    answer: 'Scheduled recording, usually, because it cuts hours rather than days and most sites have long predictable stretches with nothing to record. Halving the recording window roughly halves that camera’s storage. Shortening retention helps too, but it is the lever that costs you evidence — an incident discovered three weeks later is only recoverable if retention covers it.',
  },
  {
    question: 'What happens to footage if I delete a camera?',
    answer: 'Footage already stored under that camera is governed by its retention window rather than deleted with the camera record. If you need footage from a camera you are removing, export the clips you care about first.',
  },
  {
    question: 'Does cloud backup still work if the site loses power or the NVR is stolen?',
    answer: 'Footage is written off-site as it is captured, so recordings already uploaded survive anything that happens to the hardware on site. That is the main argument for cloud backup over a local recorder: a stolen or smashed NVR takes its own evidence with it, and that is a common way footage disappears exactly when it matters.',
  },
];

export default function Page() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[howToSchema({ name: 'How to configure cloud video backup in Camzify', description: pageMeta.description, path: pageMeta.path, steps })]}
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'How to Configure Cloud Video Backup' }]}
    >
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to configure cloud video backup</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Video backup is a trade between storage cost and evidence coverage, and it is decided
              per camera rather than once for the account.
            </strong>{' '}
            This guide covers the four settings that determine both, and how to read the storage
            estimate without being surprised later. See also{' '}
            <Link href="/guides/video-retention-requirements" className="text-primary hover:underline">video retention requirements</Link>.
          </p>

          <HowToSteps steps={steps} />

          <HowToNote>
            Set retention against the worst realistic discovery delay, not the average one. Most
            incidents are noticed within a day or two, but the ones that end in a claim &mdash;
            stock shrinkage, a dispute over a delivery, an injury reported late &mdash; are
            routinely found weeks afterwards, and retention that expired is the same as no camera.
          </HowToNote>

          <div className="mt-14">
            <ScrollReveal>
              <p className="max-w-prose text-muted-foreground">
                Related:{' '}
                <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">video backup and retention</Link>,{' '}
                <Link href="/guides/video-retention-requirements" className="text-primary hover:underline">how long to keep footage</Link>, and{' '}
                <Link href="/guides/how-to-manage-security-alerts" className="text-primary hover:underline">working with alerts</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
