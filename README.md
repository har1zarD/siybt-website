# SIYBT 2027 — Sarajevo International Youth Basketball Tournament

Production website for SIYBT 2027 (28 — 31 January 2027, Sarajevo).

## Stack

- Next.js 16 App Router · React 19 · TypeScript (strict)
- Tailwind CSS v4 with custom design tokens
- next-intl (default `en` at `/`, `bs` at `/bs`, with localized pathnames)
- Framer Motion + GSAP (ScrollTrigger) + Lenis for animation
- React Hook Form + Zod for forms
- **Prisma 6 + Supabase Postgres** for persistence
- **Resend** for transactional email (contact + registration)
- Embla Carousel for venue galleries
- `/admin` dashboard protected with HTTP Basic auth

## Routes

Canonical English paths (Bosnian mirror in parentheses):

- `/` — Homepage (`/bs`)
- `/tournament` — Tournament details (`/bs/turnir`)
- `/schedule` — Match schedule (`/bs/raspored`)
- `/venues` — Six venues with map (`/bs/dvorane`)
- `/teams` — Confirmed teams board (`/bs/ekipe`)
- `/family` — Family package (`/bs/family`)
- `/sponsors` — Sponsorship tiers (`/bs/sponzori`)
- `/media` — Gallery, video, accreditation (`/bs/medija`)
- `/register` — 4-step club registration (`/bs/prijava`)
- `/contact` — Contact form + general emails (`/bs/kontakt`)

## Local development

```bash
npm install
cp .env.example .env.local
# fill DATABASE_URL, DIRECT_URL, ADMIN_USERNAME, ADMIN_PASSWORD, RESEND_API_KEY
npm run db:push        # create tables in your Supabase database
npm run dev
```

Open http://localhost:3000. Admin lives at http://localhost:3000/admin.

## Database (Supabase + Prisma)

1. Create a project on [supabase.com](https://supabase.com).
2. Project Settings → Database → copy the **pooled** connection string (port 6543) into `DATABASE_URL` and the **direct** connection string (port 5432) into `DIRECT_URL`.
3. Run `npm run db:push` (development) or `npm run db:migrate` (production-style migrations).
4. `npm run db:studio` opens Prisma Studio at http://localhost:5555.

Tables managed by Prisma:

- `Registration` — clubs submitting through `/register`
- `ContactMessage` — inquiries from `/contact`
- `FamilyBooking` — parent-package requests from `/family`
- `PressAccreditation` — media applications from `/media`

When `DATABASE_URL` is unset, the API routes still validate and return ok — they just don't persist. The admin dashboard falls back to sample rows so the UI is browsable on a fresh checkout.

## Admin dashboard

`/admin` is protected with HTTP Basic auth. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your env. The route is excluded from the next-intl proxy and from search-engine indexing (`robots: { index: false }`).

Pages:

- `/admin` — counts and recent activity
- `/admin/registrations` — full club registration list
- `/admin/contact` — inbound contact messages
- `/admin/family` — family package booking requests
- `/admin/press` — press accreditation applications

## Build

```bash
npm run build
npm run start
```

## Localization

Strings live in `messages/en.json` and `messages/bs.json`. See `messages/README.md` for conventions. Add a new key to both files in the same change. The language switcher in the navbar persists the user's choice in a `NEXT_LOCALE` cookie.

## Assets

- `/public/hero.mp4` — compressed hero loop (sourced from Pexels, 1920px wide, ~2 MB).
- `/public/hero-poster.jpg` — first-frame poster.
- `/public/logo.png` — primary brand mark (square, transparent).
- `/src/app/icon.png` — favicon (Next 16 metadata convention).
- `/src/app/apple-icon.png` — apple touch icon.

## Environment

- `RESEND_API_KEY` — required for the contact and registration forms to actually send mail. When unset, the API routes accept submissions and return ok with `sent: false` (no mail leaves the box).
- `NEXT_PUBLIC_SITE_URL` — overrides the canonical site URL in metadata.

## Deploy to Vercel

The repo ships a `vercel.json` and is configured for the Vercel Next.js framework preset.

1. Import the repo on Vercel.
2. Add the env vars from `.env.example` in Project Settings → Environment Variables (`DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`).
3. The `build` script runs `prisma generate` automatically. Run `npm run db:deploy` once against the production database to apply migrations.
4. Promote the preview to production.

## Notes

- Routes use `next-intl` pathnames so URL slugs are localized per language.
- The hero video is served from `/public` to avoid hotlinking.
- All user-facing copy lives in `messages/*.json`; do not hardcode strings in components.
