import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE = "https://siybt.ba";
const ROUTES: Array<keyof typeof routing.pathnames> = [
  "/", "/tournament", "/teams", "/schedule", "/venues",
  "/family", "/sponsors", "/media", "/register", "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const r of ROUTES) {
    for (const locale of routing.locales) {
      const slug = (routing.pathnames[r] as Record<string, string>)[locale];
      const path = locale === routing.defaultLocale ? slug : `/${locale}${slug === "/" ? "" : slug}`;
      out.push({ url: `${SITE}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: r === "/" ? 1 : 0.7 });
    }
  }
  return out;
}
