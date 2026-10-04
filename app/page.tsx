import { About } from "@/components/about";
import { Archive } from "@/components/archive";
import { Contact } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Mm44 } from "@/components/mm44";
import { Navigation } from "@/components/navigation";
import { ProjectProgress } from "@/components/project-progress";
import { ProjectSection } from "@/components/project-section";
import { ScrollEffects } from "@/components/scroll-effects";
import { WorkIndex } from "@/components/work-index";
import zaneWebsite from "@/public/assets/zane-website.webp";
import oldTraditions from "@/public/assets/old-traditions.webp";

export default function Home() {
  return (
    <>
      <Navigation />
      <ProjectProgress />

      <main>
        <Hero />
        <Intro />
        <WorkIndex />

        <ProjectSection
          id="zane-briges"
          no="01"
          title={["zane briģes", "veterinārā klīnika"]}
          meta={["website", "riga", "2026"]}
          role="web design / web development"
          href="https://www.zanevet.lv"
          image={zaneWebsite}
          alt="homepage of the zane briģes veterinary clinic website: a black cat being examined by a veterinarian"
        />

        <ProjectSection
          id="old-traditions"
          no="02"
          title={["old traditions"]}
          meta={["e-commerce", "website"]}
          role="web design / digital"
          description="premium seafood and caviar website."
          href="https://www.oldtraditions.org"
          image={oldTraditions}
          alt="homepage of the old traditions website: a lobster claw against a black background with smoke"
          tone="light"
          layout="wide"
        />

        <Mm44 />
        <Archive />
        <About />
      </main>

      <Contact />
      <Cursor />
      <ScrollEffects />
    </>
  );
}
