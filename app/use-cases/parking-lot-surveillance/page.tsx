import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "AI Parking Lot Surveillance",
  description: "Parking lot surveillance on existing cameras: people after hours, fire lanes and restricted bays, vehicles where they should not be, a round that records it.",
  path: "/use-cases/parking-lot-surveillance",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Can it detect vehicles as well as people?', answer: 'Yes. Multi-object tracking follows people and vehicles as separate classes, so a zone rule can be about either. Illegal parking detection covers a vehicle stopped in a fire lane or a restricted bay beyond the time allowed, and wrong-way vehicle detection a vehicle moving against a lane’s direction.' },
  { question: 'Does it read license plates?', answer: 'No. Vehicles are tracked as objects. There is no license plate recognition, so it cannot match a vehicle to a permit list; it can tell that a vehicle is in a bay it should not be in, or has been there longer than the rule allows.' },
  { question: 'Does it work in a dark lot?', answer: 'It works on the image the camera produces. Lots with infrared cameras or reasonable lighting give the tracker a usable image; a camera showing a black frame gives it nothing. A camera health item on the patrol round catches the ones that have gone dark.' },
  { question: 'What counts as an after-hours event?', answer: 'Whatever the notification window on that camera says. Every detection carries a window per camera, so a person in the lot between midnight and 5am notifies on a staff car park and does not on a residential one. Zones on different cameras carry different windows, and outside the window the detection stays quiet.' },
  { question: 'Who is notified?', answer: 'Alert channels are set per category, email, SMS, WhatsApp or push, and the severity per camera per detection. A failed checklist item on a round messages the guard designated for that camera with the snapshot. On an automated round that happens on its own.' },
  { question: 'Can it help when a car is reported damaged?', answer: 'The detection log gives every event at that camera with a timestamp and snapshot, and AI suspect search takes a description of a person and returns matching appearances across cameras and the time window. Vehicle damage report assesses visible damage on a vehicle in frame. None of it identifies a driver.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Car parks',
  title: 'AI parking lot surveillance',
  lede: <>
    <strong className="font-semibold text-foreground">Parking lot surveillance is the monitoring of outdoor vehicle areas for people present after hours, vehicles in fire lanes or restricted bays, and activity between parked cars that should not be happening.</strong>{' '}
    A lot is large, unevenly lit and generates more footage than anyone will review, which makes it the most common blind spot on a commercial site. Camzify tracks people and vehicles as objects on the existing cameras, notifies within the hours you set, and checks the lot on a patrol round.
  </>,
  facts: ['People and vehicles tracked as objects', 'Fire lanes and restricted bays as rules', 'Lot checked and recorded on the round'],
  image: { src: '/parking-lot-surveillance.jpg', alt: 'A night parking lot with parked vehicles, a moving car and a pedestrian tracked by cameras' },
  secondary: { href: '/ai-features/illegal-parking-detection', label: 'Illegal parking detection' },
  problem: {
    heading: 'Too much footage from a place nobody walks',
    paras: [
      'Lots are hard to patrol on foot and easy to cover with cameras, which produces the worst combination: complete recording and no attention. Break-ins, damage, overnight parking and people who should not be there are found by whoever arrives first in the morning, and the footage is reviewed to write the report.',
      'Motion-based alarms are hopeless on a lot; every vehicle, every headlight sweep and every gust of wind is motion. The signal is a tracked person after hours, or a tracked vehicle in the wrong place for too long.',
    ],
    visual: 'route',
    caption: 'A lot round: entrance, aisles, fire lane, restricted bays, in order, a checklist at each.',
    alt: 'A patrol route across four car park camera stops with a checklist count at each',
  },
  handles: {
    heading: 'Rules for people, rules for vehicles',
    paras: [
      <><Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> covers the person case: the lot, or parts of it, as zones with a notification window, so a tracked person walking between parked cars at 2am raises an alert with the snapshot and one at 2pm does not. <Link href="/ai-features/illegal-parking-detection" className="text-primary hover:underline">Illegal parking detection</Link> covers the vehicle case: a fire lane, a disabled bay or a restricted area where a vehicle stopped beyond the allowed time is the event. <Link href="/ai-features/wrong-way-vehicle-detection" className="text-primary hover:underline">Wrong-way vehicle detection</Link> fires on a vehicle moving against a lane.</>,
      <>A <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> checks the lot on a schedule, no person present, fire lanes clear, restricted bays empty, gates secured, and records each answer with the frame. When something is reported the next morning, the detection log and the round reports are already the timeline. The same counts, read as a trend, are <Link href="/use-cases/occupancy-monitoring" className="text-primary hover:underline">occupancy monitoring</Link>.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'The lot as zones with a notification window. A tracked person after hours is the event.' },
      { href: '/ai-features/illegal-parking-detection', name: 'Illegal parking detection', role: 'A vehicle stopped in a fire lane or restricted bay beyond the time allowed.' },
      { href: '/ai-features/wrong-way-vehicle-detection', name: 'Wrong-way vehicle detection', role: 'A vehicle moving against the defined direction of an aisle or ramp.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'People and vehicles followed as separate classes, so each rule fires on the right one.' },
    ],
  },
  round: {
    heading: 'What a lot round checks',
    label: 'CAM 12 · Lot, north aisle',
    guard: 'James T.',
    items: [['No person in the lot after hours', 'ok'], ['Fire lane clear', 'fail'], ['Restricted bays empty', 'ok'], ['Entrance barrier down', 'ok']],
    caption: 'A vehicle in the fire lane at 23:30. The item fails with the frame; the rest of the stop passed.',
    paras: [
      'A lot sequence is the cameras in driving order, entrance, aisles, fire lane, restricted area, exit, and its checklist is the state each should be in at that hour. After hours the items are simple: nobody present, lanes clear, bays empty, barrier down. The report per round records the lot was checked and found so at each time.',
      <>The lot round is a common addition to the <Link href="/use-cases/after-hours-monitoring" className="text-primary hover:underline">after-hours sequence</Link> for the building, as its first and last stops.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not read plates or match vehicles to a permit list. It will not identify people. It will not see a corner without a camera or through a camera that has gone dark. And it will not move the car from the fire lane; it tells the person designated for that camera and keeps the frame.',
      <>We do not publish detection rates for lots, because lighting and camera placement vary too much to give one honestly. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/education-facilities', name: 'Education facilities' },
    { href: '/industries/property-management', name: 'Property management' },
  ],
  faqs,
};

export default function ParkingLotSurveillancePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "AI Parking Lot Surveillance", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Parking Lot Surveillance' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
