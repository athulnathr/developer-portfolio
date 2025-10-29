"use client";

import { motion } from "framer-motion";

interface MonolithLogoProps {
  onClick?: () => void;
  className?: string;
}

/**
 * Monolith "I" logo with glow effect
 * Animated on hover, clickable to scroll to hero
 */
export default function MonolithLogo({
  onClick,
  className = "",
}: MonolithLogoProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Scroll to top"
    >
      <svg
        width="32"
        height="40"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Main I shape */}
        <rect
          x="12"
          y="0"
          width="8"
          height="40"
          fill="url(#logo-gradient)"
          className="transition-all duration-300"
        />
        {/* Top serif */}
        <rect
          x="6"
          y="0"
          width="20"
          height="4"
          fill="url(#logo-gradient)"
          className="transition-all duration-300"
        />
        {/* Bottom serif */}
        <rect
          x="6"
          y="36"
          width="20"
          height="4"
          fill="url(#logo-gradient)"
          className="transition-all duration-300"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient
            id="logo-gradient"
            x1="16"
            y1="0"
            x2="16"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#818cf8" />
            <stop offset="0.5" stopColor="#6366f1" />
            <stop offset="1" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0 blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.button>
  );
}
