import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureCard } from '@/components/content/feature-card';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import {
  Crosshair, Shield, Activity, Camera, Users, Brain, Clock as ClockIcon, Eye,
  UserSearch, Route, DoorClosed, ShieldAlert, Swords, HardHat, Flame, PersonStanding,
  PackageX, Trash2, CircleParking, Navigation, CarFront, Thermometer, TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Detection Features | Video Analytics Suite",
  description: "20 live AI detection features. Intrusion, tailgating, weapons, PPE, fire and smoke, slip and fall, vehicle and parking, occupancy analytics, and more.",
  path: "/ai-features",
};

export const metadata = generatePageMeta({ ...pageMeta });

const liveDetections = [
  { icon: <Crosshair className="h-5 w-5" />, title: 'Line Intrusion Detection', desc: 'Virtual tripwire across any area with directional control. Fires on confirmed object tracks, not pixel motion.', href: '/ai-features/line-intrusion-detection' },
  { icon: <Shield className="h-5 w-5" />, title: 'Zone Intrusion Detection', desc: 'Polygonal restricted zones. Any confirmed object track entering triggers an alert regardless of entry direction.', href: '/ai-features/zone-intrusion-detection' },
  { icon: <Activity className="h-5 w-5" />, title: 'Motion Detection', desc: 'Background-subtraction detection that filters camera noise, lighting shifts, and environmental change.', href: '/ai-features/motion-detection' },
  { icon: <Camera className="h-5 w-5" />, title: 'Camera Tampering Detection', desc: 'Five modes: sudden defocus, physical coverage, rapid scene change, abnormal brightness shift, frozen frames.', href: '/ai-features/camera-tampering-detection' },
  { icon: <Users className="h-5 w-5" />, title: 'Multi-Object Tracking', desc: 'Persistent track identity per subject. Survives brief occlusions and re-entries with clean track histories.', href: '/ai-features/multi-object-tracking' },
  { icon: <Brain className="h-5 w-5" />, title: 'AI Attribute Extraction', desc: 'A vision-language model reads the scene and attaches structured attributes — clothing, object type, behaviour.', href: '/ai-features/ai-attribute-extraction' },
  { icon: <UserSearch className="h-5 w-5" />, title: 'AI Suspect Search', desc: 'Describe a person in plain language and retrieve every matching appearance across indexed cameras and time windows.', href: '/ai-features/forensic-video-search' },
  { icon: <Route className="h-5 w-5" />, title: 'Cross-Camera Journey Map', desc: 'One subject, one stitched timeline across every camera on-site — the full path, not isolated clips.', href: '/ai-features/cross-camera-journey-map' },
  { icon: <DoorClosed className="h-5 w-5" />, title: 'Tailgating Detection', desc: 'One badge, one person. Flags a second person entering on a single access credential.', href: '/ai-features/tailgating-detection' },
  { icon: <ShieldAlert className="h-5 w-5" />, title: 'Weapons Detection', desc: 'Visible weapons flagged the moment they enter frame, before a threat escalates.', href: '/ai-features/weapons-detection' },
  { icon: <Swords className="h-5 w-5" />, title: 'Aggression & Fight Detection', desc: 'Physical altercations flagged the moment they start, not after someone reviews the footage.', href: '/ai-features/aggression-and-fight-detection' },
  { icon: <HardHat className="h-5 w-5" />, title: 'PPE Violation Detection', desc: 'Missing helmets, vests, or gloves flagged automatically against your site’s required PPE policy.', href: '/ai-features/ppe-violation-detection' },
  { icon: <Flame className="h-5 w-5" />, title: 'Fire & Smoke Detection', desc: 'Visual smoke and flame spotted directly from camera feeds, often before a heat sensor would trigger.', href: '/ai-features/fire-and-smoke-detection' },
  { icon: <PersonStanding className="h-5 w-5" />, title: 'Slip & Fall Detection', desc: 'Falls detected in real time and routed to the nearest guard, before they become a liability claim.', href: '/ai-features/slip-and-fall-detection' },
  { icon: <PackageX className="h-5 w-5" />, title: 'Abandoned Object Detection', desc: 'Unattended bags and packages flagged the moment they’re left behind and stay unclaimed.', href: '/ai-features/abandoned-object-detection' },
  { icon: <Trash2 className="h-5 w-5" />, title: 'Littering Detection', desc: 'Items discarded outside designated bins caught the moment it happens, with a timestamped clip.', href: '/ai-features/littering-detection' },
  { icon: <CircleParking className="h-5 w-5" />, title: 'Illegal Parking Detection', desc: 'Vehicles blocking fire lanes, loading zones, or reserved spots flagged instantly.', href: '/ai-features/illegal-parking-detection' },
  { icon: <Navigation className="h-5 w-5" />, title: 'Wrong-Way Vehicle Detection', desc: 'Vehicles travelling against a defined direction of traffic alerted before a collision.', href: '/ai-features/wrong-way-vehicle-detection' },
  { icon: <CarFront className="h-5 w-5" />, title: 'Vehicle Damage Report', desc: 'Dents and scratches on vehicles entering or leaving a site, timestamped and logged automatically.', href: '/ai-features/vehicle-damage-report' },
  { icon: <Thermometer className="h-5 w-5" />, title: 'Heatmap Anomalies', desc: 'Foot traffic patterns mapped across a site and flagged when a pattern looks unusual.', href: '/ai-features/heatmap-anomalies' },
  { icon: <TrendingUp className="h-5 w-5" />, title: 'Occupancy & Peak Hour Trends', desc: 'Busiest hours and zones identified automatically from live camera counts, not guesswork.', href: '/ai-features/occupancy-and-peak-hour-trends' },
];

const roadmapDetections = [
  { icon: <ClockIcon className="h-5 w-5" />, title: 'Loitering Detection', desc: 'Configurable dwell-time threshold. Brief entries ignored, lingering subjects escalate. In development.', href: '/ai-features/loitering-detection' },
  { icon: <Eye className="h-5 w-5" />, title: 'Behavioral Anomaly Detection', desc: 'Describe the behaviour to watch for in plain language — fights, smoking, vandalism, trespassing — and it monitors for exactly that.', href: '/ai-features/behavioral-anomaly-detection' },
];

export default function DetectionHubPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'AI Features' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Detection Features</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify ships 20 AI detection features that run on your existing cameras. Each fires on confirmed
            object tracks — not shadows, not lighting shifts, not camera noise. Every detection integrates
            directly into <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> rounds.
          </p>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold">Live in production</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(liveDetections ?? []).map((d: any, i: number) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <FeatureCard icon={d?.icon} title={d?.title ?? ''} description={d?.desc ?? ''} href={d?.href ?? '/'} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">On the roadmap</h2>
            <p className="mt-2 text-muted-foreground">These features are in development or planned. They are not yet available in production.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(roadmapDetections ?? []).map((d: any, i: number) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <FeatureCard icon={d?.icon} title={d?.title ?? ''} description={d?.desc ?? ''} href={d?.href ?? '/'} isRoadmap />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
