"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/app/lib/hooks/useScrollAnimation";
import SkillCard from "../about/SkillCard";

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "📘" },
  { name: "Three.js", icon: "🎲" },
  { name: "WebGL", icon: "🎨" },
  { name: "GSAP", icon: "✨" },
  { name: "Tailwind", icon: "🎭" },
  { name: "Docker", icon: "🐳" },
];

const storyFragments = [
  {
    year: "2024",
    title: "Lead UI Engineer",
    description: "Crafting interactive experiences at Prevalent AI",
  },
  {
    year: "2023",
    title: "Frontend Innovation",
    description: "Pushing boundaries with WebGL and 3D web experiences",
  },
  {
    year: "2022",
    title: "Full Stack Journey",
    description: "Mastering modern web development stack",
  },
];

export default function About() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Geometric fragments background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 border border-indigo-500/30 rotate-12" />
        <div className="absolute bottom-40 right-20 w-40 h-40 border border-purple-500/30 -rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-indigo-400/20 rotate-45" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
              About Me
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        {/* Personality Statement */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-32"
        >
          <p className="text-2xl md:text-4xl font-light text-zinc-300 leading-relaxed max-w-4xl">
            I craft{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-medium">
              interactive digital experiences
            </span>
            . Based in{" "}
            <span className="text-white font-medium">Kerala, India</span>,
            currently{" "}
            <span className="text-white font-medium">
              Lead UI Engineer at Prevalent AI
            </span>
            , seeking new journeys in{" "}
            <span className="text-white font-medium">Dubai</span>.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-32"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8">
            Tech Arsenal
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                delay={0.5 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Story Fragments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8">
            Journey
          </h3>
          <div className="space-y-6">
            {storyFragments.map((fragment, index) => (
              <motion.div
                key={fragment.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <div className="flex items-start gap-6 p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-900/50">
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {fragment.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {fragment.title}
                    </h4>
                    <p className="text-zinc-400">{fragment.description}</p>
                  </div>
                </div>

                {/* Timeline connector */}
                {index < storyFragments.length - 1 && (
                  <div className="absolute left-[44px] top-[88px] w-0.5 h-6 bg-gradient-to-b from-indigo-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
