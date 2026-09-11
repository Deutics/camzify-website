import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Fire Lane and Emergency Access Enforcement",
  description: "Fire lane enforcement on existing cameras: a vehicle stopped in a fire lane, ambulance bay or loading zone past the grace period, frame recorded.",
  path: "/use-cases/fire-lane-and-emergency-access-enforcement",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How long can a vehicle stop before it counts?', answer: 'As long as the grace period on that zone allows. The grace period is configurable per restricted zone, so a hospital drop-off can tolerate the minute a patient needs to get out and a fire lane can tolerate almost nothing. A vehicle gone before the period ends never raises an alert; one still there when it ends does, with the clip and the dwell time attached.' },
  { question: 'Can it tell an ambulance from a car in the ambulance bay?', answer: 'Not by itself. Vehicles are tracked as objects, and AI attribute extraction can add the vehicle\'s color and type to the alert, but there is no license plate recognition and no register of permitted vehicles. In practice the rule goes on the approach lane and the bay itself with a short grace period, and the person who receives the alert sees the frame and knows an ambulance when they see one.' },
  { question: 'Will the record satisfy the fire marshal?', answer: 'It gives the fire code official something a sign and a tow-away contract cannot: a timestamped record of what the camera saw on the lane at every scheduled check and every detection, with the frame behind each entry. Whether that satisfies an inspection is the official\'s decision under the code adopted in that jurisdiction, and Camzify does not certify compliance with IFC 503 or NFPA 1.' },
  { question: 'Can a loading zone have hours when stopping is allowed?', answer: 'Yes, through the notification window on that camera. The detection runs at every hour, and notifications are generated only inside the window you set, so the loading zone camera can notify outside delivery hours and stay quiet during them, while the fire lane camera notifies at every hour. Events outside the window are still logged.' },
  { question: 'What will it not do?', answer: 'It will not tow, ticket or identify a driver, and it will not clear the lane. It detects a tracked vehicle stopped in the zone past the grace period, notifies the person designated for that camera, and records the frame, the time and the dwell. Moving the vehicle is a person\'s job, and we publish no detection rate or response time.' },
  { question: 'Does it need a dedicated camera on the lane?', answer: 'It needs a camera with an unobstructed view of the zone, which is usually one already on the building. A view along the lane holds a vehicle in track for the whole dwell better than a view across it, and a curved access road or a long loading dock may need more than one camera. Cameras connect by RTSP, or through the Camzify Connector on a local network.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Emergency access',
  title: 'Fire lane and emergency access enforcement',
  lede: <>
    <strong className="font-semibold text-foreground">Fire lane and emergency access enforcement is keeping fire apparatus access roads, ambulance bays, hospital drop-offs and loading zones clear of stopped vehicles, and holding a record of every time they were not.</strong>{' '}
    The fire code requires the lane to be unobstructed at all times; a painted curb does not make it so. Camzify marks the lane as a restricted zone on the camera that already sees it, flags a vehicle that stays past the grace period, records the frame and the time, and checks the lane as an item on every patrol round.
  </>,
  facts: ['A vehicle stopped past the grace period is the event', 'The frame, the time and the dwell on every event', 'Lane clear as a checklist item on the round'],
  image: { src: '/feature-illegal-parking-detection-1.webp', alt: 'A console view of a storefront fire lane with a blue car parked across the yellow hatching, outlined in red and labeled Illegal Parking Detected' },
  secondary: { href: '/ai-features/illegal-parking-detection', label: 'Illegal parking detection' },
  problem: {
    heading: 'A sign is not a clear lane',
    paras: [
      'Every fire lane has a sign and every fire lane gets parked in. The delivery van at the loading zone, the visitor who is only going to be a minute at the hospital entrance, the tenant who found no space at eleven at night. On the day the engine or the ambulance needs the lane, the vehicle in it belongs to none of the people who will be asked why it was there.',
      'Enforcement by walking the lane catches whoever is there when the guard passes and nothing else. A fire inspection asks how the lane is kept clear, and a facility that answers with a sign and a tow-away contract has no record of how often it was blocked, for how long, or by what.',
      'An ambulance bay has the same problem with higher stakes and a constant stream of legitimate stops. The rule cannot be no vehicle ever; it has to be no vehicle for longer than a drop-off takes, and it has to reach a person who can go out and move it.',
    ],
    visual: 'report',
    caption: 'The round report carries the lane as an item on every stop, with the frame, the time and the result, which is the record an inspection asks for.',
    alt: 'A patrol report page with a list of checklist items, each with a time and a pass or fail mark',
  },
  handles: {
    heading: 'The lane as a zone with a grace period',
    paras: [
      <><Link href="/ai-features/illegal-parking-detection" className="text-primary hover:underline">Illegal parking detection</Link> marks the fire lane, the ambulance bay approach or the loading zone as a restricted zone on the camera that covers it. A vehicle that stops inside the zone and stays past the configurable grace period is the event; a drop-off that is gone in a minute is not.</>,
      { points: [
        'Each event carries the clip, the frame, the dwell time and the camera, so the record says where, when and for how long without anyone reviewing footage.',
        <><Link href="/ai-features/wrong-way-vehicle-detection" className="text-primary hover:underline">Wrong-way vehicle detection</Link> covers the ambulance bay exit and the one-way service road, where a vehicle entering against the flow is the problem before it has stopped.</>,
        <><Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> can add the vehicle&apos;s color and type to the alert; there is no license plate recognition.</>,
        <>A <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification window</Link> per camera means the loading zone notifies outside delivery hours and the fire lane at every hour, while the detection itself runs on both at all times.</>,
      ] },
      <>A <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> adds the check no detection replaces: at each scheduled stop it answers whether the fire lane is clear, the ambulance bay approach is clear, the hydrant and fire department connection are unobstructed and the no-parking markings are visible, and it records each answer with the frame. A failed item messages the person designated for that camera, and the same person gets the detection alerts in between.</>,
    ],
    detections: [
      { href: '/ai-features/illegal-parking-detection', name: 'Illegal parking detection', role: 'The lane, bay or zone as a restricted area. A vehicle stopped past the grace period is the event, with clip and dwell time.' },
      { href: '/ai-features/wrong-way-vehicle-detection', name: 'Wrong-way vehicle detection', role: 'A vehicle entering the ambulance bay exit or a one-way service road against its direction.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'Each vehicle followed as one object through its whole stop, so the dwell time is measured on a track, not on pixel motion.' },
      { href: '/ai-features/ai-attribute-extraction', name: 'AI attribute extraction', role: 'The vehicle\'s color and type on the alert, for the person who has to find it.' },
    ],
  },
  round: {
    heading: 'What an emergency access round checks',
    label: 'CAM 02 · Emergency entrance',
    guard: 'Facilities duty manager',
    items: [['Fire lane clear of vehicles', 'ok'], ['Ambulance bay approach clear', 'fail'], ['Hydrant and FDC unobstructed', 'ok'], ['No-parking markings visible', 'ok']],
    caption: 'The lane and the hydrant are clear. A car has been in the ambulance bay approach for eleven minutes, and the duty manager has the frame.',
    paras: [
      <>An emergency access sequence is short: the fire lane cameras, the ambulance bay, the loading dock and the hydrant, in order, with a <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist</Link> at each about the state of the lane rather than the identity of any vehicle in it. It runs on a schedule that suits the site, every hour overnight at an apartment building, more often at a hospital entrance, with nobody walking it.</>,
      <>Every round produces a timestamped <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> with the frame behind each answer, and <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance tracking</Link> shows which rounds ran and which items failed over a month. The wider lot, people after hours and the restricted bays, is covered on <Link href="/use-cases/parking-lot-surveillance" className="text-primary hover:underline">parking lot surveillance</Link>.</>,
    ],
  },
  evidence: {
    heading: 'What the codes require, and how often the lane is needed',
    lede: 'The two model fire codes adopted across the United States, and the count of calls the apparatus that uses the lane answers. Each figure links to the page it was taken from.',
    items: [
      { figure: '20 ft by 13 ft 6 in', text: 'The 2021 International Fire Code requires a fire apparatus access road to have an unobstructed width of not less than 20 feet, exclusive of shoulders, and an unobstructed vertical clearance of not less than 13 feet 6 inches (Section 503.2.1).', source: { name: 'ICC, 2021 International Fire Code, Chapter 5', href: 'https://codes.iccsafe.org/content/IFC2021P1/chapter-5-fire-service-features' } },
      { figure: 'At all times', text: 'IFC Section 503.4 states that fire apparatus access roads shall not be obstructed in any manner, including the parking of vehicles, and that the minimum widths and clearances shall be maintained at all times. Section 503.3 requires fire lane signs and markings to be kept clean and legible.', source: { name: 'ICC, 2021 International Fire Code, Section 503', href: 'https://codes.iccsafe.org/content/IFC2021P1/chapter-5-fire-service-features' } },
      { figure: '150 ft', text: 'Under Chapter 18 of NFPA 1, Fire Code, access roads must let the apparatus get within 50 ft of at least one exterior door and within 150 ft of all exterior portions of the first story, 450 ft for a sprinklered building, and must be kept unobstructed to 20 ft wide and 13 ft 6 in high.', source: { name: 'NFPA, How To Maintain Building and Equipment Access for the Responding Fire Department, 2022', href: 'https://www.nfpa.org/news-blogs-and-articles/blogs/2022/12/19/how-to-maintain-building-and-equipment-access-for-the-responding-fire-department' } },
      { figure: '28.2 million', text: 'Medical aid calls answered by US fire departments in 2024, out of 42,687,000 calls in total and 1,388,000 fires. Most apparatus movements are for a patient, which is why an ambulance bay and a hospital drop-off are emergency access as much as a fire lane is.', source: { name: 'NFPA, Fire department calls, 2024', href: 'https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/fire-department-calls' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'On a fire lane the limits are the camera\'s view and the fact that a record is not a tow truck.',
      { points: [
        'It will not tow, ticket or identify the driver; there is no license plate recognition, and the record is the frame, the time and the dwell.',
        'It will not tell a delivery from a dumped car; the grace period and the person reading the alert do that.',
        'It will not certify compliance with IFC 503 or NFPA 1; it shows what the camera saw at each time, and the fire code official decides.',
        'It will not see a lane the camera does not; a curved access road or a long dock may need more than one camera.',
        'It will not run on a covered or failed camera, which is why the camera view is a round item and a tampering alert.',
      ] },
      <>We do not publish detection rates, false alarm rates or response times for fire lanes. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why.</>,
    ],
  },
  industries: [
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/retail', name: 'Retail' },
  ],
  faqs,
};

export default function FireLaneAndEmergencyAccessEnforcementPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Fire Lane and Emergency Access Enforcement", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Fire Lane and Emergency Access Enforcement' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
