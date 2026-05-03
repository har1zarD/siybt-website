"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { VENUES, type Venue } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin, Train, Car } from "lucide-react";
import Image from "next/image";

const VENUE_PHOTOS = [
  [
    "https://images.pexels.com/photos/2304478/pexels-photo-2304478.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2961948/pexels-photo-2961948.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/2961961/pexels-photo-2961961.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2304478/pexels-photo-2304478.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2961948/pexels-photo-2961948.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2961961/pexels-photo-2961961.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2304478/pexels-photo-2304478.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
];

export function VenuesGallery() {
  const t = useTranslations("venuesPage");
  return (
    <>
      {/* static map mosaic */}
      <section className="container-edge mx-auto pt-16 pb-10">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-paper-warm)]">
          <Image
            src="https://api.maptiler.com/maps/streets-v2-dark/static/18.4131,43.8563,11.5/1600x800.png?key=demo"
            alt="Sarajevo map with venues"
            fill
            className="object-cover opacity-90"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 to-transparent" />
          {/* simulated pins */}
          {[
            [22, 60], [38, 52], [48, 68], [58, 44], [70, 56], [82, 48],
          ].map(([x, y], i) => (
            <span key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${x}%`, top: `${y}%` }}>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-accent)] text-[10px] font-mono text-[var(--color-snow)] shadow-[0_0_0_5px_rgba(255,90,31,0.18)]">
                {i + 1}
              </span>
            </span>
          ))}
          <div className="absolute bottom-4 left-4 text-eyebrow text-[var(--color-snow)]/70">{t("mapNote")}</div>
        </div>
      </section>

      <section className="container-edge mx-auto pb-24 md:pb-32 space-y-20">
        {VENUES.map((v, i) => (
          <VenueRow key={v.name} index={i} venue={v} photos={VENUE_PHOTOS[i]} />
        ))}
      </section>
    </>
  );
}

function VenueRow({ index, venue, photos }: { index: number; venue: Venue; photos: string[] }) {
  const t = useTranslations("venuesPage");
  const [ref, api] = useEmblaCarousel({ loop: true });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!api) return;
    intervalRef.current = setInterval(() => api.scrollNext(), 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [api]);

  return (
    <article className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line-strong)]">
          <div ref={ref} className="overflow-hidden">
            <div className="flex">
              {photos.map((p) => (
                <div key={p} className="relative aspect-[16/10] min-w-full">
                  <Image src={p} alt={venue.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/40 to-transparent" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--color-snow)]/85">0{index + 1} / 06</div>
            <div className="flex gap-2">
              <button onClick={() => api?.scrollPrev()} aria-label="prev" className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-snow)] text-[var(--color-ink)]"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => api?.scrollNext()} aria-label="next" className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-snow)] text-[var(--color-ink)]"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-5 md:pl-6">
        <div className="text-eyebrow text-[var(--color-accent)]">VENUE 0{index + 1}</div>
        {venue.primary ? (
          <span className="ml-2 inline-block rounded-[2px] bg-[var(--color-accent)] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--color-snow)] align-middle">{t("primary")}</span>
        ) : null}
        <h3 className="mt-4 text-big text-[var(--color-ink)]">{venue.name}</h3>
        <dl className="mt-8 divide-y divide-[var(--color-line-strong)] border-y border-[var(--color-line-strong)] text-sm">
          <Row k={<span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {t("address")}</span>} v={`${venue.area}, Sarajevo`} />
          <Row k={t("capacity")} v={`${venue.capacity.toLocaleString("bs-BA")}`} />
          <Row k={<span className="inline-flex items-center gap-2"><Car className="h-3.5 w-3.5" /> {t("parking")}</span>} v={t("parkingValue")} />
          <Row k={<span className="inline-flex items-center gap-2"><Train className="h-3.5 w-3.5" /> {t("transit")}</span>} v={t("transitValue")} />
        </dl>
      </div>
    </article>
  );
}

function Row({ k, v }: { k: React.ReactNode; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3.5">
      <dt className="text-[var(--color-ink)]/55">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
