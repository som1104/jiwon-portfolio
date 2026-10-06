import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import SiteHeader from "@/components/ds/SiteHeader";
import Button from "@/components/ds/Button";
import { navItems, hero, footer } from "@/components/data";

/**
 * Slide 0. The photo starts as a small card in the middle of a blurred
 * full-bleed version of itself; the first wheel gesture opens it to fill the
 * viewport (driven by components/SectionScroll.tsx); the two title lines part
 * left / right as it grows, and a short statement + CTA fades up in the lower
 * left once it is open. The nav header floats over everything.
 */
export default function Hero() {
  return (
    <section className="hero-expand" id="top" data-slide>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/hero.png"
        bgImageSrc="/images/hero-bg.png"
        title={hero.title}
        subtitle={hero.subtitle}
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
          <h2 className="hero-expand__statement">
            {hero.statement[0]}
            <br />
            {hero.statement[1]}
          </h2>
          <p className="hero-expand__desc">
            {hero.description[0]}
            <br />
            {hero.description[1]}
          </p>
          <Button href={hero.ctaHref} variant="inverse" size="lg">
            {hero.cta}
          </Button>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
