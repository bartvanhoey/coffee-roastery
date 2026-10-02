# Using the engine in Next.js (App Router) and React

The engine is a dependency-free IIFE that reads `data-sc-*` attributes off real
markup. In Next.js that markup is JSX rendered by Server Components; one small
Client Component mounts the engine over it and tears it down on navigation.
Nothing about the devices, the taste rules or the verification pass changes.

Contents:
1. Files and where they go
2. The `sc-js` head script (no flash, no blank page)
3. The `<ScrollCraft>` client component
4. Writing acts in JSX
5. Upgrading an existing page (mode B)
6. Assets, fonts, Tailwind 4
7. Verifying against the dev server
8. Gotchas

---

## 1. Files

```
lib/scrollcraft/scrollcraft.js      copy of <skill>/engine/scrollcraft.js, unedited
app/scrollcraft.css                 copy of <skill>/engine/scrollcraft.css, unedited
components/scroll-craft.tsx         the mount component (section 3)
public/assets/...                   posters, clips, cutouts
scrollcraft/                        BRIEF.md and lab/ screenshots (not shipped)
```

Import the stylesheet once, in `app/layout.tsx` after `globals.css`, and put
the theme tokens in `globals.css`:

```css
/* globals.css */
@import "tailwindcss";

:root {
  --sc-canvas: #0a0806;  --sc-surface: #16110e;
  --sc-ink: #f5ebdd;     --sc-ink-soft: #a2968a;
  --sc-accent: #ff5a3d;  --sc-accent-ink: #15110f;
  --sc-font-display: var(--font-display), system-ui, sans-serif;
  --sc-font-text: var(--font-text), system-ui, sans-serif;
}
```

Never edit the two engine files per project. Bespoke behaviour is page-local
code driven off `--sc-p` and your own `data-*` attributes, exactly as in a
static build.

## 2. The head script

`scrollcraft.css` hides cued copy only under `html.sc-js`. The engine adds that
class when it runs, but in Next.js the engine arrives after hydration, so the
page would paint visible, then hide, then reveal. Add the class synchronously in
`<head>` so the hidden state exists from the first paint, and mark `<html>` with
`suppressHydrationWarning` because its class list now differs from what React
rendered. This is the pattern the Next.js docs recommend for any client-only
state that must be right before paint.

```tsx
// app/layout.tsx  (Server Component)
import "./globals.css";
import "./scrollcraft.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("sc-js")` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

A visitor without JavaScript never gets the class and sees every headline and
paragraph. That is the whole point; do not "optimise" it away.

## 3. The mount component

```tsx
// components/scroll-craft.tsx
"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type Instance = { layout(): void; read(): void; destroy(): void };
declare global {
  interface Window {
    ScrollCraft?: { mount(root?: Element | string, opts?: { lerp?: number }): Instance; reduce: boolean; instances: Instance[] };
  }
}

/**
 * Wrap the scroll-driven part of a page in this. It mounts the engine over its
 * children after hydration and destroys it on unmount, so a route change never
 * leaves listeners or rAF loops behind. Keep it inside the page, not in the
 * root layout: a persistent layout would keep one instance alive across routes
 * whose acts no longer exist.
 */
export function ScrollCraft({ children, lerp }: { children: ReactNode; lerp?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let instance: Instance | undefined;
    let cancelled = false;
    // Dynamic import: the engine touches window/matchMedia at evaluation time,
    // so a static import would run during server rendering and throw.
    import("@/lib/scrollcraft/scrollcraft.js").then(() => {
      if (cancelled || !root.current || !window.ScrollCraft) return;
      instance = window.ScrollCraft.mount(root.current, lerp ? { lerp } : undefined);
    });
    return () => { cancelled = true; instance?.destroy(); };
  }, [pathname, lerp]);

  return <div ref={root} data-sc-root="">{children}</div>;
}
```

`pathname` in the dependency list rebuilds the mount when the route changes
under a persistent layout. If the engine file is `.js` in a TypeScript project,
add `// @ts-nocheck` at its top or an `allowJs` entry; do not convert it.

## 4. Acts in JSX

Content stays in Server Components. Attributes translate one to one; the only
JSX differences are camelCase for `playsInline`, `className` for class, and
`data-sc-scrub=""` for valueless attributes (the engine tests presence, so
`"true"` also works).

```tsx
// app/page.tsx  (Server Component)
import { ScrollCraft } from "@/components/scroll-craft";

export default function Page() {
  return (
    <ScrollCraft>
      <span data-sc-progress="" />
      <main>
        <section data-sc-act="scrub" data-sc-span="2.6" data-sc-dwell="0.34">
          <div data-sc-stage="">
            <img className="sc-stage__poster" src="/assets/01-poster.webp" alt="" />
            <video data-sc-scrub="" data-sc-src="/assets/01.mp4" data-sc-src-mobile="/assets/01-m.mp4" muted playsInline />
            <div className="sc-scrim sc-scrim--lead" aria-hidden="true" />
            <div className="sc-copy sc-copy--lead" data-sc-cue="0 0.78 0">
              <h1 className="sc-display sc-display--xl" data-sc-kinetic="lines">The promise, in under nine words.</h1>
              <p className="sc-body">One plain sentence.</p>
            </div>
          </div>
        </section>

        <section className="sc-section" data-sc-act="flow">
          <div className="sc-wrap" data-sc-in="" data-sc-stagger="70">
            <h2 className="sc-display sc-display--lg">What changes.</h2>
            <p className="sc-body">…</p>
          </div>
        </section>
      </main>
    </ScrollCraft>
  );
}
```

Two engine devices rewrite DOM text: `data-sc-kinetic` splits an element into
spans and `data-sc-count` rewrites `textContent`. React tolerates that as long
as the element never re-renders. Keep them in static server-rendered markup, or
in a client component whose props don't change. If a kinetic heading must live
next to state, give it its own component with a stable `key` so React never
diffs its children.

Use `next/image` freely for flow sections. Inside a stage, the poster is a plain
`<img className="sc-stage__poster">` because the engine toggles its opacity and
positions it with the stage's own CSS; wrapping it in `<Image fill>` works if
you pass the class through and give the parent `position: relative`.

## 5. Upgrading an existing page (mode B)

Most real requests are "make this page feel premium", not "build a page". The
brief shrinks to three questions (SKILL.md Step 1) and the work is additive:

1. Read the page as it is. Identify the beats it already has (hero, proof,
   features, offer, close). Do not reorder content to fit a device.
2. Wrap the scroll-driven region in `<ScrollCraft>`. Keep the site nav outside
   it and outside any act.
3. Give ordinary sections `data-sc-act="flow"` plus `data-sc-in` /
   `data-sc-stagger` on the block that should settle in. That alone lifts a
   template page, costs nothing, and degrades to plain content.
4. Pick one or two hero moments, never more: a layered hero with parallax
   planes (`data-sc-parallax`), one pinned argument (`data-sc-act="pin"` with
   staggered `data-sc-cue` lines), or one `pan` rail for a set of items. Score
   them with the same checks as a new page: no device twice in a row, at most
   two scrub acts, one peak.
5. Leave the existing CSS alone except to map its colours and fonts onto the
   `--sc-*` tokens. The engine's classes are additive.
6. Verify (section 7), including the no-JS and reduced-motion states.

## 6. Assets, fonts, Tailwind 4

- Clips and posters live under `public/assets/`; `data-sc-src="/assets/01.mp4"`.
  The engine fetches clips as blobs, so the dev server's lack of range requests
  is not a problem. Encode with `encode.sh` as for a static build.
- Fonts: load with `next/font` and point the tokens at its CSS variables
  (`--sc-font-display: var(--font-display)`).
- Tailwind 4 preflight and the engine coexist; every engine rule is scoped to
  `.sc-*` or `[data-sc-*]`. Use Tailwind for layout inside acts freely. Do not
  restyle `.sc-stage`, `.sc-copy` or any `[data-sc-*]` selector.
- `motion-reduce:` variants are still useful for one-off tweaks, but the engine
  already collapses translation and skips clip fetches under reduced motion.

## 7. Verifying against the dev server

```bash
npm i -D playwright-core                                   # once
npm run dev                                                # port 3000
node <skill>/scripts/shoot.mjs --url http://localhost:3000/ --out scrollcraft/lab/shots
node <skill>/scripts/shoot.mjs --url http://localhost:3000/ --out scrollcraft/lab/mobile --width 390 --height 844
node <skill>/scripts/shoot.mjs --url http://localhost:3000/ --out scrollcraft/lab/reduced --reduced-motion
```

The harness waits for `html.sc-ready`, which the engine adds after its first
layout, so it works unchanged against a Next.js route. `serve.mjs` is not
needed. Then the manual passes from verify.md, plus one Next-specific check:
navigate to another route and back with the client router and confirm exactly
one instance in `window.ScrollCraft.instances` and no console errors.

To check the no-JS state, disable JavaScript in DevTools and reload: every
headline and paragraph must be readable and nothing should sit at opacity 0.

## 8. Gotchas

- **Static import of the engine crashes SSR.** Always `import()` inside an
  effect, as in the component above. `next/dynamic` with `ssr: false` also
  works but only from a Client Component.
- **Hydration mismatch on `<html>`.** Comes from the head script adding
  `sc-js`; `suppressHydrationWarning` on `<html>` is the documented fix.
- **Kinetic or counter text disappears after a state change.** React re-rendered
  an element the engine had split. Isolate it (section 4).
- **Ghost animations after navigation.** The mount lived in the root layout, or
  `destroy()` was not called. Mount per page and keep the cleanup.
- **Pinned stage jumps or never sticks.** An ancestor has `transform`, `filter`
  or `overflow` set. Tailwind's `overflow-hidden` on a wrapper is the usual
  culprit; pin inside a plain block.
- **Clip fails to paint in the harness.** Bundled Chromium has no h264 decoder.
  The harness uses installed Chrome or Edge; set `SCROLLCRAFT_CHROME` if it
  cannot find one.
- **Route transitions.** Animating between routes is React's `<ViewTransition>`
  (see the Next.js guide on view transitions), not a scroll device.
