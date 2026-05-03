import type { Metadata } from "next";
import { Inter_Tight, Anton, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/page-transition";
import { routing } from "@/i18n/routing";

const sans = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const display = Anton({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", display: "swap" });

const SITE = "https://siybt.ba";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE),
    title: { default: t("title"), template: "%s — SIYBT 2027" },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: SITE,
      siteName: "SIYBT 2027",
      locale: locale === "bs" ? "bs_BA" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: { en: "/", bs: "/bs" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-svh bg-[var(--color-paper)] text-[var(--color-ink)]">
        <NextIntlClientProvider>
          <LenisProvider />
          <CustomCursor />
          <ScrollProgress />
          <SiteNav />
          <PageTransition><main>{children}</main></PageTransition>
          <SiteFooter />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SportsEvent",
                name: "Sarajevo International Youth Basketball Tournament 2027",
                startDate: "2027-01-28T09:00:00+01:00",
                endDate: "2027-01-31T22:00:00+01:00",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                location: { "@type": "Place", name: "Arena Hotel Hills 1", address: { "@type": "PostalAddress", addressLocality: "Sarajevo", addressCountry: "BA" } },
                image: [`${SITE}/og.jpg`],
                organizer: { "@type": "Organization", name: "SIYBT", url: SITE },
                sport: "Basketball",
              }),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
