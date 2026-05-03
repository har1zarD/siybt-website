import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { RegisterWizard } from "@/components/register-wizard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "register" });
  return { title: t("title"), description: t("lead") };
}

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("register");
  const nav = await getTranslations("nav");
  return (
    <>
      <PageHero eyebrow={nav("register")} title={t("title")} lead={t("lead")} meta="04 / STEPS" variant="register" index={8} />
      <RegisterWizard />
    </>
  );
}
