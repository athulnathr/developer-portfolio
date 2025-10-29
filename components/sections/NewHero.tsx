"use client";

import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { useHasMounted } from "@/hooks/useHasMounted";

export const NewHero: React.FC = () => {
  const hasMounted = useHasMounted();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#151515]"
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Faint glowing geometric patterns */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="absolute w-64 h-64 border border-[#00d9ff] rounded-lg transform rotate-45 animate-spin-slow" />
        <div className="absolute w-96 h-96 border border-[#00d9ff] rounded-full animate-pulse-slow" />
        <div className="absolute w-48 h-48 border border-[#00d9ff] transform -rotate-12" />
      </div>

      {/* Scroll Indicator */}
      {hasMounted && <ScrollIndicator />}
    </section>
  );
};
