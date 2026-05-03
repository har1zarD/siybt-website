import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { Download, Trophy, Eye, Tv, HeartHandshake } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sponsors" });
  return { title: t("title"), description: t("lead") };
}

export default async function SponsorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sponsors");
  const nav = await getTranslations("nav");

  const tiers: Array<{ k: "gold" | "silver" | "bronze"; price: string; logos: string[] }> = [
    { k: "gold", price: "60.000 KM", logos: ["BH Telecom"] },
    { k: "silver", price: "25.000 KM", logos: ["Argeta", "Sarajevo Osiguranje", "Raiffeisen"] },
    { k: "bronze", price: "8.000 KM", logos: ["ASA", "BBI", "Klas", "Bingo", "M:tel", "Avaz"] },
  ];

  const benefits = [
    { k: "reach", icon: Eye },
    { k: "broadcast", icon: Tv },
    { k: "trophy", icon: Trophy },
    { k: "community", icon: HeartHandshake },
  ] as const;

  return (
    <>
      <PageHero eyebrow={nav("sponsors")} title={t("title")} lead={t("lead")} meta={t("countMeta")} />

      <section className="container-edge mx-auto py-24 md:py-32 space-y-16">
        {tiers.map(({ k, price, logos }) => (
          <Reveal key={k}>
            <article className="grid gap-8 border-t border-[var(--color-line-strong)] pt-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="text-eyebrow text-[var(--color-accent)]">{t(`tiers.${k}`)}</div>
                <h3 className="mt-3 text-big text-[var(--color-ink)]">{t(`tierTitles.${k}`)}</h3>
                <div className="mt-6 font-mono text-3xl tabular-nums">{price} <span className="text-base text-[var(--color-ink)]/55">/ {t("perEdition")}</span></div>
              </div>
              <div className="md:col-span-5 text-[var(--color-ink)]/70 leading-relaxed">{t(`tierBodies.${k}`)}</div>
              <div className="md:col-span-3">
                <ul className="grid grid-cols-2 gap-2">
                  {logos.map((l) => (
                    <li key={l} className="grid h-16 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] px-2 font-display text-sm text-[var(--color-ink)]/75">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* why sponsor */}
      <section className="bg-[var(--color-ink)] text-[var(--color-snow)] py-24 md:py-32 grain">
        <div className="container-edge mx-auto">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-eyebrow text-[var(--color-accent)]">{t("whyEyebrow")}</div>
              <h2 className="mt-4 text-giant">{t("whyTitle")}</h2>
            </div>
            <p className="md:col-span-7 md:pl-8 text-lg text-[var(--color-snow)]/75 leading-relaxed">{t("whyBody")}</p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
            {benefits.map(({ k, icon: Icon }) => (
              <div key={k} className="bg-[var(--color-ink)] p-8">
                <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                <div className="mt-6 font-display text-2xl">{t(`benefits.${k}.title`)}</div>
                <div className="mt-2 text-sm text-[var(--color-snow)]/65">{t(`benefits.${k}.body`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge mx-auto py-24 md:py-32 grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <div className="text-eyebrow text-[var(--color-accent)]">{t("ctaEyebrow")}</div>
          <h2 className="mt-4 text-big text-[var(--color-ink)]">{t("ctaTitle")}</h2>
        </div>
        <div className="md:col-span-5 flex flex-wrap gap-3">
          <a href="/sponsor-deck.pdf" className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-5 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors">
            <Download className="h-3.5 w-3.5" /> {t("downloadDeck")}
          </a>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-ink)] transition-colors">
            {t("becomePartner")}
          </Link>
        </div>
      </section>

      <div className="border-y border-[var(--color-line-strong)] bg-[var(--color-paper-warm)] py-8">
        <Marquee items={["BH Telecom", "Argeta", "Sarajevo Osiguranje", "Raiffeisen", "ASA", "BBI", "Klas", "Bingo", "M:tel", "Avaz"]} speed="slow" />
      </div>
    </>
  );
}
