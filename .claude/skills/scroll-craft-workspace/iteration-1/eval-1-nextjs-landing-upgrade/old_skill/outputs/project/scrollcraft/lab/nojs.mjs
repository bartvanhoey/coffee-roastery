#!/usr/bin/env node
/**
 * The no-JavaScript pass. Loads the page with scripting disabled, checks that
 * every piece of copy is present and painted at full opacity, and writes a
 * full-page screenshot at desktop and phone widths.
 *
 *   node scrollcraft/lab/nojs.mjs --url http://localhost:3102 --out scrollcraft/lab/nojs
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const { chromium } = createRequire(path.join(process.cwd(), "package.json"))("playwright-core");
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i > -1 && argv[i + 1] ? argv[i + 1] : d; };
const URL = arg("--url", "http://localhost:3102");
const OUT = path.resolve(arg("--out", "scrollcraft/lab/nojs"));
const CHROME = process.env.SCROLLCRAFT_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
fs.mkdirSync(OUT, { recursive: true });

const COPY = [
  "A pour-over scale that remembers the cup you liked.",
  "Tilt weighs, times and logs every brew, then plays it back so the next one tastes the same.",
  "How it works", "Every dose, logged", "Recipes that travel", "Quiet by design",
  "Machined, not moulded.",
  "The body is a single block of anodised aluminium. The platform is glass. The dial is the only thing that turns, and it turns for years.",
  "0.1 g", "18 h", "3", "scale resolution", "battery per charge", "moving parts",
  "I stopped guessing. My Tuesday coffee tastes like my Saturday coffee now.",
  "Amara Osei, early tester",
  "First batch ships in March.",
  "Reserve for 20 euros, refundable any time before your Tilt ships.",
  "Tilt, Antwerp", "hello@tilt.example",
];

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
let problems = 0;
for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["phone", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, javaScriptEnabled: false, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "load" });
  const result = await page.evaluate((copy) => {
    const norm = (s) => s.replace(/\s+/g, " ").trim();
    const body = norm(document.body.innerText);
    const missing = copy.filter((c) => !body.includes(c));
    // Every element that the engine would drive must be painted without it.
    const hidden = [];
    document.querySelectorAll("[data-sc-cue],[data-sc-in],[data-sc-stagger] > *,[data-sc-reveal]").forEach((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (parseFloat(cs.opacity) < 0.99 || cs.visibility === "hidden" || (cs.clipPath !== "none" && !/inset\(0(px|%)?( 0(px|%)?){3}\)/.test(cs.clipPath) && !el.classList.contains("how__line")))
        hidden.push(`${el.tagName.toLowerCase()} "${norm(el.textContent || "").slice(0, 40)}" opacity=${cs.opacity} clip=${cs.clipPath} ${Math.round(r.width)}x${Math.round(r.height)}`);
    });
    const sticky = getComputedStyle(document.querySelector("header")).position;
    const readouts = [...document.querySelectorAll("[data-pour-g]")].map((e) => e.textContent.trim());
    const overflow = document.documentElement.scrollWidth > innerWidth;
    return { missing, hidden, sticky, readouts, overflow, height: document.body.scrollHeight, hasScReady: document.documentElement.classList.contains("sc-ready") };
  }, COPY);
  await page.screenshot({ path: path.join(OUT, `${name}-full.png`), fullPage: true });
  await page.screenshot({ path: path.join(OUT, `${name}-top.png`) });
  console.log(`\n[no-js ${name}] ${vp.width}x${vp.height}  page ${result.height}px  engine-ready=${result.hasScReady}`);
  console.log(`  copy missing: ${result.missing.length ? result.missing.join(" | ") : "none, all ${COPY.length} strings present".replace("${COPY.length}", COPY.length)}`);
  console.log(`  driven elements not painted: ${result.hidden.length ? "\n    " + result.hidden.join("\n    ") : "none"}`);
  console.log(`  readouts: ${result.readouts.join(", ")}   horizontal overflow: ${result.overflow}   header: ${result.sticky}`);
  problems += result.missing.length + result.hidden.length + (result.overflow ? 1 : 0);
  await ctx.close();
}
await browser.close();
console.log(problems ? `\n${problems} problem(s)` : "\nno-js: content complete at both widths");
process.exit(problems ? 1 : 0);
