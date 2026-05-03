import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { HotelsSection } from "@/components/hotels-section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stayPage" });
  return { title: t("title"), description: t("lead") };
}

export default async function StayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("stayPage");
  const nav = await getTranslations("nav");
  return (
    <>
      <PageHero eyebrow={nav("stay")} title={t("title")} lead={t("lead")} meta="04 / 09" variant="stay" index={4} />
      <HotelsSection />
    </>
  );
}
