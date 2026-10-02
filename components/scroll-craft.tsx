"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type Instance = { layout(): void; read(): void; destroy(): void };
declare global {
  interface Window {
    ScrollCraft?: {
      mount(root?: Element | string, opts?: { lerp?: number }): Instance;
      reduce: boolean;
      instances: Instance[];
    };
  }
}

/**
 * Wrap the scroll-driven part of a page in this. It mounts the engine over its
 * children after hydration and destroys it on unmount, so a route change never
 * leaves listeners or rAF loops behind. Keep it inside the page, not in the
 * root layout: a persistent layout would keep one instance alive across routes
 * whose acts no longer exist.
 */
export function ScrollCraft({
  children,
  lerp,
}: {
  children: ReactNode;
  lerp?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let instance: Instance | undefined;
    let cancelled = false;
    import("@/lib/scrollcraft/scrollcraft.js").then(() => {
      if (cancelled || !root.current || !window.ScrollCraft) return;
      instance = window.ScrollCraft.mount(
        root.current,
        lerp ? { lerp } : undefined,
      );
    });
    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [pathname, lerp]);

  return (
    <div ref={root} data-sc-root="">
      {children}
    </div>
  );
}
