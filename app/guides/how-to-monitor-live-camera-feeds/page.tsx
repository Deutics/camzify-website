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
  title: "How to Monitor Live Camera Feeds | Multi-Camera View Guide",
  description: "Set up a live camera wall: choose a grid layout, save camera sets for a shift, filter a growing fleet by site, and open a single stream full screen with PTZ control.",
  path: "/guides/how-to-monitor-live-camera-feeds",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article' });

const steps: HowToStep[] = [
  {
    name: 'Pick a grid that matches how you actually watch',
    text: 'Choose a grid size for how many cameras should be on screen at once. More tiles is not better: past a certain density nobody is really watching any of them, which is the well-documented failure of the traditional monitoring wall. Fewer tiles on the cameras that matter beats a full grid nobody scans.',
  },
  {
    name: 'Save camera sets for the way shifts actually run',
    text: 'Group the cameras that get watched together into a set — "Night shift — perimeter", "Loading hours — docks" — and mark one as the default so it loads when live streaming opens. A set is for watching; it is not the same thing as a patrol sequence, which is an ordered list of stops with checklists attached.',
  },
  {
    name: 'Filter rather than scroll once the fleet grows',
    text: 'Narrow the wall by site or camera name. This is the difference between a system that stays usable at 200 cameras and one that does not — the wall stops being something you scan and becomes something you query.',
  },
  {
    name: 'Open a single stream when something needs a proper look',
    text: 'Click any tile for a full-screen view, with PTZ control where the camera supports it. For a camera on a local network, PTZ is carried by the Camzify Connector along with the video.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a camera set and a patrol sequence?',
    answer: 'A camera set is a saved group of cameras for monitoring, and one set can be your default view. A patrol sequence is an ordered list of camera stops, each with a checklist, used for manual or automated patrol rounds. Same cameras, different purpose: a set is for watching, a sequence is for verifying and produces a report.',
  },
  {
    question: 'Does watching a live wall replace patrol rounds?',
    answer: 'No, and the two answer different questions. A wall shows you what is happening now, if someone is looking. A patrol round proves that specific things were checked at specific times, whether or not anyone was looking, and produces a record afterwards. Sites that rely only on a wall usually cannot answer what happened at 3am.',
  },
  {
    question: 'What happens when a camera goes offline?',
    answer: 'The tile shows an explicit offline state rather than a blank or frozen frame. That distinction matters more than it sounds — a silently black tile on a monitoring wall reads as a dark scene, and a camera can be down for days before anyone notices.',
  },
  {
    question: 'Can I control PTZ cameras from the live view?',
    answer: 'Yes, where the camera supports it. Full-screen view carries pan, tilt and zoom controls, and for cameras on a local network those controls are relayed by the Camzify Connector alongside the video stream.',
  },
];

export default function Page() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[howToSchema({ name: 'How to monitor live camera feeds in Camzify', description: pageMeta.description, path: pageMeta.path, steps })]}
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'How to Monitor Live Camera Feeds' }]}
    >
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to monitor live camera feeds</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              A live wall answers what is happening now; it does not prove what was checked.
            </strong>{' '}
            This guide covers getting the wall right &mdash; layout, saved sets, filtering and
            full-screen review &mdash; and where{' '}
            <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> picks
            up the part a wall cannot do.
          </p>

          <HowToSteps steps={steps} />

          <HowToNote>
            Research on control-room monitoring has been consistent for decades: attention to a
            multi-camera wall degrades sharply after the first stretch of a shift. That is the
            argument for scheduled rounds rather than more screens &mdash; a round happens on time
            whether or not anyone is fresh, and leaves a record either way.
          </HowToNote>

          <div className="mt-14">
            <ScrollReveal>
              <p className="max-w-prose text-muted-foreground">
                Related:{' '}
                <Link href="/platform/live-streaming" className="text-primary hover:underline">live streaming</Link>,{' '}
                <Link href="/guides/how-to-run-a-virtual-patrol-round" className="text-primary hover:underline">running a patrol round</Link>, and{' '}
                <Link href="/guides/how-to-set-up-sites-and-cameras" className="text-primary hover:underline">adding sites and cameras</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
