# Premium hero depth

## Baseline

For a hero-led marketing page, **layering is part of the baseline, not an optional polish pass**. A beautiful full-screen photograph with one parallax transform and some text fades can still feel flat. Design a memorable spatial relationship in the hero from the beginning.

This applies to the hero, not to every section of every website. Preserve the requested brand, content, framework, and functionality. Honor explicit static or simpler directions. Working surfaces such as dashboards do not need an invented marketing hero.

## Plan the depth before touching assets

Write a layer contract first. Use only the planes the scene needs; several divs that move together are one plane.

| Plane | Asset and depth | Independent movement | Contact/occlusion rule |
|---|---|---|---|
| Far environment | Clean background plate | Smallest displacement | No duplicate extracted subject |
| Midground | Architecture, landscape, or a meaningful product surface | Moderate displacement | Establishes scale and distance |
| Focal subject | Real product, alpha cutout, or rendered object | Deliberate travel/rotation | Stays on its support when grounded |
| Near foreground | Cutout, framing element, or physical detail | Strongest restrained displacement | Frames the subject; preserves key copy |
| Atmosphere | Light, mist, dust, or translucent material if appropriate | Slow independent change | Creates separation without washing out the page |
| Typography and controls | Semantic HTML | Stable or carefully staged | Complete headline and primary action remain readable |

Then:

- Name what moves independently, what overlaps, and what must stay physically connected.
- Give the visitor a clear visual payoff during a short scroll sequence. For example: the camera moves into a scene, the headline recedes behind a subject, a second narrative beat appears, and the scene settles into the next section. Write the opening, midpoint, and resolved exit in plain language.
- Scrolling should reveal a spatial relationship or advance the story: outside becomes inside, scattered becomes ordered, near detail passes the viewer. Unrelated floating decorations do not become meaningful because their speeds differ.
- Layering must change perceived depth. Several stacked elements moving as one image do not count. Use visibly different translation or scale rates, occlusion, and near/far relationships.
- Keep the initial composition compelling before any scroll, and the full headline readable. Do not sacrifice comprehension just to prove that a subject can cover text.

## Prepare real compositing assets

Use supplied photography, renders, or whatever image tooling the user has. For a photographic scene:

1. Create a clean background plate with the extracted subject removed and the space behind it rebuilt. Otherwise the moving cutout exposes a duplicate person or an empty hole.
2. Isolate the subject and relevant foreground into genuine alpha cutouts. Inspect the alpha channel; a checkerboard or white backdrop baked into the pixels is not transparency, and a solid magenta plate still needs keying and spill removal.
3. Preserve framing, scale, lighting, color, and camera perspective. Separately produced layers often need measured alignment even when they were requested with identical placement.
4. Keep shared contact points anchored. A person should remain on the rock, a product on its plinth, and a wheel on the road. Group physically connected elements such as a bicycle and its ground shadow. Shared translation and a common contact-point pivot can support different layer scales without making the subject float.
5. Inspect cutout edges against light and dark backgrounds and through the motion. Remove matte halos, jagged edges, clipped fabric, and foreground seams. Retain originals and optimize delivery files without losing alpha.

Atmosphere can occupy both a rear and a front plane when it supports the scene. It should create separation, not obscure the subject or wash out the whole image.

## Choose the rendering method for the subject

- HTML/CSS with genuine alpha imagery covers photographic planes, botanicals, liquid arcs, foreground framing, and architecture with a transparent opening. This is the default.
- A real 3D renderer earns its weight when rotation, material response, changing shadows, or a useful lighting control materially improves the experience. A generic primitive is not a substitute for modeling the actual object or brand mark. Render exact desktop and phone posters from the final scene, test with WebGL unavailable, and never leave `preserveDrawingBuffer` on outside a poster capture.
- Video is for authored footage or a shot that needs it, not a default replacement for independently moving planes.

## Choreograph restrained motion

- One coherent camera idea and purposeful transitions. Premium means controlled movement and good timing, not constant movement everywhere.
- Native sticky scrolling with independently transformed planes gives depth without WebGL or video. Choose heavier tools only when they improve the requested experience.
- Essential copy and calls to action stay semantic HTML, with a deliberate layer order for typography, subject, foreground, and atmosphere.
- Composited transforms and opacity, one shared scroll progress value (`--sc-p` from the engine), and rAF updates. Never re-render the page on every scroll tick.
- For a natural-flow hero (not pinned), map motion across an intentional visible interval; dividing by `elementHeight - viewportHeight` when the two are equal produces a one-pixel scene jump.
- Subtle pointer response on fine pointers is optional and additive. Touch, keyboard, and reduced-motion visitors still get a complete composition. Never request pointer lock or capture for parallax.
- Pause offscreen ambient work. Under reduced motion, keep the depth in the static composition and drop the movement; do not add pinned scroll space or hide essential content.
- Load the scene's layers together before switching from a complete poster fallback. No partial scenes, flashes, ghost subjects, or a broken hero when a layer fails.

## Art-direct mobile separately

Do not shrink the desktop composition. Check a typical phone and a compact 360 × 640 viewport. Recompose crop, subject position, contact-point pivot, type size, layer order, travel, and scroll duration. Typography may sit above the subject on mobile even when it passes behind the subject on desktop. Keep complete subjects when their silhouette matters, preserve the full heading, keep controls comfortably operable, and allow no horizontal overflow. Check sticky-header offsets and inherited desktop transforms; use valid angle units when resetting rotation (`rotate: 0deg`).

## Acceptance

Inspect the actual opening, at least two intermediate scroll positions, the final hero transition, and the mobile composition, on desktop and phone. Check:

- Distinct layers visibly move at different rates.
- No duplicate subjects, holes, cutout halos, floating contact points, or abrupt seams.
- The opening headline is readable, and the scroll produces a clear change in what the visitor sees or understands.
- The scene resolves cleanly into the next section.
- Mobile, reduced-motion, and no-JavaScript states remain complete and usable.
- Assets load, and controls still work.

A passing build or unit test does not prove the visual effect is good. If visual verification could not be performed, state that limit instead of claiming it was checked.
