import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Moon, KeyRound, UserX, Paintbrush, ShoppingBag, Truck, ParkingCircle, Radio, Car, MoonStar, ClipboardCheck, Search } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Use Cases | AI Video Surveillance Solutions",
  description: "Explore how Camzify addresses real security challenges — from perimeter protection and after-hours monitoring to theft prevention and guard tour verification.",
  path: "/use-cases",
};

export const metadata = generatePageMeta({ ...pageMeta });

const useCases = [
  { title: 'Perimeter Security', href: '/use-cases/perimeter-security', icon: Shield, desc: 'Detect intrusions at fence lines, gates, and boundaries 24/7.', image: '/ai-perimeter-security.jpg' },
  { title: 'After-Hours Monitoring', href: '/use-cases/after-hours-monitoring', icon: Moon, desc: 'Automated patrol rounds when the building is empty.', image: '/after-hours-security-monitoring.jpg' },
  { title: 'Unauthorized Access Detection', href: '/use-cases/unauthorized-access-detection', icon: KeyRound, desc: 'Zone-based alerts for restricted areas.', image: '/unauthorized-access-detection.jpg' },
  { title: 'Trespassing Detection', href: '/use-cases/trespassing-detection', icon: UserX, desc: 'Immediate alerts when unauthorized persons enter your property.', image: '/trespassing-detection.jpg' },
  { title: 'Vandalism Prevention', href: '/use-cases/vandalism-prevention', icon: Paintbrush, desc: 'Early detection of suspicious activity near vulnerable assets.', image: '/vandalism-prevention.jpg' },
  { title: 'Theft Prevention', href: '/use-cases/theft-prevention', icon: ShoppingBag, desc: 'Zone monitoring of high-value areas with real-time alerts.', image: '/ai-theft-detection.jpg' },
  { title: 'Loading Dock Monitoring', href: '/use-cases/loading-dock-monitoring', icon: Truck, desc: 'Verify dock door status and detect unauthorized dock activity.', image: '/loading-dock-security.jpg' },
  { title: 'Parking Lot Surveillance', href: '/use-cases/parking-lot-surveillance', icon: ParkingCircle, desc: 'Detect unauthorized vehicles and after-hours presence.', image: '/parking-lot-surveillance.jpg' },
  { title: 'Remote Site Monitoring', href: '/use-cases/remote-site-monitoring', icon: Radio, desc: '24/7 coverage for unmanned and distributed facilities.', image: '/remote-site-monitoring.jpg' },
  { title: 'Vehicle Monitoring', href: '/use-cases/vehicle-monitoring', icon: Car, desc: 'Track vehicle presence and movement in defined areas.', image: '/vehicle-monitoring.jpg' },
  { title: 'Night Security', href: '/use-cases/night-security', icon: MoonStar, desc: 'Continuous overnight patrol rounds without additional guard shifts.', image: '/night-security.jpg' },
  { title: 'Guard Tour Verification', href: '/use-cases/guard-tour-verification', icon: ClipboardCheck, desc: 'Verify that patrol rounds were completed and conditions were checked.', image: '/guard-tour-verification.jpg' },
  { title: 'Incident Investigation', href: '/use-cases/incident-investigation', icon: Search, desc: 'Timestamped AI detections and patrol logs for faster investigations.', image: '/incident-investigation.jpg' },
];

export default function UseCasesHub() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "Use Cases", description: "Explore how Camzify addresses real security challenges — from perimeter protection and after-hours monitoring to theft prevention and guard tour verification.", path: "/use-cases" })]} breadcrumbs={[{ label: 'Use Cases' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Use Cases</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Every security environment has unique challenges. Camzify addresses them with the same core capabilities — <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a>, AI detection, and structured compliance reporting — configured for each scenario.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <ScrollReveal key={uc.href} delay={i * 0.05}>
                <Link href={uc.href} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200 hover:bg-accent/50">
                  <div className="aspect-video w-full overflow-hidden p-4 pb-0">
                    <Image
              src={uc.image}
                      alt={`${uc.title} preview`}
                      className="h-full w-full rounded-lg object-cover object-top"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="font-display text-lg font-bold">{uc.title}</h2>
                      <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5">
                        <uc.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{uc.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
