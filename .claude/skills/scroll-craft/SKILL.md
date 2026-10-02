---
name: scroll-craft
description: >
  Build or upgrade premium scroll-driven web pages: layered parallax heroes,
  pinned arguments, scrubbed video, horizontal rails, kinetic type, scroll
  reveals and one engineered peak, driven by a dependency-free engine and
  verified at desktop, phone, reduced-motion and no-JavaScript states. Two
  modes: build a new landing page (static HTML or a Next.js App Router route),
  or upgrade an existing page so scrolling feels premium without rewriting its
  content. Use whenever a user wants a page to "feel premium", "feel like
  Apple", "not look like a template", asks for scroll animation,
  scrollytelling, parallax, a pinned or sticky section, horizontal scrolling,
  video that plays as you scroll, elements that reveal on scroll, a cinematic
  or layered hero, an "interactive landing page", or says "scrollcraft", even
  if they never say scroll. Also use it to fix scroll animation that is janky,
  blank without JavaScript, or ignores reduced motion.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# scroll-craft

Scroll is the only input every visitor already knows how to use. This skill
treats it as a timeline: the wheel is a scrubber, the page is a film with real
text on top, and each section behaves differently enough that the visitor keeps
going to find out what the next one does.

The mechanism is `engine/scrollcraft.js` + `engine/scrollcraft.css`: a
dependency-free runtime that reads `data-sc-*` attributes off real, semantic
markup and drives them from one scroll value on one rAF loop. It never
generates DOM. You write the HTML (or JSX), it supplies the physics. The full
device list is at the top of the engine file and in
[references/devices.md](references/devices.md).

**What you produce:** a short brief, a journey and feeling curve with one peak,
a score (device per beat), one signature move, real markup on the token-driven
design floor, and screenshots proving it holds up at every scroll position.

## Two ways in

**Mode A: a new page.** A landing page for a brand, product or launch, built
from `references/template.html` (static) or as a Next.js route
([references/nextjs.md](references/nextjs.md)). Full brief, full score.

**Mode B: upgrade an existing page.** The far more common request inside a real
codebase: "make this feel premium". Keep the content and its order, wrap the
scroll-driven region in the engine, give ordinary sections a settled entrance,
and add one or two hero moments. Three-question brief, same quality bar, same
verification. Read [nextjs.md section 5](references/nextjs.md) for the React
version; for static HTML the same steps apply to the markup directly.

Decide the mode from what the user has. If they point at an existing page,
it is mode B unless they ask for a rebuild.

## What this is not

It is not "generate a flythrough and drop text on it." That approach produces
one device applied to a whole page, and every site built that way is
recognisable at a glance: same diorama, same centred copy, same `01 / 06`
counter, same "scroll to explore" nudge. Five sections that behave identically
are one section shown five times.

Four rules follow from that, and they are the spine of this skill:

1. **Variety is the product.** A page uses at least four device families and
   never the same device twice in a row. Read [references/devices.md](references/devices.md).
2. **The world is photographic unless the brand is genuinely illustrated.**
   Soft matte low-poly clay diorama is banned as a default. Read
   [references/worlds.md](references/worlds.md).
3. **No continuous chain.** A single unbroken camera flight is the most
   expensive and most fragile thing you can build, and it exists only to hide
   cuts between scenes. Vary the device instead and the cut disappears for free.
   Chain only when the brief is literally "one continuous journey"
   ([references/worldflight.md](references/worldflight.md)).
4. **A different world is not a different page.** The device kit varies how a
   page looks. Structure is a separate axis and has to be decided deliberately,
   or every build inherits the same skeleton. Read
   [references/uniqueness.md](references/uniqueness.md).

## Hero depth is the baseline

**Dimensional layering is a baseline requirement for a premium marketing
hero.** Plan independently moving background, subject, foreground and
atmospheric planes before touching assets. A beautiful single background with
text fades does not qualify. Depth comes from visible separation, occlusion and
controlled differences in movement, while the headline stays readable and the
scene tells one clear story. Read [references/hero-depth.md](references/hero-depth.md)
before planning the hero. Honor explicit static or simpler directions, and keep
the depth in the static composition when motion is reduced.

## Step 0: Preflight and stack

Run the preflight instead of checking by hand; it knows the failure modes that
otherwise surface later as misleading errors:

```bash
node <skill>/scripts/doctor.mjs
```

It reports node, the stack it found (Next.js, React, static), a full ffmpeg
build (only needed to encode scrub clips), playwright-core and Chrome (only
needed for the verification pass), and where `scrollcraft/` will live at the
project root. Say plainly which optional items are missing and which steps that
limits, rather than working around them silently.

Then:

- **Next.js or React:** read [references/nextjs.md](references/nextjs.md) now.
  It covers the head script, the mount component, JSX attributes and the
  Next-specific verification.
- **Static HTML:** copy `engine/scrollcraft.js` and `engine/scrollcraft.css`
  next to the page and start from `references/template.html`.
- **Either way:** never edit the engine per project. Theme it with tokens and
  write your own markup; bespoke behaviour is page-local code driven off
  `--sc-p` and your own `data-*` attributes.
- Read the brand kit if one exists (colours, logo, type, product shots), and
  obey its hard rules. A brand that forbids invented numbers means no stat
  counters, however good they look.

## Step 1: The brief

**Establish the brief before building anything**, and write it to
`scrollcraft/BRIEF.md` (mode B: `scrollcraft/BRIEF-<page>.md`) in the user's
words, not paraphrased into marketing prose. Reuse answers and assets already
given. When the user explicitly delegates creative direction ("use your
judgment", "get out of your way", "no photos yet, just show me"), write a brief
headed `Self-authored under explicit creative delegation`, answer every question
in the brand's voice, distinguish evidence from assumptions, and proceed without
inventing user quotations or forcing an approval checkpoint. Otherwise ask, in
one pass, in plain prose. Never offer a fabricated multiple-choice list of
industries; it reads as you deciding their business for them.

**Mode A, six questions:**

1. **What is this, who is it for, and what must the visitor believe by the
   end?** One or two sentences, plus the single sentence the page exists to
   install. If they give three, make them pick.
2. **Vibe in three to five words**, plus up to three references from any medium
   (a film, an album cover, a shop, a game). Not "sites you like": naming sites
   is how a page ends up looking like an existing site. Then how far from
   premium-minimal they want to go: brutalist, maximalist, playful, retro,
   dense, editorial, premium-minimal ([uniqueness.md section 5](references/uniqueness.md)).
3. **The scroll journey in their words, and where it is calm and where it is
   intense.** What the visitor hits first, next, last. Their sequence, not a
   menu you offered.
4. **How should someone feel while scrolling, stage by stage, and what is the
   ONE moment they should remember?** The stage-by-stage answer becomes the
   feeling curve; the one moment becomes the peak. Both are required in the
   brief ([references/feel.md](references/feel.md)).
5. **One thing this site should do that no site they have seen does.** The seed
   of the signature move. Push for a real answer; "be memorable" is not one.
   And: one unbroken world, or distinct scenes? The biggest structural fork,
   and it is their call.
6. **What do they already have, and what does the visitor do next?** Footage,
   photos, product shots, brand kit; "nothing" is a fine answer. Plus the one
   action and the one label for it, used everywhere on the page.

**Mode B, three questions:**

1. Which page or sections, and what must stay exactly as it is (content, order,
   nav, forms)?
2. The feeling they want while scrolling, in a few words, and the one moment
   that should stand out.
3. What assets exist (photos, product shots, footage) and what the visitor
   should do at the end.

BRIEF.md must contain, at minimum: the answers (verbatim where supplied,
labelled as authored where delegated); the **feeling curve**, one line per act,
the emotion then what on screen causes it; the **peak**, written as the sentence
a visitor would say to a friend, plus which act it lives in; the completed
**tell-someone sentence** ("It's the site where ___", filled with an experience,
not a device name); and any authored silence, so the verification pass can tell
it from dead scroll.

## Step 2: Journey, grammar, score

Write the **journey** first: four to seven beats, each one a shift in what the
visitor knows or feels. Beats are the spine; sections serve beats, and a
section that serves no beat is cut however nice the shot is. In mode B the
beats are the page's existing sections, named for what they do.

```
1  Recognition   they see their own morning
2  Tension       the cost of it, named plainly
3  Turn          the thing that changes
4  Substance     why it holds up
5  Range         what they can choose
6  Commitment    the one action
```

Then, in order, with full detail in [references/uniqueness.md](references/uniqueness.md):

**Pick a grammar.** Eight are defined, each with what it leans on, what it bans,
and how its nav, hero and close follow. Filmic one-shot is the one everybody
reaches for first, so choosing it means saying in the report why the other
seven did not fit the brief. A new grammar is allowed when its navigation,
sequence, ending and bans describe a different structure; a new label alone
earns no credit.

**Invent the signature move.** One bespoke interaction that lives on this site
alone, coded in the page, not a parameter change to a kit device. Question 5
of the brief is the seed.

**Run the repeat check** ([uniqueness.md section 4](references/uniqueness.md)):
the plan differs from the template and from the last page you built on at least
four of six dimensions (grammar, nav, hero device, act-sequence shape, close,
signature move). If it fails, change the plan.

**Write the feeling curve before the score table.** One line per act: the
emotion, then what causes it. Curve first, devices second, because a device
chosen before the feeling is a device looking for a reason. Two adjacent acts
with the same feeling means one is filler. Name the peak in the same pass and
give it the largest span on the page.

Then assign each beat a device and write it down:

| Beat | Device | Why this one |
|---|---|---|
| Recognition | `scrub` | The camera moving under the reader's own hand is the strongest possible open |
| Tension | `pin` + kinetic | Copy assembles line by line while the frame holds still |
| Turn | `reveal` | A wipe is a change of state, which is what this beat is |
| Substance | `scrub` (macro) | Texture at a scale the eye cannot get otherwise |
| Range | `pan` | Lateral travel reads as "options", vertical reads as "argument" |
| Commitment | `pin` + pointer | The page stops moving and starts responding |

That table is a **filmic** score. It is the right shape for one grammar and the
wrong shape for the other seven, so read your grammar's leans-on and bans list
before filling in a row.

Checks before you build:

- The grammar's bans hold. A grammar that forbids `pin` forbids it here too.
- Four or more distinct device families. Fewer means the page has one idea.
  (Mode B: three is acceptable when the page is short; `flow` + `in` counts.)
- No device family twice in a row.
- At most two `scrub` acts. Video is the heaviest thing on the page, and the
  third one stops being a surprise. No clips at all is a legitimate score.
- No two adjacent acts carry the same feeling.
- One act is the peak and it has the largest span by a visible margin. The act
  before it is quieter than it is.
- Every act earns its scroll span. Eight to fourteen viewport-heights is a
  pacing reference for long cinematic pages, not a quota. Editorial, gallery,
  and working-surface grammars stay short when the journey is complete. Never
  add filler or empty pinning to hit a length.

Show the plan to the user when their decisions are needed; under explicit
delegation, record it and proceed.

## Step 3: Assets

Full detail in [references/assets.md](references/assets.md). Short version:

- **The client's own photos, product shots and footage come first.** Grade
  flat footage before encoding; do not fix it with a CSS filter over the frame.
- **No generator is bundled.** If the brief needs imagery nobody owns, use
  whatever image or video tool the user has, with one style preamble reused
  verbatim in every prompt so separate images read as one shoot. Look at every
  asset before using it.
- **Encode for scrubbing, not playback.** `scripts/encode.sh` sets a dense GOP
  because seeking walks from the previous keyframe; a normal web encode plays
  perfectly and scrubs like mud. Cut phone clips portrait from the masters.
  Every clip's poster is its own first frame.
- **Layer the hero.** Clean plate, real alpha cutouts, shared contact anchors,
  per hero-depth.md. Depth from differential movement is the cheapest premium
  signal on the page.
- **No assets yet?** Build with reserved boxes (`aspect-ratio`, a surface
  colour, an honest label) rather than stock or invented imagery, and say so.

## Step 4: Build the page

Write real HTML or JSX. Real `<h1>`, real `<p>`, real links, real reading
order. The engine reads `data-sc-*` off your markup and drives it.

- Static: start from `references/template.html`, then delete what you do not
  need and write your own markup for what you keep. A page that keeps the
  template structure verbatim looks like every other page that did.
- Next.js/React: follow [references/nextjs.md](references/nextjs.md): head
  script, `<ScrollCraft>` mount component per page, engine files unedited.
- Device patterns: [references/devices.md](references/devices.md). Spacing,
  type, depth and colour rules: [references/taste.md](references/taste.md).
  Read taste.md before writing markup, not after, and build without announcing
  the checklist.
- Theme by overriding tokens, six values and two fonts:

```css
:root {
  --sc-canvas: #0A0806;  --sc-surface: #16110E;
  --sc-ink:    #F5EBDD;  --sc-ink-soft: #A2968A;
  --sc-accent: #FF5A3D;  --sc-accent-ink: #15110F;
  --sc-font-display: "Archivo", system-ui, sans-serif;
  --sc-font-text:    "Geist", system-ui, sans-serif;
}
```

- Content must survive without the engine. The stylesheet only hides cued
  copy under `html.sc-js`, which the engine and the inline head script set.
  Do not add your own `opacity: 0` starting states outside that gate.

## Step 5: Verify by scrolling it

Not optional, and not "it should work." A scroll page has no single state:
every position is a different frame, and the failures live between the two you
happened to look at. Full procedure: [references/verify.md](references/verify.md).

```bash
npm i -D playwright-core                                  # once, in the project
node <skill>/scripts/serve.mjs --root . --port 4500 &     # static builds; Next.js uses `npm run dev`
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out scrollcraft/lab/shots
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out scrollcraft/lab/mobile --width 390 --height 844
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out scrollcraft/lab/reduced --reduced-motion
```

The harness walks each act at six positions, waits for scrub video to settle,
and reports **dead scroll**, **cues that never reach full opacity**, and
**contrast measured on the composited page** under each line. It writes a
contact sheet.

Then do the parts the harness cannot:

- **Read `sheet.png`.** It proves a clip advances; it cannot tell you the
  composition is good or the page means anything.
- **Disable JavaScript and reload.** Every headline and paragraph is readable;
  nothing sits at opacity 0. This is a hard requirement, not a nicety.
- **Tab through** for focus order; focused controls inside pinned acts are
  visible.
- **The feel check** ([feel.md section 6](references/feel.md)): scroll the page
  cold, write one word per act for what you felt, then diff against the
  intended curve in BRIEF.md. Where they disagree the page is wrong, not the
  brief. Confirm the peak is the largest visual change and holds the most
  scroll room, and that the last screen resolves instead of fading to nothing.
- **Next.js:** navigate away and back with the client router; exactly one
  engine instance, no console errors.

**Say what a green run does not cover: a real phone.** Headless Chrome cannot
reproduce an iPhone's video decoder, autoplay policy, Low Power Mode or touch
scrolling. Mobile is a first-class target throughout, not a pass at the end:
portrait clips, touch-tuned lerp, grown tap targets are authored. When a
mobile defect is reported, deploy `references/device-diag.html` beside the site
and let the device answer rather than theorising from a machine that cannot
reproduce it.

Fix what you found and shoot it again. Report what you actually verified and
what you did not.

## Hard rules

Ship-blockers, not preferences. Each one is a thing that makes a page read as
machine-made or broken.

| Never | Instead |
|---|---|
| Clay diorama / low-poly / claymation as the default world | Photographic. See worlds.md |
| A "scroll" cue, arrow, or animated mouse icon | Nothing. They are looking at the hero; they know |
| `01 / 06` section counters | Delete them. Sequence is not information here |
| An eyebrow above every section heading | At most one per three sections |
| Em dash anywhere visible | Period, comma, colon, or parentheses |
| Centred copy in every act | Vary the anchor: lead, trail, centre, split |
| The same device twice in a row | Score the journey properly in Step 2 |
| Building before the brief is written | Step 1. Record answers or explicitly delegated decisions in BRIEF.md |
| A page with no engineered peak, or with three competing ones | One peak. It gets the asset budget, the silence before it, and the most scroll room |
| An ending that trails off, fades out, or just becomes a footer | The close resolves and holds |
| Planning acts before the feeling curve exists | Curve first, devices second |
| Shipping without one bespoke signature move | Invent one. A recoloured spotlight or a retuned tilt is not one |
| Editing the engine to get a bespoke behaviour | Bespoke JS in the page, driven off `--sc-p` and your own `data-*` |
| Reaching for filmic one-shot by reflex | Pick from all eight grammars, and say why the other seven lost |
| Content hidden when JavaScript does not run | Hidden states only under `html.sc-js`; verify with JS disabled |
| A full-frame dark overlay to fix contrast | A scrim only where the text sits |
| Text baked into an image | Real markup, always |
| Invented statistics in a counter | Only real numbers. No number, no counter |
| `transition: all`, or animating width/height/top/left | `transform` and `opacity`; `clip-path` for wipes |
| Gradient text, neon glow, zero-offset coloured halo shadows | Weight and size for emphasis; shadows with offset and blur |
| Autoplaying audio, or any audio on a scrub clip | Strip the track. `encode.sh` already does |
| Mounting the engine in a persistent layout, or without teardown | Mount per page, `destroy()` on unmount (nextjs.md) |
| Shipping without running Step 5 | Run Step 5 |

## Output

The page (and BRIEF.md), then a short report: the mode and stack; the grammar
and why the other seven lost; the signature move; the repeat-check result; the
journey, feeling curve and peak; the feel-check diff and what you changed; the
score table; what assets you used or reserved space for; what you verified
with screenshots, including the no-JS and reduced-motion states; and anything
you could not verify and why (missing ffmpeg, no browser, no real phone). Say
if the brief was self-authored. Give the local URL. Keep it brief; the page is
the deliverable.
