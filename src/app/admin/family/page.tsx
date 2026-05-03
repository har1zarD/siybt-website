import { getFamily } from "@/lib/admin-data";
import { PageHeader, DataTable, ModeBadge, fmtDate, type Column } from "@/components/admin/data-table";

export const dynamic = "force-dynamic";
type Row = Awaited<ReturnType<typeof getFamily>>["rows"][number];

export default async function FamilyAdmin() {
  const { rows, mode } = await getFamily();
  const cols: Column<Row>[] = [
    { key: "createdAt", label: "When", render: (r) => <span className="font-mono text-xs">{fmtDate(r.createdAt)}</span> },
    { key: "fullName", label: "Parent", render: (r) => <><div className="font-medium">{r.fullName}</div><div className="text-xs text-[var(--color-ink)]/55">{r.email}</div><div className="text-xs text-[var(--color-ink)]/55">{r.phone}</div></> },
    { key: "club", label: "Club" },
    { key: "arrival", label: "Arrival", render: (r) => r.arrival ? <span className="font-mono text-xs">{fmtDate(r.arrival)}</span> : "-" },
    { key: "departure", label: "Departure", render: (r) => r.departure ? <span className="font-mono text-xs">{fmtDate(r.departure)}</span> : "-" },
    { key: "adults", label: "A / C", render: (r) => <span className="font-mono">{r.adults} / {r.children}</span> },
    { key: "skiAddon", label: "Ski", render: (r) => r.skiAddon ? "✓" : "-" },
    { key: "status", label: "Status", render: (r) => <span className="rounded-[2px] border border-[var(--color-line-strong)] px-2 py-0.5 text-[10px] uppercase">{r.status}</span> },
  ];
  return (
    <>
      <PageHeader title="Family bookings" subtitle={`${rows.length} requests.`} action={<ModeBadge mode={mode} />} />
      <DataTable rows={rows} columns={cols} empty="No family bookings yet." />
    </>
  );
}
