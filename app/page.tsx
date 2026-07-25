import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden bg-black text-white">
      <Hero />
      <Statistics />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}