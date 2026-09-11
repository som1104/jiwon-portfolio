"use client";

import { useEffect, useRef } from "react";
import { about } from "@/components/data";

/** line-height of the big heading (kept in sync with .about__heading) */
const HEADING_LINE_HEIGHT = 1.02;

/**
 * The heading on the left is sized so its stacked lines are exactly as tall
 * as the text column on the right (quote + body + meta). That height depends
 * on fonts and wrapping, so it is measured rather than guessed: on mount and
 * on resize, font-size = column height / (lines × line-height), then reduced
 * if a line would overflow its column. When the grid collapses to one column
 * (narrow screens) the inline size is cleared and the CSS size applies.
 */
export default function About() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const asideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const aside = asideRef.current;
    if (!heading || !aside) return;

    const fit = () => {
      const stacked = aside.offsetTop >= heading.offsetTop + heading.offsetHeight;
      if (stacked) {
        heading.style.fontSize = "";
        return;
      }
      const lines = about.heading.length;
      let size = aside.offsetHeight / (lines * HEADING_LINE_HEIGHT);
      heading.style.fontSize = `${size}px`;
      // never wider than the grid column: scale down if the longest line
      // overflows (the heading itself shrink-wraps, so measure the track)
      const grid = heading.parentElement as HTMLElement;
      const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
      const colWidth = (grid.clientWidth - gap) / 2;
      const widest = Math.max(
        ...Array.from(heading.children).map((el) => (el as HTMLElement).scrollWidth),
      );
      if (widest > colWidth) {
        size *= colWidth / widest;
        heading.style.fontSize = `${size}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(aside);
    ro.observe(heading.parentElement ?? heading);
    // webfonts landing late change the aside height
    document.fonts?.ready.then(fit).catch(() => {});
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <section className="section" id="about">
      <p className="eyebrow" data-reveal>
        <span className="eyebrow__i">01</span> — Introduction
      </p>
      <div className="about__grid" data-reveal-children>
        <h2 className="about__heading" ref={headingRef}>
          {about.heading.map((line) => (
            <span className="about__line" key={line}>
              {line}
            </span>
          ))}
        </h2>
        <div className="about__aside" ref={asideRef}>
          <p className="about__quote">
            “ {about.quote[0]}
            <br />
            {about.quote[1]} ”
          </p>
          <p className="about__body">{about.body}</p>
          <div className="about__meta">
            {about.meta.map((m) => (
              <div key={m.k}>
                <div className="about__meta-k">{m.k}</div>
                <div className="about__meta-v">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
