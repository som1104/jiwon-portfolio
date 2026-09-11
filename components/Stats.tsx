import StatBlock from "@/components/ds/StatBlock";
import { stats } from "@/components/data";

export default function Stats() {
  return (
    <section className="stats" aria-label="By the numbers">
      <div className="stats__grid" data-reveal-children>
        {stats.map((s) => (
          <StatBlock
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
          />
        ))}
      </div>
    </section>
  );
}
