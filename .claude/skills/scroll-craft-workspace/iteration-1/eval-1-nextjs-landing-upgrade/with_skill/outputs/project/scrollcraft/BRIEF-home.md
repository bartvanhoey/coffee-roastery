# BRIEF: Tilt landing page (app/page.tsx), mode B upgrade

Stack: Next.js 16.3.5 App Router, React 19, Tailwind 4. Engine: scrollcraft
(lib/scrollcraft/scrollcraft.js + app/scrollcraft.css, unedited).

Answers below are the user's words where quoted. Everything marked
*authored* is a decision I made under the task's instruction to make
reasonable decisions and record them here instead of asking.

## 1. Which page, what stays exactly as it is

> "The landing page in app/page.tsx is for Tilt, a pour-over coffee scale,
> and it reads like a template: static sections, nothing happens when you
> scroll. Make it feel premium when you scroll. Keep every word of copy,
> every section and the section order exactly as they are, and keep the
> header and footer."

Kept verbatim: all copy (including the `01 02 03` step numbers and the
stat figures, which are the product's own specs, not mine), six sections in
order, the sticky header with its three links and CTA, the footer.

## 2. The feeling, and the one moment

> "Make it feel premium when you scroll." "The hero should have real depth,
> not just a fade-in." "It must respect prefers-reduced-motion and the
> content must still show if JavaScript is disabled."

*Authored:* premium here means quiet and mechanical, in the voice of the
copy ("Quiet by design", "A single dial", "Machined, not moulded"). Nothing
bounces. Things settle. The one moment that should stand out (*authored*):
the hard cut to the dark "Machined, not moulded." section, where the
outline of the product frame is already there and the material fills it
under the reader's hand.

## 3. Assets and the visitor's action

> "I have no footage; the grey rounded boxes are where product images will
> go, so treat them as placeholders."

No footage, no photos, no scrub clips. The two grey boxes stay as reserved
surfaces (aspect ratio, surface colour, depth) and I added *no* label text
inside them, because the user asked to keep every word of copy and already
knows what the boxes are. `public/videos/*.mp4` are stock coffee clips that
came with the folder, not Tilt footage; not used.

Visitor action: "Reserve yours", already the one label used in the header,
hero and close. Unchanged.

## Journey (the existing sections, named for what they do)

```
1  Desire        hero: the product in a lit room, planes sliding past each other
2  Clarity       how it works: three steps settle in, in reading order
3  Weight        machined: hard cut to dark, the frame fills with material   <- PEAK
4  Confidence    specs: the three figures land (the scale settles to 0.1)
5  Intimacy      quote: one person speaking, line by line
6  Resolve       order: the date and the ask, the dial locks
```

## Feeling curve (curve first, devices second)

```
1  Curiosity    a floating product plane, a nearer detail plane climbing over its corner,
                a faint dial ring far behind; the header dial starts turning
2  Clarity      calm document rhythm, three steps arriving 80 ms apart
3  Weight       the page goes dark, the outline is already drawn, aluminium fills it
                left to right across most of the pin; the paragraph arrives late
4  Confidence   0.1 g settles down from 2.0, 18 h and 3 tick up, once
5  Intimacy     a quotation assembling one line at a time, nothing else on screen
6  Resolve      the ask, then the dial in the header reaches its end stop and locks
```

No two adjacent acts share a feeling. Act 2 is the quiet before the peak.

## The peak

> "The page went dark and the empty frame filled up with metal as I scrolled."

Lives in act 3. It gets the largest span on the page (2.4 viewport-heights
against the hero's 1.7), the light-to-dark cut, and the wipe across ~80% of
the pin.

## Tell-someone sentence

> It's the site where the little dial next to the logo turns as you scroll
> and clicks into the next notch every time you reach a new section, and
> when you get to the bottom it locks.

## Signature move: the Tilt dial

Page-local code in `components/tilt-dial.tsx`, nothing in the engine. A
22 px dial sits left of the wordmark in the sticky header. Six notches, one
per section. The needle's angle is chapter progress (which section the
reader is in, and how far through it). Crossing into a new section fires a
small spring impulse so the needle overshoots and settles: a detent. Passed
notches stay lit (a trace of where they have been). At the end of the page
the needle hits its end stop and the ring locks. Under reduced motion the
needle still points (position is meaning) but there is no spring. Without
JavaScript it renders at rest on the first notch. It is `aria-hidden`; the
three nav links remain the navigation.

## Grammar

Closest to **chaptered editorial**, kept from the user's own design: hard
cuts between light and dark grounds (no drift), each section on its own
ground, a folio-like position readout in the chrome (the dial), a close
that is a plate rather than a spectacle. Two deviations, both earned by the
brief: a pinned hero (the user asked for real depth) and one pinned peak.

Why the other seven lost: filmic one-shot needs continuous ground and a
scrub hero, and there is no footage and the grounds hard-cut; live surface
is for software, this is hardware; continuous world needs footage and a
place to travel through; typographic poster would fight the product images
that are coming; gallery is for a range, this is one product; split stage
needs a two-sided argument the copy does not make; rhythmic cutlist is for
energy brands and the copy says "quiet by design".

## Score

| Beat | Device | Why |
|---|---|---|
| 1 Hero | `pin` span 1.7 + `parallax` planes + `tilt` on the product | Depth from differential movement and occlusion while the frame holds |
| 2 How | `flow` + `in` stagger 80 | Administrative content, compressed |
| 3 Machined | `pin` span 2.4 + `reveal` left + cues | A wipe is a change of state; material filling a drawn outline |
| 4 Specs | `count` (entry, once) + `in` | Real product figures landing; the scale settling to 0.1 |
| 5 Quote | `flow` + `kinetic` lines | One voice, one line at a time |
| 6 Order | `flow` + `in` stagger 70 | The close resolves; the dial locks |

Families: pin, parallax, in, reveal, count, kinetic (plus tilt). No family
twice in a row. Zero scrub acts. One peak. Page length about 7.5 viewport
heights on desktop.

## Hero layer contract

| Plane | What it is (no assets yet) | Rate (`data-sc-parallax`) | Contact rule |
|---|---|---|---|
| Far: the room | a soft light field and a faint 1px dial ring | -0.3 | nothing rests on it |
| Focal: the product | the user's 4:5 grey box, now with shadow and edge light, its own ground shadow travels with it | -0.8 | floats; shadow grouped with it |
| Near: a detail | a smaller square surface overlapping the product's lower-left corner (a macro shot goes here) | -1.6 | overtakes the product corner as the reader scrolls |
| Atmosphere | a slow band of light drifting the other way | +0.3 | behind everything, above the far plane |
| Copy | h1, p, CTA, real markup, at 1x | none | never covered |

Opening: product right, headline left, the near detail sitting low on the
product's corner. Midpoint: the near plane has climbed half its travel and
covers more of the corner; the far ring has barely moved. Exit: the stage
releases and slides up into "How it works". Mobile: copy above, product
below as a 4:3 crop capped at 30svh, the near detail smaller. Reduced
motion: same composition, no movement. The floor of the stage fades to the
canvas so plane clipping is never visible.

## Repeat check (against references/template.html)

| # | Dimension | This page | Template | Differs |
|---|---|---|---|---|
| 1 | Grammar | chaptered, hard-cut grounds, no drift | filmic one-shot | yes |
| 2 | Nav | user's sticky bar + dial position readout | fixed minimal bar | yes |
| 3 | Hero device | pinned parallax planes, no media | scrub clip | yes |
| 4 | Act shape | pin / flow / pin / flow / flow / flow, ~7.5vh, 0 clips | scrub / pin / flow / scrub / pan / pin, ~14vh | yes |
| 5 | Close | flow plate, no spotlight, no magnet; dial locks | pinned spotlight + magnetic CTA | yes |
| 6 | Signature move | detent dial | none | yes |

## Other authored decisions

- `app/layout.tsx` imported components that do not exist in this project
  and nested a second `<main>`; rewritten as a minimal root layout (Geist
  via next/font, head script for `sc-js`, engine stylesheet). Page header
  and footer untouched.
- Type: Geist (one family, two weights). Body size becomes the engine's
  fluid base (16 to 18px); the hero h1 steps down one rung below 640px
  (`text-4xl sm:text-5xl md:text-6xl`) so it fits a phone stage. No words
  changed.
- Colour: the page's stone palette is kept as the six tokens. One accent,
  cobalt, used only for focus rings and selection, two lightnesses (one per
  ground) because the page hard-cuts light/dark.
- Section anchors get `scroll-margin-top` so `#how`, `#specs`, `#order`
  land below the sticky header.
- Authored silence: none. The Machined act holds still between the end of
  the wipe (p 0.82) and the copy's fade-out (p 0.93), about 0.15
  viewport-heights, under the harness threshold and read as the material
  having landed.
