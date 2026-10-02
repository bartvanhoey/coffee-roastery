import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/ProductGrid";
import { img, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Every Aurum coffee, capsule, cold brew and piece of barista equipment. One standard.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        size="short"
        eyebrow="Portfolio"
        title={
          <>
            Sixteen products.
            <br />
            <em>One standard.</em>
          </>
        }
        text="From the blend we have pulled since 1962 to a Geisha lot of which twelve bags exist. Filter by what you drink, or browse the whole cellar."
        video="/videos/texture.mp4"
        image={img("1447933601403-0c6688de566e", 1600)}
      />

      <section className="mx-auto max-w-7xl px-5 pb-32 pt-8 sm:px-8">
        <Suspense fallback={<div className="h-16" />}>
          <ProductGrid products={products} />
        </Suspense>
      </section>
    </>
  );
}
