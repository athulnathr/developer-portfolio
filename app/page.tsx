"use client";

import HeroMonolith from "./components/sections/HeroMonolith";
import Navigation from "./components/ui/Navigation";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { useSectionScroll } from "./lib/hooks/useSectionScroll";
import { useEffect, useState } from "react";

export default function Home() {
  const [heroComplete, setHeroComplete] = useState(false);
  const [sectionScrollEnabled, setSectionScrollEnabled] = useState(false);

  // Only enable section scrolling AFTER first scroll attempt post-hero
  useSectionScroll({ enabled: sectionScrollEnabled });

  useEffect(() => {
    // Listen for hero completion via scroll position
    const checkHeroCompletion = () => {
      // Check if we've scrolled past the hero section
      if (window.scrollY > window.innerHeight * 0.5) {
        if (!heroComplete) {
          setHeroComplete(true);
          // Enable section scroll on next scroll attempt
          setTimeout(() => {
            setSectionScrollEnabled(true);
          }, 500);
        }
      }
    };

    // Also listen for manual scroll unlock signal
    const handleHeroComplete = () => {
      setHeroComplete(true);
      // Wait for first scroll, then enable section snap
      const enableSectionScroll = () => {
        setSectionScrollEnabled(true);
        window.removeEventListener("wheel", enableSectionScroll);
        window.removeEventListener("touchmove", enableSectionScroll);
      };

      // Enable on first scroll attempt after completion
      window.addEventListener("wheel", enableSectionScroll, { once: true });
      window.addEventListener("touchmove", enableSectionScroll, { once: true });
    };

    window.addEventListener("scroll", checkHeroCompletion);
    window.addEventListener("heroSequenceComplete", handleHeroComplete);

    return () => {
      window.removeEventListener("scroll", checkHeroCompletion);
      window.removeEventListener("heroSequenceComplete", handleHeroComplete);
    };
  }, [heroComplete]);

  return (
    <>
      <Navigation />
      <main className="relative w-full">
        <div id="home" data-section="0">
          <HeroMonolith />
        </div>
        <div data-section="1">
          <About />
        </div>
        <div data-section="2">
          <Projects />
        </div>
        <div data-section="3">
          <Contact />
        </div>
      </main>
    </>
  );
}
