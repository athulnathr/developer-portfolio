"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  icon: string;
  delay?: number;
}

/**
 * Individual skill card with light-up animation
 * Appears on viewport entry with pulse glow on hover
 */
export default function SkillCard({ name, icon, delay = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.05 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 transition-all duration-300 group-hover:border-indigo-500/50">
        {/* Icon */}
        <div className="text-4xl mb-3 filter grayscale group-hover:grayscale-0 transition-all duration-300">
          {icon}
        </div>

        {/* Name */}
        <h3 className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-300">
          {name}
        </h3>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
