import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Vehicle Monitoring | Yards, Gates and Bays",
  description: "Vehicle monitoring on existing cameras: vehicles tracked as objects at gates, yards and bays, rules with hours, wrong-way and overstay detection. Not plates.",
  path: "/use-cases/vehicle-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does Camzify read license plates?', answer: 'No. Vehicles are tracked as objects using multi-object tracking, which follows each vehicle across frames and classifies it. There is no optical character recognition on plates, so it cannot match a vehicle to a registration. It can tell that a vehicle is present, where, for how long, and which way it is moving.' },
  { question: 'Can day and night carry different rules?', answer: 'Yes. Zone and line rules carry schedules, so the yard gate can allow traffic during shifts and treat any vehicle crossing after them as an event. Patrol sequences have their own active hours and active days on top of that.' },
  { question: 'What does wrong-way detection actually catch?', answer: 'A tracked vehicle moving against the direction defined for a lane, ramp or gate. It is a safety rule as much as a security one: a truck reversing into a one-way dock lane or a car entering through the exit.' },
  { question: 'Can it flag a vehicle that has been sitting too long?', answer: 'Illegal parking detection covers a vehicle stopped in a defined area beyond the time allowed, a fire lane, a loading bay after the window, a visitor space overnight. The time and the area are yours to set per camera.' },
  { question: 'Does it inspect vehicles for damage?', answer: 'Vehicle damage report assesses visible damage on a vehicle in frame and is built for fleet and rental inspection. It is a per-vehicle check rather than a yard alarm, and it works on what the camera can see.' },
  { question: 'Who is notified and what do they get?', answer: 'The channels are set per alert category, email, SMS, WhatsApp or push, with the snapshot attached, and severity is set per camera per detection. A failed checklist item on a patrol round messages the guard designated for that camera.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Vehicles',
  title: 'Vehicle monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Vehicle monitoring through video analytics means detecting, tracking and alerting on vehicle presence and movement in defined areas: entry gates, loading bays, yards, parking zones and restricted perimeters.</strong>{' '}
    It is not license plate recognition. Camzify tracks vehicles as objects in the frame, applies rules about where and when they may be and which way they may move, and checks the yard on a patrol round.
  </>,
  facts: ['Vehicles tracked as objects, not plates', 'Rules with hours at gates, yards and bays', 'Wrong-way and overstay as their own detections'],
  image: { src: '/vehicle-monitoring.jpg', alt: 'Aerial view of a logistics yard with trucks, vans and cars tracked across zoned areas' },
  secondary: { href: '/ai-features/multi-object-tracking', label: 'Multi-object tracking' },
  problem: {
    heading: 'Too many vehicles to flag by hand',
    paras: [
      'A busy yard moves hundreds of vehicles a day, and the ones that matter, the unscheduled truck at the bay, the car through the exit gate at midnight, the van that has been parked against the fence since Tuesday, are lost in the volume. Nobody can watch every gate camera through a shift and nobody does.',
      'The events are simple to state. A vehicle where it should not be, at a time it should not be there, moving the wrong way, or stopped too long. They only need a camera that can tell vehicles apart from everything else and rules to hold them to.',
    ],
    visual: 'flow',
    steps: ['Vehicle enters frame', 'Tracked as an object', 'Rule checked', 'Alert or logged'],
    caption: 'Every vehicle becomes a track, and every track is checked against the rules on that camera.',
    alt: 'Four-step flow from a vehicle entering the frame, to being tracked, to a rule being checked, to an alert or log entry',
  },
  handles: {
    heading: 'Every vehicle a track, every track held to a rule',
    paras: [
      <><Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-object tracking</Link> is the foundation: each vehicle in frame is followed as one object across frames and classified, so the rules above it fire on a vehicle rather than on a moving patch of pixels. <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion</Link> and <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link> with vehicle as the class cover the restricted yard and the gate after hours.</>,
      <><Link href="/ai-features/wrong-way-vehicle-detection" className="text-primary hover:underline">Wrong-way vehicle detection</Link> fires on movement against a lane’s direction, and <Link href="/ai-features/illegal-parking-detection" className="text-primary hover:underline">illegal parking detection</Link> on a vehicle stopped in an area beyond the time allowed. A <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> checks the yard on a schedule, gate closed, no vehicle at the bay outside the window, restricted zone empty, and records each answer with the frame.</>,
    ],
    detections: [
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'Each vehicle followed as one object across frames and classified. The layer everything else sits on.' },
      { href: '/ai-features/wrong-way-vehicle-detection', name: 'Wrong-way vehicle detection', role: 'A vehicle moving against the defined direction of a lane, ramp or gate.' },
      { href: '/ai-features/illegal-parking-detection', name: 'Illegal parking detection', role: 'A vehicle stopped in a defined area beyond the time allowed.' },
      { href: '/ai-features/vehicle-damage-report', name: 'Vehicle damage report', role: 'Visible damage assessed on a vehicle in frame, for fleet and rental inspection.' },
    ],
  },
  round: {
    heading: 'What a yard round checks',
    label: 'CAM 06 · Yard gate',
    guard: 'Rahul K.',
    items: [['Yard gate closed', 'ok'], ['No vehicle at bay 2 outside window', 'fail'], ['Restricted zone empty', 'ok'], ['Fleet parking full count', 'pending']],
    caption: 'A yard stop with an unscheduled vehicle at bay 2. The frame goes to the guard; the fleet count waits on a person.',
    paras: [
      'A yard sequence is the gate, the bays, the fleet parking and the restricted area in driving order, with the state each should be in at that hour as its checklist. After hours the items are short: gate closed, bays empty, zone clear. During shifts they are about exceptions: a vehicle at a bay outside its window, a vehicle in the restricted zone.',
      <>Automated rounds can watch a scene for a short period before judging, which is how a vehicle passing through and a vehicle stopped are told apart. The <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report per round</Link> records each stop with its frame.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not read a plate, identify a driver or match a vehicle to a manifest. It will not weigh, count cargo or check a seal. It will not see a vehicle the camera cannot see, and a yard camera pointed into low sun at the wrong hour is a camera that cannot see. And it will not stop the vehicle; it tells the person designated for that camera and keeps the frame.',
      <>We do not publish detection rates for vehicles; they depend on camera height, angle and lighting. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> explains why we will not estimate them.</>,
    ],
  },
  industries: [
    { href: '/industries/automotive', name: 'Automotive' },
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/manufacturing', name: 'Manufacturing' },
    { href: '/industries/energy', name: 'Energy' },
  ],
  faqs,
};

export default function VehicleMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Vehicle Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Vehicle Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
