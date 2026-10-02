/**
 * The pour log: one pour-over brew, as a function of progress 0..1.
 *
 * Shared by the server (to render the finished trace into the markup, so the
 * display is complete without JavaScript) and the client (to scrub it from the
 * act's scroll progress). Not a statistic about the product; it is the shape
 * of a 20 g / 320 g pour-over: bloom, rest, two pours, drawdown.
 */

export const POUR_TOTAL_S = 210; // 3:30
export const POUR_TARGET_G = 320;

type Phase = { end: number; grams: number; pouring: boolean };

const PHASES: Phase[] = [
  { end: 10, grams: 50, pouring: true }, // bloom
  { end: 40, grams: 50, pouring: false }, // rest
  { end: 85, grams: 190, pouring: true }, // first pour
  { end: 110, grams: 190, pouring: false }, // rest
  { end: 150, grams: 320, pouring: true }, // second pour
  { end: 210, grams: 320, pouring: false }, // drawdown
];

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x: number) => {
  x = clamp01(x);
  return x * x * (3 - 2 * x);
};

export function pourAt(p: number): { t: number; g: number; pouring: boolean } {
  const t = clamp01(p) * POUR_TOTAL_S;
  let t0 = 0;
  let g0 = 0;
  for (const ph of PHASES) {
    if (t <= ph.end) {
      const f = (t - t0) / (ph.end - t0);
      const g = ph.pouring ? g0 + (ph.grams - g0) * smooth(f) : ph.grams;
      return { t, g, pouring: ph.pouring && f < 1 };
    }
    t0 = ph.end;
    g0 = ph.grams;
  }
  return { t: POUR_TOTAL_S, g: POUR_TARGET_G, pouring: false };
}

export const fmtGrams = (g: number) => g.toFixed(1);

export const fmtTime = (t: number) => {
  const s = Math.round(t);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/** Grams over time as an SVG path, in a w x h box. */
export function tracePath(w: number, h: number, steps = 96): string {
  const pad = 1.5;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const p = i / steps;
    const { g } = pourAt(p);
    const x = pad + (w - 2 * pad) * p;
    const y = h - pad - (h - 2 * pad) * (g / POUR_TARGET_G);
    d += `${i ? " L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}
