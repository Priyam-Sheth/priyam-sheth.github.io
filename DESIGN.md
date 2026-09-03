# Design (v2, 3 Sep 2026)

"Precision instrument, in daylight." Light ground, engineered depth, scroll that answers the hand,
every number true. Files: `index.html`, `src/v2/site.css`, `src/v2/site.js`. The full brief and
the reasoning behind every section is in `docs/v2-plan.md`.

## Theme
Light only, locked. Physical scene: a hiring manager at a desk, an SMB owner on a phone in a bright
shop. The Wolf Eyes screenshots are white UIs; on a dark ground they would float. One deliberate
dark block exists (the system diagram) because glowing packet flows read on dark and the block
is the page's single "machine room" moment. Nothing else inverts.

## Color
- `--bg` #FFFFFF · `--band` #F4F6F8 · `--band-2` #EEF1F4
- `--ink` #111827 · `--ink-body` #374151 · `--ink-dim` #5B6472 (AA on every ground)
- `--line` #D9DEE3 · `--line-strong` #C9CFD6
- Accent, one: `--accent` #0F766E deep teal (`--accent-deep` #0B5C56 for text/links on light,
  `--accent-lit` #2DD4BF on the dark block). The client's orange appears only inside screenshots.
- Dark block: `--dark` #0B1418 · `--dark-2` #122028 · `--dark-text` #E9F1F3 · `--dark-dim` #9FB3BB
- Strategy: restrained on light, committed inside the one dark block.

## Typography
- Display: Sentient 700 (500 for the hero lede). Chosen by Priyam over sans displays twice;
  identity preserved.
- Body and UI: General Sans 400/500/600.
- Mono: Fragment Mono 400, only for technical strings (tech stacks, times in the timeline, SKUs).
- Scale (~1.25): 13 / 15 / 17 / 21 / 26 / 33 / 41 / hero clamp(2.5rem, 4.7vw, 3.95rem).
- No eyebrows. Section headings stand alone. The only numbered sequence on the page is
  Scope / Build / Stay, which is a real sequence.

## Shape and depth
- Radius system: cards and sheets 20px, inner frames and demos 12px, buttons and pills full.
- Shadows are cool slate, layered, under 15% alpha. Planes get a deeper three-layer shadow.

## Components
- **Stage** (hero): CSS 3D perspective container; four planes (laptop frame, phone frame, two
  cards) carrying real screenshots. JS: cursor tilt via lerp, scroll separation per depth.
  Static collage without JS or under reduced motion.
- **Board**: the one marquee. True, dated status lines. Pauses on hover; wraps under reduced motion.
- **Diagram**: inline SVG, 1080×560 viewBox, packets on `offset-path`, nodes are links.
  Horizontal scroll on phones with a hint line.
- **Sheet**: white card, 1px line, 20px radius. Sticky stack on ≥1000px wide and ≥720px tall
  (JS sets each sheet's `top` so tall sheets pin bottom-in-view). Each sheet has its own visual
  family: mosaic, phone + timeline, comparison slider, allocation table demo, bucket demo.
- **Plate** (Donna): band-coloured, quieter register, small SVG.
- **Doors**: two white cards on the band, the hero planes echoed behind at half opacity with a
  vertical mask.

## Motion
- Easing: `--ease-out` cubic-bezier(.22,1,.36,1); `--ease-expo` cubic-bezier(.16,1,.3,1) for the
  plane entrance. Linear only for the marquee and packets. No bounce, no elastic.
- Durations: UI ≤250ms; reveals 700ms; plane entrance 1.1s staggered 110ms.
- Only transform, opacity, clip-path and filter animate. Scroll progress uses native
  `animation-timeline: scroll()` with a JS fallback.
- Reveals enhance a visible default: elements are visible without JS; JS hides only what is
  below the fold, once.
- Reduced motion: marquee wraps, stack becomes flow, planes still, tickers show final numbers,
  packets rest at a third of their path, comparison slider does not nudge.

## Verification
`node <scratchpad>/verify.mjs <outdir>` renders desktop 1440×900, mobile 390×844, reduced motion,
no-JS and 1280×720, screenshots every section, and reports console errors, 404s, horizontal
overflow and CLS. Ship only when all five passes report none / 0 / < 0.01, and the impeccable
detector (`node ~/.claude/skills/impeccable/scripts/detect.mjs --json index.html src/v2/site.css`)
returns `[]`.
