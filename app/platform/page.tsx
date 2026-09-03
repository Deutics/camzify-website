import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { SectionVisual } from '@/components/content/section-visual';
import { SiteImage } from '@/components/content/site-image';
import Link from 'next/link';
import {
  LayoutDashboard, Video, HardDrive, Bell, BarChart3, Users, Layers, Globe, Smartphone, Brain, Lock, ArrowRight,
} from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Video Management Platform | Cloud VMS Modules",
  description: "The Camzify platform on one login: live streaming, cloud video backup and retention, alerts, analytics, user management, permission groups, license control and multi-site management — with AI detection and virtual patrolling built in.",
  path: "/platform",
};

export const metadata = generatePageMeta({ ...pageMeta });

/**
 * Modules grouped by the job they do rather than listed flat. A buyer evaluating a
 * VMS asks three questions in order — can I see and keep the video, will it tell me
 * when something happens, can I run it across sites and people — and the groups
 * answer them in that order. Each group heading is an h2, which the previous flat
 * grid did not have at all.
 */
const groups = [
  {
    heading: 'See and keep the video',
    blurb: 'The video management core: what is live, what is recorded, and for how long.',
    modules: [
      { icon: LayoutDashboard, title: 'Dashboard', href: '/platform/dashboard', desc: 'Cameras online, criticals open, alerts today, patrol compliance and retention coverage on one screen.', image: '/Video-Surveillance-Dashboard.jpg' },
      { icon: Video, title: 'Live streaming', href: '/platform/live-streaming', desc: 'A multi-camera wall grouped by site, saved camera sets, explicit offline states, PTZ where supported.', image: '/live-camera-streaming.jpg' },
      { icon: HardDrive, title: 'Video backup & retention', href: '/platform/video-backup-and-retention', desc: 'Continuous or scheduled recording, retention per camera by days or storage cap, playback and export.', image: '/cloud-video-backup-and-retention-management.jpg' },
      { icon: Smartphone, title: 'Mobile access', href: '/platform/mobile-access', desc: 'Live streams, alerts and patrol compliance from any phone or tablet browser, nothing to install.', image: '/mobile-access.jpg' },
    ],
  },
  {
    heading: 'Know when something happens',
    blurb: 'Detection turned into something a person can act on, and a record that they did.',
    modules: [
      { icon: Bell, title: 'Notifications & alerts', href: '/platform/notifications-and-alerts', desc: 'One queue by severity, site, camera or feature; acknowledgment, escalation and linked backup video.', image: '/security-alert-management.jpg' },
      { icon: BarChart3, title: 'Analytics & reporting', href: '/platform/analytics-and-reporting', desc: 'Detection trends over time, attribute breakdowns and confidence splits, per site and per feature.', image: '/video-surveillance-analytics-and-reporting.jpg' },
      { icon: Brain, title: 'AI architecture', href: '/platform/ai-architecture', desc: 'Six processing layers from detection to adaptive inference, tuned independently per camera.', image: '/ai-video-analytics-architecture.jpg' },
    ],
  },
  {
    heading: 'Run it across people and sites',
    blurb: 'Delegation without losing control: who can see what, and how much of the license they hold.',
    modules: [
      { icon: Users, title: 'User management', href: '/platform/user-management', desc: 'Sub-users who can create their own, site-scoped access, quota allocated from your license and requested back.', image: '/security-system-user-management.jpg' },
      { icon: Lock, title: 'Permission groups', href: '/platform/permission-groups', desc: 'Page-level access combined with create, read, update and delete rights per resource, one group per user.', image: '/permission-group.jpg' },
      { icon: Layers, title: 'License & instances', href: '/platform/license-and-instance-management', desc: 'What is activated, what is granted to sub-accounts and what remains available, per feature.', image: '/license-and-instance-management.jpg' },
      { icon: Globe, title: 'Multi-site management', href: '/platform/multi-site-management', desc: 'Every site set up independently and read from one console, folded together or held separate.', image: '/multi-site-video-surveillance.jpg' },
    ],
  },
];

const faqs = [
  { question: 'Is the Camzify platform a cloud VMS or an on-premise one?', answer: 'Cloud. There is no server or NVR to install: cameras stream to the platform, footage is stored in the cloud under a retention window set per camera, and every module is used from a browser. The only on-site software is the optional Camzify Connector, a small application for a Windows, macOS or Linux machine that relays cameras on a private network without port forwarding.' },
  { question: 'Are all of these modules included, or licensed separately?', answer: 'The platform modules — dashboard, live streaming, backup, notifications, analytics, users, permissions, license and multi-site — are one product on one login. What is licensed per camera is the AI: each detection feature has a pool of instances in your plan, activating a feature on a camera consumes one, and virtual patrolling instances are counted per camera per sequence. Plan and Usage shows exactly what is activated, granted and still available.' },
  { question: 'Can one account run several clients or sites separately?', answer: 'Yes. Sites are the unit everything is organized around, and a sub-user can be scoped to their own sites and cameras and nothing else, with a permission group deciding what they can open and change. License quota is allocated to them from yours, and a request for more comes back to you to approve. Sub-users can create their own sub-users on the same model, which is what makes it work for security agencies and managed service providers.' },
  { question: 'Where is footage stored, and who can reach it?', answer: 'In the cloud, encrypted at rest with AES-256 and in transit over TLS 1.2 or higher, under a per-camera retention window. Access follows the same permission groups as the rest of the platform, so a user who cannot open a camera cannot open its recordings either, and every action on the account is written to an audit trail the account holder can review.' },
  { question: 'Are the screenshots on these pages the real product?', answer: 'Yes. The console screens shown across the platform pages are captured from the application in both its light and dark themes and swap with the theme you are viewing the site in. Figures inside them are interface illustrations with sample sites and cameras rather than customer data, and every one says so in its caption.' },
  { question: 'Does the platform work on a phone?', answer: 'Yes, through the browser already on the phone — live streams, alerts and patrol compliance in a responsive interface with nothing to install, which is what makes it usable by a relief guard on their own device on their first shift. Native iOS and Android apps are in development and listed on the roadmap; the browser interface stays available after they ship.' },
];

export default function PlatformPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Platform' }]}>
      <FeatureHero
        eyebrow="The platform"
        title="One console for the whole video operation"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              The Camzify platform is an AI-powered cloud video management system: live streaming,
              cloud backup and retention, alerts, analytics, user and license management and
              multi-site control on one login
            </strong>{' '}
            &mdash; with 22 detection models and{' '}
            <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>{' '}
            built in rather than bolted on. Every module below is shipping and reachable from the
            same dashboard.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/platform/dashboard', label: 'Start with the dashboard' }}
        facts={['Eleven modules, one login', 'Cloud, no NVR to install', 'Real screens, both themes']}
        visual={
          <ProductShot
            src="/product-dashboard"
            alt="Camzify dashboard showing cameras live, critical events open, alerts today, patrol compliance, a live detection events chart and per-site health"
            label="Dashboard · Camzify console"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      {/* How the modules fit together — before the grid, so the grid reads as a system */}
      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">How it fits</span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Four things a camera feed becomes</h2>
                <p className="mt-5 max-w-prose text-body text-muted-foreground">
                  A stream arrives, it is watched and kept, detection turns it into events, a person
                  is told and acts, and the platform keeps the record of all of it. The modules are the
                  stages of that one pipeline, not eleven separate tools.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <SectionVisual
                variant="flow"
                caption="From camera to record"
                alt="Flow showing a camera stream being watched and recorded, detections raised, a person notified, and the record kept"
                steps={['Streamed live and recorded', 'Detections and patrol checks', 'A named person notified', 'Logged, scored, retained']}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Modules, grouped by job */}
      {groups.map((g, gi) => (
        <section key={g.heading} className={`py-16 sm:py-20 ${gi % 2 === 1 ? 'border-t border-border bg-muted/20' : ''}`}>
          <div className="mx-auto max-w-site px-6">
            <ScrollReveal>
              <div className="max-w-3xl">
                <span className="font-mono text-mono-sm uppercase text-primary">{String(gi + 1).padStart(2, '0')}</span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">{g.heading}</h2>
                <p className="mt-3 max-w-prose text-muted-foreground">{g.blurb}</p>
              </div>
            </ScrollReveal>
            <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${g.modules.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {g.modules.map((m, i) => {
                const Icon = m.icon;
                return (
                  <ScrollReveal key={m.href} delay={i * 0.05}>
                    <Link
                      href={m.href}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="aspect-video w-full overflow-hidden border-b border-border bg-muted/30">
                        <SiteImage
                          src={m.image}
                          alt={`${m.title} screen preview`}
                          className="h-full w-full object-cover object-top transition-transform duration-slow group-hover:scale-[1.02]"
                          width={1229}
                          height={692}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{m.title}</h3>
                          <span className="rounded-lg bg-primary/10 p-2"><Icon className="h-4 w-4 text-primary" aria-hidden="true" /></span>
                        </div>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity duration-normal group-hover:opacity-100">
                          Open module <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* The two things that are not modules but sit on top of every one */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { title: '22 AI detection models', desc: 'Every detection fires on a confirmed object track and lands in the same alert queue — intrusion, tampering, weapons, fire, PPE, and behavior you describe in plain language.', href: '/ai-features', label: 'AI features' },
              { title: 'Virtual patrolling', desc: 'Scheduled rounds with a checklist per camera, before-and-after evidence on anything fixed, and a compliance report every time. The capability no other cloud VMS has.', href: '/virtual-patrolling', label: 'Virtual patrolling' },
            ].map((c) => (
              <ScrollReveal key={c.href}>
                <Link href={c.href} className="group flex h-full flex-col rounded-xl border border-primary/30 bg-card p-8 shadow-lg shadow-primary/5 transition-all duration-normal hover:-translate-y-1 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <h2 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">{c.title}</h2>
                  <p className="mt-3 flex-1 max-w-prose text-body text-muted-foreground">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">{c.label} <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Common questions</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">The platform, answered</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="mt-10 max-w-3xl"><FAQAccordion items={faqs} /></div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  );
}
