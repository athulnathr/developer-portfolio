"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/app/lib/hooks/useScrollAnimation";
import ProjectCard from "../projects/ProjectCard";

const projects = [
  {
    title: "Immersive Portfolio",
    description:
      "A cutting-edge portfolio featuring interactive 3D monolith hero section with WebGL shaders, particle systems, and advanced physics.",
    techStack: ["Next.js", "Three.js", "WebGL", "GSAP", "TypeScript"],
  },
  {
    title: "Real-time Collaboration Platform",
    description:
      "Enterprise-grade collaboration tool with live editing, video conferencing, and AI-powered suggestions for seamless team productivity.",
    techStack: ["React", "WebRTC", "Socket.io", "Redis", "Docker"],
  },
  {
    title: "AI-Powered Design System",
    description:
      "Intelligent component library that adapts to brand guidelines and generates accessible, responsive UI components automatically.",
    techStack: ["React", "TypeScript", "Storybook", "Tailwind", "AI/ML"],
  },
  {
    title: "Data Visualization Dashboard",
    description:
      "Interactive analytics platform with real-time data streaming, custom chart libraries, and advanced filtering capabilities.",
    techStack: ["Next.js", "D3.js", "WebGL", "PostgreSQL", "GraphQL"],
  },
];

// Create a client-only particles component to prevent hydration mismatch
function AmbientParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 opacity-30">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

export default function Projects() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Geometric fragments background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-10 w-48 h-48 border border-purple-500/30 -rotate-12" />
        <div className="absolute bottom-20 left-20 w-36 h-36 border border-indigo-500/30 rotate-12" />
        <div className="absolute top-1/3 right-1/3 w-28 h-28 border border-indigo-400/20 -rotate-45" />
      </div>

      {/* Ambient particles - now client-only to prevent hydration mismatch */}
      <AmbientParticles />

      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400">
              Featured Work
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              comingSoon={true}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>

        {/* More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-400 text-lg">
            More exciting projects coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
