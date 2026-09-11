import { notes } from "@/components/data";

export default function Notes() {
  return (
    <section className="section" id="notes">
      <p className="eyebrow" data-reveal>
        <span className="eyebrow__i">05</span> — Notes
      </p>
      <div className="notes__grid" data-reveal-children>
        {notes.map((n) => (
          <a className="note" href="#" key={n.date}>
            <div className="note__date">{n.date}</div>
            <div className="note__title">{n.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
