"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/app/lib/hooks/useScrollAnimation";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const socialLinks = [
  { name: "GitHub", icon: "💻", url: "#", handle: "@yourhandle" },
  { name: "LinkedIn", icon: "💼", url: "#", handle: "@yourhandle" },
  { name: "Twitter", icon: "🐦", url: "#", handle: "@yourhandle" },
  { name: "Email", icon: "📧", url: "#", handle: "your@email.com" },
];

export default function Contact() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.2 });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form data is ready for backend integration
    console.log("Form Data Payload:", formData);
    // TODO: Send to backend API
    alert("Form ready for backend integration!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Tech floor pattern background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Circuit pattern accents */}
        <div className="absolute top-20 left-10 w-64 h-64 opacity-30">
          <div className="absolute inset-0 border-l-2 border-t-2 border-indigo-500/30" />
          <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-indigo-500/50" />
          <div className="absolute bottom-8 left-8 w-3 h-3 rounded-full bg-purple-500/50" />
        </div>
      </div>

      {/* Monolith fragments as decorative footer */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10">
        <div className="absolute bottom-10 left-1/4 w-32 h-32 border-2 border-indigo-500/50 rotate-45" />
        <div className="absolute bottom-5 right-1/4 w-24 h-24 border-2 border-purple-500/50 -rotate-12" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
              Get In Touch
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto" />
          <p className="mt-8 text-xl text-zinc-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let&apos;s create
            something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  placeholder="Your name"
                />
                {focusedField === "name" && (
                  <motion.div
                    layoutId="inputGlow"
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                    }}
                  />
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  placeholder="your@email.com"
                />
                {focusedField === "email" && (
                  <motion.div
                    layoutId="inputGlow"
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                    }}
                  />
                )}
              </div>

              {/* Message Field */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
                {focusedField === "message" && (
                  <motion.div
                    layoutId="inputGlow"
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                    }}
                  />
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-semibold overflow-hidden group"
              >
                <span className="relative z-10">Send Message</span>
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold text-white mb-8">
              Connect With Me
            </h3>
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                  }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-zinc-900/50 transition-all duration-300 group"
                >
                  <div className="text-3xl">{link.icon}</div>
                  <div className="flex-1">
                    <div className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                      {link.name}
                    </div>
                    <div className="text-sm text-zinc-500">{link.handle}</div>
                  </div>
                  <div className="text-zinc-600 group-hover:text-indigo-400 transition-colors">
                    →
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 text-center text-zinc-500 text-sm"
        >
          <p>© 2024 - Crafted with passion and precision</p>
        </motion.div>
      </div>
    </section>
  );
}
