# Portfolio animations — design

**Date:** 2026-09-09
**Project:** `jiwon-portfolio` (Next.js 14 App Router, static export)
**Reference:** https://kononenkogroup.com/ (the site the KONONENKO design system is derived from)

## Goal

Add a restrained motion layer matching the reference site's feel: eased smooth
scroll, scroll-triggered reveals (rise + fade), and a short hero load-in. No
animation framework.

## Reference site behaviour (observed via browser)

- `<html class="lenis">` — **Lenis** smooth scroll.
- Scroll reveals: elements start `translateY(~20–65px)`, transition to rest over
  `0.6s cubic-bezier(0.17, 0.84, 0.44, 1)` as they enter the viewport. Text
  reveals line-by-line with a small stagger.
- Images fade in on load (`opacity 0.3s`), creep to `scale(1.04)` on hover over
  the slow (~1.1s) duration.
- Links slide on hover (`transform 0.6s`); buttons cross-fade colour (`0.3s`).
- All timing uses one easing curve: `cubic-bezier(0.17, 0.84, 0.44, 1)` — already
  the `--ease-out` token in `globals.css`, with `--dur-fast 0.3s` / `--dur-base
  0.6s` / `--dur-slow 1.109s`.

## Scope (agreed)

Option **B + hero load-in**:

- Core reveals + image fade-in.
- Lenis smooth scroll.
- Hero load-in sequence.
- NOT included: custom cursor, hero image parallax, per-line text stagger.

## Design

### New files

- `components/SmoothScroll.tsx` (`"use client"`)
  - Inits Lenis on mount, drives it with a `requestAnimationFrame` loop, destroys
    on unmount.
  - Config: `duration: 1.1`, default `lerp`, `easing` an expo-out curve.
  - Intercepts same-page `a[href^="#"]` clicks → `lenis.scrollTo(target, { offset:
    -headerHeight })`, updates the URL hash without a jump.
  - If `matchMedia('(prefers-reduced-motion: reduce)')` matches: does nothing
    (native scroll).
  - Renders nothing.

- `components/Reveal.tsx` (`"use client"`)
  - One `IntersectionObserver` (threshold chosen so it fires ~12% into the
    viewport, `rootMargin: '0px 0px -12% 0px'`) over all `[data-reveal]` elements
    present at mount.
  - On intersect: add `.is-visible`, then `unobserve` (reveal once).
  - Also picks up elements added later via a `MutationObserver` (defensive; the
    page is static so likely unused).
  - Renders nothing.

### Modified

- `app/layout.tsx`
  - Mount `<SmoothScroll />` and `<Reveal />` at the end of `<body>`.
  - Add an inline `<script>` in `<head>` that runs before first paint:
    ```js
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      document.documentElement.dataset.reveal = 'ready';
    ```
    The reveal "hidden" CSS only applies under `html[data-reveal="ready"]`, so
    with JS disabled / failed / reduced-motion, all content is visible with no
    flash.

- `app/globals.css`
  - `html[data-reveal="ready"] [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); transition-delay: calc(var(--i, 0) * 70ms); }`
  - `html[data-reveal="ready"] [data-reveal].is-visible { opacity: 1; transform: none; }`
  - Hero load-in: `.hero__eyebrow`, `.hero__title`, `.hero__row` start
    `opacity: 0; translateY(20px)`, transition in when `html[data-hero="in"]` is
    set (by `SmoothScroll`/a tiny effect on mount) with delays `0 / 90ms / 180ms`.
    `.hero__img` fades `opacity 0 → 1` over `0.8s`.
  - `@media (prefers-reduced-motion: reduce)` — force every animated element to
    its resting state, kill transitions (belt-and-suspenders with the JS guard).

- `components/ds/ImageFrame.tsx`
  - Real `<img>` starts at `opacity: 0`; `onLoad` (and an immediate check for
    cached/complete images) adds a class that fades it to `1` over `--dur-fast`.
  - Empty placeholder wells unchanged.

- Section components (`Hero`, `About`, `Work`, `Stats`, `Capabilities`, `Notes`,
  `MarqueeBand`, `Footer`)
  - Add `data-reveal` to: each section eyebrow, heading, and content block.
  - Grid children (projects, stat blocks, capabilities, notes) get `data-reveal`
    plus `style={{ '--i': index }}` for the stagger.
  - Hero content is handled by the load-in, not `data-reveal`.

### Motion values

| Motion | Value |
| --- | --- |
| Reveal | `opacity 0→1` + `translateY(24px→0)`, `--dur-base` (0.6s), `--ease-out`, once, fires ~12% into viewport |
| Stagger | grid item `transition-delay: calc(var(--i) * 70ms)` |
| Hero load-in | eyebrow / title / row at `0 / 90 / 180ms`, rise 20px + fade, `--dur-base` |
| Hero image | `opacity 0→1`, `0.8s`, `--ease-out` |
| Image (ImageFrame) | fade-in on load `--dur-fast`; existing hover `scale(1.04)` over `--dur-slow` kept |
| Smooth scroll | Lenis `duration: 1.1`, expo-out easing |
| Anchor nav | `lenis.scrollTo(target, { offset: -70 })` |

## Edge cases

- **JS disabled / fails:** `html[data-reveal="ready"]` never set → all content
  visible, no hidden state.
- **`prefers-reduced-motion`:** inline script skips the flag; Lenis not
  initialised; CSS media query forces resting state.
- **Static export:** all new code is client-side; no server dependency.
- **Anchor links (`#work` etc.):** intercepted by `SmoothScroll`; header-height
  offset so the target isn't hidden under the sticky-height header.
- **Above-the-fold `data-reveal` (none planned):** if any element with
  `data-reveal` is already visible at mount, the observer fires immediately —
  acceptable.

## Testing (manual + Playwright)

1. Reveals fire as sections scroll into view; do not re-hide on scroll-up.
2. `prefers-reduced-motion: reduce` → everything visible immediately, no smooth
   scroll.
3. No horizontal overflow at 375 / 768 / 1440 / 2560.
4. Anchor nav (WORK/ABOUT/STACK/NOTES/CONTACT) scrolls smoothly to the right
   place.
5. Hero load-in plays once on load.
6. `npm run build` passes (static export, 5/5 pages).

## Notes

- No git repo in this project, so the design doc is not committed.
- New dependency: `lenis` (^1.3.26).

## Deviations during implementation

- `components/Reveal.tsx` was **not** created. The IntersectionObserver setup
  lives in the inline `revealBootstrap` script in `app/layout.tsx` instead —
  vanilla, so reveals never depend on a React chunk loading, and it can run
  before first paint. `SmoothScroll.tsx` is still a React client component
  (needs the `lenis` import).
- The pre-paint flag is a class (`html.reveal-on`), not `html[data-reveal]`,
  because `document.documentElement` carrying a `data-reveal` attribute would be
  picked up by the `[data-reveal]` selector itself.
- `<html suppressHydrationWarning>` added — the bootstrap script and Lenis both
  mutate `<html>` before hydration.
- `html { scroll-behavior: smooth }` scoped to `html:not(.lenis)` so native
  smooth scroll doesn't fight Lenis.
- Anchor scroll offset is `-16` (the header is not sticky, so no header-height
  offset is needed).
