"use client";

import { motion, useInView } from "framer-motion";
import { content } from "@/constants/content";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useHasMounted } from "@/hooks/useHasMounted";

export const Contact: React.FC = () => {
  const hasMounted = useHasMounted();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-background-light relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Robo space with face reveal */}
        <motion.div
          initial={false}
          animate={hasMounted ? { opacity: 1, x: 0 } : {}}
          className="lg:block hidden"
        >
          <div className="w-full h-96 flex items-center justify-center">
            {/* Robot with face reveal will be positioned here via Three.js Canvas */}
          </div>
          <p className="text-center text-gray-400 mt-4 text-sm">
            Move your cursor over the robot's face to reveal the person behind
            it! ✨
          </p>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={false}
          animate={hasMounted ? { opacity: 1, x: 0 } : {}}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {content.contact.title}
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            {content.contact.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-white mb-2 font-medium"
              >
                {content.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border-2 border-primary/30 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-white mb-2 font-medium"
              >
                {content.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border-2 border-primary/30 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-white mb-2 font-medium"
              >
                {content.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-background border-2 border-primary/30 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? content.contact.form.success
                : content.contact.form.submit}
            </Button>

            {status === "error" && (
              <p className="text-red-400 text-center">
                {content.contact.form.error}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};
