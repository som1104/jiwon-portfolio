import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageFrame from "@/components/ds/ImageFrame";
import Slideshow from "@/components/ds/Slideshow";
import DetailSection from "@/components/project-detail/DetailSection";
import MarqueeBand from "@/components/MarqueeBand";
import Footer from "@/components/Footer";
import { projectDetails, projects } from "@/components/data";

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const detail = projectDetails[params.slug];
  if (!detail) return {};
  return {
    title: `${detail.title} — 지원`,
    description: detail.description,
  };
}

/**
 * The case-study page behind a Selected Work slide's "View project" link.
 * Normal vertical scroll (SectionScroll detaches itself off "/" — see
 * components/SectionScroll.tsx), but the same typography and visual
 * language as the main site.
 */
export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const detail = projectDetails[params.slug];
  if (!detail) return notFound();

  // Jump back to this same project's own Selected Work slide, not always
  // the first one — fall back to project-01 only if a slide id can't be
  // found (shouldn't happen, every projectDetails entry has a matching
  // projects[] entry).
  const backHref = `/#${projects.find((p) => p.slug === detail.slug)?.id ?? "project-01"}`;

  return (
    <main>
      {/* Only the nav/hero/case-study content is width-constrained — the
          marquee + footer below render outside this wrapper so they go
          full-bleed edge to edge, same as the main page. */}
      <div className="detail">
        <nav className="detail-nav">
          {/* scroll={false}: let SectionScroll alone decide the landing
              position on "/" (its own hash-aware boot logic) instead of
              competing with Next's default scroll-into-view, which is what
              caused the double-jump back to the wrong project section. */}
          <Link className="detail-nav__back" href={backHref} scroll={false}>
            ← Back to Work
          </Link>
          <div className="detail-nav__links">
            {detail.links.map((l) => (
              <a
                key={l.label}
                className="work__link"
                href={l.href}
                {...(l.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.label} <span className="work__arrow">↗</span>
              </a>
            ))}
          </div>
        </nav>

        <header className="detail-hero">
          <p className="eyebrow">
            <span className="eyebrow__i">{detail.index}</span> — Project
          </p>
          <h1 className="detail-hero__title">{detail.title}</h1>
          <p className="detail-hero__subtitle">{detail.subtitle}</p>
          <p className="detail-hero__desc">{detail.description}</p>

          <div className="detail-hero__meta">
            <div>
              <p className="about__meta-k">Role</p>
              <p className="about__meta-v">
                {detail.role.join(" / ")}
                {detail.team ? " · Team Project" : ""}
              </p>
            </div>
            <div>
              <p className="about__meta-k">Tech</p>
              <p className="about__meta-v">{detail.tech.join(" · ")}</p>
            </div>
          </div>

          <div className="detail-hero__visual">
            {detail.media?.type === "video" ? (
              <figure className="frame">
                <div
                  className="frame__well project__well"
                  style={{ aspectRatio: detail.media.aspect ?? "16 / 9" }}
                >
                  <video
                    className="project__video"
                    src={detail.media.src}
                    poster={detail.media.poster}
                    aria-label={`${detail.title} 프리뷰 영상`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </figure>
            ) : detail.media?.type === "image" ? (
              <ImageFrame src={detail.media.src} alt={detail.title} ratio="16 / 10" />
            ) : detail.media?.type === "slideshow" ? (
              detail.media.secondaryImages?.length ? (
                <div className="project__visual-pair">
                  <figure className="frame">
                    <div
                      className={`frame__well project__well${
                        detail.media.orientation === "portrait" ? " project__well--portrait" : ""
                      }`}
                    >
                      <Slideshow
                        images={detail.media.images}
                        captions={detail.media.captions}
                        alt={detail.title}
                      />
                    </div>
                  </figure>
                  <figure className="frame">
                    <div className="frame__well project__well project__well--desktop-slide">
                      <Slideshow
                        images={detail.media.secondaryImages}
                        alt={`${detail.title} 웹 버전`}
                      />
                    </div>
                  </figure>
                </div>
              ) : (
                <figure className="frame">
                  <div
                    className={`frame__well project__well${
                      detail.media.orientation === "portrait" ? " project__well--portrait" : ""
                    }`}
                  >
                    <Slideshow
                      images={detail.media.images}
                      captions={detail.media.captions}
                      alt={detail.title}
                    />
                  </div>
                </figure>
              )
            ) : (
              <figure className="frame">
                <div className="frame__well project__well">
                  <div className="frame__placeholder">Preview coming soon</div>
                </div>
              </figure>
            )}
          </div>
        </header>

        <div className="detail-body">
          {detail.sections.map((section, i) => (
            <DetailSection key={i} section={section} />
          ))}
        </div>
      </div>

      <MarqueeBand />
      <Footer />
    </main>
  );
}
