import Link from "next/link";
import { nav, site } from "@/lib/site";
import { categories, categorySlug } from "@/lib/products";
import Logo from "./Logo";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="relative border-t border-cream/10 bg-espresso">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-3 text-cream">
              <Logo className="h-9 w-9" />
              <span className="font-serif text-3xl tracking-[0.18em] uppercase">
                {site.name}
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-sand/80">
              Roasted in {site.city} since {site.founded}. Sourced directly from
              38 families across 14 countries, and served in 41 salones around
              the world.
            </p>
          </div>

          <div>
            <h3 className="eyebrow">Explore</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">Portfolio</h3>
            <ul className="mt-5 space-y-3">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/products?category=${categorySlug(c)}`}
                    className="text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">The Sunday letter</h3>
            <p className="mt-5 text-sm leading-relaxed text-sand/80">
              One email a week. New lots, roastery notes, and first access to
              limited releases.
            </p>
            <Newsletter compact />
          </div>
        </div>

        <div className="hairline mt-16" />

        <div className="mt-8 flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. A fictional brand,
            built as a demonstration.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-cream">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-cream">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-cream">
              Wholesale
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
