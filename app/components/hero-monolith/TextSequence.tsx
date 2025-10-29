"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TextSequenceProps {
  active: boolean;
  textIndex: number; // -1 = none, 0, 1, 2 = which texts to show
  onComplete: () => void;
}

const texts = [
  { text: "Create experiences.", delay: 0 },
  { text: "Do storytell.", delay: 1.5 },
  { text: "I am Athul Nath.", delay: 3, isMain: true },
];

export default function TextSequence({
  active,
  textIndex,
  onComplete,
}: TextSequenceProps) {
  useEffect(() => {
    // When all texts are shown (textIndex 2), trigger completion after delay
    if (active && textIndex === 2) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [active, textIndex, onComplete]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 max-w-4xl flex flex-col items-start">
        {texts.map((item, index) => {
          // Only show texts up to textIndex
          if (index > textIndex) return null;

          return (
            <div
              key={index}
              className={`mb-8 ${
                item.isMain
                  ? "text-7xl md:text-9xl font-bold"
                  : "text-5xl md:text-6xl font-light"
              }`}
              style={{
                opacity: 1,
              }}
            >
              {item.text.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={
                    item.isMain
                      ? "inline-block text-white drop-shadow-[0_0_30px_rgba(99,102,241,0.8)]"
                      : "inline-block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                  }
                  style={{
                    animation: `fadeInUp 0.5s ease forwards ${
                      charIndex * 0.03
                    }s`,
                    opacity: 0,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
