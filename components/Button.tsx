import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

const base =
  "group inline-flex items-center gap-3 rounded-full text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-all duration-400";

const variants = {
  solid: "bg-gold px-7 py-3.5 text-ink hover:bg-gold-soft",
  outline:
    "border border-cream/40 px-7 py-3.5 text-cream hover:border-gold hover:text-gold",
  ghost: "text-gold hover:text-cream",
};

export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="transition-transform duration-400 group-hover:translate-x-1"
      >
        <path
          d="M2 8h11M9 3.5 13.5 8 9 12.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
