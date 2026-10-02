"use client";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
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
 * Wraps the scroll-driven part of a page. Mounts the engine over its children
 * after hydration and destroys it on unmount, so a route change never leaves
 * listeners or rAF loops behind. Lives inside the page, not the root layout.
 */
export function ScrollCraft({ children, lerp }: { children: ReactNode; lerp?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // The head script adds `sc-js` before first paint. In development React's
  // Strict Mode remount resets <html> to its JSX-managed attributes and can
  // clear it; re-apply before paint so cued copy never flashes. No-op in prod.
  useLayoutEffect(() => {
    document.documentElement.classList.add("sc-js");
  }, []);

  useEffect(() => {
    let instance: Instance | undefined;
    let cancelled = false;
    // Dynamic import: the engine touches window/matchMedia at evaluation time,
    // so a static import would run during server rendering and throw.
    import("@/lib/scrollcraft/scrollcraft.js").then(() => {
      if (cancelled || !root.current || !window.ScrollCraft) return;
      instance = window.ScrollCraft.mount(root.current, lerp ? { lerp } : undefined);
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
