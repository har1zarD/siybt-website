"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";

const SHOTS = [
  { src: "https://images.pexels.com/photos/2304478/pexels-photo-2304478.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Layup attack", tag: "Quarterfinal", aspect: "4/5" },
  { src: "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Crowd cheering", tag: "Arena Hotel Hills 1", aspect: "1/1" },
  { src: "https://images.pexels.com/photos/2961948/pexels-photo-2961948.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Three-point shot", tag: "U16 final", aspect: "4/5" },
  { src: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Coach huddle", tag: "Time-out", aspect: "1/1" },
  { src: "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Fast break", tag: "Group stage", aspect: "4/5" },
  { src: "https://images.pexels.com/photos/2961961/pexels-photo-2961961.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Defensive press", tag: "Malak Regency", aspect: "1/1" },
  { src: "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Trophy ceremony", tag: "Awards", aspect: "4/5" },
  { src: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Bench reaction", tag: "Final 4", aspect: "1/1" },
];

export function Gallery() {
  const t = useTranslations("galleryHome");
  return (
    <section className="relative bg-[var(--color-paper)] py-32 md:py-40">
      <div className="container-edge mx-auto">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="text-eyebrow-soft text-[var(--color-accent)]/70">{t("eyebrow")}</div>
            <h2 className="mt-2 text-giant text-[var(--color-ink)]">{t("title")}</h2>
          </div>
          <p className="md:col-span-5 text-[var(--color-ink)]/65 text-lg leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {SHOTS.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.04}>
              <figure className="group relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-ink)]" style={{ aspectRatio: s.aspect }}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[var(--color-snow)]">
                  <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--color-accent)]">0{i + 1}</div>
                  <div className="mt-1 font-display text-lg leading-tight">{s.tag}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* edge marquee with photo credits */}
      <div className="mt-20 border-y border-[var(--color-line-strong)] py-6 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink)]/55">
        <Marquee
          items={[
            t("creditPhotography"),
            t("creditCamera"),
            t("creditVenue"),
            t("creditAction"),
            t("creditCrowd"),
            t("creditAward"),
          ]}
          speed="slow"
          separator="·"
        />
      </div>
    </section>
  );
}
