#!/usr/bin/env node
/**
 * Programmatic grader for the scroll-craft evals.
 *
 *   node grade.mjs --eval 0 --run <run-dir> [--port 3111]
 *
 * <run-dir> is e.g. iteration-1/eval-0-coffee-roaster-new-page/with_skill.
 * Writes <run-dir>/grading.json with expectations [{text, passed, evidence}]
 * in the same order as the eval's eval_metadata.json assertions.
 */
import fs from "node:fs";
import path from "node:path";
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PROJECT = "C:/CTemp/skill-creator-app";
const SKILL = path.join(PROJECT, ".claude/skills/scroll-craft");
const { chromium } = createRequire(path.join(PROJECT, "package.json"))("playwright-core");
const CHROME = process.env.SCROLLCRAFT_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i > -1 && argv[i + 1] ? argv[i + 1] : d; };
const EVAL = parseInt(arg("--eval", "0"), 10);
const RUN = path.resolve(arg("--run"));
const PORT = parseInt(arg("--port", "3111"), 10);
const OUT = path.join(RUN, "outputs");
const META = JSON.parse(fs.readFileSync(path.join(path.dirname(RUN), "eval_metadata.json"), "utf8"));

// ---------------------------------------------------------------- utils ----
function walk(dir, pred, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next" || e.name === ".git") continue;
    const p = path.join(dir, e.name);
    if (e.isSymbolicLink()) continue;
    if (e.isDirectory()) walk(p, pred, acc);
    else if (pred(p)) acc.push(p);
  }
  return acc;
}
const norm = (s) => s.replace(/\s+/g, " ").replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').trim();
const rel = (p) => path.relative(OUT, p).replace(/\\/g, "/");
const results = [];
const add = (text, passed, evidence) => results.push({ text, passed: Boolean(passed), evidence: String(evidence).slice(0, 600) });

// --------------------------------------------------------- locate target ----
let pageUrl, devProc = null;
const isNext = EVAL === 1;
if (isNext) {
  const proj = path.join(OUT, "project");
  devProc = spawn("npm", ["run", "dev", "--", "--port", String(PORT)], { cwd: proj, shell: true, stdio: ["ignore", "pipe", "pipe"] });
  let log = "";
  devProc.stdout.on("data", (d) => (log += d));
  devProc.stderr.on("data", (d) => (log += d));
  pageUrl = `http://localhost:${PORT}/`;
  const t0 = Date.now();
  let up = false;
  while (Date.now() - t0 < 90000) {
    try { const r = await fetch(pageUrl); if (r.ok) { up = true; break; } } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  if (!up) { console.error("dev server did not start:\n" + log.slice(-2000)); }
} else {
  const html = walk(OUT, (p) => /(^|[\\/])index\.html$/i.test(p) && !/lab[\\/]/.test(p)).sort((a, b) => a.length - b.length)[0];
  pageUrl = html ? "file:///" + html.replace(/\\/g, "/") : null;
}
const pageFile = isNext ? null : decodeURIComponent(pageUrl?.replace("file:///", "") || "");
const rawHtml = pageFile && fs.existsSync(pageFile) ? fs.readFileSync(pageFile, "utf8") : "";

// ------------------------------------------------------------ browser ----
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
async function withPage(ctxOpts, fn) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...ctxOpts });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  try {
    if (pageUrl) await page.goto(pageUrl, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1500);
    return await fn(page, errors);
  } finally { await ctx.close(); }
}
const TEXT_SEL = "h1, h2, h3, p, blockquote, li > strong";
const textProbe = async (page, scrollEach) => page.evaluate(async ({ sel, scrollEach }) => {
  const els = [...document.querySelectorAll(sel)].filter((e) => e.textContent.trim().length > 2);
  const out = [];
  for (const el of els) {
    if (scrollEach) { el.scrollIntoView({ block: "center", behavior: "instant" }); await new Promise((r) => setTimeout(r, 450)); }
    const cs = getComputedStyle(el);
    let op = 1, tr = "";
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const c = getComputedStyle(n);
      op = Math.min(op, parseFloat(c.opacity));
      if (c.visibility === "hidden" || c.display === "none") op = 0;
      const m = c.transform;
      if (m && m !== "none") { const p = m.match(/matrix\(([^)]+)\)/); if (p) { const v = p[1].split(",").map(Number); if (Math.abs(v[4]) > 1 || Math.abs(v[5]) > 1) tr = m; } }
    }
    out.push({ text: el.textContent.trim().slice(0, 40), opacity: op, transform: tr });
  }
  return out;
}, { sel: TEXT_SEL, scrollEach });

// ----------------------------------------------------------- assertions ----
const A = META.assertions;
let i = 0;
const next = () => A[i++];

// 1 engine files present
{
  const js = walk(OUT, (p) => /scrollcraft\.js$/.test(p)), css = walk(OUT, (p) => /scrollcraft\.css$/.test(p));
  add(next(), js.length && css.length, `js: ${js.map(rel).join(", ") || "none"}; css: ${css.map(rel).join(", ") || "none"}`);
}
// 2 no-JS visibility
{
  const r = pageUrl ? await withPage({ javaScriptEnabled: false }, (p) => textProbe(p, false)) : [];
  const hidden = r.filter((x) => x.opacity < 0.9);
  add(next(), pageUrl && r.length && !hidden.length, pageUrl ? `${r.length} text elements checked with JS disabled; hidden: ${hidden.length}${hidden.length ? " e.g. " + hidden.slice(0, 4).map((h) => `"${h.text}" (opacity ${h.opacity})`).join("; ") : ""}` : "no page found");
}
// 3 reduced motion
{
  const r = pageUrl ? await withPage({ reducedMotion: "reduce" }, (p) => textProbe(p, true)) : [];
  const bad = r.filter((x) => x.opacity < 0.9 || x.transform);
  add(next(), pageUrl && r.length && !bad.length, pageUrl ? `${r.length} text elements scrolled into view under reduced motion; failing: ${bad.length}${bad.length ? " e.g. " + bad.slice(0, 4).map((h) => `"${h.text}" (opacity ${h.opacity}${h.transform ? ", " + h.transform : ""})`).join("; ") : ""}` : "no page found");
}
// 4 brief
{
  const briefs = walk(OUT, (p) => /BRIEF[^\\/]*\.md$/i.test(p));
  const txt = briefs.map((b) => fs.readFileSync(b, "utf8")).join("\n");
  add(next(), briefs.length && /curve/i.test(txt) && /peak/i.test(txt), briefs.length ? `${briefs.map(rel).join(", ")}; mentions curve: ${/curve/i.test(txt)}, peak: ${/peak/i.test(txt)}` : "no BRIEF*.md found");
}
// 5 device families
let acts = [];
{
  acts = pageUrl ? await withPage({}, (p) => p.evaluate(() => [...document.querySelectorAll("[data-sc-act]")].map((a) => a.getAttribute("data-sc-act") || "flow"))) : [];
  const distinct = new Set(acts);
  const adjacent = acts.some((a, k) => k > 0 && a === acts[k - 1]);
  add(next(), distinct.size >= 3 && !adjacent && acts.length > 0, `acts in order: [${acts.join(", ")}]; distinct: ${distinct.size}; adjacent repeat: ${adjacent}`);
}
// 6 scroll cue
{
  const src = isNext ? walk(path.join(OUT, "project/app"), (p) => /\.(tsx|jsx)$/.test(p)).map((f) => fs.readFileSync(f, "utf8")).join("\n") : rawHtml;
  const m = src.match(/scroll (to|down) (explore|discover|begin|start)|scroll-(cue|hint|indicator)|mouse-icon|↓|&darr;/i);
  add(next(), !m, m ? `found: "${m[0]}"` : "no scroll cue pattern found in markup");
}
// 7 screenshots
{
  const pngs = walk(OUT, (p) => /\.png$/i.test(p) && !/public[\\/]/.test(p));
  add(next(), pngs.length > 0, pngs.length ? `${pngs.length} PNG(s), e.g. ${pngs.slice(0, 3).map(rel).join(", ")}` : "no PNG screenshots found");
}
// 8 report
{
  const reps = walk(OUT, (p) => /REPORT\.md$/i.test(p));
  const txt = reps.map((r) => fs.readFileSync(r, "utf8")).join("\n");
  const rm = /reduced[- ]?motion/i.test(txt), nojs = /no[- ]?js|javascript (disabled|off|turned off)|without javascript|js disabled/i.test(txt), honest = /not (yet )?verified|could not|couldn't|unverified|did not (verify|check|test)|not covered|not tested|wasn't (verified|tested)|unable to/i.test(txt);
  add(next(), reps.length && rm && nojs && honest, reps.length ? `${reps.map(rel).join(", ")}; reduced-motion: ${rm}; no-JS: ${nojs}; states limits: ${honest}` : "no REPORT.md found");
}

// per-eval
if (EVAL === 0) {
  const cta = pageUrl ? await withPage({}, (p) => p.evaluate(() => [...document.querySelectorAll("a, button")].map((a) => a.textContent.trim()))) : [];
  add(next(), cta.includes("Start a subscription"), `CTA texts: ${JSON.stringify([...new Set(cta)].slice(0, 12))}`);
  const ext = rawHtml.match(/(src|href)=["']https?:\/\/[^"']*\.(jpe?g|png|webp|mp4|avif)/gi) || [];
  const unsplash = /unsplash|pexels|picsum/i.test(rawHtml);
  add(next(), !ext.length && !unsplash, ext.length || unsplash ? `external media: ${ext.slice(0, 3).join(", ")} unsplash/pexels: ${unsplash}` : "no external media URLs");
  const layers = pageUrl ? await withPage({}, (p) => p.evaluate(() => { const a = document.querySelector("[data-sc-act]"); if (!a) return []; return [...a.querySelectorAll("[data-sc-parallax]")].map((e) => e.getAttribute("data-sc-parallax")); })) : [];
  add(next(), new Set(acts).size >= 4 && new Set(layers).size >= 2, `distinct act families: ${new Set(acts).size}; parallax rates in first act: [${layers.join(", ")}]`);
}
if (EVAL === 1) {
  const proj = path.join(OUT, "project");
  const strings = ["A pour-over scale that remembers the cup you liked.", "Tilt weighs, times and logs every brew, then plays it back so the next one tastes the same.", "Reserve yours", "How it works", "Every dose, logged", "Recipes that travel", "Quiet by design", "Machined, not moulded.", "The body is a single block of anodised aluminium.", "0.1 g", "scale resolution", "18 h", "battery per charge", "3", "moving parts", "I stopped guessing. My Tuesday coffee tastes like my Saturday coffee now.", "Amara Osei, early tester", "First batch ships in March.", "Reserve for 20 euros, refundable any time before your Tilt ships.", "Tilt, Antwerp", "hello@tilt.example"];
  const body = pageUrl ? await withPage({}, (p) => p.evaluate(() => document.body.innerText)) : "";
  const nb = norm(body);
  const missing = strings.filter((s) => !nb.includes(norm(s)));
  const order = ["How it works", "Machined, not moulded.", "scale resolution", "I stopped guessing", "First batch ships in March."].map((s) => nb.indexOf(norm(s)));
  const ordered = order.every((v, k) => v >= 0 && (k === 0 || v > order[k - 1]));
  add(next(), !missing.length && ordered, `missing strings: ${missing.length ? JSON.stringify(missing.slice(0, 5)) : "none"}; order indices: [${order.join(", ")}]`);
  const layout = fs.existsSync(path.join(proj, "app/layout.tsx")) ? fs.readFileSync(path.join(proj, "app/layout.tsx"), "utf8") : "";
  add(next(), /sc-js/.test(layout) && /suppressHydrationWarning/.test(layout) && /<script/.test(layout), `layout.tsx has sc-js: ${/sc-js/.test(layout)}, inline script: ${/<script/.test(layout)}, suppressHydrationWarning: ${/suppressHydrationWarning/.test(layout)}`);
  const comps = walk(proj, (p) => /\.(tsx|ts|jsx|js)$/.test(p) && /ScrollCraft\.mount|window\.ScrollCraft/.test(fs.readFileSync(p, "utf8")));
  const src = comps.map((c) => fs.readFileSync(c, "utf8")).join("\n");
  add(next(), comps.length && /use client/.test(src) && /import\(/.test(src) && /destroy\(\)/.test(src), `mount component(s): ${comps.map(rel).join(", ") || "none"}; use client: ${/use client/.test(src)}; dynamic import(): ${/import\(/.test(src)}; destroy(): ${/destroy\(\)/.test(src)}`);
  const eng = walk(proj, (p) => /scrollcraft\.js$/.test(p));
  const ref = fs.readFileSync(path.join(SKILL, "engine/scrollcraft.js"), "utf8").replace(/\r\n/g, "\n");
  const same = eng.length && eng.every((e) => fs.readFileSync(e, "utf8").replace(/\r\n/g, "\n").replace(/^\/\/ @ts-nocheck\r?\n/, "") === ref);
  add(next(), same, eng.length ? `${eng.map(rel).join(", ")} identical to skill engine: ${same}` : "no engine copy found in project");
  const hero = pageUrl ? await withPage({}, (p) => p.evaluate(() => { const a = document.querySelector("[data-sc-act]"); if (!a) return { par: [], any: 0 }; return { par: [...a.querySelectorAll("[data-sc-parallax]")].map((e) => e.getAttribute("data-sc-parallax")), any: a.querySelectorAll("[data-sc-parallax],[data-sc-cue],[data-sc-kinetic],[data-sc-tilt],[data-sc-magnet],[data-sc-scrub],[data-sc-sequence]").length }; })) : { par: [], any: 0 };
  add(next(), new Set(hero.par).size >= 2, `first act parallax rates: [${hero.par.join(", ")}]; scroll-driven elements in first act: ${hero.any}`);
  const errs = pageUrl ? await withPage({}, async (p, errors) => { await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(1500); return errors; }) : ["dev server not reachable"];
  add(next(), pageUrl && !errs.length, errs.length ? `console errors (${errs.length}): ${errs.slice(0, 3).join(" | ")}` : "page loaded and scrolled with no console errors");
}
if (EVAL === 2) {
  const orig = fs.readFileSync(path.join(SKILL, "evals/files/agency-site/index.html"), "utf8");
  const texts = [...orig.matchAll(/<(h1|h2|h3|p)[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => norm(m[2].replace(/<[^>]+>/g, "")));
  const mod = norm(rawHtml.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " "));
  const missing = texts.filter((t) => t && !mod.includes(t));
  add(next(), rawHtml && !missing.length, `${texts.length} original text blocks; missing: ${missing.length ? JSON.stringify(missing.slice(0, 4)) : "none"}`);
  const ids = ["work", "process", "team", "contact"].map((id) => rawHtml.indexOf(`id="${id}"`));
  const ordered = ids.every((v, k) => v >= 0 && (k === 0 || v > ids[k - 1]));
  const nav = (rawHtml.match(/<nav>[\s\S]*?<\/nav>/) || [""])[0];
  const navOk = ["#work", "#process", "#team", "#contact"].every((h) => nav.includes(`href="${h}"`));
  const form = (rawHtml.match(/<form[\s\S]*?<\/form>/) || [""])[0];
  const formOk = /action="\/inquire"/.test(form) && /method="post"/.test(form) && ["name", "email", "brief"].every((n) => new RegExp(`name="${n}"`).test(form)) && /Start a project<\/button>/.test(form);
  add(next(), ordered && navOk && formOk, `section order ok: ${ordered} [${ids.join(", ")}]; nav ok: ${navOk}; form ok: ${formOk}`);
  const steps = ["01", "02", "03", "04"].every((n) => new RegExp(`<span class="n">${n}</span>`).test(rawHtml));
  add(next(), steps, `step number spans present: ${steps}`);
  const mob = pageUrl ? await withPage({ viewport: { width: 390, height: 844 } }, async (p) => { const sw = await p.evaluate(() => document.documentElement.scrollWidth); const r = await textProbe(p, true); return { sw, hidden: r.filter((x) => x.opacity < 0.9).length, n: r.length }; }) : { sw: 0, hidden: 1, n: 0 };
  add(next(), pageUrl && mob.sw <= 391 && !mob.hidden && mob.n > 0, `scrollWidth at 390: ${mob.sw}; hidden text after scroll-into-view: ${mob.hidden}/${mob.n}`);
}

await browser.close();
if (devProc) { try { execSync(`taskkill /PID ${devProc.pid} /T /F`, { stdio: "ignore" }); } catch {} }

const passed = results.filter((r) => r.passed).length;
const grading = { expectations: results, summary: { passed, failed: results.length - passed, total: results.length, pass_rate: results.length ? +(passed / results.length).toFixed(2) : 0 } };
fs.writeFileSync(path.join(RUN, "grading.json"), JSON.stringify(grading, null, 2));
console.log(`${path.basename(path.dirname(RUN))}/${path.basename(RUN)}: ${passed}/${results.length}`);
for (const r of results) console.log(` ${r.passed ? "PASS" : "FAIL"} ${r.text.slice(0, 70)}\n      ${r.evidence.slice(0, 160)}`);
if (A.length !== results.length) console.error(`WARNING: ${A.length} assertions but ${results.length} results`);
