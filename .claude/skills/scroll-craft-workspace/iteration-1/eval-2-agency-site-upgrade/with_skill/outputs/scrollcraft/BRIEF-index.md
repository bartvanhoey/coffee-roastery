# BRIEF: Northlight Studio, index.html (mode B upgrade)

Partly self-authored under explicit creative delegation. The task said "do not
use interactive questions; make reasonable decisions and record them in the
brief". Answers marked **[user]** are the user's words. Answers marked
**[authored]** are decisions I made and am accountable for.

## Mode and stack

Mode B (upgrade an existing page). Static HTML: `site/index.html` +
`site/styles.css`. Engine files copied unedited next to the page as
`site/scrollcraft.js` and `site/scrollcraft.css`. Preflight: Node 22 ok,
playwright-core ok, Chrome ok, **ffmpeg missing** (no consequence: no scrub
clips are scored; the contact sheet is tiled with Playwright instead).

## The three mode-B questions

**1. Which page, and what must stay exactly as it is?**
[user] "Here is our studio website: index.html and styles.css in the site
folder. A client told us it looks like a template." "Do not change the copy,
the section order, the nav or the contact form."
Reading of that constraint: every visible word, the seven-section order, the
sticky bar and its four links, and the form (fields, labels, action, button)
are untouched. Markup may gain wrappers and `data-sc-*` attributes; layout and
type metrics may be refined; no new visible words are added anywhere. The
one place text is generated is the image placeholders, which display each
image's existing `alt` text (already the site's copy) until the asset arrives.

**2. The feeling while scrolling, and the one moment that should stand out.**
[user] "Make the scrolling feel premium and considered, in keeping with a
design studio that works for hardware companies."
[authored] The moment that stands out: the process section. Its own copy says
"designed together so they agree", and a hardware studio's native drawing is
the exploded view. So: as the visitor reads Discover, Define, Design, Deliver,
an exploded drawing of the hero's own subject (a speaker on a plinth) closes
up part by part until it is one object. That is the peak and the signature
move, and nothing else on the page is allowed to compete with it.

**3. Assets, and what the visitor does at the end.**
[user] "The images referenced under assets/ are not in the folder yet, so treat
them as placeholders that will be filled in later."
[user, from the page] The one action is "Start a project" (bar, hero, form).
It stays the only CTA label.
[authored] Placeholders are reserved plates: correct aspect ratio, surface
colour, hairline, the alt text as a small label. No stock, no generated
imagery, no invented photography. The `<img>` tags keep their `src`, `width`,
`height` and `alt` so dropping the files into `assets/` completes the page
without touching markup.

**Also required:** [user] "It has to work on phones and for people who have
reduced motion turned on. Show me how you checked it."

## Decisions recorded (things I chose without asking)

- Brand palette kept: cream `#f6f3ee`, ink `#17150f`, muted `#6b6559`, rust
  `#c8471f`. It is the client's, so it is not up for rotation. One hard-cut
  graphite ground (`#1c1a17`) is added for the peak and the accent takes a
  second, lighter stop there (`#e8794f`) so it clears contrast on dark. Same
  hue, two lightnesses, per the light/dark hard-cut exception.
- Type families kept: Helvetica Neue/Arial display, Georgia text. Changing
  the faces would change the brand, and the brief is about scroll. Metrics
  are tightened (tracking on display sizes, `text-wrap: balance`, measure).
- No scrub video: there is no footage and none should be invented.
- No pointer devices (spotlight, magnet, tilt). A drawing does not chase the
  cursor, and a page about composure should not fidget.
- No `drift`. Seven short acts would have several part-way through at once,
  so grounds are painted per section and change on hard edges.
- Grounds: cream for hero, work, numbers, quote, team; graphite for the
  process peak; warm stone (`#ece6da`) for the contact close and footer, so the
  last screen is one settled plate.

## Journey (the existing sections, named for what they do)

```
1  Composure    the hero plate, layered, headline first
2  Evidence     four pieces of work, settling into a grid
3  Method       the four steps, and the object closing up   <- PEAK
4  Weight       three real figures, landing once
5  Trust        a client's sentence, assembling line by line
6  Faces        the four people, arriving as one strip
7  Resolve      the form, on its own ground, holding
```

## Feeling curve (one line per act; emotion first, cause second)

```
1  Composure   a mounted photograph with a wall behind it and a slab in front, planes separating slightly as the hand moves
2  Curiosity   the work grid settles in reading order; nothing shouts, so the eye looks
3  Attention   the frame holds for four screens; each step read, one part of the drawing travels home
4  Weight      the numbers count up once, hard ease-out, and stop
5  Trust       a customer's words assemble a line at a time, then the name under them
6  Warmth      four portraits revealed by one wipe, left to right, the way you meet a room
7  Resolve     the form on a stone ground, fields settled, nothing moving
```

No two adjacent acts share a feeling. Act 2 is deliberately quieter than act 3:
it is the silence before the peak.

## Peak

Act 3, "How we work". The visitor's sentence to a friend:

> "You scroll through how they work and the speaker from the top of the page
> puts itself together, one part per step, until it's whole."

It gets the largest span on the page (a 4vh pin; every other act is a plain
flow section of about one viewport), the only dark ground, and the only
bespoke code.

## Tell-someone sentence

It's the site where the product assembles itself while you read how they
would build yours.

## Signature move

"The exploded view closes." An SVG exploded drawing of the hero's speaker
(plinth, body, grille, dial) spread along a 30-degree explosion axis with a
dashed axis line, each part travelling to its seated position during the
scroll window of one process step, the axis line fading and a contact shadow
appearing as the last part seats. Driven entirely from the engine's `--sc-p`
with CSS `calc()`/`clamp()`; a few lines of page JS publish the rendered
assembly state to `data-sc-verify-state` so the harness can see it. Under
reduced motion and without JavaScript the drawing is shown assembled.

## Grammar: "drawing sheet" (a named new grammar, mode B constrained)

The page is a set of drawing sheets from a hardware studio. Chrome: the
existing sticky bar, kept as the title block. Sequence: sheets cut on hard
grounds; nothing blends. Hero: a mounted plate with real planes (wall, plate,
light, slab) rather than a full-bleed film. Peak: an exploded view assembling.
Close: the inquiry form set as a sheet of its own on a stone ground, held.
Bans: scrub video, drift, pointer devices, centred copy, more than one dark
ground.

Why the other eight lost:
- Filmic one-shot: no footage; forbids hard cuts; its hero and close (scrub,
  spotlight, magnet) are exactly what makes sites read as templates.
- Chaptered editorial: forbids a fixed/sticky bar, and the bar must stay.
- Live surface: this is not software.
- Continuous world: no geography, and it forbids sections; content order is
  fixed.
- Typographic poster: forbids photographic ground; the work photos are the
  studio's evidence.
- Gallery/catalog: forbids a single hero claim; the claim must stay.
- Split stage: no two-sided argument here; forbids a bar.
- Rhythmic cutlist: composure, not pulse; forbids `pin`, which the peak needs.

## Score

| Beat | Act | Device | Span | Why this one |
|---|---|---|---|---|
| 1 Composure | hero | `parallax` planes (wall +0.9, light +0.6, plate +0.35, slab -0.25) + `in` settle on copy | flow, ~1vh | Depth from differential movement is the baseline for a premium hero; copy rides at 1x |
| 2 Evidence | work | `flow` + `in`, stagger 80 | flow, ~1.2vh | Ordinary section done well; the quiet before the peak |
| 3 Method | process | `pin` with four crossfading `cue`s + signature assembly | pin, 4vh | The argument beat; frame holds, content advances, drawing closes |
| 4 Weight | numbers | `count` on entry + `in` | flow, ~0.5vh | Real figures from the site, landing once |
| 5 Trust | quote | `kinetic` lines on a `cue` | flow, ~0.6vh | One sentence, assembled the way it was said |
| 6 Faces | team | one big `reveal` (left) across the strip + `in` on heading | flow, ~0.9vh | A wipe is a change of state; four people become present as one |
| 7 Resolve | contact | `in`, stagger 70, stone ground | flow, ~1vh | The close holds; the form is the resolution |

Checks: six device families (parallax, flow+in, pin, count, kinetic, reveal);
no family twice in a row on primaries; zero scrub acts; peak has the largest
span by a visible margin (4vh vs about 1vh); total about 9.5vh.

## Repeat check (against references/template.html)

| Dimension | Template | This page | Differs |
|---|---|---|---|
| Grammar | Filmic one-shot | Drawing sheet | yes |
| Nav | Fixed minimal bar, wordmark + CTA | Client's sticky bar with four links, untouched | yes |
| Hero device | Full-bleed scrub, corner kinetic headline | Two-column layered plate, parallax planes, static headline | yes |
| Act sequence | scrub > pin > flow > scrub > pan > pin, ~13.7vh | flow > flow > pin > flow > flow > flow > flow, ~9.5vh | yes |
| Close | Pinned spotlight + magnetic CTA | Flow form on stone ground, no pointer devices | yes |
| Signature move | none | Exploded view closes | yes |

Six of six.

## Authored silence

None. There is no empty viewport anywhere. The un-pin slide at the end of the
process act shows the heading and the assembled drawing, which is content.

## Not verifiable here

A real phone (iOS decoder, Low Power Mode, touch scrolling): headless Chrome
at 390x844 and 360x640 is what was checked. No video is used, so the usual
mobile video failure modes do not apply.
