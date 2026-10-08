import FrameSlides from "./FrameSlides";
import type { DetailSection as DetailSectionType } from "@/components/data";

/**
 * Renders one case-study block. The shape (`kind`) decides the layout; the
 * content always comes from `projectDetails` in components/data.ts so every
 * project page is built from the same small set of primitives.
 */
export default function DetailSection({ section }: { section: DetailSectionType }) {
  switch (section.kind) {
    case "showcase":
      return (
        <section className="detail-section detail-section--wide" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          {section.intro ? <p className="detail-section__lede">{section.intro}</p> : null}
          <div className="detail-show">
            {section.rows.map((row) => (
              <article
                key={row.label}
                className={`detail-show__row detail-show__row--${row.layout}${
                  row.images[0] && row.images[0].w > row.images[0].h ? " detail-show__row--landscape" : ""
                }${row.tight ? " detail-show__row--tight" : ""}`}
              >
                <div
                  className={`detail-show__media${
                    row.images.length > 1 ? " detail-show__media--multi" : ""
                  }`}
                >
                  {row.slides?.length ? (
                    <FrameSlides slides={row.slides} interval={row.slideInterval} />
                  ) : (
                    <>
                    {row.images.map((img) => (
                      <figure
                        className="detail-shot"
                        key={img.src}
                        style={{ maxWidth: img.w }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          width={img.w}
                          height={img.h}
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                    ))}
                    </>
                  )}
                </div>
                <div className="detail-show__text">
                  <p className="detail-show__label">{row.label}</p>
                  <h3 className="detail-show__title">{row.title}</h3>
                  {row.lead ? <p className="detail-show__lead">{row.lead}</p> : null}
                  {row.contribution?.length ? (
                    <div className="detail-show__contrib">
                      <p className="detail-show__k">My Contribution</p>
                      <ul>
                        {row.contribution.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {row.blocks?.length ? (
                    <dl className="detail-show__blocks">
                      {row.blocks.map((b) => (
                        <div key={b.k}>
                          <dt className="detail-show__k">{b.k}</dt>
                          <dd>{b.v}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      );

    case "screens":
      return (
        <section className="detail-section detail-section--wide" data-reveal>
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
          {section.note ? <p className="detail-flow__caption">{section.note}</p> : null}
          <ol className="detail-screens">
            {section.items.map((item, i) => (
              <li className="detail-screens__item" key={item.src}>
                <figure className="detail-shot detail-shot--phone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={`${item.title} 화면`}
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <p className="detail-screens__stage">
                  <span>{String(i + 1).padStart(2, "0")}</span> {item.stage}
                </p>
                <p className="detail-screens__title">{item.title}</p>
                <p className="detail-screens__note">{item.note}</p>
              </li>
            ))}
          </ol>
        </section>
      );

    case "fixes":
      return (
        <section className="detail-section detail-section--wide" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          {section.note ? <p className="detail-section__lede">{section.note}</p> : null}
          <div className="detail-fixes">
            <div className="detail-fixes__media">
              {section.images.map((img) => (
                <figure className="detail-shot detail-shot--phone" key={img.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
            <ol className="detail-fixes__list">
              {section.items.map((item, i) => (
                <li key={item.problem}>
                  <p className="detail-show__k">
                    Problem {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="detail-fixes__problem">{item.problem}</p>
                  <p className="detail-show__k detail-fixes__fixk">Fix</p>
                  <p className="detail-fixes__fix">{item.fix}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );

    case "result":
      return (
        <section className="detail-section" data-reveal>
          <h2 className="detail-section__title">{section.title}</h2>
          <ol className="detail-result">
            {section.items.map((item, i) => (
              <li key={item} className="detail-result__item">
                <span className="detail-insight__label">{String(i + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>
      );

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
        <section
          className={`detail-section${section.groups.length === 4 ? " detail-section--wide" : ""}`}
          data-reveal
        >
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
        <section
          className={`detail-section${section.items.length === 4 ? " detail-section--row4" : ""}`}
          data-reveal
        >
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
