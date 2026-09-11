import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { Shield, Moon, KeyRound, UserX, Paintbrush, ShoppingBag, Truck, ParkingCircle, Radio, Car, MoonStar, ClipboardCheck, Search, DoorClosed, Video, Flame, HeartPulse, HardHat, ShieldAlert, Users, BellRing, Building2, CarFront, CloudUpload, DoorOpen, FileCheck, Fingerprint, Gauge, LayoutGrid, Route, Siren } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 */
const pageMeta = {
  title: "Security Use Cases | What a Patrol Round Checks",
  description: "Twenty-one security and safety scenarios and what Camzify does in each: the detections that apply, the checklist a round runs, and where it stops.",
  path: "/use-cases",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'What is a use case here, as opposed to a feature?',
    answer: 'A feature is a capability, such as line intrusion detection. A use case is a situation a security manager is responsible for, such as a perimeter after dark, and the combination of detections, patrol checklist and notifications that covers it. Each use-case page names the detections that apply, shows the checklist a round would run, and says what the platform will not do in that situation.',
  },
  {
    question: 'Do I need different products for different use cases?',
    answer: 'No. Every use case on this page runs on the same account: the same cameras, the same 22 detections licensed per camera, and the same virtual patrolling. What changes between them is configuration: which detections are enabled on which cameras, what the checklist at each stop asks, and who is notified when a check fails.',
  },
  {
    question: 'Which use case should a first deployment start with?',
    answer: 'The one with the clearest failure condition. After-hours monitoring and perimeter security are the usual starting points because the checklist writes itself: doors closed, zones empty, fence line clear. A round that passes is a round nobody thinks about, and a round that fails produces a snapshot and a guard message. Once that is working, the other scenarios are a matter of adding cameras and checklist items.',
  },
  {
    question: 'Can one site run several of these at once?',
    answer: 'Yes, and most do. A warehouse runs perimeter security on the fence cameras, loading dock monitoring on the bays, and after-hours rounds across the interior, all as patrol sequences on the same account. Each sequence has its own schedule, checklist and guard roster.',
  },
  {
    question: 'Are the checklists on these pages real?',
    answer: 'They are examples of what a round for that scenario checks, written the way a checklist item is written in the console. The items on your own rounds are yours to define per camera. The states shown, Compliant, Not Compliant and Pending, are the three a checklist item can hold.',
  },
];

const groups = [
  {
    eyebrow: '01',
    title: 'Keep people out',
    desc: 'Boundaries, off-hours and restricted areas: the scenarios where a person present is the event.',
    items: [
      { title: 'Perimeter security', href: '/use-cases/perimeter-security', icon: Shield, desc: 'Fence lines, gates and open ground, checked every round and watched between rounds.', image: '/ai-perimeter-security.webp' },
      { title: 'Trespassing detection', href: '/use-cases/trespassing-detection', icon: UserX, desc: 'A person where nobody should be, on a confirmed track rather than a moving shadow.', image: '/trespassing-detection.webp' },
      { title: 'Unauthorized access detection', href: '/use-cases/unauthorized-access-detection', icon: KeyRound, desc: 'Zones notified in the hours you set, and the tailgating a badge reader never sees.', image: '/unauthorized-access-detection.webp' },
      { title: 'After-hours monitoring', href: '/use-cases/after-hours-monitoring', icon: Moon, desc: 'Scheduled rounds through the building when it is empty, with a report each.', image: '/after-hours-security-monitoring.png' },
      { title: 'Night security', href: '/use-cases/night-security', icon: MoonStar, desc: 'Overnight rounds that run on the fourth night as reliably as the first.', image: '/night-security.webp' },
    ],
  },
  {
    eyebrow: '02',
    title: 'Protect what is inside',
    desc: 'Stock, vehicles, docks and property: the scenarios where the round verifies a condition, not just a presence.',
    items: [
      { title: 'Theft prevention', href: '/use-cases/theft-prevention', icon: ShoppingBag, desc: 'Stockrooms, cages and cash areas notified when they should be empty, with entry flagged.', image: '/ai-theft-detection.png' },
      { title: 'Loading dock monitoring', href: '/use-cases/loading-dock-monitoring', icon: Truck, desc: 'Door status, staging areas and vehicles at the bay, checked against the delivery window.', image: '/loading-dock-security.webp' },
      { title: 'Vandalism prevention', href: '/use-cases/vandalism-prevention', icon: Paintbrush, desc: 'Presence near walls, windows and equipment off-hours, raised while intervention is possible.', image: '/vandalism-prevention.png' },
      { title: 'Parking lot surveillance', href: '/use-cases/parking-lot-surveillance', icon: ParkingCircle, desc: 'People after hours, fire lanes, restricted bays and vehicles left where they should not be.', image: '/parking-lot-surveillance.webp' },
      { title: 'Vehicle monitoring', href: '/use-cases/vehicle-monitoring', icon: Car, desc: 'Vehicles tracked as objects at gates, yards and bays. Not plate reading.', image: '/vehicle-monitoring.webp' },
    ],
  },
  {
    eyebrow: '03',
    title: 'Prove it and reconstruct it',
    desc: 'Where the record is the product: evidence that the round happened, and a timeline when something did.',
    items: [
      { title: 'Guard tour verification', href: '/use-cases/guard-tour-verification', icon: ClipboardCheck, desc: 'Proof of the condition at each checkpoint, not proof that a tag was tapped.', image: '/guard-tour-verification.webp' },
      { title: 'Remote site monitoring', href: '/use-cases/remote-site-monitoring', icon: Radio, desc: 'Unmanned sites on the same rounds and the same console as staffed ones.', image: '/remote-site-monitoring.webp' },
      { title: 'Remote video monitoring', href: '/use-cases/remote-video-monitoring', icon: Video, desc: 'A site watched from a monitoring room: rounds on schedule, detections in the window set, a report per client.', image: '/remote-video-monitoring.webp' },
      { title: 'Incident investigation', href: '/use-cases/incident-investigation', icon: Search, desc: 'Timestamped detections, patrol snapshots and suspect search to shorten the review.', image: '/incident-investigation.png' },
      { title: 'Lock-up and closing checks', href: '/use-cases/lock-up-and-closing-checks', icon: DoorClosed, desc: 'A closing round that checks doors, shutters and lights from the camera, with a frame per item.', image: '/lock-up-and-closing-checks.webp' },
      { title: 'Alarm verification', href: '/use-cases/alarm-verification', icon: BellRing, desc: 'The camera view and a snapshot on the operator\'s desk at the moment the alarm comes in.', image: '/alarm-verification.webp' },
      { title: 'Camera health monitoring', href: '/use-cases/camera-health-monitoring', icon: Video, desc: 'Tampering raised as it happens, offline shown as offline, camera view checked on every round.', image: '/camera-health-monitoring.webp' },
    ],
  },
  {
    eyebrow: '04',
    title: 'Keep people safe',
    desc: 'The same cameras, asked the safety questions: fire, falls, equipment, violence, and how many people are where.',
    items: [
      { title: 'Fire and smoke monitoring', href: '/use-cases/fire-and-smoke-monitoring', icon: Flame, desc: 'Visual flame and smoke as an early-warning layer, and fire exits checked on the round.', image: '/fire-and-smoke-monitoring.webp' },
      { title: 'Workplace safety monitoring', href: '/use-cases/workplace-safety-monitoring', icon: HeartPulse, desc: 'Falls raised live, exits and exclusion zones on the checklist, the site recorded at each time.', image: '/workplace-safety-monitoring.webp' },
      { title: 'PPE compliance monitoring', href: '/use-cases/ppe-compliance-monitoring', icon: HardHat, desc: 'Hats, vests and gloves checked per person against the policy for each zone.', image: '/ppe-compliance-monitoring.webp' },
      { title: 'Violence and weapons detection', href: '/use-cases/violence-and-weapons-detection', icon: ShieldAlert, desc: 'A visible weapon or an altercation raised as critical with a clip, verified by a person.', image: '/violence-and-weapons-detection.webp' },
      { title: 'Occupancy monitoring', href: '/use-cases/occupancy-monitoring', icon: Users, desc: 'Live counts and peak hours per zone from the tracking that already runs. No counting hardware.', image: '/occupancy-monitoring.webp' },
    ],
  },
  {
    eyebrow: '05',
    title: 'Where it matters most',
    desc: 'One capability in one setting where the stakes are highest for the people there, each with the published figures that say why.',
    items: [
      { title: 'Fall detection for hospitals and care homes', href: '/use-cases/fall-detection-for-hospitals-and-care-homes', icon: HeartPulse, desc: 'A person on the floor in a corridor, raised to staff in seconds on the cameras already there, not at the next round.', image: '/feature-slip-and-fall-detection-1.webp' },
      { title: 'Weapons detection for schools and civic buildings', href: '/use-cases/weapons-detection-for-schools-and-public-buildings', icon: ShieldAlert, desc: 'A visibly held weapon on an entrance or lobby camera, raised as critical with a clip for a person to verify.', image: '/feature-weapons-detection-1.webp' },
      { title: 'Violence detection in emergency departments', href: '/use-cases/violence-detection-in-emergency-departments', icon: Users, desc: 'An assault at the triage window raised to the security desk while it is happening, with the clip to verify.', image: '/feature-aggression-and-fight-detection-1.webp' },
      { title: 'Fire and smoke detection for high-rise buildings', href: '/use-cases/fire-and-smoke-detection-for-high-rise-buildings', icon: Building2, desc: 'Visual flame and smoke in corridors, stairs and garages, beside the fire alarm and never instead of it.', image: '/feature-fire-and-smoke-detection-1.webp' },
      { title: 'Fire exit and escape route monitoring', href: '/use-cases/fire-exit-and-escape-route-monitoring', icon: DoorOpen, desc: 'Every exit a checklist item on every round, and the pallet left in the route caught between rounds.', image: '/feature-abandoned-object-detection-1.webp' },
      { title: 'Occupancy limits for venues and public spaces', href: '/use-cases/occupancy-limits-for-venues-and-public-spaces', icon: Gauge, desc: 'A live count per room against the posted occupant load, with the frame at each time; the door stays with a person.', image: '/feature-occupancy-and-peak-hour-trends-1.webp' },
      { title: 'Car theft and vandalism in parking facilities', href: '/use-cases/car-theft-and-vandalism-in-parking-facilities', icon: CarFront, desc: 'Zones on the aisles, tripwires on the ramps and an after-hours round for garages, dealership lots and car parks.', image: '/parking-lot-surveillance.webp' },
      { title: 'Fire lane and emergency access enforcement', href: '/use-cases/fire-lane-and-emergency-access-enforcement', icon: Siren, desc: 'A vehicle stopped in a fire lane, ambulance bay or loading zone past the grace period, with the frame and the time.', image: '/feature-illegal-parking-detection-1.webp' },
      { title: 'Cloud video backup against DVR and NVR theft', href: '/use-cases/cloud-video-backup-against-dvr-theft', icon: CloudUpload, desc: 'Footage stored off site as it is captured, so a stolen, smashed or unplugged recorder takes no evidence with it.', image: '/product-video-backup-light.jpg' },
      { title: 'One live wall for every camera brand and site', href: '/use-cases/one-live-wall-for-every-brand-and-location', icon: LayoutGrid, desc: 'Every ONVIF or RTSP camera from every site on one wall grouped by site, in place of a login per recorder.', image: '/product-live-streaming-light.jpg' },
      { title: 'Tracking one person across cameras', href: '/use-cases/tracking-one-person-across-cameras', icon: Route, desc: 'Describe a person, find every appearance, and order the cameras into one timeline. Not face recognition.', image: '/feature-cross-camera-journey-map-1.webp' },
      { title: 'Virtual patrolling for compliance evidence', href: '/use-cases/virtual-patrolling-for-compliance-evidence', icon: FileCheck, desc: 'Rounds that produce the record a regulator, insurer or contract asks for: item, time, frame, person notified.', image: '/guard-tour-verification.webp' },
      { title: 'Tailgating detection for data centers and lobbies', href: '/use-cases/tailgating-detection-for-data-centers-and-secure-entrances', icon: Fingerprint, desc: 'The badge log shows one entry; the door camera counts two, records the frame and tells a person.', image: '/feature-tailgating-detection-1.webp' },
    ],
  },
];

export default function UseCasesHub() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Use Cases", description: pageMeta.description, path: "/use-cases" })]} breadcrumbs={[{ label: 'Use Cases' }]}>
      <FeatureHero
        eyebrow="Use cases"
        title="Twenty-one situations, one set of rounds"
        lede={<>
          <strong className="font-semibold text-foreground">
            A use case is a situation a security manager is responsible for, and the checklist,
            detections and notifications that cover it.
          </strong>{' '}
          Every scenario here runs on the same account and the same cameras. What changes is what
          the round asks at each stop, which detections watch between rounds, and who is told when
          a check fails. Each page says what applies, shows the checklist, and says where it stops.
        </>}
        facts={['Same cameras, same account', 'A checklist per scenario', 'Honest about what it will not do']}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/virtual-patrolling', label: 'How virtual patrolling works' }}
        visual={
          <SectionVisual
            variant="checklist"
            label="CAM 02 · Perimeter, north fence"
            guard="Rahul K."
            items={[['Fence line clear', 'ok'], ['Gate closed and latched', 'ok'], ['No person in the yard', 'fail'], ['Camera view unobstructed', 'pending']]}
            caption="What a round checks is the use case. The same four states apply everywhere: Compliant, Not Compliant, Pending, and fixed."
            alt="A perimeter patrol checklist with four items in different states"
          />
        }
      />

      {groups.map((g) => (
        <section key={g.title} className="pb-16">
          <div className="mx-auto max-w-site px-6">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">{g.eyebrow}</span>
              <h2 className="mt-2 font-display text-2xl font-bold">{g.title}</h2>
              <p className="mt-3 max-w-prose text-muted-foreground">{g.desc}</p>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((uc, i) => (
                <ScrollReveal key={uc.href} delay={i * 0.05}>
                  <Link href={uc.href} className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                    <div className="aspect-video w-full overflow-hidden">
                      <SiteImage src={uc.image} alt={`${uc.title}: illustration`} className="h-full w-full object-cover object-top" width={1229} height={692} priority={g.eyebrow === '01' && i === 0} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-bold group-hover:text-primary">{uc.title}</h3>
                        <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5"><uc.icon className="h-5 w-5 text-primary" aria-hidden="true" /></div>
                      </div>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{uc.desc}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-8">
                <h2 className="font-display text-xl font-bold">Looking for an industry instead?</h2>
                <p className="mt-3 text-muted-foreground">The industry pages start from the site type, warehouses, construction, retail and thirteen more, and pick the use cases that fit it.</p>
                <Link href="/industries" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Browse industries <span aria-hidden="true">→</span></Link>
              </div>
              <div className="rounded-xl border border-border bg-card p-8">
                <h2 className="font-display text-xl font-bold">Or the detection itself?</h2>
                <p className="mt-3 text-muted-foreground">Every use case names the detections it uses. Each has its own page: what it fires on, how it is tuned per camera, and what it does not detect.</p>
                <Link href="/ai-features" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">All 22 detections <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
