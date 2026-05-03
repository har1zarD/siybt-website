import { getRegistrations } from "@/lib/admin-data";
import { PageHeader, DataTable, ModeBadge, fmtDate, type Column } from "@/components/admin/data-table";
import { RegistrationRowActions, StatusPill } from "@/components/admin/registration-row-actions";
import { AddRegistrationForm } from "@/components/admin/add-registration-form";

export const dynamic = "force-dynamic";

type Reg = Awaited<ReturnType<typeof getRegistrations>>["rows"][number];

export default async function RegistrationsPage() {
  const { rows, mode } = await getRegistrations();
  const cols: Column<Reg>[] = [
    { key: "createdAt", label: "When", render: (r) => <span className="font-mono text-xs">{fmtDate(r.createdAt)}</span> },
    { key: "clubName", label: "Club", render: (r) => <span className="font-medium">{r.clubName}</span> },
    { key: "city", label: "City" },
    { key: "country", label: "Country" },
    { key: "contact", label: "Contact", render: (r) => <><div>{r.contact}</div><div className="text-xs text-[var(--color-ink)]/55">{r.email}</div><div className="text-xs text-[var(--color-ink)]/55">{r.phone}</div></> },
    { key: "categories", label: "Categories", render: (r) => <span className="font-mono text-[11px]">{r.categories.join(", ")}</span> },
    { key: "rooms", label: "Stay", render: (r) => r.needsAccommodation ? <span className="font-mono text-xs">{r.hotelChoice ?? "-"}<br/>{r.rooms ?? 0} × {r.nights ?? 0}n</span> : <span className="text-[var(--color-ink)]/40">-</span> },
    { key: "notes", label: "Notes", render: (r) => r.notes ? <span className="line-clamp-3 max-w-[280px] text-xs">{r.notes}</span> : <span className="text-[var(--color-ink)]/40">-</span> },
    { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
    { key: "actions", label: "", render: (r) => mode === "live" ? <RegistrationRowActions id={r.id} status={r.status} /> : <span className="text-xs text-[var(--color-ink)]/40">-</span> },
  ];

  return (
    <>
      <PageHeader title="Registrations" subtitle={`${rows.length} of 70 slots used.`} action={<ModeBadge mode={mode} />} />
      <div className="mb-6">
        {mode === "live" ? (
          <AddRegistrationForm />
        ) : (
          <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-line-strong)] bg-[var(--color-snow)] p-4 text-xs text-[var(--color-ink)]/55">
            Manual add and status changes require <code className="font-mono">DATABASE_URL</code> to be set.
          </div>
        )}
      </div>
      <DataTable rows={rows} columns={cols} empty="No registrations yet." />
    </>
  );
}
