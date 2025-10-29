"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NavbarProps {
  isLoading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoading = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show navbar after loading completes
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(10, 10, 10, 0.7)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Robot Icon/Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-10 h-10">
            {/* Minimal robot silhouette */}
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Head */}
              <rect
                x="12"
                y="8"
                width="16"
                height="14"
                rx="2"
                stroke="#00d9ff"
                strokeWidth="2"
              />
              {/* Eyes */}
              <circle cx="17" cy="15" r="2" fill="#00d9ff" />
              <circle cx="23" cy="15" r="2" fill="#00d9ff" />
              {/* Body */}
              <rect
                x="10"
                y="24"
                width="20"
                height="10"
                rx="2"
                stroke="#00d9ff"
                strokeWidth="2"
              />
              {/* Antenna */}
              <line
                x1="20"
                y1="8"
                x2="20"
                y2="4"
                stroke="#00d9ff"
                strokeWidth="2"
              />
              <circle cx="20" cy="3" r="2" fill="#00d9ff" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">
            Portfolio
          </span>
        </motion.div>

        {/* Navigation Links (Optional - can be expanded) */}
        <div className="flex items-center gap-6">
          <motion.a
            href="#about"
            className="text-gray-400 hover:text-[#00d9ff] transition-colors text-sm font-medium"
            whileHover={{ scale: 1.1 }}
          >
            About
          </motion.a>
          <motion.a
            href="#skills"
            className="text-gray-400 hover:text-[#00d9ff] transition-colors text-sm font-medium"
            whileHover={{ scale: 1.1 }}
          >
            Skills
          </motion.a>
          <motion.a
            href="#projects"
            className="text-gray-400 hover:text-[#00d9ff] transition-colors text-sm font-medium"
            whileHover={{ scale: 1.1 }}
          >
            Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="text-gray-400 hover:text-[#00d9ff] transition-colors text-sm font-medium"
            whileHover={{ scale: 1.1 }}
          >
            Contact
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};
