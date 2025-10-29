import HeroMonolith from "./components/sections/HeroMonolith";
import Navigation from "./components/ui/Navigation";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative w-full overflow-hidden">
        <div id="home">
          <HeroMonolith />
        </div>
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
