# Prompt: Full rebrand to DESIGN.md token system (Blue/Steel, monochromatic)

## Goal
Replace the Petrol+Amber design system (PRD §8.1, `globals.css`) with the Blue/Steel
monochromatic system in `DESIGN.md`, sampled directly from the real logo. Every page,
every component, PRD.md itself, all move to the new tokens. No visual trace of amber
or the old petrol/graphite/bone hexes should remain.

## What I read
- `DESIGN.md` in full (primitives, semantics, dark mode, type, space/radius/shadow/motion,
  component recipes, accessibility table, rules)
- `PRD.md` §8.1 (current Petrol+Amber spec) and §8.2 (typography)
- `app/globals.css` (current token architecture — Tailwind v4 CSS-first config via
  `@theme inline` + `:root`/`.dark`, no `tailwind.config.js` in this project)
- Every file referencing `petrol`/`amber`/`graphite`/`bone` — 36 files, ~150 occurrences
  (full inventory via grep, not sampled)
- `components/ui/button.tsx` and the `Input`/`Label`/`Select` primitives — confirmed
  they consume only semantic vars (`--primary`, `--accent`, `--ring`, `--border`,
  `--destructive`, `--muted-foreground`) and never raw `petrol-*`/`amber-*` classes, so
  most of the 36 files only need their brand-named literal classes renamed — everything
  routed through the semantic layer is fixed by editing `globals.css` alone

## Decisions
- **Tailwind v4 CSS-first, not a `tailwind.config.js`** — DESIGN.md §7's JS config gets
  translated into this project's existing `@theme inline` / `:root` / `.dark` pattern in
  `globals.css`, matching the current architecture exactly.
- **Radius and shadow are token-only changes, not per-component edits.** The current
  `--radius-sm/md/lg/xl/2xl/3xl/4xl` scale is derived from one `--radius` base via
  multipliers; I'm replacing it with DESIGN's fixed, capped scale (`sm:2px md:4px
  lg:8px`, everything above `lg` clamped to `8px` — "never round past 8px" is a hard
  DESIGN rule) so every existing `rounded-2xl`/`rounded-3xl` in JSX automatically lands
  at 8px without touching ~20 files that use them. `rounded-full` (small circular icon
  chips, buttons) is untouched — that's a circle, not the rectangle-radius DESIGN is
  warning about. Shadows: `--shadow-sm/md/lg/xl` get redefined with DESIGN's blue-tinted
  rgba values directly in `@theme inline`, which overrides Tailwind's built-in `shadow-*`
  utilities — so the 2 files using `shadow-lg`/`shadow-xl` need no edits either.
- **Status colors** (`--destructive`, `--success`, `--warning`, `--info`) keep their
  existing variable *names* (shadcn/Base UI convention, consumed by `aria-invalid`
  states etc.) but get DESIGN §2.3's actual hex values — a deliberately different,
  cooler-pulled hue from brand blue, per DESIGN's own reasoning.
- **The "accent" and "default" button variants become two blue weights, not two hues.**
  DESIGN has no second hue, but the site currently uses `default` (petrol, e.g. "Explore
  Services") vs `accent` (amber, e.g. "Talk to Us") to signal secondary-vs-primary CTA
  urgency. I'm preserving that *hierarchy* — not the color count — by giving `accent`
  DESIGN's own `.btn-primary` recipe (`blue-600 → 700 → 800`, white text) and shifting
  `default` one step darker (`blue-800 → 900 → 950`, white text). Both buttons drop the
  old dark-graphite-text-on-amber rule entirely — DESIGN's accessibility table shows
  white on blue-600 clears AAA (8.07), so no reason to keep dark text on the accent
  button anymore.
- **`bone` (#F7F6F2) is retired, not remapped to a new named token.** Every `bg-bone`/
  `text-bone` usage in this codebase is a full-bleed page/section surface or text-on-dark,
  which is exactly DESIGN's `--surface-page: #FFFFFF` / `--text-on-brand: #FFFFFF` — i.e.
  literal white, not a new tinted neutral. So `bone` → plain Tailwind `white`, and
  `--background` in `globals.css` becomes `#FFFFFF`.
- **Typography:** swap `Fraunces` → `Saira` (DESIGN's first-listed display echo of the
  wordmark) via `next/font/google`, same as the current `next/font` setup in
  `app/layout.tsx`. Keep `Inter` for body — DESIGN specifies it too, no change needed.
  **Not** adding `JetBrains Mono` — nothing on the current 6 pages needs a monospace
  treatment (no part numbers/spec tables yet); I'll note it in PRD §8.2 as reserved for
  when that content type shows up, rather than loading an unused font.
- **Dark mode tokens get replaced 1:1 with DESIGN §3's dark block** (the `.dark` class
  scaffold already exists in `globals.css` from the shadcn setup) — but the site has no
  dark-mode toggle UI anywhere today, so this is future-readiness, not a new visible
  feature. Flagging so it's not mistaken for scope creep.
- **Out of scope, flagging for a separate decision:** DESIGN.md's title metadata lists
  tagline *"Beyond Boundaries"* (read directly off the logo lockup). I'm not inserting
  it into Hero/Footer copy in this pass — that's a content/copy decision (PRD §6.2
  original-copy mandate), not a token-system one. Say the word if you want it woven in
  as a fast-follow (natural spots: footer under the logo, or a hero eyebrow).

## Token rename map (globals.css primitives → new values, and the JSX class renames it drives)

| Old primitive | New primitive | Old role | Files affected |
|---|---|---|---|
| `graphite` (bare) | `blue-900` | primary text/headings ink | ~20 files, mechanical `text-graphite` → `text-blue-900` |
| `petrol` (bare) | `blue-600` | link/eyebrow/active-nav brand color | Header, WhoWeAre, WhatWeDoHighlight, OurExpertise, Faq, hero pages (×7) |
| `petrol-50` | `blue-50` | tinted section backgrounds | Faq, OurExpertise, SectorSection, PlantEngineeringSection, OpenRolesEmptyState, BenefitsSection, MissionVision |
| `petrol-100` | `blue-100` (light bg) / `steel-300` (text on dark) | footer link chips vs. footer body text on dark — split by context | Footer, LifeAtVelcor, JoinTeamCta, FinalCta, ExpertiseCta, CustomSolutionCta |
| `petrol-500/20`, `/30` | `blue-500/20`, `/30` | decorative washes (Footer watermark, Preloader track) | Footer, Preloader |
| `petrol-700` (`bg-`) | `blue-900` | surface fill (Footer/Preloader/CTA-band backgrounds) | Footer, Preloader, FinalCta, JoinTeamCta, ExpertiseCta, CustomSolutionCta, ResumeApplicationForm |
| `petrol-700` (`text-`) | `blue-800` | icon glyph on light chip / chevrons | ContactInfo, CultureValues, ProductDesignSection, PlantEngineeringSection, OpenRolesEmptyState, Faq, BenefitsSection, OurExpertise, SectorSection |
| `petrol-800` (hover text) | `blue-700` | link hover state | WhoWeAre, WhatWeDoHighlight |
| `petrol-800` (VapiAssistant hover bg) | `blue-950` | dark-surface hover, one step past base | VapiAssistant |
| `petrol/5`, `/20`, `/30` (opacity) | `blue-600/5`, `/20`, `/30` | subtle badge fill/border | Hero, ExpertiseHero |
| `amber` (bare) | `blue-500` | the one "brightest" accent moment | VapiAssistant, Preloader |
| `amber-100` | `blue-100` | icon chip background | 8 files (OurExpertise, WhatWeDoHighlight, CultureValues, ProductDesignSection, PlantEngineeringSection, OpenRolesEmptyState, BenefitsSection, SectorSection) |
| `amber-700` | `blue-600` | inline arrow icon paired with a link | WhoWeAre, WhatWeDoHighlight, OurExpertise |
| `amber/40`, `/50` | `blue-500/40`, `/50` | ping ring, focus ring | VapiAssistant |
| `bone` (all forms) | `white` | page/section surface, text-on-dark | ~18 files |
| `graphite/40` | `blue-900/40` | dialog backdrop overlay | Header |

`--muted`, `--muted-foreground`, `--border`, `--ring`, `--secondary`, `--link`,
`--primary`, `--accent`, `--destructive`, `--success`, `--warning`, `--info` are all
repointed inside `globals.css` only — no JSX in any file references these old
petrol/amber hexes directly, so zero component edits needed for that layer.

## Files that will change
- **Modify** `app/globals.css` — full primitive + semantic + dark-mode token replacement, capped radius scale, blue-tinted shadows, per DESIGN.md §2–§5
- **Modify** `app/layout.tsx` — `Fraunces` → `Saira` via `next/font/google`
- **Modify** 36 component/page files — mechanical class renames per the table above (Header, Footer, Preloader, VapiAssistant, Faq, FinalCta, WhatWeDoHighlight, WhoWeAre, OurExpertise, and every `about/careers/contact/our-expertise/what-we-do` section component, `ui/label.tsx`, `privacy-policy`/`terms` pages)
- **Modify** `PRD.md` §8.1 (replace Petrol+Amber spec with the Blue/Steel system + link to `DESIGN.md`) and §8.2 (note the Saira/Inter pairing, reserve JetBrains Mono)

## Security requirements
None — CSS tokens, font loading, and Tailwind class renames only.

## Acceptance criteria
- [ ] `grep -rn "petrol\|amber\|graphite\|#F7F6F2\|#E8912D\|#0E3A46" app components lib PRD.md` returns nothing
- [ ] Every page still renders with correct visual hierarchy (headings, links, CTAs, icon chips) — just re-hued
- [ ] Primary vs. accent buttons remain visually distinguishable (two blue weights, both white text)
- [ ] No `rounded-*` element on the live site exceeds an 8px visual radius (circles/`rounded-full` excluded)
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` all pass
- [ ] PRD.md §8.1/§8.2 match what's actually in `globals.css` (no doc/code drift)

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000`.
2. Compare Header/Footer/Hero/FAQ/CTA bands against `DESIGN.md` §2–3 hex values — no amber anywhere, all one hue family.
3. Confirm "Explore Services" (default) and "Talk to Us" (accent) buttons are still visually distinct from each other.
4. Check a card (Our Expertise carousel, service cards) and the mobile nav dialog — corners should read tight/engineered, not the old pill-ish rounded-2xl look.
5. Click through About, Careers, Contact, What We Do, Our Expertise — confirm no leftover graphite/bone/amber classes visually (spot-check against `DESIGN.md`'s accessibility table for text/bg pairs).
6. Run the contact form to an invalid state — confirm the (untouched-name, re-valued) destructive/error styling still reads correctly.
