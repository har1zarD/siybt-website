import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { TeamsBoard } from "@/components/teams-board";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teams" });
  return { title: t("title"), description: t("lead") };
}

export default async function TeamsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("teams");
  const nav = await getTranslations("nav");
  return (
    <>
      <PageHero eyebrow={nav("teams")} title={t("title")} lead={t("lead")} meta="52 / 70" />
      <TeamsBoard />
    </>
  );
}
