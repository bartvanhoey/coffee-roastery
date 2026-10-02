"use client";

import Script from "next/script";
import { useEffect } from "react";
import { fmtGrams, fmtTime, pourAt } from "@/lib/pour";

/**
 * Mounts the scrollcraft engine (public/scrollcraft.js, untouched) once, then
 * runs the two page-local behaviours the engine does not ship:
 *
 *   - the pour log: the hero display weighs the visitor's scroll as a pour and
 *     the closing display plays that log back, both driven from the act's
 *     progress that the engine publishes;
 *   - pointer depth: on fine pointers the hero's planes lean with the mouse,
 *     each by its own depth, so the scene shifts like a real space would.
 *
 * Both are off under prefers-reduced-motion, where the displays show the
 * finished log and the planes hold still.
 */

type Act = { el: Element; p: number };
type Instance = { acts: Act[] };
type Engine = {
  mount: (root: Element | Document) => Instance;
  instances: Instance[];
  reduce: boolean;
};

declare global {
  interface Window {
    ScrollCraft?: Engine;
    __tiltScrollCraft?: boolean;
  }
}

type Log = {
  act: HTMLElement;
  stage: HTMLElement;
  g: HTMLElement | null;
  t: HTMLElement | null;
  trace: SVGPathElement | null;
  cur: number;
  last: number;
};

function renderLog(log: Log, p: number) {
  const { t, g, pouring } = pourAt(p);
  const gs = fmtGrams(g);
  const ts = fmtTime(t);
  if (log.g) log.g.textContent = gs;
  if (log.t) log.t.textContent = ts;
  if (log.trace) log.trace.style.strokeDashoffset = String(1 - p);
  log.stage.style.setProperty("--pour", pouring ? "1" : "0");
  log.stage.classList.toggle("is-logged", p > 0.985);
  // What actually paints, for the verification harness: not raw progress.
  log.stage.setAttribute("data-sc-verify-state", `${gs}g ${ts}`);
  if (p >= 0.999) log.stage.setAttribute("data-sc-verify-hold", "true");
  else log.stage.removeAttribute("data-sc-verify-hold");
}

function startPourLog(instance: Instance, reduce: boolean) {
  const logs: Log[] = [];
  document.querySelectorAll<HTMLElement>("[data-pour]").forEach((el) => {
    const act = el.closest<HTMLElement>("[data-sc-act]");
    if (!act) return;
    logs.push({
      act,
      stage: el.closest<HTMLElement>("[data-sc-stage]") ?? act,
      g: el.querySelector<HTMLElement>("[data-pour-g]"),
      t: el.querySelector<HTMLElement>("[data-pour-t]"),
      trace: el.querySelector<SVGPathElement>("[data-pour-trace]"),
      cur: 0,
      last: -1,
    });
  });
  if (!logs.length) return;

  if (reduce) {
    logs.forEach((log) => renderLog(log, 1));
    return;
  }

  logs.forEach((log) => {
    if (log.trace) {
      log.trace.setAttribute("pathLength", "1");
      log.trace.style.strokeDasharray = "1";
    }
    renderLog(log, 0);
  });

  const progress = (act: HTMLElement) => {
    const rec = instance.acts.find((a) => a.el === act);
    if (rec) return rec.p;
    return parseFloat(getComputedStyle(act).getPropertyValue("--sc-p")) || 0;
  };

  const tick = () => {
    for (const log of logs) {
      const target = progress(log.act);
      log.cur += (target - log.cur) * 0.16;
      if (Math.abs(target - log.cur) < 0.0008) log.cur = target;
      if (log.cur !== log.last) {
        log.last = log.cur;
        renderLog(log, log.cur);
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function startPointerDepth(reduce: boolean) {
  if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const scene = document.querySelector<HTMLElement>("[data-pointer-depth]");
  if (!scene) return;
  const clamp = (v: number) => (v < -1 ? -1 : v > 1 ? 1 : v);
  let tx = 0;
  let ty = 0;
  let x = 0;
  let y = 0;
  let running = false;

  const loop = () => {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    scene.style.setProperty("--mx", x.toFixed(4));
    scene.style.setProperty("--my", y.toFixed(4));
    if (Math.abs(tx - x) < 0.0005 && Math.abs(ty - y) < 0.0005) {
      running = false;
      return;
    }
    requestAnimationFrame(loop);
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      const r = scene.getBoundingClientRect();
      const onScreen = r.bottom > 0 && r.top < window.innerHeight;
      tx = onScreen ? clamp((e.clientX / window.innerWidth - 0.5) * 2) : 0;
      ty = onScreen ? clamp((e.clientY / window.innerHeight - 0.5) * 2) : 0;
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    },
    { passive: true },
  );
}

function start() {
  if (typeof window === "undefined" || !window.ScrollCraft || window.__tiltScrollCraft) return;
  window.__tiltScrollCraft = true;
  const instance = window.ScrollCraft.mount(document.body);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  startPourLog(instance, reduce);
  startPointerDepth(reduce);
}

export default function ScrollCraft() {
  // The script may already be on the page (client-side navigation back to
  // this route); onReady covers the first load.
  useEffect(() => {
    start();
  }, []);
  return <Script src="/scrollcraft.js" strategy="afterInteractive" onReady={start} />;
}
