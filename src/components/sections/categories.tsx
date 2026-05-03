"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORIES } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2304478/pexels-photo-2304478.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2961961/pexels-photo-2961961.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2961948/pexels-photo-2961948.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

export function Categories() {
  const t = useTranslations("categories");
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    // Skip GSAP pinning on small screens & coarse pointers — use native horizontal scroll instead
    const isDesktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[var(--color-ink)] text-[var(--color-snow)] overflow-hidden">
      <div className="container-edge mx-auto pt-24">
        <Reveal>
          <div className="text-eyebrow text-[var(--color-accent)]">{t("eyebrow")}</div>
        </Reveal>
        <h2 className="mt-6 text-giant whitespace-pre-line">{t("title")}</h2>
        <div className="mt-6 text-eyebrow text-[var(--color-snow)]/55 md:hidden">{t("drag")} →</div>
        <div className="mt-6 text-eyebrow text-[var(--color-snow)]/55 hidden md:block">- {t("drag")}</div>
      </div>

      {/* Mobile: native horizontal scroll with snap */}
      <div className="relative mt-12 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] pb-12 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((c, i) => (
            <article
              key={c.code}
              className="relative aspect-[3/4] w-[80vw] shrink-0 snap-center overflow-hidden rounded-[var(--radius-md)] border border-white/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${IMAGES[i % IMAGES.length]})`,
                  filter: "grayscale(100%) brightness(0.6) contrast(1.1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between text-eyebrow text-[var(--color-snow)]/65">
                  <span className="text-[var(--color-accent)]">0{i + 1}</span>
                  <span>{c.year}</span>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-snow)]/60">{c.code}</div>
                  <h3 className="mt-3 text-4xl font-display leading-[0.92]">{c.label}</h3>
                </div>
              </div>
            </article>
          ))}
          <div className="w-[5vw] shrink-0" aria-hidden />
        </div>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div className="relative mt-12 h-[70vh] overflow-hidden hidden md:block">
        <div ref={trackRef} className="absolute left-0 top-0 flex h-full items-stretch gap-6 pl-[5vw] pr-[5vw] will-change-transform">
          {CATEGORIES.map((c, i) => (
            <article
              key={c.code}
              className="relative h-full w-[60vw] md:w-[44vw] lg:w-[34vw] shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-white/10 group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url(${IMAGES[i % IMAGES.length]})`,
                  filter: "grayscale(100%) brightness(0.6) contrast(1.1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between p-7">
                <div className="flex items-center justify-between text-eyebrow text-[var(--color-snow)]/65">
                  <span className="text-[var(--color-accent)]">0{i + 1}</span>
                  <span>{c.year}</span>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-snow)]/60">{c.code}</div>
                  <h3 className="mt-3 text-5xl md:text-6xl font-display leading-[0.92]">{c.label}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
