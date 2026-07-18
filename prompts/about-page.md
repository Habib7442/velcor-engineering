# Prompt: About page (`/about`)

## Goal
Build the About page end to end per PRD §4.2: Hero banner, Mission & Vision, Our Promise, Culture & Values (6 cards), Life at Velcor, a "Join Our Growing Team" CTA, and a site-wide Footer (currently missing entirely, and required as the last item on both the Home and About specs).

## What it read
- `AGENTS.md` (architecture §3, code standards §8, Button/Link gotcha)
- `PRD.md` §3.1 (global nav/footer spec), §4.2 (About spec), §6.1–6.2 (voice/tone, original-copy mandate), §6.3 (company facts single source), §7 (trust/proof — no fabricated stats), §8.1 (color system + AA rules), §16 (open questions)
- `components/sections/Hero.tsx`, `components/sections/WhoWeAre.tsx` (established visual language, Button/Link pattern, amber-contrast lessons just fixed in WhoWeAre)
- `components/layout/Header.tsx` (nav links, existing route list)
- `lib/seo.ts` (`buildMetadata`, `breadcrumbJsonLd` signatures)
- `app/layout.tsx` (confirmed there is no `Footer` anywhere yet — it's not just missing from Home, it doesn't exist)
- `public/assets/` — only `who_we_are.png` exists, already used on Home

## Decisions / assumptions
- **Footer is scoped minimally for now.** PRD §3.1 wants Logo+tagline, Company links, a Contact block (email/phone/addresses), social links, and a newsletter signup. Two of those are blocked on things this task shouldn't guess at:
  - Phone number and addresses depend on target geography, which is PRD §16 open question #2 (unresolved) — inventing a placeholder address would violate §4.2's own acceptance criterion ("consistent company facts... match Contact page — no discrepancies") the moment a real address is added later.
  - Newsletter signup needs the `/api/newsletter` route, Supabase wiring, and a captcha provider — AGENTS.md §4 says explicitly to ask before wiring captcha into any form; that's a separate task, not a silent add-on here.
  - **This build:** logo + tagline, the six primary nav links (reusing `Header`'s `NAV_LINKS`), and a copyright line with a dynamic current year. No contact block, no social icons, no newsletter form. Follow-up task once addresses/phone/captcha are decided.
- **No second photo asset exists.** "Life at Velcor" (PRD item 5) asks for "culture copy + image(s)," but only `who_we_are.png` exists and it's already used on Home — reusing the identical photo on a second page reads as a content gap to anyone who's just seen it. Instead, "Life at Velcor" pairs culture copy with a Petrol panel of short qualitative callouts (e.g. "Cross-disciplinary teams," "Direct client access," "Ownership from concept to commissioning") — descriptive claims about how the firm works, not fabricated metrics, so they don't run into PRD §7's proof/verifiability bar (that bar applies to quantitative stats/logos, which stay in the dedicated Proof/Trust band on Home).
- **New subfolder `components/sections/about/`.** Home's sections live flat in `components/sections/` because there was only one page; a second page needs a namespaced folder so `Hero.tsx`/`AboutHero.tsx` etc. don't collide or get confused. Files: `AboutHero.tsx`, `MissionVision.tsx`, `OurPromise.tsx`, `CultureValues.tsx`, `LifeAtVelcor.tsx`, `JoinTeamCta.tsx`.
- **Culture & Values copy is original**, technical/B2B tone (§6.1), one sentence each, no filler — six cards for Collaborative, Inclusive, Innovative, Excellence, Impact-Driven, Integrity, each with a `lucide-react` icon (Users, HandHeart, Lightbulb, Award, Target, ShieldCheck respectively).
- **Amber-contrast rule applied from the start** (per the fix just made in `WhoWeAre.tsx`): amber only on large/graphical elements (icon fills ≥3:1, backgrounds, CTA buttons with dark text) — never as small/normal-weight body or label text on bone. Value-card icons sit in an `amber-100` tinted circle with a `petrol`/`graphite` icon glyph, not amber text.
- **CTA band background:** "Join Our Growing Team" band uses `bg-petrol-700` (passes AA per §8.1's table) with bone text and an amber CTA button (amber fill + graphite text, per the accessibility rule for amber buttons).
- **Mission/Vision/Promise copy is original first-pass copy**, not signed-off brand copy (no client copy supplied yet) — see full text list in Implementation requirements.

## Files that will change
- **Create** `app/about/page.tsx`
- **Create** `components/sections/about/AboutHero.tsx`
- **Create** `components/sections/about/MissionVision.tsx`
- **Create** `components/sections/about/OurPromise.tsx`
- **Create** `components/sections/about/CultureValues.tsx`
- **Create** `components/sections/about/LifeAtVelcor.tsx`
- **Create** `components/sections/about/JoinTeamCta.tsx`
- **Create** `components/layout/Footer.tsx`
- **Modify** `app/layout.tsx` — render `<Footer />` after `{children}` (this also completes Home's missing item 9)

## Implementation requirements

**`app/about/page.tsx`**
- `metadata` via `buildMetadata({ title: "About Velcor Engineering | ...", description: "...", path: "/about" })`.
- Renders the six section components in PRD order inside `<main>`.
- Emits `breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])` via a `<script type="application/ld+json">`, matching the pattern `organizationJsonLd()` uses in `app/layout.tsx`.

**`AboutHero`**
- Plain (server) component, banner-style: eyebrow ("About Velcor"), `<h1>` headline (company positioning, e.g. "Engineering depth, without the vendor hand-offs."), one intro paragraph. Bone background, no photo needed (keeps this distinct from Home's photographic hero).

**`MissionVision`**
- Two side-by-side blocks (stack on mobile): Mission and Vision, each a short label + 1–2 sentence statement. Original copy:
  - Mission: "To give industrial teams an engineering partner who covers the full span of a project — product design through plant engineering — without handing them off between vendors."
  - Vision: "To be the firm known for the same result on every project: work that holds up under review, delivered on the schedule we committed to."

**`OurPromise`**
- Short commitment statement in a single centered or left-aligned block, one sentence: "We commit to calculations you can audit, schedules we hold ourselves to, and drawings issued for construction — not just for review."

**`CultureValues`**
- 6-card grid (`grid-cols-2 lg:grid-cols-3` or similar), each card: icon in an `amber-100` circle, value name (`<h3>`), one-sentence original description. Cards: Collaborative, Inclusive, Innovative, Excellence, Impact-Driven, Integrity (exact copy drafted in Decisions above — to be finalized inline during implementation, following the same tone as Hero/WhoWeAre).

**`LifeAtVelcor`**
- Two-column: culture copy (2 short paragraphs) + a Petrol panel with 3 qualitative callout chips (amber dot + bone text, reusing the same list pattern as `WhoWeAre`'s `SERVICES` list but on a dark panel so bone-on-petrol contrast applies instead of graphite-on-bone).

**`JoinTeamCta`**
- Full-width `bg-petrol-700` band, bone `<h2>` ("Join Our Growing Team"), short supporting line, one amber `Button` (`variant="accent"`, dark text already handled by the existing variant) linking to `/careers` via `render={<Link href="/careers" />}` + `nativeButton={false}`.

**`Footer`**
- `<footer>` on `bg-petrol-700` (per §8.1's 60/30/10 ratio — footer is a primary-color surface) with bone/petrol-100 text.
- Logo + tagline ("Velcor Engineering" wordmark matching `Header`'s treatment, colors inverted for dark background).
- Nav column reusing the same six routes as `Header.NAV_LINKS` (Home, About, Our Expertise, What We Do, Careers, Contact).
- Copyright line: `© {new Date().getFullYear()} Velcor Engineering. All rights reserved.`
- No contact block, no social icons, no newsletter form (see Decisions above).

## Security requirements
None — every new piece is static content/links; no forms, no data, no secrets.

## Acceptance criteria
- [ ] `/about` renders all 6 PRD sections in order, ending with the shared `Footer`.
- [ ] Exactly one `<h1>` on the About page (in `AboutHero`).
- [ ] "Join Our Growing Team" CTA is a real `<a>` resolving to `/careers` (404 expected today — page doesn't exist yet).
- [ ] `Footer` renders on every page (visible on `/` and `/about` both) via `app/layout.tsx`.
- [ ] All copy is original, matches PRD §6.1 tone, and contains no fabricated stats/certifications/client counts.
- [ ] No amber text below the WCAG AA contrast threshold on bone (reuse the lesson from the `WhoWeAre` fix — verify any new small/normal-weight amber text against bone or petrol backgrounds before shipping).
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000/about`.
2. Confirm sections render top to bottom: Hero, Mission & Vision, Our Promise, Culture & Values (6 cards), Life at Velcor, Join the Team CTA, Footer.
3. Click "Join Our Growing Team" — confirm it navigates to `/careers` (404 expected).
4. Click each Footer nav link — confirm it resolves to a real route (Home and About should load; the other four will 404 today, same as other not-yet-built pages).
5. Open `http://localhost:3000` and confirm the Footer now also appears at the bottom of the Home page.
6. Resize to mobile width and confirm Mission/Vision and the value-card grid reflow to a single column.
7. Inspect page source on `/about` and confirm exactly one `<h1>`.
