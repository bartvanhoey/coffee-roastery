# Tilt: brief

**Self-authored, not interviewed.** The run is autonomous and the task forbids
interactive questions. Everything marked *evidence* is a verbatim constraint from
the user's request; everything marked *decision* is mine and is listed so it can
be reversed.

Mode: **upgrade an existing page**, not a new build. `app/page.tsx` keeps every
word of copy, every section, the section order, the header and the footer. The
grey rounded boxes stay as placeholders for product photography that does not
exist yet.

## The eight topics

1. **Vibe.** *Decision:* precise, quiet, machined, warm-grey. References: a
   laboratory balance settling on a reading; a Dieter Rams scale; the pause
   between pours in a slow pour-over. Not "sites I like".
2. **Scroll journey, section by section.** *Evidence:* the order is fixed by the
   user. Hero (the promise, the product) > How it works (three steps) >
   Machined, not moulded (the object) > Specs (three figures) > Amara's quote >
   First batch ships in March (reserve) > footer.
3. **Energy curve.** *Decision:* attentive at the top (the scale is weighing
   something under your hand), quiet through How it works, weight and darkness at
   Machined, a clean confident landing at Specs, intimate at the quote, resolved
   at the close. Never loud.
4. **Feeling, stage by stage, and the ONE moment.** See the feeling curve and the
   peak below.
5. **The thing no other site does.** *Decision:* the page behaves like the
   product. Tilt "weighs, times and logs every brew, then plays it back". The
   site weighs your scroll as a pour, logs it, and plays it back at the bottom.
6. **Distance from premium-minimal.** *Decision:* premium-minimal, but warm-grey
   and light rather than dark-with-one-accent. The existing page is already
   light stone with dark plates and the user asked for premium; the range
   question is answered by the page that exists.
7. **One unbroken world or distinct scenes?** *Decision:* distinct scenes. The
   page hard-cuts between a light bench and dark anodised plates, which the user
   built and asked to keep. A continuous world would need to erase those cuts.
8. **Assets.** *Evidence:* "I have no footage; the grey rounded boxes are where
   product images will go, so treat them as placeholders." No kie.ai key and no
   ffmpeg on the machine either (preflight). Nothing is generated. The folder
   `public/videos/` holds coffee-roastery clips that belong to a different brand
   in the parent repo; they are not Tilt footage and are not used.

## Journey (what changes in the visitor)

```
1  Attention     the scale is weighing something, and it is their scroll
2  Clarity       three steps, read like a manual, one hairline drawing down
3  Weight        the lights go down and the object is there, machined
4  Confidence    three figures land, tabular, exact
5  Intimacy      one person, one sentence, no image
6  Resolve       the pour they made at the top is played back and held; reserve
```

## Grammar

**Instrument sheet** (new, named here so the constraints are explicit). The
page is a light workbench with dark machined plates set into it. Sections on the
bench are documents: natural flow, entrance reveals, no pinning. Plates are held
objects: pinned, one idea each, hard-edged, painted their own ground (no drift).
Nav: the user's own sticky bar, unchanged. Hero: a layered scene on the bench,
pinned, with typography between the planes. Close: a plate that resolves and
holds, with the footer riding on the same plate as the last line.

Forbids: drift (grounds are painted per section and cut hard); scrub video (no
footage exists); a scroll cue; section counters between sections; centred copy
in adjacent acts; more than one kinetic headline per act; any change to the copy.

Why the eight defined grammars lost: filmic one-shot forbids hard cuts between
grounds and this page is built on them. Chaptered editorial forbids a fixed bar
and puts no media above the fold; the user's header is sticky and the hero holds
the product image. Live surface forbids marketing chrome. Continuous world needs
worldflight footage. Typographic poster forbids a photographic ground and the
placeholders are for photographs. Gallery is for a range; Tilt is one object.
Split stage needs a two-sided argument. Rhythmic cutlist bans `pin` and
`parallax`, and the user asked for a hero with real depth.

## The signature move: the pour log

A scale display sits in the hero, in front of the product, as its own plane.
Scrolling the hero is pouring: the grams climb 0.0 to 320.0 through a real
pour-over shape (bloom to 50 g, rest, pour to 190 g, rest, pour to 320 g,
drawdown), the timer runs 0:00 to 3:30, a thin stream pours into the product
while a pour phase is active and stops during the rests, and a trace of grams
over time draws itself in the display as the record. At the close, the same
display plays that log back as the visitor scrolls the last plate, and lands on
320.0 g / 3:30 and holds. Coded in `components/ScrollCraft.tsx` off the act's
`--sc-p`; the engine is untouched. Under reduced motion and without JavaScript
the display shows the finished log.

## Feeling curve (one line per act, emotion first)

```
1  Attention   the readout weighs their scroll; five planes separate at different rates
2  Clarity     three steps fade in down a ladder while one hairline draws itself
3  Weight      the ground goes dark, the object is already there, the words assemble
4  Confidence  three figures tick to their values and stop
5  Intimacy    one sentence assembles line by line, nothing else on the bench
6  Resolve     the pour is played back on the plate and held; one button
```

No two adjacent acts share a feeling.

## The peak

**Act 1, the hero.** The sentence a visitor would say: "the scale weighed my
scroll: the grams poured up as I went down, the stream stopped when the brew
rested, and the display slid over the product as everything separated." It gets
the largest span (2.2 viewport-heights against 1.9 for Machined and 1.5 for the
close), the layered composition, and the only pointer response on the page.
The silence before it is the page loading: there is nothing above it but the
user's bar.

Machined is deliberately quieter than the hero: a plate, an object already
there, words arriving. It is the dark moment, not a second peak.

## Tell-someone sentence

It's the site where the scale weighs your scroll on the way down and plays the
pour back at the bottom.

## Score (device per beat)

| Beat | Act | Device | Why this one |
|---|---|---|---|
| Attention | hero | `pin` + `parallax` (five planes) + pointer parallax + signature readout | Depth from differential movement is the cheapest premium signal; the pour gives the pinned travel a reason |
| Clarity | How it works | `flow` + `in` (stagger) + `reveal` (hairline draws down) | A manual is read, not watched; one drawn line is enough motion |
| Weight | Machined | `pin` + `kinetic` lines + small `parallax` on the object | The frame holds while the argument assembles; the object is the ground |
| Confidence | Specs | `flow` + `in` + `count` (entry counters on the user's own figures) | Numbers that land read as measured; the figures are the user's, not invented |
| Intimacy | Quote | `flow` + `kinetic` lines on a held cue | One voice assembling on an empty bench |
| Resolve | Close | `pin` + `magnet` CTA + signature playback | The page stops moving and starts responding; the log plays back and holds |

Checks: six device families (parallax, in/reveal, kinetic, count, magnet, pin)
with none repeated in adjacent acts (pin at 1, 3, 6; kinetic at 3 and 5; in at
2 and 4). No scrub acts. Total length about 9 viewport-heights across six acts,
outside the 13.6 to 13.8 band. Authored silence: none; every pinned act changes
something visible on every notch and publishes `data-sc-verify-state`.

## Fingerprint gate

`scrollcraft/FINGERPRINTS.md` is empty: first build, nothing to clear. The row is
appended after shipping.

## Decisions taken without the user (reversible)

- `app/layout.tsx` imported `@/components/Header`, `@/components/Footer` and
  `@/lib/site`, none of which exist in this project, and carried metadata for a
  different brand (Aurum Coffee Roasters). The dev server could not compile it.
  Rewritten as a minimal Tilt root layout: Geist via `next/font/google`, Tilt
  metadata, `globals.css`. The page's own header and footer are the ones kept.
- Type: the original set `font-family: Arial` in `globals.css`. Replaced with
  Geist (one family, tabular numerals for the figures). Inter was available and
  not chosen; taste.md discourages it as a default.
- Footer ground: painted dark so it rides on the closing plate and the last
  screen resolves as one surface. Text and content unchanged.
- The `01 / 02 / 03` numerals inside the How it works ordered list are kept:
  they are step numbers in the user's copy, not section counters.
- The three "How it works" items are no longer three equal cards. Same words,
  set as a stepped list against a drawn hairline.
- `/reserve` is linked from the close exactly as the user wrote it. That route
  does not exist in this project and returns the Next.js 404. Not mine to add.
- Counters run on 0.1 g, 18 h and 3 because those are the user's stated specs,
  displayed either way; the counter only animates them.
- Preflight: ffmpeg missing (required only to encode footage, and there is no
  footage) and no KIE_AI_API_KEY (only for generation, and nothing is generated).
  Both noted, neither worked around. Contact sheets are tiled with `sharp`
  from the project's own node_modules instead of ffmpeg.
