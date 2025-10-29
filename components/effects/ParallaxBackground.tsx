"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ParallaxBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1 - Slowest */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Layer 2 - Medium */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
      >
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Layer 3 - Fastest with geometric shapes */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Floating geometric shapes */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-primary/20 rotate-45 rounded-lg" />
        <div className="absolute top-1/4 right-1/3 w-24 h-24 border border-secondary/20 rotate-12 rounded-lg" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 border border-accent/20 -rotate-30 rounded-lg" />
      </motion.div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
