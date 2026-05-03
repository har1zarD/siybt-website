"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useTranslations } from "next-intl";
import { COUNTRIES } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";

const MARKERS: Array<{ location: [number, number]; size: number }> = [
  { location: [43.8563, 18.4131], size: 0.05 }, // Sarajevo (host)
  { location: [45.815, 15.9819], size: 0.03 }, // Zagreb
  { location: [44.7866, 20.4489], size: 0.03 }, // Beograd
  { location: [42.4304, 19.2594], size: 0.03 }, // Podgorica
  { location: [46.0569, 14.5058], size: 0.03 }, // Ljubljana
  { location: [41.9981, 21.4254], size: 0.03 }, // Skopje
  { location: [52.52, 13.405], size: 0.03 }, // Berlin
  { location: [48.2082, 16.3738], size: 0.03 }, // Beč
  { location: [47.3769, 8.5417], size: 0.03 }, // Zürich
  { location: [59.3293, 18.0686], size: 0.03 }, // Stockholm
  { location: [59.9139, 10.7522], size: 0.03 }, // Oslo
  { location: [55.6761, 12.5683], size: 0.03 }, // Kopenhagen
  { location: [41.0082, 28.9784], size: 0.03 }, // Istanbul
  { location: [41.9028, 12.4964], size: 0.03 }, // Rim
  { location: [48.8566, 2.3522], size: 0.03 }, // Pariz
  { location: [52.3676, 4.9041], size: 0.03 }, // Amsterdam
];

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let phi = 4.6;
    let raf = 0;
    const getWidth = () => canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: getWidth() * 2,
      height: getWidth() * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.18, 0.22, 0.32],
      markerColor: [1, 0.353, 0.122],
      glowColor: [1, 0.45, 0.2],
      markers: MARKERS,
    });

    const tick = () => {
      phi += 0.0015;
      const w = getWidth() * 2;
      globe.update({ phi, width: w, height: w });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      const w = getWidth() * 2;
      globe.update({ width: w, height: w });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square w-full max-w-[560px] mx-auto"
      style={{ contain: "layout paint size" }}
    />
  );
}

export function TeamsGlobe() {
  const t = useTranslations("globe");

  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-snow)] py-32 md:py-40 grain">
      <div className="container-edge mx-auto grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <div className="text-eyebrow text-[var(--color-accent)]">{t("eyebrow")}</div>
          </Reveal>
          <h2 className="mt-6 text-giant text-[var(--color-snow)]">{t("title")}</h2>
          <p className="mt-6 max-w-md text-[var(--color-snow)]/70 text-lg">{t("subtitle")}</p>
        </div>

        <div className="md:col-span-7 relative">
          <GlobeCanvas />
        </div>
      </div>

      <div className="mt-20 border-t border-white/10 pt-8">
        <Marquee items={COUNTRIES} speed="slow" separator="·" />
      </div>
    </section>
  );
}
