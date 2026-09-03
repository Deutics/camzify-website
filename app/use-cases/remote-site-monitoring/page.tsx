import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Remote Site Monitoring | Unmanned Sites",
  description: "Remote site monitoring for substations and rural sites: scheduled rounds on the site cameras, camera health as a checklist item, every site on one console.",
  path: "/use-cases/remote-site-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What connectivity does a remote site need?', answer: 'Enough to carry the camera streams to Camzify. Cameras reachable from the internet connect by RTSP directly; cameras on a local network connect through the Camzify Connector on a machine at the site. We do not publish a bandwidth figure per camera, because it depends on resolution, frame rate and codec; the stream quality is detected when the camera connects.' },
  { question: 'What happens when the link drops?', answer: 'The round cannot run against cameras it cannot reach, so the failure is logged as a missed round rather than silently skipped, and the next scheduled round runs when the link returns. Camera-side recording, where the camera has it, continues; cloud recording of that camera pauses for the outage.' },
  { question: 'Can one team watch many remote sites?', answer: 'Yes. Every site sits under one account with its own patrol sequences, schedule and guard roster, and the live wall groups cameras by site with a per-site online count. A site fully offline shows as such rather than as a set of frozen frames. The multi-site page covers the model.' },
  { question: 'Can it tell a deer from a person?', answer: 'Detections fire on a tracked object of a chosen class. An animal is not classified as a person, so a person rule stays quiet for a deer at the fence, and a vehicle rule stays quiet for both. Motion detection, which responds to any change, is a separate feature used deliberately.' },
  { question: 'What about equipment faults, not just intruders?', answer: 'Fire and smoke detection runs on the same cameras. A checklist item can ask about a visible condition, a gate closed, a cabinet door shut, a warning light off, judged from the frame at each stop. Automated rounds also raise a critical notification for a safety risk they see that the checklist did not ask about.' },
  { question: 'Who receives the alert for an unmanned site?', answer: 'Whoever is designated for that camera: a mobile guard, a regional engineer, a monitoring company. Channels are set per alert category and severity per camera per detection, so a site with no one nearby can route everything critical to the people who will drive out.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Unmanned sites',
  title: 'Remote site monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Remote site monitoring is the surveillance of facilities with no permanent security presence: substations, tower sites, pumping stations, rural depots and distributed infrastructure.</strong>{' '}
    A guard visiting once a day covers one hour in twenty-four. Camzify runs scheduled rounds on the site&apos;s own cameras, treats camera health as a checklist item, and puts every site on one console with its own schedule and its own person to call.
  </>,
  facts: ['Rounds on schedule with nobody on site', 'Camera health checked as an item', 'Every site on one console, own schedule'],
  image: { src: '/remote-site-monitoring.jpg', alt: 'A remote substation with networked cameras covering the fence line, a vehicle and open ground' },
  secondary: { href: '/virtual-patrolling/for-multi-site-operations', label: 'Multi-site operations' },
  problem: {
    heading: 'One visit a day is twenty-three hours of nothing',
    paras: [
      'Remote sites are expensive to staff and slow to reach, so they are visited on a schedule and left alone in between. Theft of cable and equipment, damage, and simple faults like an open gate go unnoticed until the next visit or the next fault report, by which time the cost has compounded.',
      'The cameras at those sites are usually there already, recording to a box that nobody checks unless something has gone wrong. What they lack is a round that asks the right questions at the right times and a person to tell when the answer is wrong.',
    ],
    visual: 'sites',
    caption: 'Every site on one account, each with its own sequences, schedule and roster. The offline one is shown as offline.',
    alt: 'A list of sites on one account with their camera counts and online status',
  },
  handles: {
    heading: 'The round drives out so nobody has to',
    paras: [
      <>An <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> visits each of the site&apos;s cameras on schedule and answers the checklist: fence intact, gate closed, no person or vehicle in the compound, equipment area clear, camera unobstructed. Each answer is recorded with the frame. A failed item messages the person designated for that camera, and a risk the AI sees that the checklist did not ask about raises a critical notification.</>,
      <>Between rounds, <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone</Link> and <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link> fire on a tracked person or vehicle the moment one appears, and <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">camera tampering detection</Link> catches the site going blind, which at an unmanned site would otherwise be found on the next visit. All of it sits under one account with the rest of the estate, on the <Link href="/platform/multi-site-management" className="text-primary hover:underline">multi-site console</Link>.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'The compound as a zone, at every hour. A tracked person or vehicle is the event.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'A directional tripwire on the fence and the access track.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A covered, turned or failed camera at a site nobody visits, raised the same day.' },
      { href: '/ai-features/fire-and-smoke-detection', name: 'Fire and smoke detection', role: 'Flame and smoke signatures at a site where the first person on scene is an hour away.' },
    ],
  },
  round: {
    heading: 'What a remote-site round checks',
    label: 'CAM 01 · Substation compound',
    guard: 'Regional engineer',
    items: [['Compound gate closed', 'ok'], ['No person or vehicle in compound', 'ok'], ['Fence line intact', 'ok'], ['Camera view unobstructed', 'fail']],
    caption: 'The compound is in order; the camera itself is not. At an unmanned site the camera is the first thing to check.',
    paras: [
      'A remote-site sequence is short, a handful of cameras covering the gate, the fence and the equipment, and its checklist is about the state of the site and the state of the cameras. Camera view unobstructed is on every stop, because a site that has gone blind is a site nobody is watching and nobody knows it.',
      <>Every site runs its own schedule and its own roster, so the substation on the hill and the depot in town are checked at the times that suit each and reported separately. The <Link href="/virtual-patrolling/for-multi-site-operations" className="text-primary hover:underline">multi-site page</Link> covers how that is set up.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not run without a link to the cameras; an outage is a missed round in the log, not a hidden one. It will not see a corner without a camera, and a remote site often has fewer than it needs. It will not detect an electrical fault, a leak or a temperature that the camera cannot see. And it will not attend; it tells the person designated for that camera, and the drive is theirs.',
      <>We do not publish bandwidth figures, uptime or detection rates for remote sites. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why.</>,
    ],
  },
  industries: [
    { href: '/industries/energy', name: 'Energy' },
    { href: '/industries/remote-sites', name: 'Remote sites' },
    { href: '/industries/construction-sites', name: 'Construction sites' },
    { href: '/industries/waste-management', name: 'Waste management' },
  ],
  faqs,
};

export default function RemoteSiteMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Remote Site Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Remote Site Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
