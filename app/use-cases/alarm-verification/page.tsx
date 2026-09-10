import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Alarm Verification With Cameras",
  description: "Alarm verification with cameras: the view, a snapshot and the live feed on the operator desk when an alarm comes in, so dispatch goes to a verified event.",
  path: "/use-cases/alarm-verification",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How does a camera verify an alarm?', answer: 'By showing the operator what the alarmed area looks like now. A zone or line intrusion on the camera covering that area raises its own alert with a snapshot, the live wall shows the feed, and cloud backup holds the seconds before. The operator looks, and dispatches or stands down on what they see rather than on a sensor contact alone.' },
  { question: 'Does Camzify connect to our alarm panel?', answer: 'No. Camzify is a video platform; it does not receive panel signals or integrate with alarm receiving software. What it gives the operator is the visual side, on the same cameras, with its own alerts and notification channels. The panel event and the camera view sit side by side on the operator\'s desk.' },
  { question: 'What if the alarm is at a site nobody watches?', answer: 'The detections do not wait for an operator. A tracked person inside the zone, during the notification window set on that camera, raises an alert with the snapshot to whoever is designated. A scheduled patrol round can also check the site after the alarm and record that it was clear, with the frame.' },
  { question: 'Can we tell the difference between a cat and a person?', answer: 'Detections fire on a tracked object of a chosen class. An animal is not classified as a person, so a person rule stays quiet for a cat crossing the yard. Motion detection, which fires on pixel change, is separate and used deliberately.' },
  { question: 'Is there a record of what the operator saw?', answer: 'Every detection is logged with camera, time and snapshot, every notification with who was told and whether it was acknowledged, and every patrol round with a frame per item. A dispatch decision can be shown against the frame it was made on.' },
  { question: 'Who holds the account, us or the installer?', answer: 'Whoever operates the console. A monitoring company usually holds it with each client or agency as a sub-user scoped to their sites; an installer can commission and hand over. The monitoring companies page covers both arrangements.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Monitoring',
  title: 'Alarm verification with cameras',
  lede: <>
    <strong className="font-semibold text-foreground">Alarm verification is looking at the alarmed area before dispatching to it: the camera view, a snapshot of what triggered, and the live feed, on the operator&apos;s desk at the moment the alarm comes in.</strong>{' '}
    Most alarm signals are not intrusions, and every dispatch to one costs a driver, a keyholder and credibility. Camzify puts the visual side on the cameras already at the site, with its own detections, alerts and record.
  </>,
  facts: ['Snapshot and live feed at the moment of the alarm', 'Person detections that stay quiet for a cat', 'A record of what the operator saw'],
  image: { src: '/alarm-verification.webp', alt: 'An operator desk with the alarmed site on screen: the camera view and the event details beside it' },
  secondary: { href: '/partners/for-monitoring-centers', label: 'For monitoring companies' },
  problem: {
    heading: 'A contact closed. Nobody knows why.',
    paras: [
      'An alarm panel reports that a sensor tripped. It does not report that a delivery driver used the wrong door, that a balloon drifted past a PIR, or that a window sensor has been failing since the storm. The monitoring operator has a signal and a decision, and the safe decision is to dispatch, which is how a driver and a keyholder end up at an empty warehouse at 3am.',
      'The site has cameras on that yard. The operator cannot see them, or can see a frozen frame from an NVR nobody has logged into since installation.',
    ],
    visual: 'notification',
    caption: 'The visual side of the alarm as the operator receives it: the camera, the snapshot, the time. Dispatch on this, not on a contact.',
    alt: 'A guard notification for a failed checklist item, with the message, the snapshot and an acknowledgement',
  },
  handles: {
    heading: 'The camera answers the question the panel cannot',
    paras: [
      'What reaches the operator is the alert, the live feed and the seconds before the alarm.',
      { points: [
        <><Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> on the camera covering the alarmed area raises its own alert with a snapshot when a tracked person is inside the zone during the notification window on that camera.</>,
        'The operator sees the person, or sees an empty yard, and decides.',
        <>The <Link href="/platform/live-streaming" className="text-primary hover:underline">live wall</Link> shows the feed.</>,
        <>For playback, <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">cloud backup</Link> holds the seconds before the alarm.</>,
      ] },
      <>After the decision, a <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> can check the site and record it: yard clear, doors closed, camera unobstructed, with a frame per item. The account model puts every client or agency under one console with a scoped login each; the <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">monitoring companies page</Link> covers how that is set up.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'The alarmed area as a zone. A tracked person inside it during the window raises an alert with a snapshot.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'A tripwire on the fence or the door the sensor covers, with direction.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'The alarm and a covered camera together are the case to dispatch on.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'The reason a person rule does not fire for a cat, a bag or a headlight.' },
    ],
  },
  round: {
    heading: 'What a post-alarm round checks',
    label: 'SITE B · CAM 02 · Rear yard',
    guard: 'Operator',
    items: [['No person in rear yard', 'ok'], ['Rear door closed', 'ok'], ['Fence line intact', 'ok'], ['Camera view unobstructed', 'ok']],
    caption: 'The round after the alarm: the site checked and found clear, with frames, logged against the stand-down.',
    paras: [
      'Verification is the moment; the round is the record. After an alarm is stood down, a manual round from the console walks the site\'s cameras and records each item with its frame, so the file shows not only that the operator saw an empty yard but that the yard, the door and the fence were checked and found in order at that time.',
      <>Where the site runs <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">scheduled rounds</Link>, the reports on either side of the alarm bound it before anyone opens footage.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'Four limits apply, each following from it being video and not a panel.',
      { points: [
        'It will not receive alarm signals or replace alarm receiving software; it is the video side, on the same desk.',
        'It will not verify an alarm in an area with no camera, or with a camera that has gone dark.',
        'It will not decide; it shows the operator what is there and records what they saw.',
        'It does not identify anyone.',
      ] },
      <>We do not publish false-alarm reduction figures or dispatch-time figures. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/construction-sites', name: 'Construction sites' },
    { href: '/industries/multiple-sites', name: 'Multiple sites' },
  ],
  faqs,
};

export default function AlarmVerificationPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Alarm Verification With Cameras", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Alarm Verification' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
