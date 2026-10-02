import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  className = "",
}: Props) {
  return (
    <Reveal
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display mt-5 text-4xl text-cream sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {text && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-sand/85 sm:text-lg">
          {text}
        </p>
      )}
    </Reveal>
  );
}
