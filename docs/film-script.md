# THE FILM — scene-by-scene script
### Portfolio v2 · cinematic scrollytelling · gate deliverable (no build until approved)

**Format:** one continuous scroll-film. Scenes pin and hand off; no hard section boundaries.
**Engine:** GSAP ScrollTrigger + Lenis smooth scroll. Swarm (three.js, instanced ink marks) is the recurring character.
**Tokens that survive:** paper `#F4F1EA` · ink `#141310` · red `#C8430A` · Zodiak / General Sans / Fragment Mono.
**Voice:** senior PM writing for everyone. Short lines. Funny, lightly sarcastic, zero jargon.
**Motion doctrine:** per scene, ONE element carries the motion-meaning. Everything else holds still. Transform/opacity only on scrubbed properties. 60fps mid-laptop AND mid-phone. `prefers-reduced-motion` = static-but-beautiful per scene.
**Nav (fixed, minimal):** `PS.` — Work · Story · What I Do · Contact (anchors into the film).

---

## SCENE 0 — THE HOOK *(the screen-recordable five seconds)*

**Message:** A name arrives like a title card. You already want to know who this is.

**Copy:**
> *(kicker, mono, small)* AHMEDABAD, INDIA — POP. 8 MILLION. TEAMS OF ONE: AT LEAST 1.
>
> # PRIYAM SHETH
>
> *(the hook line — see candidates below, one line, stamps in after the name)*

**Choreography (the ONE mover: the swarm):**
- t=0s: paper is empty except the tiny kicker. ~2,000 ink marks fly in from screen edges over ~1.4s and **assemble INTO the letterforms of PRIYAM SHETH** — the name is literally built by the team. (Letterform targets sampled from an offscreen canvas render of the name; marks lock onto sampled pixel positions.)
- t≈1.8s: assembly complete, marks settle with a tiny breathing idle. The hook line **stamps** in below (one hard `steps()` arrival — the only non-swarm motion).
- Scroll begins the film: the name **pins**; scroll scrubs marks peeling off the letterforms — the name erodes from serif tips outward — and the freed marks stream downward off-screen (they're "leaving for work"). Name fully dissolves by scroll +100vh; hook line fades last.
- **Mobile:** name stacks (`PRIYAM` / `SHETH`), assembly identical, marks count 900. Thumb-scroll scrubs the erosion — buttery, this is the share moment.
- **Reduced motion:** name pre-assembled from marks (static), hook line present, no pin — scrolls as a normal page.

**Handoff:** the departing mark-stream is picked up at the top of Scene 1 — same marks, same direction, arriving into the reveal.

---

## SCENE 1 — THE REVEAL *(what "team" means)*

**Message:** The team is AI coworkers. He runs them. It's funnier than it is scary.

**Copy (beats scrub in one line at a time, each replacing the last):**
> Here's the thing nobody tells you about working alone: **it's a lot of work.**
>
> So I built coworkers.
>
> Not hired. **Built.**
>
> Some of them write the code. One of them checks everyone's work — including mine. None of them attend meetings.
>
> I make the decisions. They do the typing.
>
> Together, we ship software that runs real businesses. Scroll — I'll introduce everyone.

**Choreography (the ONE mover: the swarm, becoming characters):**
- The mark-stream from Scene 0 arrives and **splits into four small clusters** as the beats progress. As each copy beat lands, one cluster tightens into a neat little formation with a plain mono label fading in beneath: `the builders` · `the checker` · `the memory` · `me (human)`.
- The `me (human)` cluster is a single mark. Red. *(The joke lands visually: three organized clouds and one lonely red dash.)*
- Text beats: scrubbed opacity/position swaps pinned at viewport center — copy is the rhythm, swarm is the meaning.
- **Mobile:** clusters stack vertically as beats pass; same single red mark punchline.
- **Reduced motion:** all six lines visible as staged text; a static four-cluster illustration with labels.

**Handoff:** the four clusters merge into one tight ball, which shrinks and shoots down-screen like a sent message → Scene 2 opens with a phone-shaped frame catching it as an incoming message dot.

---

## SCENE 2 — DONNA *(proof #1: the assistant that actually remembers)*

**Message:** He built a real AI chief of staff — with memory, manners, and a reviewer.

**Copy (scene intro, two lines):**
> Meet **Donna**. My chief of staff.
>
> She lives in my chat app, remembers everything I tell her — and unlike me, she never loses the thread.

**Choreography (the ONE mover: a chat conversation replaying):**
- A paper-toned chat panel pins center screen. Scroll **scrubs a conversation replay** — bubbles pop in sequence with authentic rhythm (typing dots → message). The conversation is a real-flavored dramatization of her actual first solo mission:
  > **Me:** fix it
  > **Donna:** On it. Sent a builder to look.
  > **Donna:** Found the bug. Fixing…
  > **Donna:** My reviewer checked the work and ran the tests. All green.
  > **Donna:** Done. Cost: $0.35. Diff attached. You may now return to your chai. ☕
- Beside the chat (below, on mobile), three plain receipts fade in one per scroll-beat:
  - **"20/20** on her memory recall test."
  - **"Zero** times she's googled my personal life. That's a rule she passed a hostile exam on."
  - **"She asks first** before doing anything that can't be undone."
- Then the diagram-scene: **"How she thinks"** — a simplified, plain-language redraw of her architecture **draws itself** on scroll: `you (phone)` → `her memory` → `her rules` → `her helpers` — connectors ink in one by one, boxes materialize in narrative order, and the payoff beat is the mission loop tracing in **red**: `you say two words → a builder builds → the reviewer approves → your phone buzzes`. Label under it: *"her own reviewer signs off before I ever see the work."*
- **Mobile:** chat panel is naturally phone-shaped — this scene is BEST on mobile. Diagram pans horizontally with a scroll-linked draw.
- **Reduced motion:** conversation fully rendered as a static chat transcript; diagram pre-drawn.

**Handoff:** Donna's last checkmark ✓ turns into a single ink mark, drifts up, multiplies into a small swarm that flows right — into Scene 3's first product photo frame.

---

## SCENE 3 — WOLF EYES B2B *(proof #2: real store, real money)*

**Message:** A real B2B platform where real dealers order and real accounting happens — built to not mess that up.

**Copy:**
> An eyewear brand was running dealer orders on phone calls, WhatsApp, and hope.
>
> Now: dealers log in, see **their** prices (and only theirs), and order. Every order lands **directly in the company's real books.**
>
> If anything looks weird — a login spike, a stuck order — the boss's phone gets pinged before it becomes a problem.
>
> *(receipt row, mono, plain)* 1,600 products, synced automatically · orders land in the real accounting · big red buttons require a human

**Choreography (the ONE mover: the filmstrip):**
- A **horizontal swipe gallery** — filmstrip frames (blur-redacted screenshots, small, cinematic) — pins and scrubs sideways with vertical scroll on desktop; native swipe with snap points on mobile. Subtle per-frame parallax (frame moves, caption counter-drifts 4px — nothing else).
- Frames: catalogue (blurred prices) → sign-in → order screen (blurred numbers) → the boss's daily dashboard. Captions in PM voice: *"dealers see their prices — you don't, that's the point (blurred)"*, *"orders, with a paper trail"*, *"the morning glance"*.
- Then the diagram-scene: **"Where an order goes"** — draws on scroll: `dealer taps order` → `the right approver sees it` → `the books` — with the **red path** animating last as the payoff: *order → real accounting, no human re-typing.* One extra labeled mark on the price line: a little blur-icon — *"prices are scrambled before they ever leave the server."*
- **Reduced motion:** gallery becomes a static 2×2 grid; diagram pre-drawn.

**Handoff:** the last filmstrip frame's edge lines keep moving and become the ruled lines of Scene 4's clock face.

---

## SCENE 4 — PALAK OS *(proof #3 + THE OFFERING: the business that reports itself)*

**Message:** He gave an entire company an operating system. Yours can have one too.

**Copy:**
> Every evening at **7:30**, two founders' phones buzz.
>
> The day's sales, the money in, the money out — summarized and delivered. Automatically. **Since March 2026.** Nobody types anything.
>
> Their whole business runs through it: dashboards, stock intelligence, an AI they can just… talk to on Telegram.
>
> *(receipt row)* every weekday, 7:30pm, unattended · answers questions in plain language · big actions wait for the owner's OK
>
> **(the pitch beat, set apart)** This is a thing I build for businesses. If yours runs on spreadsheets and someone's memory — it doesn't have to.

**Choreography (the ONE mover: the clock → the buzz):**
- Scene opens on a huge, minimal **clock face** drawn in ink hairlines, pinned. Scroll **scrubs the hands** sweeping toward 7:30. Paper dims almost imperceptibly toward evening (2% tint — allowed, it's opacity).
- At 7:30 the beat lands: a phone outline slides up from bottom holding a *real* (cropped) screenshot of the report as delivered, and **buzzes once** (2px shake ×2 — earned motion). Founders' names redacted-by-blur.
- Swipe gallery (3 frames): the operations dashboard → the AI team screen → the terminal receipt (captioned *"the part clients never see: the engine room, running for months"*).
- Diagram-scene: **"What happens at 7:29"** — draws itself: `the schedule fires` → `it reads the books` → `writes the summary` → `checks itself for leaks` → **red payoff** `→ two phones buzz`. Plain caption: *"the whole loop, no humans involved. they just read it."*
- The pitch beat gets a quiet frame and a single red-bordered button: **"I want this →"** (anchors to Scene 7's business door).
- **Reduced motion:** clock rendered at 7:30, phone already up, diagram pre-drawn.

**Handoff:** the clock's red 7:30 tick detaches, becomes a single mark, and races ahead of the scroll into Scene 5 — where it hits a photo and the photo transforms.

---

## SCENE 5 — STUDIO ONYX *(proof #4: the seven-day thing)*

**Message:** Speed, when it's asked for — without dropping the engineering.

**Copy:**
> A client asked: *"can the product photos just… fix themselves?"*
>
> Seven days later, the answer was installed on his computer.
>
> First night on the job: **136 photos, processed overnight,** while everyone slept.
>
> *(one engineering wink, plain)* You can close it mid-batch and it picks up exactly where it left off. Like a good employee, it writes things down.

**Choreography (the ONE mover: the counter + progress strip):**
- A film-processing strip (7 small stations, plain labels: *checks the photos → uploads → the AI works → downloads → polishes → done*) pins; scroll **fills the strip** left to right while a big mono counter ticks **0 → 136**. The counter is the scene's heartbeat.
- At 136: the strip's last station stamps ✓ and the words *"while everyone slept"* settle in under it.
- **Mobile:** strip pans with the fill; counter fixed center. Snappy, satisfying.
- **Reduced motion:** strip full, counter at 136, copy staged.

**Handoff:** the ✓ dissolves into marks; the marks drift down and gather loosely around a rectangular frame fading in — Scene 6's portrait.

---

## SCENE 6 — THE HUMAN *(there's one actual person here)*

**Message:** Behind the robots: one person, a short honest history, a face (or a monogram with attitude).

**Copy:**
> One human on this whole page. Hello.
>
> *(timeline, each entry one line, plain + wry)*
> **2024** — Computer science degree. ML specialization. 8.55 GPA — the robots respect it.
> **2024** — Taught machines to see (computer-vision internship).
> **2025** — Data analyst. Learned what businesses actually look like from the inside: spreadsheets. So many spreadsheets.
> **2025 — now** — Stopped applying to teams. Built one instead.

**Choreography (the ONE mover: the timeline entries):**
- Portrait frame (photo if provided, else the `PS.` monogram — caption either way: *"artist's rendering"* if monogram — the joke sells the fallback) sits still on the left. Timeline entries **slide in from the right edge, one per scroll beat**, each settling onto a hairline. The swarm idles as loose margin dust here — quiet scene, breathing room before the ask.
- **Mobile:** portrait on top, entries slide from right, stacked.
- **Reduced motion:** everything placed, no slides.

**Handoff:** the hairlines under the timeline entries extend and converge toward two door-shaped outlines forming below → Scene 7.

---

## SCENE 7 — THE ASK *(two doors, no maze)*

**Message:** You're here for one of two reasons. Both have a button.

**Copy:**
> You made it to the end. That usually means one of two things.
>
> **Door 1 — you're hiring.**
> You want someone who ships like a department. I come with my own team, and they don't need desks.
> `→ priyamsheth777@gmail.com` · GitHub · LinkedIn
>
> **Door 2 — you run a business.**
> Somewhere in your company, a human is doing a robot's job. Let's fix that.
> `→ Tell me about your business` *(red button — the only red button on the page)*
>
> *(sign-off, small, mono)* The team's ready when you are.

**Choreography (the ONE mover: the swarm's finale):**
- Two tall door-cards stand side by side (stacked on mobile). As the scene pins, the swarm — every mark from the whole film — streams back in and **assembles into a final full-stop period** after "The team's ready when you are." Holds. Breathes. That's the end of the film.
- Doors themselves don't animate beyond a hover/press state (150ms). The finale belongs to the swarm.
- **Reduced motion:** period pre-assembled; doors static.

**Footer (not a scene, one quiet line):**
> Made by me and the team · no trackers, no cookies, nothing creepy · Ahmedabad, 2026

---

## HERO HOOK — 8 CANDIDATES (Scene 0's stamped line)

1. **"Some people hire a team. I typed mine."** — shortest reveal; quotable; "typed" does all the work.
2. **"I got tired of doing everything alone. So I built my coworkers."** — warm origin-story energy; instantly relatable.
3. **"My coworkers are AI. I'm still the difficult one."** — self-deprecating; humanizes; very shareable.
4. **"One person. Ships like a company. The company is robots."** — deadpan escalation; strong rhythm.
5. **"My team never sleeps, never argues, and never eats my lunch."** — office-life joke everyone gets; longest.
6. **"I don't have employees. I have well-managed electricity."** — absurdist; memorable; slightly colder.
7. **"Zero meetings. Zero standups. Somehow, everything ships."** — corporate-pain relatable; the wink lands late.
8. **"I stopped waiting to be hired by a team. I built one."** — sincere version; least funny, most LinkedIn-safe.

**Recommendation: #1 as the stamped hook** (*"Some people hire a team. I typed mine."*) — it's the fastest laugh-then-get-it in the set, reads in under two seconds (screen-record friendly), and pairs perfectly with the name-assembly visual (the marks literally *typed* him into existence a second earlier). **Use #3 as the Scene 1 closer variant** if we want a second beat of the same voice later. If you'd rather open sincere and save the jokes, #2 is the alternate.

---

## PRODUCTION NOTES (for the build phase, once approved)

- **Pin map:** Scenes 0–5 and 7 pin (one active pin at a time, ~100–250vh scrub each); Scene 6 is un-pinned normal flow (breathing room). Total scroll ≈ 12–14 screen-heights. Mobile identical structure, shorter scrub distances.
- **Swarm as character:** one persistent three.js canvas, fixed, full-viewport, z-index under content; scene index drives its behavior state machine (assemble-name → stream → clusters → chat-dot → idle-dust → finale-period). Letterform assembly via offscreen text rasterization → target points. Same perf rules as before (instanced, DPR-clamped, pauses when idle, 900 marks mobile).
- **Engine:** GSAP (now fully free) + ScrollTrigger, Lenis for smoothing — vendored locally like three.js. Scrubbed properties: transform/opacity only. Pins use `position: fixed` transforms (ScrollTrigger default) — no layout thrash.
- **Galleries:** CSS scroll-snap horizontal strips; ScrollTrigger horizontal scrub on desktop pin; native touch on mobile (no scroll-jacking on touch).
- **Diagrams:** rebuilt as plain-language SVGs (new labels, same drawing conventions + the collision audit — audit script stays mandatory); stroke-draw via `stroke-dashoffset` scrub; box materialization via opacity/transform. Red path is always the final beat.
- **Blur redactions:** re-processed from ORIGINAL screenshots with gaussian blur regions (Pillow), never bars. Same sensitive-region inventory as before.
- **Reduced motion:** every scene ships its composed static state (listed per scene above); film degrades to a beautiful essay.
- **Copy ban list enforced:** no doctrine/case files/exhibits/FIG./ledger/adversarial/maker×checker anywhere user-facing.

---

*GATE: approve the script + pick the hook (or redirect). No scene gets built until then.*
