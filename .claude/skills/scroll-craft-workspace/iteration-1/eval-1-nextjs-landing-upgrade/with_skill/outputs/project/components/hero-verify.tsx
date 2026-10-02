"use client";
import { useEffect } from "react";

/**
 * Publishes the hero's rendered state for the verification harness.
 *
 * The hero is a pinned act whose visible change is parallax on its planes,
 * which the harness cannot see through cues or clips. It reads
 * `data-sc-verify-state` instead, so this mirrors the planes' painted vertical
 * offsets (rounded pixels, not raw progress) onto the stage after each scroll.
 * Under reduced motion the planes are still by design, so the stage declares
 * an authored hold. Renders nothing.
 */
export function HeroVerify() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
    if (!stage) return;
    const planes = Array.from(stage.querySelectorAll<HTMLElement>("[data-hero-plane]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.setAttribute("data-sc-verify-state", "planes:static");
      stage.setAttribute("data-sc-verify-hold", "true");
      return;
    }
    let raf = 0;
    const write = () => {
      raf = 0;
      const sig = planes
        .map((p) => {
          const m = new DOMMatrixReadOnly(getComputedStyle(p).transform);
          return `${p.dataset.heroPlane}:${Math.round(m.m42)}`;
        })
        .join("|");
      stage.setAttribute("data-sc-verify-state", sig);
    };
    // Two frames out, so the engine's own rAF write has landed first.
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => requestAnimationFrame(write));
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
