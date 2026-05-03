import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("lead") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");

  const channels = [
    { k: "general" as const, email: "info@siybt.ba" },
    { k: "register" as const, email: "register@siybt.ba" },
    { k: "partners" as const, email: "partners@siybt.ba" },
  ];

  return (
    <>
      <PageHero eyebrow={nav("contact")} title={t("title")} lead={t("lead")} variant="contact" index={9} />

      <section className="container-edge mx-auto py-16 md:py-24 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-eyebrow text-[var(--color-accent)]">{t("channelsEyebrow")}</div>
          <h2 className="mt-4 text-big text-[var(--color-ink)]">{t("channelsTitle")}</h2>
          <ul className="mt-10 divide-y divide-[var(--color-line-strong)] border-y border-[var(--color-line-strong)]">
            {channels.map(({ k, email }) => (
              <li key={k} className="py-5">
                <div className="text-eyebrow text-[var(--color-ink)]/55">{t(`channels.${k}`)}</div>
                <a href={`mailto:${email}`} className="mt-2 inline-block font-display text-3xl tracking-tight hover:text-[var(--color-accent)] transition-colors">
                  {email}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <div className="text-eyebrow text-[var(--color-ink)]/55">{t("socialLabel")}</div>
            <div className="mt-3 flex gap-2">
              {["Instagram", "YouTube", "TikTok", "LinkedIn"].map((s) => (
                <a key={s} href="#" className="rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
