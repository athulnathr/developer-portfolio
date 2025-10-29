"use client";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useCursorTracking } from "@/hooks/useCursorTracking";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useHasMounted } from "@/hooks/useHasMounted";
import { content } from "@/constants/content";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import RoboCanvas to avoid SSR issues with Three.js
const RoboCanvas = dynamic(
  () => import("@/components/Robo/RoboCanvas").then((mod) => mod.RoboCanvas),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  const hasMounted = useHasMounted();
  const scrollProgress = useScrollProgress();
  const cursorPosition = useCursorTracking();
  const prefersReducedMotion = useReducedMotion();
  const [speechBubbleText, setSpeechBubbleText] = useState("");
  const [showParticles, setShowParticles] = useState(false);

  // Update speech bubble based on current section
  useEffect(() => {
    switch (scrollProgress.currentSection) {
      case "hero":
        setSpeechBubbleText(content.hero.greeting);
        break;
      case "about":
        setSpeechBubbleText(content.about.greeting);
        break;
      case "skills":
        setSpeechBubbleText(content.skills.greeting);
        setShowParticles(scrollProgress.sectionProgress.skills > 0.5);
        break;
      case "projects":
        setSpeechBubbleText("Check out my work!");
        break;
      case "contact":
        setSpeechBubbleText(content.contact.greeting);
        break;
      case "footer":
        setSpeechBubbleText(content.footer.goodbye);
        setShowParticles(false);
        break;
      default:
        setSpeechBubbleText("");
    }
  }, [scrollProgress.currentSection, scrollProgress.sectionProgress]);

  return (
    <main className="relative">
      {/* Three.js Canvas with Robo - only if not reduced motion */}
      {hasMounted && !prefersReducedMotion && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <RoboCanvas
              currentSection={scrollProgress.currentSection}
              sectionProgress={
                scrollProgress.sectionProgress[scrollProgress.currentSection]
              }
              cursorPosition={cursorPosition}
              showParticles={showParticles}
            />

            {/* Speech Bubble */}
            {speechBubbleText && (
              <SpeechBubble
                text={speechBubbleText}
                position={{ x: 60, y: 30 }}
                delay={0.5}
              />
            )}
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
