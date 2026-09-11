import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Occupancy Limits for Venues and Public Spaces",
  description: "A live count per room from the venue's own cameras, kept as a record against the posted occupant load. The decision at the door stays with a person.",
  path: "/use-cases/occupancy-limits-for-venues-and-public-spaces",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does it alert anyone when a room reaches its limit?', answer: 'Not at a number. Occupancy and peak hour trends gives a live count per room on the console and a history that exports, and that is what the duty manager reads against the posted load. Heatmap anomalies notifies on a departure from the usual pattern, a crowd forming where none forms, and a round at the peak notifies on a failed item such as a blocked exit. The decision at the door is a person\'s.' },
  { question: 'How accurate is the count in a full hall?', answer: 'The count is built from confirmed tracks rather than motion, so it holds up in a moderately busy room. At very high density individual tracks are harder to separate, and the figure is best read as a reliable trend rather than an exact headcount. The clicker at the door remains the number of record for the license; the camera count is the record of the room.' },
  { question: 'Can it count a room with several doors?', answer: 'Yes, because it counts the room rather than the doors. The zone is drawn on the floor cameras of the hall, the lobby or the gym, and the count is of the people in it, whichever door they came through. It is not a turnstile or a beam counter, and it does not need one.' },
  { question: 'What does the record look like after an incident?', answer: 'A count per room over time, exportable from analytics and reporting, and the round reports from the same night with the frame at each stop. Together they answer how many people the cameras counted in the room at 23:14 and what the exits looked like at 23:00. Incident investigation covers how the clips and detections are retrieved.' },
  { question: 'Where does the occupant load number come from?', answer: 'From the fire code and the authority having jurisdiction, usually the fire marshal, based on the floor area, the use of the room and its exit capacity, and it is posted by the main entrance. Camzify does not calculate or set it. The count is measured against the number you already have on the sign.' },
  { question: 'What will it not do?', answer: 'It will not stop admission, hold a door or fire an alert at a number. It will not give an exact headcount at extreme density, and it will not identify anyone; it counts tracks. We do not publish count accuracy figures, because they depend on the cameras and the room, and the trust page explains why.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Venues and public spaces',
  title: 'Occupancy limits for venues and public spaces',
  lede: <>
    <strong className="font-semibold text-foreground">Occupancy limits for venues and public spaces are the posted occupant loads that a hall, a lobby, a gym floor or an event room may not exceed, and this use case is the record of how many people the cameras counted in each of them at each time.</strong>{' '}
    The number on the sign by the door comes from the fire code and the fire marshal. Camzify gives the duty manager a live count per room from the cameras already there, keeps it as a trend, and adds the doors and the exits to the round at the busy hours.
  </>,
  facts: ['Live count per room from the cameras already installed', 'The count kept as a record against the posted load', 'Doors and exits checked on the round at the peak'],
  image: { src: '/feature-occupancy-and-peak-hour-trends-1.webp', alt: 'The console live view on a tablet, a busy store floor with the main aisle boxed and labeled Occupancy' },
  secondary: { href: '/ai-features/occupancy-and-peak-hour-trends', label: 'Occupancy and peak hour trends' },
  problem: {
    heading: 'The sign says 350. Nobody knows what the room holds now.',
    paras: [
      'Every assembly room has a posted occupant load and a person responsible for it. What that person has at 11 p.m. on a Saturday is a clicker at one of three doors, a wristband count from the box office and an impression from the balcony. When the fire marshal asks how many people were in the room at 11:14, the honest answer is a guess.',
      'The same room has cameras on the floor, the entrances and the exits, installed for security and recording to a box. They have been counting the whole time; nobody asked them.',
    ],
    visual: 'compliance',
    caption: 'The count per room across the week, read against the posted load. The peaks are the hours the round runs.',
    alt: 'A weekly overview with per-round figures, read here as an occupancy trend per room',
  },
  handles: {
    heading: 'A count per room, and a round at the peak',
    paras: [
      <><Link href="/ai-features/occupancy-and-peak-hour-trends" className="text-primary hover:underline">Occupancy and peak hour trends</Link> aggregates confirmed counts from <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> per camera or zone into a live figure and a history.</>,
      { points: [
        'The zone is the room: the hall, the lobby, the gym floor, the event space, each with its own count.',
        'The history shows when each room runs closest to its posted load, by hour and by day, which is when the door needs the most staff.',
        <>The trend exports from <Link href="/platform/analytics-and-reporting" className="text-primary hover:underline">analytics and reporting</Link>, so the count at 23:14 on Saturday is a record and not a recollection.</>,
        'A person is counted once, not once per frame, because the count is built on tracks; in a very dense crowd it is a reliable trend rather than an exact headcount.',
      ] },
      'Heatmap anomalies and the round cover what a number does not.',
      { points: [
        <><Link href="/ai-features/heatmap-anomalies" className="text-primary hover:underline">Heatmap anomalies</Link> learns the usual pattern per zone and flags the unusual one, a crowd forming at one exit or a corridor full when it should be empty, with a notification window so a known busy hour does not notify.</>,
        <>A <Link href="/virtual-patrolling" className="text-primary hover:underline">round</Link> at the peak asks whether the exits are clear, whether the queue is inside its barriers and whether the door team is at the door, and records each answer with the frame.</>,
        <>On an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> the AI raises a critical notification for a <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">risk it sees</Link>, a blocked exit on a full floor for instance, whether or not the checklist asked.</>,
      ] },
    ],
    detections: [
      { href: '/ai-features/occupancy-and-peak-hour-trends', name: 'Occupancy and peak hour trends', role: 'A live count per room from confirmed tracks, and the history of it by hour and by day.' },
      { href: '/ai-features/heatmap-anomalies', name: 'Heatmap anomalies', role: 'A departure from the usual pattern in a zone, a crowd where none forms, flagged with a notification window.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'The tracks the count is built on. A person is counted once, whichever door they came through.' },
      { href: '/virtual-patrolling/risk-detection', name: 'Risk detection on the round', role: 'A blocked exit or a crowded aisle the AI sees at a stop, raised as a critical notification.' },
    ],
  },
  round: {
    heading: 'What a peak-hour round checks',
    label: 'CAM 03 · Main hall, exit doors',
    guard: 'Duty manager',
    items: [['Exit doors clear and unobstructed', 'ok'], ['Queue inside its barriers', 'ok'], ['Aisles to the exits clear', 'fail'], ['Door team at the entrance', 'ok']],
    caption: 'A full hall at 23:00 with the aisle to the east exit filled by standing patrons. The duty manager gets the frame and the count for the room.',
    paras: [
      'A venue sequence is the cameras on the entrances, the floor and the exits of each assembly room, and the checklist at each stop is what a fire inspector at the door would want to see.',
      { points: [
        'The exit doors are clear and unobstructed.',
        'The aisles to the exits are open.',
        'The queue is inside its barriers.',
        'The door team is at the door.',
      ] },
      <>Run it at the known peaks, and each <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is the record of the room as it was when it was fullest, with frames and the count beside them. The staffing and planning side of the same count is covered under <Link href="/use-cases/occupancy-monitoring" className="text-primary hover:underline">occupancy monitoring</Link>, and retrieving the clips after an event under <Link href="/use-cases/incident-investigation" className="text-primary hover:underline">incident investigation</Link>.</>,
    ],
  },
  evidence: {
    heading: 'Where the limit comes from',
    lede: 'The occupant load rules as published by a state fire marshal and a city fire department, and the NIST investigation of the nightclub fire that reshaped them.',
    items: [
      { figure: '7 sq ft per person', text: 'is the NFPA 101 occupant load factor for concentrated assembly use without fixed seating, such as a nightclub or a dance floor, and 15 sq ft per person for less concentrated use such as dining at tables (NFPA 101, 2015 edition, Table 7.3.1.2, as adopted in Illinois).', source: { name: 'Office of the Illinois State Fire Marshal, Calculating Occupant Loads in Assembly Occupancies (March 2022)', href: 'https://sfm.illinois.gov/content/dam/soi/en/web/sfm/sfmdocuments/documents/calculating-occupant-loads-for-assembly-occupancies-march-2022.pdf' } },
      { figure: 'No more occupants', text: 'are permitted in an assembly once the density reaches 5 sq ft per person in a space of less than 10,000 sq ft, or 7 sq ft per person in a larger one, whatever the ticket count says.', source: { name: 'Office of the Illinois State Fire Marshal, Calculating Occupant Loads in Assembly Occupancies (March 2022)', href: 'https://sfm.illinois.gov/content/dam/soi/en/web/sfm/sfmdocuments/documents/calculating-occupant-loads-for-assembly-occupancies-march-2022.pdf' } },
      { figure: '$433', text: 'is the Seattle Fire Department citation for a first violation, and $866 for each subsequent one within 12 months. The approved occupant load of each assembly area must be posted near its main entrance, crowds are not allowed to exceed it, and every exit door must stay unlocked and unblocked during hours of operation.', source: { name: 'Seattle Fire Department, Client Assistance Memo 5032 (January 2025)', href: 'https://www.seattle.gov/documents/Departments/Fire/Business/CAM5032_FireInspNightlifeVenues_English.pdf' } },
      { figure: '100 deaths', text: 'in The Station nightclub fire in West Warwick, Rhode Island, on February 20, 2003. NIST\'s technical investigation found smoke visible in the exit doorways in a little more than one minute.', source: { name: 'NIST, NCSTAR 2, Report of the Technical Investigation of The Station Nightclub Fire (2005)', href: 'https://www.nist.gov/publications/report-technical-investigation-station-nightclub-fire-nist-ncstar-2-volume-1' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'A count is a record, not a door.',
      { points: [
        'It will not stop admission, hold a door or fire an alert at a number; the live count and the trend are what the duty manager reads, and the decision at the door is theirs.',
        'It will not give an exact headcount in a very dense crowd; at that density it is a reliable trend, and the door count remains the number of record for the license.',
        'It will not set the occupant load; that number comes from the fire code and the authority having jurisdiction, and the sign by the door is theirs.',
        'It will not identify anyone; it counts tracks.',
      ] },
      <>We do not publish count accuracy figures, because they depend on your cameras and your room. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/education-facilities', name: 'Education facilities' },
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/restaurants', name: 'Restaurants' },
  ],
  faqs,
};

export default function OccupancyLimitsForVenuesAndPublicSpacesPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Occupancy Limits for Venues and Public Spaces", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Occupancy Limits for Venues and Public Spaces' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
