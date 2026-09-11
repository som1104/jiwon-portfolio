"use client";

import { useEffect } from "react";
import { heroControl } from "@/lib/hero-control";

/**
 * Full-page section pager. Renders nothing.
 *
 * One wheel / trackpad gesture = exactly one step:
 *   - on the hero, the first step opens the media (heroControl.expand)
 *   - every step after that moves one viewport-height "stop" down / up
 *   - scrolling up on the open hero at the top closes it again
 *
 * Stops come from every `[data-slide]` element: its top, plus a second stop
 * at (bottom - viewport) when the slide is taller than the viewport, so tall
 * content is never clipped and each step is still one screen.
 *
 * Gesture handling: native scrolling is fully suppressed (wheel, keys, and
 * scrollbar drags are re-snapped). A gesture is a run of wheel events with
 * no gap longer than GESTURE_GAP_MS; only the first crossing of DELTA_THRESHOLD
 * within a gesture fires, so trackpad momentum tails and fast mouse-wheel
 * flicks never skip sections. Input is also ignored while a step animates.
 *
 * Below MIN_WIDTH (phones) the page scrolls natively; only the hero's
 * open / close is driven by touch there.
 */

const MIN_WIDTH = 768;
const GESTURE_GAP_MS = 220;
const DELTA_THRESHOLD = 24;
const STEP_MS = 850;
const SETTLE_MS = 140;
const TOUCH_THRESHOLD = 28;
/** a slide this much taller than the viewport gets a second stop */
const EXTRA_STOP_MIN = 40;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function normalizeDelta(e: WheelEvent) {
  // deltaMode 0 = pixels, 1 = lines, 2 = pages
  if (e.deltaMode === 1) return e.deltaY * 16;
  if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
  return e.deltaY;
}

export default function SectionScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const root = document.documentElement;

    let stops: number[] = [];
    let index = 0;
    let animating = false;
    let frame = 0;

    // gesture bookkeeping
    let lastWheelAt = 0;
    let gestureFired = false;
    let acc = 0;

    const vh = () => window.innerHeight;
    const slides = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));

    const computeStops = () => {
      const h = vh();
      const next: number[] = [];
      for (const el of slides()) {
        const top = Math.round(el.offsetTop);
        next.push(top);
        const extra = el.offsetHeight - h;
        if (extra > EXTRA_STOP_MIN) next.push(top + extra);
      }
      stops = next.length ? next : [0];
    };

    const nearestIndex = (y: number) => {
      let best = 0;
      let dist = Infinity;
      stops.forEach((s, i) => {
        const d = Math.abs(s - y);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      return best;
    };

    const scrollToY = (to: number, ms: number) =>
      new Promise<void>((resolve) => {
        cancelAnimationFrame(frame);
        const from = window.scrollY;
        if (Math.abs(to - from) < 1 || ms <= 0) {
          window.scrollTo(0, to);
          resolve();
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / ms, 1);
          window.scrollTo(0, from + (to - from) * easeInOutCubic(t));
          if (t < 1) frame = requestAnimationFrame(tick);
          else resolve();
        };
        frame = requestAnimationFrame(tick);
      });

    const settle = () =>
      new Promise<void>((r) => setTimeout(r, reduced ? 0 : SETTLE_MS));

    const isPaged = () => window.innerWidth >= MIN_WIDTH;

    /** move exactly one step in `dir` (+1 down / -1 up) */
    const step = async (dir: 1 | -1) => {
      if (animating) return;
      const hero = heroControl.get();
      if (hero?.isAnimating()) return;

      animating = true;
      try {
        if (index === 0 && hero) {
          if (dir > 0 && !hero.isExpanded()) {
            await hero.expand();
            await settle();
            return;
          }
          if (dir < 0 && hero.isExpanded() && window.scrollY <= 2) {
            await hero.collapse();
            await settle();
            return;
          }
        }
        if (!isPaged()) return;
        const target = Math.min(Math.max(index + dir, 0), stops.length - 1);
        if (target === index) return;
        index = target;
        await scrollToY(stops[index], reduced ? 0 : STEP_MS);
        await settle();
      } finally {
        animating = false;
      }
    };

    /** jump to whatever stop contains `el` (nav links, hash on load) */
    const goToElement = async (el: HTMLElement, instant = false) => {
      if (animating) return;
      animating = true;
      try {
        const hero = heroControl.get();
        // land on the slide that contains the element, not the raw offset
        const slide = el.closest<HTMLElement>("[data-slide]") ?? el;
        const top = Math.round(slide.getBoundingClientRect().top + window.scrollY);
        const target = nearestIndex(top);
        if (target > 0 && hero && !hero.isExpanded()) await hero.expand();
        index = target;
        await scrollToY(
          stops[index],
          instant || reduced ? 0 : STEP_MS,
        );
      } finally {
        animating = false;
      }
    };

    // ---- wheel / trackpad -------------------------------------------------
    const onWheel = (e: WheelEvent) => {
      const hero = heroControl.get();
      const heroClosed = !!hero && !hero.isExpanded();
      if (!isPaged() && !heroClosed) return; // phones scroll natively
      e.preventDefault();

      const now = performance.now();
      if (now - lastWheelAt > GESTURE_GAP_MS) {
        gestureFired = false;
        acc = 0;
      }
      lastWheelAt = now;
      if (gestureFired || animating) return;

      acc += normalizeDelta(e);
      if (Math.abs(acc) < DELTA_THRESHOLD) return;
      gestureFired = true;
      void step(acc > 0 ? 1 : -1);
    };

    // ---- keyboard ---------------------------------------------------------
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /^(input|textarea|select)$/i.test(t.tagName)) return;
      if (t?.isContentEditable) return;
      const hero = heroControl.get();
      const heroClosed = !!hero && !hero.isExpanded();
      if (!isPaged() && !heroClosed) return;

      if (e.key === " ") {
        e.preventDefault();
        void step(e.shiftKey ? -1 : 1);
      } else if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        void step(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        void step(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        void goToElement(slides()[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        const all = slides();
        void goToElement(all[all.length - 1]);
      }
    };

    // ---- touch (phones: only the hero; tablets+: full paging) -------------
    let touchStartY = 0;
    let touchFired = false;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchFired = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const hero = heroControl.get();
      const heroClosed = !!hero && !hero.isExpanded();
      const paged = isPaged();
      if (!paged && !heroClosed) return; // native scrolling on phones
      if (e.cancelable) e.preventDefault();
      if (touchFired || animating) return;
      const delta = touchStartY - e.touches[0].clientY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      touchFired = true;
      void step(delta > 0 ? 1 : -1);
    };

    // ---- scrollbar drags / anything else that moved the page ---------------
    let scrollTimer = 0;
    const onScroll = () => {
      if (!isPaged() || animating) return;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        if (animating) return;
        // where we already are — our own scrollTo, or a no-op
        if (Math.abs(window.scrollY - stops[index]) < 2) return;
        const hero = heroControl.get();
        if (hero && !hero.isExpanded()) {
          // hero closed: the page must stay at the top
          window.scrollTo(0, 0);
          index = 0;
          return;
        }
        const target = nearestIndex(window.scrollY);
        index = target;
        animating = true;
        void scrollToY(stops[target], reduced ? 0 : 320).finally(() => {
          animating = false;
        });
      }, 120);
    };

    // ---- same-page anchor links -------------------------------------------
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", hash);
      if (!isPaged()) {
        const hero = heroControl.get();
        const go = () =>
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        if (hero && !hero.isExpanded()) void hero.expand().then(go);
        else go();
        return;
      }
      void goToElement(target);
    };

    // ---- resize -----------------------------------------------------------
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        syncPagedClass();
        computeStops();
        if (!isPaged()) return;
        index = Math.min(index, stops.length - 1);
        void scrollToY(stops[index], 0);
      }, 100);
    };

    // ---- boot -------------------------------------------------------------
    const syncPagedClass = () => root.classList.toggle("paged", isPaged());
    syncPagedClass();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    computeStops();
    // fonts / images can shift layout after first paint
    const recompute = () => computeStops();
    window.addEventListener("load", recompute);
    const ro =
      "ResizeObserver" in window
        ? new ResizeObserver(() => computeStops())
        : null;
    ro?.observe(document.body);

    const initial = location.hash
      ? document.querySelector<HTMLElement>(location.hash)
      : null;
    if (initial) void goToElement(initial, true);
    else window.scrollTo(0, 0);

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onClick);

    return () => {
      root.classList.remove("paged");
      cancelAnimationFrame(frame);
      window.clearTimeout(scrollTimer);
      window.clearTimeout(resizeTimer);
      ro?.disconnect();
      window.removeEventListener("load", recompute);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
