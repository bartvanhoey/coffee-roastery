# Halden Roast: scroll-craft brief

**Self-authored under explicit creative delegation.** The user said: "Use your
judgment on creative direction, I do not want an interview." Everything below
marked *given* is in the user's own words. Everything marked *authored* is my
answer in the brand's voice, and the owners should check it before the page
goes live. No user quotations have been invented.

## What the user gave (verbatim)

- "a scroll-driven landing page for Halden Roast, a small specialty coffee
  roaster in Bergen, Norway. Two people, one roastery by the harbour, they sell
  single-origin beans by subscription."
- "The page should convince a visitor that Halden roasts more carefully than
  the supermarket and get them to start a subscription (button label: 'Start a
  subscription')."
- "I want it to feel premium and calm, like a Scandinavian cinema ad, not like a
  Shopify theme."
- "I have no photos or footage yet, so use honest placeholders where images or
  clips would go."
- "Plain static HTML/CSS/JS is fine."

## The six questions

**1. What is this, who is it for, what must they believe.** *Given:* a small
specialty roaster, two people, one roastery by the harbour in Bergen, single
origin, subscription. *Authored:* the visitor is someone who already buys
coffee every week without thinking about it. The one sentence the page installs:
**"The supermarket roasts to hide the bean. Halden roasts to show it."**

**2. Vibe.** *Given:* premium, calm, Scandinavian cinema ad, not a Shopify
theme. *Authored references:* a Bergen harbour at first light in the rain; the
long held diptychs of a Roy Andersson film; the label on a bottle of aquavit
(one line, one date, nothing else). Aesthetic family: premium-minimal, which
the user asked for by name ("premium and calm"), so this is a chosen costume
rather than a default. Palette deliberately avoids the cream-and-brass artisan
trap: one cold fluorescent grey-green ground for the supermarket, one deep
harbour blue-black for Halden, and a single roast-amber accent, which is also
the exact colour the Halden bean stops at.

**3. The scroll journey.** *Authored.* The visitor lands on a screen split
down the middle: the supermarket on the left under fluorescent light, the
roastery on the right in one warm lamp. Both headlines are readable at once.
Scrolling walks the comparison: the bag they actually hold next to the bag
Halden sends; the roast itself; the people. The balance tips a little in the
middle, then, at the end, the supermarket half is pushed off the screen and the
whole page goes dark and warm, with one bean and one button left. Calm
throughout; the only intense moment is the collapse.

**4. Feeling by stage, and the one moment.** See the feeling curve and peak
below.

**5. One thing no site does; one world or scenes.** *Authored:* two coffee
beans sit on the divider between the halves. Scrolling roasts them. Halden's
bean stops after first crack and holds its colour; the supermarket's keeps
going until it is black and oily. Distinct scenes (a diptych of held frames),
not one continuous world. There is no footage to fly through and the argument
is a comparison, not a journey.

**6. Assets and the action.** *Given:* nothing yet; button label "Start a
subscription". *Authored:* every place an image or clip would go is a reserved
box carrying a shot code and a one-line shot description, so the boxes double
as the shot list for the day the photographs exist. One label, used everywhere:
**Start a subscription.** The CTA links to `#start` (the closing act) until a
checkout URL exists; the two places to swap it are marked with HTML comments.

## Grammar: split stage

Two columns held in tension for the whole page, resolved by scroll. The
divider is the chrome (it carries both labels, the wordmark and the roast
progress). The hero establishes the split at 50/50 with both headlines
readable. The close is the collapse: the divider travels to the left edge, the
Halden column takes the full width, and the CTA lives in the winning column.

Why the other seven lost:

- **Filmic one-shot**: its anchor device is scrubbed footage and there is
  none; it also buries a comparison inside a sequence, and it is the default.
- **Chaptered editorial**: reads as something you read, not a cinema ad; bans
  the full-bleed media the eventual photographs will want.
- **Live surface**: not software.
- **Continuous world**: requires a chain of clips; there are none, and it is
  the most fragile build.
- **Typographic poster**: tempting with no assets, but it bans photographic
  ground, and the user expects to drop photographs in later. It would be a
  rebuild in three months.
- **Gallery / catalog**: the product is one subscription, not a range; labels
  cannot persuade and this page has to.
- **Rhythmic cutlist**: pulse and speed, the opposite of "calm".

Bans honoured: no `pan`, no `spotlight`, no `magnet`, no `drift` (two grounds,
one per side, and they hold), no `scrub` (none exist anyway), nothing
full-bleed before the resolve, no centred copy, no corner-anchored hero, an
asymmetric close.

## Journey (beats)

```
1  Stillness     the split: two lights, two headlines, both readable at once
2  Recognition   the bag they actually hold, next to the bag Halden sends
3  Tension       the roast: the beans darken under their hand, one stops
4  Intimacy      two people, one drum, the harbour outside; almost nothing on screen
5  Resolve       the supermarket half is pushed off; one bean, one button; it holds
```

## Feeling curve (written before the score)

```
1  Stillness     two halves that do not move, planes leaning as you scroll
2  Recognition   the label they have read a hundred times, set next to a name and a date
3  Tension       the balance tips 8% and the supermarket bean keeps darkening after Halden's stops
4  Intimacy      small type, one portrait, a lot of air; the quiet before the end
5  Resolve       the grey half slides away, the lights go down, the button holds
```

No two adjacent acts share a feeling. Act 4 is the authored silence in front
of the peak: a single wipe, two short lines, and the beans still roasting on
the divider. That is deliberate, not dead scroll.

## The peak

The sentence a visitor would say to a friend: **"The grey half of the screen
slid away, the whole page went dark and warm, and there was one bean and one
button left."** It lives in act 5, which has the largest span on the page
(4.2 viewport-heights against 3.0 for the next largest) and the quietest act in
front of it.

## Tell-someone sentence

**It's the site where you roast two coffee beans by scrolling, and the
supermarket half of the screen gets squeezed out at the end.**

## Signature move

The roast on the divider. Two SVG beans in the fixed chrome, one per side,
whose fill is interpolated along a real roast colour ramp (green, yellowing,
cinnamon, first crack, second crack, oily) from page scroll. Halden's reaches
its stop colour as the roast act ends and holds; the supermarket's runs on to
black and gains a specular sheen. Captions under each bean use real roasting
vocabulary and change stage by stage. The same JS drives the divider's tip and
collapse, and publishes `data-sc-verify-state` (rounded split, both roast
stages) so the harness can see the chrome move. Engine untouched.

## Score

| Act | Device | Span | Why |
|---|---|---|---|
| 1 Stillness | `pin` + `parallax` planes per half | 2.2 | Hero depth as baseline; both headlines greet at p=0 |
| 2 Recognition | `pin` + `reveal` per side (bag wipes) | 2.0 | A wipe is a change of state: the label becomes legible |
| 3 Tension | `pin` + `kinetic` (one headline) + divider tip + beans | 3.0 | Copy assembles while the frame holds; the chrome does the arguing |
| 4 Intimacy | `pin`, one `reveal` from the divider, two lines | 1.8 | Authored silence before the peak |
| 5 Resolve | `pin` + bespoke collapse, hold cues, footer inside stage | 4.2 | The peak and the close; the last screen holds |

Total 13.2 viewport-heights. Five device families in use (pin, parallax,
reveal, kinetic, the bespoke chrome), no family drives two adjacent acts,
zero scrub acts, no counters (no verified figures exist), no drift.

## Repeat check against `template.html`

| Dimension | Template | This build |
|---|---|---|
| Grammar | Filmic one-shot | Split stage |
| Nav | Fixed minimal bar, wordmark + CTA | No bar; the divider is the chrome |
| Hero | Full-bleed scrub, corner kinetic headline | 50/50 layered diptych, both headlines at once |
| Act sequence | scrub > pin > flow > scrub > pan > pin, 13.7vh | pin/parallax > pin/reveal > pin/kinetic > pin/quiet > collapse, 13.2vh |
| Close | Pinned spotlight + magnetic CTA | Divider collapse, left-anchored CTA, no spotlight, no magnet |
| Signature | none | The roast on the divider |

Six of six differ.

## Assumptions the owners must confirm (authored copy)

- The roast date is written on every bag.
- Every bag names one farm.
- Coffee is posted the week it is roasted.
- Every batch is tasted before bagging.
- Subscribers choose amount and frequency and can pause or stop at any time.
- No prices, no volumes, no founding dates and no counts appear anywhere on the
  page, because none were given.

## Reserved shots (the placeholders, which are the shot list)

| Code | Shot |
|---|---|
| A1 | Supermarket coffee aisle under fluorescent light, wide, empty upper half |
| A2 | A shelf of supermarket bags, cutout with alpha |
| A3 | One supermarket bag, front, cutout |
| A4 | Clip: an industrial roasting line, wide, static camera |
| B1 | Vågen from the roastery window at first light, wide, empty upper third |
| B2 | The drum roaster in front of the window, cutout with alpha |
| B3 | One Halden bag, front, hand-written roast date legible, cutout |
| B4 | Clip: beans turning behind the drum glass, macro, one continuous take |
| B5 | The two of them at the drum, available light, unposed |

Atmosphere planes (fluorescent glare on the left, steam on the right) are
rendered in CSS until footage exists.

## Mobile

Recomposed, not shrunk: the split becomes top (supermarket) over bottom
(Halden), the divider runs horizontally, and the collapse pushes the divider to
the top edge. Hero type steps down one rung. Clip placeholders shrink to a
wider aspect so the copy under them fits in half a phone screen.

## Reduced motion

Cues still fade (the engine's default). Parallax, wipes and kinetic lines are
stilled by the engine. The divider's 8% tip is dropped, and the collapse
becomes a hard cut at act 5 progress 0.3 instead of a glide. The beans still
change colour, because the colour is the argument, not decoration.
