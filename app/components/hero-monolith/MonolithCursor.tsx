"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface MonolithCursorProps {
  active: boolean;
  hovering: boolean;
  crackStage: number;
}

export default function MonolithCursor({
  active,
  hovering,
  crackStage,
}: MonolithCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorX = useSpring(0, { damping: 30, stiffness: 200 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [active, cursorX, cursorY]);

  if (!active) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: hovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Inner dot */}
          <motion.div
            className="w-2 h-2 bg-indigo-500 rounded-full"
            animate={{
              scale: hovering ? 0 : 1,
            }}
          />

          {/* Outer ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              width: hovering ? 48 : 32,
              height: hovering ? 48 : 32,
              borderColor: hovering ? "#818cf8" : "#6366f1",
            }}
            style={{
              border: "2px solid",
              borderRadius: "50%",
            }}
          />

          {/* Crosshair when hovering */}
          {hovering && (
            <>
              <motion.div
                className="absolute top-1/2 left-1/2 w-8 h-px bg-indigo-400"
                style={{ translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-px h-8 bg-indigo-400"
                style={{ translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
              />
            </>
          )}

          {/* Crack indicator */}
          {hovering && crackStage > 0 && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-indigo-400 whitespace-nowrap"
              style={{ marginTop: 32 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Click {3 - crackStage} more{" "}
              {3 - crackStage === 1 ? "time" : "times"}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-indigo-500/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </>
  );
}
