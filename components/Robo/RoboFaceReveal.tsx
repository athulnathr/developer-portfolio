"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface RoboFaceRevealProps {
  avatarUrl?: string;
  isHovered: boolean;
}

export const RoboFaceReveal: React.FC<RoboFaceRevealProps> = ({
  avatarUrl = "/images/avatar.jpg",
  isHovered,
}) => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Robot Face (default state) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          {/* Robot eyes */}
          <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-white rounded-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background rounded-full" />
          </div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white rounded-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background rounded-full" />
          </div>

          {/* Robot mouth */}
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-20 h-2 bg-white rounded-full" />
        </div>
      </motion.div>

      {/* Human Face (revealed on hover) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary"
      >
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">
          👤
        </div>
        {/* Replace with actual image: */}
        {/* <img
          src={avatarUrl}
          alt="Developer Avatar"
          className="w-full h-full object-cover"
        /> */}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.5, 1, 0.5] : 0,
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-primary blur-xl -z-10"
      />
    </div>
  );
};
