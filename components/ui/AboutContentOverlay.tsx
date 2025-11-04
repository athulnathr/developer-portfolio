"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/constants/content";

interface AboutContentOverlayProps {
  isVisible: boolean;
  scrollProgress: number;
}

/**
 * About Me content overlay that appears on the left side
 * when the human walks to the wall (right side)
 */
export const AboutContentOverlay: React.FC<AboutContentOverlayProps> = ({
  isVisible,
  scrollProgress,
}) => {
  // Show content after human has reached the wall (progress > 0.7)
  const shouldShow = isVisible && scrollProgress > 0.7;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed left-0 top-0 h-screen z-30 pointer-events-none flex items-center"
        >
          <div className="w-screen md:w-[45vw] lg:w-[40vw] px-6 md:px-12 lg:px-16">
            {/* Background with blur */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent backdrop-blur-sm" />

            {/* Content */}
            <div className="relative z-10 max-w-xl pointer-events-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-[#00d9ff] to-[#0088cc] bg-clip-text text-transparent"
              >
                About Me
              </motion.h2>

              {content.about.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Timeline */}
              <div className="mt-8 md:mt-12">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-[#00d9ff]"
                >
                  Journey
                </motion.h3>
                <div className="space-y-4 md:space-y-6">
                  {content.about.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      className="flex gap-4 md:gap-6"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#0088cc] flex items-center justify-center font-bold text-sm md:text-base">
                          {item.year}
                        </div>
                      </div>
                      <div className="flex-1 pt-2">
                        <h4 className="font-semibold text-base md:text-lg mb-1 text-white">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm md:text-base">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
