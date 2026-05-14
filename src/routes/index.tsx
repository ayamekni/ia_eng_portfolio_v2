import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Publications } from "@/components/portfolio/Publications";
import { Certifications } from "@/components/portfolio/Certifications";
import { Languages } from "@/components/portfolio/Languages";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ParticlesBg } from "@/components/portfolio/ParticlesBg";
import { Cursor } from "@/components/portfolio/Cursor";
import { ChatWidget } from "@/components/portfolio/ChatWidget";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <ParticlesBg />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <Certifications />
        <Languages />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
