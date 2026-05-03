import Link from "next/link";
import { getOverview } from "@/lib/admin-data";
import { PageHeader, StatCard, DataTable, ModeBadge, fmtDate, type Column } from "@/components/admin/data-table";

export const dynamic = "force-dynamic";

type Reg = Awaited<ReturnType<typeof getOverview>>["recent"]["registrations"][number];
type Msg = Awaited<ReturnType<typeof getOverview>>["recent"]["contact"][number];

export default async function AdminHome() {
  const data = await getOverview();
  const regCols: Column<Reg>[] = [
    { key: "createdAt", label: "When", render: (r) => <span className="font-mono text-xs">{fmtDate(r.createdAt)}</span> },
    { key: "clubName", label: "Club", render: (r) => <span className="font-medium">{r.clubName}</span> },
    { key: "country", label: "Country" },
    { key: "categories", label: "Categories", render: (r) => <span className="font-mono text-xs">{r.categories.join(", ")}</span> },
    { key: "status", label: "Status", render: (r) => <span className="rounded-[2px] border border-[var(--color-line-strong)] px-2 py-0.5 text-[10px] uppercase">{r.status}</span> },
  ];
  const msgCols: Column<Msg>[] = [
    { key: "createdAt", label: "When", render: (m) => <span className="font-mono text-xs">{fmtDate(m.createdAt)}</span> },
    { key: "name", label: "From", render: (m) => <><div className="font-medium">{m.name}</div><div className="text-xs text-[var(--color-ink)]/55">{m.email}</div></> },
    { key: "subject", label: "Subject" },
    { key: "read", label: "Status", render: (m) => m.read ? "Read" : <span className="text-[var(--color-accent)]">New</span> },
  ];

  return (
    <>
      <PageHeader title="Overview" subtitle="Recent activity across registrations, contact messages, family bookings and press accreditations." action={<ModeBadge mode={data.mode} />} />
      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="Registrations" value={data.counts.registrations} sub={`of 70 capacity`} />
        <StatCard label="Contact" value={data.counts.contact} sub={`messages`} />
        <StatCard label="Family bookings" value={data.counts.family} />
        <StatCard label="Press" value={data.counts.press} sub={`accreditations`} />
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl tracking-tight">Recent registrations</h2>
          <Link href="/admin/registrations" className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)] hover:underline">View all →</Link>
        </div>
        <DataTable rows={data.recent.registrations} columns={regCols} empty="No registrations yet." />
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl tracking-tight">Recent contact messages</h2>
          <Link href="/admin/contact" className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)] hover:underline">View all →</Link>
        </div>
        <DataTable rows={data.recent.contact} columns={msgCols} empty="No messages yet." />
      </section>
    </>
  );
}
