"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";

const SPONSORS = [
  "BH Telecom", "Argeta", "Sarajevo Osiguranje", "Raiffeisen", "ASA",
  "BBI", "Klas", "Bingo", "M:tel", "Sarajevo Tax-Free",
  "Hotel Hills", "FIBA Europe", "Avaz", "Klix", "Federalna",
];

export function SponsorsStrip() {
  const t = useTranslations("sponsorsSection");
  return (
    <section className="relative bg-[var(--color-paper)] py-24 md:py-32">
      <div className="container-edge mx-auto">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <div className="text-eyebrow text-[var(--color-accent)]">{t("eyebrow")}</div>
            </Reveal>
            <h2 className="mt-6 text-big text-[var(--color-ink)]">{t("title")}</h2>
          </div>
          <div className="md:col-span-5 text-[var(--color-ink)]/65 text-lg leading-relaxed">{t("pitch")}</div>
        </div>
      </div>

      <div className="mt-14 border-y border-[var(--color-line-strong)] py-8">
        <Marquee items={SPONSORS} speed="slow" />
      </div>
    </section>
  );
}
