'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export interface DetectionCardData {
  cameraId: string;
  zone: string;
  timestamp: string;
  detection: string;
  confidence: string;
  guard?: string;
  status: 'live' | 'warn' | 'critical';
}

const statusConfig = {
  live: { color: 'text-live', bg: 'bg-live', icon: CheckCircle, label: 'LIVE' },
  warn: { color: 'text-warn', bg: 'bg-warn', icon: AlertTriangle, label: 'WARNING' },
  critical: { color: 'text-critical', bg: 'bg-critical', icon: AlertTriangle, label: 'CRITICAL' },
};

export function DetectionCard({ data, index = 0 }: { data: DetectionCardData; index?: number }) {
  const config = statusConfig[data?.status ?? 'live'] ?? statusConfig.live;
  const Icon = config?.icon ?? CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.22, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-block h-2 w-2 rounded-full ${config?.bg ?? ''} animate-pulse-dot`} />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">
            {data?.cameraId ?? 'CAM 01'}
          </span>
        </div>
        <span className={`font-mono text-mono-sm uppercase ${config?.color ?? ''}`}>
          {config?.label ?? ''}
        </span>
      </div>
      <div className="mt-2">
        <span className="font-mono text-mono-sm text-muted-foreground">
          {data?.zone ?? 'ZONE A'}
        </span>
        <span className="mx-2 text-muted-foreground/40">·</span>
        <span className="font-mono text-mono-sm text-muted-foreground">
          <Clock className="mr-1 inline h-3 w-3" />
          {data?.timestamp ?? '00:00:00'}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium">{data?.detection ?? ''}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-mono-sm text-muted-foreground">
          CONFIDENCE: {data?.confidence ?? 'N/A'}
        </span>
        {data?.guard && (
          <span className="font-mono text-mono-sm text-muted-foreground">
            GUARD: {data.guard}
          </span>
        )}
      </div>
    </motion.div>
  );
}
