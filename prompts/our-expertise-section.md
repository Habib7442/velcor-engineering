# Prompt: Home — "Our Expertise" carousel/grid section

## Goal
Build Home page section 3 (PRD §4.1 item 3): a swipeable, keyboard-navigable carousel of cards for all 12 sectors in PRD §5.1, each linking to the matching anchor on `/our-expertise` (`/our-expertise#<slug>`).

## What it read
- `AGENTS.md` §3 (architecture — sectors explicitly called out as belonging in `lib/data/`, not inline)
- `PRD.md` §4.1 item 3 (Home carousel spec), §4.3 (`/our-expertise` — confirms the anchor IDs this carousel must match), §5.1 (the 12 sectors), §6.1–6.2 (tone/original-copy), §8.1 (color/AA)
- `components/sections/about/CultureValues.tsx` (existing icon-card pattern: icon in an `amber-100` circle, name, one-sentence description — reusing this for consistency)
- `package.json` — **no carousel library installed** (no embla, no swiper)
- `public/assets/` — no sector photography exists for any of the 12 sectors

## Decisions / assumptions
- **No new dependency for the carousel.** This is a single carousel used once on the site (the `/our-expertise` page itself is an anchored-sections list per §4.3, not a carousel). Pulling in `embla-carousel-react` for one usage is more than a marketing site needs — AGENTS.md §8 says no over-engineering. Instead: a native horizontal scroll container (`overflow-x-auto`, CSS `scroll-snap-type: x mandatory`, cards `scroll-snap-align: start`), which is swipeable on touch by default, plus explicit Prev/Next buttons and `ArrowLeft`/`ArrowRight` keydown handling on the scroll region for keyboard access — satisfies PRD's "swipeable on touch and keyboard-navigable" without a new package.
- **Sectors go in `lib/data/sectors.ts`**, not inlined in the component — unlike Hero's/WhoWeAre's one-off `SERVICES` arrays, sectors are reused by a second consumer (the future `/our-expertise` page needs the same list + slugs for its anchors), and AGENTS.md §3 explicitly names "expertise sectors" as content that belongs in `lib/data/`.
- **No sector photography exists**, so each card uses a `lucide-react` icon in an `amber-100` circle — the same visual pattern already established in `CultureValues.tsx` — instead of images. Swappable for real photography later without restructuring, same reasoning as every prior "no asset yet" decision this build.
- **Slugs are kebab-case and will be the `/our-expertise` anchor IDs**: `water-treatment`, `industrial-automation`, `oil-gas`, `utilities`, `power`, `power-distribution-equipment`, `automotive-engineering`, `electronic-engineering`, `mining-engineering`, `power-system-studies`, `analysis-simulation`, `solar-power-plant`.
- **Card copy is original**, one sentence each, technical/specific per §6.1 (drafted below, may be refined slightly during implementation but keeping the same claims/scope).
- **Card links point to `/our-expertise#<slug>`** — 404 expected today since that page doesn't exist yet, consistent with every other forward-reference already shipped (About's Careers CTA, Home's Hero CTAs, etc.).

## Files that will change
- **Create** `lib/data/sectors.ts`
- **Create** `components/sections/OurExpertise.tsx`
- **Modify** `app/page.tsx` — render `<OurExpertise />` after `<WhoWeAre />`

## Implementation requirements

**`lib/data/sectors.ts`**
- Exports a `Sector` type (`slug`, `name`, `blurb`, `icon: LucideIcon`) and a `SECTORS: Sector[]` array of all 12, e.g.:
  - Water Treatment (`Droplet`) — "Process design for treatment, filtration, and distribution systems that meet discharge and potable-water standards."
  - Industrial Automation (`Cog`) — "Control architecture and automation design that keeps production lines running with minimal downtime."
  - Oil & Gas (`Flame`) — "Piping, process, and safety systems engineered to upstream and downstream industry codes."
  - Utilities (`Gauge`) — "Engineering support for utility infrastructure — supply, metering, and distribution — built for continuous service."
  - Power (`Zap`) — "Generation and transmission engineering, from single-line diagrams through commissioning support."
  - Power Distribution Equipment (`CircuitBoard`) — "Switchgear, panel, and distribution equipment design specified for the load and fault conditions of your site."
  - Automotive Engineering (`Car`) — "Component and systems engineering for automotive manufacturing and test environments."
  - Electronic Engineering (`Cpu`) — "Circuit and embedded hardware design for equipment that has to perform outside a lab."
  - Mining Engineering (`Pickaxe`) — "Plant and equipment engineering for extraction and processing operations in demanding site conditions."
  - Power System Studies (`LineChart`) — "Load flow, short-circuit, and protection coordination studies that validate a system before it's built."
  - Analysis & Simulation (`FlaskConical`) — "Structural, thermal, and process simulation used to verify a design before it reaches fabrication."
  - Solar Power Plant (`Sun`) — "Utility and industrial-scale solar engineering, from site layout through interconnection."

**`OurExpertise`**
- Client component (`"use client"` — needs a ref + scroll handlers).
- Section header: eyebrow ("Our Expertise"), `<h2>` ("Engineering coverage across twelve sectors." or similar), on `bg-petrol-50` (matches `MissionVision`'s subtle-section-background tone, per §8.1's palette).
- Scroll region: `overflow-x-auto` flex row, `scroll-snap-type: x mandatory`, `role="region"` `aria-label="Our Expertise sectors"`, `tabIndex={0}`, `onKeyDown` handling `ArrowLeft`/`ArrowRight` to `scrollBy` one card width; hide the native scrollbar (`scrollbar-width: none` / `::-webkit-scrollbar { display: none }`) since Prev/Next buttons + swipe are the intended controls.
- Each card: `scroll-snap-align: start`, fixed width (e.g. `w-72 shrink-0`), white surface, icon circle, `<h3>` sector name, blurb `<p>`, and a "Read More" link (`Button variant="link"`, petrol text + amber arrow icon, same treatment as `WhoWeAre`'s "Learn More") to `/our-expertise#<slug>`.
- Prev/Next buttons: `Button variant="outline" size="icon"` with `ChevronLeft`/`ChevronRight`, `aria-label="Previous sector"` / `aria-label="Next sector"`, calling the same `scrollBy` helper as the keyboard handler.
- Respect `prefers-reduced-motion` for the scroll behavior (`scrollBy({ behavior: shouldReduceMotion ? "auto" : "smooth" })`, via `useReducedMotion` from `framer-motion` already used in `Hero.tsx` — no new dependency).

## Security requirements
None — static content, no data, no secrets.

## Acceptance criteria
- [ ] `lib/data/sectors.ts` exports all 12 sectors from PRD §5.1, each with a unique kebab-case `slug`.
- [ ] `components/sections/OurExpertise.tsx` renders one card per sector; `app/page.tsx` renders it after `<WhoWeAre />`.
- [ ] Carousel is swipeable via touch (native scroll) and operable via keyboard (Tab to the region, then `ArrowLeft`/`ArrowRight`; Prev/Next buttons also reachable via Tab).
- [ ] Every card's "Read More" link resolves to `/our-expertise#<slug>` — no bare `#` links.
- [ ] No `<h1>` introduced; section's own heading is `<h2>`.
- [ ] Copy is original, matches §6.1 tone, no fabricated stats/claims.
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000`, scroll to "Our Expertise".
2. On a touch device or DevTools touch emulation, swipe the carousel left/right and confirm cards snap into place.
3. Click Prev/Next buttons and confirm the carousel scrolls by one card.
4. Tab to the carousel region with the keyboard and press `ArrowRight`/`ArrowLeft` — confirm it scrolls.
5. Click a card's "Read More" link and confirm it navigates to `/our-expertise#<slug>` (404 expected today).
6. Resize to mobile width and confirm cards remain a comfortable swipeable width, not squeezed.
