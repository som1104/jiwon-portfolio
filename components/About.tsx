import { about } from "@/components/data";

export default function About() {
  return (
    <section className="section" id="about">
      <p className="eyebrow" data-reveal>
        <span className="eyebrow__i">01</span> — Introduction
      </p>
      <div className="about__grid" data-reveal-children>
        <h2 className="about__heading">
          {about.heading[0]}
          <br />
          {about.heading[1]}
        </h2>
        <div className="about__aside">
          <p className="about__quote">
            “ {about.quote[0]}
            <br />
            {about.quote[1]} ”
          </p>
          <p className="about__body">{about.body}</p>
          <div className="about__meta">
            {about.meta.map((m) => (
              <div key={m.k}>
                <div className="about__meta-k">{m.k}</div>
                <div className="about__meta-v">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
