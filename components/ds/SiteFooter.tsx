import Link from "next/link";
import Label from "./Label";
import TextLink from "./TextLink";

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

type SiteFooterProps = {
  wordmark: string;
  email: string;
  note?: string;
  tagline: string;
  columns: FooterColumn[];
};

/** The one large black area on the page. */
export default function SiteFooter({
  wordmark,
  email,
  note,
  tagline,
  columns,
}: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <a className="site-footer__email" href={`mailto:${email}`}>
            {email}
          </a>
          {note ? <p className="site-footer__note">{note}</p> : null}
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <Label tone="inverse">{col.title}</Label>
            <div className="site-footer__links">
              {col.links.map((link) =>
                link.href === "#" ? (
                  // no destination yet (e.g. Resume) — show it as clearly
                  // unavailable instead of a link that jumps nowhere
                  <span
                    key={link.label}
                    className="site-footer__disabled"
                    aria-disabled="true"
                  >
                    {link.label} (준비 중)
                  </span>
                ) : link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    scroll={false}
                    className="textlink textlink--inverse textlink--plain"
                  >
                    {link.label}
                  </Link>
                ) : (
                <TextLink
                  key={link.label}
                  href={link.href}
                  tone="inverse"
                  underline={false}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </TextLink>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="site-footer__bottom">
        <Label tone="inverse">
          {wordmark} — {tagline}
        </Label>
        <Label tone="inverse">© {year}</Label>
      </div>
    </footer>
  );
}
