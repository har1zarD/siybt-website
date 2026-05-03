"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "bs"] as const;

export function LanguageSwitcher({ tone = "snow" }: { tone?: "snow" | "ink" }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [pending, start] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    start(() => {
      router.replace(
        // @ts-expect-error pathnames typing
        { pathname, params },
        { locale: next as (typeof LOCALES)[number] }
      );
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] border p-[2px] text-[10px] font-mono uppercase tracking-[0.2em]",
        tone === "snow" ? "border-white/25 text-[var(--color-snow)]" : "border-[var(--color-line-strong)] text-[var(--color-ink)]"
      )}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          disabled={pending}
          aria-pressed={locale === l}
          className={cn(
            "rounded-[2px] px-2.5 py-1 transition-colors",
            locale === l
              ? tone === "snow"
                ? "bg-[var(--color-snow)] text-[var(--color-ink)]"
                : "bg-[var(--color-ink)] text-[var(--color-snow)]"
              : "opacity-70 hover:opacity-100"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
