# Prompt: Footer social icons + watermark, Privacy Policy + Terms pages

## Goal
1. Add non-linked social icons (Facebook, Instagram, LinkedIn, WhatsApp — no X) to the Footer.
2. Add a large "VELCOR ENGINEERING" wordmark watermark to the Footer background.
3. Build `/privacy-policy` and `/terms` pages and link them from the Footer.

## What it read
- `public/social-icons/` — `facebook.png`, `instagram.png`, `linkedin.png`, `whatsapp.png`, `X.png` (excluded per request). All are full-color, rounded-square brand icons (not monochrome line icons) — they read fine directly against the dark Petrol footer, no filter/recolor needed.
- `PRD.md` §3.1 (Footer spec — "Connect (social — only include live links)"), §13 (Legal & compliance), §15 (launch gate — "Privacy Policy + Terms live"), §16 (open questions — geography still unresolved)
- `components/layout/Footer.tsx` (current structure), `lib/nav-links.ts`, `lib/seo.ts`

## Decisions / assumptions
- **Icons render with no `<a>` wrapper and no `href`**, per your instruction — PRD §3.1 says "only include live links," and no verified profile URLs exist yet (§16 open question). Each icon still gets a real `alt` (e.g. `alt="Facebook"`) since it conveys real information (which platforms Velcor will be on), even though it isn't interactive. This is a placeholder-brand-presence treatment, not the final "Connect" block — swap in real `<Link>`s the moment profile URLs exist.
- **Watermark:** an `aria-hidden` absolutely-positioned "VELCOR ENGINEERING" wordmark, huge font size, low-opacity Petrol-500-on-Petrol-700 tone-on-tone, `overflow-hidden` clipped to the footer bounds so it can't affect page layout or scroll width. Purely decorative — excluded from the accessibility tree.
- **Legal pages get real, substantive content**, not one-line stubs — but this is template/boilerplate legal text, not attorney-reviewed copy. I'm not a lawyer and PRD §16 hasn't settled Velcor's target geography, so:
  - The Terms page states governing law as "the jurisdiction in which Velcor Engineering operates" rather than naming a specific state/country I'd otherwise have to invent.
  - Both pages describe data practices prospectively (contact form → `leads`, newsletter → `newsletter_subscribers`, analytics/cookies) matching what AGENTS.md §5 already commits to building, not what's live today (forms aren't wired yet).
  - **Flagging clearly in this prompt and in the final report: these pages are launch-blocking per PRD §15 but should get real legal review before go-live** — I'm unblocking the build, not providing legal advice.
- **Routes:** `/privacy-policy` and `/terms` (common convention, not otherwise specified in PRD's site map since these are global/utility pages like 404, not primary nav items).
- **No new nav entries in `Header`** — these are footer-only utility links, consistent with §3.1 (Footer lists them, primary nav in §3.1 doesn't).
- Content is structured as a local array of `{ heading, body }` sections rendered in a simple loop within each page — no new `lib/data/` file, since this content is single-use/single-page, same reasoning already applied to Hero's `SERVICES` array.

## Files that will change
- **Modify** `components/layout/Footer.tsx` — add Connect/social-icons row, watermark, and a legal-links row (Privacy Policy, Terms) next to copyright.
- **Create** `app/privacy-policy/page.tsx`
- **Create** `app/terms/page.tsx`

## Implementation requirements

**`Footer.tsx`**
- `<footer>` becomes `relative overflow-hidden` to contain the watermark.
- Watermark: `aria-hidden="true"`, absolutely positioned (e.g. bottom-anchored, spanning/overflowing the width), `text-[clamp(4rem,18vw,11rem)]` (or similar), `font-heading font-semibold`, `text-petrol-500/20` (tone-on-tone on `bg-petrol-700`), `whitespace-nowrap select-none`, `pointer-events-none`, `z-0`. All real content wrapped in a `relative z-10` container so it stays above the watermark and remains readable/selectable.
- New "Connect" column: `next/image` for each of the 4 icons (`facebook.png`, `instagram.png`, `linkedin.png`, `whatsapp.png`) from `/social-icons/`, ~28–32px, `alt` set to the platform name, laid out in a `flex gap-3` row, no `<a>`/`href` anywhere on them.
- Legal row: add "Privacy Policy" and "Terms" as plain `next/link`s next to the existing copyright line (same row on `sm+`, stacked on mobile), styled like the nav links (`text-petrol-100 hover:text-bone`).
- Verify: watermark text and icons don't overlap real content at any breakpoint (icons/nav sit in the `z-10` layer regardless).

**`app/privacy-policy/page.tsx`**
- `metadata` via `buildMetadata({ title: "Privacy Policy | Velcor Engineering", path: "/privacy-policy", noIndex: true })` — legal boilerplate pages are typically `noindex`, not a page you want ranking in search.
- `<h1>Privacy Policy</h1>`, an "Effective Date" line, then sections: Introduction/Scope, Information We Collect (contact-form fields, newsletter email, cookies/analytics once enabled), How We Use Your Information, Cookies & Analytics, Data Sharing & Third Parties (Supabase as processor; captcha and analytics providers named generically since not yet chosen), Data Retention, Your Rights, Data Security, Children's Privacy, Changes to This Policy, Contact Us (`info@velcorengineering.com`).

**`app/terms/page.tsx`**
- `metadata` via `buildMetadata({ title: "Terms of Service | Velcor Engineering", path: "/terms", noIndex: true })`.
- `<h1>Terms of Service</h1>`, "Effective Date" line, then sections: Acceptance of Terms, Use of This Website, Intellectual Property, Engineering Services Disclaimer (site content is informational, not a substitute for a signed engagement — important for an engineering firm to state), Third-Party Links, Limitation of Liability, Indemnification, Governing Law (jurisdiction-neutral per Decisions above), Changes to These Terms, Contact Us.
- Both pages share the same visual treatment: Bone background, max-w-3xl reading column, `<h2>` per section, justified body paragraphs (site-wide `p` rule already applies).

## Security requirements
None — static content, no forms, no data, no secrets. Icons are static assets with no click handlers.

## Acceptance criteria
- [ ] Footer shows 4 social icons (no X, no links/hrefs on any of them) with descriptive `alt` text.
- [ ] Footer background shows a large, low-opacity "VELCOR ENGINEERING" watermark that doesn't cause horizontal overflow/scroll at any breakpoint and doesn't obscure real content.
- [ ] Footer has working `Privacy Policy` and `Terms` links → `/privacy-policy` and `/terms`.
- [ ] Both legal pages render with exactly one `<h1>`, real section content (not stubs), and `noindex` metadata.
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000` and scroll to the Footer.
2. Confirm 4 social icons render (Facebook, Instagram, LinkedIn, WhatsApp), none of them clickable/navigable, and the "VELCOR ENGINEERING" watermark is visible behind the content without breaking layout.
3. Click "Privacy Policy" and "Terms" in the Footer — confirm both load with real content, one `<h1>` each.
4. Resize to mobile width — confirm the Footer (icons, nav, watermark, legal row) reflows without horizontal scroll.
5. View source on both legal pages and confirm `<meta name="robots" content="noindex,nofollow">` (or equivalent) is present.
