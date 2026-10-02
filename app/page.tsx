import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Marquee from "@/components/Marquee";
import Newsletter from "@/components/Newsletter";
import PourLine from "@/components/PourLine";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { ScrollCraft } from "@/components/scroll-craft";
import SectionHeading from "@/components/SectionHeading";
import VideoBackground from "@/components/VideoBackground";
import {
  categories,
  categorySlug,
  getFeatured,
  img,
  products,
} from "@/lib/products";
import { origins, site, stats } from "@/lib/site";

const categoryArt: Record<string, string> = {
  "Espresso Blends": img("1512568400610-62da28bc8a13", 1000),
  "Single Origins": img("1521302080334-4bebac2763a6", 1000),
  Capsules: img("1513530176992-0cf39c4cbed4", 1000),
  "Cold Brew": img("1517701604599-bb29b565090c", 1000),
  Equipment: img("1511920170033-f8396924c348", 1000),
};

export default function Home() {
  const featured = getFeatured();

  return (
    <ScrollCraft>
      <PourLine peakSelector="#founder-quote" />
      {/* ───────────── Hero: scrub-lite stage + parallax + kinetic headline ───────────── */}
      <section
        data-sc-act="scrub"
        data-sc-span="1.9"
        data-sc-dwell="0.3"
        className="relative"
      >
        <div data-sc-stage className="flex items-end overflow-hidden">
          <img
            className="sc-stage__poster absolute inset-0 h-full w-full object-cover"
            src={img("1610632380989-680fe40816c6", 1600)}
            alt=""
          />
          <video
            data-sc-scrub=""
            data-sc-src="/videos/hero.mp4"
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
          />
          <div
            className="absolute inset-0"
            style={{
              transform: "translateY(calc(var(--sc-p, 0) * -30px))",
            }}
          >
            <div className="scrim-b absolute inset-0" />
            <div className="scrim-t absolute inset-x-0 top-0 h-48" />
            {/* Extra density behind the eyebrow/copy column: the scrub clip
                paints brighter live frames here than the old static poster did. */}
            <div
              className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-3/5"
              style={{
                background:
                  "linear-gradient(to right, color-mix(in srgb, var(--ink) 88%, transparent) 0%, color-mix(in srgb, var(--ink) 82%, transparent) 30%, color-mix(in srgb, var(--ink) 55%, transparent) 55%, transparent 100%)",
              }}
            />
            {/* Extra density behind the bottom-right button row: the outline
                button has no fill of its own, so its label sits directly on
                whatever the clip shows there. */}
            <div
              className="absolute inset-x-0 bottom-0 h-56"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in srgb, var(--ink) 78%, transparent) 0%, transparent 100%)",
              }}
            />
          </div>

          <div
            className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 sm:pb-28"
            data-sc-parallax="0.3"
          >
            <p
              className="eyebrow inline-block"
              data-sc-cue="0 0.7 0"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
            >
              Roasted in {site.city} · Est. {site.founded}
            </p>
            <h1
              className="display mt-6 max-w-5xl text-6xl text-cream sm:text-8xl lg:text-[9.5rem]"
              data-sc-cue="0 0.7 0"
              data-sc-kinetic="lines"
            >
              Gold standard,
              <br />
              <em>cup after cup.</em>
            </h1>
            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <p
                className="max-w-md text-lg leading-relaxed text-cream"
                data-sc-cue="0 0.7 0"
                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
              >
                Sixty-three years, fourteen origins, one obsession. Coffee
                roasted for sweetness and served the way it deserves.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/products">Explore the portfolio</Button>
                <Button href="/roastery" variant="outline">
                  See how it&apos;s made
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Single origin",
          "Roasted weekly",
          "Direct trade since 1994",
          "Carbon neutral",
          "41 salones worldwide",
          "Est. 1962",
        ]}
      />

      {/* ───────────── Manifesto + stats ───────────── */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">The Aurum way</p>
            <p className="display mt-6 text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
              We don&apos;t roast for colour. We roast for the
              <em> sweetness</em> that was already in the bean when it left the
              tree.
            </p>
          </Reveal>
          <Reveal delay={150} className="flex flex-col justify-end">
            <p className="text-lg leading-relaxed text-sand/85">
              Everything else follows from that. Buying from farmers we know by
              name. Resting green coffee for a month before we touch it.
              Training baristas for six months before they pour a cup you pay
              for. It is slow, expensive, and the only way we know.
            </p>
            <Button href="/about" variant="ghost" className="mt-8">
              Our story
            </Button>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-px bg-cream/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 100}
              className="bg-ink px-6 py-10 sm:px-10"
            >
              <p className="display text-5xl text-gold sm:text-6xl">
                <span data-sc-count={`0 ${s.value}`}>0</span>
              </p>
              <p className="mt-3 text-xs tracking-[0.2em] uppercase text-muted">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── Featured ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The collection"
            title={
              <>
                Three cups that <em>define</em> us
              </>
            }
          />
          <Reveal delay={150}>
            <Button href="/products" variant="ghost">
              View all {products.length} products
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 120}
              className={i === 1 ? "md:translate-y-16" : ""}
            >
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── Craft split ───────────── */}
      <section className="relative overflow-hidden bg-espresso">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[820px]">
            <VideoBackground
              src="/videos/roaster.mp4"
              poster={img("1511537190424-bbbab87ac5eb", 1400)}
              rate={0.9}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/40" />
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold" />
                <span className="relative h-3 w-3 rounded-full bg-gold" />
              </span>
              <span className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/80">
                Roasting now · Porto Vecchio
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center px-5 py-20 sm:px-12 lg:px-20 lg:py-32">
            <SectionHeading
              eyebrow="The craft"
              title={
                <>
                  Eleven minutes of
                  <br />
                  <em>heat, and patience.</em>
                </>
              }
              text="Twelve kilos at a time, on drums older than most of our baristas. Every batch is profiled by ear, by nose, and by refractometer, and cupped the next morning before it is allowed to leave the building."
            />
            <Reveal delay={200} className="mt-12">
              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                {[
                  ["Green rest", "28 days in a climate-controlled cellar"],
                  ["Batch size", "12 kg, never more"],
                  ["Development", "Sweetness first, colour second"],
                  ["Quality control", "Cupped daily, released weekly"],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className="flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="text-xs tracking-[0.2em] uppercase text-gold">
                      {k}
                    </span>
                    <span className="text-right text-sm text-sand/85 sm:text-base">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
              <Button href="/roastery" variant="outline" className="mt-10">
                Inside the roastery
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── Founder's quote: the peak ───────────── */}
      <section
        id="founder-quote"
        data-sc-act="scrub"
        data-sc-span="3"
        data-sc-dwell="0.5"
        className="relative"
      >
        <div data-sc-stage className="flex items-center overflow-hidden">
          <img
            className="sc-stage__poster absolute inset-0 h-full w-full object-cover"
            src={img("1447933601403-0c6688de566e", 1600)}
            alt=""
          />
          <video
            data-sc-scrub=""
            data-sc-src="/videos/beans.mp4"
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="relative mx-auto max-w-5xl px-5 py-32 text-center sm:px-8">
            <div data-sc-cue="0 0.85 0">
              <p className="eyebrow">From the founder&apos;s notebook, 1962</p>
              <blockquote
                className="display mt-8 text-4xl text-cream sm:text-6xl lg:text-7xl"
                data-sc-kinetic="lines"
              >
                “A coffee should taste like the place it came from, and the
                person who made it. <em>Nothing else belongs in the cup.</em>”
              </blockquote>
              <p className="mt-8 text-sm tracking-[0.2em] uppercase text-sand/70">
                Elio Ferrante, founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Categories ───────────── */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading
          eyebrow="Portfolio"
          title={
            <>
              Five ways to <em>drink</em> Aurum
            </>
          }
          text="From the blend we have pulled since 1962 to a Geisha lot of which twelve bags exist. Every product, one standard."
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((c, i) => {
            const count = products.filter((p) => p.category === c).length;
            const span =
              i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <Reveal as="li" key={c} delay={i * 80} className={span}>
                <Link
                  href={`/products?category=${categorySlug(c)}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[3/2]"
                >
                  <Image
                    src={categoryArt[c]}
                    alt={c}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-gold">
                        {count} {count === 1 ? "product" : "products"}
                      </p>
                      <h3 className="display mt-2 text-3xl text-cream sm:text-4xl">
                        {c}
                      </h3>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ───────────── Origins rail ───────────── */}
      <section className="overflow-hidden border-y border-cream/10 bg-espresso py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Origins"
              title={
                <>
                  Fourteen countries.
                  <br />
                  <em>Thirty-eight families.</em>
                </>
              }
            />
            <Reveal delay={150}>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Every relationship is at least five years old. Most are older
                than our baristas. Scroll sideways to meet a few.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {origins.map((o, i) => (
            <Reveal
              key={o.country}
              delay={i * 70}
              className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-sm sm:w-[46vw] lg:w-[28rem]"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={o.image}
                  alt={`${o.country}, ${o.region}`}
                  fill
                  sizes="(min-width: 1024px) 28rem, 78vw"
                  className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs tracking-[0.2em] uppercase text-gold">
                    {o.region} · {o.altitude}
                  </p>
                  <h3 className="display mt-2 text-4xl text-cream">
                    {o.country}
                  </h3>
                  <p className="mt-2 text-sm text-sand/80">{o.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── Salones teaser ───────────── */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm lg:order-2">
            <VideoBackground
              src="/videos/latte.mp4"
              poster={img("1541167760496-1628856ab772", 1400)}
              rate={0.85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </Reveal>
          <div className="lg:order-1">
            <SectionHeading
              eyebrow="Salones"
              title={
                <>
                  Marble, brass,
                  <br />
                  and <em>no paper cups.</em>
                </>
              }
              text="Forty-one rooms in twelve cities, each one built around a single idea: a great coffee deserves ten quiet minutes and a porcelain cup. Come and sit down."
            />
            <Reveal delay={200} className="mt-10 flex flex-wrap gap-4">
              <Button href="/stores">Find a salone</Button>
              <Button href="/contact" variant="outline">
                Wholesale enquiries
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── Newsletter ───────────── */}
      <section className="relative overflow-hidden border-t border-cream/10">
        <Image
          src={img("1447933601403-0c6688de566e", 1600)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <p className="eyebrow">The Sunday letter</p>
            <h2 className="display mt-6 text-4xl text-cream sm:text-6xl">
              First access to <em>every</em> limited lot
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sand/85">
              One email a week from the roastery floor. No offers, no noise.
              Just what we are cupping, and what is about to sell out.
            </p>
            <div className="mx-auto max-w-md">
              <Newsletter />
            </div>
          </Reveal>
        </div>
      </section>
    </ScrollCraft>
  );
}
