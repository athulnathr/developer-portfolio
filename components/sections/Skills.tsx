"use client";

import { motion, useInView } from "framer-motion";
import { content } from "@/constants/content";
import { useRef, useState } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";

export const Skills: React.FC = () => {
  const hasMounted = useHasMounted();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const allSkills = content.skills.categories.flatMap((cat) =>
    cat.skills.map((skill) => ({ skill, category: cat.name }))
  );

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div
          initial={false}
          animate={hasMounted ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 text-xl">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Central area for Robo */}
        <div className="flex items-center justify-center mb-16 h-64">
          {/* Robo will be positioned here */}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allSkills.map((item, index) => (
            <motion.div
              key={item.skill}
              initial={false}
              animate={hasMounted ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
              }}
              onMouseEnter={() => setHoveredSkill(item.skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="relative group"
            >
              <div
                className={`
                  p-6 rounded-xl border-2 border-primary/30 
                  bg-background-light backdrop-blur-sm
                  transition-all duration-300
                  hover:border-primary hover:shadow-lg hover:shadow-primary/50
                  hover:-translate-y-2
                  ${hoveredSkill === item.skill ? "scale-110" : ""}
                `}
              >
                <div className="flex flex-col items-center justify-center">
                  {/* Icon placeholder - could be replaced with actual tech icons */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4 flex items-center justify-center text-2xl font-bold">
                    {item.skill.charAt(0)}
                  </div>
                  <h3 className="text-white font-semibold text-center">
                    {item.skill}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categories Legend */}
        <motion.div
          initial={false}
          animate={hasMounted ? { opacity: 1, y: 0 } : {}}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {content.skills.categories.map((category) => (
            <div
              key={category.name}
              className="px-4 py-2 rounded-full border border-primary/50 text-primary text-sm"
            >
              {category.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
