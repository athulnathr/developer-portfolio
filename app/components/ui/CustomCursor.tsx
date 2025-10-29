"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { throttle } from "../../lib/utils";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const moveCursor = throttle((e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }, 16);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    window.addEventListener("mousemove", moveCursor);
    addHoverListeners();

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();

      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    hover: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
  };

  return (
    <motion.div
      id="custom-cursor"
      ref={cursorRef}
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={isHovering ? "hover" : "default"}
      variants={variants}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="rounded-full pointer-events-none fixed z-[9999]"
    />
  );
}
