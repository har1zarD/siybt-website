import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { ScheduleBoard } from "@/components/schedule-board";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "schedule" });
  return { title: t("title"), description: t("lead") };
}

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("schedule");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={nav("schedule")} title={t("title")} lead={t("lead")} meta={t("tip")} />
      <ScheduleBoard />
    </>
  );
}
