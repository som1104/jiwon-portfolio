import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import SiteHeader from "@/components/ds/SiteHeader";
import Button from "@/components/ds/Button";
import { navItems, hero, footer } from "@/components/data";

/**
 * Slide 0. The photo starts as a small card in the middle of a blurred
 * full-bleed version of itself; the first wheel gesture opens it to fill the
 * viewport (driven by components/SectionScroll.tsx) and the lead + CTA fade
 * in over its lower edge. The nav header floats over everything.
 */
export default function Hero() {
  return (
    <section className="hero-expand" id="top" data-slide>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/hero.png"
        bgImageSrc="/images/hero.png"
        title={hero.title}
        date={hero.eyebrow}
        scrollToExpand={hero.scrollHint}
        textBlend
        overlay={
          <div className="hero__header">
            <SiteHeader
              wordmark={footer.wordmark}
              items={navItems}
              action="Contact"
              tone="inverse"
            />
          </div>
        }
      >
        <div className="hero-expand__content">
          <p className="hero-expand__lead">{hero.lead}</p>
          <Button href="#work" variant="inverse" size="lg">
            {hero.cta}
          </Button>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
