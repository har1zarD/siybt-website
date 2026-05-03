"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Magnetic } from "@/components/magnetic";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitWord } from "@/components/reveal";

export function CtaBlock() {
  const t = useTranslations("ctaBlock");
  return (
    <section className="relative bg-[var(--color-accent)] text-[var(--color-snow)] py-32 md:py-44 overflow-hidden">
      <div aria-hidden className="absolute inset-0 grain opacity-60" />
      <div aria-hidden className="absolute inset-0 grid-court opacity-[0.06]" />
      <div className="container-edge relative mx-auto">
        <Reveal>
          <div className="text-eyebrow text-[var(--color-snow)]/85">{t("eyebrow")}</div>
        </Reveal>
        <h2 className="mt-6 text-mega whitespace-pre-line">
          <SplitWord text={t("title").replace("\n", " ")} />
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <p className="md:col-span-6 max-w-md text-lg text-[var(--color-snow)]/85 leading-relaxed">{t("body")}</p>
          <div className="md:col-span-6 md:flex md:justify-end">
            <Magnetic>
              <Link
                href="/register"
                className="group inline-flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-snow)] bg-[var(--color-snow)] px-8 py-5 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-ink)] hover:bg-transparent hover:text-[var(--color-snow)] transition-colors"
              >
                {t("cta")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
