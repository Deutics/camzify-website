import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

/**
 * "Remote video monitoring" is what buyers call the service a monitoring company
 * sells; this page describes it as a use case on Camzify, with the patrol round as
 * the thing that separates it from alarm-driven monitoring.
 */
const pageMeta = {
  title: "Remote Video Monitoring | Rounds, Not Just Alarms",
  description: "Remote video monitoring on a site's own cameras: scheduled rounds with a checklist per camera, detections in the hours set, a report per round.",
  path: "/use-cases/remote-video-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is remote video monitoring?', answer: 'Watching a site through its cameras from somewhere else, usually a monitoring room or a security agency, and acting on what is seen. On Camzify it has two parts: AI detections that watch each camera in the notification window set for it, and scheduled patrol rounds that check a list at every camera and file a report, whether or not an operator is looking at that site at the time.' },
  { question: 'How is it different from alarm monitoring?', answer: 'Alarm monitoring waits for a sensor to trip and then looks. Remote video monitoring with rounds looks on a schedule as well: a round at 22:00 finds the dock door left open before anyone has a reason to trip a sensor, records the frame and messages the guard. The alarm still comes through; the round is what runs when nothing has happened yet.' },
  { question: 'Does someone have to watch the screen?', answer: 'Not for the round to happen. An automated round runs on schedule, answers each checklist item from the frame and notifies the designated person on a failure. An operator can also run a round by hand and make each judgment themselves. Most monitoring companies run the automated rounds and put operators on what the rounds and detections raise.' },
  { question: 'Who is notified, and how?', answer: 'The person designated for that camera, on the channels set for that camera and severity: a guard on site, a mobile patrol, the client, or the monitoring room itself. Every detection feature has a notification window, so a rule can detect all day and only notify overnight.' },
  { question: 'Can one operator monitor many sites and clients?', answer: 'Yes. Every site sits under one account with its own sequences, schedule and roster; the live wall groups cameras by site; and a scoped login per client keeps each one\'s cameras, users and reports separate. The monitoring companies page covers the account model.' },
  { question: 'What does the client receive?', answer: 'A report per round: every stop, every item, the result and the frame it was judged from, before and after frames on anything fixed, timestamps and who was told. It is the evidence that the site was checked, produced by the check itself rather than typed up afterwards.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Monitored from elsewhere',
  title: 'Remote video monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Remote video monitoring is the watching of a site through its cameras from somewhere else, and acting on what is seen.</strong>{' '}
    Most of it is alarm-driven: nothing happens until a sensor trips. Camzify adds the round. Scheduled patrols step through the cameras, answer a checklist at each one from the frame, message the guard on a failure and file a report, while the AI detections watch between rounds in the hours you set.
  </>,
  facts: ['Rounds on schedule, operator or not', 'Detections in the window you set', 'A report per round, per client'],
  image: { src: '/remote-video-monitoring.webp', alt: 'A monitoring desk with a site camera on the operator\'s screen and the event details panel open' },
  secondary: { href: '/partners/for-monitoring-centers', label: 'For monitoring companies' },
  problem: {
    heading: 'A wall of cameras and nothing to make them speak',
    paras: [
      'A monitoring room has more cameras than eyes. Operators watch the sites that are noisy, the alarms that come in and whatever a client has phoned about, and the quiet site with the door left open at 21:40 stays quiet until the morning. The footage exists; nobody had a reason to look at that camera at that minute.',
      'Alarm-driven monitoring cannot fix this, because an open door trips no sensor. What the room needs is something that goes and looks at every camera on a schedule, asks the right question at each one and only interrupts an operator when the answer is wrong.',
    ],
    visual: 'schedule',
    caption: 'Rounds scheduled per site. Each runs at its own times, with its own sequence and its own person to call.',
    alt: 'A schedule of patrol rounds for several sites with their times and sequences',
  },
  handles: {
    heading: 'The round looks so the operator does not have to',
    paras: [
      <>An <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> steps through each site&apos;s cameras at the scheduled times and answers the checklist from the frame: door closed, shutter down, yard empty, fire exit clear, camera view unobstructed. A failed item sends the message written for it to the <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">person designated for that camera</Link>, and a risk the AI sees that the checklist did not ask about is raised as critical. The operator sees the failures, not the sixty stops that passed.</>,
      <>Between rounds, <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone</Link> and <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link> notify on a tracked person or vehicle inside each camera&apos;s notification window, <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">tampering detection</Link> catches a camera going blind, and everything lands in one <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">alert queue</Link> by severity and site. A <Link href="/use-cases/alarm-verification" className="text-primary hover:underline">verified alarm</Link> opens the camera and the clip on the operator&apos;s desk in the same place.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'A tracked person or vehicle in an area that should be empty, in the hours it should be.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'A directional tripwire on a fence, a gate or a dock edge.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A covered, turned or defocused camera raised as it happens, not found on the next round.' },
      { href: '/ai-features/fire-and-smoke-detection', name: 'Fire and smoke detection', role: 'Flame and smoke signatures on any camera, at any hour, as an early-warning layer.' },
    ],
  },
  round: {
    heading: 'What a monitored round checks',
    label: 'CAM 05 · Rear yard',
    guard: 'Client mobile patrol',
    items: [['Yard gate closed and locked', 'ok'], ['No person or vehicle in yard', 'ok'], ['Rear fire exit clear', 'ok'], ['Roller shutter fully down', 'fail']],
    caption: 'The shutter is up. The client\'s mobile patrol has been messaged with this frame, and the round will record whether it was fixed.',
    paras: [
      'A monitored round is written for the site, not for the room. Each client\'s sequence covers the cameras that matter at the hours that matter, and each stop asks the questions that client would ask if they were standing there. The result is a set of failures for the operator to act on and a set of passes nobody has to read.',
      <>At the end of every round the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is filed for that client: every stop, every item, every frame, who was told and what happened. The <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance view</Link> shows across a month which rounds ran and how many items passed, per site, which is what the client&apos;s renewal conversation is about.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not attend; it tells the person designated for the camera, and the drive is theirs. It will not see what the camera cannot, which is why camera view is a checklist item at every stop. It will not decide what a detection means; it puts the frame in front of a person. And it will not run without a link to the cameras: an outage is a missed round in the log, never a silent one.',
      <>We do not publish detection rates, response times or uptime. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why, and the <Link href="/virtual-guard" className="text-primary hover:underline">virtual guard page</Link> covers the service model this use case sits inside.</>,
    ],
  },
  industries: [
    { href: '/industries/multiple-sites', name: 'Multiple sites' },
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/property-management', name: 'Property management' },
  ],
  faqs,
};

export default function RemoteVideoMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Remote Video Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Remote Video Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
