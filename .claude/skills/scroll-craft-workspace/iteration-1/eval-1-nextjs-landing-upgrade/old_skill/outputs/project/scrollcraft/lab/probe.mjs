#!/usr/bin/env node
/**
 * Two passes the harness does not do:
 *
 *  depth   scroll the hero to several progress values and report each plane's
 *          actual transform and the display's text, so "layers move at
 *          different rates" is measured rather than asserted; then move the
 *          pointer and report the pointer-depth shift.
 *  keys    tab through the page and report every focus stop: what it is,
 *          whether it is on screen, and its computed opacity.
 *
 *   node scrollcraft/lab/probe.mjs --url http://localhost:3102 [--reduced-motion]
 */
import path from "node:path";
import { createRequire } from "node:module";

const { chromium } = createRequire(path.join(process.cwd(), "package.json"))("playwright-core");
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i > -1 && argv[i + 1] ? argv[i + 1] : d; };
const URL = arg("--url", "http://localhost:3102");
const REDUCED = argv.includes("--reduced-motion");
const CHROME = process.env.SCROLLCRAFT_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: REDUCED ? "reduce" : "no-preference" });
await page.addInitScript(() => {
  Element.prototype.requestPointerLock = () => Promise.reject(new Error("disabled"));
  Element.prototype.setPointerCapture = () => {};
});
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector("html.sc-ready", { timeout: 20000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

// ---- depth --------------------------------------------------------------
const hero = await page.evaluate(() => {
  const el = document.querySelector(".hero");
  const r = el.getBoundingClientRect();
  return { top: r.top + scrollY, height: r.height, vh: innerHeight };
});
const planes = ["far", "product", "stream", "readout", "steam"];
console.log(`\n[depth] hero act ${Math.round(hero.height)}px tall, pinned travel ${Math.round(hero.height - hero.vh)}px`);
const rows = [];
for (const p of [0, 0.25, 0.5, 0.75, 1]) {
  const y = Math.round(hero.top + (hero.height - hero.vh) * p);
  await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(REDUCED ? 200 : 900); // let the display's lerp arrive
  const s = await page.evaluate((planes) => {
    const ty = (sel) => {
      const el = document.querySelector(sel);
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return +m.m42.toFixed(1);
    };
    const out = { p: getComputedStyle(document.querySelector(".hero")).getPropertyValue("--sc-p").trim() };
    planes.forEach((n) => (out[n] = ty(`.plane--${n}`)));
    const st = document.querySelector(".hero [data-sc-stage]");
    out.readout = st.getAttribute("data-sc-verify-state");
    out.pour = st.style.getPropertyValue("--pour");
    out.stageTop = Math.round(st.getBoundingClientRect().top);
    return out;
  }, planes);
  rows.push({ scrollY: y, ...s });
}
console.table(rows);
const spread = planes.map((n) => Math.abs(rows[4][n] - rows[0][n]).toFixed(0));
console.log(`  total travel per plane over the act (px): ${planes.map((n, i) => `${n}=${spread[i]}`).join("  ")}`);
const distinct = new Set(spread).size;
console.log(distinct === planes.length ? "  five planes, five different rates" : `  WARNING: only ${distinct} distinct rates`);

// pointer depth
await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(300);
await page.mouse.move(720, 450);
await page.waitForTimeout(600);
const centre = await page.evaluate(() => [...document.querySelectorAll(".scene .plane__in")].map((el) => getComputedStyle(el).transform));
await page.mouse.move(1400, 100);
await page.waitForTimeout(900);
const corner = await page.evaluate(() => [...document.querySelectorAll(".scene .plane__in")].map((el) => {
  const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
  return `${m.m41.toFixed(1)},${m.m42.toFixed(1)}`;
}));
console.log(`  pointer at centre -> planes: ${centre.map((t) => (t === "none" ? "0,0" : t)).join(" | ")}`);
console.log(`  pointer top-right -> planes (x,y px): ${corner.join(" | ")}`);
await page.screenshot({ path: path.resolve(arg("--out", "scrollcraft/lab"), `probe-pointer${REDUCED ? "-reduced" : ""}.png`) });

// ---- keys ---------------------------------------------------------------
await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(200);
console.log("\n[keys] tab order:");
const seen = [];
for (let i = 0; i < 12; i++) {
  await page.keyboard.press("Tab");
  await page.waitForTimeout(REDUCED ? 120 : 350);
  const f = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect();
    const cue = el.closest("[data-sc-cue]");
    const op = Math.min(parseFloat(getComputedStyle(el).opacity), cue ? parseFloat(getComputedStyle(cue).opacity) : 1);
    return {
      el: `${el.tagName.toLowerCase()} "${(el.textContent || "").trim().slice(0, 28)}" -> ${el.getAttribute("href") || ""}`,
      onScreen: r.top >= 0 && r.bottom <= innerHeight && r.width > 0,
      opacity: +op.toFixed(2),
      outline: getComputedStyle(el).outlineStyle !== "none" ? getComputedStyle(el).outlineColor : "none",
    };
  });
  if (!f) break;
  seen.push(f);
  console.log(`  ${String(i + 1).padStart(2)}  ${f.onScreen ? "on-screen " : "OFF-SCREEN"}  opacity ${f.opacity}  ring ${f.outline}  ${f.el}`);
  if (seen.length >= 6) break;
}
const bad = seen.filter((f) => !f.onScreen || f.opacity < 0.85);
console.log(bad.length ? `  ${bad.length} focus stop(s) not visible` : "  every focus stop is on screen and legible");

console.log(errors.length ? `\nconsole errors:\n  ${errors.join("\n  ")}` : "\nno console errors");
await browser.close();
