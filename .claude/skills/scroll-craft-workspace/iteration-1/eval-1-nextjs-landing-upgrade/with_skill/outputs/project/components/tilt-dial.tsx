"use client";
import { useEffect, useRef } from "react";

/**
 * The Tilt dial: the page's signature move. A small dial in the header whose
 * needle is the reader's position in the page. One notch per section
 * ([data-tilt-chapter]); crossing into a section fires a spring impulse so the
 * needle overshoots and settles like a detent. Passed notches stay lit. At the
 * end of the page the needle hits its end stop and the ring locks.
 *
 * Page-local code driven from scroll; the engine is untouched. Decorative
 * (aria-hidden): the nav links remain the navigation. Under reduced motion
 * the needle still points (position is meaning) but never springs. Without
 * JavaScript it renders at rest on the first notch.
 */
const SWEEP = 270; // degrees of travel, from -135 (lower left) to +135 (lower right)
const REF = 0.62; // the reading line: a section is "current" once its top passes 62% down the viewport

export function TiltDial({ chapters = 6, className }: { chapters?: number; className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const n = Math.max(2, chapters);
  const notchAngle = (k: number) => -SWEEP / 2 + (SWEEP * k) / n; // notch k; k = n is the end stop

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const needle = el.querySelector<SVGGElement>("[data-needle]");
    const ticks = Array.from(el.querySelectorAll<SVGElement>("[data-tick]"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt-chapter]"));
    if (!needle || !sections.length) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

    let angle = notchAngle(0);
    let target = angle;
    let vel = 0;
    let index = 0;
    let raf = 0;
    let locked = false;

    function measure() {
      const y = scrollY;
      const vh = innerHeight;
      const maxY = Math.max(document.documentElement.scrollHeight - vh, 1);
      const line = y + vh * REF;
      // The first chapter starts where the reading line sits at y = 0, so the
      // needle rests exactly on notch 0 at the top of the page; the last chapter
      // ends where the page can no longer scroll, so the needle reaches the end
      // stop exactly at the bottom.
      const tops = sections.map((s, i) => (i === 0 ? vh * REF : s.getBoundingClientRect().top + y));
      const end = maxY + vh * REF;
      let k = 0;
      for (let i = 0; i < tops.length; i++) if (line >= tops[i]) k = i;
      k = Math.min(k, n - 1);
      const start = tops[k];
      const stop = k + 1 < tops.length ? tops[k + 1] : end;
      const local = clamp01((line - start) / Math.max(stop - start, 1));
      target = notchAngle(k) + (notchAngle(k + 1) - notchAngle(k)) * local;

      if (k !== index) {
        // The detent: a small impulse in the direction of travel.
        if (!reduce) vel += (k > index ? 1 : -1) * 2.6;
        index = k;
      }
      ticks.forEach((t, i) => {
        if (i <= k) t.setAttribute("data-lit", "");
        else t.removeAttribute("data-lit");
      });
      const nowLocked = k === n - 1 && local > 0.985;
      if (nowLocked !== locked) {
        locked = nowLocked;
        if (locked) el.setAttribute("data-locked", "");
        else el.removeAttribute("data-locked");
      }
    }

    function frame() {
      raf = 0;
      if (reduce) {
        angle = target;
        vel = 0;
      } else {
        vel = (vel + (target - angle) * 0.14) * 0.74;
        angle += vel;
      }
      needle!.setAttribute("transform", `rotate(${angle.toFixed(2)} 12 12)`);
      if (!reduce && (Math.abs(target - angle) > 0.02 || Math.abs(vel) > 0.02)) {
        raf = requestAnimationFrame(frame);
      }
    }

    function update() {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    }

    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update, { passive: true });
    // The engine sets act heights after it mounts; re-measure when the page
    // geometry changes, not only when the reader scrolls.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(document.body);
    update();

    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  const ticks = Array.from({ length: n }, (_, k) => {
    const a = (notchAngle(k) * Math.PI) / 180;
    const r1 = 8.4;
    const r2 = 10.4;
    return {
      k,
      x1: (12 + Math.sin(a) * r1).toFixed(3),
      y1: (12 - Math.cos(a) * r1).toFixed(3),
      x2: (12 + Math.sin(a) * r2).toFixed(3),
      y2: (12 - Math.cos(a) * r2).toFixed(3),
    };
  });
  // The end stop is a notch too, unlit until the needle reaches it.
  const endA = (notchAngle(n) * Math.PI) / 180;

  return (
    <svg
      ref={svg}
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      data-tilt-dial=""
    >
      <circle cx="12" cy="12" r="11.2" className="dial-ring" />
      {ticks.map((t) => (
        <line key={t.k} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} data-tick="" />
      ))}
      <line
        x1={(12 + Math.sin(endA) * 8.4).toFixed(3)}
        y1={(12 - Math.cos(endA) * 8.4).toFixed(3)}
        x2={(12 + Math.sin(endA) * 10.4).toFixed(3)}
        y2={(12 - Math.cos(endA) * 10.4).toFixed(3)}
        className="dial-stop"
      />
      <g data-needle="" transform={`rotate(${notchAngle(0).toFixed(2)} 12 12)`}>
        <line x1="12" y1="12" x2="12" y2="4.6" className="dial-needle" />
      </g>
      <circle cx="12" cy="12" r="1.7" className="dial-hub" />
    </svg>
  );
}
