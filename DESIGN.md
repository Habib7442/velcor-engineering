# Velcor Engineering — Design Tokens

**Source of truth:** the Velcor Engineering logo (`lockup/velcor-logo-horizontal-2281w.png`).
Every colour in this document was sampled from the actual logo pixels, not eyeballed.

- Version `1.0.0` · derived 2026-08-28
- Site: `velcorengineering.com`
- Tagline: *Beyond Boundaries*

---

## 1. What the extraction found

I clustered the opaque pixels of the logo (k-means, 367,290 samples) and sampled each
element of the lockup separately. The measured values:

| Logo element | Measured (mode) | HSL | Share |
|---|---|---|---|
| `VELCOR` wordmark | `#041C44` | H 215 · S 91% · L 13% | 58% of type pixels |
| `ENGINEERING` | `#5C6474` | H 210 · S 11% · L 35% | 18% of type pixels |
| `BEYOND BOUNDARIES` | `#0C3474` | H 218 · S 79% · L 25% | 8% of type pixels |
| Accent bar in the `E` | `#2159B1` | H 217 · S 68% · L 41% | brightest blue in file |
| Icon — navy blades | `#041C44` → `#1A4488` | H 216 · S 75% | 78% of icon |
| Icon — steel blades | `#6C747C` → `#BCBCBC` | H 212 · S 3–6% | 18% of icon |
| Icon — deepest shadow | `#02142F` | H 215 · S 92% · L 10% | 6% of icon |

### The finding that drives the whole system

**Every single colour in the logo sits at hue 210–218.** The navy, the accent blue, the
grey of `ENGINEERING`, and the metallic blades are all the *same hue* — the greys are
simply that hue desaturated to 3–11%.

That is unusually disciplined, and it means the palette below is **not two colour
families, it is one hue expressed at two saturations**:

- **`--blue-*`** — the brand hue at full saturation. Navy is `blue-900`; the accent bar is `blue-500`.
- **`--steel-*`** — the same hue at ~10% saturation. This is the neutral ramp. Use it instead of pure grey.

**Never introduce a pure/neutral grey (`#888`, `#666`, Tailwind's default `gray-*`) into
this brand.** Against the steel ramp it reads as a dirty, slightly-yellow smudge. The
neutrals here are cool by design and that cool cast is part of the identity.

The palette is also **monochromatic** — there is no complementary or secondary hue in the
mark. Everything below preserves that. Colour is therefore *not* available to you as a way
to distinguish content; use hierarchy, weight, and space instead.

---

## 2. Primitive tokens

Primitives are raw values. **Do not reference them directly in components** — go through
the semantic layer in §3. Contrast ratios are WCAG 2.1 relative-luminance, computed, not estimated.

### 2.1 `blue` — brand hue (H 216, saturated)

| Token | Hex | vs `#FFF` | vs `blue-900` | Role |
|---|---|---|---|---|
| `blue-50` | `#F1F5FB` | 1.09 | 15.38 | tinted page / section wash |
| `blue-100` | `#E1EAF7` | 1.21 | 13.88 | subtle fill, hover on light |
| `blue-200` | `#C5D6EF` | 1.47 | 11.41 | borders on tinted surfaces |
| `blue-300` | `#99B7E3` | 2.05 | **8.21** | body text *on dark*, decorative rules |
| `blue-400` | `#5688D5` | 3.57 | 4.71 | links on dark, focus ring on dark |
| `blue-500` | `#2360BA` | **6.08** | 2.77 | **the accent bar in the logo** — primary interactive |
| `blue-600` | `#1B4E9A` | **8.07** | 2.09 | primary button rest, link on light |
| `blue-700` | `#123C7A` | 10.75 | 1.57 | button hover, `BEYOND BOUNDARIES` weight |
| `blue-800` | `#0A2C5E` | 13.68 | 1.23 | button active, icon mid-blade |
| `blue-900` | `#041C41` | **16.83** | 1.00 | **brand ink — the `VELCOR` wordmark** |
| `blue-950` | `#02142F` | 18.36 | 1.09 | deepest shadow, footer, hero base |

### 2.2 `steel` — brand hue desaturated (H 216, S ~10%)

| Token | Hex | vs `#FFF` | vs `blue-900` | Role |
|---|---|---|---|---|
| `steel-50` | `#F7F8FA` | 1.06 | 15.84 | app background, alternating band |
| `steel-100` | `#EFF0F3` | 1.14 | 14.77 | card on grey, disabled fill |
| `steel-200` | `#DEE1E6` | 1.31 | 12.84 | **default border / hairline** |
| `steel-300` | `#C4C9D1` | 1.66 | 10.12 | input border, divider on tint |
| `steel-400` | `#9BA2AE` | 2.57 | **6.55** | placeholder, muted text *on dark*, disabled text |
| `steel-500` | `#6A727E` | **4.86** | 3.46 | **secondary body text** — the `ENGINEERING` grey |
| `steel-600` | `#545B66` | 6.85 | 2.46 | strong secondary text, icon stroke |
| `steel-700` | `#414751` | 9.35 | 1.80 | metallic-blade shadow |
| `steel-800` | `#30353E` | 12.32 | 1.37 | dark neutral surface |
| `steel-900` | `#21262E` | 15.20 | 1.11 | near-black neutral |
| `steel-950` | `#151A20` | 17.49 | 1.04 | maximum neutral ink |

### 2.3 Semantic status hues

The logo contains **no** status colours, so these are additions. They are pinned to the
same lightness stops as the ramps above and pulled toward the cool end so they sit beside
`blue-*` without clashing. Keep them for state only — never as decoration.

| Family | `50` | `100` | `500` | `600` (AA on white) | `700` | `900` |
|---|---|---|---|---|---|---|
| `success` | `#F0F7F5` | `#DCEFE8` | `#2BA176` | `#238360` · 4.68 | `#1B674B` | `#103C2C` |
| `warning` | `#F9F5EE` | `#F4E8D7` | `#C47908` | `#9F6207` · 4.97 | `#7D4D05` | `#492D03` |
| `danger` | `#F8EFEF` | `#F1DBDA` | `#B1251B` | `#901E16` · 8.81 | `#711711` | `#430E0A` |
| `info` | `#EFF5F8` | `#DAEAF1` | `#1B82B1` | `#166990` · 6.07 | `#115371` | `#0A3143` |

> The `500` step of `success`, `warning` and `info` is **3.25–4.31** on white — fine for
> icons, fills and 18pt+ text, but **use the `600` step for status text at body size.**

### 2.4 Metallic gradients

The icon's blades are gradients, not flats. These two tokens reproduce them and are the
only sanctioned gradients in the system.

```css
/* navy blade — hero panels, primary CTA, dark section base */
--gradient-navy: linear-gradient(145deg, #1B4E9A 0%, #041C41 55%, #02142F 100%);

/* steel blade — dividers, precision-engineering accents, metal surfaces */
--gradient-steel: linear-gradient(145deg, #C4C9D1 0%, #6A727E 55%, #414751 100%);

/* hairline rule echoing the lines flanking BEYOND BOUNDARIES */
--gradient-rule: linear-gradient(90deg, transparent, #6A727E 18%, #6A727E 82%, transparent);
```

`145deg` matches the light direction in the mark (upper-left key light). Keep it consistent
— gradients running the other way fight the logo when placed near it.

---

## 3. Semantic tokens

This is the layer components consume. It is what makes dark mode a one-block override.

```css
:root {
  /* ---- surface ---- */
  --surface-page:        #FFFFFF;
  --surface-subtle:      var(--steel-50);
  --surface-raised:      #FFFFFF;
  --surface-sunken:      var(--steel-100);
  --surface-brand:       var(--blue-900);
  --surface-brand-subtle:var(--blue-50);
  --surface-inverse:     var(--blue-950);
  --surface-overlay:     rgba(4, 28, 65, 0.55);

  /* ---- content ---- */
  --text-primary:        var(--blue-900);   /* 16.83 on white */
  --text-secondary:      var(--steel-500);  /*  4.86 on white */
  --text-tertiary:       var(--steel-400);  /*  decorative / disabled only */
  --text-brand:          var(--blue-600);
  --text-on-brand:       #FFFFFF;           /* 16.83 on blue-900 */
  --text-link:           var(--blue-600);
  --text-link-hover:     var(--blue-700);

  /* ---- border ---- */
  --border-subtle:       var(--steel-200);
  --border-default:      var(--steel-300);
  --border-strong:       var(--steel-400);
  --border-brand:        var(--blue-600);
  --border-focus:        var(--blue-500);

  /* ---- interactive ---- */
  --action-primary:       var(--blue-600);
  --action-primary-hover: var(--blue-700);
  --action-primary-active:var(--blue-800);
  --action-secondary:       transparent;
  --action-secondary-border:var(--blue-600);
  --action-disabled:      var(--steel-200);
  --action-disabled-text: var(--steel-400);

  /* ---- status ---- */
  --status-success: var(--success-600);
  --status-warning: var(--warning-600);
  --status-danger:  var(--danger-600);
  --status-info:    var(--info-600);
}
```

### Dark mode

The logo already ships a reversed lockup, so dark mode is a first-class mode, not an
afterthought. Two rules matter: **never use `blue-900` as a dark background** (the wordmark
disappears into it — use `blue-950` or `steel-950`), and **lift body text to `steel-300`,
not `steel-400`**, because `steel-400` on `blue-950` is 7.0 but feels thin at small sizes.

```css
[data-theme="dark"] {
  --surface-page:        var(--blue-950);
  --surface-subtle:      #071B36;
  --surface-raised:      #0A2244;
  --surface-sunken:      #010D1F;
  --surface-brand:       var(--blue-800);
  --surface-brand-subtle:#0A2244;
  --surface-inverse:     #FFFFFF;
  --surface-overlay:     rgba(1, 13, 31, 0.72);

  --text-primary:        #FFFFFF;
  --text-secondary:      var(--steel-300);   /* 10.12 on blue-950 */
  --text-tertiary:       var(--steel-400);
  --text-brand:          var(--blue-300);
  --text-on-brand:       #FFFFFF;
  --text-link:           var(--blue-300);    /*  8.21 on blue-900 */
  --text-link-hover:     var(--blue-200);

  --border-subtle:       rgba(255, 255, 255, 0.10);
  --border-default:      rgba(255, 255, 255, 0.18);
  --border-strong:       rgba(255, 255, 255, 0.30);
  --border-focus:        var(--blue-400);

  --action-primary:       var(--blue-500);
  --action-primary-hover: var(--blue-400);
  --action-primary-active:var(--blue-600);
  --action-disabled:      rgba(255, 255, 255, 0.08);
  --action-disabled-text: rgba(255, 255, 255, 0.30);

  --status-success: #4FBF95;
  --status-warning: #E0A040;
  --status-danger:  #E06A5E;
  --status-info:    #4FA8D0;
}
```

Status colours flip to the light end in dark mode — the `600` steps are far too dark to
read on `blue-950`.

**Logo pairing:** `--surface-page` light → full-colour lockup. Dark → the `-reversed`
lockup. Over photography → reversed lockup on a `--surface-overlay` scrim, or the
mono-white file.

---

## 4. Typography

I did not identify the logo's typeface and will not guess at it. What the wordmark
*establishes* is a set of typographic behaviours worth carrying into the site:

1. **Squarish geometric caps** with flat, cleanly cut terminals — engineered, not humanist.
2. **Wide letter-spacing on secondary lines.** `ENGINEERING` is tracked out roughly
   0.42em; `BEYOND BOUNDARIES` around 0.16em. This is the single most recognisable
   typographic gesture in the brand.
3. **Weight as the hierarchy tool** — heavy primary line, light tracked secondary line, at
   a large size ratio.

```css
--font-display: "Saira", "Chakra Petch", system-ui, sans-serif;  /* echoes the wordmark */
--font-body:    "Inter", system-ui, -apple-system, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, monospace;       /* specs, tolerances, part numbers */

/* Type scale — 1.250 major third, fluid */
--text-xs:   0.75rem;   /* 12 — captions, table labels  */
--text-sm:   0.875rem;  /* 14 — secondary body          */
--text-base: 1rem;      /* 16 — body                    */
--text-lg:   1.125rem;  /* 18 — lead paragraph          */
--text-xl:   1.375rem;  /* 22 — h4                      */
--text-2xl:  1.75rem;   /* 28 — h3                      */
--text-3xl:  2.25rem;   /* 36 — h2                      */
--text-4xl:  clamp(2.5rem, 4vw + 1rem, 3.5rem);    /* h1  */
--text-5xl:  clamp(3rem, 6vw + 1rem, 5rem);        /* hero */

--leading-tight:   1.08;  /* display, h1–h2      */
--leading-snug:    1.30;  /* h3–h4               */
--leading-normal:  1.60;  /* body                */
--leading-relaxed: 1.75;  /* long-form           */

/* Tracking — the brand's signature move */
--tracking-tight:  -0.03em;  /* display / h1        */
--tracking-normal:  0;
--tracking-wide:    0.08em;
--tracking-eyebrow: 0.20em;  /* section eyebrows    */
--tracking-brand:   0.42em;  /* the ENGINEERING treatment — sparingly */

--weight-regular: 400;
--weight-medium:  500;
--weight-semibold:600;
--weight-bold:    700;
--weight-black:   800;  /* display only */
```

**Rules.** Tracked-out caps are for eyebrows, section labels and small nav items **only** —
never body copy, never anything over ~40 characters. Display sizes take
`--tracking-tight`; the two must move in opposite directions. Cap measure at 70ch. Never
set `--font-display` below 18px.

---

## 5. Space, radius, elevation, motion

```css
/* Space — 4px base. Layout uses 4+ only; 1–3 are for component interiors. */
--space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
--space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;
--space-7: 3rem;     --space-8: 4rem;     --space-9: 6rem;
--space-10: 8rem;    --space-11: 12rem;

--section-y:      var(--space-9);   /* vertical section rhythm, desktop */
--section-y-sm:   var(--space-7);   /* mobile                          */
--container-max:  1200px;
--container-pad:  var(--space-5);
--container-pad-lg: var(--space-6);

/* Radius — restrained. The mark is hard-edged; heavy rounding contradicts it. */
--radius-none: 0;
--radius-sm:   2px;    /* inputs, tags        */
--radius-md:   4px;    /* buttons, cards      */
--radius-lg:   8px;    /* modals, media       */
--radius-pill: 999px;  /* status chips only   */

/* Elevation — shadows tinted with blue-900, never neutral black.
   A black shadow beside this palette reads muddy. */
--shadow-xs: 0 1px 2px rgba(4, 28, 65, 0.06);
--shadow-sm: 0 1px 3px rgba(4, 28, 65, 0.10), 0 1px 2px rgba(4, 28, 65, 0.06);
--shadow-md: 0 4px 12px rgba(4, 28, 65, 0.10), 0 2px 4px rgba(4, 28, 65, 0.06);
--shadow-lg: 0 12px 28px rgba(4, 28, 65, 0.12), 0 4px 8px rgba(4, 28, 65, 0.06);
--shadow-xl: 0 24px 56px rgba(4, 28, 65, 0.16);
--shadow-focus: 0 0 0 3px rgba(35, 96, 186, 0.40);   /* blue-500 @ 40% */

/* Motion — mechanical and brief. This is an engineering firm; nothing should bounce. */
--ease-out:   cubic-bezier(0.16, 1, 0.30, 1);
--ease-in-out:cubic-bezier(0.65, 0, 0.35, 1);
--dur-instant: 80ms;
--dur-fast:    140ms;
--dur-normal:  220ms;
--dur-slow:    380ms;

--z-base: 0; --z-dropdown: 100; --z-sticky: 200;
--z-overlay: 300; --z-modal: 400; --z-toast: 500;
```

Always wrap motion in `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`.

---

## 6. Component recipes

```css
/* Primary button */
.btn-primary {
  background: var(--action-primary); color: var(--text-on-brand);
  padding: var(--space-3) var(--space-5);
  border: 0; border-radius: var(--radius-md);
  font: var(--weight-semibold) var(--text-sm)/1 var(--font-body);
  letter-spacing: var(--tracking-wide); text-transform: uppercase;
  transition: background var(--dur-fast) var(--ease-out);
}
.btn-primary:hover  { background: var(--action-primary-hover); }
.btn-primary:active { background: var(--action-primary-active); }
.btn-primary:focus-visible { outline: 0; box-shadow: var(--shadow-focus); }

/* Secondary — outline */
.btn-secondary {
  background: transparent; color: var(--text-brand);
  border: 1px solid var(--action-secondary-border);
  border-radius: var(--radius-md); padding: var(--space-3) var(--space-5);
}
.btn-secondary:hover { background: var(--blue-50); }

/* Section eyebrow — the brand's tracked-caps gesture */
.eyebrow {
  font: var(--weight-bold) var(--text-xs)/1 var(--font-body);
  letter-spacing: var(--tracking-eyebrow); text-transform: uppercase;
  color: var(--text-brand);
}

/* Card */
.card {
  background: var(--surface-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
.card:hover { box-shadow: var(--shadow-md); border-color: var(--border-default); }

/* Hero — metallic navy, matching the icon's light direction */
.hero { background: var(--gradient-navy); color: #FFF; padding-block: var(--space-10); }
.hero .eyebrow { color: var(--blue-300); }
.hero p { color: var(--steel-300); }

/* Input */
.input {
  border: 1px solid var(--border-default); border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-4); font-size: var(--text-base);
  color: var(--text-primary); background: var(--surface-page);
}
.input::placeholder { color: var(--text-tertiary); }
.input:focus-visible { border-color: var(--border-focus); box-shadow: var(--shadow-focus); outline: 0; }
```

---

## 7. Tailwind config

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        blue: { 50:'#F1F5FB',100:'#E1EAF7',200:'#C5D6EF',300:'#99B7E3',400:'#5688D5',
                500:'#2360BA',600:'#1B4E9A',700:'#123C7A',800:'#0A2C5E',900:'#041C41',950:'#02142F' },
        steel:{ 50:'#F7F8FA',100:'#EFF0F3',200:'#DEE1E6',300:'#C4C9D1',400:'#9BA2AE',
                500:'#6A727E',600:'#545B66',700:'#414751',800:'#30353E',900:'#21262E',950:'#151A20' },
        success:{ 50:'#F0F7F5',100:'#DCEFE8',500:'#2BA176',600:'#238360',700:'#1B674B',900:'#103C2C' },
        warning:{ 50:'#F9F5EE',100:'#F4E8D7',500:'#C47908',600:'#9F6207',700:'#7D4D05',900:'#492D03' },
        danger: { 50:'#F8EFEF',100:'#F1DBDA',500:'#B1251B',600:'#901E16',700:'#711711',900:'#430E0A' },
        info:   { 50:'#EFF5F8',100:'#DAEAF1',500:'#1B82B1',600:'#166990',700:'#115371',900:'#0A3143' },
      },
      fontFamily: {
        display: ['Saira','Chakra Petch','system-ui','sans-serif'],
        sans: ['Inter','system-ui','sans-serif'],
        mono: ['JetBrains Mono','ui-monospace','monospace'],
      },
      letterSpacing: { eyebrow: '0.20em', brand: '0.42em' },
      borderRadius: { sm:'2px', md:'4px', lg:'8px' },
      boxShadow: {
        xs:'0 1px 2px rgba(4,28,65,0.06)',
        sm:'0 1px 3px rgba(4,28,65,0.10), 0 1px 2px rgba(4,28,65,0.06)',
        md:'0 4px 12px rgba(4,28,65,0.10), 0 2px 4px rgba(4,28,65,0.06)',
        lg:'0 12px 28px rgba(4,28,65,0.12), 0 4px 8px rgba(4,28,65,0.06)',
        xl:'0 24px 56px rgba(4,28,65,0.16)',
      },
      backgroundImage: {
        'gradient-navy':'linear-gradient(145deg,#1B4E9A 0%,#041C41 55%,#02142F 100%)',
        'gradient-steel':'linear-gradient(145deg,#C4C9D1 0%,#6A727E 55%,#414751 100%)',
      },
      transitionTimingFunction: { out:'cubic-bezier(0.16,1,0.30,1)' },
    },
  },
};
```

Delete Tailwind's default `gray`, `slate` and `zinc` from your project's autocomplete
habits — `steel` replaces all of them. Mixing them in is the fastest way to make this
brand look cheap.

---

## 8. Accessibility

Verified computed ratios. Everything listed passes **WCAG 2.1 AA** for its stated use;
starred pairs also clear **AAA (7.0)**.

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `blue-900` | `#FFFFFF` | **16.83** | AAA ★ — body, headings |
| `steel-500` | `#FFFFFF` | **4.86** | AA — secondary body (14px+) |
| `steel-600` | `#FFFFFF` | **6.85** | AA — strong secondary |
| `blue-600` | `#FFFFFF` | **8.07** | AAA ★ — links |
| `blue-500` | `#FFFFFF` | **6.08** | AA — large text, icons |
| `#FFFFFF` | `blue-600` | **8.07** | AAA ★ — primary button |
| `#FFFFFF` | `blue-500` | **6.08** | AA — button on dark |
| `#FFFFFF` | `blue-900` | **16.83** | AAA ★ — reversed lockup |
| `blue-300` | `blue-900` | **8.21** | AAA ★ — links on dark |
| `steel-300` | `blue-950` | **10.12** | AAA ★ — body on dark |
| `steel-400` | `blue-900` | **6.55** | AA — muted text on dark |
| `blue-200` | `blue-950` | **12.45** | AAA ★ |

**Failing combinations — do not ship these:**

| Pair | Ratio | Why it fails |
|---|---|---|
| `steel-400` on `#FFFFFF` | 2.57 | Below 3.0. Decorative and disabled states only. |
| `blue-400` on `#FFFFFF` | 3.57 | Large text (18pt+/14pt bold) and icons only. |
| `blue-300` on `#FFFFFF` | 2.05 | Never for text. |
| `blue-900` on `blue-950` | 1.09 | Invisible. Never put brand ink on the dark surface. |
| `success-500` on `#FFFFFF` | 3.25 | Use `success-600` for text. |
| `warning-500` on `#FFFFFF` | 3.45 | Use `warning-600` for text. |

Because the palette is monochromatic, **colour alone can never be the only carrier of
meaning.** Every status needs an icon or a text label alongside it — a red and a green chip
at the same lightness are indistinguishable to a deuteranopic user, and this palette gives
you no hue distance to fall back on. Focus rings use `--shadow-focus` at 3px; never remove
them without a visible replacement.

---

## 9. Rules

**Do**

- Route every component through §3 semantic tokens, never §2 primitives.
- Use `steel-*` for all neutrals — borders, dividers, muted text, backgrounds.
- Keep `--gradient-navy` at `145deg` when it appears near the logo.
- Tint shadows with `rgba(4,28,65,…)`.
- Reserve `--tracking-brand` (0.42em) for one or two moments per page.
- Pair `--surface-page` with the correct logo file: light → full colour, dark → reversed.

**Don't**

- Introduce a second hue. The mark is monochromatic; a teal or orange "secondary" breaks it.
- Use neutral grey (`#666`, `gray-500`) anywhere.
- Put `blue-900` type on any dark surface, or the navy lockup on a dark background.
- Round anything past 8px, or add a bounce/overshoot easing.
- Recolour the full-colour logo, or set tracked-out caps as body copy.
- Use status `500` steps for body-size text.

---

## 10. `tokens.json` (W3C DTCG)

Machine-readable source for Style Dictionary / Figma Tokens.

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "blue": {
      "50":{"$value":"#F1F5FB","$type":"color"}, "100":{"$value":"#E1EAF7","$type":"color"},
      "200":{"$value":"#C5D6EF","$type":"color"},"300":{"$value":"#99B7E3","$type":"color"},
      "400":{"$value":"#5688D5","$type":"color"},"500":{"$value":"#2360BA","$type":"color"},
      "600":{"$value":"#1B4E9A","$type":"color"},"700":{"$value":"#123C7A","$type":"color"},
      "800":{"$value":"#0A2C5E","$type":"color"},"900":{"$value":"#041C41","$type":"color"},
      "950":{"$value":"#02142F","$type":"color"}
    },
    "steel": {
      "50":{"$value":"#F7F8FA","$type":"color"}, "100":{"$value":"#EFF0F3","$type":"color"},
      "200":{"$value":"#DEE1E6","$type":"color"},"300":{"$value":"#C4C9D1","$type":"color"},
      "400":{"$value":"#9BA2AE","$type":"color"},"500":{"$value":"#6A727E","$type":"color"},
      "600":{"$value":"#545B66","$type":"color"},"700":{"$value":"#414751","$type":"color"},
      "800":{"$value":"#30353E","$type":"color"},"900":{"$value":"#21262E","$type":"color"},
      "950":{"$value":"#151A20","$type":"color"}
    },
    "semantic": {
      "text-primary":  {"$value":"{color.blue.900}","$type":"color"},
      "text-secondary":{"$value":"{color.steel.500}","$type":"color"},
      "action-primary":{"$value":"{color.blue.600}","$type":"color"},
      "border-subtle": {"$value":"{color.steel.200}","$type":"color"},
      "surface-brand": {"$value":"{color.blue.900}","$type":"color"}
    }
  }
}
```

---

## 11. Provenance & limits

- Colours were sampled from the background-removed 2281 px master, k-means clustered over
  367,290 opaque pixels, then verified per logo element with median + modal sampling.
- Ramp stops between the measured anchors are interpolated on a fixed hue (216) with a
  tuned lightness curve; the measured values land on `blue-500`, `blue-900`, `blue-950`
  and `steel-500`.
- Because the source logo was a **1280 px JPEG**, sampled values carry ±1–2 per channel of
  compression noise. Ramp values are rounded to clean stops and are the canonical
  reference — prefer them over re-sampling the image.
- Typeface recommendations are an *echo* of the wordmark's behaviour, not an
  identification. If the original logo font is known, substitute it for `--font-display`
  and keep everything else.
- Status hues, spacing, radius, elevation and motion are additions — the logo does not
  specify them. They are tuned to the extracted palette but are open to revision in a way
  the colour ramps are not.
