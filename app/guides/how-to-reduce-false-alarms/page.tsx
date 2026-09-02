import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How to Reduce False Alarms | Security Camera Guide",
  description: "Reduce false alarms from security cameras with AI detection, proper zone configuration, and object-based tracking. Practical steps.",
  path: "/guides/how-to-reduce-false-alarms",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function HowToReduceFalseAlarmsPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "How to Reduce False Alarms", description: "Reduce false alarms from security cameras with AI detection, proper zone configuration, and object-based tracking. Practical steps.", path: "/guides/how-to-reduce-false-alarms", datePublished: '2026-08-31', dateModified: '2026-08-31' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'How to Reduce False Alarms from Security Cameras' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to Reduce False Alarms from Security Cameras</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">False alarms in video surveillance are alerts triggered by non-threatening events — shadows, animals, weather, lighting changes, or camera vibration. They are the primary failure mode of security camera systems, causing operators to ignore genuine alerts and undermining the value of the entire deployment.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why false alarms happen</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Traditional motion detection responds to pixel changes in the video frame. Everything that moves pixels triggers an alert: headlights sweeping across a wall, trees swaying in wind, rain, shadows, and camera vibration. The system cannot distinguish between a person and a plastic bag.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The object-tracking approach</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `AI video analytics like Camzify use object detection and <a href="/ai-features/multi-object-tracking">multi-object tracking</a> to identify specific subjects — people, vehicles — and track them across frames. Alerts fire only when a confirmed object violates a defined rule. This eliminates the vast majority of false alarms caused by environmental factors.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Zone and line configuration</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Properly configured <a href="/ai-features/zone-intrusion-detection">zones</a> and <a href="/ai-features/line-intrusion-detection">lines</a> focus detection on areas that matter. Instead of monitoring the entire frame, you define specific boundaries with directional rules and schedules. This further reduces irrelevant alerts.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Schedule-based detection</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Not every alert is relevant at every time. A person in the parking lot at 2pm is normal; at 2am it is a security event. Schedule-based activation means detections fire only during the hours when they matter, reducing daytime noise while maintaining full overnight <a href="/virtual-patrolling">virtual patrol</a> coverage.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Camera placement and maintenance</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Physical factors contribute to false alarms: camera vibration from wind or HVAC, insects on the lens, vegetation growing into the field of view, and reflective surfaces. <a href="/ai-features/camera-tampering-detection">Camera tampering detection</a> identifies some of these conditions automatically.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/how-to-choose-video-analytics-software" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How To Choose Video Analytics Software</Link>
              <Link href="/guides/onvif-and-rtsp-explained" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Onvif And Rtsp Explained</Link>
              <Link href="/guides/security-audit-checklist" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Audit Checklist</Link>
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
