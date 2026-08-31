import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { articleSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How to Choose Video Analytics Software | Buyer Guide",
  description: "A practical guide to evaluating AI video analytics software — what to look for, what to avoid, and how to make the right decision for your facility.",
  path: "/guides/how-to-choose-video-analytics-software",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function HowToChooseVideoAnalyticsSoftwarePage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "How to Choose Video Analytics Software", description: "A practical guide to evaluating AI video analytics software — what to look for, what to avoid, and how to make the right decision for your facility.", path: "/guides/how-to-choose-video-analytics-software", datePublished: '2026-08-31', dateModified: '2026-08-31' })]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'How to Choose Video Analytics Software' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to Choose Video Analytics Software</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">Choosing video analytics software requires evaluating detection accuracy, camera compatibility, deployment model, total cost of ownership, and the specific capabilities your security program needs. This guide provides a practical framework for making that decision.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Start with the problem, not the technology</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Before evaluating vendors, define what you need the system to do. Common requirements: perimeter intrusion detection, after-hours monitoring, zone-based access control, patrol verification, and compliance reporting. Your requirements determine which capabilities matter most.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Detection accuracy and false alarm rate</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Ask every vendor: what is your false alarm rate for the detections I need? Request a proof of concept on your own cameras. False alarms are the primary reason video analytics deployments fail — if the system alerts too often on irrelevant events, operators stop paying attention. Camzify uses object-track-based detection rather than pixel-based motion to minimise false positives.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Camera compatibility</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Verify that the platform works with your existing cameras. Key protocols: ONVIF, RTSP, RTMP, HLS. If your cameras are on a local network without cloud access, confirm the vendor offers a relay solution. Camzify supports all four protocols plus the <a href="/camzify-connector">Camzify Connector</a> for local-only cameras.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Cloud vs on-premise</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Cloud deployments are simpler and cheaper to start. On-premise gives more control but requires IT infrastructure. See the <a href="/compare/cloud-vms-vs-on-premise">cloud vs on-premise comparison</a>. <a href="/virtual-patrolling">Virtual patrolling</a> is a cloud-native capability — it requires cloud connectivity to run automated patrols across your cameras.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Total cost of ownership</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Include: per-camera subscription or license, hardware (if on-premise), installation, internet bandwidth, storage, ongoing maintenance, and staff training. The <a href="/roi-calculator">ROI calculator</a> can model the comparison against your current security spend.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/ai-video-analytics-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Ai Video Analytics Cost</Link>
              <Link href="/guides/how-to-reduce-false-alarms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How To Reduce False Alarms</Link>
              <Link href="/guides/onvif-and-rtsp-explained" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Onvif And Rtsp Explained</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
