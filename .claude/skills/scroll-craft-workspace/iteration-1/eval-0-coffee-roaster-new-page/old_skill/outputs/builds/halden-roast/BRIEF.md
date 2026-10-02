# Halden Roast: brief

**Self-authored under explicit creative delegation.** The user asked for a
scroll-driven landing page and said "use your judgment on creative direction, I
do not want an interview." No interview was run. Everything below marked
*authored* is my decision; everything marked *user* is what they actually said.
Nothing in quotation marks is attributed to the user unless it appears in their
request.

## What the user said (verbatim, the only evidence)

- Halden Roast, "a small specialty coffee roaster in Bergen, Norway."
- "Two people, one roastery by the harbour, they sell single-origin beans by
  subscription."
- The page "should convince a visitor that Halden roasts more carefully than the
  supermarket and get them to start a subscription."
- Button label: **"Start a subscription"** (used everywhere, unchanged).
- "Premium and calm, like a Scandinavian cinema ad, not like a Shopify theme."
- "I have no photos or footage yet, so use honest placeholders where images or
  clips would go."
- "Plain static HTML/CSS/JS is fine."

## The eight topics

1. **Vibe** (*authored*): still, cold, close, honest, warm-at-one-point.
   References: the quiet split-screen passages of Scandinavian TV drama where
   two lives run in parallel; a Norwegian coastal weather forecast, plainly
   read; a roast log written by hand.
2. **Scroll journey** (*authored*): two mornings side by side; what the bag
   actually says; who is standing at the drum; what is on the label; how the
   subscription works; the roastery takes the whole screen.
3. **Energy curve** (*authored*): quiet throughout. The only rise is the last
   act, and it is a rise in warmth and scale, not in speed. Nothing on the page
   is fast.
4. **Feeling, stage by stage, and the one moment** (*authored*): see the
   feeling curve and the peak below.
5. **The one thing no other site does** (*authored*): the divider between the
   two halves carries a sampling spoon (a trier) of green coffee beans, and the
   beans roast as the visitor scrolls: green, then straw, then cinnamon, then
   brown, with the phase named beside them. They drop, finished, at the exact
   moment the roastery takes the whole screen.
6. **Distance from premium-minimal** (*authored*): premium-minimal is what the
   user asked for in other words ("premium and calm... cinema ad"), so it is
   earned here rather than defaulted to. The cream-and-brass artisan palette is
   avoided on purpose: this page is cold harbour slate with one ember accent.
7. **One unbroken world or distinct scenes** (*authored*): neither. Two worlds
   held side by side for the whole page (split stage). The structure is the
   argument.
8. **Assets on hand** (*user*): none. No photos, no footage, no logo, no brand
   kit. (*authored*): every image slot is therefore a labelled storyboard
   plate stating the intended shot, with viewfinder ticks, so the page is
   honest about what is missing and doubles as the shot list.

## Grammar: split stage, and why the other seven lost

- **Split stage** (chosen): the brief is a comparison. "More carefully than
  the supermarket" is two columns held in tension and resolved by scroll.
- Filmic one-shot: leans on scrub clips; there is no footage. Also carries the
  burden of proof as the previous default.
- Chaptered editorial: reads as an article; the user asked for a cinema ad.
- Live surface: there is no software to run.
- Continuous world: requires worldflight clips; none exist.
- Typographic poster: fits "no assets" but leaves nowhere for the photography
  the user intends to add later, and forbids the photographic ground they will
  eventually want.
- Gallery / catalog: the visitor's question is "should I believe you", not
  "what are the options".
- Rhythmic cutlist: energy brands. The opposite of calm.

Grammar constraints honoured: no fixed bar (the divider is the chrome, carrying
both labels and the argument's progress); 50/50 hero with both headlines
readable at once; no full-bleed before the resolve; no centred copy; the close
is the collapse with the CTA in the winning column; no `pan`, `spotlight`,
`magnet`, `drift`, no scrub. Two grounds, one per side, and they hold.

Mobile deviation, declared: below 860px the split is 38/62 rather than 50/50 so
Halden's column can carry readable copy. Both sides remain present the whole way
down and the close still collapses to the edge.

## Journey (beats)

```
1  Recognition   the morning coffee they already drink, seen twice
2  Noticing      what the date on the bag actually means
3  Intimacy      who is standing at the drum, and what they are listening for
4  Trust         what the label names, side by side
5  Ease          how the subscription works, in four plain lines
6  Resolve       the shelf gives way; one bag, one button
```

## Feeling curve (written before the acts)

```
1  Stillness    two mornings side by side, four outlined planes per side drifting
                apart at different depths, nothing else moving
2  Noticing     a date on the back of a bag, wiped in from opposite directions
3  Intimacy     the frame holds while lines cross over; the page says "you" once
4  Trust        two labels typeset the same way, one full of names
5  Ease         four plain lines on how it works; the quietest screen on the page
6  Resolve      the divider gives way, the roastery takes the whole screen, the
                beans in the spoon drop, finished
```

Authored silence: act 5 is deliberately the quietest act (flow, small type, one
gentle wipe). It is the silence in front of the peak, not dead scroll.

## The peak

**Act 6.** The sentence a visitor would say to a friend:

> the supermarket half of the screen slid away and the roastery took over the
> whole thing, and the little spoon of beans was roasted right when it did

It gets the largest span on the page (2.8 viewport-heights against 2.4 and
2.2), the layered warm plates, the ember glow that brightens with progress, and
the quiet act before it.

## Tell-someone sentence

It's the site where the supermarket half slowly gives way to the roastery, and
the beans in the spoon are roasted by the time it does.

## Signature move

**The trier.** A sampling spoon of beans rides the divider like a playhead.
Its beans change colour from green through straw and cinnamon to roasted brown
as the page is scrolled, swelling slightly, with the roast phase named beside
them (green, drying, browning, first crack, development, drop). "Drop" lands at
the exact scroll position where the divider finishes collapsing. Coded in the
page (`halden.js`, `.hr-trier`), driven from scroll and the close act's
`--sc-p`. The engine is untouched.

## Score

| Beat | Act | Device | Span | Why this one |
|---|---|---|---|---|
| 1 Recognition | hero | `pin` + `parallax` planes (4 per side) + greet cues | 2.2 | Depth from differential movement is the hero's whole job; both headlines readable at once |
| 2 Noticing | the date | `flow` + `reveal` (down on the left, up on the right) | ~1.2 | A wipe is a change of state: the date is what changes what you know |
| 3 Intimacy | the roast | `pin` + `kinetic` heading + cross-cued lines | 2.4 | The frame holds while someone stands still and listens |
| 4 Trust | the label | `flow` + `in` stagger, two definition lists | ~1.0 | Information, compressed: labels, not pitch |
| 5 Ease | how it works | `flow` + `reveal` (right), small type | ~1.2 | The quiet before the peak |
| 6 Resolve | the close | `pin`, divider collapse from `--sc-p`, `parallax` on the roastery planes, held CTA | 2.8 | The collapse is the ending and the peak |

Five device families (pin, parallax, reveal, kinetic, flow+in); no family twice
in a row; zero scrub; ~10.8 viewport-heights over 6 acts.

## Palette and type

- Canvas (Halden side) `#121110` warm near-black; shelf ground `#161B1E` cold
  grey. Ink `#ECE7DD` bone; ink-soft `#98A39E` tinted; shelf display ink
  `#B9C0BB`. Accent `#E08A3C` ember, owned by the CTA, the focus ring, the
  selection and the finished beans. No cream, no brass.
- Display: Instrument Sans 500. Text: Geist 400/500. No third family; labels
  use Geist at small size and wide tracking, not a mono.

## Assumptions to confirm with Halden (copy claims I could not verify)

These are written as the business would plausibly say them; every one is the
user's to correct before the page goes live:

- Roast date is printed on every bag.
- Nothing ships more than a week after roasting.
- Subscription rhythm: every two weeks or every four.
- Whole bean or ground.
- Pause, skip or stop from a link in every email.
- One origin at a time; the farm, region, variety and process are named.
- No founder names are used (the user said "two people" and nothing more).
- No prices, no statistics, no counters: nothing on the page is a number the
  user did not give.

## Fingerprint gate

Registry at `<workspace>/FINGERPRINTS.md` was empty at planning time; nothing
to clear. Row appended after verification.
