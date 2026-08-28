# Prompt: Replace Our Expertise / What We Do with new 3-category Expertise IA

## Goal
Retire the current "Our Expertise" (13 sectors) and "What We Do" (Product Design / Plant
Engineering) pages entirely and replace them with the 3-category structure and copy you
provided: **Plants & Infrastructure**, **Product Engineering**, **Industrial Automation** —
each a landing page, each sub-service a dedicated SEO page, per your decisions below.

## What I read
- Your pasted content in full — 3 category intros, 12 fully-written sub-service pages (scope
  groups, deliverables), and your suggested developer structure
- Your three answered decisions: **drop** the 5 services not in the new list (Automotive
  Engineering, Power System Studies, Analysis & Simulation, Solar Power Plant, Software
  Development) rather than fold them in; **one page per sub-category** (not sections on a
  parent page); **free-for-commercial-use stock photos**, not scraped search results
- Current `lib/data/sectors.ts`, `product-design.ts`, `plant-engineering.ts` — being retired
- `components/sections/OurExpertise.tsx`, `WhatWeDoHighlight.tsx` (Home page sections that
  reference the old data) — need updating, not just the two standalone pages
- `lib/data/nav-menu.ts`, `Header.tsx` — the mega-menu built two turns ago needs its data
  source swapped to the new structure
- `app/sitemap.ts` — currently hardcodes `/our-expertise` and `/what-we-do`
- `node_modules/next/dist/docs/.../generate-static-params.md` — confirmed Next 16's
  `params` is a `Promise` that must be awaited in both `page.tsx` and `generateMetadata`,
  and `generateStaticParams` is how I'll pre-render every category/service page at build time

## A content gap I won't fill in myself
Your "Suggested Developer Structure" lists **6** sub-categories under Plants & Infrastructure
(including "Power Plants"), but only **5** have written content in your message — Oil & Gas,
Water & Wastewater Treatment, Infrastructure, Utilities/Substations & Grid, and Mining &
Heavy Industry. There's no scope/deliverables copy for "Power Plants." I'm not going to
invent engineering scope content for it — that's exactly the kind of fabrication PRD §6.2
and §16 already rule out for this project. **Power Plants is omitted from this build.** Send
its content whenever you have it and I'll add the 13th page as a fast follow.

So this ships **12 sub-service pages**, not 13: 5 under Plants & Infrastructure, 3 under
Product Engineering, 4 under Industrial Automation.

## URL structure
```
/expertise                                                  hub — 3 category cards
/expertise/plants-infrastructure                            category landing
/expertise/plants-infrastructure/oil-gas
/expertise/plants-infrastructure/water-wastewater-treatment
/expertise/plants-infrastructure/infrastructure
/expertise/plants-infrastructure/utilities-substations-grid
/expertise/plants-infrastructure/mining-heavy-industry
/expertise/product-engineering                              category landing
/expertise/product-engineering/lv-mv-switchgear
/expertise/product-engineering/e-houses-modular-power
/expertise/product-engineering/bess-modular-energy
/expertise/industrial-automation                             category landing
/expertise/industrial-automation/special-purpose-machines
/expertise/industrial-automation/factory-automation
/expertise/industrial-automation/material-handling-systems
/expertise/industrial-automation/embedded-electronics
```
Built as Next.js dynamic segments (`app/expertise/[category]/page.tsx` and
`app/expertise/[category]/[service]/page.tsx` with `generateStaticParams`), not 16 hand-
written files — same content, far less to maintain, and it's how this gets you a unique,
crawlable, statically-generated page per service without 16 near-duplicate files.

`/our-expertise` and `/what-we-do` **redirect** (308, permanent) to `/expertise` via
`next.config.ts` `redirects()` — cheap insurance against a dead link if either URL was ever
shared or indexed, even pre-launch.

## Decisions
- **Data lives in one new `lib/data/expertise.ts`**, typed, holding your content verbatim
  (category intros, per-service scope groups exactly as you grouped them — e.g. Oil & Gas
  keeps its 5 named sub-groups, Infrastructure keeps its flat bullet list — and deliverables).
  I'm transcribing your copy as-is, not rewriting it.
- **Old data files and components are deleted**, not left dangling: `sectors.ts`,
  `product-design.ts`, `plant-engineering.ts`, `app/our-expertise/`, `app/what-we-do/`, and
  every component under `components/sections/our-expertise/` and `components/sections/what-we-do/`.
- **Home page updates**, since both its sections read the old data:
  - `OurExpertise.tsx` (carousel) → cards for all 12 sub-services (was 13 sectors), each
    linking to its new dedicated page. Heading copy updates from "twelve sectors" accordingly.
  - `WhatWeDoHighlight.tsx` (2 feature blocks) → 3 feature blocks, one per category, linking
    to each category landing page.
- **Header mega-menu** (`lib/data/nav-menu.ts`) rebuilds from the new data: 3 columns
  (one per category), each listing its own sub-services and linking to the new URLs. The
  "What We Do" nav item is removed from `NAV_LINKS` entirely (5 top-level items instead of
  6) since that page no longer exists; "Our Expertise" keeps its label, now points at `/expertise`.
- **`sitemap.ts` generates its expertise entries from `lib/data/expertise.ts`** instead of a
  hardcoded list, so it can't drift out of sync with the real routes again.
- **Images: one per category page, one per service page (15 total)**, sourced from Unsplash
  (Unsplash License permits free commercial use, no attribution required) via search, matched
  to each page's actual subject (e.g. real switchgear/E-house/conveyor photography, not
  generic stock). Stored under `public/expertise/`. This is the single biggest chunk of the
  work by volume of tool calls — if anything gets cut for time, this is what I'd flag first.
- **Metadata per page** via `generateMetadata`, unique title/description per category and
  per service (PRD §10 — no thin/duplicate descriptions), plus `BreadcrumbList` JSON-LD
  matching the existing pattern (`breadcrumbJsonLd` in `lib/seo.ts`) for Home → category → service.

## Files that will change
- **Create** `lib/data/expertise.ts`
- **Create** `app/expertise/page.tsx`, `app/expertise/[category]/page.tsx`,
  `app/expertise/[category]/[service]/page.tsx`, plus their section components
- **Create** `public/expertise/*.jpg` (15 sourced images)
- **Delete** `app/our-expertise/`, `app/what-we-do/`, `components/sections/our-expertise/`,
  `components/sections/what-we-do/`, `lib/data/sectors.ts`, `lib/data/product-design.ts`,
  `lib/data/plant-engineering.ts`
- **Modify** `components/sections/OurExpertise.tsx`, `components/sections/WhatWeDoHighlight.tsx`,
  `lib/nav-links.ts`, `lib/data/nav-menu.ts`, `app/sitemap.ts`, `next.config.ts` (redirects)

## Security requirements
None — static content, static images, no user input, no new env vars.

## Acceptance criteria
- [ ] All 12 service pages + 3 category pages + hub render with unique `<title>`/description and exactly one `<h1>`
- [ ] Every scope-group and deliverable list matches your pasted content verbatim — no rewritten copy
- [ ] `/our-expertise` and `/what-we-do` 308-redirect to `/expertise`; no other route breaks
- [ ] Header mega-menu, Home carousel, and Home highlight blocks all link to the new URLs — no dead `/our-expertise#...` or `/what-we-do#...` links left anywhere in the codebase
- [ ] Every image is a real photo relevant to its page's actual subject, legally usable (Unsplash License), with alt text
- [ ] `sitemap.xml` lists the new routes, not the old ones
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` all pass

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `grep -rn "our-expertise\|what-we-do" app components lib` → only the two redirect entries should remain

## Manual test steps
1. `npm run dev`. Visit `/expertise` — confirm 3 category cards.
2. Click into each category, then into 2–3 sub-service pages per category — confirm real content, real images, correct breadcrumbs.
3. Visit `/our-expertise` and `/what-we-do` directly — confirm both redirect to `/expertise`.
4. Open the header mega-menu — confirm it shows the new 3-column structure with all 12 services, no leftover old sectors.
5. Check the Home page carousel and highlight blocks — confirm updated cards/links.
6. View `http://localhost:3000/sitemap.xml` — confirm it lists the new URLs only.

## Sequencing note
Given the size, I'll build this in order: data file → routing/pages/metadata → Home + Header
+ sitemap wiring → redirects → images last (since it's the most tool-call-heavy part and
doesn't block anything else being reviewable first). I'll check in with progress rather than
going fully silent for the whole thing.
