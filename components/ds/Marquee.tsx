import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full cycle. */
  speed?: number;
};

/**
 * Continuous scrolling band. Three copies of the content sit in the track
 * and it loops by translating -33.333%, so the seam never shows.
 */
export default function Marquee({ children, speed = 44 }: MarqueeProps) {
  const style = { "--marquee-speed": `${speed}s` } as CSSProperties;
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" style={style}>
        <span className="marquee__item">{children}</span>
        <span className="marquee__item">{children}</span>
        <span className="marquee__item">{children}</span>
      </div>
    </div>
  );
}
