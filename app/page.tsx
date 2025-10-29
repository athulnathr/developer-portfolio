"use client";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useCursorTracking } from "@/hooks/useCursorTracking";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useHasMounted } from "@/hooks/useHasMounted";
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
  const [showParticles, setShowParticles] = useState(false);
  const [transformationLevel, setTransformationLevel] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Update transformation level for Skills section
  useEffect(() => {
    if (scrollProgress.currentSection === "skills") {
      const progress = scrollProgress.sectionProgress.skills;
      const level = Math.floor(progress * 4); // 0-3 transformation stages
      setTransformationLevel(Math.min(level, 3));
      setShowParticles(progress > 0.3);
    } else {
      setShowParticles(false);
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
              transformationLevel={transformationLevel}
              onProjectHover={hoveredProject}
            />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects onProjectHover={setHoveredProject} />
      <Contact />
      <Footer />
    </main>
  );
}
