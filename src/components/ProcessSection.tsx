"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MessageSquare, Landmark, PenTool, Brackets, CheckSquare, Rocket, HeartHandshake } from "lucide-react";

interface Stage {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Track scroll progress inside container to drive SVG line drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stages: Stage[] = [
    {
      icon: <MessageSquare className="w-5 h-5 text-gold-light" />,
      title: "Consultation",
      subtitle: "01 // DISCOVER",
      description: "Deep-dive alignment on product objectives, brand aesthetics, motion ambition, and technical specifications.",
    },
    {
      icon: <Landmark className="w-5 h-5 text-gold-light" />,
      title: "Planning",
      subtitle: "02 // ARCHITECTURE",
      description: "Defining content outlines, database models, information hierarchies, and structuring user journeys.",
    },
    {
      icon: <PenTool className="w-5 h-5 text-gold-light" />,
      title: "Design",
      subtitle: "03 // VISUALIZE",
      description: "Crafting custom typography grids, color styles, and high-fidelity interactive models in Figma.",
    },
    {
      icon: <Brackets className="w-5 h-5 text-gold-light" />,
      title: "Development",
      subtitle: "04 // CODE",
      description: "Building fast Next.js architectures, setting up WebGL canvas engines, and configuring custom hooks.",
    },
    {
      icon: <CheckSquare className="w-5 h-5 text-gold-light" />,
      title: "Testing",
      subtitle: "05 // OPTIMIZE",
      description: "Auditing load performance metrics, testing cross-device responsive breaks, and verifying SSL setups.",
    },
    {
      icon: <Rocket className="w-5 h-5 text-gold-light" />,
      title: "Launch",
      subtitle: "06 // SHIP",
      description: "Configuring serverless edge networks, propagation of DNS rules, and pushing live to Vercel/CDN.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-gold-light" />,
      title: "Ongoing Support",
      subtitle: "07 // EVOLVE",
      description: "Monitoring uptime logs, running package updates, database cleanup, and rolling out post-launch improvements.",
    },
  ];

  return (
    <section ref={containerRef} id="process" className="relative min-h-screen w-full py-24 px-6 z-10 bg-transparent">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase">
            The <span className="text-gold-gradient font-semibold">Process</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="max-w-xl mx-auto text-sm md:text-base text-text-muted leading-relaxed font-light">
            We operate through a highly structured, collaborative workflow designed to ensure speed, quality, and complete transparency.
          </p>
        </div>

        {/* Timeline Path & Cards Container */}
        <div className="relative w-full pb-12 mt-16">
          
          {/* Central Helical Wavy SVG Path */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 32 1000" preserveAspectRatio="none" fill="none">
              {/* Static background path */}
              <path
                d="M 16 0 C 0 150, 32 300, 16 450 C 0 600, 32 750, 16 900 L 16 1000"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {/* Dynamic filled path */}
              <motion.path
                d="M 16 0 C 0 150, 32 300, 16 450 C 0 600, 32 750, 16 900 L 16 1000"
                stroke="url(#goldLineGradient)"
                strokeWidth="2.5"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="goldLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9C7A1F" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#F4E5B2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Timeline Stages List */}
          <div className="space-y-16 md:space-y-24 relative z-20">
            {stages.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col md:flex-row items-center justify-between w-full relative ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  
                  {/* Left/Right Text Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full md:w-[42%] glass-panel p-6 sm:p-8 rounded-custom border border-white/5 space-y-4 relative"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-gold tracking-widest uppercase">
                        {stage.subtitle}
                      </span>
                      <div className="p-2 bg-gold/10 border border-gold/20 rounded-custom md:hidden">
                        {stage.icon}
                      </div>
                    </div>
                    
                    <h3 className="font-display text-lg sm:text-xl text-gold-light uppercase tracking-wider font-bold">
                      {stage.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light">
                      {stage.description}
                    </p>
                  </motion.div>

                  {/* Central Node Dot (aligned directly on helical path) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 hidden md:flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-8 h-8 rounded-full bg-bg border border-gold/30 flex items-center justify-center z-30 shadow-[0_0_10px_rgba(212,175,55,0.1)]"
                    >
                      <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold flex items-center justify-center animate-pulse-glow">
                        <div className="w-2.5 h-2.5 rounded-full bg-gold-light" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for other half of screen */}
                  <div className="w-[42%] hidden md:block" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
