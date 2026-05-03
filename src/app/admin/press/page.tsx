import { getPress } from "@/lib/admin-data";
import { PageHeader, DataTable, ModeBadge, fmtDate, type Column } from "@/components/admin/data-table";

export const dynamic = "force-dynamic";
type Row = Awaited<ReturnType<typeof getPress>>["rows"][number];

export default async function PressAdmin() {
  const { rows, mode } = await getPress();
  const cols: Column<Row>[] = [
    { key: "createdAt", label: "When", render: (r) => <span className="font-mono text-xs">{fmtDate(r.createdAt)}</span> },
    { key: "fullName", label: "Reporter", render: (r) => <><div className="font-medium">{r.fullName}</div><div className="text-xs text-[var(--color-ink)]/55">{r.email}</div><div className="text-xs text-[var(--color-ink)]/55">{r.phone}</div></> },
    { key: "outlet", label: "Outlet" },
    { key: "notes", label: "Notes", render: (r) => r.notes ? <span className="line-clamp-3 max-w-[320px] text-xs">{r.notes}</span> : <span className="text-[var(--color-ink)]/40">—</span> },
    { key: "status", label: "Status", render: (r) => <span className="rounded-[2px] border border-[var(--color-line-strong)] px-2 py-0.5 text-[10px] uppercase">{r.status}</span> },
  ];
  return (
    <>
      <PageHeader title="Press accreditations" subtitle={`${rows.length} requests.`} action={<ModeBadge mode={mode} />} />
      <DataTable rows={rows} columns={cols} empty="No accreditations yet." />
    </>
  );
}
