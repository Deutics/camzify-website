import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { LiveStreamingMockup } from '@/components/mockups/live-streaming-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { LayoutGrid, Gauge, AlertOctagon, Filter } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Live Camera Streaming | Multi-Camera Live View",
  description: "Camzify live streaming: multi-camera grid grouped by site, slideshow mode, per-site and per-AI-feature filters, no-signal states. RTSP, RTMP and HTTPS.",
  path: "/platform/live-streaming",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How do I set up a live camera wall?', answer: 'Choose a grid size, group the cameras watched together into a saved camera set, mark one set as default so it loads first, and filter by site once the fleet grows. The step-by-step version is at /guides/how-to-monitor-live-camera-feeds.' },
  { question: 'What is the difference between a camera set and a patrol sequence?', answer: 'A camera set is a saved group of cameras for monitoring — you pick the cameras, save the set, and one set can be your default view when live streaming opens. A patrol sequence is an ordered list of camera stops with a checklist at each one, used for manual or automated patrol rounds. Same cameras, different purpose: a set is for watching, a sequence is for verifying.' },
  { question: 'How many cameras can I view at once?', answer: 'The grid paginates rather than cramming every camera onto one screen — a 30-camera account might show 8-9 per page across several pages, so each stream stays legible. Slideshow mode cycles through pages automatically if you\'d rather not click through manually.' },
  { question: 'What\'s the difference between Low Latency and High Stability?', answer: 'Low Latency favors the freshest possible frame, which suits active monitoring where a second or two matters. High Stability buffers slightly more to smooth over network jitter, which suits a wall display or a site with a less reliable connection — same stream, different tradeoff.' },
  { question: 'What happens when a whole site goes offline?', answer: 'Every camera at that site shows a no-signal state and the site is flagged in the site strip and with a banner at the top of the grid, so it\'s obvious at a glance that the gap is a connectivity issue at one location rather than several unrelated camera failures.' },
  { question: 'Can I filter the grid by AI feature instead of by site?', answer: 'Yes. Filtering by AI feature (e.g. Weapons Detection) shows only the cameras that feature is actively running on — useful when you want to check coverage for one detection type rather than browse by location.' },
  { question: 'Can sub-users see cameras I haven\'t assigned to them?', answer: 'No. The "All Users" filter only shows cameras a given sub-user has been granted access to through their permission group — the live grid respects the same access boundaries as the rest of the platform.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Live Camera Streaming' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Multi-Camera Live View</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Live Camera Streaming</h1>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[2fr_3fr]">
            <p className="text-body text-muted-foreground">Camzify live streaming provides a multi-camera grid view grouped by site, with slideshow mode cycling between cameras at 5-second to 1-minute intervals. Filter by site, user, or AI feature. No-signal states display clearly rather than freezing on a stale frame. All streams run through the same four ingest paths — RTSP, RTMP, HLS, and WebRTC.</p>
            <SiteImage
              src="/live-camera-streaming.jpg"
              alt="A laptop showing the Camzify Live Streaming grid with retail camera feeds, a site-down banner for Parking Structure B, and the 23 live / 7 offline camera count"
              className="w-full"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-12">
            <LiveStreamingMockup />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: LayoutGrid, title: 'Grouped by site', desc: 'Cameras stay organized by location, with a per-site online count always visible in the grid strip.' },
              { icon: Gauge, title: 'Two playback modes', desc: 'Low Latency for active monitoring, High Stability for a steadier feed on a busier network.' },
              { icon: AlertOctagon, title: 'Clear no-signal states', desc: 'A dropped camera or a fully offline site shows as no-signal immediately — never a frozen last frame.' },
              { icon: Filter, title: 'Filter by feature or user', desc: 'Narrow the grid to cameras running a specific AI feature, or to what a given sub-user can see.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Everything In One Place</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Part of every patrol</h2>
                <p className="mt-4 text-muted-foreground">
                  This module integrates with <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> to
                  provide a complete operations picture. Patrol results, detection alerts, and platform status
                  all feed into the same console — so checking whether a camera is actually online doesn't
                  require jumping to a separate tool.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Slideshow mode is built for a wall display or a monitoring desk left running in the background:
                  set an interval and the grid cycles through pages on its own, no clicking required.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Ingest Paths</span>
                <div className="mt-4 space-y-3">
                  {[
                    { proto: 'RTSP', desc: 'Most IP cameras and NVRs' },
                    { proto: 'RTMP', desc: 'Encoders and streaming appliances' },
                    { proto: 'HTTPS', desc: 'Web-delivered HLS and WebRTC streams' },
                  ].map((p) => (
                    <div key={p.proto} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <span className="font-mono text-mono-sm text-primary">{p.proto}</span>
                      <span className="text-xs text-muted-foreground">{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/platform" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Platform Overview</Link>
              <Link href="/platform/dashboard" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Dashboard</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Book a Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
