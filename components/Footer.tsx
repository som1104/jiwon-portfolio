import SiteFooter from "@/components/ds/SiteFooter";
import { footer } from "@/components/data";

export default function Footer() {
  return (
    <div className="contact" id="contact" data-reveal="fade">
      <SiteFooter
        wordmark={footer.wordmark}
        tagline={footer.tagline}
        email={footer.email}
        note={footer.note}
        columns={footer.columns}
      />
    </div>
  );
}
