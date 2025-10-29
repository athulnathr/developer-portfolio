"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionName } from "@/hooks/useScrollProgress";
import { content } from "@/constants/content";

interface ContentOverlayProps {
  currentSection: SectionName;
  sectionProgress: number;
}

export const ContentOverlay: React.FC<ContentOverlayProps> = ({
  currentSection,
  sectionProgress,
}) => {
  // Only show content when section is sufficiently in view
  const isVisible = sectionProgress > 0.2 && sectionProgress < 0.9;

  const getContent = () => {
    switch (currentSection) {
      case "hero":
        return null; // No text content in hero
      case "about":
        return (
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d9ff] to-[#0088cc] bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {content.about.bio}
            </p>
          </div>
        );
      case "skills":
        return (
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d9ff] to-[#0088cc] bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-300">
              Watch as the robot absorbs and masters various technologies!
            </p>
          </div>
        );
      case "projects":
        return (
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d9ff] to-[#0088cc] bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-300">
              Explore my work and the technologies I've used to build them.
            </p>
          </div>
        );
      case "contact":
        return (
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d9ff] to-[#0088cc] bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-300">
              {content.contact.description}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const overlayContent = getContent();

  if (!overlayContent) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-30 px-8 md:px-16 pointer-events-none"
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          {overlayContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
