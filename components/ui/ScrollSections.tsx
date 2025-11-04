"use client";

import React from "react";

/**
 * Invisible scroll sections for tracking scroll progress
 * These provide the scroll height needed to track progress through each section
 * without having visible DOM content
 */
export const ScrollSections: React.FC = () => {
  return (
    <>
      {/* Hero Section - viewport height */}
      <section id="hero" className="min-h-screen" />

      {/* About Section - tall section for human animation */}
      <section id="about" className="min-h-[200vh]" />

      {/* Skills Section */}
      <section id="skills" className="min-h-[150vh]" />

      {/* Projects Section */}
      <section id="projects" className="min-h-[150vh]" />

      {/* Contact Section */}
      <section id="contact" className="min-h-screen" />

      {/* Footer Section */}
      <section id="footer" className="min-h-[50vh]" />
    </>
  );
};
