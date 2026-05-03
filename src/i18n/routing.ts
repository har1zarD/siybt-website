import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bs"],
  defaultLocale: "en",
  localePrefix: { mode: "as-needed" },
  pathnames: {
    "/": "/",
    "/tournament": { en: "/tournament", bs: "/turnir" },
    "/teams": { en: "/teams", bs: "/ekipe" },
    "/schedule": { en: "/schedule", bs: "/raspored" },
    "/venues": { en: "/venues", bs: "/dvorane" },
    "/family": { en: "/family", bs: "/family" },
    "/sponsors": { en: "/sponsors", bs: "/sponzori" },
    "/media": { en: "/media", bs: "/medija" },
    "/register": { en: "/register", bs: "/prijava" },
    "/contact": { en: "/contact", bs: "/kontakt" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
