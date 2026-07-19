# Prompt: Our Expertise page (`/our-expertise`)

## Goal
Build `/our-expertise` per PRD §4.3: an intro header, one anchored section per sector in §5.1 (image/icon, heading, descriptive paragraph, sub-capabilities), anchor IDs matching the Home carousel's `Read More` links, and a CTA to Contact at the bottom.

## What it read
- `PRD.md` §4.3 (spec), §4.1 item 3 (confirms anchor IDs must match Home's `/our-expertise#<slug>` links), §5.1 (sector list), §6.1–6.2 (tone/original-copy)
- `lib/data/sectors.ts` — currently has `slug`, `name`, `blurb` (one sentence), `icon` per sector; no longer description, no sub-capabilities, no image — needs extending
- `components/sections/OurExpertise.tsx` (Home) — confirms each card already links to `/our-expertise#${sector.slug}`, so slugs are load-bearing and must not change
- `components/sections/about/CultureValues.tsx`, `components/sections/Hero.tsx` — existing "amber dot + text" list pattern and icon-circle card pattern, reused here for consistency

## Decisions / assumptions
- **`lib/data/sectors.ts` gets two new fields per sector**: `description` (a fuller 2–3 sentence paragraph, original copy, technical B2B tone) and `capabilities` (3–5 short bullet items). `blurb` stays as-is (still used by the Home carousel's shorter card). Same reasoning as before for keeping this in `lib/data/`: one sector list, multiple consumers.
- **No per-sector photography exists.** PRD says "sector image" — same situation as every other page this session with no imagery available. Continuing the established pattern: each section uses its existing `lucide-react` icon in a larger colored circle instead of a photo, swappable later.
- **13 sections, not 12** — includes the "Software Development" sector added earlier this session, since it's already in `lib/data/sectors.ts` and linked from Home.
- **A jump-nav below the intro** — 13 sections is a lot to scroll blind through. A wrapping row of pill links (sector name → its own anchor) right after the intro header, so visitors (and the Home page's "Read More" links) land somewhere navigable, not just at the top of a long scroll.
- **Alternating section background** (`bg-white` / `bg-petrol-50`) across the 13 sections for visual rhythm, rather than 13 identical-looking blocks in a row.
- **Sub-capabilities reuse the "amber dot + text" list pattern** already established in `Hero.tsx`/`WhoWeAre.tsx`/`LifeAtVelcor.tsx`, in a 2-column grid — ties this page visually to the rest of the site instead of inventing a new list style.
- **Bottom CTA** mirrors the existing CTA-band pattern (`components/sections/about/JoinTeamCta.tsx`): `bg-petrol-700`, bone heading, amber button — but pointing at `/contact` with copy like "Don't see your exact discipline? Talk to us."

## Files that will change
- **Modify** `lib/data/sectors.ts` — add `description` and `capabilities` to the `Sector` type and all 13 entries
- **Create** `components/sections/our-expertise/ExpertiseHero.tsx` (intro + jump-nav)
- **Create** `components/sections/our-expertise/SectorSection.tsx` (repeatable per-sector template, takes a `sector` + `index` prop for alternating background)
- **Create** `components/sections/our-expertise/ExpertiseCta.tsx`
- **Create** `app/our-expertise/page.tsx`

## Implementation requirements
- `app/our-expertise/page.tsx`: `buildMetadata({ title: "Our Expertise | ...", path: "/our-expertise" })`; renders `ExpertiseHero`, then `SECTORS.map((sector, i) => <SectorSection key={sector.slug} sector={sector} index={i} />)`, then `ExpertiseCta`. Exactly one `<h1>` (in `ExpertiseHero`).
- `ExpertiseHero`: eyebrow, `<h1>`, intro paragraph, then the jump-nav row — each pill an `<a href="#slug">` (in-page anchors, not `next/link`, since these are same-page jumps).
- `SectorSection`: `<section id={sector.slug} className={index % 2 === 0 ? "bg-white" : "bg-petrol-50"}>` with `scroll-mt-24` (or similar) so the sticky header doesn't cover the anchor target on jump. Icon in a large colored circle, `<h2>{sector.name}</h2>`, `description` paragraph, `capabilities` rendered as the amber-dot list in a 2-column grid on `sm+`.
- `ExpertiseCta`: full-width petrol band, heading + short line + `Button variant="accent"` linking to `/contact`.

## Security requirements
None — static content, no data, no secrets.

## Acceptance criteria
- [ ] `/our-expertise` renders all 13 sectors as anchored sections in the same order as `lib/data/sectors.ts`.
- [ ] Every anchor ID exactly matches the slug used in Home's `OurExpertise` cards (`water-treatment`, `industrial-automation`, ..., `software-development`).
- [ ] From `/`, clicking any sector card's "Read More" scrolls to the correct section on `/our-expertise` with the heading visible below the sticky header (not hidden behind it).
- [ ] Exactly one `<h1>` on the page.
- [ ] CTA band links to `/contact`.
- [ ] Copy is original, matches §6.1 tone, no fabricated stats/certifications.
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000/our-expertise` directly — confirm intro, jump-nav, all 13 sections, and the bottom CTA render.
2. Click a jump-nav pill — confirm it scrolls to the right section with the heading not obscured by the sticky header.
3. From `/`, scroll to "Our Expertise" and click a card's "Read More" — confirm it lands on the matching anchor on `/our-expertise`.
4. Resize to mobile — confirm sections stack cleanly and the capabilities list drops to a single column.
5. Inspect page source — exactly one `<h1>`.
