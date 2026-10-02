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

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, all routes prerendered
npm run lint
```

## Where things live

- `lib/products.ts` — the catalogue (16 products across 5 categories) and helpers.
- `lib/site.ts` — brand copy, navigation, origins, timeline, team, craft steps, stores.
- `components/` — `Header`, `Footer`, `VideoBackground`, `Reveal` (scroll-in), `ProductGrid` (filters), `PageHero`, etc.
- `app/globals.css` — colour tokens, fonts, keyframes, grain overlay, reveal transitions.
- `public/videos/` — twelve 720p background clips.

## Media and licences

- Videos are free stock clips from [Mixkit](https://mixkit.co/license/) (720p, ~3–10 MB each, ~63 MB total). Swap them for brand footage by replacing the files in `public/videos/`.
- Photos are loaded from Unsplash via `next/image` (`images.unsplash.com` is allow-listed in `next.config.ts`).

## Notes

- Background videos are muted, loop, only play while on screen, and stay on their poster image when the visitor has reduced motion enabled.
- The brand, people, places and products are invented for this demo.
