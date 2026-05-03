import { getContact } from "@/lib/admin-data";
import { PageHeader, DataTable, ModeBadge, fmtDate, type Column } from "@/components/admin/data-table";

export const dynamic = "force-dynamic";
type Msg = Awaited<ReturnType<typeof getContact>>["rows"][number];

export default async function ContactPage() {
  const { rows, mode } = await getContact();
  const cols: Column<Msg>[] = [
    { key: "createdAt", label: "When", render: (m) => <span className="font-mono text-xs">{fmtDate(m.createdAt)}</span> },
    { key: "name", label: "From", render: (m) => <><div className="font-medium">{m.name}</div><div className="text-xs text-[var(--color-ink)]/55">{m.email}</div></> },
    { key: "subject", label: "Subject", render: (m) => <span className="font-medium">{m.subject}</span> },
    { key: "message", label: "Message", render: (m) => <span className="line-clamp-4 max-w-[460px] text-xs leading-relaxed">{m.message}</span> },
    { key: "read", label: "Status", render: (m) => m.read ? "Read" : <span className="text-[var(--color-accent)]">New</span> },
  ];
  return (
    <>
      <PageHeader title="Contact messages" subtitle={`${rows.length} total - newest first.`} action={<ModeBadge mode={mode} />} />
      <DataTable rows={rows} columns={cols} empty="No contact messages yet." />
    </>
  );
}
