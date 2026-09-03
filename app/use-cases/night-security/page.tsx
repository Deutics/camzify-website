import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Night Security | Overnight Patrol Rounds",
  description: "Night security that does not depend on who is awake: overnight rounds on your cameras, a checklist per stop, guard messaged on failure, a report per round.",
  path: "/use-cases/night-security",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How often can rounds run overnight?', answer: 'As often as the schedule says. Frequency is set per patrol sequence, every 30 minutes, every hour, every two hours, with active hours and active days around it. There is no cap on rounds per night; the practical limit is how often a check is worth recording.' },
  { question: 'What if the internet drops at 3am?', answer: 'The round cannot run without a connection to the cameras, so the failure is logged and the next scheduled round runs when the connection returns. Cameras that record locally keep recording. Cloud recording of that camera pauses for the outage.' },
  { question: 'Does it replace the night guard?', answer: 'It replaces the routine walk, not the person who responds. On a site that has a night guard, the rounds cover the cameras while the guard is sent to what failed. On a site that has none, the rounds run and the messages go to a mobile guard, a keyholder or a monitoring company.' },
  { question: 'Can the AI tell a night cleaner from an intruder?', answer: 'By place and time, not identity. Zones carry hours, so a cleaning crew scheduled until 22:00 does not trip a rule that starts at 22:30. Attribute extraction can describe who was seen, clothing and what they carried, for the person who attends. It does not recognize faces.' },
  { question: 'What about fire, or a door left open?', answer: 'Fire and smoke detection runs on the same cameras and raises its own alert. A door that should be closed is a checklist item; the round finds it open, keeps the frame and messages the guard. Automated rounds also raise a critical notification for a safety or security risk they see that the checklist did not ask about.' },
  { question: 'What does the morning report show?', answer: 'Each round of the night as its own report: the camera stops, every checklist result, the snapshot behind each, timestamps, and a compliance percentage. Anything that failed shows the before frame and, once marked Fixed, the after frame beside it.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Overnight',
  title: 'Night security',
  lede: <>
    <strong className="font-semibold text-foreground">Night security is the protection of a facility through the overnight hours, when staffing is minimal or absent and the risk of intrusion, theft and damage is highest.</strong>{' '}
    A guard on foot covers one place at a time and is least alert at the hour it matters. Camzify runs the round on the cameras instead: the same sequence, the same checks, at the same times, on the fourth night as reliably as the first, and sends a person only to what failed.
  </>,
  facts: ['Rounds on schedule, every night', 'Same checks, same times, recorded', 'Guard sent to what failed'],
  image: { src: '/night-security.jpg', alt: 'Facility perimeter at night with networked security cameras around the building' },
  secondary: { href: '/virtual-patrolling/automated-patrol-scheduling', label: 'Automated patrol scheduling' },
  problem: {
    heading: 'The overnight round depends on one tired person',
    paras: [
      'A night shift is expensive, hard to fill and impossible to verify from the outside. One guard cannot cover a large site and a large site cannot afford several. The round slips at the end of a long shift or at a handover, and there is no record of what was seen at each door beyond a signature on a sheet.',
      'The cameras were installed to fix that and record the whole night without judging any of it. Overnight incidents are found in the morning, on footage that shows exactly when the round should have been.',
    ],
    visual: 'compliance',
    caption: 'A week of overnight rounds with their compliance. The round that failed is the one worth reading.',
    alt: 'A compliance overview showing a week of patrol rounds with their compliance percentages',
  },
  handles: {
    heading: 'The same walk, every night, with a record',
    paras: [
      <>An <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> walks the night sequence at whatever frequency you set. At each camera it answers the checklist, entrance locked, corridor empty, fence intact, dock doors down, camera unobstructed, and keeps the frame. It can watch a scene for a short period rather than judging one frame, and it messages the guard designated for a camera the moment an item is Not Compliant.</>,
      <>Between rounds, <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link> with overnight rules and <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link> at the boundary fire on a tracked person the moment one appears. <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link> catches the camera being covered or turned, which on a dark site is often the first move.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'Overnight rules on yards, corridors and rooms. A tracked person during those hours is the event.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'Tripwires on the boundary and at entrances, watching between rounds.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'Covered, turned or defocused cameras raised before the site goes blind.' },
      { href: '/ai-features/fire-and-smoke-detection', name: 'Fire and smoke detection', role: 'Flame and smoke signatures on any camera, the other overnight risk an empty site carries.' },
    ],
  },
  round: {
    heading: 'What a night round checks',
    label: 'CAM 09 · Rear car park',
    guard: 'James T.',
    items: [['Entrance doors locked', 'ok'], ['Corridors empty', 'ok'], ['Fence line intact', 'ok'], ['No vehicle in the rear car park', 'fail']],
    caption: 'The 03:00 round with a vehicle found in the rear car park. Snapshot to the guard; the item stays Pending until it is resolved.',
    paras: [
      'A night sequence is every camera a guard would walk past, in order, with the state each should be in when the site is closed as its checklist. Repeated through the night, it produces a report per round that says the site was checked at each time and what was found. A clean night is a stack of clean reports, which is what a client, an insurer or a landlord asks for after the one that was not.',
      <>Run the same sequence manually when an operator is on shift and the <Link href="/virtual-patrolling/how-it-works" className="text-primary hover:underline">round works the same way</Link>: the operator judges each item, chooses whether to send the guard message, and the report records it.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not respond. It finds, records and tells the right person; someone still walks out to the car park. It will not see through darkness a camera cannot see through, so cameras without infrared on unlit areas are gaps in the round. And it will not run without a connection to the cameras; an outage is logged, not hidden.',
      <>We do not publish how many overnight incidents rounds have caught or how quickly guards were reached, because we cannot verify those numbers for your site. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/self-storage', name: 'Self-storage' },
    { href: '/industries/property-management', name: 'Property management' },
  ],
  faqs,
};

export default function NightSecurityPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Night Security Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Night Security' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
