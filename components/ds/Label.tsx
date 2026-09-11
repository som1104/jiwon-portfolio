import type { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
  tone?: "muted" | "inverse";
  className?: string;
};

/** Uppercase 12px micro-label — the connective tissue of the layout. */
export default function Label({ children, tone = "muted", className }: LabelProps) {
  const classes = ["label", tone === "inverse" && "label--inverse", className]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
