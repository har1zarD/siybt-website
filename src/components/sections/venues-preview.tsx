"use client";

import { useTranslations } from "next-intl";
import { VENUES } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

export function VenuesPreview() {
  const t = useTranslations("venuesSection");
  const v = useTranslations("venuesPage");
  const c = useTranslations("common");

  return (
    <section className="relative bg-[var(--color-paper-warm)] py-32 md:py-40">
      <div className="container-edge mx-auto">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="text-eyebrow-soft text-[var(--color-accent)]/70">{t("eyebrow")}</div>
            <h2 className="mt-2 text-giant text-[var(--color-ink)]">{t("title")}</h2>
            <p className="mt-6 max-w-md text-[var(--color-ink)]/65 text-lg">{t("subtitle")}</p>
            <div className="mt-10">
              <Link
                href="/venues"
                className="group inline-flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors"
              >
                {c("viewAll")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-6">
            <ul className="divide-y divide-[var(--color-line-strong)] border-y border-[var(--color-line-strong)]">
              {VENUES.map((venue, i) => (
                <Reveal key={venue.name} delay={i * 0.04}>
                  <li className="group grid grid-cols-12 items-center gap-4 py-5">
                    <div className="col-span-1 font-mono text-xs text-[var(--color-ink)]/55">0{i + 1}</div>
                    <div className="col-span-7">
                      <div className="font-display text-2xl tracking-tight">{venue.name}</div>
                      <div className="mt-1 text-xs text-[var(--color-ink)]/55 uppercase tracking-wider">{venue.area}</div>
                    </div>
                    <div className="col-span-3 text-right font-mono text-sm tabular-nums">
                      {venue.capacity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <span className="text-xs text-[var(--color-ink)]/55">{v("capacity").toLowerCase()}</span>
                    </div>
                    <div className="col-span-1 text-right">
                      {venue.primary ? (
                        <span className="inline-block rounded-[2px] bg-[var(--color-accent)] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--color-snow)]">
                          {v("primary")}
                        </span>
                      ) : null}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
