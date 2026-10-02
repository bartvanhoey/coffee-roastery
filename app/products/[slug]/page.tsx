import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  categorySlug,
  formatPrice,
  getProduct,
  getRelated,
  products,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: `${product.tagline}. ${product.description}`,
  };
}

export default async function ProductPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const isCoffee = product.roast !== "N/A";

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-28 pt-28 sm:px-8 sm:pt-36">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex flex-wrap items-center gap-3 text-xs tracking-[0.18em] uppercase text-muted"
        >
          <Link href="/products" className="transition-colors hover:text-gold">
            Portfolio
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/products?category=${categorySlug(product.category)}`}
            className="transition-colors hover:text-gold"
          >
            {product.category}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-cream">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-roast lg:sticky lg:top-28 lg:self-start">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="animate-scale-in object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            <div className="absolute left-5 top-5 flex gap-2">
              {product.limited && <Pill>Limited</Pill>}
              {product.isNew && <Pill>New</Pill>}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="animate-fade-up">
              <p className="eyebrow">{product.category}</p>
              <h1 className="display mt-5 text-5xl text-cream sm:text-6xl lg:text-7xl">
                {product.name}
              </h1>
              <p className="mt-4 font-serif text-2xl italic text-gold-soft">
                {product.tagline}
              </p>
            </div>

            <div
              className="mt-10 flex items-baseline gap-3 animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <p className="display text-4xl text-cream">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm text-muted">/ {product.unit}</p>
            </div>

            <div
              className="mt-8 flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <a
                href="#notify"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.72rem] font-medium tracking-[0.22em] uppercase text-ink transition-colors hover:bg-gold-soft"
              >
                Add to bag
              </a>
              <Button href="/stores" variant="outline">
                Taste it in a salone
              </Button>
            </div>

            <p
              className="mt-12 text-lg leading-relaxed text-sand/90 animate-fade-up"
              style={{ animationDelay: "280ms" }}
            >
              {product.description}
            </p>

            <dl
              className="mt-12 grid grid-cols-2 border-l border-t border-cream/10 animate-fade-up"
              style={{ animationDelay: "360ms" }}
            >
              <Spec label="Origin" value={product.origin} />
              {product.altitude && (
                <Spec label="Altitude" value={product.altitude} />
              )}
              {product.process && (
                <Spec label="Process" value={product.process} />
              )}
              {isCoffee && <Spec label="Roast" value={product.roast} />}
              <Spec label="Format" value={product.unit} />
            </dl>

            <div
              className="mt-12 animate-fade-up"
              style={{ animationDelay: "440ms" }}
            >
              <p className="eyebrow">
                {isCoffee ? "Tasting notes" : "Highlights"}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.notes.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/90"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            {isCoffee && (
              <div
                className="mt-12 animate-fade-up"
                style={{ animationDelay: "520ms" }}
              >
                <div className="flex items-baseline justify-between">
                  <p className="eyebrow">Intensity</p>
                  <p className="font-serif text-2xl text-cream">
                    {product.intensity}
                    <span className="text-muted">/10</span>
                  </p>
                </div>
                <div
                  className="mt-4 flex gap-1.5"
                  role="img"
                  aria-label={`Intensity ${product.intensity} of 10`}
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < product.intensity ? "bg-gold" : "bg-cream/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div
              id="notify"
              className="mt-14 rounded-sm border border-cream/10 bg-espresso p-6 text-sm text-muted animate-fade-up"
              style={{ animationDelay: "600ms" }}
            >
              Online ordering opens with our new cellar this autumn. Until
              then, every product is available in all 41 salones and through
              our{" "}
              <Link href="/contact" className="text-gold hover:text-cream">
                wholesale team
              </Link>
              .
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-cream/10 bg-espresso">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display text-4xl text-cream sm:text-5xl">
              You may also <em>like</em>
            </h2>
            <Button href="/products" variant="ghost">
              Full portfolio
            </Button>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-r border-cream/10 bg-ink px-5 py-5">
      <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm text-cream">{value}</dd>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-gold/60 bg-ink/50 px-3 py-1 text-[0.62rem] tracking-[0.2em] uppercase text-gold backdrop-blur">
      {children}
    </span>
  );
}
