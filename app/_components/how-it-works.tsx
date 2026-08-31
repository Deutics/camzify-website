import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Wifi, Route, Cpu, Bell } from 'lucide-react';

const steps = [
  { icon: Wifi, title: 'Connect cameras', desc: 'RTSP, RTMP, HLS or WebRTC — any IP camera on your network connects in minutes.' },
  { icon: Route, title: 'Build a patrol sequence', desc: 'Set the camera order, assign per-camera checklists, and name the guard responsible for each.' },
  { icon: Cpu, title: 'AI runs the round', desc: 'On schedule or on demand — Camzify steps through each camera, evaluates every checklist item, and logs the result.' },
  { icon: Bell, title: 'Failures reach the guard', desc: 'Non-compliant items trigger a notification to the assigned guard. A PDF report lands in your inbox.' },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">How It Works</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Four steps from cameras to compliance
            </h2>
          </div>
        </ScrollReveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {(steps ?? []).map((step: any, i: number) => {
            const Icon = step?.icon ?? Wifi;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                  <div className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {i + 1}
                  </div>
                  <div className="rounded-lg bg-primary/10 p-2.5 inline-flex">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{step?.title ?? ''}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step?.desc ?? ''}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
