"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { TEAMS } from "@/lib/data";
import { CATEGORIES, COUNTRIES } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Search } from "lucide-react";
import { NumberTicker } from "./number-ticker";
import { cn } from "@/lib/utils";

export function TeamsBoard() {
  const t = useTranslations("teams");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [country, setCountry] = useState<string>("all");

  const rows = useMemo(
    () =>
      TEAMS.filter((tm) => (cat === "all" || tm.category === cat))
        .filter((tm) => (country === "all" || tm.country === country))
        .filter((tm) => tm.name.toLowerCase().includes(query.toLowerCase()) || tm.city.toLowerCase().includes(query.toLowerCase())),
    [query, cat, country]
  );

  return (
    <section className="container-edge mx-auto py-16 md:py-24">
      {/* counter */}
      <div className="grid gap-6 border-b border-[var(--color-line-strong)] pb-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-mono text-7xl tabular-nums leading-none">
              <NumberTicker value={TEAMS.length} />
            </span>
            <span className="font-mono text-3xl text-[var(--color-ink)]/55 tabular-nums">{t("of")} 70</span>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="h-2 w-full overflow-hidden rounded-[2px] bg-[var(--color-line-strong)]">
            <div
              className="h-full bg-[var(--color-accent)]"
              style={{ width: `${(TEAMS.length / 70) * 100}%` }}
            />
          </div>
          <Link href="/register" className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-5 py-3 text-[11px] uppercase tracking-[0.18em] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors">
            {t("submit")} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* filters */}
      <div className="mt-10 grid gap-3 md:grid-cols-12">
        <label className="md:col-span-5 relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink)]/40" />
          <input
            type="search"
            placeholder={t("search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] py-3 pl-9 pr-4 text-sm focus:border-[var(--color-accent)] outline-none"
          />
        </label>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="md:col-span-3 rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] px-3 py-3 text-sm">
          <option value="all">{t("filterCategory")}</option>
          {CATEGORIES.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
        </select>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="md:col-span-4 rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] px-3 py-3 text-sm">
          <option value="all">{t("filterCountry")}</option>
          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* grid */}
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {rows.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[var(--color-ink)]/55">{t("empty")}</div>
        ) : (
          rows.map((tm, i) => (
            <article
              key={`${tm.name}-${i}`}
              className={cn(
                "group rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-6 transition-all hover:-translate-y-1.5"
              )}
            >
              <div className="flex items-center justify-between text-eyebrow text-[var(--color-ink)]/55">
                <span>{tm.category}</span>
                <span className="rounded-[2px] border border-[var(--color-line-strong)] px-2 py-0.5 text-[9px]">{tm.country}</span>
              </div>
              <h3 className="mt-6 font-display text-3xl tracking-tight">{tm.name}</h3>
              <div className="mt-2 text-sm text-[var(--color-ink)]/55">{tm.city}</div>
              <span className="mt-6 block h-px w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-12" />
            </article>
          ))
        )}
      </div>
    </section>
  );
}
