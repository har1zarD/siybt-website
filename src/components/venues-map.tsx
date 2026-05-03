"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { VENUES } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

export function VenuesMap() {
  const t = useTranslations("venuesPage");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const bounds = L.latLngBounds(VENUES.map((v) => [v.lat, v.lng] as [number, number]));
      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).fitBounds(bounds, { padding: [40, 40] });

      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      VENUES.forEach((v, i) => {
        const icon = L.divIcon({
          className: "siybt-pin",
          html: `<span class="pin-num">${i + 1}</span>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const directions = `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}&destination_place_id=${encodeURIComponent(v.name)}`;
        const popup = `
          <div class="siybt-popup">
            <div class="pp-eyebrow">VENUE 0${i + 1}</div>
            <div class="pp-name">${v.name}</div>
            <div class="pp-area">${v.area}, Sarajevo · ${v.capacity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
            <a class="pp-link" href="${directions}" target="_blank" rel="noreferrer noopener">${t("openDirections")} →</a>
          </div>`;
        L.marker([v.lat, v.lng], { icon }).addTo(map).bindPopup(popup);
      });
    })();

    return () => {
      cancelled = true;
      const m = mapRef.current as { remove?: () => void } | null;
      if (m && typeof m.remove === "function") m.remove();
      mapRef.current = null;
    };
  }, [t]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative aspect-[16/8] w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-paper-warm)] z-0"
      />
      <style>{`
        .siybt-pin {
          display: grid;
          place-items: center;
          width: 28px; height: 28px;
          border-radius: 9999px;
          background: var(--color-accent);
          color: var(--color-snow);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          box-shadow: 0 0 0 5px rgba(255, 90, 31, 0.18), 0 4px 14px rgba(0,0,0,0.35);
        }
        .siybt-pin .pin-num { line-height: 1; }
        .siybt-popup { font-family: var(--font-sans); min-width: 200px; }
        .siybt-popup .pp-eyebrow {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          color: var(--color-accent);
          text-transform: uppercase;
        }
        .siybt-popup .pp-name {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--color-ink);
          margin-top: 4px;
        }
        .siybt-popup .pp-area {
          font-size: 12px;
          color: rgba(5,6,8,0.6);
          margin-top: 4px;
        }
        .siybt-popup .pp-link {
          display: inline-block;
          margin-top: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-snow);
          background: var(--color-ink);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          text-decoration: none;
        }
        .siybt-popup .pp-link:hover { background: var(--color-accent); }
        .leaflet-popup-content-wrapper {
          border-radius: var(--radius-md);
          border: 1px solid var(--color-line-strong);
        }
        .leaflet-popup-content { margin: 14px 16px; }
        .leaflet-container { background: var(--color-paper-warm); }
      `}</style>
    </>
  );
}
