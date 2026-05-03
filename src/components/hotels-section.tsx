"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { HOTELS, type Hotel } from "@/lib/utils";
import { Star, ExternalLink, MapPin, Navigation, ChevronLeft, ChevronRight } from "lucide-react";

export function HotelsSection() {
  const t = useTranslations("hotels");
  return (
    <section className="bg-[var(--color-paper-warm)] py-24 md:py-32">
      <div className="container-edge mx-auto">
        <div className="grid gap-10 md:grid-cols-12 mb-14">
          <div className="md:col-span-5">
            <div className="text-eyebrow text-[var(--color-accent)]">{t("eyebrow")}</div>
            <h2 className="mt-4 text-big text-[var(--color-ink)]">{t("title")}</h2>
          </div>
          <p className="md:col-span-7 md:pt-3 text-[var(--color-ink)]/70 leading-relaxed text-lg">
            {t("lead")}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {HOTELS.map((h, i) => (
            <HotelCard key={h.name} hotel={h} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HotelCard({ hotel, index, t }: { hotel: Hotel; index: number; t: ReturnType<typeof useTranslations> }) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${hotel.lat},${hotel.lng}&destination_place_id=${encodeURIComponent(hotel.name)}`;
  const [ref, api] = useEmblaCarousel({ loop: true });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!api) return;
    intervalRef.current = setInterval(() => api.scrollNext(), 5000 + index * 400);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [api, index]);

  return (
    <article className="group relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)]">
      <div className="relative">
        <div ref={ref} className="overflow-hidden">
          <div className="flex">
            {hotel.images.map((src, k) => (
              <div key={src} className="relative aspect-[16/10] min-w-full">
                <Image
                  src={src}
                  alt={`${hotel.name} - ${k + 1}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority={k === 0 && index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/75 via-[var(--color-ink)]/15 to-transparent" />

        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-snow)]/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)]">
          {hotel.kind === "hotel" && hotel.stars
            ? Array.from({ length: hotel.stars }).map((_, k) => (
                <Star key={k} className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              ))
            : <span className="text-[var(--color-accent)]">{hotel.badge ?? ""}</span>}
        </div>

        <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.22em] text-[var(--color-snow)]/90">
          0{index + 1} / 0{HOTELS.length}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-3xl text-[var(--color-snow)] leading-tight">{hotel.name}</h3>
            <div className="mt-1 inline-flex items-center gap-1.5 text-[var(--color-snow)]/85 text-xs">
              <MapPin className="h-3 w-3" /> {hotel.address}
            </div>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button
              onClick={() => api?.scrollPrev()}
              aria-label="prev"
              className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-snow)]/95 text-[var(--color-ink)] hover:bg-[var(--color-accent)] hover:text-[var(--color-snow)] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              aria-label="next"
              className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-snow)]/95 text-[var(--color-ink)] hover:bg-[var(--color-accent)] hover:text-[var(--color-snow)] transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-7">
        <p className="text-sm leading-relaxed text-[var(--color-ink)]/70">{hotel.tagline}</p>

        {hotel.rooms.length > 0 && (
          <div className="mt-6">
            <div className="text-eyebrow text-[var(--color-ink)]/55 mb-2">{t("rooms")}</div>
            <div className="flex flex-wrap gap-1.5">
              {hotel.rooms.map((r) => (
                <span key={r} className="rounded-[2px] border border-[var(--color-line-strong)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink)]/75">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5">
          <div className="text-eyebrow text-[var(--color-ink)]/55 mb-2">{t("amenities")}</div>
          <ul className="space-y-1.5">
            {hotel.amenities.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-[var(--color-ink)]/80">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <a
            href={hotel.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-accent)] transition-colors"
          >
            {t("visit")} <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={directions}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors"
          >
            <Navigation className="h-3 w-3" /> {t("directions")}
          </a>
        </div>
      </div>
    </article>
  );
}
