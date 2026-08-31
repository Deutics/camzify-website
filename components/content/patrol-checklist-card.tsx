'use client';

import { CheckCircle, XCircle, User } from 'lucide-react';

export interface ChecklistItem {
  label: string;
  status?: 'compliant' | 'not-compliant' | 'pending';
  guard?: string;
  guardMessage?: string;
}

export function PatrolChecklistCard({
  item,
  onCompliant,
  onNotCompliant,
}: {
  item: ChecklistItem;
  onCompliant?: () => void;
  onNotCompliant?: () => void;
}) {
  const status = item?.status ?? 'pending';

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 ${
        status === 'compliant'
          ? 'border-live/30 bg-live/5'
          : status === 'not-compliant'
          ? 'border-critical/30 bg-critical/5'
          : 'border-border bg-card'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{item?.label ?? ''}</span>
        {status !== 'pending' && (
          <span
            className={`font-mono text-mono-sm uppercase ${
              status === 'compliant' ? 'text-live' : 'text-critical'
            }`}
          >
            {status === 'compliant' ? 'COMPLIANT' : 'NOT COMPLIANT'}
          </span>
        )}
      </div>

      {status === 'pending' && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onCompliant?.()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-live/15 px-3 py-2 text-sm font-medium text-live transition-all hover:bg-live/25"
          >
            <CheckCircle className="h-4 w-4" />
            Compliant
          </button>
          <button
            onClick={() => onNotCompliant?.()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-critical/15 px-3 py-2 text-sm font-medium text-critical transition-all hover:bg-critical/25"
          >
            <XCircle className="h-4 w-4" />
            Not Compliant
          </button>
        </div>
      )}

      {item?.guard && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          {item.guard}
        </div>
      )}

      {status === 'not-compliant' && item?.guardMessage && (
        <div className="mt-2 rounded-md bg-critical/10 px-3 py-2 font-mono text-mono-sm text-critical">
          NOTIFICATION SENT: {item.guardMessage}
        </div>
      )}
    </div>
  );
}
