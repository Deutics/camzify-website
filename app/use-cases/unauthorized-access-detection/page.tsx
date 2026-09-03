import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Unauthorized Access Detection | Zone Rules",
  description: "Unauthorized access detection behind the badge reader: zones with hours, tailgating at controlled doors, restricted rooms checked on the round with frames.",
  path: "/use-cases/unauthorized-access-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How is this different from access control?', answer: 'Access control decides whether a door opens. It knows a badge was presented and nothing about what happened next: how many people walked through, whether the door was propped, whether the person inside the server room is the one whose badge opened it. Camzify watches the space on the far side of the door. Zone rules say who should be there and when; tailgating detection counts people through a controlled entrance; a patrol round checks the room is empty when it should be.' },
  { question: 'Can zone rules apply only after hours?', answer: 'Yes. A zone carries a schedule. The executive floor corridor can be open all day and a restricted zone from 8pm; a hazardous materials store can be restricted at every hour. Different zones on the same camera can carry different schedules.' },
  { question: 'Can it tell an employee from an intruder?', answer: 'Not by identity. It works on place and time: a person in a zone during hours when nobody should be there. Attribute extraction can describe the person, clothing color, what they carry, for the guard who attends. Facial recognition is not a capability, and we say that plainly on the attribute extraction page.' },
  { question: 'What does tailgating detection actually see?', answer: 'Two or more people passing through a controlled door on one badge event, or a door held open for someone who did not badge. It fires on the count of tracked people through the entrance, so it needs a camera with a view of the door, not a feed from the badge system.' },
  { question: 'Who is notified, and how?', answer: 'The channels are set per alert category, email, SMS, WhatsApp or push, and the severity can be set per camera for each detection, so a zone alert in the server room can be critical while one in the loading corridor is informational. A failed checklist item on a round messages the guard designated for that camera with the snapshot.' },
  { question: 'Is there a record for the auditor?', answer: 'Two. Every detection is logged with camera, time and snapshot, and every patrol round produces a report with the result of each checklist item and the frame it was judged against. Every action on the account is also written to an audit trail. Nothing in either is typed in afterwards.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Restricted areas',
  title: 'Unauthorized access detection',
  lede: <>
    <strong className="font-semibold text-foreground">Unauthorized access detection is the ability to identify and alert when a person or vehicle enters a restricted, controlled or off-limits area.</strong>{' '}
    It differs from motion detection because it works on defined zones with rules about who should be present and when, and it differs from access control because it watches what happens after the door opens. Camzify runs it on the cameras already covering those doors, rooms and corridors.
  </>,
  facts: ['Zones with hours, per camera', 'Tailgating counted at controlled doors', 'Restricted rooms checked on the round'],
  image: { src: '/unauthorized-access-detection.jpg', alt: 'Cameras at a facility gate flagging a person and a vehicle at night' },
  secondary: { href: '/ai-features/zone-intrusion-detection', label: 'Zone intrusion detection' },
  problem: {
    heading: 'The badge reader stops at the door',
    paras: [
      'An access control system records that a badge opened a door at 22:14. It does not know that two people walked through, that the door was wedged open for the next hour, or that the badge belonged to someone who left the company in March. The camera above the door recorded all of that, and nobody was watching it.',
      'The gaps are not exotic: tailgating, propped doors, shared badges, and the contractor who was let in for one job and kept the access. Conventional CCTV catches every one of them on video, after the fact, if someone knows which hour to scrub through.',
    ],
    visual: 'flow',
    steps: ['Badge opens door', 'Camera watches the room', 'Rule breaks', 'Guard gets snapshot'],
    caption: 'Access control handles the first step. Camzify handles the other three.',
    alt: 'Four-step flow from a badge opening a door, to the camera watching the room, to a rule breaking, to the guard receiving a snapshot',
  },
  handles: {
    heading: 'Rules on the space, not on the door',
    paras: [
      <><Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> draws the restricted area on the camera view, the server room floor, the cash office, the roof, and attaches the hours during which nobody, or nobody unaccompanied, should be there. A tracked person inside the zone during those hours raises an alert with the snapshot. <Link href="/ai-features/tailgating-detection" className="text-primary hover:underline">Tailgating detection</Link> watches the controlled entrance itself and fires when more than one person passes on a single badge event.</>,
      <>On top of the detections, a <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> checks the restricted rooms on a schedule: door closed, room empty, nothing left propped. It records the answer with a snapshot whether or not a detection fired, which is the evidence that the control was working, not just that it existed.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'The restricted area on the camera view, with the hours it is restricted.' },
      { href: '/ai-features/tailgating-detection', name: 'Tailgating detection', role: 'Counts tracked people through a controlled door and fires on more than one per badge.' },
      { href: '/ai-features/ai-attribute-extraction', name: 'AI attribute extraction', role: 'Clothing, carried objects and direction of travel for the guard. Not identity.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'Follows each person across frames and cameras so zone and count rules fire on a track.' },
    ],
  },
  round: {
    heading: 'What a restricted-areas round checks',
    label: 'CAM 11 · Server room',
    guard: 'James T.',
    items: [['Server room door closed', 'ok'], ['Room empty', 'ok'], ['Roof access door closed', 'fail'], ['Executive corridor clear after 8pm', 'ok']],
    caption: 'A restricted-areas stop with the roof door found open. The snapshot goes to the guard; the item stays Pending until fixed.',
    paras: [
      'The round for this use case is the cameras covering the rooms and corridors that access control is supposed to protect, and the checklist is the state each should be in: door closed, room empty, nothing propped, nobody on the floor after hours. A passing round is the evidence that the restriction held at each time it was checked.',
      <>Where the round is <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated</Link>, the AI can watch a scene for a few seconds before judging, which is the difference between a person walking through a corridor and a person waiting in it.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not check a badge or open a door; it is not an access control system and does not replace one. It will not identify people. It will not see into a room without a camera in it. And it will not decide what to do about the person in the server room at midnight; it puts the snapshot in front of the guard designated for that camera.',
      <>We do not publish detection rates or notification delivery times. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out what we do and do not claim.</>,
    ],
  },
  industries: [
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/financial-services', name: 'Financial services' },
    { href: '/industries/manufacturing', name: 'Manufacturing' },
    { href: '/industries/energy', name: 'Energy' },
  ],
  faqs,
};

export default function UnauthorizedAccessDetectionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Unauthorized Access Detection", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Unauthorized Access Detection' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
