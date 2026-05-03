# Messages

This folder contains user-facing translations for the SIYBT website.

- `en.json` — English (default locale, served at `/`).
- `bs.json` — Bosnian (served at `/bs`).

## Structure

Top-level keys group strings by surface area:

- `meta` — page-wide title and description, used in `generateMetadata`.
- `nav` / `footer` — global chrome.
- `common` — buttons and microcopy reused across pages.
- `countdown` — labels for the countdown grid.
- `hero`, `marquee`, `about`, `stats`, `bento`, `categories`, `venuesSection`, `globe`, `sponsorsSection`, `ctaBlock` — homepage sections.
- `tournament`, `teams`, `schedule`, `venuesPage`, `family`, `sponsors`, `media`, `register`, `contact` — per-route pages.
- `languageSwitcher` — accessible label for the EN/BS switcher.

## Conventions

- Keep keys descriptive and stable; never reuse a key for a different string.
- Plain text only — markup belongs in components, not translations.
- Lists are JSON arrays (e.g. `marquee.items`, `family.list`).
- Multi-line copy uses `\n` to separate visual lines (e.g. headings).
- Both files must always have an identical key tree. When you add a key to one, add it to the other in the same edit.
