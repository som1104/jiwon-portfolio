"use client";

import { useEffect, useRef, useState } from "react";

export type FrameSlide = { src: string; alt: string; caption: string; w: number; h: number };

/**
 * Auto-advancing screenshot slides. Caption sits below the frame (never over
 * the UI). Pauses on hover/focus and when the tab is hidden; respects
 * prefers-reduced-motion (no auto-advance, dots still work).
 */
export default function FrameSlides({
  slides,
  interval = 1500,
}: {
  slides: FrameSlide[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (paused || reduced || slides.length < 2) return;
    timer.current = setInterval(() => {
      if (document.hidden) return;
      setI((n) => {
        setPrev(n);
        return (n + 1) % slides.length;
      });
    }, interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduced, slides.length, interval]);

  const first = slides[0];
  return (
    <div
      className="frame-slides"
      style={{ maxWidth: first.w }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="frame-slides__stage" style={{ aspectRatio: `${first.w} / ${first.h}` }}>
        {slides.map((s, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={s.w}
            height={s.h}
            loading={n === 0 ? "lazy" : "eager"}
            decoding="async"
            className={`frame-slides__img${n === i ? " is-active" : n === prev ? " is-prev" : ""}`}
            aria-hidden={n === i ? undefined : true}
          />
        ))}
      </div>
      <div className="frame-slides__bar">
        <p className="frame-slides__caption" aria-live="polite">
          {slides[i].caption}
        </p>
        <div className="frame-slides__dots" role="tablist" aria-label="슬라이드 선택">
          {slides.map((s, n) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`${n + 1} / ${slides.length}`}
              className={`frame-slides__dot${n === i ? " is-active" : ""}`}
              onClick={() => {
                setPrev(i);
                setI(n);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
