import { type ReactNode } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  empty = "No data yet.",
}: {
  rows: T[];
  columns: Column<T>[];
  empty?: string;
}) {
  if (!rows.length) {
    return (
      <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-line-strong)] bg-[var(--color-snow)] p-16 text-center text-sm text-[var(--color-ink)]/55">
        {empty}
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-line-strong)] bg-[var(--color-paper)] text-left text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)]/65">
            {columns.map((c) => (
              <th key={String(c.key)} className={`px-4 py-3 font-mono font-medium ${c.className ?? ""}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-[var(--color-line)] last:border-0 align-top hover:bg-[var(--color-paper)]/50">
              {columns.map((c) => (
                <td key={String(c.key)} className={`px-4 py-3 ${c.className ?? ""}`}>
                  {c.render ? c.render(r) : (r as Record<string, unknown>)[c.key as string] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)]/55">{label}</div>
      <div className="mt-3 font-mono text-4xl tabular-nums">{value}</div>
      {sub ? <div className="mt-2 text-xs text-[var(--color-ink)]/55">{sub}</div> : null}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--color-line-strong)] pb-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">Admin</div>
        <h1 className="mt-2 font-display text-4xl tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-[var(--color-ink)]/65">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ModeBadge({ mode }: { mode: "live" | "sample" }) {
  if (mode === "live") {
    return <span className="inline-block rounded-[2px] bg-[var(--color-ink)] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--color-snow)]">Live DB</span>;
  }
  return <span className="inline-block rounded-[2px] bg-[var(--color-accent)] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--color-snow)]">Sample data — set DATABASE_URL</span>;
}

export function fmtDate(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" });
}
