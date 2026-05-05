import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { VenuesGallery } from "@/components/venues-gallery";
import { VenuesMap } from "@/components/venues-map";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "venuesPage" });
  return { title: t("title"), description: t("lead") };
}

export default async function VenuesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("venuesPage");
  const nav = await getTranslations("nav");
  return (
    <>
      <PageHero eyebrow={nav("venues")} title={t("title")} lead={t("lead")} meta="6 / 06" variant="venues" index={3} />
      <VenuesGallery />
      <section className="bg-[var(--color-paper-warm)] py-16 md:py-20">
        <div className="container-edge mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h3 className="mt-3 font-display text-3xl md:text-4xl text-[var(--color-ink)]">{t("stayTeaserTitle")}</h3>
            <p className="mt-3 text-[var(--color-ink)]/70">{t("stayTeaserBody")}</p>
          </div>
          <Link
            href="/stay"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-accent)] transition-colors self-start md:self-auto"
          >
            {t("stayTeaserCta")} →
          </Link>
        </div>
      </section>
      <section className="container-edge mx-auto pb-24 md:pb-32 pt-16 md:pt-24">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <div className="text-eyebrow-soft text-[var(--color-accent)]/70">{t("openDirections")}</div>
            <h2 className="mt-2 text-big text-[var(--color-ink)]">{t("title")} · {t("directions")}</h2>
          </div>
        </div>
        <VenuesMap />
        <div className="mt-3 text-eyebrow text-[var(--color-ink)]/55">{t("mapNote")}</div>
      </section>
    </>
  );
}
