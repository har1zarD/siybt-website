"use client";

import { useTranslations } from "next-intl";
import { NumberTicker } from "@/components/number-ticker";
import { Reveal } from "@/components/reveal";

export function Stats() {
  const t = useTranslations("stats");
  const items: Array<{ k: "teams" | "athletes" | "countries" | "venues"; n: number }> = [
    { k: "teams", n: 70 },
    { k: "athletes", n: 840 },
    { k: "countries", n: 16 },
    { k: "venues", n: 6 },
  ];
  return (
    <section className="relative bg-[var(--color-ink)] text-[var(--color-snow)] py-24 md:py-32 grain">
      <div className="container-edge mx-auto grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
        {items.map(({ k, n }, i) => (
          <Reveal key={k} delay={i * 0.06}>
            <div className="bg-[var(--color-ink)] px-6 py-10 md:py-14">
              <div className="text-eyebrow text-[var(--color-accent)]">0{i + 1}</div>
              <div className="mt-6 font-mono text-6xl md:text-7xl tabular-nums tracking-tight leading-none">
                <NumberTicker value={n} />
              </div>
              <div className="mt-4 text-sm text-[var(--color-snow)]/65 tracking-wider uppercase">{t(k)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
