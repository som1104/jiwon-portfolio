import { capabilities } from "@/components/data";

export default function Capabilities() {
  return (
    <section className="section" id="stack">
      <p className="eyebrow" data-reveal>
        <span className="eyebrow__i">04</span> — Capabilities
      </p>
      <div className="caps__grid" data-reveal-children>
        {capabilities.map((c) => (
          <div className="cap" key={c.index}>
            <div className="cap__i">{c.index}</div>
            <h3 className="cap__title">{c.title}</h3>
            <p className="cap__body">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
