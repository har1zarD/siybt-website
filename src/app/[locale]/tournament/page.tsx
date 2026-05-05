import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Countdown } from "@/components/countdown";
import { CATEGORIES } from "@/lib/utils";
import { CtaBlock } from "@/components/sections/cta-block";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tournament" });
  return { title: t("title"), description: t("lead") };
}

export default async function TournamentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tournament");
  const nav = await getTranslations("nav");

  const faqs: Array<{ q: string; a: string }> = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
  ];

  return (
    <>
      <PageHero
        eyebrow={nav("tournament")}
        title={t("title")}
        lead={t("lead")}
        meta={t("dates")}
        variant="tournament"
        index={1}
      />

      {/* big countdown block */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-paper)] py-20">
        <div className="container-edge mx-auto grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <div className="text-eyebrow-soft text-[var(--color-accent)]/70">{t("countdownLabel")}</div>
            <h2 className="mt-2 text-big text-[var(--color-ink)]">{t("dates")}</h2>
          </div>
          <div className="md:col-span-7">
            <Countdown tone="ink" />
          </div>
        </div>
      </section>

      {/* categories grid */}
      <section className="container-edge mx-auto py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="text-eyebrow-soft text-[var(--color-accent)]/70">{t("categoriesEyebrow")}</div>
            <h2 className="mt-2 text-big text-[var(--color-ink)]">{t("categoriesTitle")}</h2>
          </div>
          <p className="md:col-span-5 text-[var(--color-ink)]/65 leading-relaxed">{t("categoriesLead")}</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <article key={c.code} className="group rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-6 transition-all hover:-translate-y-1.5">
              <div className="flex items-center justify-between text-eyebrow text-[var(--color-ink)]/55">
                <span className="text-[var(--color-accent)]">0{i + 1}</span>
                <span>{c.year}</span>
              </div>
              <div className="mt-8 font-mono text-xs tracking-[0.18em] text-[var(--color-ink)]/60">{c.code}</div>
              <div className="mt-2 font-display text-3xl text-[var(--color-ink)]">{c.label}</div>
              <span className="mt-6 block h-px w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-12" />
            </article>
          ))}
        </div>
      </section>

      {/* fees + format */}
      <section className="bg-[var(--color-ink)] text-[var(--color-snow)] py-24 md:py-32 grain">
        <div className="container-edge mx-auto grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="text-eyebrow-soft text-[var(--color-accent)]/70">{t("fees")}</div>
            <h3 className="mt-2 text-big">{t("feesTitle")}</h3>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              <li className="flex items-baseline justify-between py-5">
                <span className="text-base">{t("feesMen")}</span>
                <span className="font-mono text-3xl tabular-nums text-[var(--color-accent)]">300 KM</span>
              </li>
              <li className="flex items-baseline justify-between py-5">
                <span className="text-base">{t("feesWomen")}</span>
                <span className="font-mono text-3xl tabular-nums text-[var(--color-accent)]">150 KM</span>
              </li>
              <li className="flex items-baseline justify-between py-5">
                <span className="text-base">{t("feesAthlete")}</span>
                <span className="font-mono text-3xl tabular-nums text-[var(--color-accent)]">20 KM</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-6">
            <div className="text-eyebrow-soft text-[var(--color-accent)]/70">{t("format")}</div>
            <h3 className="mt-2 text-big">{t("formatTitle")}</h3>
            <p className="mt-6 text-[var(--color-snow)]/75 leading-relaxed">{t("formatBody")}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {(["thu", "fri", "sat", "sun"] as const).map((d) => (
                <div key={d} className="rounded-[var(--radius-md)] border border-white/10 p-4">
                  <div className="text-eyebrow text-[var(--color-snow)]/55">{t(`formatDays.${d}.day`)}</div>
                  <div className="mt-2 font-display text-2xl">{t(`formatDays.${d}.label`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* rules + faq */}
      <section className="container-edge mx-auto py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-eyebrow-soft text-[var(--color-accent)]/70">{t("rules")}</div>
            <h3 className="mt-2 text-big text-[var(--color-ink)]">{t("rulesTitle")}</h3>
            <p className="mt-6 text-[var(--color-ink)]/65 leading-relaxed">{t("rulesBody")}</p>
          </div>
          <div className="md:col-span-7">
            <ul className="mt-6 divide-y divide-[var(--color-line-strong)] border-y border-[var(--color-line-strong)]">
              {faqs.map((f, i) => (
                <li key={i} className="py-6">
                  <details className="group">
                    <summary className="flex cursor-pointer items-baseline justify-between text-lg font-medium">
                      {f.q}
                      <span className="ml-4 font-mono text-sm text-[var(--color-accent)] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-[var(--color-ink)]/65 leading-relaxed">{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
