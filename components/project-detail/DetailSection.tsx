import type { DetailSection as DetailSectionType } from "@/components/data";

/**
 * Renders one case-study block. The shape (`kind`) decides the layout; the
 * content always comes from `projectDetails` in components/data.ts so every
 * project page is built from the same small set of primitives.
 */
export default function DetailSection({ section }: { section: DetailSectionType }) {
  switch (section.kind) {
    case "insight":
      return (
        <section className="detail-section detail-section--insight" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <ol className="detail-insight">
            {section.items.map((item) => (
              <li key={item.label} className="detail-insight__item">
                <span className="detail-insight__label">{item.label}</span>
                <div>
                  <p className="detail-insight__heading">{item.heading}</p>
                  <p className="detail-insight__body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case "contribution":
      return (
        <section className="detail-section" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <div className="detail-contrib">
            {section.groups.map((group) => (
              <div key={group.label} className="detail-contrib__group">
                <p className="detail-contrib__label">{group.label}</p>
                <ul className="detail-contrib__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    case "text":
      return (
        <section className="detail-section" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <p className="detail-section__text">{section.body}</p>
        </section>
      );

    case "bullets":
      return (
        <section className="detail-section" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <ul className="detail-bullets">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      );

    case "grid":
      return (
        <section className="detail-section" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <div className="detail-grid">
            {section.items.map((item) => (
              <div key={item.title} className="detail-grid__item">
                <p className="detail-grid__item-title">{item.title}</p>
                <p className="detail-grid__item-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "stack":
      return (
        <section className="detail-section" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <div className="detail-stack">
            {section.items.map((item) => (
              <div key={item.title} className="detail-stack__item">
                <p className="detail-stack__item-title">{item.title}</p>
                <p className="detail-stack__item-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "flow":
      return (
        <section className="detail-section" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <div className="detail-flow">
            {section.steps.map((step, i) => (
              <div className="detail-flow__step" key={step}>
                <span>{step}</span>
                {i < section.steps.length - 1 ? (
                  <span className="detail-flow__arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          {section.caption ? (
            <p className="detail-flow__caption">{section.caption}</p>
          ) : null}
        </section>
      );

    case "stats":
      return (
        <section className="detail-section" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <div className="detail-stats">
            {section.items.map((item) => (
              <div key={item.label} className="detail-stats__item">
                <p className="stat__value">{item.value}</p>
                <p className="stat__label">{item.label}</p>
              </div>
            ))}
          </div>
          {section.caption ? (
            <p className="detail-stats__caption">{section.caption}</p>
          ) : null}
        </section>
      );

    default:
      return null;
  }
}
