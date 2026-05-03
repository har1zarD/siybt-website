import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { MarqueeBar } from "@/components/sections/marquee-bar";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Bento } from "@/components/sections/bento";
import { Categories } from "@/components/sections/categories";
import { VenuesPreview } from "@/components/sections/venues-preview";
import { TeamsGlobe } from "@/components/sections/teams-globe";
import { SponsorsStrip } from "@/components/sections/sponsors-strip";
import { Gallery } from "@/components/sections/gallery";
import { CtaBlock } from "@/components/sections/cta-block";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <MarqueeBar />
      <About />
      <Stats />
      <Bento />
      <Categories />
      <VenuesPreview />
      <TeamsGlobe />
      <Gallery />
      <SponsorsStrip />
      <CtaBlock />
    </>
  );
}
