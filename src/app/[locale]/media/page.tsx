import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Download, Play } from "lucide-react";
import Image from "next/image";

const GALLERY = [
  "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2304478/pexels-photo-2304478.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2961948/pexels-photo-2961948.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2961961/pexels-photo-2961961.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("title"), description: t("lead") };
}

export default async function MediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("media");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={nav("media")} title={t("title")} lead={t("lead")} variant="media" index={7} />

      {/* livestream */}
      <section className="container-edge mx-auto pt-16">
        <div className="relative aspect-video overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-ink)] text-[var(--color-snow)]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-60">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent" />
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="inline-flex items-center gap-2 text-eyebrow text-[var(--color-accent)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse-dot" /> {t("stream")}
              </div>
              <h2 className="mt-4 text-giant">{t("streamTitle")}</h2>
              <p className="mt-4 text-sm text-[var(--color-snow)]/75">{t("soon")}</p>
            </div>
          </div>
          <button aria-label={t("playReel")} className="absolute bottom-6 right-6 grid h-14 w-14 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] text-[var(--color-snow)]">
            <Play className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* video reel cards */}
      <section className="container-edge mx-auto py-24 grid gap-3 md:grid-cols-3">
        {([1, 2, 3] as const).map((i) => (
          <Reveal key={i} delay={i * 0.05}>
            <article className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line-strong)]">
              <Image src={GALLERY[i]} alt={t(`reel.${i}.title`)} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--color-snow)]">
                <div className="text-eyebrow text-[var(--color-accent)]">{t(`reel.${i}.duration`)}</div>
                <div className="mt-2 font-display text-2xl">{t(`reel.${i}.title`)}</div>
              </div>
              <Play className="absolute right-4 top-4 h-5 w-5 text-[var(--color-snow)]" />
            </article>
          </Reveal>
        ))}
      </section>

      {/* gallery masonry */}
      <section className="container-edge mx-auto pb-24">
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="text-eyebrow text-[var(--color-accent)]">{t("galleryEyebrow")}</div>
            <h2 className="mt-4 text-big text-[var(--color-ink)]">{t("galleryTitle")}</h2>
          </div>
        </div>
        <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [column-fill:balance]">
          {GALLERY.map((src, i) => (
            <div key={src + i} className="mb-3 break-inside-avoid overflow-hidden rounded-[var(--radius-md)]">
              <div className="relative" style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/5" : "1/1" }}>
                <Image src={src} alt="" fill className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* press kit + accreditation */}
      <section className="bg-[var(--color-paper-warm)] py-24 md:py-32">
        <div className="container-edge mx-auto grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-eyebrow text-[var(--color-accent)]">{t("press.eyebrow")}</div>
            <h2 className="mt-4 text-big text-[var(--color-ink)]">{t("press.title")}</h2>
            <p className="mt-4 text-[var(--color-ink)]/65 leading-relaxed">{t("press.body")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/press-kit.zip" className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-5 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors">
                <Download className="h-3.5 w-3.5" /> {t("press.kit")}
              </a>
              <a href="/logo-pack.zip" className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-5 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors">
                <Download className="h-3.5 w-3.5" /> {t("press.logos")}
              </a>
            </div>
          </div>

          <form className="md:col-span-7 grid gap-3 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-8 md:grid-cols-2">
            <div className="md:col-span-2 text-eyebrow text-[var(--color-accent)]">{t("accreditation.eyebrow")}</div>
            <h3 className="md:col-span-2 text-big text-[var(--color-ink)]">{t("accreditation.title")}</h3>
            {(["fullName", "outlet", "email", "phone"] as const).map((k) => (
              <label key={k}>
                <span className="text-eyebrow text-[var(--color-ink)]/55">{t(`accreditation.fields.${k}`)}</span>
                <input className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none" />
              </label>
            ))}
            <label className="md:col-span-2">
              <span className="text-eyebrow text-[var(--color-ink)]/55">{t("accreditation.fields.notes")}</span>
              <textarea rows={4} className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none" />
            </label>
            <button type="submit" className="md:col-span-2 mt-2 inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-ink)] transition-colors">
              {t("accreditation.submit")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
