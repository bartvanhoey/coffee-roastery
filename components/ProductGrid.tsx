"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  categories,
  categoryFromSlug,
  categorySlug,
  type Category,
  type Product,
} from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

type Sort = "featured" | "price-asc" | "price-desc" | "intensity";

const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "intensity", label: "Intensity" },
];

export default function ProductGrid({ products }: { products: Product[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const active = categoryFromSlug(params.get("category")) ?? null;
  const [sort, setSort] = useState<Sort>("featured");

  const setCategory = (c: Category | null) => {
    router.replace(c ? `/products?category=${categorySlug(c)}` : "/products", {
      scroll: false,
    });
  };

  const list = useMemo(() => {
    const filtered = active
      ? products.filter((p) => p.category === active)
      : products;
    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "intensity":
        sorted.sort((a, b) => b.intensity - a.intensity);
        break;
      default:
        sorted.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        );
    }
    return sorted;
  }, [products, active, sort]);

  return (
    <div>
      <div className="sticky top-18 z-30 -mx-5 border-y border-cream/10 bg-ink/85 px-5 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1"
            role="tablist"
            aria-label="Filter by category"
          >
            <FilterChip
              active={active === null}
              onClick={() => setCategory(null)}
            >
              All
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c}
                active={active === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </FilterChip>
            ))}
          </div>

          <div className="flex items-center justify-between gap-6 text-sm lg:justify-end">
            <p className="text-muted">
              {list.length} {list.length === 1 ? "product" : "products"}
            </p>
            <label className="flex items-center gap-3 text-muted">
              <span className="sr-only lg:not-sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="cursor-pointer appearance-none rounded-full border border-cream/20 bg-transparent py-2 pl-4 pr-9 text-sm text-cream focus:border-gold focus:outline-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23c9a45c' stroke-width='1.2'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.9rem center",
                }}
              >
                {sorts.map((s) => (
                  <option key={s.value} value={s.value} className="bg-ink">
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <ul
        key={`${active ?? "all"}-${sort}`}
        className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {list.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 3) * 90}>
            <ProductCard product={p} priority={i < 3} />
          </Reveal>
        ))}
      </ul>

      {list.length === 0 && (
        <p className="py-24 text-center text-muted">
          Nothing here yet. Try another category.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-[0.7rem] tracking-[0.18em] uppercase transition-all duration-300 ${
        active
          ? "bg-gold text-ink"
          : "text-cream/70 hover:bg-cream/10 hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}
