import { techStack } from "@/components/data";

/**
 * Text-first skills section — no icon wall, just groups set in the site's
 * own typography so it reads like the rest of the page rather than a
 * separate "tech badges" widget.
 */
export default function Stack() {
  return (
    <section className="section" id="stack">
      <p className="eyebrow" data-reveal>
        <span className="eyebrow__i">05</span> — Stack
      </p>
      <div className="stack__grid" data-reveal-children>
        {techStack.map((group) => (
          <div key={group.title} className="stack__group">
            <p className="stack__group-title">{group.title}</p>
            <ul className="stack__items">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
