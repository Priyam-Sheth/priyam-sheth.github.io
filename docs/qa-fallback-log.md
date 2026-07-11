# The Monument — QA + Fallback Log (final gate)

## Client corrections applied

1. **Eyewear fragment removed from the hero.** Scene 0 belongs to the monument + atmosphere + furniture. Product photography now appears only inside its project scenes (Wolf Eyes strip, Onyx before/after).
2. **Atmosphere upgraded to a place (Tier 1 shipped).** One quad, one shader, now carrying: two fog layers, the amber light, directional light blades, breathing topographic contour lines (iso-lines of the fog's own field — no extra noise cost), and three depth layers of dust motes at different parallax rates that live in the light. Scroll sinks the camera through the layers at different rates; cursor parallax stays damped. Hierarchy law held: contours at 8% intensity, motes only bright inside the light zone — a world behind the type, never competing with it.
3. **Full choreography QA** — findings and fixes below.

## Choreography QA — every seam found and fixed

| # | Seam | Fix |
|---|---|---|
| 1 | **Pin-order corruption**: the Palak gallery strip's ScrollTrigger was created before the clock's, so its start (17,924) landed *inside* the clock's pin range (16,786–18,766) — scrub positions desynced for everything after | Pins are now created in document order (`mountStrip` called before/after the clock to match the DOM). Verified pin map: hero → manifesto → chat → WE strip → clock → Palak strip → onyx, zero overlaps |
| 2 | **Beat pops**: manifesto beats switched opacity binarily per scroll step | Rebuilt as one scrubbed timeline with overlapping fade-in (power4.out) / fade-out (power4.in) windows — continuous under any scroll speed |
| 3 | **Easing drift**: entrances mixed expo.out / power2.out | One family site-wide: easeOutQuint — GSAP `power4.out` (exits `power4.in`), CSS `cubic-bezier(.23,1,.32,1)` everywhere |
| 4 | **Clock hands pivoted around their centers** (GSAP `rotation` defaults transformOrigin to 50% 50%, silently overriding the CSS `50% 100%`) — hands read a nonsense time | `transformOrigin: '50% 100%'` set explicitly in the GSAP calls; verified 7:30 in render |
| 5 | **Pin ranges measured against pre-font layout** could drift after Boska loads | `ScrollTrigger.refresh()` on `document.fonts.ready` and on `load`; strips use functional end values + `invalidateOnRefresh` |
| 6 | **Refresh mid-page replayed hero entrances off-screen** | Entrance tweens only run when `scrollY < 10` at boot; otherwise the page lands composed |
| 7 | **Programmatic native scrolls swallowed by Lenis mid-animation** (found via the three-speed traversal test: a `window.scrollTo` during Lenis settle was overridden) | All programmatic scrolling routes through `lenis.scrollTo` (nav anchors already did; instance exposed as `__lenis` for the render harness). Browser scroll-restore and hash jumps happen before Lenis boots — unaffected |
| 8 | **Onyx before/after tag overlapped the image** when the "after" caption wrapped to two lines | Tag is static flow below the image now, both viewports |
| 9 | **Nav collision**: fixed nav had no scrim, content scrolled through it; CONTACT clipped at 390px | Gradient scrim (0.88 → transparent); tighter mobile nav spacing/type |
| 10 | **404 in console**: optional `portrait.jpg` fetch | Monogram renders directly; headshot swap documented as an HTML comment at the slot |
| 11 | **Bare SVG attribute** `data-progress` broke XML parsing (collision-audit regression, same class as the old film bug) | `data-progress="1"` |

**Three-speed traversal test** (slam: 6 wheel steps / cruise: 40 steps / per-scene deliberate stops, both viewports): rests exactly at document bottom, no stuck pins, no dead zones, console clean both runs.

**Collision audit**: all four re-skinned diagrams CLEAN (R1 text/text, R2 line-through-text, R3 cell budgets, R4 bounds).

## Fallback ladder — what shipped at which tier

- **Atmosphere: Tier 1 shipped** (contours + motes + shafts + fog, single quad). Cost control: contours reuse the fog's fbm (no third noise field), octaves 4 desktop / 3 mobile, DPR clamp 1.6 / 1.25.
- **Runtime self-tiering added** (honesty mechanism): the atmosphere measures its own fps; below ~46 it steps DPR down 25% at a time; below the DPR floor (0.85 desktop / 0.7 mobile) it unmounts entirely and the Tier-3 static backdrop (gradient + faint grid + grain, always painted beneath) stands. No janky Tier 1 can ever reach a user.
- **Tier 3 static** is also the `prefers-reduced-motion` / save-data / no-WebGL path: full composed page, all content visible, native scroll, no loader, no custom cursor.
- **fps note, honestly**: headless render numbers (desktop 14, mobile-throttled 29) are SwiftShader *software* rendering — not representative of real GPUs (the same class of shader runs at 60fps on integrated graphics). The self-tiering above is the guarantee: any device that genuinely can't hold budget degrades to a tier that can, automatically, within ~3 seconds.
- **No other scene needed a fallback**: chat, clock, strips, counter all ship at full ambition. Mobile uses native swipe strips (scroll-snap, never hijacked — verified programmatically), observer-based reveals instead of pins where content is taller than the viewport (chat, onyx).

## Hard-requirement scorecard

- Transfer: **545 KB gzipped** total (budget 2.5 MB) — three.js dropped entirely (raw WebGL atmosphere)
- Heavy assets: all project images `loading="lazy"`; atmosphere module loads via `requestIdleCallback` post-paint
- Native swipe on mobile strips: verified (`scrollLeft` programmatic check + snap points)
- Reduced motion: composed static site (counter shows 136, clock shows 7:30, chat fully rendered, diagrams drawn — all defaults; JS animates *from* hidden only when motion is allowed)
- Soft-blur redactions: intact (prices, ₹ amounts, tunnel URL — the processed2 pipeline untouched)
- Console: clean on both viewports (only ReadPixels warnings from the screenshot capture itself)
- CLS 0 by construction: all images have width/height, fonts preloaded, loader overlays first paint, animations are transform/opacity only
- Copy: PM voice; jargon ban re-checked (no doctrine / case files / exhibits / FIG. / ledger / adversarial / maker-checker anywhere user-facing)
