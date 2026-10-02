# Aurum Coffee Roasters

A product-portfolio website for a fictional premium coffee brand, built with
Next.js 16 (App Router), React 19 and Tailwind CSS 4. Dark, editorial look with
serif display type, gold accents, film grain, and looping background video.

## Pages

| Route              | What it is                                                              |
| ------------------ | ----------------------------------------------------------------------- |
| `/`                | Home: full-screen video hero, manifesto, featured products, craft, origins rail, newsletter |
| `/products`        | Portfolio with category filters and sorting (`?category=cold-brew` deep links) |
| `/products/[slug]` | Product detail: specs, tasting notes, intensity meter, related products |
| `/roastery`        | The Craft: five process steps, each with its own video                  |
| `/about`           | Story, timeline, values, team                                           |
| `/stores`          | Salones (locations) and wholesale                                       |
| `/contact`         | Contact form and roastery details                                       |

## Prerequisites

- Node.js 20.9 or newer (required by Next.js 16)
- npm

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, all routes prerendered
npm start        # serve the production build
npm run lint
```

This project uses Next.js 16, which has breaking changes compared to earlier
versions. Before changing framework-level code, read the bundled docs in
`node_modules/next/dist/docs/` (see `AGENTS.md`).

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router), React 19, TypeScript
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- ESLint 9 with `eslint-config-next`
- Playwright (`playwright-core`) for the scroll-craft visual checks

## Where things live

- `lib/products.ts` — the catalogue (17 products across 5 categories) and helpers.
- `lib/site.ts` — brand copy, navigation, origins, timeline, team, craft steps, stores.
- `components/` — `Header`, `Footer`, `VideoBackground`, `Reveal` (scroll-in), `ProductGrid` (filters), `PageHero`, etc.
- `app/globals.css` — colour tokens, fonts, keyframes, grain overlay, reveal transitions.
- `components/scroll-craft.tsx`, `lib/scrollcraft/`, `app/scrollcraft.css` — the scroll-driven animation layer (see below).
- `public/videos/` — twelve 720p background clips.

## Scroll-craft

The site uses a dependency-free scroll engine (`lib/scrollcraft/`) for layered parallax, pinned and scrubbed video sections, and kinetic type. Wrap a page's scroll-driven content in the `ScrollCraft` component from `components/scroll-craft.tsx`; it mounts the engine after hydration and destroys it on unmount. Acts are declared with `data-sc-*` attributes in the markup (for example `data-sc-act="scrub"`). Keep `ScrollCraft` inside each page, not in the root layout.

The design intent and per-route scoring are in `scrollcraft/BRIEF.md`. Desktop, mobile and reduced-motion verification screenshots are in `scrollcraft/lab/`.

## Media and licences

- Videos are free stock clips from [Mixkit](https://mixkit.co/license/) (720p, ~3–10 MB each, ~63 MB total). Swap them for brand footage by replacing the files in `public/videos/`.
- Photos are loaded from Unsplash via `next/image` (`images.unsplash.com` is allow-listed in `next.config.ts`).

## Notes

- Background videos are muted, loop, only play while on screen, and stay on their poster image when the visitor has reduced motion enabled.
- The brand, people, places and products are invented for this demo.

## License

Released under the [MIT License](LICENSE). Third-party media keep their own licences, see above.
