# Prompt: Always-dark header + mega-menu dropdowns

## Goal
Restructure `Header.tsx` to match the layout/behavior you referenced (permanently dark bar,
active-item underline, dropdown chevron, mega-menu panel) — **using our own Blue/Steel
palette and our own logo**, not the reference screenshot's navy+amber/serif treatment. Add
working mega-menu dropdowns to "Our Expertise" and "What We Do" built from data that
already exists in the codebase — no invented services.

## What I read
- Your reference screenshot: solid dark header (not transparent-over-hero), centered nav,
  one item with an active underline + open chevron, a light mega-menu panel below with
  category columns, accent CTA button top-right
- Current `Header.tsx` — transparent-over-hero header that turns `bg-white/95` on scroll;
  logo uses the light-background PNG; nav links are dark-on-transparent
- `lib/nav-links.ts`, `lib/data/sectors.ts` (13 sectors), `lib/data/product-design.ts` (7
  items), `lib/data/plant-engineering.ts` (5 disciplines) — the real content available to
  populate dropdowns
- `node_modules/@base-ui/react/navigation-menu` — confirmed this exact primitive exists
  (`Root/List/Item/Trigger/Content/Link/Portal/Positioner/Popup/Viewport`), already a
  project dependency via `@base-ui/react` (same package `Dialog`/`Button` come from), built
  for exactly this (keyboard nav, ARIA, hover+click, viewport-sized popup animation) — no
  new dependency needed
- `SectorSection.tsx` — confirmed every sector already has a working page anchor
  (`/our-expertise#slug`); `what-we-do` page only has two anchors (`#product-design`,
  `#plant-engineering`), not one per item

## Decisions
- **Header is now permanently `bg-blue-900`** on every page, not transparent-over-hero. This
  drops the `scrolled` state/scroll-listener entirely (no longer needed) — simpler code, not
  more. Logo switches to `/logo-horizontal-white.png` (already exists, built for this exact
  case). Nav link text goes `steel-300` default / `white` hover / `white` + underline for
  the active page or open dropdown.
- **Color stays ours.** Active-state underline and dropdown chevron use `blue-500`/`blue-400`,
  never the reference's amber. CTA button keeps our existing `accent` variant — no new button
  style.
- **Mega-menu panels are light** (`bg-white`), same as your reference — a dark bar with a
  light dropdown reads better for dense multi-column text than an all-dark panel, and matches
  how the rest of the site already treats content-dense white surfaces. Column headers
  `blue-900`, items `steel-500` → `blue-600` on hover.
- **Home, About, Careers, Contact stay plain links** — no dropdown, nothing to group.
- **"Our Expertise" dropdown** — all 13 sectors, real anchors, split into 3 columns. This
  grouping is new (the page itself has no such grouping today), so flagging the split for
  your review rather than deciding silently:
  - **Energy & Power:** Power, Power Distribution Equipment, Power System Studies, Solar Power Plant
  - **Industrial & Process:** Industrial Automation, Oil & Gas, Water Treatment, Utilities, Mining Engineering
  - **Specialized Engineering:** Automotive Engineering, Electronic Engineering, Analysis & Simulation, Software Development
  Column labels are new copy (short, descriptive); sector names themselves are pulled from
  `SECTORS`, not retyped, so they can't drift out of sync.
- **"What We Do" dropdown** — 2 columns, "Product Design" and "Plant Engineering", each
  listing its real items from `PRODUCT_DESIGN_ITEMS`/`PLANT_ENGINEERING_DISCIPLINES`. Since
  individual items don't have their own page anchors (only the two section anchors do), every
  item in a column links to that column's shared anchor — clicking any Product Design item
  jumps to `#product-design`. I won't fabricate per-item anchors that don't exist.
- **Mobile drawer stays as-is** — flat link list, no mega-menu. Collapsing 13 sectors into an
  accordion inside the existing slide-out panel is a reasonable follow-up but wasn't asked
  for and adds real scope; the existing flat list already works and is touch-friendly.
- **Data lives in a new `lib/data/nav-menu.ts`**, not hardcoded in `Header.tsx` — it maps
  column labels to arrays of slugs/names, cross-referencing `SECTORS`/`PRODUCT_DESIGN_ITEMS`/
  `PLANT_ENGINEERING_DISCIPLINES` by identity so a future rename anywhere else can't
  silently desync the menu.

## Files that will change
- **Create** `lib/data/nav-menu.ts` — the column groupings described above
- **Modify** `components/layout/Header.tsx` — always-dark bar, new logo, `NavigationMenu`-based
  desktop nav with two mega-menu dropdowns, restyled active/hover states; mobile `Dialog` drawer
  unchanged except NAV_LINKS rendering (still flat)

## Security requirements
None — client-side nav UI only, no data fetching, no user input.

## Acceptance criteria
- [ ] Header renders solid `blue-900` on every page, at every scroll position
- [ ] "Our Expertise" and "What We Do" open a light mega-menu panel on hover/click/focus;
      every sector link and every Product Design/Plant Engineering link resolves to the
      correct existing anchor (no dead links, no `#`-only hrefs)
- [ ] Full keyboard operability: Tab reaches triggers, Enter/Space opens, Arrow keys move
      within an open panel, Escape closes and returns focus to the trigger
- [ ] Home/About/Careers/Contact remain plain links, unchanged behavior
- [ ] Mobile hamburger drawer still lists all 6 top-level pages, unaffected by the dropdown work
- [ ] No amber/orange anywhere; only `blue-*`/`steel-*`/`white`
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` all pass

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000`.
2. Confirm the header is solid dark navy immediately on load (not transparent over the hero), on Home and on an inner page like About.
3. Hover "Our Expertise" — confirm the 3-column panel opens, all 13 sectors are present once total, and clicking one navigates to and scrolls to its section on `/our-expertise`.
4. Hover "What We Do" — confirm both columns list the right items and every link lands on the right section of `/what-we-do`.
5. Keyboard-only: Tab to "Our Expertise", press Enter to open, Arrow-key through items, Escape to close and confirm focus returns to the trigger.
6. Resize to mobile width — confirm the hamburger drawer still opens and lists all 6 pages with no dropdown/mega-menu complexity.
