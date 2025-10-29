"use client";

import { motion } from "framer-motion";
import { content } from "@/constants/content";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";

export const About: React.FC = () => {
  const hasMounted = useHasMounted();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-background-light relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-transparent" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Space for Robo */}
        <div className="lg:block hidden">
          <div className="w-full h-96 flex items-center justify-center">
            {/* Robo will be positioned here via Three.js canvas */}
          </div>
        </div>

        {/* Right side - Content */}
        <div>
          <motion.h2
            initial={false}
            animate={hasMounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>

          {content.about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={false}
              animate={hasMounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="text-gray-300 text-lg mb-6 leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Timeline */}
          <div className="mt-12">
            <motion.h3
              initial={false}
              animate={hasMounted ? { opacity: 1, x: 0 } : {}}
              className="text-2xl font-bold mb-6 text-primary"
            >
              Career Journey
            </motion.h3>

            <div className="space-y-6">
              {content.about.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={hasMounted ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-l-4 border-primary pl-6 relative"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                  <div className="text-primary font-bold text-sm">
                    {item.year}
                  </div>
                  <div className="text-xl font-semibold text-white">
                    {item.title}
                  </div>
                  <div className="text-gray-400">{item.company}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
