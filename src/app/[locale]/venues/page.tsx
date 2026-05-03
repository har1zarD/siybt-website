import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { VenuesGallery } from "@/components/venues-gallery";

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
    </>
  );
}
