"use client";

import { useCallback, useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroControl } from "@/lib/hero-control";

/**
 * Scroll-to-expand hero (ported from 21st.dev "scroll-expansion-hero").
 *
 * This version does not read the wheel itself. It exposes animated
 * `expand()` / `collapse()` through `heroControl` and the section pager
 * (components/SectionScroll.tsx) decides when to call them: the first wheel
 * gesture on the page opens the media in one smooth motion, the next gesture
 * moves on to section 01, and scrolling up from the top closes it again.
 *
 * The whole thing is exactly one viewport tall so it works as slide 0 of a
 * full-page layout; `children` (lead + CTA) fade in over the bottom of the
 * media once it is open.
 *
 * Site adaptations vs. the original: white display type from the design
 * tokens instead of blue-200, square corners like ImageFrame, and
 * prefers-reduced-motion opens instantly.
 */

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  /** rendered above everything (e.g. the site header) — never moves */
  overlay?: ReactNode;
  /** shown over the bottom of the media once fully expanded */
  children?: ReactNode;
}

const EXPAND_MS = 1000;
const COLLAPSE_MS = 700;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  overlay,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });

  const progressRef = useRef(0);
  const frameRef = useRef(0);
  const animatingRef = useRef(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const setProgress = useCallback((p: number) => {
    const clamped = Math.min(Math.max(p, 0), 1);
    progressRef.current = clamped;
    setScrollProgress(clamped);
  }, []);

  /** tween progress to `to` over `ms`; resolves when done */
  const animateTo = useCallback(
    (to: number, ms: number, ease: (t: number) => number) =>
      new Promise<void>((resolve) => {
        cancelAnimationFrame(frameRef.current);
        const from = progressRef.current;
        if (from === to || ms <= 0) {
          setProgress(to);
          animatingRef.current = false;
          resolve();
          return;
        }
        animatingRef.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / ms, 1);
          setProgress(from + (to - from) * ease(t));
          if (t < 1) {
            frameRef.current = requestAnimationFrame(tick);
          } else {
            animatingRef.current = false;
            resolve();
          }
        };
        frameRef.current = requestAnimationFrame(tick);
      }),
    [setProgress],
  );

  // hand the pager an imperative API
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const unregister = heroControl.register({
      expand: () => animateTo(1, reduced ? 0 : EXPAND_MS, easeOutCubic),
      collapse: () => animateTo(0, reduced ? 0 : COLLAPSE_MS, easeInOutCubic),
      isExpanded: () => progressRef.current >= 1,
      isAnimating: () => animatingRef.current,
    });
    return () => {
      unregister();
      cancelAnimationFrame(frameRef.current);
    };
  }, [animateTo]);

  // reset when the media source changes
  useEffect(() => {
    setProgress(0);
  }, [mediaType, mediaSrc, setProgress]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const expanded = scrollProgress >= 1;
  const showContent = scrollProgress > 0.75;

  // card → full viewport, so the opened hero is a full-bleed photo with the
  // header sitting on top of it (like the original static hero)
  const cardW = Math.min(300, viewport.w * 0.8);
  const cardH = Math.min(400, viewport.h * 0.55);
  const mediaWidth = cardW + scrollProgress * (viewport.w - cardW);
  const mediaHeight = cardH + scrollProgress * (viewport.h - cardH);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  const displayType: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    letterSpacing: "var(--track-display)",
    lineHeight: 0.95,
    color: "var(--white)",
  };
  const labelType: React.CSSProperties = {
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-caption)",
    letterSpacing: "var(--track-label)",
    textTransform: "uppercase",
    color: "var(--paper-70)",
  };

  return (
    <div
      ref={sectionRef}
      className="relative h-[100dvh] overflow-hidden"
      data-expanded={expanded ? "true" : "false"}
    >
      {/* full-bleed backdrop — fades out as the media takes over */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollProgress }}
        transition={{ duration: 0.1 }}
      >
        <Image
          src={bgImageSrc}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "blur(18px)",
            transform: "scale(1.08)",
          }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--overlay-hero)" }}
        />
      </motion.div>

      {overlay && (
        <div className="absolute inset-x-0 top-0 z-30">{overlay}</div>
      )}

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        {/* the media well — grows from a card to (almost) the viewport */}
        <div
          className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-none"
          style={{
            width: `${mediaWidth}px`,
            height: `${mediaHeight}px`,
            boxShadow: `0px 0px 50px rgba(0, 0, 0, ${0.3 * (1 - scrollProgress)})`,
          }}
        >
          {mediaType === "video" ? (
            mediaSrc.includes("youtube.com") ? (
              <div className="relative w-full h-full pointer-events-none">
                <iframe
                  width="100%"
                  height="100%"
                  src={
                    mediaSrc.includes("embed")
                      ? mediaSrc +
                        (mediaSrc.includes("?") ? "&" : "?") +
                        "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                      : mediaSrc.replace("watch?v=", "embed/") +
                        "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                        mediaSrc.split("v=")[1]
                  }
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <motion.div
                  className="absolute inset-0 bg-black/30"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            ) : (
              <div className="relative w-full h-full pointer-events-none">
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                />
                <motion.div
                  className="absolute inset-0 bg-black/30"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            )
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={mediaSrc}
                alt={title || "Media content"}
                width={1280}
                height={720}
                className="w-full h-full object-cover"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-black/50"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}

          {/* lead + CTA, over the bottom of the media once it is open */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: showContent ? 1 : 0,
              y: showContent ? 0 : 16,
            }}
            transition={{ duration: 0.7, ease: [0.17, 0.84, 0.44, 1] }}
            aria-hidden={!showContent}
            style={{ pointerEvents: showContent ? "auto" : "none" }}
          >
            {children}
          </motion.div>

          {/* eyebrow + hint under the small card; slide apart as it grows */}
          <div className="flex flex-col items-center text-center relative z-10 mt-5 gap-2 transition-none">
            {date && (
              <p
                style={{
                  ...labelType,
                  opacity: 1 - scrollProgress,
                  transform: `translateX(-${textTranslateX}vw)`,
                }}
              >
                {date}
              </p>
            )}
            {scrollToExpand && (
              <p
                aria-hidden={expanded}
                style={{
                  ...labelType,
                  opacity: 1 - scrollProgress,
                  transform: `translateX(${textTranslateX}vw)`,
                }}
              >
                {scrollToExpand}
              </p>
            )}
          </div>
        </div>

        <h1
          className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col m-0 text-5xl md:text-7xl lg:text-8xl font-medium ${
            textBlend ? "mix-blend-difference" : "mix-blend-normal"
          }`}
          style={displayType}
        >
          <motion.span
            className="block transition-none"
            style={{ transform: `translateX(-${textTranslateX}vw)` }}
          >
            {firstWord}
          </motion.span>
          {restOfTitle && (
            <motion.span
              className="block transition-none"
              style={{ transform: `translateX(${textTranslateX}vw)` }}
            >
              {restOfTitle}
            </motion.span>
          )}
        </h1>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
