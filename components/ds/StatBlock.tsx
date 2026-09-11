type StatBlockProps = {
  value: string;
  label: string;
  suffix?: string;
};

/** A single figure with a tracked caption beneath it. */
export default function StatBlock({ value, label, suffix }: StatBlockProps) {
  return (
    <div className="stat">
      <div className="stat__value">
        {value}
        {suffix ? <span className="stat__suffix">{suffix}</span> : null}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}
