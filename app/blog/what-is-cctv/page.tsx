import { generatePageMeta } from '@/lib/page-utils';
import { ImageSlot } from '@/components/content/image-slot';
import { blogPost } from '@/lib/blog-posts';
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
 * A blog post (lib/blog-posts.ts holds its card and image briefs). The cluster it answers,
 * DataForSEO, United States, 17 October 2026: "cctv meaning" ~9,900 a month, "what is cctv"
 * ~5,400 (plus ~5,600 AI searches), "what does cctv stand for" ~3,600, "cctv footage"
 * ~1,600, "cctv stands for" ~590, "cctv full form" ~260, "types of cctv" ~210, "types of
 * cctv cameras" ~170, "what is cctv footage" ~140, "cctv vs ip camera" ~70, "how does cctv
 * work" ~70. Search Console already showed the site at position 11.4 for "what is cctv",
 * through /glossary/cctv, which now points here as the primary page for the term.
 *
 * Facts and where they come from:
 * - Definition, history, storage options, DVRs and NVRs, video analytics and the evidence
 *   on effectiveness: Wikipedia's "Closed-circuit television", opened 17 October 2026,
 *   quoted exactly and listed in Sources.
 * - Camzify: only what the rest of the site states (stream types, the Connector, recording
 *   continuously or on a schedule, retention per camera, storage location, 23 detections,
 *   alerts within seconds of a confirmed detection, the public price floor).
 * - Nothing on the legality of CCTV: no source was opened for it, so the post is silent.
 */
const pageMeta = {
  title: 'What Is CCTV? Meaning, How It Works, and Types',
  description: 'CCTV means closed-circuit television: cameras sending video to a private recorder and screens. How it works, the three types, and how it moves to the cloud.',
  path: '/blog/what-is-cctv',
};

const post = blogPost('what-is-cctv');
const publishedTime = post.published;
const modifiedTime = post.updated;

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'What does CCTV stand for?', answer: 'Closed-circuit television. The "closed circuit" is the point: the cameras send their video to a limited set of screens and a recorder, not openly like broadcast television. In the United States the same thing is usually called video surveillance or security cameras.' },
  { question: 'Is a CCTV camera the same as a security camera?', answer: 'In everyday use, yes. CCTV is the older, more formal name for a camera system that sends video to a private recorder and screens; "security camera" is what most people in the US call the camera itself. Strictly, an IP camera that records to the cloud is still CCTV in the sense that its video is not broadcast.' },
  { question: 'What are the three types of CCTV?', answer: 'Analog systems, where cameras send video over coaxial cable to a DVR; IP systems, where network cameras send digital video to an NVR; and cloud systems, where cameras record to storage outside the building. Many sites have a mix, and IP cameras can usually be connected to the cloud without being replaced.' },
  { question: 'What is CCTV footage?', answer: 'The video a CCTV system records. It is kept for a set period, the retention period, and then overwritten or deleted. On a recorder that period depends on its disks; on a cloud system it can be set per camera, in days or as a storage limit.' },
  { question: 'Does CCTV record all the time?', answer: 'It depends on how it is set up. Systems can record continuously, on a schedule, or only when motion or another event is detected. On Camzify each camera records continuously or on a schedule you set, and AI detections raise alerts on top of the recording.' },
  { question: 'Who invented CCTV?', answer: 'Wikipedia credits an early mechanical system to the Russian physicist Leon Theremin in 1927. Siemens installed a system in Germany in 1942 to observe V-2 rocket launches, and in the United States the first commercial system, Vericon, became available in 1949.' },
];

export default function WhatIsCctvPostPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[
        articleSchema({ headline: 'What is CCTV? Meaning, how it works, and the three types', description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }),
        personSchema(),
      ]}
      breadcrumbs={[
        { label: 'Blog', href: '/blog' },
        { label: 'What is CCTV?' },
      ]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What is CCTV? Meaning, how it works, and the three types</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">CCTV stands for closed-circuit television: security cameras that send their video to a private recorder and a limited set of screens, rather than broadcasting it.</strong>{' '}
            In the United States it is just as often called video surveillance or simply security cameras. This article explains what the term means, how a CCTV system works, the three types you will meet, and what changes when the recording moves from a box in the building to the cloud.
          </p>

          <div className="mt-10 max-w-3xl">
            <ImageSlot post={post.slug} n={1} priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does CCTV stand for, and why &ldquo;closed circuit&rdquo;?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  CCTV is short for closed-circuit television. Wikipedia defines it as &ldquo;the use of closed-circuit television cameras to transmit a signal to a specific place on a limited set of monitors&rdquo;, and notes that it &ldquo;differs from broadcast television in that the signal is not openly transmitted&rdquo;.
                </p>
                <p>
                  That is the whole meaning of &ldquo;closed circuit&rdquo;: the video travels only to the people and equipment meant to see it. The cameras, the cabling and the recorder form a closed loop. The name dates from the analog era, but it has stuck to every kind of security camera system since, including ones that record over the internet.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does a CCTV system work?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Every CCTV system has the same four parts, whatever its age:</p>
                <PointList items={[
                  'Cameras capture the scene and turn it into a video signal: analog over coaxial cable, or digital over a network.',
                  'Cabling or a network carries that signal from each camera to the recorder.',
                  'A recorder stores the video. A DVR (digital video recorder) takes analog cameras and digitizes them; an NVR (network video recorder) takes IP cameras. Both write to their own hard disks.',
                  'Screens and apps show the cameras live and play back what was recorded, on a monitor on site or on a computer or phone.',
                ]} />
                <p>
                  Storage is where systems differ most. As Wikipedia puts it, cameras &ldquo;can either store the images on a local hard disk drive, an SD card, or in the cloud.&rdquo; Recorders have long added features on top of storage too: Wikipedia notes that DVR-based systems offer &ldquo;extra features (such as motion detection and email alerts)&rdquo;.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <div className="mt-12 max-w-3xl">
            <ImageSlot post={post.slug} n={2} />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What are the types of CCTV?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>By how the video is carried and kept, there are three:</p>
                <PointList items={[
                  'Analog CCTV: cameras on coaxial cable, recording to a DVR in the building. The oldest and still common, especially where the cabling has been in the walls for years.',
                  'IP CCTV: network cameras on Ethernet, recording to an NVR. Usually higher resolution, and each camera is a device on the network with its own address and video stream.',
                  'Cloud CCTV: cameras record to storage outside the building, viewed in a browser or app. Nothing on site holds the only copy of the footage.',
                ]} />
                <p>
                  You will also see CCTV cameras grouped by shape and job: domes for ceilings, bullets for walls and long views, and{' '}
                  <Link href="/glossary/ptz-camera" className="text-primary hover:underline">PTZ cameras</Link>{' '}
                  that pan, tilt and zoom. Those are camera types; the three above are system types, and they decide where your footage lives.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <div className="mt-12 max-w-3xl">
            <ImageSlot post={post.slug} n={3} />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">CCTV vs IP camera vs security camera: what is the difference?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Mostly vocabulary. &ldquo;Security camera&rdquo; is the everyday word for the device. &ldquo;CCTV&rdquo; is the older name for the whole system, and some people use it to mean analog specifically. An{' '}
                  <Link href="/glossary/ip-camera" className="text-primary hover:underline">IP camera</Link>{' '}
                  is a digital camera that sends its video over a network, usually as an{' '}
                  <Link href="/glossary/rtsp" className="text-primary hover:underline">RTSP</Link>{' '}
                  stream and often speaking{' '}
                  <Link href="/glossary/onvif" className="text-primary hover:underline">ONVIF</Link>, the standard that lets cameras and recorders from different makers work together.
                </p>
                <p>
                  The distinction that matters in practice is not the name but the stream: an IP camera, or a recorder that publishes a stream for each camera, can be connected to other software, including cloud recording, without replacing anything on the wall.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What is CCTV footage, and how long is it kept?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  CCTV footage is simply the recorded video. It is kept for a retention period and then overwritten or deleted. On a DVR or NVR that period is whatever the disks hold: when they fill up, the oldest video goes first, for every camera alike.
                </p>
                <p>
                  How long it should be kept is set by your sector, your insurer and the privacy rules that apply to you, not by the hardware.{' '}
                  <Link href="/guides/video-retention-requirements" className="text-primary hover:underline">Video retention requirements</Link>{' '}
                  covers how to decide it, and{' '}
                  <Link href="/glossary/video-retention" className="text-primary hover:underline">video retention</Link>{' '}
                  defines the term.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What is CCTV used for, and does it work?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Businesses use CCTV for three things:</p>
                <PointList items={[
                  'Deterrence: visible cameras discourage theft, vandalism and trespass.',
                  'Evidence: recorded video of an incident for the police, an insurer or an internal investigation.',
                  'Operations and safety: watching loading docks, production lines, car parks and other places where something going wrong is costly.',
                ]} />
                <p>
                  The evidence on crime is more mixed than the marketing suggests. Wikipedia cites a 2019, 40-year systematic review which found that &ldquo;the most consistent effects of crime reduction of CCTV were in car parks&rdquo;, and a 2008 report by UK police chiefs which &ldquo;concluded that only 3% of crimes were solved by CCTV.&rdquo; A system that only records can help only after the fact, once someone goes looking through the footage, which is why camera systems increasingly add detection and alerts on top.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where traditional CCTV falls short</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>The weak points of a recorder-in-a-cupboard system are well known to anyone who has needed footage in a hurry:</p>
                <PointList items={[
                  'The recorder holds the only copy. If it is stolen, damaged or its disk fails, the footage goes with it.',
                  'Nobody is watching. Cameras record everything and alert on little, so incidents are found the next morning.',
                  'Every site is its own island. A business with several locations has several recorders, each with its own login and its own retention.',
                  'No one can show the cameras were checked. A recorder keeps video, not a record that someone looked at the gate at 2am.',
                ]} />
                <p>
                  Each of these has a cloud answer:{' '}
                  <Link href="/use-cases/cloud-video-backup-against-dvr-theft" className="text-primary hover:underline">footage kept off site</Link>,{' '}
                  <Link href="/ai-features" className="text-primary hover:underline">AI detections</Link>{' '}
                  that raise the events that matter, one console for every site, and{' '}
                  <Link href="/virtual-patrolling" className="text-primary hover:underline">scheduled patrol rounds</Link>{' '}
                  that leave a report.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">From CCTV to cloud video surveillance, on the cameras you have</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Moving CCTV to the cloud does not mean new cameras. Camzify connects any camera that publishes an RTSP stream or answers ONVIF, and RTMP and HTTPS streams too, regardless of the NVR or DVR brand behind them. Cameras on a private network connect through the{' '}
                  <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>, with no port forwarding.
                </p>
                <PointList items={[
                  'Recording: each camera records to the cloud continuously or on a schedule, kept in Amazon S3 in the AWS region nearest your sites.',
                  'Retention per camera, in days or as a storage cap, so the gate can keep ninety days while a corridor keeps seven.',
                  '23 AI detections on top of the recording, from intrusion and loitering to fire and smoke, with alerts reaching the assigned person within seconds of a confirmed detection.',
                  'Every site in one browser console, with scheduled patrol rounds that file a report with a compliance percentage.',
                ]} />
                <p>
                  Pricing is per camera per month, from $5. For the wider picture, read{' '}
                  <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>{' '}
                  and{' '}
                  <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="text-primary hover:underline">using existing cameras with a cloud VMS</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16 max-w-prose">
            <h2 className="font-display text-2xl font-bold">Sources, checked 17 October 2026</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                <a href="https://en.wikipedia.org/wiki/Closed-circuit_television" className="text-primary hover:underline" rel="noopener nofollow" target="_blank">Wikipedia: Closed-circuit television</a>: the definition, the history, storage options, DVRs and NVRs, and the findings on crime quoted above.
              </li>
            </ul>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Put your CCTV cameras on the cloud</h2>
            <p className="mt-3 max-w-prose text-muted-foreground">
              See cloud recording, AI detections and patrol rounds on real cameras in a 15-minute demo, and get a quote for your camera count.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/cloud-video-surveillance" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud video surveillance</Link>
              <Link href="/supported-cameras" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Supported cameras</Link>
              <Link href="/guides/what-is-a-cloud-nvr" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What is a cloud NVR?</Link>
              <Link href="/guides/what-is-a-video-management-system" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What is a VMS?</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/book-a-demo" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">Book a demo</Link>
              <Link href="/pricing" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">See pricing</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
