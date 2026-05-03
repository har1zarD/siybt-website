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
            <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slow" />
            <div className="absolute inset-[6%] rounded-full border border-white/15" />
            <div className="absolute inset-[14%] rounded-full border border-dashed border-white/15" />
            <div className="absolute inset-[24%] rounded-full bg-gradient-to-br from-[var(--color-cold)]/55 to-[var(--color-primary-deep)]/80 shadow-[0_0_80px_-10px_rgba(255,90,31,0.35)] backdrop-blur" />
            <div className="absolute inset-[24%] rounded-full border border-white/20" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-snow)]/70">SARAJEVO</div>
                <div className="mt-2 font-display text-3xl md:text-4xl text-[var(--color-accent)] leading-tight">43°51′ N</div>
                <div className="font-display text-3xl md:text-4xl text-[var(--color-accent)] leading-tight">18°25′ E</div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-dot" />
                  HOST CITY
                </div>
              </div>
            </div>
            {/* country pins arranged in a circle */}
            {COUNTRIES.slice(0, 14).map((c, i) => {
              const angle = (i / 14) * Math.PI * 2 - Math.PI / 2;
              const r = 46;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              const onLeft = x < 50;
              return (
                <span
                  key={c}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x.toFixed(4)}%`, top: `${y.toFixed(4)}%` }}
                >
                  <span className="relative block h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_5px_rgba(255,90,31,0.18)]">
                    <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] animate-ping opacity-60" />
                  </span>
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.18em] uppercase text-white/65 ${
                      onLeft ? "right-full mr-2" : "left-full ml-2"
                    } hidden md:inline`}
                  >
                    {c}
                  </span>
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
