# Prompt: Hero section + typography + component-splitting convention

## Goal
Build the Home page Hero section as its own component, establish the section-per-file convention (`components/sections/Hero.tsx`, `About.tsx`, etc. — one file per prompt, built in order), add a display/body font pairing, and wire up `framer-motion` for entrance animation.

## What it read
- `AGENTS.md` (architecture, tech stack, code standards)
- `PRD.md` §4.1 (Home → Hero spec), §8.2 (typography), §8.4 (reduced-motion requirement), §6.2 (original-copy mandate)
- `app/globals.css` (the Petrol/Amber design tokens just set up)
- `app/layout.tsx`, `app/page.tsx` (current state)
- `components/ui/button.tsx` — confirmed it wraps `@base-ui/react`'s `Button`, which is polymorphic via a `render` prop (`render={<Link href="…" />}`), not `asChild`

## Decisions / assumptions
- **Design references supplied mid-task** (Threekit, Northpeak marketing sites) reset the visual direction from the original dark full-bleed gradient concept to: light background, editorial serif display headline, a rounded pill badge above the headline, a solid-dark + outline button pair, and a framed rounded-corner visual panel in a dark brand color as the secondary focal point. This reads more premium/consultative and still fits "professional, technical, confident" (PRD §6.1) — arguably better than the original blueprint-gradient concept.
- **Fonts:** add **Fraunces** (`next/font/google`, a warm high-contrast serif) as the display/heading font (`--font-heading`), keep **Inter** as the body font (`--font-sans`) — already installed. Removing the unused **Geist Sans** and **Geist Mono** from `app/layout.tsx`: they were create-next-app leftovers, not referenced anywhere meaningful, and loading extra font families works against the Lighthouse performance budget (PRD §9.2).
- **No real hero video, photography, client logos, or verified stats yet.** Rather than a background video (PRD §4.1) or a fabricated logo/stat strip (PRD explicitly wants only real, permissioned proof — §7), the hero's visual panel is an abstract engineering-schematic graphic (dashed grid + nodes) in Petrol with an Amber accent, built from CSS/SVG — no external assets needed, and it can be swapped for real photography later without restructuring. Logos and stats stay out of the hero, deferred to the dedicated Proof/Trust band section (PRD §4.1 item 5, a later component).
- **Headline/subhead copy is original first-pass copy**, not final signed-off brand copy — reasonable given PRD §6.2's original-copy mandate and no client-supplied copy yet:
  - Badge: "Product Design — Plant Engineering"
  - Headline: "Multidisciplinary engineering, built to hold up under review."
  - Subhead: "Velcor Engineering delivers product design and plant engineering — automation, piping, electrical, mechanical, instrumentation, and civil — for industrial teams who need it done right the first time."
  - One floating detail chip on the visual panel: "Global Engineering Partner" — a true positioning statement, not a fabricated metric or unverified certification claim.
- **CTAs** per PRD §4.1: primary "Explore Services" → `/what-we-do` (solid Petrol, works now that the background is light), secondary "Talk to Us" → `/contact` (outline, Graphite border/text). Both routes already exist as valid pages in the site map even though the pages themselves aren't built yet — acceptable per "build in order" (design system → core UI screens next).
- **Animation:** framer-motion `useReducedMotion()` (reads `prefers-reduced-motion` automatically) gates the entrance animation — satisfies PRD §8.4 without hand-rolled media-query logic.

## Files that will change
- **Install** `framer-motion` (dependency)
- **Create** `components/sections/Hero.tsx`
- **Modify** `app/layout.tsx` — swap Geist Sans/Mono for Space Grotesk, keep Inter
- **Modify** `app/globals.css` — point `--font-heading` at the new Space Grotesk variable instead of aliasing to `--font-sans`
- **Modify** `app/page.tsx` — replace the create-next-app placeholder markup with `<Hero />`

## Implementation requirements
- `Hero` is a client component (`"use client"` — needed for `framer-motion`).
- `<section>` on the default Bone background, two-column layout on `lg` (text left, visual panel right), stacked on mobile.
- Text column: rounded-full badge/pill ("Product Design — Plant Engineering"), single `<h1>` headline (Fraunces, large/bold, Graphite), subhead `<p>` (Inter, muted-foreground), CTA row.
- Visual column: rounded-3xl Petrol panel with a decorative SVG dashed-grid + node pattern (`aria-hidden`) in Amber at low opacity, plus one floating Bone pill chip ("Global Engineering Partner") anchored to a corner with a small `lucide-react` icon.
- Two CTAs using the existing `Button` component: `render={<Link href="…" />}` (Base UI's polymorphic prop, not `asChild`) — primary solid (`variant="default"`, uses the `--primary`/Petrol token as-is), secondary `variant="outline"`.
- Entrance animation: staggered fade + slide-up on the badge/headline/subhead/CTAs/panel, `initial`/`animate` variants, skipped (render in final state, no motion) when `useReducedMotion()` is true.
- Contrast: Graphite text on Bone background (already the site default, high contrast); confirm the floating chip (Graphite text on Bone) and badge pill (Petrol text on a pale Petrol tint) both read clearly.

## Security requirements
None — static content, client-side animation only, no data, no secrets.

## Acceptance criteria
- [ ] `framer-motion` installed and used only in `Hero.tsx` for this task.
- [ ] `components/sections/Hero.tsx` exists and is the only place Hero markup lives; `app/page.tsx` just renders `<Hero />`.
- [ ] Exactly one `<h1>` on the home page.
- [ ] Both CTAs are real `<a>` tags (via `next/link`) resolving to `/what-we-do` and `/contact` — no `#` links.
- [ ] Heading font (Fraunces, serif) visibly distinct from body font (Inter) in the rendered page.
- [ ] With OS/browser reduced-motion enabled, the hero renders in its final state with no animation.
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000`.
2. Confirm the hero renders with the gradient background, eyebrow/headline/subhead, and two buttons, and that the entrance animation plays once on load.
3. In DevTools → Rendering → "Emulate CSS media feature `prefers-reduced-motion`" → `reduce`, reload, and confirm the hero appears instantly with no animation.
4. Click both CTAs and confirm they navigate to `/what-we-do` and `/contact` (404 is expected today since those pages don't exist yet — confirms the link target, not the destination page).
5. Inspect the page source and confirm only one `<h1>`.
