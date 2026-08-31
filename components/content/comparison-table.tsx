'use client';

import { Check, X, Minus } from 'lucide-react';

export interface ComparisonRow {
  feature?: string;
  label?: string;
  camzify?: boolean | string;
  competitor?: boolean | string;
  traditional?: boolean | string;
  values?: (boolean | string)[];
}

function CellValue({ value }: { value: boolean | string | undefined }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-live" />
    ) : (
      <X className="mx-auto h-5 w-5 text-critical" />
    );
  }
  if (value === '-') return <Minus className="mx-auto h-4 w-4 text-muted-foreground" />;
  return <span className="text-sm">{value ?? ''}</span>;
}

export function ComparisonTable({
  rows,
  columns = ['Feature', 'Camzify', 'Manned Guards', 'Traditional CCTV'],
}: {
  rows: ComparisonRow[];
  columns?: string[];
}) {
  const hasValues = (rows ?? [])?.[0]?.values !== undefined;

  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {(columns ?? []).map((col: string, i: number) => (
              <th
                key={i}
                className={`px-5 py-3 font-display font-bold ${i === 1 ? 'text-primary' : ''}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((row: ComparisonRow, i: number) => {
            const featureLabel = row?.feature ?? row?.label ?? '';
            const cells = hasValues
              ? (row?.values ?? [])
              : [row?.camzify, row?.competitor, row?.traditional].filter((_, idx) => idx < (columns?.length ?? 4) - 1);

            return (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-5 py-4 font-medium">{featureLabel}</td>
                {cells.map((val: any, j: number) => (
                  <td key={j} className={`px-5 py-4 ${j === 0 ? 'bg-primary/5' : ''}`}>
                    <CellValue value={val} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
