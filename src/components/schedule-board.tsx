"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MATCHES, type Match } from "@/lib/data";
import { CATEGORIES, VENUES } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

const DAYS: Array<{ k: Match["day"]; label: string; date: string }> = [
  { k: "thu", label: "Thu", date: "28.01" },
  { k: "fri", label: "Fri", date: "29.01" },
  { k: "sat", label: "Sat", date: "30.01" },
  { k: "sun", label: "Sun", date: "31.01" },
];

export function ScheduleBoard() {
  const t = useTranslations("schedule");
  const [day, setDay] = useState<Match["day"]>("thu");
  const [cat, setCat] = useState<string>("all");
  const [venue, setVenue] = useState<string>("all");

  const rows = useMemo(
    () =>
      MATCHES.filter((m) => m.day === day)
        .filter((m) => cat === "all" || m.category === cat)
        .filter((m) => venue === "all" || m.venue === venue),
    [day, cat, venue]
  );

  const liveMatch = MATCHES.find((m) => m.live);

  return (
    <section className="container-edge mx-auto py-16 md:py-24">
      {liveMatch ? (
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-accent)] bg-[var(--color-accent)]/8 px-5 py-3 text-sm">
          <span className="inline-flex items-center gap-2 text-[var(--color-accent)] font-mono text-xs uppercase tracking-[0.2em]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse-dot" /> {t("live")}
          </span>
          <span className="font-medium">{liveMatch.home} <span className="opacity-50">vs</span> {liveMatch.away}</span>
          <span className="text-[var(--color-ink)]/60">· {liveMatch.venue} · {liveMatch.category}</span>
        </div>
      ) : null}

      {/* day tabs */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-line-strong)] pb-4">
        <div className="flex gap-1 overflow-x-auto">
          {DAYS.map((d) => (
            <button
              key={d.k}
              onClick={() => setDay(d.k)}
              className={cn(
                "rounded-[var(--radius-sm)] px-5 py-3 text-left transition-colors",
                day === d.k
                  ? "bg-[var(--color-ink)] text-[var(--color-snow)]"
                  : "text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]"
              )}
            >
              <div className="font-display text-xl leading-none">{d.label}</div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.2em] opacity-75">{d.date}</div>
            </button>
          ))}
        </div>
        <a
          href="/schedule.pdf"
          className="group inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors"
        >
          <Download className="h-3.5 w-3.5" /> {t("download")}
        </a>
      </div>

      {/* filters */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <FilterSelect
          label={t("filterCategory")}
          value={cat}
          onChange={setCat}
          options={[{ v: "all", l: t("all") }, ...CATEGORIES.map((c) => ({ v: c.code, l: `${c.code} - ${c.label}` }))]}
        />
        <FilterSelect
          label={t("filterVenue")}
          value={venue}
          onChange={setVenue}
          options={[{ v: "all", l: t("all") }, ...VENUES.map((v) => ({ v: v.name, l: v.name }))]}
        />
      </div>

      {/* matches list */}
      <ul className="mt-10 divide-y divide-[var(--color-line-strong)] border-y border-[var(--color-line-strong)]">
        {rows.length === 0 ? (
          <li className="py-12 text-center text-[var(--color-ink)]/60">{t("empty")}</li>
        ) : (
          rows.map((m) => (
            <li key={m.id} className={cn("group grid grid-cols-12 items-center gap-3 px-2 py-5 transition-colors hover:bg-[var(--color-paper-warm)]", m.live && "bg-[var(--color-accent)]/8")}>
              <div className="col-span-2 font-mono text-xl tabular-nums">{m.time}</div>
              <div className="col-span-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink)]/60">{m.category}</div>
              <div className="col-span-5 font-display text-2xl tracking-tight">
                {m.home} <span className="px-2 text-[var(--color-ink)]/40">×</span> {m.away}
              </div>
              <div className="col-span-3 text-right text-sm text-[var(--color-ink)]/70">{m.venue}</div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

function FilterSelect({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: Array<{ v: string; l: string }> }) {
  return (
    <label className="block">
      <span className="text-eyebrow text-[var(--color-ink)]/55">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>{o.l}</option>
        ))}
      </select>
    </label>
  );
}
