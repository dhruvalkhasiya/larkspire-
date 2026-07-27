"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
}

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState(0);

  const projects: Project[] = [
    {
      title: "Maison Aurelle",
      category: "Luxury Fashion",
      description: "A digital flagstore featuring high-resolution interactive fabric shaders and fluid scrolling choreography.",
      tags: ["Next.js", "Three.js", "Tailwind CSS"],
      year: "2026",
    },
    {
      title: "Noir & Sel",
      category: "Fine Dining Restaurant",
      description: "An experiential reservation portal with interactive table layouts and rich micro-transitions.",
      tags: ["Next.js", "Framer Motion", "Tailwind"],
      year: "2025",
    },
    {
      title: "Ironframe Club",
      category: "Boutique Fitness Brand",
      description: "A dark-themed fitness dashboard showcasing immersive video integration and performance tracking.",
      tags: ["GSAP", "React", "CSS Modules"],
      year: "2025",
    },
    {
      title: "Vanguard Studio",
      category: "Architectural Firm",
      description: "An interactive portfolio rendering 3D isometric models of architectural projects with smooth camera paths.",
      tags: ["R3F", "WebGL", "TypeScript"],
      year: "2026",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const scrollTrack = scrollTrackRef.current;
    if (!container || !scrollTrack) return;

    const cards = container.querySelectorAll(".project-card");
    if (cards.length === 0) return;

    // Create GSAP ScrollTrigger timeline for sticky 3D corridor walk
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrack,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // Update active card index based on scroll progress
          const index = Math.min(
            projects.length - 1,
            Math.floor(self.progress * projects.length)
          );
          setActiveProject(index);
        },
      },
    });

    // Move each card forward from -2000px depth to 400px (passing the camera)
    cards.forEach((card, idx) => {
      const startZ = -2500 - idx * 1200; // stagger original depth
      const endZ = 600;

      // Animate card translation along Z axis
      tl.fromTo(
        card,
        {
          z: startZ,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          z: endZ,
          opacity: (progress) => {
            // Fade in as it approaches focus, fade out as it goes past camera
            const cardZ = startZ + (endZ - startZ) * tl.progress();
            if (cardZ < -1500) return 0;
            if (cardZ >= -1500 && cardZ <= -200) return (cardZ + 1500) / 1300; // fade in
            if (cardZ > -200 && cardZ <= 300) return 1; // full opacity in focus
            return Math.max(0, 1 - (cardZ - 300) / 300); // fade out
          },
          filter: (progress) => {
            const cardZ = startZ + (endZ - startZ) * tl.progress();
            const blurVal = cardZ < -400 ? Math.min(8, Math.abs(cardZ + 400) / 200) : 0;
            return `blur(${blurVal}px)`;
          },
          ease: "none",
        },
        0 // run all cards animations in parallel, synced to the scrub timeline
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [projects.length]);

  return (
    <div ref={scrollTrackRef} className="relative h-[400vh] w-full bg-transparent">
      {/* Sticky Viewport Container */}
      <section
        id="portfolio"
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center py-20 px-6 z-10"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* Section Heading */}
        <div className="text-center space-y-2 z-25 relative">
          <h2 className="font-display text-xs tracking-[0.3em] text-gold uppercase font-semibold">
            Selected Work
          </h2>
          <h3 className="font-display text-3xl md:text-5xl tracking-widest uppercase">
            The <span className="text-gold-gradient font-semibold">Gallery</span>
          </h3>
          <div className="w-16 h-[1px] bg-gold/50 mx-auto" />
        </div>

        {/* 3D Corridor Cards */}
        <div 
          className="relative w-full max-w-4xl h-[420px] md:h-[460px] flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, idx) => {
            const isFocus = idx === activeProject;
            return (
              <div
                key={idx}
                className={`project-card absolute w-[290px] sm:w-[480px] p-6 sm:p-10 glass-panel rounded-custom flex flex-col justify-between h-[360px] sm:h-[400px] border border-white/5 pointer-events-auto transition-shadow duration-500 ${
                  isFocus 
                    ? "border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.2)]" 
                    : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Upper Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-gold tracking-widest">
                      0{idx + 1} // CASE
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      {project.year}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-xs text-text-muted tracking-[0.2em] uppercase font-light">
                      {project.category}
                    </h4>
                    <h5 className="font-display text-2xl sm:text-3xl tracking-wider text-gold-light uppercase font-bold">
                      {project.title}
                    </h5>
                  </div>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Lower Action & Badges */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 border border-gold/20 text-[9px] font-mono text-gold-light uppercase rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center space-x-2 text-xs font-mono text-text-muted hover:text-gold-light transition-colors duration-300">
                    <span>EXPLORE CASE STUDY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Scroll Progress Status Indicator */}
        <div className="relative z-25 flex items-center space-x-2 text-xs font-mono tracking-widest text-text-muted">
          <span>01</span>
          <div className="w-24 h-[1px] bg-white/10 relative">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{
                width: `${((activeProject + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
          <span>0{projects.length}</span>
        </div>
      </section>
    </div>
  );
}
