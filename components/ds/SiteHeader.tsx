type SiteHeaderProps = {
  wordmark: string;
  items: string[];
  action?: string;
  tone?: "ink" | "inverse";
};

/**
 * Sticky-height header. Transparent white-on-photo over the hero (inverse),
 * navigates on words. Nav targets are the lowercased item names as anchors.
 * The action (Contact) is styled like the other items: no underline at rest,
 * hairline underline on hover.
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
          <a className="site-header__link" href="#contact">
            {action}
          </a>
        ) : null}
      </nav>
    </header>
  );
}
