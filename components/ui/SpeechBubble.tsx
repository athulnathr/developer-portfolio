"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  position?: { x: number; y: number };
  delay?: number;
  typingSpeed?: number;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  position = { x: 50, y: 50 },
  delay = 0,
  typingSpeed = 50,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative bg-white text-gray-900 px-6 py-3 rounded-2xl shadow-xl">
        <div className="text-lg font-medium">{displayText}</div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
      </div>
    </motion.div>
  );
};
