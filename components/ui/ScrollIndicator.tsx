"use client";

import { motion } from "framer-motion";

export const ScrollIndicator: React.FC = () => {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
        <span className="text-primary text-sm">Scroll</span>
      </motion.div>
    </motion.div>
  );
};
