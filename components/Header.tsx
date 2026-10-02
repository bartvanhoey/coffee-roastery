"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-cream/10 bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-cream transition-opacity hover:opacity-80"
            aria-label={`${site.fullName} home`}
          >
            <Logo className="h-7 w-7" />
            <span className="font-serif text-2xl tracking-[0.18em] uppercase">
              {site.name}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-9 md:flex"
            aria-label="Primary"
          >
            {nav.slice(1).map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-colors ${
                    active ? "text-gold" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/products"
              className="rounded-full border border-gold/60 px-5 py-2 text-[0.72rem] font-medium tracking-[0.22em] uppercase text-gold transition-all hover:bg-gold hover:text-ink"
            >
              Shop
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-cream md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer. Kept outside the header: its backdrop-filter would
          otherwise become the containing block for this fixed element. */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-26 transition-all duration-500 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`display border-b border-cream/10 py-4 text-4xl transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${pathname === item.href ? "text-gold" : "text-cream"}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="mt-auto text-sm text-muted">
          {site.fullName} · Est. {site.founded}
        </p>
      </div>
    </>
  );
}
