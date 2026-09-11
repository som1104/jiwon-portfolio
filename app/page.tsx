import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import ProjectSection from "@/components/ProjectSection";
import { projects } from "@/components/data";
import Stats from "@/components/Stats";
import Capabilities from "@/components/Capabilities";
import Notes from "@/components/Notes";
import MarqueeBand from "@/components/MarqueeBand";
import Footer from "@/components/Footer";

/**
 * Every `[data-slide]` is one full-page stop for SectionScroll. The hero and
 * the project sections mark themselves; the rest are wrapped here so the
 * section components stay layout-agnostic.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <div className="slide" data-slide>
        <About />
      </div>
      <div className="slide" data-slide>
        <Work />
      </div>
      {/* one full-screen section per project; the Work cards link here */}
      {projects.map((p, i) => (
        <ProjectSection
          key={p.id}
          project={p}
          position={i + 1}
          total={projects.length}
          sectionIndex="03"
        />
      ))}
      <div className="slide slide--surface" data-slide>
        <Stats />
      </div>
      <div className="slide" data-slide>
        <Capabilities />
      </div>
      <div className="slide" data-slide>
        <Notes />
      </div>
      <div className="slide slide--end" data-slide>
        <MarqueeBand />
        <Footer />
      </div>
    </main>
  );
}
