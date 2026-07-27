"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Globe, HeartHandshake, Box, Layers, Code, CheckCircle, Scale, Monitor, Key, Accessibility, FileText, Palette, Compass } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
}

export default function WhyGrid() {
  const features: Feature[] = [
    { icon: <Palette className="w-4 h-4 text-gold-light" />, title: "Premium Visuals" },
    { icon: <Monitor className="w-4 h-4 text-gold-light" />, title: "Fully Responsive" },
    { icon: <Zap className="w-4 h-4 text-gold-light" />, title: "Lightning Fast" },
    { icon: <Globe className="w-4 h-4 text-gold-light" />, title: "SEO Optimizations" },
    { icon: <Key className="w-4 h-4 text-gold-light" />, title: "Secure HTTPS" },
    { icon: <HeartHandshake className="w-4 h-4 text-gold-light" />, title: "Ongoing Support" },
    { icon: <Code className="w-4 h-4 text-gold-light" />, title: "Modern Tech Stack" },
    { icon: <Scale className="w-4 h-4 text-gold-light" />, title: "Scalable Code" },
    { icon: <Box className="w-4 h-4 text-gold-light" />, title: "Interactive 3D" },
    { icon: <Layers className="w-4 h-4 text-gold-light" />, title: "Layered Depth" },
    { icon: <Accessibility className="w-4 h-4 text-gold-light" />, title: "Strict Accessibility" },
    { icon: <CheckCircle className="w-4 h-4 text-gold-light" />, title: "Rigorous QA" },
    { icon: <Shield className="w-4 h-4 text-gold-light" />, title: "Robust Security" },
    { icon: <FileText className="w-4 h-4 text-gold-light" />, title: "Structured Schema" },
    { icon: <Compass className="w-4 h-4 text-gold-light" />, title: "Bespoke Branding" },
    { icon: <Sparkles className="w-4 h-4 text-gold-light" />, title: "Cinematic Transitions" },
  ];

  return (
    <section id="why-us" className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-6 z-10 overflow-hidden">
      <div className="max-w-6xl w-full space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase">
            Why <span className="text-gold-gradient font-semibold">Larkspire</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="max-w-2xl mx-auto text-sm md:text-base text-text-muted leading-relaxed font-light">
            We merge design sophistication with clean structural execution, giving your brand a distinct visual and operational advantage.
          </p>
        </div>

        {/* Isometric 3D Grid container */}
        <div 
          className="relative w-full flex items-center justify-center py-16"
          style={{ perspective: "1200px" }}
        >
          {/* Transforming the grid wrapper to isometric projection */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 max-w-4xl w-full"
            style={{
              transform: "rotateX(50deg) rotateZ(-30deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {features.map((feat, idx) => {
              // Calculate custom floating parameters for organic wave effect
              const row = Math.floor(idx / 4);
              const col = idx % 4;
              const delay = (row + col) * 0.15; // wave ripple delay
              const duration = 4 + (idx % 3) * 0.8; // varied speed

              return (
                <motion.div
                  key={idx}
                  className="glass-panel p-5 flex flex-col items-center justify-center space-y-3 aspect-square text-center select-none cursor-pointer border border-white/5 shadow-lg shadow-black/40 hover:bg-gold/5"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    y: [0, -10, 0],
                    z: [0, 15, 0],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                  }}
                  whileHover={{
                    scale: 1.05,
                    z: 30,
                    borderColor: "rgba(212, 175, 55, 0.5)",
                    boxShadow: "0 10px 30px rgba(212, 175, 55, 0.15)",
                  }}
                >
                  {/* Floating Icon */}
                  <div 
                    className="p-2 bg-gold/15 border border-gold/30 rounded-custom animate-pulse-glow"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {feat.icon}
                  </div>
                  
                  {/* Text label */}
                  <span 
                    className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-text uppercase block"
                    style={{ transform: "translateZ(5px)" }}
                  >
                    {feat.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
