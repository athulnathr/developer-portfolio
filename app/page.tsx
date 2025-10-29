"use client";

import { NewHero } from "@/components/sections/NewHero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { ContentOverlay } from "@/components/ui/ContentOverlay";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useCursorTracking } from "@/hooks/useCursorTracking";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import RoboCanvas to avoid SSR issues with Three.js
// Toggle between implementations:
// const RoboCanvas = dynamic(() => import("@/components/Robo/RoboCanvas").then((mod) => mod.RoboCanvas), { ssr: false, loading: () => null }); // OLD wireframe scene
const RoboCanvas = dynamic(
  () =>
    import("@/components/Robo/SciFiRoboCanvas").then(
      (mod) => mod.SciFiRoboCanvas
    ),
  {
    ssr: false,
    loading: () => null,
  }
); // NEW sci-fi room scene

export default function Home() {
  const hasMounted = useHasMounted();
  const scrollProgress = useScrollProgress();
  const cursorPosition = useCursorTracking();
  const prefersReducedMotion = useReducedMotion();
  const [showParticles, setShowParticles] = useState(false);
  const [transformationLevel, setTransformationLevel] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Simulate loading (replace with actual 3D asset loading detection)
  useEffect(() => {
    if (hasMounted) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Keep initial load flag for camera animation
        setTimeout(() => {
          setIsInitialLoad(false);
        }, 2500);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasMounted]);

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
      {/* Loading Indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-[#00d9ff] border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-[#00d9ff] text-sm font-medium animate-pulse">
                Loading Experience...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar isLoading={isLoading} />

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
              robotType="mechanical"
              isInitialLoad={isInitialLoad}
            />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Content Overlay */}
      {hasMounted && !prefersReducedMotion && (
        <ContentOverlay
          currentSection={scrollProgress.currentSection}
          sectionProgress={
            scrollProgress.sectionProgress[scrollProgress.currentSection]
          }
        />
      )}

      {/* Sections - Robot-centric layout (minimal content, mostly for scroll tracking) */}
      <NewHero />
      <About />
      <Skills />
      <Projects onProjectHover={setHoveredProject} />
      <Contact />
      <Footer />
    </main>
  );
}
