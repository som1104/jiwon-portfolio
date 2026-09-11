import type { AnchorHTMLAttributes, ReactNode } from "react";

type TextLinkProps = {
  children: ReactNode;
  href: string;
  tone?: "default" | "inverse";
  size?: "body" | "caption";
  underline?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** Text link with the hairline underline that clears on hover. */
export default function TextLink({
  children,
  href,
  tone = "default",
  size = "body",
  underline = true,
  className,
  ...rest
}: TextLinkProps) {
  const classes = [
    "textlink",
    tone === "inverse" && "textlink--inverse",
    size === "caption" && "textlink--caption",
    !underline && "textlink--plain",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
