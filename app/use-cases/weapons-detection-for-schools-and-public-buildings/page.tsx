import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Weapons Detection for Schools and Civic Buildings",
  description: "Visible-weapon detection on the cameras schools, courthouses and civic buildings already have: a critical alert with a clip, verified by a person.",
  path: "/use-cases/weapons-detection-for-schools-and-public-buildings",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Is this a weapons screening system?', answer: 'No. Camzify weapons detection is a visual model that runs on the camera frame and flags a firearm or an edged weapon that is visibly held or brandished. It is not a metal detector, a millimeter-wave scanner or a bag check, and it does not see a weapon in a backpack, a holster or a coat. A building that screens at the door keeps screening; this covers the cameras beyond and around it.' },
  { question: 'Who receives the alert, and what do they do?', answer: 'Whoever is designated for that camera: the front office, a school resource officer, the security desk at a courthouse, a district operations center, or a monitoring company. The alert is critical by default and carries the frame, a clip and a confidence score. The person looks at the clip, decides in seconds, and starts the building\'s own procedure or dismisses it.' },
  { question: 'Does it call the police by itself?', answer: 'No. Camzify notifies the people configured for that camera on the channels configured for that severity, and a person decides what happens next. Whether that person calls 911, starts a lockdown or walks to the vestibule is the building\'s procedure, not ours, and we think the decision should stay with a person who has seen the clip.' },
  { question: 'Will it alert on a phone, a tool or a prop?', answer: 'Sometimes. The model is trained to reduce confusion with objects that look like weapons, and it does not eliminate it, which is why every alert includes a clip and a confidence score and why the workflow is verify, then escalate. A drama department rehearsing with a prop or a maintenance worker carrying a drill will produce alerts that a person dismisses.' },
  { question: 'Does it identify students, visitors or staff?', answer: 'No. Camzify does not use facial recognition and does not match anyone against a list. Detections attach to a tracked person in the frame, and AI suspect search can afterwards find the same person on other cameras by description, such as clothing and color. Nothing on the console names a person.' },
  { question: 'What will it not do?', answer: 'It will not detect a concealed weapon, it will not prevent an incident, and it will not replace screening, a threat assessment program or a response plan. It shortens the time between a weapon becoming visible on a camera and a person knowing about it, with a clip in front of them. The response, and its outcome, belong to the people on site.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Schools and civic buildings',
  title: 'Weapons detection for schools and public buildings',
  lede: <>
    <strong className="font-semibold text-foreground">Weapons detection for schools and public buildings is the visual detection of a firearm or an edged weapon that is visibly held in a camera frame, raised as a critical alert with a clip to a person who verifies it.</strong>{' '}
    It runs on the entrance, corridor, lobby and parking cameras a school, a campus, a courthouse or a city hall already has. It is not a screening system, and it does not decide anything: a person looks at the clip and starts the building&apos;s own procedure.
  </>,
  facts: ['Visible firearms and blades, raised as critical', 'On the cameras already at the doors', 'Not a scanner, not facial recognition'],
  image: { src: '/feature-weapons-detection-1.webp', alt: 'The console live view of a lobby by a revolving door, one person outlined with a Gun Detected label while others walk past' },
  secondary: { href: '/ai-features/weapons-detection', label: 'Weapons detection' },
  problem: {
    heading: 'The plan exists; the question is when it starts',
    paras: [
      'Nearly every US public school has a written active shooter plan, and most civic buildings have a version of one. The plan starts when someone knows. In practice that is a shout, a call to the front office or a fire alarm pulled in a corridor, and the minutes before that are the minutes the plan was written to use.',
      'The entrance camera usually sees the weapon before anyone in the building does. It records the frame for the investigation, which is the wrong moment to be useful.',
      'Screening at the door, where a building has it, covers the door. It does not cover the parking lot, the athletics field, the evening rental of the gym, the loading dock or the public counter that was never screened. Those are covered by cameras that nobody is watching.',
    ],
    visual: 'flow',
    steps: ['Weapon visible in frame', 'Critical alert with clip', 'A person verifies', 'Site procedure begins'],
    caption: 'The camera raises it and a person decides. The procedure that follows is the building\'s own.',
    alt: 'Four-step flow from a weapon becoming visible in a camera frame, to a critical alert with a clip, to a person verifying it, to the site procedure starting',
  },
  handles: {
    heading: 'Raised when it is visible, verified by a person',
    paras: [
      <><Link href="/ai-features/weapons-detection" className="text-primary hover:underline">Weapons detection</Link> runs on every enabled camera and evaluates each tracked person in the frame.</>,
      { points: [
        'A visibly held or brandished firearm or edged weapon is the event.',
        'The alert defaults to critical severity and carries the frame, a clip and a confidence score.',
        'Repeated detections on the same tracked person are one event, not a stream of alerts.',
        'The person receiving it acknowledges it, and the record shows who and when.',
      ] },
      <>Detection runs at every hour. A notification window per camera limits when notifications go out, not when the detection runs, so the school day can notify the front office and the evening rental can notify the district operations center. The <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification settings</Link> cover channels, severity and escalation per camera.</>,
      <><Link href="/ai-features/aggression-and-fight-detection" className="text-primary hover:underline">Aggression and fight detection</Link> is usually enabled alongside it, because one escalates into the other. Afterwards, <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">AI suspect search</Link> finds the same person on other cameras by description, and <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">cloud backup</Link> holds the footage within the retention set for that camera. The broader <Link href="/use-cases/violence-and-weapons-detection" className="text-primary hover:underline">violence and weapons detection</Link> page covers both detections across other settings.</>,
    ],
    detections: [
      { href: '/ai-features/weapons-detection', name: 'Weapons detection', role: 'A visibly held firearm or blade in frame, raised as critical with a clip and a confidence score. Not concealed weapons.' },
      { href: '/ai-features/aggression-and-fight-detection', name: 'Aggression and fight detection', role: 'Sustained aggressive movement between tracked people in a corridor or a lobby. A crowded hallway at the bell does not match.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'Each person followed as one track, so the weapon model attaches to a person and repeated detections stay one event.' },
      { href: '/ai-features/forensic-video-search', name: 'AI suspect search', role: 'Find the same person on other cameras afterwards, by clothing and color. Not facial recognition.' },
    ],
  },
  round: {
    heading: 'What an entrance round checks',
    label: 'CAM 02 · Main entrance vestibule',
    guard: 'Front office',
    items: [['Exterior doors secured after the bell', 'ok'], ['Visitor vestibule staffed', 'ok'], ['No person in the restricted corridor', 'ok'], ['Camera view unobstructed', 'fail']],
    caption: 'The doors are secured and the desk is staffed; the camera that watches them is partly blocked. At an entrance, the camera is the first thing to check.',
    paras: [
      'Weapons detection is continuous and does not wait for a round. The round records the conditions the plan depends on: at each stop, the exterior doors were secured, the vestibule was staffed, the restricted corridor was empty, the camera could see. Repeated through the day, it is a record that the building was in the state the plan assumes, which is the record a district or a facilities department is asked for afterwards.',
      <>A failed item messages the person designated for that camera and stays Pending in the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> until it is marked Fixed. On an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link>, the AI also raises a critical notification for a risk it sees at a stop that the checklist did not ask about. <Link href="/use-cases/unauthorized-access-detection" className="text-primary hover:underline">Unauthorized access detection</Link> covers the propped door and the tailgated entry that the plan also assumes are not happening.</>,
    ],
  },
  evidence: {
    heading: 'The US context, in published figures',
    lede: 'Figures from the FBI and from the Department of Justice and Department of Education joint report on school crime, quoted as the source states them. They describe the country, not any one building, and none of them is a Camzify figure.',
    items: [
      { figure: '24', text: 'In 2024, the FBI designated 24 shootings as active shooter incidents, a decrease of 50% from 2023 (48 incidents). They occurred in 19 states across five location categories, including education and government.', source: { name: 'FBI, 2024 Active Shooter Incidents report (June 2025)', href: 'https://www.fbi.gov/news/press-releases/fbi-releases-2024-active-shooter-incidents-in-the-united-states-report' } },
      { figure: '223', text: 'From 2020 to 2024, the FBI designated 223 active shooter incidents, in 43 states and the District of Columbia, a 70% increase from the previous five-year period (2015 to 2019).', source: { name: 'FBI, 2024 Active Shooter Incidents report (June 2025)', href: 'https://www.fbi.gov/news/press-releases/fbi-releases-2024-active-shooter-incidents-in-the-united-states-report' } },
      { figure: '50', text: 'From 2000 through 2022, there were 50 active shooter incidents at elementary and secondary schools, with 328 casualties (131 killed and 197 wounded), and 18 at postsecondary institutions, with 157 casualties.', source: { name: 'NCES and BJS, Report on Indicators of School Crime and Safety: 2023', href: 'https://bjs.ojp.gov/document/iscs23.pdf' } },
      { figure: '96 percent', text: 'From 2009-10 to 2021-22, the percentage of public schools with written plans for active shooter scenarios increased from 84 to 96 percent.', source: { name: 'NCES and BJS, Report on Indicators of School Crime and Safety: 2023', href: 'https://bjs.ojp.gov/document/iscs23.pdf' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'This is the page where the limits matter most, so they come first.',
      { points: [
        'It will not detect a concealed weapon; it is a visual model, not a metal detector, a scanner or a bag check.',
        'It will not prevent an incident; it shortens the time between a weapon being visible on a camera and a person knowing, and the response is that person\'s.',
        'It will not call the police, start a lockdown or make any decision; it notifies the people configured for that camera and they decide.',
        'It will not identify anyone, and it does not use facial recognition.',
        'It will produce some alerts that a person, looking at the clip, will dismiss, and the workflow is built for that.',
        'It will not see a corner without a camera, and a campus has many.',
      ] },
      <>We do not publish detection rates or false-alert rates for the weapons model, and we will not put a number on a page about schools that we cannot verify for your cameras. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> explains why.</>,
    ],
  },
  industries: [
    { href: '/industries/education-facilities', name: 'Education facilities' },
    { href: '/industries/financial-services', name: 'Financial services' },
    { href: '/industries/property-management', name: 'Property management' },
  ],
  faqs,
};

export default function WeaponsDetectionForSchoolsAndPublicBuildingsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Weapons Detection for Schools and Public Buildings", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Weapons Detection for Schools and Public Buildings' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
