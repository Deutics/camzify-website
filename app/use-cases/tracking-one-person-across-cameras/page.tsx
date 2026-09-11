import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Track One Person Across Cameras | Suspect Search",
  description: "Reconstruct where one person went across a site: describe them, find every appearance, and stitch the cameras into one timeline. Not face recognition.",
  path: "/use-cases/tracking-one-person-across-cameras",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Is this face recognition?', answer: 'No. Attribute extraction describes what a tracked person wore and carried, and suspect search and the journey map match on those attributes and on timing. Nothing in the chain is a facial biometric, no reference photo is needed, and the final identification of a person is a decision the investigator makes from the frames, not one the software makes for them.' },
  { question: 'What do I need to start a search?', answer: 'A description and a rough time. Gray jacket, dark backpack, sometime after two on Tuesday is enough to run AI suspect search across every indexed camera on the site and get the matching appearances back ranked by confidence. A camera to start from helps but is not required; the search runs across the indexed cameras rather than one at a time.' },
  { question: 'How far back can it go?', answer: 'As far back as the footage retention window on the account. Any appearance indexed within that window can be searched and linked into a journey map, whether the investigation starts the same afternoon or three weeks later. Footage past the window is gone, and the search cannot recover it.' },
  { question: 'What happens when the person changes clothes or leaves camera coverage?', answer: 'The match is made on clothing, carried objects and timing, so a change of jacket between cameras breaks the chain and the investigator has to pick it up again with a new description. Where the person walked through an area with no camera, the timeline shows the last confirmed appearance and the gap, and links the next appearance back in if there is one. It does not guess a path across the gap.' },
  { question: 'Can the route be handed to the police?', answer: 'Yes. The journey map exports as an ordered route with the timestamped frames behind each hop, and the retained footage those frames came from stays in video backup for the retention period. Each hop carries a confidence score that the investigator confirmed or rejected, so what is handed over is a route a person has checked, together with the recordings that support it.' },
  { question: 'What will it not do?', answer: 'It will not identify anyone, tell two people in the same uniform apart with certainty, follow a person through an area with no camera, or search footage that was never recorded. It will not act on a match: it returns appearances and a route, and the investigator decides what they show. Camzify publishes no match rates or search times, and the trust page explains why.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Suspect search and forensics',
  title: 'Tracking one person across cameras',
  lede: <>
    <strong className="font-semibold text-foreground">Tracking one person across cameras is the reconstruction, after the event, of where a single subject went on a site, from the camera that first saw them to the one that saw them leave.</strong>{' '}
    Camzify does it from a description rather than a face. Attribute extraction records what each tracked person wore and carried, AI suspect search finds every appearance that matches, and the cross-camera journey map orders those appearances into one timeline with the coverage gaps shown.
  </>,
  facts: ['Search by description, not by face', 'Every appearance across every camera', 'One timeline with the gaps shown'],
  image: { src: '/feature-cross-camera-journey-map-1.webp', alt: 'Four camera tiles in the Camzify console, each with the same subject outlined and labeled as tracked, from a building entrance to an internal corridor' },
  secondary: { href: '/ai-features/cross-camera-journey-map', label: 'Cross-camera journey map' },
  problem: {
    heading: 'Camera by camera, an afternoon per person',
    paras: [
      'A report comes in after the fact: a person in a gray jacket took something from the back of the store at around two. The investigator has a time, a camera and a description, and everything else is manual. They scrub the first camera to find the person, guess which neighboring camera they walked into, pull that feed, scrub again, and repeat for as long as the path continues.',
      'On a site with forty cameras that is the slowest part of the investigation, and it is easy to get wrong. A missed hand-off is a gap in the account, and a wrong guess is an hour on the wrong feed. The evidence often sits in the recordings and is never assembled, because assembling it costs more time than the case is thought to be worth.',
      <>Law enforcement has the same problem at larger scale. Digital forensic examiners told a National Institute of Justice workshop that they deal with as much video evidence, particularly from surveillance cameras, as they do with phones, with limited tools to analyze it (<a href="https://www.ojp.gov/pdffiles1/nij/grants/248770.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RAND Corporation for NIJ, 2015</a>).</>,
    ],
    visual: 'route',
    caption: 'One subject, four cameras, one ordered path with the hand-offs timestamped and the gap where no camera saw them.',
    alt: 'A route across a site plan with numbered camera stops joined in order',
  },
  handles: {
    heading: 'A description becomes a search, and a search becomes a route',
    paras: [
      <>Every tracked person is described as they are seen. <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> attaches structured attributes to each detection, clothing color and type, carried objects and a plain-language behavior note, so the footage is indexed by what was in it rather than only by camera and time.</>,
      { points: [
        <><Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">AI suspect search</Link> takes a plain-language description, gray jacket and dark backpack, and returns every matching appearance across the indexed cameras and the time window, ranked by confidence.</>,
        <>The <Link href="/ai-features/cross-camera-journey-map" className="text-primary hover:underline">cross-camera journey map</Link> is built from one of those matches and orders every camera that saw the same subject into a single timeline, with each hand-off timestamped.</>,
        'Where the subject left camera coverage, the timeline shows the last confirmed appearance and the gap, rather than guessing a path.',
        'Each hop carries a confidence score, and the investigator confirms or rejects it, so the route on the page is one a person has checked.',
        <>The route exports with its frames for an incident file or a handoff to police, and the recordings behind it stay in <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">video backup</Link> for the retention period.</>,
      ] },
      'None of this is face recognition. The match is made on clothing, carried objects and timing, the same details a witness would give, and the identification of a person is a human decision. The feature pages say so and it applies here.',
    ],
    detections: [
      { href: '/ai-features/ai-attribute-extraction', name: 'AI attribute extraction', role: 'Clothing, carried objects and a behavior note attached to every detection, which is what makes the footage searchable by description.' },
      { href: '/ai-features/forensic-video-search', name: 'AI suspect search', role: 'A plain-language description returns every matching appearance across the cameras, ranked by confidence, with no photo required.' },
      { href: '/ai-features/cross-camera-journey-map', name: 'Cross-camera journey map', role: 'The matched appearances ordered into one timeline, hand-off by hand-off, with the coverage gaps shown rather than guessed.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'The confirmed tracks that the description, the search and the map all rest on, kept apart through crowds and crossings.' },
    ],
  },
  round: {
    heading: 'The round that keeps the evidence usable',
    label: 'CAM 06 · Stockroom door',
    guard: 'Store manager',
    items: [['Entrance camera unobstructed', 'ok'], ['Sales floor camera in focus', 'ok'], ['Stockroom door in frame', 'fail'], ['Rear exit camera lit', 'ok']],
    caption: 'A search is only as good as the recordings behind it. The round checks that every camera on the likely route is still seeing what it was installed to see.',
    paras: [
      'A journey map can only pass through cameras that were recording and pointing the right way, so the patrol round on a site that expects to investigate is a camera-readiness round. At each stop the checklist asks whether the view is unobstructed, in focus and lit, and whether the door or aisle the camera was installed for is still in frame, because a display moved in front of a lens is otherwise found in a search three weeks later.',
      <>A failed item messages the person designated for that camera, and the report carries the frame. <Link href="/use-cases/camera-health-monitoring" className="text-primary hover:underline">Camera health monitoring</Link> covers that round in detail, and <Link href="/use-cases/incident-investigation" className="text-primary hover:underline">incident investigation</Link> covers what happens once the frames are pulled.</>,
    ],
  },
  evidence: {
    heading: 'Why this matters, in published figures',
    lede: 'Figures from the retail industry body, the Congressional Research Service, the FBI and a peer-reviewed study of camera evidence. Camzify publishes no figures of its own.',
    items: [
      { figure: '$112.1 billion', text: 'Retail shrink in 2022, up from $93.9 billion in 2021, in the National Retail Federation\'s 2023 National Retail Security Survey of 177 retail brands. Internal and external theft accounted for 65% of it.', source: { name: 'NRF, 2023 National Retail Security Survey', href: 'https://nrf.com/media-center/press-releases/shrink-accounted-over-112-billion-industry-losses-2022-according-nrf' } },
      { figure: '36%', text: 'The share of overall inventory shrink that the 2023 survey\'s respondents attributed to external theft including organized retail crime, as summarized by the Congressional Research Service in May 2024. The same report notes that the FBI\'s crime data collects shoplifting but does not capture ORC specifically.', source: { name: 'Congressional Research Service, R48061', href: 'https://www.congress.gov/crs-product/R48061' } },
      { figure: '15.9%', text: 'The share of reported property crimes cleared by arrest or exceptional means in 2024, against an estimated 5,986,400 property crime offenses, in the FBI\'s Uniform Crime Reporting summary released August 2025.', source: { name: 'FBI UCR, Reported Crimes in the Nation, 2024', href: 'https://cde.ucr.cjis.gov/LATEST/resources/reports/UCR%20Summary%20of%20Reported%20Crimes%20in%20the%20Nation%202024.pdf' } },
      { figure: '45% and 29%', text: 'In a peer-reviewed analysis of 251,195 crimes recorded on the British railway network between 2011 and 2015, CCTV was available to investigators in 45% of cases and judged useful in 29%, and useful CCTV was associated with significantly increased chances of the crime being solved (Ashby, 2017).', source: { name: 'European Journal on Criminal Policy and Research', href: 'https://doi.org/10.1007/s10610-017-9341-6' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'A search across cameras is a tool for a person building a case, and its limits are worth knowing before the case depends on it.',
      { points: [
        'It will not recognize a face or confirm who a person is; it matches clothing, carried objects and timing, and a change of jacket between cameras breaks the match.',
        'It will not tell two people in the same uniform apart with certainty, and the confidence score on each hop says so.',
        'It will not follow a person through an area with no camera; the timeline shows the gap and does not guess.',
        'It will not search footage that was never recorded or that has passed its retention window.',
        'It will not decide anything; every hop is confirmed or rejected by the investigator, and the export is what they confirmed.',
      ] },
      <>We do not publish match rates or search times. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/multiple-sites', name: 'Multiple sites' },
    { href: '/industries/warehouses', name: 'Warehouses' },
  ],
  faqs,
};

export default function TrackingOnePersonAcrossCamerasPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Tracking One Person Across Cameras", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Tracking One Person Across Cameras' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
