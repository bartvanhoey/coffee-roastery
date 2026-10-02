import Link from "next/link";

const features = [
  { title: "Every dose, logged", body: "Tilt tracks each pour on the built-in scale and knows the bag, the grind and the water before you do." },
  { title: "Recipes that travel", body: "Share a brew as a link. Anyone with a Tilt gets the same cup, gram for gram, second for second." },
  { title: "Quiet by design", body: "A single dial, no app required. The screen sleeps when you do." },
];

const stats = [
  { value: "0.1 g", label: "scale resolution" },
  { value: "18 h", label: "battery per charge" },
  { value: "3", label: "moving parts" },
];

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
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              A pour-over scale that remembers the cup you liked.
            </h1>
            <p className="mt-6 max-w-md text-lg text-stone-600">
              Tilt weighs, times and logs every brew, then plays it back so the next one tastes the same.
            </p>
            <Link href="#order" className="mt-8 inline-block rounded-full bg-stone-900 px-6 py-3 text-stone-50">Reserve yours</Link>
          </div>
          <div className="aspect-[4/5] rounded-3xl bg-stone-200" aria-hidden="true" />
        </section>

        <section id="how" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.title} className="rounded-2xl border border-stone-200 bg-white p-6">
                <span className="text-sm text-stone-500">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-stone-600">{f.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-stone-900 px-6 py-24 text-stone-50">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
            <div className="aspect-video rounded-3xl bg-stone-700" aria-hidden="true" />
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Machined, not moulded.</h2>
              <p className="mt-4 text-stone-300">
                The body is a single block of anodised aluminium. The platform is glass. The dial is the only thing that turns, and it turns for years.
              </p>
            </div>
          </div>
        </section>

        <section id="specs" className="mx-auto max-w-6xl px-6 py-24">
          <ul className="grid gap-8 text-center md:grid-cols-3">
            {stats.map((s) => (
              <li key={s.label}>
                <strong className="block text-5xl font-semibold tracking-tight">{s.value}</strong>
                <span className="text-stone-500">{s.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-24">
          <blockquote className="text-2xl leading-snug">
            “I stopped guessing. My Tuesday coffee tastes like my Saturday coffee now.”
          </blockquote>
          <p className="mt-4 text-stone-500">Amara Osei, early tester</p>
        </section>

        <section id="order" className="bg-stone-900 px-6 py-24 text-center text-stone-50">
          <h2 className="text-4xl font-semibold tracking-tight">First batch ships in March.</h2>
          <p className="mx-auto mt-4 max-w-md text-stone-300">Reserve for 20 euros, refundable any time before your Tilt ships.</p>
          <Link href="/reserve" className="mt-8 inline-block rounded-full bg-stone-50 px-6 py-3 text-stone-900">Reserve yours</Link>
        </section>
      </main>

      <footer className="flex justify-between px-6 py-8 text-sm text-stone-500">
        <span>Tilt, Antwerp</span>
        <span>hello@tilt.example</span>
      </footer>
    </div>
  );
}
