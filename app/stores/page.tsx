import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { img } from "@/lib/products";
import { stores } from "@/lib/site";

export const metadata: Metadata = {
  title: "Salones",
  description:
    "Forty-one Aurum salones in twelve cities. Marble counters, brass lamps, porcelain cups. Find yours.",
};

export default function StoresPage() {
  const cities = Array.from(new Set(stores.map((s) => s.city)));

  return (
    <>
      <PageHero
        eyebrow="Salones"
        title={
          <>
            Forty-one rooms.
            <br />
            <em>One counter.</em>
          </>
        }
        text="Every salone is built around the same marble counter Elio installed in 1978. Find the one nearest to you, and take ten minutes."
        video="/videos/espresso.mp4"
        image={img("1453614512568-c4024d13c247", 1600)}
      />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Where to find us"
            title={
              <>
                Twelve cities, <em>two</em> roasteries
              </>
            }
          />
          <Reveal delay={150}>
            <ul className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-cream/20 px-4 py-2 text-xs tracking-[0.18em] uppercase text-cream/80"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((s, i) => (
            <Reveal
              as="li"
              key={s.name}
              delay={(i % 3) * 90}
              className={`group ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
            >
              <div
                className={`relative overflow-hidden rounded-sm bg-roast ${
                  i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                {s.flagship && (
                  <span className="absolute left-5 top-5 rounded-full border border-gold/60 bg-ink/50 px-3 py-1 text-[0.62rem] tracking-[0.2em] uppercase text-gold backdrop-blur">
                    Roastery
                  </span>
                )}
                <p className="absolute bottom-5 left-5 text-xs tracking-[0.2em] uppercase text-sand/80">
                  {s.city}
                </p>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl text-cream">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted">{s.address}</p>
                </div>
                <p className="shrink-0 text-right text-xs text-muted">
                  <span className="block tracking-[0.15em] uppercase">Daily</span>
                  <span className="text-sand">{s.hours}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-cream/10 bg-espresso">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={img("1495474472287-4d71bcdd2085", 1400)}
              alt="Three friends raising their coffee cups"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Serve Aurum"
              title={
                <>
                  Bring the counter
                  <br />
                  to <em>your</em> room
                </>
              }
              text="We supply 340 restaurants, hotels and independent cafés with the same coffee, training and equipment as our own salones. Wholesale partners get a dedicated roaster and a barista on call."
            />
            <Reveal delay={150} className="mt-10">
              <Button href="/contact">Talk to wholesale</Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
