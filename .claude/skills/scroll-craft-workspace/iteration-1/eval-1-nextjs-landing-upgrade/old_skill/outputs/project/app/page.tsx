import type { CSSProperties } from "react";
import Link from "next/link";
import PourLog from "@/components/PourLog";
import ScrollCraft from "@/components/ScrollCraft";

const features = [
  { title: "Every dose, logged", body: "Tilt tracks each pour on the built-in scale and knows the bag, the grind and the water before you do." },
  { title: "Recipes that travel", body: "Share a brew as a link. Anyone with a Tilt gets the same cup, gram for gram, second for second." },
  { title: "Quiet by design", body: "A single dial, no app required. The screen sleeps when you do." },
];

const stats = [
  { value: "0.1 g", num: "0.1", unit: "g", from: "0.0", label: "scale resolution" },
  { value: "18 h", num: "18", unit: "h", from: "0", label: "battery per charge" },
  { value: "3", num: "3", unit: "", from: "0", label: "moving parts" },
];

/* How far a plane leans with the pointer, in px at full deflection. */
const depth = (px: number) => ({ "--depth": px }) as CSSProperties;

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-stone-50/90 px-6 py-4 backdrop-blur">
        <span className="font-semibold tracking-tight">Tilt</span>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="#how">How it works</Link>
          <Link href="#specs">Specs</Link>
          <Link href="#order" className="rounded-full bg-stone-900 px-4 py-2 text-stone-50">Reserve yours</Link>
        </nav>
      </header>

      <main>
        {/* 1 · Attention: a layered scene, pinned. The display weighs the scroll. */}
        <section className="hero" data-sc-act="pin" data-sc-span="2.2" data-sc-dwell="0.25" aria-labelledby="hero-title">
          <div className="hero__stage" data-sc-stage>
            <div className="hero__grid">
              <div className="hero__copy">
                <h1 id="hero-title" className="hero__title">
                  A pour-over scale that remembers the cup you liked.
                </h1>
                <p className="mt-6 max-w-md text-lg text-stone-600">
                  Tilt weighs, times and logs every brew, then plays it back so the next one tastes the same.
                </p>
                <Link href="#order" className="mt-8 inline-block rounded-full bg-stone-900 px-6 py-3 text-stone-50">Reserve yours</Link>
              </div>

              <div className="scene" data-pointer-depth aria-hidden="true">
                <div className="plane plane--far" data-sc-parallax="-0.35">
                  <div className="plane__in" style={depth(5)}>
                    <div className="light" />
                    <div className="wall" />
                  </div>
                </div>
                <div className="plane plane--product" data-sc-parallax="-0.7">
                  <div className="plane__in" style={depth(10)}>
                    <div className="product" />
                  </div>
                </div>
                <div className="plane plane--stream" data-sc-parallax="-1">
                  <div className="plane__in" style={depth(14)}>
                    <div className="stream" />
                  </div>
                </div>
                <div className="plane plane--readout" data-sc-parallax="-1.3">
                  <div className="plane__in" style={depth(18)}>
                    <PourLog id="hero" className="pour--hero" />
                  </div>
                </div>
                <div className="plane plane--steam" data-sc-parallax="-1.7">
                  <div className="plane__in" style={depth(24)}>
                    <div className="steam" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 · Clarity: a manual, read in flow. One hairline draws down the steps. */}
        <section id="how" className="how mx-auto max-w-6xl scroll-mt-20 px-6 pt-16 pb-24 md:pt-24 md:pb-32" data-sc-act="flow">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl" data-sc-in>How it works</h2>
            <div className="how__steps">
              <span className="how__line" aria-hidden="true" data-sc-reveal="up" data-sc-reveal-at="0.16 0.72" />
              <ol data-sc-in data-sc-stagger="110">
                {features.map((f, i) => (
                  <li key={f.title} className="how__step">
                    <span className="how__num text-sm text-stone-500 tabular-nums">0{i + 1}</span>
                    <h3 className="text-xl font-medium tracking-tight md:text-2xl">{f.title}</h3>
                    <p className="mt-2 max-w-md text-stone-600">{f.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 3 · Weight: the plate. The object is already there; the words assemble. */}
        <section className="machined plate" data-sc-act="pin" data-sc-span="1.9" data-sc-dwell="0.2" aria-labelledby="machined-title">
          <div className="machined__stage" data-sc-stage>
            <div className="machined__grid">
              <div className="machined__figure aspect-video rounded-3xl bg-stone-700" aria-hidden="true" data-sc-parallax="-0.4" />
              <div>
                <h2 id="machined-title" className="text-3xl font-medium tracking-tight md:text-5xl" data-sc-cue="0.02 0.96 0.24 0.1" data-sc-kinetic="lines">
                  Machined, not moulded.
                </h2>
                <p className="mt-6 max-w-md text-lg text-stone-300" data-sc-cue="0.16 0.96 0.28 0.1">
                  The body is a single block of anodised aluminium. The platform is glass. The dial is the only thing that turns, and it turns for years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · Confidence: the figures tick to their values and stop. */}
        <section id="specs" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 md:py-32" data-sc-act="flow">
          <ul className="grid gap-10 text-center md:grid-cols-3" data-sc-in data-sc-stagger="90">
            {stats.map((s) => (
              <li key={s.label}>
                <strong className="block text-5xl font-medium tracking-tight tabular-nums md:text-6xl">
                  <span data-sc-count={`${s.from} ${s.num}`} data-sc-count-ms="1500">{s.num}</span>
                  {s.unit ? ` ${s.unit}` : ""}
                </strong>
                <span className="mt-3 block text-stone-500">{s.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5 · Intimacy: one voice on the empty bench. */}
        <section className="mx-auto max-w-3xl px-6 py-24 md:py-32" data-sc-act="flow">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight md:text-4xl" data-sc-cue="0.26" data-sc-kinetic="lines">
            “I stopped guessing. My Tuesday coffee tastes like my Saturday coffee now.”
          </blockquote>
          <p className="mt-6 text-stone-500" data-sc-cue="0.34">Amara Osei, early tester</p>
        </section>

        {/* 6 · Resolve: the plate plays the pour back and holds. */}
        <section id="order" className="close plate scroll-mt-20" data-sc-act="pin" data-sc-span="1.5" aria-labelledby="order-title">
          <div className="close__stage" data-sc-stage>
            <div className="close__inner px-6 text-center">
              <PourLog id="close" className="pour--close" />
              <h2 id="order-title" className="text-4xl font-medium tracking-tight md:text-5xl" data-sc-cue="0 1 0 0">First batch ships in March.</h2>
              <p className="mx-auto mt-4 max-w-md text-stone-300" data-sc-cue="0 1 0 0">Reserve for 20 euros, refundable any time before your Tilt ships.</p>
              <Link
                href="/reserve"
                className="mt-8 inline-block rounded-full bg-stone-50 px-6 py-3 text-stone-900"
                data-sc-cue="0 1 0 0"
                data-sc-rise="0"
                data-sc-magnet="0.24"
              >
                Reserve yours
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="plate flex justify-between px-6 py-8 text-sm text-stone-400">
        <span>Tilt, Antwerp</span>
        <span>hello@tilt.example</span>
      </footer>

      <ScrollCraft />
    </div>
  );
}
