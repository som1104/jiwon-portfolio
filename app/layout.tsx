import type { Metadata } from "next";
import "./globals.css";
import SectionScroll from "@/components/SectionScroll";
import RevealObserver from "@/components/RevealObserver";

/**
 * Runs before first paint. Sets html[data-reveal="ready"] (which activates the
 * reveal "hidden" state in CSS) and wires one IntersectionObserver over every
 * [data-reveal] / [data-reveal-children] element. Kept as an inline vanilla
 * script so scroll reveals never depend on a React chunk loading — if anything
 * here fails, the flag is removed and all content stays visible.
 */
const revealBootstrap = `(function(){try{if(!('IntersectionObserver' in window))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('reveal-on');var run=function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},{rootMargin:'0px 0px -12% 0px'});document.querySelectorAll('[data-reveal],[data-reveal-children]').forEach(function(el){io.observe(el);});};if(document.readyState!=='loading')run();else addEventListener('DOMContentLoaded',run);}catch(e){document.documentElement.classList.remove('reveal-on');}})();`;

export const metadata: Metadata = {
  title: "지원 — Frontend Developer",
  description: "웹툰 연출·후보정을 거쳐 프론트엔드 개발로 넘어온 지원의 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // the reveal bootstrap script and SectionScroll both add classes to
    // <html> before hydration — expected, so silence the mismatch warning
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Fonts are loaded here as <link>, not @import in CSS: a remote
            @import placed after Tailwind's base layer is invalid and the
            browser drops it. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* KONONENKO substitute webfaces: Bodoni Moda ~= site face "h",
            Archivo ~= site face "n". In the App Router this <head> link
            applies site-wide; the no-page-custom-font rule is a Pages-Router
            check and does not apply here. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600;6..96,700&family=Archivo:wght@400;500;600&display=swap"
        />
        {/* Korean fallback face (Bodoni Moda / Archivo carry no Hangul) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>
        {children}
        <SectionScroll />
        <RevealObserver />
      </body>
    </html>
  );
}
