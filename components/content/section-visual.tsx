import { Bell, CheckCircle, XCircle, AlertTriangle, Mail, MessageSquare, Smartphone, Clock, ArrowRight } from 'lucide-react';

/**
 * In-body illustrations for feature pages.
 *
 * Replaces the gray PlaceholderVisual boxes — an icon, the word VISUAL, a crimson tag —
 * that sat three-to-a-page across the virtual patrolling section. Those were honest
 * about being unfinished and made every page look it.
 *
 * Each variant is a small, static, design-system-styled rendering of the thing the
 * surrounding copy describes: a sequence rail, a checklist card, a report row with
 * its before-and-after frames, a guard message, a schedule. They are built from
 * tokens and the site's own synthesized frames, so nothing here is a mock-up of
 * footage or figures that exist nowhere else. Every one carries the same caption the
 * product screenshots do: illustration, not customer data.
 *
 * Server-rendered, no state, no motion beyond what the page's ScrollReveal adds.
 */
export type SectionVisualVariant =
  | 'route'
  | 'checklist'
  | 'report'
  | 'notification'
  | 'schedule'
  | 'flow'
  | 'compliance'
  | 'sites';

function Frame({ children, caption, alt }: { children: React.ReactNode; caption: string; alt: string }) {
  return (
    <figure role="img" aria-label={alt} className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        </span>
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">{caption}</span>
      </div>
      <div className="p-5">{children}</div>
      <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
        Interface illustration with sample data, not customer records.
      </figcaption>
    </figure>
  );
}

const stops = [
  { id: 'CAM 01', loc: 'Main gate', frame: '/cam-06.jpg', items: 2 },
  { id: 'CAM 04', loc: 'Loading dock', frame: '/cam-02.jpg', items: 2 },
  { id: 'CAM 09', loc: 'Server corridor', frame: '/cam-03.jpg', items: 2 },
  { id: 'CAM 02', loc: 'Parking lot A', frame: '/cam-04.jpg', items: 1 },
];

function Route() {
  return (
    <ol className="relative space-y-3">
      <span aria-hidden="true" className="absolute left-[19px] top-4 bottom-4 w-px bg-border" />
      {stops.map((s, i) => (
        <li key={s.id} className="relative flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card font-mono text-sm text-primary tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <img src={s.frame} alt="" aria-hidden="true" width={96} height={54} loading="lazy" className="h-9 w-16 shrink-0 rounded-md border border-border object-cover sm:h-12 sm:w-[84px]" />
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-mono-sm uppercase text-muted-foreground">{s.id}</span>
            <span className="block truncate text-sm font-medium">{s.loc}</span>
          </span>
          <span className="shrink-0 font-mono text-mono-sm text-muted-foreground">{s.items}<span className="hidden sm:inline"> checks</span></span>
        </li>
      ))}
    </ol>
  );
}

function Checklist() {
  const rows: [string, 'ok' | 'fail' | 'pending'][] = [
    ['Gate fully closed', 'ok'],
    ['No tailgating observed', 'ok'],
    ['Dock door secured', 'fail'],
    ['Corridor clear of obstructions', 'pending'],
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">CAM 04 · Loading dock</span>
        <span className="font-mono text-mono-sm text-muted-foreground">Guard: Priya R.</span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {rows.map(([label, state]) => (
          <li
            key={label}
            className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm ${
              state === 'ok' ? 'border-live/30 bg-live/5' : state === 'fail' ? 'border-critical/30 bg-critical/5' : 'border-warn/40 bg-warn/5'
            }`}
          >
            <span className="min-w-0 pr-2">{label}</span>
            <span className={`flex shrink-0 items-center gap-1.5 font-mono text-mono-sm uppercase ${state === 'ok' ? 'text-live' : state === 'fail' ? 'text-critical' : 'text-warn'}`}>
              {state === 'ok' ? <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" /> : state === 'fail' ? <XCircle className="h-3.5 w-3.5" aria-hidden="true" /> : <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />}
              {state === 'ok' ? 'Compliant' : state === 'fail' ? 'Not compliant' : 'Pending'}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">A failed item is resolved as Fixed or Pending before the round can close.</p>
    </div>
  );
}

function Report() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-live font-display text-lg font-bold text-live">80%</span>
        <div className="min-w-0 flex-1">
          <span className="block font-display text-base font-bold">Perimeter round · Manual</span>
          <span className="block text-xs text-muted-foreground">5 items · 1 site · 3 cameras</span>
          <span className="mt-1.5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-live/15 px-2 py-0.5 text-[11px] font-medium text-live">4 compliant / fixed</span>
            <span className="rounded-full bg-warn/15 px-2 py-0.5 text-[11px] font-medium text-warn">1 pending</span>
          </span>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-border bg-muted/20 p-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium">Gate fully closed</span>
          <span className="font-mono text-mono-sm uppercase text-live">Fixed &amp; verified</span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {[['/cam-06.jpg', 'Before'], ['/cam-06-after.jpg', 'After']].map(([src, cap]) => (
            <figure key={cap} className="w-[calc(50%-4px)] sm:w-28">
              <img src={src} alt="" aria-hidden="true" width={112} height={63} loading="lazy" className="h-[63px] w-full rounded-md border border-border object-cover" />
              <figcaption className="mt-1 text-center font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{cap}</figcaption>
            </figure>
          ))}
          <p className="w-full text-xs leading-relaxed text-muted-foreground sm:min-w-0 sm:w-auto sm:flex-1 sm:self-center">
            Guard message sent. Re-checked and closed with the second frame attached.
          </p>
        </div>
      </div>
    </div>
  );
}

function Notification() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-critical/30 bg-critical/5 p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-mono-sm uppercase text-critical">
            <Bell className="h-3.5 w-3.5" aria-hidden="true" /> Not compliant
          </span>
          <span className="font-mono text-mono-sm text-muted-foreground">CAM 04 · Loading dock</span>
        </div>
        <p className="mt-2.5 text-sm">&ldquo;Dock door left unsecured after delivery &mdash; confirm and lock.&rdquo;</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">To Priya R. · assigned guard</span>
          <span className="flex gap-2 text-muted-foreground" aria-label="Delivery channels: email, SMS, WhatsApp, push">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm">
        <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-live" aria-hidden="true" /> Acknowledged</span>
        <span className="font-mono text-mono-sm text-muted-foreground">Logged to the round&rsquo;s report</span>
      </div>
      <p className="text-xs text-muted-foreground">Unacknowledged alerts escalate to the backup contact after the configured window.</p>
    </div>
  );
}

function Schedule() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-display text-base font-bold">Perimeter round</span>
        <span className="rounded-full bg-live/15 px-2.5 py-0.5 font-mono text-mono-sm uppercase text-live">Auto-patrol on</span>
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-muted/20 p-3">
          <dt className="font-mono text-mono-sm uppercase text-muted-foreground">Frequency</dt>
          <dd className="mt-1 font-medium">Every 2 hours</dd>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-3">
          <dt className="font-mono text-mono-sm uppercase text-muted-foreground">Active hours</dt>
          <dd className="mt-1 font-medium">19:00 &ndash; 07:00</dd>
        </div>
      </dl>
      <div>
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">Active days</span>
        <div className="mt-2 flex gap-1.5">
          {days.map((d, i) => (
            <span key={d} className={`flex-1 rounded-md border py-1.5 text-center font-mono text-[11px] ${i < 5 ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>{d}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-border pt-3 text-muted-foreground">
        <Clock className="h-4 w-4" aria-hidden="true" />
        <span className="text-xs">Scene observation: watch for 2 s per stop · next round on schedule, site timezone</span>
      </div>
    </div>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-4">
      {steps.slice(0, 4).map((s, i) => (
        <li key={s} className="relative rounded-lg border border-border bg-muted/20 p-3">
          <span className="font-mono text-mono-sm text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
          <span className="mt-1.5 block text-sm leading-snug">{s}</span>
          {i < 3 && <ArrowRight aria-hidden="true" className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground sm:block" />}
        </li>
      ))}
    </ol>
  );
}

function Compliance() {
  const week: ('done' | 'flag' | 'over')[] = ['done', 'done', 'flag', 'done', 'done', 'over', 'done'];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-base font-bold">Rounds this week</span>
        <span className="font-mono text-mono-sm text-muted-foreground">Perimeter round · 4 sites</span>
      </div>
      <div className="mt-4 flex items-end gap-2">
        {week.map((s, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <span className={`w-full rounded-md ${s === 'done' ? 'h-14 bg-live/70' : s === 'flag' ? 'h-14 bg-warn/70' : 'h-6 bg-critical/60'}`} />
            <span className="font-mono text-[10px] text-muted-foreground">{days[i]}</span>
          </div>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-mono-sm uppercase text-muted-foreground">
        <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-live/70" aria-hidden="true" /> Completed</li>
        <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-warn/70" aria-hidden="true" /> Flagged</li>
        <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-critical/60" aria-hidden="true" /> Overdue</li>
      </ul>
    </div>
  );
}

function Sites() {
  const rows = [
    ['Warehouse — Sector 4', '5/5', 'live'],
    ['HQ Campus', '4/4', 'live'],
    ['Retail — Downtown', '3/4', 'warn'],
    ['Distribution — North', '2/2', 'live'],
  ] as const;
  return (
    <ul className="space-y-2">
      {rows.map(([name, cams, tone]) => (
        <li key={name} className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3.5 py-2.5 text-sm">
          <span className="flex items-center gap-2.5">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${tone === 'live' ? 'bg-live' : 'bg-warn'}`} />
            {name}
          </span>
          <span className="font-mono text-mono-sm text-muted-foreground">{cams} cameras online</span>
        </li>
      ))}
      <li className="pt-1 text-xs text-muted-foreground">Each site runs its own sequences, schedule and guard roster on one account.</li>
    </ul>
  );
}

export function SectionVisual({
  variant,
  caption,
  alt,
  steps,
  className = '',
}: {
  variant: SectionVisualVariant;
  caption: string;
  alt: string;
  /** For the `flow` variant: up to four short step labels. */
  steps?: string[];
  className?: string;
}) {
  const body =
    variant === 'route' ? <Route /> :
    variant === 'checklist' ? <Checklist /> :
    variant === 'report' ? <Report /> :
    variant === 'notification' ? <Notification /> :
    variant === 'schedule' ? <Schedule /> :
    variant === 'compliance' ? <Compliance /> :
    variant === 'sites' ? <Sites /> :
    <Flow steps={steps ?? ['Round starts', 'Stop evaluated', 'Failure notified', 'Report filed']} />;

  return (
    <div className={className}>
      <Frame caption={caption} alt={alt}>{body}</Frame>
    </div>
  );
}
