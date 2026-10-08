import SiteFooter from "@/components/ds/SiteFooter";
import { footer } from "@/components/data";

/** `projectsHref`: where the footer "Projects" link goes (detail pages point it at the main page). */
export default function Footer({ projectsHref }: { projectsHref?: string }) {
  return (
    <div className="contact" id="contact" data-reveal="fade">
      <SiteFooter
        wordmark={footer.wordmark}
        tagline={footer.tagline}
        email={footer.email}
        note={footer.note}
        columns={footer.columns.map((col) => ({
          ...col,
          links: col.links.map((l) =>
            projectsHref && l.label === "Projects" ? { ...l, href: projectsHref } : l,
          ),
        }))}
      />
    </div>
  );
}
