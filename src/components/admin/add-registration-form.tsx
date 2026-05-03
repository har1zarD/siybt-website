"use client";

import { useState, useTransition } from "react";
import { Plus, X, Loader2, Check } from "lucide-react";
import { CATEGORIES } from "@/lib/utils";
import { createRegistration } from "@/app/admin/registrations/actions";

const HOTELS = [
  { id: "hills", label: "Hotel Hills" },
  { id: "malak", label: "Malak Regency" },
  { id: "hollywood", label: "Hotel Hollywood" },
  { id: "none", label: "Self-arranged" },
] as const;

export function AddRegistrationForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    clubName: "",
    city: "",
    country: "",
    contact: "",
    email: "",
    phone: "",
    categories: [] as string[],
    hotelChoice: "none" as "hills" | "malak" | "hollywood" | "none",
    rooms: 0,
    nights: 0,
    notes: "",
    status: "confirmed" as "pending" | "confirmed" | "rejected",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleCategory = (code: string) =>
    update(
      "categories",
      form.categories.includes(code) ? form.categories.filter((c) => c !== code) : [...form.categories, code]
    );

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const res = await createRegistration(form);
      if (res.ok) {
        setDone(true);
        setTimeout(() => {
          setOpen(false);
          setDone(false);
          setForm({
            clubName: "", city: "", country: "", contact: "", email: "", phone: "",
            categories: [], hotelChoice: "none", rooms: 0, nights: 0, notes: "", status: "confirmed",
          });
        }, 800);
      } else {
        setError(res.reason === "invalid" ? "Some fields are missing or invalid." : res.reason === "no-db" ? "DATABASE_URL not set." : "Failed.");
      }
    });
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-snow)] hover:bg-[var(--color-accent)] transition-colors"
      >
        <Plus className="h-3.5 w-3.5" /> Add team manually
      </button>
    );
  }

  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-2xl">Manually add a team</h3>
        <button onClick={() => setOpen(false)} className="text-[var(--color-ink)]/55 hover:text-[var(--color-ink)]">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Input label="Club name" value={form.clubName} onChange={(v) => update("clubName", v)} />
        <Input label="City" value={form.city} onChange={(v) => update("city", v)} />
        <Input label="Country" value={form.country} onChange={(v) => update("country", v)} />
        <Input label="Contact person" value={form.contact} onChange={(v) => update("contact", v)} />
        <Input label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
        <Input label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
      </div>

      <div className="mt-5">
        <div className="text-eyebrow text-[var(--color-ink)]/55 mb-2">Categories</div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => {
            const on = form.categories.includes(c.code);
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => toggleCategory(c.code)}
                className={`rounded-[2px] border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  on ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-snow)]" : "border-[var(--color-line-strong)] text-[var(--color-ink)]/70 hover:border-[var(--color-ink)]"
                }`}
              >
                {c.code}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div>
          <div className="text-eyebrow text-[var(--color-ink)]/55 mb-2">Hotel</div>
          <select
            value={form.hotelChoice}
            onChange={(e) => update("hotelChoice", e.target.value as typeof form.hotelChoice)}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-3 py-2 text-sm"
          >
            {HOTELS.map((h) => (
              <option key={h.id} value={h.id}>{h.label}</option>
            ))}
          </select>
        </div>
        {form.hotelChoice !== "none" && (
          <>
            <Input label="Rooms" type="number" value={String(form.rooms)} onChange={(v) => update("rooms", Number(v) || 0)} />
            <Input label="Nights" type="number" value={String(form.nights)} onChange={(v) => update("nights", Number(v) || 0)} />
          </>
        )}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div>
          <div className="text-eyebrow text-[var(--color-ink)]/55 mb-2">Status</div>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value as typeof form.status)}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-3 py-2 text-sm"
          >
            <option value="confirmed">confirmed</option>
            <option value="pending">pending</option>
            <option value="rejected">rejected</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <div className="text-eyebrow text-[var(--color-ink)]/55 mb-2">Notes</div>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={2}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-3 py-2 text-sm"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={submit}
          disabled={pending || done}
          className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-snow)] hover:bg-[var(--color-ink)] transition-colors disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : done ? <Check className="h-3.5 w-3.5" /> : null}
          {done ? "Added" : pending ? "Saving…" : "Save team"}
        </button>
        <button
          onClick={() => setOpen(false)}
          disabled={pending}
          className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)]/70 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-eyebrow text-[var(--color-ink)]/55">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-3 py-2 text-sm focus:border-[var(--color-accent)] outline-none"
      />
    </label>
  );
}
