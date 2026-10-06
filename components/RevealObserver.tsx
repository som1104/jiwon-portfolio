"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Re-arms the scroll-reveal IntersectionObserver on every client-side
 * route change.
 *
 * The inline bootstrap script in app/layout.tsx <head> sets up the very
 * first observer before hydration (so the initial page never flashes
 * hidden content while React loads). But that script is a one-shot: it
 * runs once at document load and only ever queries the [data-reveal]
 * elements that exist at that instant. Client-side navigation (Next.js
 * App Router) swaps in a whole new page tree without a full document
 * load, so the bootstrap script never re-runs — any [data-reveal]
 * element that mounts afterwards (e.g. the home page re-mounting after
 * "Back to Work" from a project detail page) is left with the CSS
 * default `opacity: 0` forever, since nothing ever adds `.is-visible`
 * to it. That showed up as the whole page going blank after leaving a
 * project detail page.
 *
 * This component re-queries on every pathname change. For an element
 * that is ALREADY inside the viewport the moment it mounts — which is
 * exactly what happens on "Back to Work" (SectionScroll has already
 * landed the page on that project's section before this layout effect
 * runs) — it's marked visible immediately, synchronously, before paint.
 * Waiting for the IntersectionObserver's callback here would still show
 * a frame (or a few) of `opacity: 0` first and then fade it in, which on
 * a *return* reads as a white flash, not as the "scroll reveal" the
 * effect is for. Anything still below the fold keeps the original
 * deferred, fade-in-on-scroll-into-view behavior.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("reveal-on")) return;

    const vh = window.innerHeight;
    const toObserve: Element[] = [];
    document
      .querySelectorAll("[data-reveal], [data-reveal-children]")
      .forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.classList.add("is-visible");
        } else {
          toObserve.push(el);
        }
      });

    if (!toObserve.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    toObserve.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
