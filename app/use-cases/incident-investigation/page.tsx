import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Incident Investigation | Timestamped Evidence",
  description: "Incident investigation from records that exist already: timestamped detections with snapshots, a frame per item per round, suspect search by description.",
  path: "/use-cases/incident-investigation",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Can I search footage for a particular person?', answer: 'Yes, by description. AI suspect search takes a plain-language description, clothing color, a bag, approximate age, direction of travel, and returns every matching appearance across the indexed cameras and time window, ranked by confidence. No reference photo is needed. It is not facial recognition: matches are made on confirmed object tracks and attributes, not identity.' },
  { question: 'How far back can I go?', answer: 'As far as the retention policy on that camera. Footage is kept per camera by a number of days or a storage cap, and detection logs and patrol reports are kept with the account. An investigation into last night is straightforward; one into last quarter depends on how the camera was configured.' },
  { question: 'What does a patrol report give an investigator?', answer: 'A timestamped set of frames from every camera on the round, with a verdict per checklist item. If the round at 01:00 shows the dock door down and the round at 03:00 shows it up, the window is two hours, before anyone has scrubbed a second of footage.' },
  { question: 'Can I follow a subject across cameras?', answer: 'The cross-camera journey map links one subject’s appearances across cameras on the same site into a path with times. Multi-object tracking follows the subject on each camera. Together they turn a question about where someone went into a sequence of cameras to open.' },
  { question: 'Is the record admissible or just useful?', answer: 'It is timestamped, unedited and attributable: detection events carry the camera and time, patrol reports are filed per round and not changed afterwards, and every action on the account is in the audit trail. Whether a given record meets a given standard is a question for your counsel, not a claim we make.' },
  { question: 'Can I export what I find?', answer: 'Patrol reports export as PDF. Footage is available for playback and export from cloud backup within its retention window. Detection events carry their snapshots.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · After the event',
  title: 'Incident investigation',
  lede: <>
    <strong className="font-semibold text-foreground">Incident investigation is the reconstruction of what happened during a security event from recorded footage, detection logs and patrol records: the timeline, the subjects, the evidence.</strong>{' '}
    The slow part has always been finding the moment in hours of continuous video. Camzify writes the timeline as it goes, timestamped detections with snapshots and a frame per checklist item on every round, and lets you search footage for a person by description.
  </>,
  facts: ['Detections logged with time and snapshot', 'A frame per item on every round', 'Suspect search by description, not face'],
  image: { src: '/incident-investigation.jpg', alt: 'Two analysts reviewing multi-camera footage while investigating an incident' },
  secondary: { href: '/ai-features/forensic-video-search', label: 'AI suspect search' },
  problem: {
    heading: 'Hours of footage, one moment that matters',
    paras: [
      'When something is found missing or broken, the investigation starts with a question nobody can answer: when? Continuous recording from several cameras gives a day of video per camera and no markers, and the investigator scrubs through it at speed, hoping to notice the moment. It takes hours, it is easy to miss, and it starts only after the loss is noticed.',
      'The structure that would make it fast, timestamps on events, frames at known times, a way to search for a person, is exactly what a camera system does not produce on its own.',
    ],
    visual: 'report',
    caption: 'A round report is a timestamped set of frames. Two rounds either side of the event bound the window before any footage is opened.',
    alt: 'A patrol report excerpt with a checklist item, its before and after snapshots and a timestamp',
  },
  handles: {
    heading: 'The timeline is written before anyone asks for it',
    paras: [
      <>Every detection is logged with its camera, its time and a snapshot, so the log for a camera is already a list of the moments that mattered. Every <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">patrol round</Link> adds a frame per checklist item at a known time, and two rounds either side of an incident bound it to a window before any footage is opened. <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">Attribute extraction</Link> attaches a description to each person seen: clothing color, what they carried, which way they went.</>,
      <>That description is what <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">AI suspect search</Link> works on. Describe the person in plain language and it returns every matching appearance across the indexed cameras and time window, ranked by confidence, with no reference photo. The <Link href="/ai-features/cross-camera-journey-map" className="text-primary hover:underline">cross-camera journey map</Link> then links those appearances into a path, and <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">cloud backup</Link> holds the footage to play at each point, within its retention window.</>,
    ],
    detections: [
      { href: '/ai-features/forensic-video-search', name: 'AI suspect search', role: 'A plain-language description returns matching appearances across cameras and time. Not facial recognition.' },
      { href: '/ai-features/ai-attribute-extraction', name: 'AI attribute extraction', role: 'Clothing, carried objects and direction attached to each person seen, which is what search runs on.' },
      { href: '/ai-features/cross-camera-journey-map', name: 'Cross-camera journey map', role: 'One subject’s appearances across cameras linked into a path with times.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'Follows each subject across frames so every event and attribute belongs to a track.' },
    ],
  },
  round: {
    heading: 'What the round contributes afterwards',
    label: 'CAM 04 · Dock bay 1, 03:00 round',
    guard: 'Priya R.',
    items: [['Dock door down', 'fail'], ['No vehicle at the bay', 'ok'], ['Staging area clear', 'fail'], ['Yard gate closed', 'ok']],
    caption: 'The 01:00 round passed this stop; the 03:00 round did not. The incident is between them, and both frames are in the reports.',
    paras: [
      'A round is not designed for investigation, and it is the best investigative record a site has, because it is a set of frames at known times from every camera on the sequence, with a verdict on each. When the morning brings a question, the reports from the night already answer when the door was last seen down and when it was first seen up.',
      <>Where the round is <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated</Link>, that record exists every night whether or not anyone was on shift, which is the night it is needed.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not identify anyone. Suspect search matches on attributes, not faces, and returns appearances, not names. It will not recover footage past the retention window on that camera. It will not find a moment on a camera that was not covering it. And it does not decide what a record is worth in a proceeding; that is a question for your counsel.',
      <>We do not publish search accuracy figures, because they depend on your cameras and lighting. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/financial-services', name: 'Financial services' },
  ],
  faqs,
};

export default function IncidentInvestigationPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Incident Investigation", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Incident Investigation' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
