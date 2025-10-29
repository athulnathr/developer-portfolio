"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TextSequenceProps {
  active: boolean;
  textIndex: number; // -1 = none, 0, 1, 2 = which text to show
  onComplete?: () => void; // Optional, not used anymore
}

const texts = [
  { text: "create experiences", isMain: false },
  { text: "do storytelling", isMain: false },
  { text: "am Athul Nath", isMain: true },
];

export default function TextSequence({ active, textIndex }: TextSequenceProps) {
  if (!active || textIndex < 0) return null;

  const currentText = texts[textIndex];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={textIndex}
          initial={{ opacity: 0, x: "100vw" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-30vw" }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 20, mass: 1 },
            opacity: { duration: 0.4 },
          }}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[10%] w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw]"
        >
          <div
            className={`${
              currentText.isMain
                ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
                : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light"
            } text-white leading-tight`}
          >
            {currentText.text.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + charIndex * 0.03,
                  duration: 0.3,
                }}
                className={
                  currentText.isMain
                    ? "inline-block drop-shadow-[0_0_30px_rgba(99,102,241,0.8)]"
                    : "inline-block drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                }
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
