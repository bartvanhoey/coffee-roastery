# Northlight Studio: scroll upgrade brief

**Self-authored, not interviewed.** The run is non-interactive, so the eight
topics below are answered from the evidence in the existing site (copy, palette,
structure, the client's complaint) and marked as authored decisions where the
site gives no answer. Nothing below is a user quotation.

## Mode and constraints (given)

- Upgrade an existing page in place: `site/index.html` and `site/styles.css`.
- Do **not** change: the copy, the section order, the nav, the contact form.
- All `assets/*.jpg` are placeholders that will be supplied later. Treat every
  image as a frame that will be filled, and make the empty frame look intended.
- Must work on phones and with reduced motion on.
- Show how it was checked.
- Environment: no ffmpeg (preflight FAIL, noted), no kie.ai key (no generation,
  none needed), Node 22 + Chrome present, playwright-core resolves from the
  project root. Server on port 4504, stopped at the end.

## The eight topics

1. **Vibe.** Evidence: "considered", "enclosure", "four people, no account
   managers", a matte aluminium speaker on a concrete plinth lit from one side,
   Rotterdam. Authored: *quiet, physical, precise, lit*. References (not sites):
   a Dieter Rams product photograph; the way a museum vitrine is lit from one
   lamp; a hardware teardown laid out on a bench.
2. **The scroll journey, section by section.** Fixed by the constraint, in this
   order: hero, selected work, how we work, numbers, client quote, the four of
   us, start a project, footer.
3. **Energy curve.** Authored: calm open, a widening in Work, held attention
   through Process, a quiet beat at Numbers, the one loud moment at the Quote
   (loud by contrast: the page goes dark and stops), warmth at Team, stillness
   at the form.
4. **Feeling, stage by stage, and the one moment.** See the feeling curve and
   the peak below.
5. **One thing no site they have seen does.** Authored from the hero alt text
   ("lit from one side"): the whole page is lit by one lamp, and the lamp moves
   as you scroll. Every photograph's shadow follows it. On a mouse the lamp also
   leans a little toward the pointer. See the signature move.
6. **Distance from premium-minimal.** Authored: *editorial*, not premium-
   minimal. The brand already chose paper cream, ink, one brick accent and a
   serif for prose. Those are the brand's colours and faces, not mine, so they
   stay (taste.md's cream-and-brass warning applies to defaults, and this is a
   supplied palette). One hard cut to a dark ground at the quote.
7. **One unbroken world or distinct scenes?** Distinct scenes. The section order
   is fixed and the content is document-shaped; a continuous world is the wrong
   structure for a studio site with a form at the end.
8. **Assets.** None present. Nine image slots referenced under `assets/`:
   `hero.jpg` (2400x1500), `work-1..4.jpg` (1200x900), `team-1..4.jpg`
   (800x1000). All treated as placeholders with a deliberate empty-frame
   treatment. Spec for the real hero shot is at the bottom of this file.

## Grammar

**Chaptered editorial**, with two recorded deviations forced by the constraints:

- The sticky wordmark-plus-nav bar stays exactly as it is (the nav may not be
  changed), so the "no fixed bar, folio in the margin" rule is not applied.
- No chapter numbers or folio are added, because that would add copy and the
  hard rules ban section counters anyway.

Why the other seven lost: *filmic one-shot* needs a scrub hero and there is no
footage; *live surface* is for software, this is a studio; *continuous world*
forbids section boundaries and the order is fixed by the client; *typographic
poster* forbids photographic ground and the site is built on nine photographs;
*gallery/catalog* forbids a single hero claim and this page has one; *split
stage* needs a two-sided argument the copy does not make; *rhythmic cutlist* is
an energy-brand pace and this brand is quiet.

What the grammar gives this page: hard cuts between grounds (one), media in its
own column with the type beside it, `flow`+`in` as the default, `reveal` at one
chapter boundary, parallax only inside the hero's media, `count` on the
studio's own figures inside prose, and a close set as a plate rather than a
spotlight and a magnet.

## Journey (beats, fixed to the section order)

```
1  Stillness     one object, one light, the planes separate as you move      (hero)
2  Breadth       four products travel sideways, arriving one at a time       (work)
3  Order         the frame holds, four steps land under it                    (process)
4  Weight        three real numbers tick into place                           (numbers)
5  Intimacy      the page goes dark and a client's sentence assembles         (quote)  PEAK
6  Warmth        four people rise in, in reading order                        (team)
7  Intent        a plate wipes open and hands you the form; it holds          (contact + footer)
```

## Feeling curve

```
1  Calm        the light plane lags, the frame lifts, the plinth overtakes: depth at hand speed
2  Curiosity   lateral travel; each work card settles in sequence, none yet finished
3  Attention   heading and numerals are the ground; the four steps arrive and stay
4  Weight      14, 4, 9 count up once, eased hard, and stop
5  Intimacy    a dark tide rises over the cream, then the quote assembles line by line and holds
6  Warmth      portraits rise 14px, staggered 70ms, paper ground again
7  Intent      the form plate wipes open, the footer sits inside the same plate; nothing fades after
```

No two adjacent acts share a feeling.

## The peak

**Act 5, the quote.** The sentence a visitor would say to a friend:

> "the page went dark under the numbers and the client's sentence built itself
> one line at a time, and then it just stayed there."

It gets: the largest span on the page (3.0 viewport-heights against 2.6 for
Work and 2.4 for Process), the silence before it (Numbers is a short, static
flow section, and the first part of the quote act is an empty cream stage that
the dark tide fills), and the only kinetic headline on the page.

## The tell-someone sentence

It's the site where the lamp moves as you scroll and every photograph's shadow
follows it, and where the page goes dark for one client sentence.

## Signature move

**One lamp for the whole page.** Page-local JS publishes `--nl-lx` / `--nl-ly`
(lamp position, 0..1) and `--nl-sx` / `--nl-sy` (derived shadow offset, px) on
`<html>`. The lamp travels from upper-right at the top of the document to
upper-left at the bottom. Every framed image carries a blurred shadow plate
(`.frame::before`) whose `transform` reads the offset, so the shadows on the
hero, the four work cards and the four portraits all swing together as the
reader scrolls. On a fine pointer the lamp leans up to 8% toward the mouse. The
hero's back plane (the light wash) is the lamp made visible. Transform-only,
one rAF loop that idles when nothing changes, off under reduced motion (the lamp
is parked at its rest position and the CSS defaults render the same frame
without JS). Not a kit device and not a parameter change to one.

## Fingerprint gate

`FINGERPRINTS.md` in this workspace is empty (seeded this run), so there is no
row to clear. The build's row is appended after verification.

## Score table

| Beat | Section | Act | Span | Device | Why this one |
|---|---|---|---|---|---|
| 1 Stillness | hero | `flow` | natural | `parallax` (3 planes) + load rise | Depth at hand speed, no pinned dead space, a complete static frame under reduced motion |
| 2 Breadth | work | `pan` | 2.6 | `pan` + `--sc-p` settle | Lateral reads as options, not hierarchy; the heading rides in the rail so the travel is real |
| 3 Order | process | `pin` | 2.4 | `pin` + accumulating cues | The frame holds while the argument advances; numerals are the ground |
| 4 Weight | numbers | (none) | flow | `count` (entry) + `in` | Real figures from the studio's own copy; ticks once, eased out |
| 5 Intimacy | quote | `pin` | 3.0 | `reveal` (dark tide) + `kinetic` lines | The one change of state on the page, and the only kinetic headline |
| 6 Warmth | team | `flow` | natural | `in` + stagger | The ordinary section, done well, so the peak has contrast |
| 7 Intent | contact | `flow` | natural | `reveal` (plate wipe) | A wipe is a change of state: the page stops arguing and hands over an input |

Seven device families (parallax, pan, pin, count, reveal, kinetic, in). No
family twice in a row (team `in` then contact `reveal`). No scrub, no video.
Total length measured on the render: see the report.

## Authored silence

- The first part of the quote act's stage is deliberately quiet: the stage
  slides in cream with the dark plate already covering the lower part, and the
  tide finishes in the first ~28% of the pin before any type arrives. That is
  the silence before the peak, not dead scroll.
- The last ~10% of the Process pin fades the four steps out and leaves the
  heading and numerals as the ground while the stage slides off. Intentional.

## Decisions recorded (non-interactive run)

- Palette and type families kept as the brand's own. Tokens added on top so the
  engine's floor (focus ring, selection, scrollbar, tabular numerals) is themed
  to the brand.
- Pinned acts are un-pinned under `prefers-reduced-motion: reduce` (height auto,
  static stage, all cues forced visible, rail laid out as a grid), so that path
  is a complete plain document with 220ms opacity-only entrance fades. The
  engine will log a `will not pin` console warning under reduced motion; that is
  the override working, not a fault.
- Without JavaScript the page renders as the same plain document: a `js` class
  is set on `<html>` by an inline script, and the hidden-initial states are only
  applied when it is present.
- Broken placeholder images are covered by an `img::after` tonal plate so the
  frames read as intended empties rather than broken icons. When the real files
  land, the plate stops rendering on its own.
- Counters run on the three figures already in the copy (14, 4, 9). They are
  the studio's stated figures, not invented here.

## Asset spec for the real hero (for the photographer / retoucher)

The layered hero is built as three planes now (light wash, image frame, plinth
slab) and a copy layer at 1x. To take it further when the photograph exists:

1. **Clean plate**: the plinth and backdrop with the speaker removed and the
   space behind it rebuilt. `assets/hero.jpg` slot, 2400x1500.
2. **Subject cutout**: the speaker alone as a PNG/WebP with real alpha, edges
   checked against light and dark, solid below its silhouette.
3. **Contact anchor**: the speaker's base must sit on the plinth's top edge in
   both files at the same pixel coordinates, so the cutout can move at a
   different rate without floating.
4. Light from the right, as the alt text says; the lamp in the signature move
   starts upper-right so the real shadow and the page's shadows agree.
