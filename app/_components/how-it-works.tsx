import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ProductShot } from '@/components/content/product-shot';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';

/**
 * How it works — a four-step sequence.
 *
 * Numbering is meaningful here: the steps happen in this order and each depends on the
 * one before, which is the only case where numbered markers earn their place. Three of
 * the four steps carry the console screen where that step actually happens, so the
 * section shows the product rather than describing it.
 *
 * Rows alternate side on wide viewports, which is what breaks the uniform card rhythm
 * the rest of the page had.
 */
const steps = [
  {
    title: 'Connect the cameras you already have',
    desc: 'Any ONVIF or RTSP camera connects directly. RTMP, HLS and WebRTC are supported too, and cameras on a private network relay through the Camzify Connector with no port forwarding. Sites and cameras are grouped as you organise them operationally.',
    shot: '/product-configuration.jpg',
    alt: 'Camzify configuration screen showing four sites with per-site camera counts and seven-day event trends',
    label: 'Configuration · Camzify console',
  },
  {
    title: 'Build the patrol sequence',
    desc: 'Set the camera order for the round, write the checklist each camera is checked against, and name the guard responsible for each stop. Then choose the frequency, the active hours and the active days.',
    shot: '/product-virtual-patrolling.jpg',
    alt: 'Camzify patrol sequence configuration showing auto-patrol frequency, active hours, active days and reporting settings',
    label: 'Patrol setup · Camzify console',
  },
  {
    title: 'The AI runs the round',
    desc: 'On schedule or on demand, Camzify steps through every camera in the sequence, evaluates each checklist item against what the camera can see, and records a result per item. It does not skip stops and it does not get tired at 04:00.',
    shot: null,
    alt: '',
    label: '',
  },
  {
    title: 'Failures reach the person responsible',
    desc: 'Any non-compliant item notifies the guard assigned to that camera with a message explaining what was found. The completed round is emailed as a PDF with every check, the compliance percentage, and who was notified.',
    shot: '/product-notifications.jpg',
    alt: 'Camzify notifications screen showing a critical acknowledgement banner, severity breakdown and per-event detail',
    label: 'Notifications · Camzify console',
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <SectionAtmosphere variant="center" intensity="subtle" />
      <div className="relative z-10 mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">How it works</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Four steps from cameras to a compliance record
            </h2>
          </div>
        </ScrollReveal>

        <ol className="mt-14 space-y-14 lg:space-y-16">
          {steps.map((step, i) => {
            const imageFirst = i % 2 === 1;
            return (
            <li key={step.title}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <ScrollReveal className={imageFirst ? 'lg:order-2' : ''}>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-sm font-medium text-primary tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-gradient-to-r from-primary/40 via-border to-transparent"
                      />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-prose text-body leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>

                {step.shot ? (
                  <ScrollReveal delay={0.08} className={imageFirst ? 'lg:order-1' : ''}>
                    <ProductShot src={step.shot} alt={step.alt} label={step.label} />
                  </ScrollReveal>
                ) : (
                  <ScrollReveal delay={0.08} className={imageFirst ? 'lg:order-1' : ''}>
                    <div className="console-panel corner-ticks p-8">
                      <span className="font-mono text-mono-sm uppercase text-muted-foreground">
                        Round in progress
                      </span>
                      <ul className="mt-6 space-y-3.5">
                        {[
                          ['CAM 01 · Main gate', 'Gate closed', true],
                          ['CAM 01 · Main gate', 'No tailgating observed', true],
                          ['CAM 02 · Loading dock', 'Bay clear', true],
                          ['CAM 03 · Server room', 'Door secured', false],
                          ['CAM 04 · Perimeter east', 'Fence line unbreached', true],
                        ].map(([cam, check, ok], n) => (
                          <li key={n} className="flex items-start justify-between gap-4 text-sm">
                            <span>
                              <span className="block font-mono text-mono-sm uppercase text-muted-foreground">
                                {cam as string}
                              </span>
                              <span className="mt-0.5 block">{check as string}</span>
                            </span>
                            <span
                              className={`mt-1 flex-shrink-0 font-mono text-mono-sm uppercase ${
                                ok ? 'text-live' : 'text-critical'
                              }`}
                            >
                              {ok ? 'Compliant' : 'Not compliant'}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 border-t border-border pt-4 font-mono text-mono-sm uppercase text-muted-foreground">
                        Round score · 4 of 5 · 80% compliant
                      </p>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
