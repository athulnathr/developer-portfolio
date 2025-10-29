"use client";

import { motion, AnimatePresence } from "framer-motion";

interface InteractionHintProps {
  visible: boolean;
  message: string;
}

export default function InteractionHint({
  visible,
  message,
}: InteractionHintProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="px-6 py-3 bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-full"
            animate={{
              boxShadow: [
                "0 0 20px rgba(99, 102, 241, 0.3)",
                "0 0 30px rgba(99, 102, 241, 0.5)",
                "0 0 20px rgba(99, 102, 241, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-indigo-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <p className="text-sm font-medium text-white">{message}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
