"use client";

import { useEffect, useRef } from "react";

/**
 * Signature move: a thin gold trace fixed to the left edge that fills as the
 * visitor scrolls the page, like coffee rising in a cup. Glows once it passes
 * the peak section. Driven from raw document scroll, not an act's --sc-p,
 * since it spans the whole page rather than one act.
 */
export default function PourLine({ peakSelector }: { peakSelector: string }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let glowed = false;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${p})`;
      }

      const peak = document.querySelector(peakSelector);
      if (peak && lineRef.current) {
        const rect = peak.getBoundingClientRect();
        const inPeak =
          rect.top < window.innerHeight * 0.6 &&
          rect.bottom > window.innerHeight * 0.4;
        if (inPeak !== glowed) {
          glowed = inPeak;
          lineRef.current.classList.toggle("is-glowing", inPeak);
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [peakSelector]);

  return (
    <div
      ref={lineRef}
      className="pour-line"
      aria-hidden="true"
    >
      <div ref={fillRef} className="pour-line__fill" />
    </div>
  );
}
