#!/usr/bin/env node
/**
 * Contact sheet without ffmpeg. shoot.mjs tiles its frames with ffmpeg, which
 * is not installed on this machine, so this tiles the same NN.png frames with
 * sharp from the project's node_modules and labels each with its index.
 *
 *   node scrollcraft/lab/sheet.mjs <dir> [cols] [tileWidth]
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const sharp = createRequire(path.join(process.cwd(), "package.json"))("sharp");

const dir = path.resolve(process.argv[2] || "scrollcraft/lab/shots");
const cols = parseInt(process.argv[3] || "5", 10);
const tileW = parseInt(process.argv[4] || "400", 10);
const gap = 10;

const files = fs.readdirSync(dir).filter((f) => /^\d+\.png$/.test(f)).sort();
if (!files.length) {
  console.error(`no NN.png frames in ${dir}`);
  process.exit(1);
}
const meta = await sharp(path.join(dir, files[0])).metadata();
const tileH = Math.round((meta.height * tileW) / meta.width);
const rows = Math.ceil(files.length / cols);

const composites = [];
for (let i = 0; i < files.length; i++) {
  const left = gap + (i % cols) * (tileW + gap);
  const top = gap + Math.floor(i / cols) * (tileH + gap);
  composites.push({ input: await sharp(path.join(dir, files[i])).resize(tileW, tileH).toBuffer(), left, top });
  const label = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="22"><rect width="44" height="22" rx="4" fill="#111"/><text x="22" y="15" font-family="monospace" font-size="13" fill="#fff" text-anchor="middle">${files[i].replace(".png", "")}</text></svg>`,
  );
  composites.push({ input: label, left: left + 6, top: top + 6 });
}

const out = path.join(dir, "sheet.png");
await sharp({
  create: { width: gap + cols * (tileW + gap), height: gap + rows * (tileH + gap), channels: 3, background: "#2a2a2a" },
})
  .composite(composites)
  .png()
  .toFile(out);
console.log(`contact sheet: ${out}  (${files.length} frames, ${cols} per row)`);
