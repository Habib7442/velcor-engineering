# Prompt: Integrate new logo/favicon kit, prune the rest

## Goal
Wire the real brand assets from `public/velcor-engineering-logo-kit/velcor/` into the site (replacing the deleted placeholder `logo_*.png` / `public/favicons/*` paths that Header, Footer, Preloader, `opengraph-image.tsx`, and `lib/seo.ts` still reference), then delete the kit's unused files so only what's actually referenced ships in `public/`.

## What I read
- `AGENTS.md`, `PRD.md` §8.1 (brand/design system), §16 Q1 (logo — resolved: you supplied the kit)
- `git status` — confirmed `public/logo_*.png` (7 files) and `public/favicons/*` (6 files + manifest) are already deleted from disk but still referenced in code; `public/velcor-engineering-logo-kit/velcor/` (60 files) is untracked
- Every code reference to the old paths (`Header.tsx`, `Footer.tsx`, `Preloader.tsx`, `opengraph-image.tsx`, `lib/seo.ts`) — exact usage context (background color, display size) for each
- `public/velcor-engineering-logo-kit/velcor/README.txt` — brand colors, usage guidance ("use `/simplified` for 16px/32px", "apple-touch-icon has a solid background because iOS ignores transparency")
- `public/velcor-engineering-logo-kit/velcor/favicon/site.webmanifest` — kit's own manifest (proper `name`/`short_name`/`theme_color`, assumes files at web root)
- Actual pixel dimensions of every candidate file via `System.Drawing` (see table below) — needed because `Header`/`Footer`/`Preloader` pass explicit `width`/`height` to `next/image`, which sets the aspect ratio; wrong values would stretch the logo

## Decisions / assumptions
- **One file, reused everywhere it fits**, per your storage concern: the horizontal lockup (full-color for light backgrounds, reversed/white for dark) covers all 4 code usages — Header, Footer, Preloader, and the OG image all use one of these two files instead of 4 separate exports.
- **Favicon sizes ≤32px use the `/simplified` mark**, per the kit's own README guidance (full aperture detail "turns to mush below ~48px"); sizes ≥192px use the faithful mark. `favicon.ico` uses the simplified version since `.ico` embeds small sizes.
- Apple touch icon uses the plain (non-navy) `apple-touch-icon-180.png` — a reasonable default; the kit also ships a `-navy` variant if you'd rather swap it later.
- Kept the exact same filenames under `public/favicons/` as before (`favicon.ico`, `favicon-16x16.png`, etc.) so **`lib/seo.ts`'s icon block needs zero edits** — only `siteConfig.logo` changes.
- New `site.webmanifest` is adapted from the kit's own manifest (better than the old one — has real `name`/`short_name`), with icon paths rewritten to the project's existing `/favicons/` convention instead of web root, and includes the maskable-512 icon entry.
- Everything else in the 60-file kit (icon-only marks, mono variants, stacked lockups, social avatars/banners, the extra OG images, `HEAD-SNIPPET.html`, `README.txt`) is unused by any current page and gets deleted. If you want the social avatar/banner images kept for manually uploading to LinkedIn/etc. (not referenced by code), say so before I run the cleanup — default plan deletes them.

## Asset mapping

| Code usage | Background | Old file | New source (from kit) | Final path | Dimensions |
|---|---|---|---|---|---|
| `Header.tsx` logo | light/bone | `logo_crisp_transparent.png` | `lockup/velcor-logo-horizontal-800w.png` | `public/logo-horizontal.png` | 800×251 |
| `lib/seo.ts` `siteConfig.logo` (Organization/LocalBusiness JSON-LD) | n/a | `logo_transparent.png` | same as above | `public/logo-horizontal.png` | 800×251 |
| `Footer.tsx` logo | `bg-blue-900` (dark) | `logo_non_transparent_cropped.png` | ~~`lockup/velcor-logo-horizontal-reversed-800w.png`~~ see below | `public/logo-horizontal-white.png` | 800×251 |
| `Preloader.tsx` logo | `bg-blue-900` (dark) | `logo_white_small.png` | same as above | `public/logo-horizontal-white.png` | 800×251 |
| `opengraph-image.tsx` logo | dark photo overlay | `logo_white_small.png` | same as above | `public/logo-horizontal-white.png` | 800×251 (composited at 340×107) |

**Correction (post-launch fix):** the kit's `-reversed` lockup turned out to still carry its dark-navy blade shading and a muted steel-gray wordmark — fine against the mid-tone original `petrol-700` (`#0E3A46`), but nearly invisible against the much darker `blue-900` (`#041C41`) this rebrand moved to (caught in the Preloader). Rather than re-request the kit (it was untracked and unrecoverable once deleted), I generated `public/logo-horizontal-white.png` from the full-color `logo-horizontal.png` by remapping every non-transparent pixel to solid white and keeping the original alpha channel as the mask — a real static asset, not a runtime CSS filter (the OG-image route renders via Satori, which doesn't support `filter`). All three dark-background usages now point at it; `logo-horizontal-reversed.png` was deleted.
| `favicon.ico` | — | `favicons/favicon.ico` | `favicon/simplified/favicon.ico` | `public/favicons/favicon.ico` | 256×256 |
| `favicon-16x16.png` | — | `favicons/favicon-16x16.png` | `favicon/simplified/velcor-mark-16.png` | `public/favicons/favicon-16x16.png` | 16×16 |
| `favicon-32x32.png` | — | `favicons/favicon-32x32.png` | `favicon/simplified/velcor-mark-32.png` | `public/favicons/favicon-32x32.png` | 32×32 |
| `android-chrome-192x192.png` | — | `favicons/android-chrome-192x192.png` | `favicon/favicon-192x192.png` | `public/favicons/android-chrome-192x192.png` | 192×192 |
| `android-chrome-512x512.png` | — | `favicons/android-chrome-512x512.png` | `favicon/favicon-512x512.png` | `public/favicons/android-chrome-512x512.png` | 512×512 |
| maskable icon (new, manifest only) | — | — | `favicon/android-chrome-maskable-512.png` | `public/favicons/android-chrome-maskable-512.png` | 512×512 |
| `apple-touch-icon.png` | — | `favicons/apple-touch-icon.png` | `favicon/apple-touch-icon-180.png` | `public/favicons/apple-touch-icon.png` | 180×180 |
| `site.webmanifest` | — | `favicons/site.webmanifest` | `favicon/site.webmanifest` (paths rewritten) | `public/favicons/site.webmanifest` | — |

## Files that will change
- **Move + rename** (from the untracked kit into `public/`): the 8 files in the mapping table above.
- **Modify** `components/layout/Header.tsx` — new `src`, `width={800}`, `height={251}`
- **Modify** `components/layout/Footer.tsx` — new `src`, `width={800}`, `height={251}`
- **Modify** `components/Preloader.tsx` — new `src`, `width={800}`, `height={251}`
- **Modify** `app/opengraph-image.tsx` — new `readFile` path; adjust composited `<img>` to `width={340} height={107}` (preserves the new 800:251 aspect ratio at the same visual width)
- **Modify** `lib/seo.ts` — `logo: "/logo-horizontal.png"` (only this one line; the icons/manifest block already points at the right filenames)
- **Create** `public/favicons/site.webmanifest` with kit-provided `name`/`short_name`/`theme_color`/`background_color`, icon `src` values prefixed `/favicons/`, plus the maskable-512 entry
- **Delete** `public/velcor-engineering-logo-kit/` entirely once the 8 files above are copied out

## Security requirements
None — static asset swap, no user input, no secrets.

## Acceptance criteria
- [ ] No code references any deleted `logo_*.png` or old kit path; `grep -r "logo_" app components lib` returns nothing
- [ ] Header/Footer/Preloader render the correct logo variant (full-color on light backgrounds, reversed/white on `petrol-700`) with no visible stretch/squash
- [ ] `/favicons/*` and `public/logo-horizontal*.png` are the only new brand assets under `public/`; `public/velcor-engineering-logo-kit/` no longer exists
- [ ] `site.webmanifest` icon paths resolve (start with `/favicons/`)
- [ ] `npm run typecheck` and `npm run lint` pass
- [ ] `npm run build` succeeds (catches any bad `next/image` dimensions or missing files)

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000`.
2. Confirm the header logo renders crisply (not blurry/stretched) on the transparent-then-bone header background.
3. Scroll to the footer — confirm the reversed (white) logo is legible on the dark petrol background.
4. Hard-refresh to trigger the preloader — confirm its logo matches the footer's reversed version.
5. Check the browser tab favicon and, if possible, an OS bookmark/home-screen add, to confirm the favicon isn't mush at 16px.
6. View page source, confirm `<link rel="manifest" href="/favicons/site.webmanifest">` and that fetching that URL in the browser returns valid JSON with working icon paths.
7. Visit `/opengraph-image` (or share a page link in a tool that renders OG previews) and confirm the composited logo isn't distorted.
