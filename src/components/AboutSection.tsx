"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Users, Eye, Target, Award } from "lucide-react";

// Interactive 3D Tilt Card Wrapper Component
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Framer Motion values for cursor coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Damping configuration for smooth tilt springs
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  // Lighting overlay reflection variables
  const shineX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const shineY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card element center, normalized to [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`glass-panel rounded-custom relative overflow-hidden transition-all duration-200 cursor-pointer ${className}`}
    >
      {/* Light Shine Glossy Highlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_var(--shine-x)_var(--shine-y),_rgba(255,255,255,0.4)_0%,_transparent_60%)]"
        style={{
          // @ts-ignore custom CSS variables
          "--shine-x": useTransform(shineX, (val) => `${val}%`),
          // @ts-ignore
          "--shine-y": useTransform(shineY, (val) => `${val}%`),
        }}
      />
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const values = [
    {
      icon: <Target className="w-5 h-5 text-gold-light" />,
      title: "Our Mission",
      description: "To eliminate the boundary between cinema and the web, engineering immersive platforms that command attention.",
    },
    {
      icon: <Eye className="w-5 h-5 text-gold-light" />,
      title: "Our Vision",
      description: "A digital landscape where businesses don't just host information, but host high-fidelity digital art galleries.",
    },
    {
      icon: <Award className="w-5 h-5 text-gold-light" />,
      title: "Boutique Quality",
      description: "A design-first approach, honest communication, and long-term partnerships built well beyond launch day.",
    },
  ];

  return (
    <section id="about" className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-6 z-10 bg-gradient-to-b from-transparent to-bg-alt/30">
      <div className="max-w-6xl w-full space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase">
            The <span className="text-gold-gradient font-semibold">Studio</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="max-w-2xl mx-auto text-sm md:text-base text-text-muted leading-relaxed font-light">
            We are a compact, specialized design & engineering unit. We don't do generic. We build digital flagships for brands seeking to leave an indelible impression.
          </p>
        </div>

        {/* Mission / Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <TiltCard key={idx} className="p-8 space-y-4 min-h-[220px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-2.5 bg-gold/10 border border-gold/20 rounded-custom w-fit">
                  {val.icon}
                </div>
                <h3 className="font-display text-lg md:text-xl tracking-wider text-gold-light uppercase">
                  {val.title}
                </h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                {val.description}
              </p>
            </TiltCard>
          ))}
        </div>

        {/* Founders Spotlight Section */}
        <div className="space-y-10 pt-12">
          <div className="text-center space-y-2">
            <h3 className="text-xs tracking-[0.3em] text-gold uppercase font-semibold">Crafted by the Founders</h3>
            <h4 className="font-display text-2xl md:text-4xl tracking-widest uppercase">Meet the Minds</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Parmar Tirthraj */}
            <TiltCard className="p-8 flex flex-col justify-between space-y-8 min-h-[300px]">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Design & Experience Lead</span>
                  <h5 className="font-display text-2xl tracking-wider uppercase text-text font-bold">Parmar Tirthraj</h5>
                </div>
                <p className="text-sm text-text-muted leading-relaxed font-light">
                  "Obsessed with typography, motion, and the subtle details you feel before you notice them. I translate brand narratives into tangible, interactable digital spaces."
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-text-muted font-mono">
                <span>01 // DESIGN</span>
                <span className="text-gold-light">Aesthetics Director</span>
              </div>
            </TiltCard>

            {/* Dhruval Khasiya */}
            <TiltCard className="p-8 flex flex-col justify-between space-y-8 min-h-[300px]">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Engineering & Performance Lead</span>
                  <h5 className="font-display text-2xl tracking-wider uppercase text-text font-bold">Dhruval Khasiya</h5>
                </div>
                <p className="text-sm text-text-muted leading-relaxed font-light">
                  "Ships clean, secure, blazing-fast code that scales with your ambition. I believe that high-fidelity motion should never compromise on SEO, accessibility, or frame-rates."
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-text-muted font-mono">
                <span>02 // DEV</span>
                <span className="text-gold-light">Technical Lead</span>
              </div>
            </TiltCard>
          </div>
        </div>

      </div>
    </section>
  );
}
