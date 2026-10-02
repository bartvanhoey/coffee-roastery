# scroll-craft changelog

## 2026-09-16: forked and adapted for in-codebase use

This copy derives from Nate Herk's `scroll-craft` skill (public release 0.3.0,
2026-09-04). The engine, devices, grammars, feel method, taste rules and
verification harness are his work and are kept. What changed:

- **Two modes.** Mode A builds a new page as before. Mode B upgrades an
  existing page or section without rewriting its content; the brief shrinks to
  three questions and the score allows three device families on a short page.
- **Next.js / React support.** New `references/nextjs.md`: head script, a
  `<ScrollCraft>` mount component with teardown, JSX attribute notes, mode B
  steps, dev-server verification, gotchas. The preflight reports the stack.
- **Engine: `instance.destroy()`.** Every window listener and observer a mount
  adds is now tracked and removed, and rAF loops stop. Required for SPA route
  changes and React unmounts. Public API is documented at the top of the file.
- **Engine: no-JavaScript safety.** Hidden pre-paint states (`[data-sc-cue]`,
  `[data-sc-in]`, `[data-sc-copy]`) are scoped to `html.sc-js`, which the engine
  sets on load and which `template.html` / the Next.js layout also set from an
  inline head script. A visitor without script sees complete content.
  Worldflight gains a readable no-script fallback.
- **Asset generation removed.** `kie.mjs` and its API key are gone, along with
  the pricing and aspect-ratio notes. `assets.md` now leads with the client's
  own photos and footage and is generator-agnostic. `encode.sh` stays for scrub
  clips; ffmpeg is optional in the preflight and only needed for clips.
- **Fingerprint registry removed.** `workspace.mjs`, `templates/FINGERPRINTS.md`
  and the registry gate are replaced by a "repeat check" against the template
  and the previous build (`uniqueness.md` section 4). Builds live in
  `<project>/scrollcraft/`.
- **Personal references removed.** The approved-collection worked examples and
  the named client heroes are gone; the generic principles from them (layer
  contract, rendering-method choice, mobile art direction, delivery evidence)
  are folded into `hero-depth.md`.

The upstream changelog with the build findings that shaped the original rules
is in the upstream repository.
