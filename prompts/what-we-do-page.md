# Prompt: What We Do page (`/what-we-do`)

## Goal
Build `/what-we-do` per PRD §4.4: single `<h1>`, two capability groups — Product Design (`#product-design`, card grid per §5.2) and Plant Engineering (`#plant-engineering`, discipline blocks with bulleted deliverables per §5.3) — plus a "Looking for a Custom Solution?" CTA band to Contact.

## What it read
- `PRD.md` §4.4 (spec + acceptance: exactly one `<h1>`, all §5.2/§5.3 items present, tone matches §6.1), §5.2 (7 Product Design services with PRD-provided short descriptions), §5.3 (5 Plant Engineering disciplines with deliverable lists), §6.2 (deliverable list items are standard industry terms, reusable as-is — no rewrite needed there, unlike the §5.2 short descriptions which the PRD already gives rewritten)
- `components/sections/our-expertise/SectorSection.tsx`, `ExpertiseCta.tsx` — reusing the same anchored-section and CTA-band patterns already established for `/our-expertise`, for visual consistency between the two "capability" pages
- `Header.NAV_LINKS` / Hero's "Explore Services" button — confirms `/what-we-do` is already linked from two places, currently 404ing

## Decisions / assumptions
- **Data goes in `lib/data/`** — `product-design.ts` (7 items) and `plant-engineering.ts` (5 disciplines) — matching AGENTS.md §3's explicit call-out of "services" as `lib/data/` content, same reasoning as `sectors.ts`.
- **§5.2 short descriptions are used verbatim** — the PRD table already provides Velcor-rewritten copy for all 7 items ("Automation solutions to optimize manufacturing processes and efficiency.", etc.), not a draft to rewrite again.
- **§5.3 deliverable list items are used verbatim** — PRD §6.2 explicitly says these are standard industry terms and may be reused as-is (P&ID drafting, SLD & 3-line diagrams, ASME pressure vessel design, etc.) — these aren't marketing copy, they're recognizable technical deliverables a procurement engineer is scanning for by name.
- **12 distinct icons across the page** (7 Product Design + 5 Plant Engineering), chosen so nothing repeats within `/what-we-do` itself: Industrial Automation→`Cog`, Machine & Equipment Design→`Wrench`, Control Systems→`SlidersHorizontal`, Assembly Lines→`Factory`, Robotic Integration→`Bot`, Power Distribution Equipment→`CircuitBoard`, Embedded Products→`Cpu`; Piping→`Waypoints`, Electrical→`Zap`, Mechanical→`Settings2`, Instrumentation & Control→`Gauge`, Civil & Structural→`Building2`. (Verified all 12 exist in the installed `lucide-react` version.)
- **No photography** — same reasoning as every other page this build; icon-in-circle cards instead.
- **Plant Engineering deliverable lists render as a 2-column bulleted grid** (reusing the amber-dot list pattern already established) rather than card grids, since PRD explicitly calls these "discipline blocks with bulleted deliverables," distinct from Product Design's "card grid."
- **CTA band reuses the exact pattern from `ExpertiseCta.tsx`** (bg-petrol-700, bone heading, amber button) — "Looking for a Custom Solution?" → `/contact`.
- **This is the standalone `/what-we-do` page only** — Home page's own "What We Do (highlight)" teaser section (item 4 in §4.1, two feature blocks linking here) is separate, not-yet-built work and out of scope for this prompt.

## Files that will change
- **Create** `lib/data/product-design.ts`
- **Create** `lib/data/plant-engineering.ts`
- **Create** `components/sections/what-we-do/WhatWeDoHero.tsx`
- **Create** `components/sections/what-we-do/ProductDesignSection.tsx`
- **Create** `components/sections/what-we-do/PlantEngineeringSection.tsx`
- **Create** `components/sections/what-we-do/CustomSolutionCta.tsx`
- **Create** `app/what-we-do/page.tsx`

## Implementation requirements
- `app/what-we-do/page.tsx`: `buildMetadata({ title: "What We Do | Velcor Engineering", path: "/what-we-do" })`; renders `WhatWeDoHero` (owns the page's single `<h1>` — "What We Do"), `ProductDesignSection`, `PlantEngineeringSection`, `CustomSolutionCta`.
- `WhatWeDoHero`: eyebrow, `<h1>What We Do</h1>`, short intro paragraph positioning Product Design + Plant Engineering as the two halves of the offering.
- `ProductDesignSection`: `id="product-design"` with `scroll-mt-24`, eyebrow "Product Design", `<h2>`, then a responsive card grid (`sm:grid-cols-2 lg:grid-cols-3`) of the 7 items — icon circle, name, PRD-provided description.
- `PlantEngineeringSection`: `id="plant-engineering"` with `scroll-mt-24`, eyebrow "Plant Engineering", `<h2>`, then one block per discipline (`<h3>` + icon + 2-column deliverables list) — 5 blocks total, alternating background per block like `SectorSection` for visual rhythm across a long page.
- `CustomSolutionCta`: full-width petrol band, `<h2>Looking for a Custom Solution?</h2>`, short supporting line, `Button variant="accent"` → `/contact`.

## Security requirements
None — static content, no data, no secrets.

## Acceptance criteria
- [ ] Exactly one `<h1>` on the page ("What We Do").
- [ ] All 7 Product Design items from §5.2 present with their PRD-provided descriptions.
- [ ] All 5 Plant Engineering disciplines from §5.3 present, each with its full deliverable list (no items dropped).
- [ ] `#product-design` and `#plant-engineering` anchors resolve correctly (for future Home-page deep links).
- [ ] CTA band links to `/contact`.
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000/what-we-do` — confirm hero, Product Design card grid (7 cards), Plant Engineering discipline blocks (5, each with a full deliverables list), and the CTA band.
2. Click the Header's "What We Do" link — confirm it no longer 404s.
3. Click the Hero's "Explore Services" button on `/` — confirm it lands on `/what-we-do`.
4. Navigate directly to `/what-we-do#plant-engineering` — confirm it scrolls to that section with the heading clear of the sticky header.
5. Resize to mobile — confirm the card grid and deliverable lists collapse to single columns cleanly.
6. Inspect page source — exactly one `<h1>`.
