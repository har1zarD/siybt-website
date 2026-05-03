"use client";

import { useTranslations } from "next-intl";
import { COUNTRIES } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";

export function TeamsGlobe() {
  const t = useTranslations("globe");

  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-snow)] py-32 md:py-40 grain">
      <div className="container-edge mx-auto grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <div className="text-eyebrow text-[var(--color-accent)]">{t("eyebrow")}</div>
          </Reveal>
          <h2 className="mt-6 text-giant text-[var(--color-snow)]">{t("title")}</h2>
          <p className="mt-6 max-w-md text-[var(--color-snow)]/70 text-lg">{t("subtitle")}</p>
        </div>

        <div className="md:col-span-7 relative">
          <div className="aspect-square w-full max-w-[560px] mx-auto relative">
            <div className="absolute inset-0 rounded-full border border-white/15 animate-spin-slow" />
            <div className="absolute inset-[6%] rounded-full border border-white/10" />
            <div className="absolute inset-[14%] rounded-full border border-dashed border-white/10" />
            <div className="absolute inset-[26%] rounded-full bg-[var(--color-cold)]/30 backdrop-blur" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-snow)]/55">SARAJEVO</div>
                <div className="mt-1 font-display text-3xl text-[var(--color-accent)]">43°51′ N</div>
                <div className="font-display text-3xl text-[var(--color-accent)]">18°25′ E</div>
              </div>
            </div>
            {/* country pins arranged in a circle */}
            {COUNTRIES.slice(0, 14).map((c, i) => {
              const angle = (i / 14) * Math.PI * 2 - Math.PI / 2;
              const r = 46;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              return (
                <span
                  key={c}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x.toFixed(4)}%`, top: `${y.toFixed(4)}%` }}
                >
                  <span className="block h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_rgba(255,90,31,0.18)]" />
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-white/10 pt-8">
        <Marquee items={COUNTRIES} speed="slow" separator="·" />
      </div>
    </section>
  );
}
