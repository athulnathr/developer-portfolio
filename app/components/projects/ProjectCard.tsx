"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  comingSoon?: boolean;
  delay?: number;
}

/**
 * Project card with glassmorphic design and hover interactions
 */
export default function ProjectCard({
  title,
  description,
  techStack,
  comingSoon = true,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      {/* Card */}
      <div className="relative h-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 transition-all duration-300 group-hover:border-indigo-500/50 overflow-hidden">
        {/* Coming Soon Badge */}
        {comingSoon && (
          <div className="absolute top-6 right-6">
            <div className="relative px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 overflow-hidden">
              <span className="relative z-10 text-xs font-semibold text-white">
                Coming Soon
              </span>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
            </div>
          </div>
        )}

        {/* Placeholder Image Area */}
        <div className="relative w-full h-48 mb-6 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20">🎨</div>
          </div>
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
            }}
          />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 mb-6 line-clamp-3">{description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-zinc-800/50 text-zinc-300 rounded-full border border-zinc-700 group-hover:border-indigo-500/50 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Geometric accent */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-indigo-500/20 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
