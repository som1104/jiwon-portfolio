import ImageFrame from "@/components/ds/ImageFrame";
import type { Project } from "@/components/data";

type ProjectSectionProps = {
  project: Project;
  /** running number for the "01 / 03" counter */
  position: number;
  total: number;
  /** eyebrow index of the whole project block (03 — Project 01) */
  sectionIndex: string;
};

/**
 * One full-screen project section. Same layout for every project so the
 * placeholders (status: "soon") can be swapped for real content by editing
 * data.ts only. Entrance is the site's own reveal system: the four groups
 * (number → title → visual → meta) are direct children of the
 * [data-reveal-children] element, so they stagger in with the existing
 * 0.6s ease-out fade + 24px rise.
 */
export default function ProjectSection({
  project,
  position,
  total,
  sectionIndex,
}: ProjectSectionProps) {
  const soon = project.status === "soon";
  const counter = `${String(position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section
      className={`project slide${soon ? " project--soon" : ""}`}
      id={project.id}
      data-slide
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project__inner" data-reveal-children>
        <div className="project__head">
          <p className="eyebrow">
            <span className="eyebrow__i">{sectionIndex}</span> — Project{" "}
            {project.index}
          </p>
          <p className="eyebrow">{counter}</p>
        </div>

        <div className="project__title-group">
          <h2 className="project__title" id={`${project.id}-title`}>
            {project.title}
          </h2>
          {project.subtitle ? (
            <p className="project__subtitle">{project.subtitle}</p>
          ) : null}
        </div>

        <div className="project__visual">
          {project.media?.type === "video" ? (
            <figure className="frame">
              <div className="frame__well project__well">
                <video
                  className="project__video"
                  src={project.media.src}
                  poster={project.media.poster}
                  autoPlay
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
          ) : (
            <figure className="frame">
              <div className="frame__well project__well">
                <div className="frame__placeholder">
                  {soon ? "Coming soon" : "Demo video"}
                </div>
              </div>
            </figure>
          )}
        </div>

        <div className="project__meta">
          {soon ? (
            <p className="project__soon">Coming Soon</p>
          ) : (
            <>
              {project.summary ? (
                <p className="project__summary">{project.summary}</p>
              ) : null}
              <p className="project__stack">{project.stack}</p>
              {project.links?.length ? (
                <div className="project__links">
                  {project.links.map((l) => (
                    <a
                      key={l.label}
                      className="work__link"
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {l.label} <span className="work__arrow">→</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
