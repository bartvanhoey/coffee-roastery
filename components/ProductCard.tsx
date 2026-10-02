import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

type Props = {
  product: Product;
  priority?: boolean;
  /** Aspect ratio class for the media area. */
  aspect?: string;
};

export default function ProductCard({
  product,
  priority = false,
  aspect = "aspect-[4/5]",
}: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div
        className={`relative ${aspect} overflow-hidden rounded-sm bg-roast`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        <div className="absolute left-4 top-4 flex gap-2">
          {product.limited && <Badge>Limited</Badge>}
          {product.isNew && <Badge>New</Badge>}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <p className="text-xs tracking-[0.2em] uppercase text-sand/80">
            {product.category}
          </p>
          <span className="translate-y-2 text-[0.7rem] tracking-[0.22em] uppercase text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-cream">{product.name}</h3>
          <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        </div>
        <p className="shrink-0 pt-1 text-sm text-sand">
          {formatPrice(product.price)}
          <span className="block text-right text-xs text-muted">
            {product.unit}
          </span>
        </p>
      </div>
    </Link>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-gold/60 bg-ink/50 px-3 py-1 text-[0.62rem] tracking-[0.2em] uppercase text-gold backdrop-blur">
      {children}
    </span>
  );
}
