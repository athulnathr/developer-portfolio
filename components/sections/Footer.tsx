"use client";

import { motion } from "framer-motion";
import { content } from "@/constants/content";
import { useHasMounted } from "@/hooks/useHasMounted";

export const Footer: React.FC = () => {
  const hasMounted = useHasMounted();
  const currentYear = 2026;

  return (
    <footer
      id="footer"
      className="relative py-12 px-4 bg-background-dark border-t border-primary/20 overflow-hidden"
    >
      {/* Background effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-primary to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Robo space - centered */}
        <div className="flex justify-center mb-8">
          <div className="w-64 h-32">{/* Robo will be positioned here */}</div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-6 mb-8"
        >
          {content.footer.social.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full border-2 border-primary/30 hover:border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
              aria-label={social.name}
            >
              <span className="text-sm font-bold">
                {social.icon.charAt(0).toUpperCase()}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8" />

        {/* Copyright */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>
            © {currentYear} {content.footer.copyright}
          </p>
          <p className="mt-2 text-xs">
            Built with <span className="text-primary">Next.js</span>,{" "}
            <span className="text-primary">Three.js</span>, and{" "}
            <span className="text-primary">Framer Motion</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
