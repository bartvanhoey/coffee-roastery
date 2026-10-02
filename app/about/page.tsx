import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VideoBackground from "@/components/VideoBackground";
import { img } from "@/lib/products";
import { team, timeline, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "From a fish cart on Trieste's waterfront in 1962 to 41 salones worldwide. The story of Aurum Coffee Roasters.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Sixty-three years,
            <br />
            <em>one obsession.</em>
          </>
        }
        text="It started with six kilos a day and a converted fish cart. It has never really been about anything other than the cup."
        video="/videos/steam.mp4"
        image={img("1522992319-0365e5f11656", 1600)}
      />

      {/* Founder story */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={img("1442512595331-e89e73853f31", 1400)}
              alt="A barista pouring water over a Chemex in the Trieste salone"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="1962, Molo Audace"
              title={
                <>
                  A cart, a drum,
                  <br />
                  and a <em>stubborn</em> man
                </>
              }
            />
            <Reveal delay={150} className="mt-10 space-y-6 text-lg leading-relaxed text-sand/85">
              <p>
                Elio Ferrante was a ship&apos;s cook who came home to Trieste
                with a sack of Brazilian coffee and an opinion: everything the
                city was drinking was roasted too far. He bought a second-hand
                drum, parked a fish cart on the Molo Audace, and started
                selling espresso to dockworkers at dawn.
              </p>
              <p>
                Within a year the queue reached the Piazza. Within sixteen, the
                first salone opened on Via San Nicolò. The marble counter he
                installed is the one we still lean on today.
              </p>
              <p>
                Three generations later, the company is still owned by the
                family, still roasts in Trieste, and still refuses to roast a
                bean darker than it deserves.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-cream/10 bg-espresso py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Timeline"
            title={
              <>
                Slow, <em>deliberate</em> growth
              </>
            }
            align="center"
          />
          <ol className="relative mt-20 space-y-0 border-l border-cream/15 lg:mx-auto lg:max-w-4xl lg:border-l-0">
            {timeline.map((t, i) => (
              <Reveal
                as="li"
                key={t.year}
                delay={80}
                className={`relative grid gap-4 py-10 pl-10 lg:grid-cols-2 lg:gap-16 lg:pl-0 ${
                  i !== timeline.length - 1 ? "border-b border-cream/10" : ""
                }`}
              >
                <span className="absolute -left-[5px] top-[3.1rem] h-2.5 w-2.5 rounded-full bg-gold lg:hidden" />
                <p
                  className={`display text-6xl text-gold ${
                    i % 2 ? "lg:order-2 lg:text-left" : "lg:text-right"
                  }`}
                >
                  {t.year}
                </p>
                <div className={i % 2 ? "lg:order-1 lg:text-right" : ""}>
                  <h3 className="font-serif text-3xl text-cream">{t.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-sand/80">
                    {t.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Values with video */}
      <section className="relative overflow-hidden py-28 sm:py-40">
        <VideoBackground
          src="/videos/pourover.mp4"
          poster={img("1442512595331-e89e73853f31", 1600)}
          rate={0.75}
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What we believe"
            title={
              <>
                Four rules we have
                <br />
                <em>never broken</em>
              </>
            }
          />
          <ul className="mt-16 grid gap-px bg-cream/15 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={i * 100}
                className="bg-ink/80 p-8 backdrop-blur-sm sm:p-12"
              >
                <p className="display text-2xl text-gold">0{i + 1}</p>
                <h3 className="mt-6 font-serif text-3xl text-cream">
                  {v.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-sand/85">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The people"
            title={
              <>
                Led by <em>palates</em>, not spreadsheets
              </>
            }
          />
          <Reveal delay={150}>
            <Button href="/contact" variant="ghost">
              Work with us
            </Button>
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 90} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-roast">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale transition-all duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-cream">{m.name}</h3>
              <p className="mt-1 text-xs tracking-[0.18em] uppercase text-muted">
                {m.role}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
