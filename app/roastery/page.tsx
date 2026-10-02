import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VideoBackground from "@/components/VideoBackground";
import { img } from "@/lib/products";
import { craftSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Craft",
  description:
    "Inside the Aurum roastery: sourcing, roasting, grinding, extraction and service, step by step.",
};

const numbers = [
  { value: "28", unit: "days", label: "Green coffee rest before roasting" },
  { value: "11", unit: "min", label: "Average roast profile" },
  { value: "93", unit: "°C", label: "Brew temperature, every salone" },
  { value: "6", unit: "months", label: "Barista training before service" },
];

export default function RoasteryPage() {
  return (
    <>
      <PageHero
        eyebrow="The craft"
        title={
          <>
            From cherry
            <br />
            to <em>crema.</em>
          </>
        }
        text="Five steps, sixty years of refinement, and a recipe that takes half a minute to pour. This is how an Aurum coffee is made."
        video="/videos/machine.mp4"
        image={img("1511920170033-f8396924c348", 1600)}
      >
        <Button href="#steps" variant="outline">
          Follow the process
        </Button>
      </PageHero>

      {/* Key numbers */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid grid-cols-2 gap-px bg-cream/10 lg:grid-cols-4">
          {numbers.map((n, i) => (
            <Reveal
              key={n.label}
              delay={i * 90}
              className="bg-ink px-6 py-10 sm:px-10"
            >
              <p className="display text-5xl text-gold sm:text-6xl">
                {n.value}
                <span className="ml-1 text-2xl text-sand">{n.unit}</span>
              </p>
              <p className="mt-3 text-xs leading-relaxed tracking-[0.15em] uppercase text-muted">
                {n.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="scroll-mt-20">
        {craftSteps.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={s.n}
              className={`border-t border-cream/10 ${
                i % 2 ? "bg-espresso" : "bg-ink"
              }`}
            >
              <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
                <Reveal
                  className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[720px] ${
                    flip ? "lg:order-2" : ""
                  }`}
                >
                  <VideoBackground src={s.video} poster={s.poster} rate={0.85} />
                  <div
                    className={`absolute inset-0 from-transparent to-ink/30 ${
                      flip ? "bg-gradient-to-l" : "bg-gradient-to-r"
                    }`}
                  />
                  <p className="display absolute left-6 top-6 text-7xl text-cream/90 sm:left-10 sm:top-10 sm:text-9xl">
                    {s.n}
                  </p>
                </Reveal>
                <div
                  className={`flex flex-col justify-center px-5 py-20 sm:px-12 lg:px-20 lg:py-28 ${
                    flip ? "lg:order-1" : ""
                  }`}
                >
                  <Reveal delay={120}>
                    <p className="eyebrow">Step {s.n}</p>
                    <h2 className="display mt-5 text-5xl text-cream sm:text-7xl">
                      {s.title}
                    </h2>
                    <p className="mt-8 max-w-md text-lg leading-relaxed text-sand/85">
                      {s.text}
                    </p>
                    <p className="mt-8 inline-block border-l border-gold pl-4 text-sm tracking-[0.15em] uppercase text-gold">
                      {s.detail}
                    </p>
                  </Reveal>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden border-t border-cream/10 py-32 sm:py-44">
        <VideoBackground
          src="/videos/tamping.mp4"
          poster={img("1497935586351-b67a49e012bf", 1600)}
          rate={0.7}
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Roasting philosophy"
            title={
              <>
                Bitterness is a <em>failure</em>, not a style
              </>
            }
            text="Every profile is designed to protect the sugars the farmer spent a year developing. If a coffee needs milk to be drinkable, we roasted it wrong. We would rather throw a batch away than sell it."
          />
          <Reveal delay={200} className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/products">Taste the result</Button>
            <Button href="/about" variant="outline">
              Why we work this way
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
