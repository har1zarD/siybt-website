"use client";

import { useTransition } from "react";
import { Check, X, Trash2, RotateCcw, Loader2 } from "lucide-react";
import { updateRegistrationStatus, deleteRegistration, type RegStatus } from "@/app/admin/registrations/actions";

export function RegistrationRowActions({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  const set = (s: RegStatus) => {
    startTransition(async () => {
      await updateRegistrationStatus(id, s);
    });
  };

  const remove = () => {
    if (!confirm("Delete this registration permanently?")) return;
    startTransition(async () => {
      await deleteRegistration(id);
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--color-ink)]/55" />}
      {status !== "confirmed" && (
        <button
          onClick={() => set("confirmed")}
          disabled={pending}
          title="Accept"
          className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] transition-colors disabled:opacity-40"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      )}
      {status !== "rejected" && (
        <button
          onClick={() => set("rejected")}
          disabled={pending}
          title="Reject"
          className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors disabled:opacity-40"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
      {status !== "pending" && (
        <button
          onClick={() => set("pending")}
          disabled={pending}
          title="Reset to pending"
          className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] hover:border-[var(--color-ink)]/60 transition-colors disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
      )}
      <button
        onClick={remove}
        disabled={pending}
        title="Delete"
        className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] hover:border-red-500 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-40"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "border-[var(--color-line-strong)] text-[var(--color-ink)]/70 bg-[var(--color-paper)]",
    confirmed: "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10",
    rejected: "border-[var(--color-ink)] text-[var(--color-ink)] bg-[var(--color-ink)]/5",
  };
  const cls = map[status] ?? map.pending;
  return (
    <span className={`inline-flex items-center rounded-[2px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${cls}`}>
      {status}
    </span>
  );
}
