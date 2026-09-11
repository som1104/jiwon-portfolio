import TextLink from "./TextLink";

type SiteHeaderProps = {
  wordmark: string;
  items: string[];
  action?: string;
  tone?: "ink" | "inverse";
};

/**
 * Sticky-height header. Transparent white-on-photo over the hero (inverse),
 * navigates on words. Nav targets are the lowercased item names as anchors.
 */
export default function SiteHeader({
  wordmark,
  items,
  action,
  tone = "ink",
}: SiteHeaderProps) {
  const inverse = tone === "inverse";
  return (
    <header
      className={`site-header${inverse ? " site-header--inverse" : ""}`}
    >
      <a className="site-header__wordmark" href="#top">
        {wordmark}
      </a>
      <nav className="site-header__nav">
        {items.map((item) => (
          <a
            key={item}
            className="site-header__link"
            href={`#${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
        {action ? (
          <TextLink
            href="#contact"
            size="caption"
            tone={inverse ? "inverse" : "default"}
          >
            {action}
          </TextLink>
        ) : null}
      </nav>
    </header>
  );
}
