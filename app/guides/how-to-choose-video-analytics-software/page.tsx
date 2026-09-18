import { generatePageMeta } from '@/lib/page-utils';
import { PhotoFigure } from '@/components/content/photo-figure';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * A buyer's checklist of questions, each with what a good answer looks like. The
 * good answers describe the property to look for, not a product; Camzify appears once,
 * as an example under camera compatibility, and nowhere else in the body.
 */
const pageMeta = {
  title: "How to Choose Video Analytics Software | Guide",
  description: "A practical guide to evaluating AI video analytics software, what to look for, what to avoid, and how to make the right decision for your facility.",
  path: "/guides/how-to-choose-video-analytics-software",
};

const publishedTime = '2026-08-31';
const modifiedTime = '2026-09-18';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'What should I test before buying?', answer: 'Three things on your own cameras: whether a detection fires on a tracked object rather than pixel motion, whether the notification reaches the right person with the frame attached, and whether the record afterwards would satisfy an insurer. Book a demo on real cameras rather than watching a reel.' },
  { question: 'Cloud or on-premise?', answer: 'Cloud if you have several sites, no appetite for a server per site, or want footage that survives a stolen recorder. On-premise if a site has no usable connectivity. The cloud versus on-premise comparison sets out the trade-offs honestly.' },
  { question: 'How many detections do I actually need?', answer: 'Fewer than the catalog. Most sites start with intrusion on the perimeter, zones on the areas that should be empty, and camera tampering everywhere, then add by camera. Licensing per camera instance rewards that discipline.' },
  { question: 'What should I be skeptical of?', answer: 'Detection rates quoted without your cameras, response times quoted without your network, and certifications named without a certificate. Camzify publishes none of those figures and says so on the trust page.' },
  { question: 'Should the vendor sell cameras as well as software?', answer: 'Only if you want to replace your cameras. A vendor whose analytics run only on its own hardware is selling a camera refresh with software attached, and the refresh is usually the largest line in the quote. A vendor whose software runs on any ONVIF or RTSP camera has no such line, and it leaves the cameras yours if you later change software.' },
  { question: 'How long should an evaluation take?', answer: 'Long enough to see the system through a full weekly cycle on your own cameras: the quiet nights, the busy deliveries, the weekend when nobody is on site. A demonstration shows what the product can do; a trial on your cameras shows what it does on your site, including how many alerts it raises and whether the right person acts on them. Judge it on the second.' },
  { question: 'Does a certification matter when choosing?', answer: 'It matters when your own policy or your client requires it, and then the vendor must hold the certificate rather than be working toward it. Ask for the certificate, the scope and the date. A vendor that states plainly which certifications it holds and which are in progress is giving you something to check; a vendor that lists logos without dates is not.' },
];

export default function HowToChooseVideoAnalyticsSoftwarePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "How to Choose Video Analytics Software", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'How to Choose Video Analytics Software' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to choose video analytics software</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Choosing video analytics software means selecting the system that will watch your cameras, decide what counts as an event, and tell the right person, on the cameras you already own and on terms you can leave. The choice turns on nine questions: camera compatibility, where the analytics run, how false alarms are handled, who controls retention, how the license is counted, whether every site runs on one account, where alerts go, what happens when you leave, and how evidence is exported.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            This guide takes those questions one at a time and says what a good answer looks like for each, so that a demonstration can be judged against a list rather than an impression. It describes properties to look for, not products. The one exception is a single example under camera compatibility, marked as such.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-how-to-choose-video-analytics-software.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What should you decide before you talk to a vendor?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Decide what the system must do at which cameras before you see any product, because the answer decides which of the questions below carry weight. A perimeter problem needs line and zone intrusion on a handful of cameras and little else; a compliance problem needs a scheduled check with a record; an investigation problem needs search across recorded video.
                </p>
                <p>
                  Write the requirement per camera, not per site; the list that results is the one the vendor should price and demonstrate against.
                </p>
              </div>
              <PointList items={[
                <>Which cameras must raise an alert, on what event, at what hours, and to whom.</>,
                <>Which points must be confirmed on a schedule, such as a door closed after hours or a corridor clear, and what record of the check is needed.</>,
                <>Which cameras must be recorded, for how many days, and who may play them back.</>,
                <>How many sites there are now, how many there will be, and whether any client or department must be kept separate from the others.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Will it work with the cameras you already own?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer is that the software connects to any ONVIF or RTSP camera, accepts RTMP and HTTPS streams as well, and reaches cameras on a private network through a relay that needs no port forwarding. A poor answer is a list of supported camera brands, or a requirement to buy the vendor&rsquo;s own cameras, because either one turns a software purchase into a camera refresh.
                </p>
                <p>
                  Ask the question with your camera list in hand and ask for a connection test on three of them, including the oldest. Camzify is one example of the open model: it connects ONVIF, RTSP, RTMP and HTTPS cameras, and cameras on a private network reach it through the{' '}
                  <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>, an application on a local PC that relays the streams without exposing the cameras to the internet. The protocols themselves are explained in{' '}
                  <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF and RTSP explained</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where do the analytics run?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer says plainly whether detection runs in the cloud, on a server at your site, or on the camera itself, and what each choice asks of your network and your staff. Cloud analytics need upstream bandwidth for every camera streamed and no server; on-premise analytics need a server per site and someone to maintain it; on-camera analytics are limited to what the camera&rsquo;s own processor can do.
                </p>
                <p>
                  A vendor that will not say where the processing happens is hiding a dependency you will meet later. The trade-offs are set out on the{' '}
                  <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud vs on-premise comparison</Link>. Note that a scheduled capability such as{' '}
                  <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>{' '}
                  needs the cameras online to the service that runs the round, so a site without usable connectivity cannot run one.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does it handle false alarms?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer explains the mechanism rather than quoting a rate: detection fires on a confirmed object track, not on pixel change, and each camera has its own zones, its own notification window and its own severity, so an alert that is wrong can be tuned at the camera that raised it. A poor answer is a percentage measured on someone else&rsquo;s cameras, or a claim of zero false alarms, which no honest vendor makes.
                </p>
                <p>
                  Ask to see the same detection on your own cameras at night, in rain, and with headlights sweeping the scene, and ask what an operator does to stop a recurring wrong alert without switching the detection off.{' '}
                  <Link href="/guides/how-to-reduce-false-alarms" className="text-primary hover:underline">How to reduce false alarms</Link>{' '}
                  covers the tuning a buyer should expect to do in the first month.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Who controls retention?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer is that retention is set per camera, in days or as a storage cap, enforced by automatic deletion, and can be longer on the cameras that matter than on the rest. A poor answer is one retention period for the whole account, or a period fixed by the plan tier rather than by you, because a retention policy the system cannot enforce is not a policy.
                </p>
                <p>
                  Ask how retention is set, whether a whole site can take one setting, and what the account shows about storage consumed against storage held.{' '}
                  <Link href="/guides/video-retention-requirements" className="text-primary hover:underline">Video retention requirements</Link>{' '}
                  explains how to choose the number per camera.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How is the license counted?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer counts the license per camera for the stream, per detection enabled on that camera, and per unit of storage, so that a camera which needs nothing but recording costs the stream and nothing more. A poor answer is one price per camera that includes every detection whether or not it is used, or a site license that charges a second building as if it were the first.
                </p>
                <p>
                  Ask for the quote on your camera list with the detections written against each camera, on the term you intend to sign. What drives the figure is explained in{' '}
                  <Link href="/guides/ai-video-analytics-cost" className="text-primary hover:underline">AI video analytics cost</Link>, and the{' '}
                  <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>{' '}
                  sets it against what the routine rounds cost you today.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Does every site run on one account?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer is that every site sits on one account and one login, that a user can be scoped to their own sites and cameras and nothing else, and that a sub-user can be given a share of the license and can ask for more. A poor answer is one login per site, or a separate account per client, because that is how a company ends up with a recorder and a password in every building and no view across them.
                </p>
                <p>
                  This question matters most to security agencies and monitoring companies, for whom each client must be a separate sub-user with a report of its own.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where do alerts go?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer is that each alert reaches a named person over the channel they actually read, email, SMS, WhatsApp or push, with the frame attached, and that the system records who acknowledged it and when. A poor answer is a dashboard someone is expected to watch, or a single email address for everything, because an alert nobody owns is an alert nobody acts on.
                </p>
                <p>
                  Ask how routing is set per alert category and per site, how severity is set per camera, what happens when an alert is not acknowledged, and whether the acknowledgment trail can be produced afterwards.{' '}
                  <Link href="/guides/how-to-manage-security-alerts" className="text-primary hover:underline">How to manage security alerts</Link>{' '}
                  describes the queue a buyer should expect to run.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What happens when you leave?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer is that the cameras keep working with any other software because they were never tied to this one, that footage and reports can be exported in standard formats before the account closes, and that the term, the notice period and what happens to data at the end are written in the contract. A poor answer is a vendor that has not thought about it, or one whose cameras only speak to its own service.
                </p>
                <p>
                  Ask before you sign, because the answer is the difference between a subscription and a lock-in.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Can you export evidence?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A good answer is that a clip can be exported from any camera for any time inside the retention window, that a scheduled check produces a report with the frame behind every result, and that the report opens as a PDF an insurer, a client or a court can take as it is. A poor answer is a screenshot of a dashboard, or a report that lists results without the picture they were judged from.
                </p>
                <p>
                  Ask to export a clip and a report during the demonstration, on your cameras. The time on the frame should be correct, the camera should be named, and the result should be traceable to the person or the round that produced it.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How should you run the evaluation?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Run the evaluation on your own cameras, against the per-camera list you wrote at the start, and score each of the nine questions on what you saw rather than what you were told. A vendor that will not connect to your cameras before you sign has answered the first question already. Two vendors that both match on compatibility, false alarms and retention are then compared on license, alerting and exit terms, which is where the difference in cost of ownership usually sits.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-intelligent-video-analytics" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Intelligent Video Analytics?</Link>
              <Link href="/guides/ai-video-analytics-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">AI Video Analytics Cost</Link>
              <Link href="/guides/how-to-reduce-false-alarms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How to Reduce False Alarms</Link>
              <Link href="/guides/onvif-and-rtsp-explained" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">ONVIF and RTSP Explained</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
