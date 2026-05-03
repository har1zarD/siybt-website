import type { Metadata } from "next";
import Link from "next/link";
import { Inter_Tight, JetBrains_Mono, Anton } from "next/font/google";
import "../globals.css";

const sans = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const display = Anton({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = { title: "SIYBT - Admin", robots: { index: false, follow: false } };

const NAV = [
  ["/admin", "Overview"],
  ["/admin/registrations", "Registrations"],
  ["/admin/contact", "Contact"],
  ["/admin/family", "Family bookings"],
  ["/admin/press", "Press"],
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Auth is enforced upstream in src/proxy.ts (HTTP Basic).
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-svh bg-[var(--color-paper)] text-[var(--color-ink)]">
        <header className="border-b border-[var(--color-line-strong)] bg-[var(--color-snow)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/admin" className="font-display text-xl tracking-tight">
              SIYBT <span className="text-[var(--color-accent)]">·</span> Admin
            </Link>
            <nav className="flex flex-wrap gap-1 text-xs">
              {NAV.map(([h, l]) => (
                <Link
                  key={h}
                  href={h}
                  className="rounded-[var(--radius-sm)] px-3 py-2 uppercase tracking-[0.18em] text-[var(--color-ink)]/65 hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors"
                >
                  {l}
                </Link>
              ))}
            </nav>
            <Link href="/" className="rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors">
              View site
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
