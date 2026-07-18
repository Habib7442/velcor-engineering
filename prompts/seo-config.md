# Prompt: Centralized SEO config (`lib/seo.ts`)

## Goal
Create a single `lib/seo.ts` module that every page uses to generate its metadata and structured data, targeted at a **global** audience — no local-market SEO signals (no local phone requirement, no `LocalBusiness` schema, no location-modified keywords).

## What it read
- `AGENTS.md` (architecture, tech stack, code standards)
- `PRD.md` §10 (SEO requirements), §6.3 (company facts), §16 (open questions — Q1 legal name/logo, Q2 target geography)
- Existing code: `app/layout.tsx`, `app/page.tsx` (current Next.js boilerplate metadata)

## Decisions / assumptions
- **Target market is global**, per your direction — this resolves PRD §16 Q2. Structured data uses `Organization` (+ `BreadcrumbList` helper for later inner pages), not `LocalBusiness`. Keyword/description copy will avoid city/region modifiers ("near me", local place names) in favor of capability + industry language.
- `siteUrl` is hardcoded to `https://velcorengineering.com` (from the PRD header) as a constant in `seo.ts` — not an env var, since it's fixed and public.
- Full company facts (logo file, social profiles, phone, addresses — PRD §16 Q1) aren't finalized yet. `seo.ts` ships with a minimal `siteConfig` (name, url, default title/description, default OG image) and an empty `sameAs` social array. These get filled in when a future `lib/data/company.ts` (PRD §6.3 single source of truth) is built — not part of this task.
- No real default OG share image exists yet. I'll reference `public/og-default.png` as the path and note that the actual designed 1200×630 image is a launch blocker (PRD §15 checklist item), not something I can generate here.
- Home page gets placeholder title/description consistent with the PRD's positioning language, wired through `buildMetadata()` as a working proof — not final copy (final Home copy is a separate future UI task).
- `WebSite` JSON-LD is skipped (no on-site search to justify a `SearchAction`); only `Organization` + a reusable `breadcrumbJsonLd()` helper are built now.

## Files that will change
- **Create** `lib/seo.ts`
- **Modify** `app/layout.tsx` — use `buildMetadata()` for the root/default metadata, render `Organization` JSON-LD
- **Modify** `app/page.tsx` — override title/description via `buildMetadata()` as the working example
- **Create** `public/og-default.png` — placeholder only (solid brand-color placeholder), flagged for replacement with a real designed share image before launch

## Implementation requirements
`lib/seo.ts` exports:
- `siteConfig` — `{ name, url, titleTemplate, defaultTitle, defaultDescription, defaultOgImage, sameAs: string[] }`.
- `buildMetadata(opts?: { title?; description?; path?; ogImage?; noIndex? }): Metadata` — returns a Next.js `Metadata` object: title (applies `titleTemplate` when `title` given, else `defaultTitle`), description, `alternates.canonical` (`siteConfig.url + path`), `openGraph` (type `website`, url, siteName, title, description, images), `twitter` (`summary_large_image`, title, description, images), `robots` (index/follow unless `noIndex`).
- `organizationJsonLd()` — `{ "@context": "https://schema.org", "@type": "Organization", name, url, logo, sameAs }`.
- `breadcrumbJsonLd(items: { name: string; url: string }[])` — returns a `BreadcrumbList` JSON-LD object, for inner pages to use once they exist.

`app/layout.tsx`:
- `export const metadata = buildMetadata()` for the site-wide default.
- Set `metadataBase: new URL(siteConfig.url)`.
- Render an `Organization` JSON-LD `<script type="application/ld+json">` in the layout so it's present on every page.

`app/page.tsx`:
- `export const metadata = buildMetadata({ title: 'Home', description: '<placeholder positioning line>', path: '/' })`.

## Security requirements
None — this is static config and server-rendered metadata, no secrets, no env vars, no user input.

## Acceptance criteria
- [ ] `lib/seo.ts` exports `siteConfig`, `buildMetadata`, `organizationJsonLd`, `breadcrumbJsonLd`, fully typed (no `any`).
- [ ] Root layout emits a single `Organization` JSON-LD block; no `LocalBusiness` schema anywhere.
- [ ] Home page renders a unique `<title>`, meta description, canonical URL (`https://velcorengineering.com/`), and OG/Twitter tags via `buildMetadata`.
- [ ] No location-specific copy (city/region names, "near me") in any generated title/description.
- [ ] `npm run typecheck` and `npm run lint` pass.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build` (layout is shared server config, changing it can affect the build)

## Manual test steps
1. `npm run dev`, open `http://localhost:3000`.
2. View page source (Ctrl+U) and confirm: `<title>`, `<meta name="description">`, `<link rel="canonical" href="https://velcorengineering.com/">`, `og:title`/`og:description`/`og:image`, `twitter:card`.
3. Confirm a `<script type="application/ld+json">` block is present containing `"@type":"Organization"` with no `LocalBusiness` anywhere in the page source.
4. Confirm no city/region names appear in the rendered title or description.
