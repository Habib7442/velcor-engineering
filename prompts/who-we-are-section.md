# Prompt: Home — "Who We Are" section

## Goal
Build Home page section 2 (PRD §4.1 item 2) as its own component: a short company-intro paragraph, a supporting visual, and a "Learn More" link to `/about`. Continues the one-section-per-file convention established in `prompts/hero-section.md`.

## What it read
- `AGENTS.md` (architecture §3, code standards §8, Button/Link gotcha)
- `PRD.md` §4.1 item 2 ("Who We Are"), §6.1 (voice & tone), §6.2 (original-copy mandate), §8.1–8.2 (color/typography tokens)
- `components/sections/Hero.tsx` (current visual language, framer-motion pattern, Button usage)
- `app/globals.css` (Petrol/Amber/Graphite/Bone tokens, `--font-heading`/`--font-sans`)
- `components/ui/button.tsx` (variants: `default`, `accent`, `outline`, `secondary`, `ghost`, `link`)
- `public/assets/who_we_are.png` — supporting photo supplied for this section

## Decisions / assumptions
- **Use the supplied `public/assets/who_we_are.png`** as the section's supporting visual via `next/image`, framed in a rounded-3xl panel — no abstract SVG placeholder needed now that a real asset exists for this section.
- **Layout mirrors Hero's two-column pattern but reversed** (visual left, text right on `lg`, stacked on mobile) so the two sections don't read as identical blocks when scrolled past each other.
- **Copy is original first-pass copy**, not signed-off brand copy (per §6.2, no client copy supplied yet):
  - Eyebrow: "Who We Are"
  - Body: 2–3 sentences positioning Velcor as a multidisciplinary engineering partner (product design + plant engineering), covering breadth of disciplines and the "done right the first time" reliability angle already set in the Hero — no fabricated stats, years, or client counts (PRD §7 wants only real, verifiable proof, which lives in the later Proof/Trust band, not here).
  - Learn More link → `/about`.
- **No new company-facts data file.** §6.3 wants a single source of truth for name/address/phone reused across footer/About/Contact, but this section only needs a two-sentence positioning paragraph with no facts that repeat elsewhere yet. Introduce `lib/data/company.ts` when building whichever section first needs to share facts across files (likely Footer or About) rather than here.
- **Static, not animated.** Hero already carries the page's one big entrance animation; stacking another full stagger sequence immediately below it is visual noise. This section is a plain server component with a subtle CSS-only fade-in is skipped entirely — keep it simple and always rendered in final state.

## Files that will change
- **Create** `components/sections/WhoWeAre.tsx`
- **Modify** `app/page.tsx` — render `<WhoWeAre />` after `<Hero />`

## Implementation requirements
- `WhoWeAre` is a plain (server) component — no `"use client"`, no framer-motion.
- `<section>` on the default Bone background, two-column layout on `lg` (visual left, text right), stacked on mobile (visual below text on small screens for reading order).
- Text column: small uppercase eyebrow ("Who We Are", Petrol), one `<h2>` short headline (Fraunces/`font-heading`, Graphite), one `<p>` body paragraph (Inter, `text-muted-foreground`), then a "Learn More" link to `/about` using `Button` with `variant="ghost"` (or `variant="link"`) and a trailing `ArrowRight` icon from `lucide-react` — real `<a>` via `render={<Link href="/about" />}` and `nativeButton={false}` per the Button/Link gotcha in `AGENTS.md` §8.
- Visual column: `next/image` rendering `/assets/who_we_are.png` inside a rounded-3xl overflow-hidden panel, `object-cover`, with an explicit `sizes` prop (this is below-the-fold so no `priority`); alt text describes the image content (not empty/decorative, since it's meaningful content here, unlike Hero's background image).
- Exactly one `<h2>` in this section (Home page's only `<h1>` stays in Hero).
- Contrast: confirm Graphite-on-Bone body text meets WCAG 2.1 AA (PRD §8.4); no decorative-pattern contrast concern now that the visual is a photo.

## Security requirements
None — static content, no data, no secrets, no client-side JS beyond a plain link.

## Acceptance criteria
- [ ] `components/sections/WhoWeAre.tsx` exists; `app/page.tsx` renders `<Hero />` then `<WhoWeAre />`.
- [ ] Section has no `<h1>`; exactly one `<h2>`.
- [ ] "Learn More" is a real `<a>` (via `next/link`) resolving to `/about` — no `#` link.
- [ ] `who_we_are.png` renders via `next/image` with non-empty, descriptive alt text.
- [ ] Copy is original (not lifted from a competitor), matches PRD §6.1 tone, and makes no unverified claims (no stats/years/client counts).
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000`.
2. Scroll past the Hero and confirm the "Who We Are" section renders: eyebrow, headline, paragraph, "Learn More" link on the right; decorative panel on the left, on desktop widths.
3. Resize to a mobile width and confirm the columns stack with the visual panel below the text.
4. Click "Learn More" and confirm it navigates to `/about` (404 is expected today since that page doesn't exist yet — confirms the link target, not the destination page).
5. Inspect the page source and confirm the Home page has exactly one `<h1>` (still in Hero) and this section's `<h2>` is present.
