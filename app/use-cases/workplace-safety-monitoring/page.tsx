import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import Link from 'next/link';

const pageMeta = {
  title: "Workplace Safety Monitoring With AI Cameras",
  description: "Workplace safety on existing cameras: falls raised live, blocked exits and exclusion zones on the checklist, PPE per zone, the site recorded each round.",
  path: "/use-cases/workplace-safety-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How does it tell a fall from someone bending down?', answer: 'Slip and fall detection looks at the speed and pattern of a person\'s movement on their confirmed track, not a single pose. Bending, kneeling and sitting do not match the pattern of a fall. Every alert carries a clip, so the guard who is sent can see what happened before they arrive.' },
  { question: 'What happens after a fall is detected?', answer: 'An alert with a timestamped clip goes to the nearest available guard through the notification system, so someone can attend or send help, and the event is logged for the incident record. It does not replace first aid or the reporting process; it starts them sooner.' },
  { question: 'Can it watch for blocked exits and obstructions?', answer: 'Two ways. A patrol checklist item asks at each stop whether the exit is clear and the walkway unobstructed, judged from the frame. Between rounds, abandoned object detection flags a pallet or box left in a route past a dwell time you set.' },
  { question: 'Does it cover exclusion zones around machinery?', answer: 'Zone intrusion detection draws the exclusion zone on the camera view and notifies on a tracked person inside it during the hours you set. It is a visual check on a track, so it fires on a person and not on a forklift, if person is the chosen class.' },
  { question: 'Is the record useful for a liability claim?', answer: 'Every detected fall produces a timestamped clip of what happened and when, every patrol round produces frames of the site at known times, and every action on the account is in the audit trail. Whether a record meets a given standard is for your counsel; what we can say is that none of it is written after the fact.' },
  { question: 'Does it need cameras repositioned?', answer: 'Fall detection works on existing coverage of aisles, walkways and entrances. Cameras with a clear view of the floor give the most reliable results, and a camera pointed at the ceiling of a corridor will not see a fall in it. No dedicated hardware is required.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Health and safety',
  title: 'Workplace safety monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Workplace safety monitoring with cameras is the continuous watch for the events and conditions that injure people: a fall, a blocked exit, a person inside an exclusion zone, equipment not worn.</strong>{' '}
    Camzify raises the event when it happens, with a clip, and checks the conditions on a patrol round so the site is recorded as safe, or not, at each time. The cameras are the ones already installed for security.
  </>,
  facts: ['Falls raised in real time with a clip', 'Exits and exclusion zones on the checklist', 'The site recorded at each round'],
  heroVisual: <HeroPlaceholder label="Safety · Floor, exits and zones" alt="A console camera wall of four cameras covering a warehouse aisle, a fire exit, a machine exclusion zone and a loading bay" frames={[{ src: '/cam-04.jpg', id: 'CAM 02', loc: 'AISLE C · WALKWAY' }, { src: '/cam-03.jpg', id: 'CAM 09', loc: 'FIRE EXIT · EAST' }, { src: '/cam-06.jpg', id: 'CAM 01', loc: 'PRESS LINE · EXCLUSION ZONE' }, { src: '/cam-02.jpg', id: 'CAM 04', loc: 'LOADING BAY' }]} active={0} />,
  secondary: { href: '/ai-features/slip-and-fall-detection', label: 'Slip and fall detection' },
  problem: {
    heading: 'The injury is found by the next person past',
    paras: [
      'Someone falls in an aisle at the far end of the warehouse and lies there until a colleague happens by. A fire exit is blocked by a pallet for a week because the walk-through is monthly. A contractor steps inside the press exclusion zone and nobody sees it, so it becomes normal. None of these is a mystery afterwards; all of them were on camera.',
      'Safety monitoring has depended on the safety officer being in the right place, and a site has one safety officer and forty cameras.',
    ],
    visual: 'flow',
    steps: ['Fall in aisle C', 'Detected on the track', 'Nearest guard alerted', 'Logged with the clip'],
    caption: 'The path from the event to a person attending, with the record written on the way.',
    alt: 'Four-step flow from a fall being detected, to the nearest guard being alerted, to the event being logged with a clip',
  },
  handles: {
    heading: 'Events raised live. Conditions checked on the round.',
    paras: [
      <><Link href="/ai-features/slip-and-fall-detection" className="text-primary hover:underline">Slip and fall detection</Link> watches the movement pattern of each confirmed person and raises an alert with a clip when it matches a fall, routed to the nearest guard so someone attends rather than someone eventually notices. <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> covers exclusion zones around machinery and vehicle lanes. <Link href="/ai-features/ppe-violation-detection" className="text-primary hover:underline">PPE violation detection</Link> checks hats, vests and gloves against the policy for each zone; the <Link href="/use-cases/ppe-compliance-monitoring" className="text-primary hover:underline">PPE compliance page</Link> covers that check in depth.</>,
      <>The conditions that do not announce themselves, a blocked exit, a stacked walkway, an obstructed extinguisher point, are checklist items on a <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link>, judged from the frame at each stop and recorded with it. <Link href="/ai-features/abandoned-object-detection" className="text-primary hover:underline">Abandoned object detection</Link> catches the pallet left in the route between rounds, and an automated round raises a critical notification for a <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">risk it sees</Link> that no item asked about.</>,
    ],
    detections: [
      { href: '/ai-features/slip-and-fall-detection', name: 'Slip and fall detection', role: 'A fall on a person\'s track, raised with a clip and routed to the nearest guard.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'Exclusion zones around machinery and lanes; a tracked person inside during the hours you set.' },
      { href: '/ai-features/ppe-violation-detection', name: 'PPE violation detection', role: 'Hats, vests and gloves checked per person against the zone policy.' },
      { href: '/ai-features/abandoned-object-detection', name: 'Abandoned object detection', role: 'An object left in a walkway or escape route past a dwell time you set.' },
    ],
  },
  round: {
    heading: 'What a safety round checks',
    label: 'CAM 02 · Aisle C',
    guard: 'Site supervisor',
    items: [['Walkway unobstructed', 'ok'], ['Fire exit clear', 'ok'], ['Exclusion zone empty', 'fail'], ['Spill or debris on floor', 'ok']],
    caption: 'The 10:00 round finds a person inside the press exclusion zone. Frame to the supervisor; the round records it.',
    paras: [
      'A safety sequence walks the cameras over the working areas and asks the questions a safety officer asks on a walk-through: walkway clear, exit clear, zone empty, floor dry, extinguisher accessible. Run at shift start and mid-shift, it produces a report per round with a frame per item, which is the site as it was rather than as it was remembered.',
      <>The <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is what an inspector, an insurer or a claimant&apos;s solicitor asks for, and it exists before they ask.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not replace the safety officer, first aid or the reporting process; it starts them sooner. It will not see a fall on a camera pointed at the ceiling or in an area without a camera. It will not detect a chemical, a gas, a noise or a temperature. And it does not identify anyone; a fall alert shows a person falling, not who.',
      <>We do not publish detection accuracy or injury-reduction figures. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/manufacturing', name: 'Manufacturing' },
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/construction-sites', name: 'Construction sites' },
    { href: '/industries/healthcare', name: 'Healthcare' },
  ],
  faqs,
};

export default function WorkplaceSafetyMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Workplace Safety Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Workplace Safety Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
