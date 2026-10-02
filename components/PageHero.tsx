import Image from "next/image";
import type { ReactNode } from "react";
import VideoBackground from "./VideoBackground";

type Props = {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  video?: string;
  image: string;
  /** Height variant. */
  size?: "tall" | "short";
  children?: ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  text,
  video,
  image,
  size = "tall",
  children,
}: Props) {
  return (
    <section
      className={`relative flex items-end overflow-hidden ${
        size === "tall" ? "min-h-[86svh]" : "min-h-[62svh]"
      }`}
    >
      {video ? (
        <VideoBackground
          src={video}
          poster={image}
          rate={0.85}
          videoClassName="animate-scale-in"
        />
      ) : (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-scale-in object-cover"
        />
      )}
      <div className="scrim-b absolute inset-0" />
      <div className="scrim-t absolute inset-x-0 top-0 h-48" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 sm:pb-24">
        <p className="eyebrow animate-fade-up" style={{ animationDelay: "200ms" }}>
          {eyebrow}
        </p>
        <h1
          className="display mt-6 max-w-4xl text-5xl text-cream sm:text-7xl lg:text-8xl animate-fade-up"
          style={{ animationDelay: "350ms" }}
        >
          {title}
        </h1>
        {text && (
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-sand/90 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            {text}
          </p>
        )}
        {children && (
          <div
            className="mt-10 animate-fade-up"
            style={{ animationDelay: "650ms" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
