import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureCard } from '@/components/content/feature-card';
import { Crosshair, Shield, Activity, Camera, Users, Brain } from 'lucide-react';

const detections = [
  { icon: <Crosshair className="h-5 w-5" />, title: 'Line Intrusion Detection', desc: 'Virtual tripwire with directional control. Fires on confirmed object tracks, not pixel motion.', href: '/ai-features/line-intrusion-detection' },
  { icon: <Shield className="h-5 w-5" />, title: 'Zone Intrusion Detection', desc: 'Polygonal restricted zones. Any confirmed object entering the zone triggers an alert.', href: '/ai-features/zone-intrusion-detection' },
  { icon: <Activity className="h-5 w-5" />, title: 'Motion Detection', desc: 'Background-subtraction detection that filters noise, lighting shifts and environmental change.', href: '/ai-features/motion-detection' },
  { icon: <Camera className="h-5 w-5" />, title: 'Camera Tampering Detection', desc: 'Five modes: defocus, physical coverage, scene change, brightness shift, frozen frames.', href: '/ai-features/camera-tampering-detection' },
  { icon: <Users className="h-5 w-5" />, title: 'Multi-Object Tracking', desc: 'Persistent track identity per subject. Survives brief occlusions and re-entries.', href: '/ai-features/multi-object-tracking' },
  { icon: <Brain className="h-5 w-5" />, title: 'AI Attribute Extraction', desc: 'A vision-language model reads the scene and attaches structured attributes — clothing, object type, behaviour.', href: '/ai-features/ai-attribute-extraction' },
];

export function DetectionGrid() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">AI Detection</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Six detection models, all shipping
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-body text-muted-foreground">
              Every detection fires on confirmed object tracks — not shadows, not lighting shifts,
              not camera noise. Each integrates directly into your virtual patrol rounds.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(detections ?? []).map((d: any, i: number) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <FeatureCard
                icon={d?.icon}
                title={d?.title ?? ''}
                description={d?.desc ?? ''}
                href={d?.href ?? '/'}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
