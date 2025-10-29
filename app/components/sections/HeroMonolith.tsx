"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import LoadingAnimation from "../hero-monolith/LoadingAnimation";
import InteractionHint from "../hero-monolith/InteractionHint";
import TextSequence from "../hero-monolith/TextSequence";
import MonolithCursor from "../hero-monolith/MonolithCursor";
import { useScreenShake } from "@/app/lib/hooks/useScreenShake";

// Dynamically import Three.js scene (client-side only)
const MonolithScene = dynamic(() => import("../hero-monolith/MonolithScene"), {
  ssr: false,
});

type Phase =
  | "loading"
  | "interactive"
  | "shattered"
  | "reassembling"
  | "text-sequence"
  | "complete";

export default function HeroMonolith() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [crackStage, setCrackStage] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [monolithPosition, setMonolithPosition] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const { shake } = useScreenShake();

  // Lock scroll on mount
  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = "hidden";
      // Lenis integration
      const lenis = (window as any).lenis;
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
    };
  }, [scrollLocked]);

  // Handle loading complete
  const handleLoadingComplete = useCallback(() => {
    setPhase("interactive");
  }, []);

  // Handle crack progression
  const handleCrackProgression = useCallback(() => {
    setCrackStage((prev) => {
      const newStage = Math.min(prev + 1, 2);
      // Shake with increasing intensity
      shake({ intensity: 5 + newStage * 3, duration: 300 });
      return newStage;
    });
  }, [shake]);

  // Handle shatter
  const handleShatter = useCallback(() => {
    setPhase("shattered");
    // Strong shake for shatter
    shake({ intensity: 20, duration: 600, frequency: 40 });
  }, [shake]);

  // Handle reassembly complete
  const handleReassembleComplete = useCallback(() => {
    setPhase("text-sequence");
    // Shift monolith to left
    setMonolithPosition([-3, 0, 0]);
  }, []);

  // Handle text sequence complete
  const handleTextComplete = useCallback(() => {
    setPhase("complete");
    setScrollLocked(false);
  }, []);

  // Scroll detection for reassembly
  useEffect(() => {
    if (phase !== "shattered") return;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      // Trigger reassembly on scroll attempt
      setPhase("reassembling");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow keys, space, page down
      if (
        ["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp"].includes(e.code)
      ) {
        e.preventDefault();
        setPhase("reassembling");
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Allow small movements but trigger on significant scroll
      const touch = e.touches[0];
      const scrollThreshold = 50;

      if (
        Math.abs(touch.clientY - (window as any).touchStartY) > scrollThreshold
      ) {
        e.preventDefault();
        setPhase("reassembling");
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      (window as any).touchStartY = e.touches[0].clientY;
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [phase]);

  // Keyboard navigation for crack progression
  useEffect(() => {
    if (phase !== "interactive") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        if (crackStage < 2) {
          handleCrackProgression();
        } else {
          handleShatter();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, crackStage, handleCrackProgression, handleShatter]);

  const getHintMessage = () => {
    if (phase === "interactive") {
      if (crackStage === 0) return "Click the monolith to interact";
      if (crackStage === 1) return "Click again to crack further";
      if (crackStage === 2) return "One more click to shatter";
    }
    if (phase === "shattered") return "Scroll to continue";
    return "";
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Loading Animation */}
      <AnimatePresence>
        {phase === "loading" && (
          <LoadingAnimation onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Three.js Scene */}
      {phase !== "loading" && (
        <div
          className="absolute inset-0"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <MonolithScene
            crackStage={crackStage}
            onCrackProgression={handleCrackProgression}
            phase={
              phase === "text-sequence" || phase === "complete"
                ? "complete"
                : phase
            }
            onShatter={handleShatter}
            onReassembleComplete={handleReassembleComplete}
            monolithPosition={monolithPosition}
          />
        </div>
      )}

      {/* Custom Cursor */}
      <MonolithCursor
        active={phase !== "loading" && phase !== "complete"}
        hovering={hovering}
        crackStage={crackStage}
      />

      {/* Interaction Hint */}
      <InteractionHint
        visible={phase === "interactive" || phase === "shattered"}
        message={getHintMessage()}
      />

      {/* Text Sequence */}
      <TextSequence
        active={phase === "text-sequence"}
        onComplete={handleTextComplete}
      />

      {/* Accessibility announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        {phase === "interactive" && `Crack stage ${crackStage} of 3`}
        {phase === "shattered" && "Monolith shattered. Scroll to reassemble."}
        {phase === "reassembling" && "Reassembling monolith..."}
        {phase === "text-sequence" && "Revealing text..."}
        {phase === "complete" && "Sequence complete. You may scroll."}
      </div>
    </section>
  );
}
