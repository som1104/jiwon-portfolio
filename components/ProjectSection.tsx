"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ImageFrame from "@/components/ds/ImageFrame";
import Slideshow from "@/components/ds/Slideshow";
import SlideshowPair from "@/components/ds/SlideshowPair";
import { projectDetails, type Project } from "@/components/data";

type ProjectSectionProps = {
  project: Project;
  /** running number for the "01 / 03" counter */
  position: number;
  total: number;
  /** eyebrow index of this slide (02 — Selected Work, 03 — …) */
  sectionIndex: string;
};

/**
 * One full-screen Selected Work slide — a quick-scan showcase, not a case
 * study: number, name, subtitle, a line or two of description, stack, a
 * representative image/video, and three ways onward (the project's own
 * detail page, plus its live site and GitHub). Deep case-study content lives
 * on /projects/<slug> (see app/projects/[slug]/page.tsx) so no single
 * project dominates the main page.
 */
export default function ProjectSection({
  project,
  position,
  total,
  sectionIndex,
}: ProjectSectionProps) {
  const counter = `${String(position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // short Problem / Solution / Role-style facts, reused from the detail page's "At a Glance"
  const insight = projectDetails[project.slug]?.sections.find((s) => s.kind === "insight");
  const facts =
    project.facts ??
    (insight && insight.kind === "insight"
      ? insight.items.slice(0, 3).map((f) => ({ label: f.label, value: f.heading }))
      : []);

  // The main page is a single continuous scroll — every project's media is
  // mounted at once, not just the one currently in view. Without this, two
  // autoplaying 1080p videos decode simultaneously the whole time someone
  // is on "/", which can drop frames / look lower quality than the same
  // video alone on its detail page. Only decode the one actually on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="project slide"
      id={project.id}
      data-slide
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project__inner" data-reveal-children>
        <div className="project__head">
          <p className="eyebrow">
            <span className="eyebrow__i">{sectionIndex}</span> — Selected Work
          </p>
          <p className="eyebrow">{counter}</p>
        </div>

        <div className="project__title-group">
          <h2
            className={`project__title${project.title.length > 12 ? " project__title--long" : ""}`}
            id={`${project.id}-title`}
          >
            {project.title}
          </h2>
          <p className="project__subtitle">{project.subtitle}</p>
          {project.roleTags?.length ? (
            <p className="project__roles">{project.roleTags.join(" · ")}</p>
          ) : null}
        </div>

        <div className="project__visual">
          {project.media?.type === "video" ? (
            <figure className="frame">
              <div
                className="frame__well project__well"
                style={{ aspectRatio: project.media.aspect ?? "16 / 9" }}
              >
                <video
                  ref={videoRef}
                  className="project__video"
                  style={
                    project.media.zoom
                      ? { transform: `scale(${project.media.zoom})`, transformOrigin: "50% 0%" }
                      : undefined
                  }
                  src={project.media.src}
                  poster={project.media.poster}
                  aria-label={`${project.title} 프리뷰 영상`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            </figure>
          ) : project.media?.type === "image" ? (
            <ImageFrame
              src={project.media.src}
              alt={project.title}
              ratio="16 / 10"
            />
          ) : project.media?.type === "slideshow" ? (
            project.media.secondaryImages?.length ? (
              <SlideshowPair
                images={project.media.images}
                captions={project.media.captions}
                secondaryImages={project.media.secondaryImages}
                alt={project.title}
                portrait={project.media.orientation === "portrait"}
                controls={false}
              />
            ) : (
              <figure className="frame">
                <div
                  className={`frame__well project__well${
                    project.media.orientation === "portrait" ? " project__well--portrait" : ""
                  }`}
                >
                  <Slideshow
                    images={project.media.images}
                    captions={project.media.captions}
                    alt={project.title}
                    controls={false}
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

        <div className="project__meta">
          <p
            className="project__summary"
            style={project.summaryWidth ? { maxWidth: project.summaryWidth } : undefined}
          >
            {project.description.map((line, i) => (
              <span key={line}>
                {line}
                {i < project.description.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
          {facts.length ? (
            <dl className="project__facts">
              {facts.map((f) => (
                <div key={f.label} className="project__fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <p className="project__stack">{project.stack}</p>
          <div className="project__links">
            <Link
              className="work__link project__link--primary"
              href={`/projects/${project.slug}`}
              onClick={() => {
                // Stamp this slide into the "/" history entry so the browser
                // Back button returns to THIS project, not the top of the page.
                try {
                  history.replaceState(history.state, "", `#${project.id}`);
                } catch {}
              }}
            >
              View project <span className="work__arrow">→</span>
            </Link>
            {project.links.map((l) => (
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
        </div>
      </div>
    </section>
  );
}
