import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Fire and Smoke Detection for High-Rise Buildings",
  description: "Visual fire and smoke detection on a tower's existing corridor and lobby cameras: an early-warning layer beside the fire alarm, never instead of it.",
  path: "/use-cases/fire-and-smoke-detection-for-high-rise-buildings",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does this replace the building\'s fire alarm system?', answer: 'No, and we will not describe it as one. A high-rise is required to have a certified fire alarm system, and in most cases sprinklers, smoke control and an evacuation plan; all of that stays and runs exactly as before. Fire and smoke detection is a visual early-warning layer on the security cameras. It is not connected to the alarm panel and is not certified as a life-safety system.' },
  { question: 'What can a corridor camera add that the alarm cannot?', answer: 'A picture. The alarm reports a zone; the camera shows the desk what is burning, on which floor, and whether the corridor is clear, before anyone climbs a stair to look. The alert carries a clip and a confidence score, so the person on duty verifies in seconds and then follows the fire plan with better information than a zone number.' },
  { question: 'Where in a tower does it work?', answer: 'Wherever there is a camera with a view: corridors, lobbies, exit stairs, parking levels, refuse rooms, plant rooms and the roof. It does not see inside an apartment or an office behind a closed door, because there is no camera there. The value is in the common parts, which is also where a fire moves between floors.' },
  { question: 'What causes false alerts in a tower?', answer: 'Steam from a laundry vent, exhaust in a parking level, dust from refurbishment works and fog at a lobby entrance can look like smoke to a camera. The model is trained to reduce those, not to eliminate them, and the confidence threshold is set per camera so a garage ramp and a corridor are tuned differently. Every alert carries a clip, so a person checks before anything is escalated.' },
  { question: 'Who is notified, and how does it fit the fire plan?', answer: 'Whoever you designate for that camera: the front desk, the night concierge, the building manager, a monitoring center. Fire and smoke alerts carry a critical severity and go out on the channels set for that category with the clip attached. The alert is a prompt to verify; the alarm, the evacuation and the call to the fire service follow the building\'s fire plan unchanged.' },
  { question: 'What will it not do?', answer: 'It will not trigger the alarm, start the evacuation or call the fire service. It will not see a fire behind a closed door or through a corridor already full of smoke. We do not publish detection rates or lead times over the building\'s sensors, because they depend on the cameras and the building, and the trust page explains why.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · High-rise buildings',
  title: 'Fire and smoke detection for high-rise buildings',
  lede: <>
    <strong className="font-semibold text-foreground">Fire and smoke detection for high-rise buildings is visual detection of flame and smoke on the cameras a tower already has in its corridors, lobbies, stairs, parking levels and plant rooms, raised as a critical alert with a clip to the person on duty, as an early-warning layer beside the code-required fire alarm system and never instead of it.</strong>{' '}
    The alarm is certified, required and stays. What the cameras add is a picture: where the smoke is, on which floor, before anyone has to go and look.
  </>,
  facts: ['Visual flame and smoke on the cameras already installed', 'Beside the fire alarm, never instead of it', 'A clip on the duty desk that names the floor'],
  image: { src: '/feature-fire-and-smoke-detection-1.webp', alt: 'The console live view on a tablet, a warehouse floor with a fire on a pallet stack boxed and labeled Fire and Smoke Detected' },
  secondary: { href: '/ai-features/fire-and-smoke-detection', label: 'Fire and smoke detection' },
  problem: {
    heading: 'The alarm says a floor. The camera says where.',
    paras: [
      'A high-rise fire alarm does its job: it sounds, it reports a zone, and the building begins to move. What it cannot do is show the front desk what is burning, whether the haze in the stairwell is from a fire or a cigarette, or whether the corridor on the twelfth floor is clear. Somebody has to go and look, and in a tower that walk takes minutes.',
      'The corridors, lobbies, parking levels and plant rooms already have cameras, installed for security and recording to a box that is checked after the event. None of them is watching for a fire, and none of them tells anyone when it sees one.',
    ],
    visual: 'notification',
    caption: 'The critical alert as the duty desk receives it: the camera, the floor, the clip. A person verifies before anyone is called.',
    alt: 'A guard notification for a critical detection, with the message, the snapshot and an acknowledgement',
  },
  handles: {
    heading: 'An earlier picture, on the cameras the tower already has',
    paras: [
      <><Link href="/ai-features/fire-and-smoke-detection" className="text-primary hover:underline">Fire and smoke detection</Link> watches each camera&apos;s live feed for the visual signatures of flame and smoke and raises a critical alert with a clip and a confidence score when a match passes the threshold set for that camera.</>,
      { points: [
        'It runs on the standard corridor, lobby and garage cameras already in place; no thermal hardware is involved.',
        'The alert names the camera, so the desk knows the floor and the spot before anyone climbs a stair.',
        'Steam from a laundry vent, exhaust in a garage and dust from works are the known confounders, and the threshold is set per camera for that reason.',
        'A person verifies from the clip; the alarm, the evacuation and the call to the fire service follow the building\'s fire plan unchanged.',
      ] },
      <>A <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> covers the part that neither the alarm nor the detection does.</>,
      { points: [
        'At each stop it asks whether the stair door is closed, whether the landing and the corridor are clear, whether anything is stored in the stair and whether smoke is visible, and records the answer with the frame.',
        <>On an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> the AI raises a critical notification for a <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">risk it sees</Link> that the checklist did not ask about.</>,
        <><Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link> catches a corridor camera that has gone blind, which in a tower is a floor nobody is watching.</>,
      ] },
    ],
    detections: [
      { href: '/ai-features/fire-and-smoke-detection', name: 'Fire and smoke detection', role: 'Visual flame and smoke in a corridor, a stair, a lobby or a parking level, raised as a critical alert with a clip.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A covered, turned or failed camera on a floor, raised the same day rather than found after the event.' },
      { href: '/ai-features/abandoned-object-detection', name: 'Abandoned object detection', role: 'A bicycle, a stroller or a delivery left in an exit stair or a corridor past a dwell time you set.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'A person in a plant room, a refuse room or on the roof, notified in the hours you set.' },
    ],
  },
  round: {
    heading: 'What a high-rise round checks',
    label: 'CAM 14 · Stair B, level 12',
    guard: 'Front desk, night',
    items: [['Stair door closed', 'ok'], ['Stair landing clear', 'fail'], ['No smoke visible', 'ok'], ['Corridor camera unobstructed', 'ok']],
    caption: 'A stroller stored on the landing of stair B, found on the evening round. Snapshot to the desk; the next round shows it gone.',
    paras: [
      'A high-rise sequence walks the stairs, the corridors, the lobby, the parking levels and the plant rooms in floor order, and its checklist is what a fire officer would want to find on every level.',
      { points: [
        'The stair door is closed on its closer.',
        'The landing and the corridor are clear.',
        'Nothing is stored in the stair or against the riser cupboard.',
        'No smoke is visible.',
      ] },
      <>Run it at closing and through the night. Each round&apos;s <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is the record that every stair was clear at that time, with the frame, and a stack of them is what the annual inspection and the insurer ask for. The same detection in a warehouse or a plant is covered under <Link href="/use-cases/fire-and-smoke-monitoring" className="text-primary hover:underline">fire and smoke monitoring</Link>.</>,
    ],
  },
  evidence: {
    heading: 'Why it matters in a tower',
    lede: 'Published figures from the National Fire Protection Association and the US Fire Administration on high-rise and residential fires.',
    items: [
      { figure: '14,830', text: 'reported structure fires in high-rise buildings each year in the United States in 2019 to 2023, causing an average of 33 civilian deaths, 439 civilian injuries and $203 million in direct property damage per year.', source: { name: 'NFPA, High-Rise Building Fires (October 2025)', href: 'https://content.nfpa.org/-/media/Project/Storefront/Catalog/Files/Research/NFPA-Research/Building-and-life-safety/oshighrise.pdf?rev=fddf967144b344c483efaa478540b4e2' } },
      { figure: '1,588', text: 'fires each year in high-rise multifamily dwellings with seven or more units in 2019 to 2023, with 14 civilian deaths and 152 civilian injuries a year. A kitchen was the area of origin in 59 percent of them, and bedroom fires accounted for 44 percent of the deaths.', source: { name: 'NFPA, High-Rise Building Fires (October 2025)', href: 'https://content.nfpa.org/-/media/Project/Storefront/Catalog/Files/Research/NFPA-Research/Building-and-life-safety/oshighrise.pdf?rev=fddf967144b344c483efaa478540b4e2' } },
      { figure: '45%', text: 'of fatal fires in residential buildings in 2018 to 2020 happened between 11 p.m. and 7 a.m., and being asleep was the leading human factor contributing to ignition, reported in 41 percent of them.', source: { name: 'US Fire Administration, Fatal Fires in Residential Buildings (2018-2020)', href: 'https://www.usfa.fema.gov/downloads/pdf/statistics/v22i2.pdf' } },
      { figure: '80%', text: 'of fatal fires in residential buildings in 2018 to 2020 extended beyond the room of origin, and smoke alarms were not present in 24 percent of fatal fires in occupied residential buildings.', source: { name: 'US Fire Administration, Fatal Fires in Residential Buildings (2018-2020)', href: 'https://www.usfa.fema.gov/downloads/pdf/statistics/v22i2.pdf' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'In a tower the limits are the alarm system\'s job, the closed door and the camera\'s view.',
      { points: [
        'It will not replace or connect to the fire alarm, the sprinklers, the smoke control or the evacuation plan, and it is not certified as a life-safety system; the code-required system stays and runs as before.',
        'It will not see a fire inside an apartment or an office behind a closed door; it sees the corridors, stairs, lobbies, parking levels and plant rooms where the cameras are.',
        'It will not see through a corridor once smoke has filled it; the value is in the first minutes, not the last.',
        'It will not call the fire service or start the evacuation; it tells the person you designate, with a clip, and the fire plan does the rest.',
      ] },
      <>We do not publish detection rates, lead times over the building&apos;s sensors or false-alarm figures, because they depend on your cameras and your building. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/residential', name: 'Residential' },
    { href: '/industries/multiple-sites', name: 'Multiple sites' },
  ],
  faqs,
};

export default function FireAndSmokeDetectionForHighRiseBuildingsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Fire and Smoke Detection for High-Rise Buildings", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Fire and Smoke Detection for High-Rise Buildings' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
