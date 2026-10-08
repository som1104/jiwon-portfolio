"use client";

import { useEffect, useRef, useState } from "react";
import Slideshow from "@/components/ds/Slideshow";

type SlideshowPairProps = {
  /** mobile screens (left) */
  images: string[];
  captions?: string[];
  /** desktop screens (right) — index-aligned with `images`, so both show the same step */
  secondaryImages: string[];
  alt: string;
  portrait?: boolean;
  controls?: boolean;
  interval?: number;
};

/**
 * TRIPTUNE's mobile + web screens advance together: one timer, one index, so
 * the two frames always show the same step of the flow (instead of two
 * slideshows drifting out of step with each other).
 */
export default function SlideshowPair({
  images,
  captions,
  secondaryImages,
  alt,
  portrait = true,
  controls = true,
  interval = 2600,
}: SlideshowPairProps) {
  const count = Math.min(images.length, secondaryImages.length);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reducedRef.current) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [count, interval, paused, index]);

  return (
    <div
      className="project__visual-pair"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <figure className="frame">
        <div className={`frame__well project__well${portrait ? " project__well--portrait" : ""}`}>
          <Slideshow
            images={images.slice(0, count)}
            captions={captions}
            alt={alt}
            controls={controls}
            activeIndex={index}
            onIndexChange={setIndex}
          />
        </div>
      </figure>
      {/* 모바일(≤900px)에서는 CSS로 숨기고 폰 화면만 대표로 보여준다 */}
      <figure className="frame project__pair-web">
        <div className="frame__well project__well project__well--desktop-slide">
          <Slideshow
            images={secondaryImages.slice(0, count)}
            captions={captions}
            alt={`${alt} 웹 버전`}
            controls={false}
            activeIndex={index}
          />
        </div>
      </figure>
    </div>
  );
}
