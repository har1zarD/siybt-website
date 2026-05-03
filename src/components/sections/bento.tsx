"use client";

import { useTranslations } from "next-intl";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { Building2, Radio, Tv, Hotel, Heart, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  venues: Building2,
  stream: Radio,
  tv: Tv,
  hotel: Hotel,
  family: Heart,
  sponsors: Handshake,
} as const;

const CELLS: Array<{ k: keyof typeof ICONS; cls: string; tone?: "accent" | "ink" | "paper"; image?: string }> = [
  {
    k: "venues",
    cls: "md:col-span-7 md:row-span-2",
    tone: "ink",
    image: "/venues/hills1-b.jpg",
  },
  { k: "stream", cls: "md:col-span-5", tone: "paper" },
  { k: "tv", cls: "md:col-span-3", tone: "paper" },
  { k: "hotel", cls: "md:col-span-2", tone: "paper" },
  {
    k: "family",
    cls: "md:col-span-5 md:row-span-2",
    tone: "accent",
    image: "/family-arena.jpg",
  },
  { k: "sponsors", cls: "md:col-span-7", tone: "paper" },
];

export function Bento() {
  const t = useTranslations("bento");
  return (
    <section className="container-edge relative mx-auto py-32 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="text-eyebrow text-[var(--color-accent)]">{t("eyebrow")}</div>
          </Reveal>
          <h2 className="mt-6 text-giant text-[var(--color-ink)]">{t("title")}</h2>
        </div>
      </div>

      <RevealStagger className="mt-16 grid auto-rows-[180px] grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[160px]">
        {CELLS.map(({ k, cls, tone, image }) => {
          const Icon = ICONS[k];
          const toneCls =
            tone === "accent"
              ? "bg-[var(--color-accent)] text-[var(--color-snow)]"
              : tone === "ink"
              ? "bg-[var(--color-ink)] text-[var(--color-snow)]"
              : "bg-[var(--color-snow)] text-[var(--color-ink)]";
          return (
            <RevealItem key={k} className={cls}>
              <article
                className={cn(
                  "group relative h-full w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1.5",
                  toneCls
                )}
              >
                {image ? (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-cover bg-center opacity-55 transition-opacity duration-700 group-hover:opacity-70"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                    <div
                      aria-hidden
                      className={cn(
                        "absolute inset-0",
                        tone === "accent"
                          ? "bg-gradient-to-t from-[var(--color-accent)] via-[var(--color-accent)]/70 to-[var(--color-accent)]/30"
                          : "bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-[var(--color-ink)]/20"
                      )}
                    />
                  </>
                ) : null}
                <div className="relative flex h-full flex-col justify-between">
                  <Icon className="h-6 w-6 opacity-80" />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display tracking-tight">{t(`items.${k}.title`)}</h3>
                    <p className="mt-3 text-sm leading-relaxed opacity-75 max-w-md">{t(`items.${k}.body`)}</p>
                  </div>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
              </article>
            </RevealItem>
          );
        })}
      </RevealStagger>
    </section>
  );
}
