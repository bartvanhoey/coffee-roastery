"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Extra classes on the <video> element itself. */
  videoClassName?: string;
  /** Playback speed, e.g. 0.8 for a slower, more cinematic feel. */
  rate?: number;
};

/**
 * Muted, looping background video that only plays while on screen and
 * stays on its poster frame when the visitor prefers reduced motion.
 */
export default function VideoBackground({
  src,
  poster,
  className = "",
  videoClassName = "",
  rate = 1,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      video.pause();
      return;
    }

    video.playbackRate = rate;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [rate]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <video
        ref={ref}
        className={`h-full w-full object-cover ${videoClassName}`}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        disablePictureInPicture
      />
    </div>
  );
}
