"use client";

import { motion } from "framer-motion";
import { content } from "@/constants/content";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { ParallaxBackground } from "@/components/effects/ParallaxBackground";
import { useEffect, useState } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";

export const Hero: React.FC = () => {
  const hasMounted = useHasMounted();
  const [typedText, setTypedText] = useState("");
  const fullText = content.hero.title;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background-dark via-background to-background-light"
    >
      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Animated background geometric patterns */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={
            hasMounted
              ? {
                  rotate: 360,
                }
              : {}
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary rounded-lg"
          style={{ transform: "rotate(45deg)" }}
        />
        <motion.div
          animate={
            hasMounted
              ? {
                  rotate: -360,
                }
              : {}
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-secondary rounded-lg"
          style={{ transform: "rotate(15deg)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={false}
          animate={hasMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-16 md:h-24 bg-primary ml-2"
              />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={false}
          animate={hasMounted ? { opacity: 1, y: 0 } : {}}
          className="text-xl md:text-2xl text-gray-400 mb-4"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.p
          initial={false}
          animate={hasMounted ? { opacity: 1, y: 0 } : {}}
          className="text-lg text-gray-500 max-w-2xl mx-auto"
        >
          {content.hero.description}
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};
