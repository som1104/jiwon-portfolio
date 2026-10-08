"use client";

import { useEffect, useRef, useState } from "react";

type SlideshowProps = {
  images: string[];
  alt: string;
  captions?: string[];
  /** ms per frame */
  interval?: number;
  /**
   * Prev/next arrows (no caption/counter bar overlay). On by default (the detail
   * pages' quick-scan intro wells). The main page's Selected Work slides
   * pass false — it's a glance, not a place to linger and click through —
   * so there it's just the crossfade with nothing overlaid.
   */
  controls?: boolean;
  /**
   * Controlled mode: a parent (SlideshowPair) owns the frame index and the
   * timer, so several slideshows can stay on the same step. The arrows then
   * report through `onIndexChange` instead of moving this one alone.
   */
  activeIndex?: number;
  onIndexChange?: (next: number) => void;
};

/**
 * Auto-advancing screen-by-screen walkthrough, used in place of a single
 * still image/video when a project's best representation is a sequence of
 * real product screens (e.g. TRIPTUNE's flow). Crossfades on a timer;
 * pauses on hover/focus so it can be read, and respects
 * prefers-reduced-motion by holding on the first frame. Prev/next arrows
 * let someone jump ahead instead of waiting out the timer — a manual
 * click also restarts the timer (index is a dependency below), so
 * autoplay doesn't immediately fight the click by advancing again a
 * moment later.
 */
export default function Slideshow({
  images,
  alt,
  captions,
  interval = 2600,
  controls = true,
  activeIndex,
  onIndexChange,
}: SlideshowProps) {
  const controlled = activeIndex !== undefined;
  const [innerIndex, setIndex] = useState(0);
  const index = controlled ? activeIndex : innerIndex;
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (controlled || images.length < 2 || paused || reducedRef.current) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [controlled, images.length, interval, paused, index]);

  if (images.length === 0) return null;

  const goTo = (next: number) => {
    const wrapped = ((next % images.length) + images.length) % images.length;
    if (controlled) onIndexChange?.(wrapped);
    else setIndex(wrapped);
  };

  return (
    <div
      className="slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={captions?.[i] ? `${alt} — ${captions[i]}` : `${alt} 화면 ${i + 1}`}
          className="slideshow__frame"
          data-active={i === index}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      {controls && images.length > 1 ? (
        <>
          <button
            type="button"
            className="slideshow__nav slideshow__nav--prev"
            onClick={() => goTo(index - 1)}
            aria-label={`${alt} 이전 화면`}
          >
            ‹
          </button>
          <button
            type="button"
            className="slideshow__nav slideshow__nav--next"
            onClick={() => goTo(index + 1)}
            aria-label={`${alt} 다음 화면`}
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}
