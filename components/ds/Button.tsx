import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "inverse";
  size?: "lg";
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Square-cornered action. Only the shapes the portfolio actually uses are
 * ported from the KONONENKO kit (inverse / lg, always a link).
 */
export default function Button({
  children,
  href,
  variant = "inverse",
  size = "lg",
  className,
  ...rest
}: ButtonProps) {
  const classes = ["btn", `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
