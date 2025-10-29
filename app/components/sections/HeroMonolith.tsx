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
  >([0, 2, 0]);
  const [textIndex, setTextIndex] = useState(-1); // -1 = none, 0, 1, 2 = text progression
  const { shake } = useScreenShake();

  // Lock scroll on mount - COMPREHENSIVE SCROLL BLOCKING
  useEffect(() => {
    if (scrollLocked) {
      // Prevent all scrolling mechanisms
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";

      // Stop Lenis
      const lenis = (window as any).lenis;
      if (lenis) lenis.stop();

      // Prevent all scroll events
      const preventScroll = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      // Add listeners to catch all scroll attempts
      window.addEventListener("scroll", preventScroll, { passive: false });
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("scroll", preventScroll, { passive: false });

      return () => {
        // Cleanup
        window.removeEventListener("scroll", preventScroll);
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        document.removeEventListener("scroll", preventScroll);
      };
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";

      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
    }
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
    setMonolithPosition([-3, 2, 0]);
  }, []);

  // Handle text sequence complete
  const handleTextComplete = useCallback(() => {
    setPhase("complete");
    setScrollLocked(false);

    // Dispatch custom event to notify page
    window.dispatchEvent(new CustomEvent("heroSequenceComplete"));
  }, []);

  // Scroll detection for progressive text reveal - CAPTURE PHASE
  useEffect(() => {
    if (phase !== "interactive" && phase !== "text-sequence") return;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (phase === "interactive") {
        // First scroll: start text sequence with first text
        setPhase("text-sequence");
        setTextIndex(0);
        setMonolithPosition([-3, 2, 0]);
      } else if (phase === "text-sequence") {
        // Subsequent scrolls: advance text or complete
        if (textIndex < 2) {
          // Advance to next text (0->1, 1->2)
          setTextIndex((prev) => prev + 1);
        } else if (textIndex === 2) {
          // All 3 texts shown, one more scroll to complete
          setPhase("complete");
          setScrollLocked(false);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow keys, space, page down
      if (
        ["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp"].includes(e.code)
      ) {
        e.preventDefault();
        e.stopPropagation();

        if (phase === "interactive") {
          setPhase("text-sequence");
          setTextIndex(0);
          setMonolithPosition([-3, 2, 0]);
        } else if (phase === "text-sequence") {
          if (textIndex < 2) {
            setTextIndex((prev) => prev + 1);
          } else if (textIndex === 2) {
            setPhase("complete");
            setScrollLocked(false);
          }
        }
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
        e.stopPropagation();

        if (phase === "interactive") {
          setPhase("text-sequence");
          setTextIndex(0);
          setMonolithPosition([-3, 2, 0]);
        } else if (phase === "text-sequence") {
          if (textIndex < 2) {
            setTextIndex((prev) => prev + 1);
          } else if (textIndex === 2) {
            setPhase("complete");
            setScrollLocked(false);
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      (window as any).touchStartY = e.touches[0].clientY;
    };

    // Use capture: true to fire BEFORE the scroll blocking listeners
    window.addEventListener("wheel", handleScroll, {
      passive: false,
      capture: true,
    });
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", handleScroll, true);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove, true);
    };
  }, [phase, textIndex]);

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
      return "Scroll to begin";
    }
    if (phase === "text-sequence") {
      if (textIndex === 0) return "Scroll for next";
      if (textIndex === 1) return "Scroll for next";
      if (textIndex === 2) return "Scroll to continue";
    }
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
          className="absolute inset-0 z-0"
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
        visible={phase === "interactive" || phase === "text-sequence"}
        message={getHintMessage()}
      />

      {/* Text Sequence */}
      <TextSequence
        active={phase === "text-sequence" || phase === "complete"}
        textIndex={textIndex}
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
