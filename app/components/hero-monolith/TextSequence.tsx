"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TextSequenceProps {
  active: boolean;
  onComplete: () => void;
}

const texts = [
  { text: "Create experiences.", delay: 0 },
  { text: "Do storytell.", delay: 1.5 },
  { text: "I am Athul Nath.", delay: 3, isMain: true },
];

export default function TextSequence({
  active,
  onComplete,
}: TextSequenceProps) {
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    if (!active) {
      setVisibleIndex(-1);
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    texts.forEach((item, index) => {
      const timer = setTimeout(() => {
        setVisibleIndex(index);

        // Call onComplete after last text
        if (index === texts.length - 1) {
          setTimeout(onComplete, 2000);
        }
      }, item.delay * 1000);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [active, onComplete]);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      <div className="w-full max-w-6xl px-8 ml-[10%]">
        <AnimatePresence mode="sync">
          {texts.map((item, index) => {
            if (index > visibleIndex) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`mb-6 ${
                  item.isMain
                    ? "text-7xl md:text-8xl font-bold"
                    : "text-4xl md:text-5xl font-light"
                }`}
              >
                {item.text.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: charIndex * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={
                      item.isMain
                        ? "inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400"
                        : "inline-block text-zinc-300"
                    }
                    style={{
                      textShadow: item.isMain
                        ? "0 0 30px rgba(99, 102, 241, 0.5)"
                        : "none",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
