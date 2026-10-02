import Link from "next/link";
import { ScrollCraft } from "@/components/scroll-craft";
import { TiltDial } from "@/components/tilt-dial";
import { HeroVerify } from "@/components/hero-verify";

const features = [
  { title: "Every dose, logged", body: "Tilt tracks each pour on the built-in scale and knows the bag, the grind and the water before you do." },
  { title: "Recipes that travel", body: "Share a brew as a link. Anyone with a Tilt gets the same cup, gram for gram, second for second." },
  { title: "Quiet by design", body: "A single dial, no app required. The screen sleeps when you do." },
];

// The counters tick from `from` to the real figure once, on entry. The scale
// resolution settles downward, the way a reading settles; the others rise.
const stats = [
  { value: "0.1", from: "2.0", unit: " g", label: "scale resolution" },
  { value: "18", from: "0", unit: " h", label: "battery per charge" },
  { value: "3", from: "0", unit: "", label: "moving parts" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-stone-50/90 px-6 py-4 backdrop-blur">
        <span className="flex items-center gap-2.5">
          <TiltDial chapters={6} />
          <span className="font-semibold tracking-tight">Tilt</span>
        </span>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="#how" className="nav-link">How it works</Link>
          <Link href="#specs" className="nav-link">Specs</Link>
          <Link href="#order" className="cta rounded-full bg-stone-900 px-4 py-2 text-stone-50">Reserve yours</Link>
        </nav>
      </header>

      <ScrollCraft>
        <main>
          {/* 1 · Desire. A pinned stage; planes at different rates, copy at 1x. */}
          <section className="hero-act" data-sc-act="pin" data-sc-span="1.7" data-tilt-chapter="">
            <div className="hero-stage" data-sc-stage="" data-hero-stage="">
              <HeroVerify />
              <div className="hero-plane hero-far" data-sc-parallax="-0.3" data-hero-plane="far" aria-hidden="true" />
              <div className="hero-plane hero-haze" data-sc-parallax="0.3" data-hero-plane="haze" aria-hidden="true" />

              <div className="hero-grid mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
                <div>
                  <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
                    A pour-over scale that remembers the cup you liked.
                  </h1>
                  <p className="mt-6 max-w-md text-lg text-stone-600 text-pretty">
                    Tilt weighs, times and logs every brew, then plays it back so the next one tastes the same.
                  </p>
                  <Link href="#order" className="cta mt-8 inline-block rounded-full bg-stone-900 px-6 py-3 text-stone-50">Reserve yours</Link>
                </div>

                <div className="hero-subject">
                  <div data-sc-parallax="-0.8" data-hero-plane="product">
                    <div className="hero-product ph--raised aspect-[4/5] rounded-3xl bg-stone-200" data-sc-tilt="4" aria-hidden="true" />
                  </div>
                  <div className="hero-near" data-sc-parallax="-1.6" data-hero-plane="near" aria-hidden="true">
                    <div className="ph--raised rounded-2xl bg-stone-300" />
                  </div>
                </div>
              </div>

              <div className="hero-floor" aria-hidden="true" />
            </div>
          </section>

          {/* 2 · Clarity. Ordinary section, settled entrance. */}
          <section id="how" className="mx-auto max-w-6xl px-6 py-24" data-sc-act="flow" data-tilt-chapter="">
            <h2 className="text-3xl font-semibold tracking-tight" data-sc-in="">How it works</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3" data-sc-in="" data-sc-stagger="80">
              {features.map((f, i) => (
                <li key={f.title} className="step rounded-2xl border border-stone-200 bg-white p-6">
                  <span className="text-sm text-stone-500">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-stone-600">{f.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 3 · Weight. The peak: hard cut to dark, the outline is already
              there, the material fills it under the reader's hand. */}
          <section className="machined-act ground-dark bg-stone-900 text-stone-50" data-sc-act="pin" data-sc-span="2.4" data-tilt-chapter="">
            <div className="machined-stage px-6 py-24" data-sc-stage="">
              <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center">
                <figure className="machined-frame aspect-video rounded-3xl" aria-hidden="true">
                  <div className="machined-fill rounded-3xl bg-stone-700" data-sc-reveal="left" data-sc-reveal-at="0.05 0.82" />
                </figure>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight" data-sc-cue="0 1 0 0.1">Machined, not moulded.</h2>
                  <p className="mt-4 text-stone-300 text-pretty" data-sc-cue="0.5 1 0.3 0.1">
                    The body is a single block of anodised aluminium. The platform is glass. The dial is the only thing that turns, and it turns for years.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4 · Confidence. The figures land once, on entry. */}
          <section id="specs" className="mx-auto max-w-6xl px-6 py-24" data-tilt-chapter="">
            <ul className="grid gap-8 text-center md:grid-cols-3" data-sc-in="" data-sc-stagger="90">
              {stats.map((s) => (
                <li key={s.label}>
                  <strong className="block text-5xl font-semibold tracking-tight">
                    <span data-sc-count={`${s.from} ${s.value}`} data-sc-count-ms="1500">{s.value}</span>{s.unit}
                  </strong>
                  <span className="text-stone-500">{s.label}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5 · Intimacy. One voice, one line at a time. */}
          <section className="mx-auto max-w-3xl px-6 py-24" data-sc-act="flow" data-tilt-chapter="">
            <blockquote className="text-2xl leading-snug text-pretty" data-sc-cue="0.18" data-sc-kinetic="lines">
              “I stopped guessing. My Tuesday coffee tastes like my Saturday coffee now.”
            </blockquote>
            <p className="mt-4 text-stone-500" data-sc-cue="0.3">Amara Osei, early tester</p>
          </section>

          {/* 6 · Resolve. The close holds; the dial locks. */}
          <section id="order" className="ground-dark bg-stone-900 px-6 py-24 text-center text-stone-50" data-sc-act="flow" data-tilt-chapter="">
            <div data-sc-in="" data-sc-stagger="70">
              <h2 className="text-4xl font-semibold tracking-tight text-balance">First batch ships in March.</h2>
              <p className="mx-auto mt-4 max-w-md text-stone-300 text-pretty">Reserve for 20 euros, refundable any time before your Tilt ships.</p>
              <div className="mt-8">
                <Link href="/reserve" className="cta inline-block rounded-full bg-stone-50 px-6 py-3 text-stone-900">Reserve yours</Link>
              </div>
            </div>
          </section>
        </main>
      </ScrollCraft>

      <footer className="flex justify-between px-6 py-8 text-sm text-stone-500">
        <span>Tilt, Antwerp</span>
        <span>hello@tilt.example</span>
      </footer>
    </div>
  );
}
