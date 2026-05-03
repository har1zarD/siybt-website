import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Link } from "@/i18n/navigation";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { Check } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "family" });
  return { title: t("title"), description: t("lead") };
}

export default async function FamilyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("family");
  const nav = await getTranslations("nav");
  const list = (t.raw("list") as string[]);

  return (
    <>
      <PageHero eyebrow={nav("family")} title={t("title")} lead={t("lead")} meta={t("price")} variant="family" index={5} />

      {/* winter hero image strip */}
      <section className="container-edge mx-auto pt-16">
        <div className="relative aspect-[16/7] overflow-hidden rounded-[var(--radius-md)]">
          <Image
            src="https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[var(--color-snow)]">
            <div>
              <div className="text-eyebrow text-[var(--color-snow)]/85">{t("imageCaption")}</div>
              <div className="mt-2 font-display text-3xl md:text-5xl">{t("imageHeadline")}</div>
            </div>
            <div className="hidden md:block font-mono text-sm tabular-nums">−4°C · SARAJEVO</div>
          </div>
        </div>
      </section>

      {/* what's included */}
      <section className="container-edge mx-auto py-24 md:py-32 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-eyebrow text-[var(--color-accent)]">{t("includes")}</div>
          <h2 className="mt-4 text-big text-[var(--color-ink)]">{t("includesTitle")}</h2>
          <p className="mt-6 text-[var(--color-ink)]/65 leading-relaxed">{t("includesBody")}</p>
        </div>
        <ul className="md:col-span-7 divide-y divide-[var(--color-line-strong)] border-y border-[var(--color-line-strong)]">
          {list.map((it, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <li className="flex items-start gap-4 py-5">
                <span className="mt-1 grid h-6 w-6 place-items-center rounded-[2px] bg-[var(--color-accent)] text-[var(--color-snow)]"><Check className="h-3.5 w-3.5" /></span>
                <span className="text-lg leading-snug">{it}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* room types + pool perk */}
      <section className="bg-[var(--color-paper-warm)] py-24 md:py-32">
        <div className="container-edge mx-auto grid gap-10 md:grid-cols-3">
          {([
            { k: "single", price: "100", showPrice: true },
            { k: "double", price: "160", showPrice: true },
            { k: "pool", price: "", showPrice: false },
          ] as const).map(({ k, price, showPrice }) => (
            <article key={k} className="rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-8">
              <div className="text-eyebrow text-[var(--color-accent)]">{t(`rooms.${k}.tag`)}</div>
              <h3 className="mt-4 font-display text-3xl">{t(`rooms.${k}.title`)}</h3>
              <p className="mt-3 text-sm text-[var(--color-ink)]/65 leading-relaxed">{t(`rooms.${k}.body`)}</p>
              {showPrice && (
                <div className="mt-8 font-mono text-4xl tabular-nums">{price} <span className="text-base text-[var(--color-ink)]/55">KM</span></div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* booking form */}
      <section className="container-edge mx-auto py-24 md:py-32 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-eyebrow text-[var(--color-accent)]">{t("book.eyebrow")}</div>
          <h2 className="mt-4 text-big text-[var(--color-ink)]">{t("book.title")}</h2>
          <p className="mt-6 text-[var(--color-ink)]/65 leading-relaxed">{t("book.body")}</p>
          <div className="mt-10 inline-flex items-center gap-3">
            <Magnetic>
              <Link href="/contact" className="rounded-[var(--radius-sm)] border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-transparent hover:text-[var(--color-ink)] transition-colors">
                {t("cta")}
              </Link>
            </Magnetic>
          </div>
        </div>
        <form className="md:col-span-7 grid gap-3 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-8 md:grid-cols-2">
          {([
            ["fullName", "text"], ["email", "email"], ["phone", "tel"], ["club", "text"],
            ["arrival", "date"], ["departure", "date"], ["adults", "number"], ["children", "number"],
          ] as const).map(([k, type]) => (
            <label key={k} className="block">
              <span className="text-eyebrow text-[var(--color-ink)]/55">{t(`book.fields.${k}`)}</span>
              <input
                type={type}
                name={k}
                className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none"
              />
            </label>
          ))}
          <button type="submit" className="md:col-span-2 mt-2 inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-ink)] transition-colors">
            {t("book.submit")}
          </button>
        </form>
      </section>
    </>
  );
}
