"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { VENUES, type Venue } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin, Train, Car, Navigation } from "lucide-react";
import Image from "next/image";

// Arena Hotel Hills 1, Hotel Hills 2, Hotel Hills 3, KSC Ilidža, Dvorana Hrasnica 1, Dvorana Hrasnica 2, Malak Regency
const VENUE_PHOTOS = [
  [
    "/venues/hills1-a.jpg",
    "/venues/hills1-b.jpg",
    "/venues/hills-c.jpg",
  ],
  [
    "/venues/hills1-b.jpg",
    "/venues/hills-c.jpg",
    "/venues/hills1-a.jpg",
  ],
  [
    "/venues/hills-c.jpg",
    "/venues/hills1-a.jpg",
    "/venues/hills1-b.jpg",
  ],
  [
    "/venues/ksc-ilidza-1.jpg",
  ],
  [
    "/venues/hrasnica.webp",
    "/venues/hrasnica-2.jpg",
    "/venues/hrasnica-3.jpg",
  ],
  [
    "/venues/hrasnica-2.jpg",
    "/venues/hrasnica-3.jpg",
    "/venues/hrasnica.webp",
  ],
  [
    "/venues/malak-1.jpg",
    "/venues/malak-2.jpg",
  ],
];

export function VenuesGallery() {
  return (
    <section className="container-edge mx-auto pt-16 pb-24 md:pb-32 space-y-20">
      {VENUES.map((v, i) => (
        <VenueRow key={v.name} index={i} venue={v} photos={VENUE_PHOTOS[i]} />
      ))}
    </section>
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
            <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--color-snow)]/85">0{index + 1} / 07</div>
            <div className="flex gap-2">
              <button onClick={() => api?.scrollPrev()} aria-label="prev" className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-snow)] text-[var(--color-ink)]"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => api?.scrollNext()} aria-label="next" className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-snow)] text-[var(--color-ink)]"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-5 md:pl-6">
        {venue.primary ? (
          <span className="ml-2 inline-block rounded-[2px] bg-[var(--color-accent)] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--color-snow)] align-middle">{t("primary")}</span>
        ) : null}
        <h3 className="mt-4 text-big text-[var(--color-ink)]">{venue.name}</h3>
        <dl className="mt-8 divide-y divide-[var(--color-line-strong)] border-y border-[var(--color-line-strong)] text-sm">
          <Row k={<span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {t("address")}</span>} v={`${venue.area}, Sarajevo`} />
          <Row k={t("capacity")} v={venue.capacity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} />
          <Row k={<span className="inline-flex items-center gap-2"><Car className="h-3.5 w-3.5" /> {t("parking")}</span>} v={t("parkingValue")} />
          <Row k={<span className="inline-flex items-center gap-2"><Train className="h-3.5 w-3.5" /> {t("transit")}</span>} v={t("transitValue")} />
        </dl>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}&destination_place_id=${encodeURIComponent(venue.name)}`}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] bg-[var(--color-ink)] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-transparent hover:text-[var(--color-ink)] transition-colors"
        >
          <Navigation className="h-3.5 w-3.5" /> {t("directions")}
        </a>
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
