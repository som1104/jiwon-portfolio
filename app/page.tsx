import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import ProjectSection from "@/components/ProjectSection";
import { projects } from "@/components/data";
import MarqueeBand from "@/components/MarqueeBand";
import Footer from "@/components/Footer";

/**
 * Hero → About (the Introduction bridge + full background story, combined
 * in one section) → one full-screen slide per Selected Work project →
 * Stack → Contact. Every `[data-slide]` is one stop for SectionScroll; the
 * hero and the project sections mark themselves, the rest are wrapped here
 * so the section components stay layout-agnostic. Deep project case
 * studies live on their own routes (app/projects/[slug]).
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <div className="slide" data-slide>
        <About />
      </div>
      {projects.map((p, i) => (
        <ProjectSection
          key={p.id}
          project={p}
          position={i + 1}
          total={projects.length}
          sectionIndex={String(i + 2).padStart(2, "0")}
        />
      ))}
      <div className="slide" data-slide>
        <Stack />
      </div>
      <div className="slide slide--end" data-slide>
        <MarqueeBand />
        <Footer />
      </div>
    </main>
  );
}
