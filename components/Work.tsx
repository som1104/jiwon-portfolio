import ImageFrame from "@/components/ds/ImageFrame";
import Label from "@/components/ds/Label";
import { projects } from "@/components/data";

/**
 * Selected Work — the project index. Three cards in one screen; each card is
 * a single anchor to its full-screen project section below (#project-01 …),
 * so a click travels down the page (SectionScroll handles the easing) rather
 * than opening a new page. Markup / class names match the original card so
 * the design is unchanged.
 */
export default function Work() {
  return (
    <section className="section work" id="work">
      <div className="work__head" data-reveal>
        <p className="eyebrow">
          <span className="eyebrow__i">02</span> — Selected work
        </p>
        <p className="eyebrow">Three projects</p>
      </div>
      <div className="work__grid" data-reveal-children>
        {projects.map((p) => (
          <a
            key={p.index}
            className="pcard work__item"
            href={`#${p.id}`}
            aria-label={`${p.title} — view project`}
          >
            <ImageFrame src={p.thumb} alt={p.thumb ? p.title : ""} />
            <div className="pcard__head">
              <h3 className="pcard__title">{p.title}</h3>
              <Label>{p.index}</Label>
            </div>
            <p className="work__role">{p.role}</p>
            <div className="work__foot">
              <span className="work__stack">{p.stack}</span>
              <span className="work__link">
                View project <span className="work__arrow">→</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
