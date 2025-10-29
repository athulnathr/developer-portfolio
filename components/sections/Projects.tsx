"use client";

import { motion, useInView } from "framer-motion";
import { content } from "@/constants/content";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useHasMounted } from "@/hooks/useHasMounted";

export const Projects: React.FC = () => {
  const hasMounted = useHasMounted();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen py-20 px-4 bg-background-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div
          initial={false}
          animate={hasMounted ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-xl">
            A showcase of my work and creative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={false}
              animate={hasMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-background-light border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/10">
                    {project.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <Button
                      variant="primary"
                      className="flex-1 text-sm py-2"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="px-4 text-sm py-2"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      GitHub
                    </Button>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background-light rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto p-8 border border-primary/30"
            onClick={(e) => e.stopPropagation()}
          >
            {content.projects
              .filter((p) => p.id === selectedProject)
              .map((project) => (
                <div key={project.id}>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-6 flex items-center justify-center">
                    <div className="text-9xl font-bold text-white/10">
                      {project.id}
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {project.title}
                  </h2>
                  <p className="text-gray-300 text-lg mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="primary" className="flex-1">
                      Visit Project
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Code
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
