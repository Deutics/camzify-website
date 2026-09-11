import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Car Theft and Vandalism in Parking Facilities",
  description: "Car theft and vandalism detection for parking garages, dealership lots and car parks: zones on existing cameras and an after-hours round.",
  path: "/use-cases/car-theft-and-vandalism-in-parking-facilities",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does it work in a dark parking garage?', answer: 'It works on the image the camera produces. A garage with infrared cameras or its lights left on gives the tracker a usable frame; a camera showing a black picture gives it nothing, and no detection can recover what the camera did not see. A camera view item on the after-hours round is there to catch the level that has gone dark before the night it matters.' },
  { question: 'Can it tell a resident collecting their car from an intruder?', answer: 'No. A zone rule fires on a tracked person inside the zone during its notification window, and it does not know who the person is. A residential car park is set up so that the rule covers the places a resident has no reason to be, the perimeter fence, the storage cages, the ramp while the barrier is down, and the alert goes to a person who looks at the snapshot before deciding anything.' },
  { question: 'What does a dealership lot get from it?', answer: 'The front row and the display pads become zones with a notification window that opens when the lot closes, and the exit lane becomes a tripwire, so a tracked person between the cars at 2am or a vehicle leaving through the entry lane raises an alert with the snapshot. The automated round checks the lot on a schedule and records each answer with the frame. Vehicle damage report can assess visible damage on a vehicle in frame when a car is found scraped in the morning.' },
  { question: 'What happens when a car is found broken into or missing?', answer: 'The detection log holds every event at that camera with a timestamp and snapshot, and the round reports hold every scheduled check with its frame, so the timeline exists before anyone starts scrubbing footage. Forensic video search takes a description of a person and returns matching appearances across cameras within a time window. None of it identifies the person; that is a matter for the police and the footage.' },
  { question: 'What will it not do?', answer: 'It will not read license plates, so it cannot match a vehicle to a permit list, and it will not stop a theft or a break-in. It detects a tracked person or vehicle where and when none should be, notifies the person designated for that camera, and records the frame. Whether anyone goes down to the garage is that person\'s decision, and we do not publish a detection rate or a response time.' },
  { question: 'Does it need new cameras?', answer: 'No. It runs on the cameras already covering the garage or the lot. Cameras reachable from the internet connect by RTSP, and cameras on a local network connect through the Camzify Connector on a machine at the site, without port forwarding. Where a level or a corner has no camera at all, nothing on this page applies to it.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Parking facilities',
  title: 'Car theft and vandalism in parking facilities',
  lede: <>
    <strong className="font-semibold text-foreground">Car theft and vandalism in parking facilities is the theft of, break-in to and damage of vehicles in parking garages, dealership lots and residential car parks, most of it after dark and in full view of cameras nobody is watching.</strong>{' '}
    A garage records everything and watches nothing. Camzify treats the aisles, ramps and perimeter as zones and tripwires on the existing cameras, tracks people and vehicles as objects, notifies the person on duty within the hours you set, and runs a round after hours that records what it found.
  </>,
  facts: ['People and vehicles tracked as objects', 'Zones and tripwires on the cameras you own', 'An after-hours round with the frame recorded'],
  image: { src: '/parking-lot-surveillance.webp', alt: 'A parking lot with each vehicle outlined, one person at the entrance and one car flagged in red' },
  secondary: { href: '/use-cases/parking-lot-surveillance', label: 'Parking lot surveillance' },
  problem: {
    heading: 'Recorded in full, found in the morning',
    paras: [
      'A parking garage, a dealership lot or a residential car park is the easiest place on a site to cover with cameras and the hardest to actually watch. Nobody reviews forty overnight streams, so the broken window, the missing catalytic converter and the car that is simply gone are discovered by the owner at seven in the morning, and the footage is pulled afterwards to write the report.',
      'Motion alarms do not survive a car park. Headlights, rain, wind and every legitimate late arrival are motion. The event that matters is a tracked person walking the aisles when nobody should be, or a vehicle crossing the ramp in the hours the barrier is meant to be down.',
      'The FBI\'s incident data puts parking lots and garages among the three most common locations for motor vehicle theft, and the evening hours as the busiest. That is the window a guard on a walking round covers least.',
    ],
    visual: 'notification',
    caption: 'A tracked person in the level 2 aisle at 02:14, the snapshot attached, sent to the person designated for that camera.',
    alt: 'A notification card with a snapshot of a garage aisle, the camera name and the time of the event',
  },
  handles: {
    heading: 'Zones on the aisles, tripwires on the ramps, a round after hours',
    paras: [
      <><Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> draws the aisles, the storage cages and the dealership front row as polygons on the cameras that see them, each with a notification window. A tracked person inside one during the window is the event, and the alert carries the snapshot. Outside the window the detection still runs and the event is logged without a notification.</>,
      { points: [
        <><Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line intrusion detection</Link> puts a directional tripwire on the ramp, the exit gate and the fence line, so a vehicle leaving through the entry lane or a person coming over the fence fires and a vehicle arriving does not.</>,
        <><Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-object tracking</Link> follows people and vehicles as separate classes, so a person rule stays quiet for a car and a vehicle rule stays quiet for a resident walking to the lift.</>,
        <><Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link> raises the covered, turned or failed camera, which in a garage is often the first thing that happens.</>,
        <><Link href="/ai-features/wrong-way-vehicle-detection" className="text-primary hover:underline">Wrong-way vehicle detection</Link> fires on a vehicle using the exit ramp as a way in.</>,
      ] },
      <>An <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> visits every level on a schedule after closing and answers a checklist at each camera: barrier down, no person in the aisles, fire lane and ramp clear, camera view unobstructed. Each answer is recorded with the frame, a failed item messages the designated guard, and the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">round report</Link> is the record when something is found in the morning.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'Aisles, storage cages and the front row as zones with a notification window. A tracked person after hours is the event.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'A directional tripwire on the ramp, the exit gate and the fence line.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'People and vehicles followed as separate classes, so each rule fires on the right one.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A covered, turned or failed camera on a level, raised the same night rather than found in the morning.' },
    ],
  },
  round: {
    heading: 'What an after-hours car park round checks',
    label: 'CAM 04 · Level 2 aisle',
    guard: 'Night duty officer',
    items: [['Barrier down and gate closed', 'ok'], ['No person in the aisles', 'fail'], ['Fire lane and ramp clear', 'ok'], ['Camera view unobstructed', 'ok']],
    caption: 'Three items pass. The second is a person between the cars at 02:14, and the night officer has the frame before deciding whether to go down.',
    paras: [
      <>A car park sequence runs the levels in order, entrance, ramps, aisles, exit, and the <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist</Link> at each stop is about the state of the space, not the identity of anyone in it. The round runs on a schedule with nobody walking it, and the items are answered from the frame, so a person in the aisle at 2am and a barrier left up at 3am are both recorded and both messaged.</>,
      <>Every round produces a timestamped report with the frame behind each answer, which is what the insurer, the owner and the police ask for after a theft. <Link href="/use-cases/after-hours-monitoring" className="text-primary hover:underline">After-hours monitoring</Link> covers the schedule side, and <Link href="/use-cases/vandalism-prevention" className="text-primary hover:underline">vandalism prevention</Link> the presence-near-property case that this page shares.</>,
    ],
  },
  evidence: {
    heading: 'Why parking facilities need watching',
    lede: 'Figures from the agencies that count vehicle crime in the United States. Each one links to the page it was taken from.',
    items: [
      { figure: '3rd', text: 'Parking lots and garages were the third most reported location for motor vehicle theft in 2021 through 2023, after residences and streets, and the second most reported in 2019 and 2020. The busiest hours were 8 p.m. to 11:59 p.m., then 4 p.m. to 7:59 p.m.', source: { name: 'FBI, Motor Vehicle Theft, 2019 to 2023', href: 'https://cde.ucr.cjis.gov/LATEST/resources/reports/Motor_Vehicle_Theft_Special_Report.pdf' } },
      { figure: '659,880', text: 'Vehicles stolen in the United States in 2025, down 23.2% from 850,708 in 2024, according to the NICB 2025 Vehicle Theft Report. NICB notes that more than 659,000 vehicles were still stolen and that organized theft networks continue to evolve.', source: { name: 'National Insurance Crime Bureau, July 2026', href: 'https://www.nicb.org/news/news-releases/partnerships-theft-prevention-drive-continued-declines-us-stolen-vehicles' } },
      { figure: '258.8', text: 'Estimated motor vehicle thefts per 100,000 inhabitants in 2024. Motor vehicle theft decreased an estimated 18.6% from 2023, when the estimated count exceeded 1,000,000 for the first time since 2007, but the 2024 rate remains higher than every year from 2010 through 2021.', source: { name: 'FBI, UCR Summary of Reported Crimes in the Nation, 2024', href: 'https://cde.ucr.cjis.gov/LATEST/resources/reports/UCR%20Summary%20of%20Reported%20Crimes%20in%20the%20Nation%202024.pdf' } },
      { figure: 'Every 48 seconds', text: 'A motor vehicle was stolen every 48 seconds in the United States in 2025, with more than 650,000 vehicles stolen in the year. NHTSA names summer as the worst season and advises drivers to park in well-lit areas.', source: { name: 'NHTSA, Vehicle Theft Prevention', href: 'https://www.nhtsa.gov/vehicle-safety/vehicle-theft-prevention' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'In a car park the limits are the camera\'s view and the fact that a detection is not a response.',
      { points: [
        'It will not read license plates or match a vehicle to a permit list; vehicles are tracked as objects.',
        'It will not stop a theft or a break-in; it detects, notifies a person and records the frame, and the response is that person\'s.',
        'It will not see inside a car, and it will not tell a break-in from someone leaning in at a window; it fires on a tracked person where and when none should be.',
        'It will not detect a catalytic converter being cut where the camera cannot see under the vehicle.',
        'It will not cover a level or a corner with no camera, and garages have more pillars than cameras.',
      ] },
      <>We do not publish detection rates, false alarm rates or response times for parking facilities. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why.</>,
    ],
  },
  industries: [
    { href: '/industries/automotive', name: 'Automotive' },
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/residential', name: 'Residential' },
  ],
  faqs,
};

export default function CarTheftAndVandalismInParkingFacilitiesPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Car Theft and Vandalism in Parking Facilities", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Car Theft and Vandalism in Parking Facilities' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
