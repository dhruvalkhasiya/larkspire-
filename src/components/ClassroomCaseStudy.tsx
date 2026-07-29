"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FrameScrollBackground from "./FrameScrollBackground";

gsap.registerPlugin(ScrollTrigger);

export default function ClassroomCaseStudy() {
  const drawFrameRef = useRef<((frame: number) => void) | null>(null);

  useEffect(() => {
    const scrollObj = { frame: 0 };
    const totalFrames = 240;

    const ctx = gsap.context(() => {
      // Create a unified timeline that pins the section and scrubs all animations in sync
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#classroom-section",
          start: "top top",
          end: () => `+=${window.innerHeight * 3.0}`, // scrub animation over 3.0 viewports
          pin: true,
          pinSpacing: true,
          scrub: 0.2, // scrub everything smoothly
        },
      });

      // 1. Scrub the 3D canvas frames over the entire pin duration
      tl.to(scrollObj, {
        frame: totalFrames - 1,
        ease: "none",
        onUpdate: () => {
          if (drawFrameRef.current) {
            drawFrameRef.current(scrollObj.frame);
          }
        },
        duration: 3.0, // relative timeline duration
      }, 0);

      // 2. Staggered reveal of case study text contents:
      
      // Step 1: Entry & Intro (Visible 0% - 30%)
      tl.fromTo("#classroom-intro", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        0
      );
      tl.to("#classroom-intro", 
        { opacity: 0, y: -30, duration: 0.5 },
        0.8
      );

      // Step 2: The Core Challenge & Architecture (Visible 33% - 66%)
      tl.fromTo("#classroom-details",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.1
      );
      tl.to("#classroom-details",
        { opacity: 0, y: -30, duration: 0.5 },
        1.9
      );

      // Step 3: Outcomes & Action (Visible 70% - 100%)
      tl.fromTo("#classroom-impact",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        2.2
      );
      tl.to("#classroom-impact",
        { opacity: 0, y: -30, duration: 0.5 },
        2.8
      );

      // 3. Fade out the background canvas wrapper at the very end of the pin
      tl.to("#scroll-bg-container-classroom", {
        opacity: 0,
        duration: 0.5,
      }, 2.5); // starts at 2.5, finishes exactly at 3.0
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="classroom-section" className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 md:py-24 overflow-hidden bg-bg">
      {/* Cinematic 3D Scroll Canvas Background (Exposing callback ref and custom framesPath) */}
      <FrameScrollBackground drawFrameRef={drawFrameRef} framesPath="/classroom" containerId="scroll-bg-container-classroom" />

      {/* Spacer to push content down slightly */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-80" />

      {/* Slide 1: Introduction (Absolute center overlay) */}
      <div id="classroom-intro" className="absolute z-10 max-w-4xl text-center space-y-6 select-none opacity-0">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-light" />
          <span className="text-[10px] md:text-xs text-text-muted tracking-[0.2em] uppercase font-medium">
            Featured Case Study
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-7xl tracking-[0.15em] leading-none uppercase">
          The <span className="text-gold-gradient font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.15)]">AI Classroom</span>
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-base text-text-muted leading-relaxed tracking-wide font-light">
          A groundbreaking WebGL educational sandbox designed to deliver zero-latency interactive learning environments inside standard browsers.
        </p>
      </div>

      {/* Slide 2: Technical Architecture */}
      <div id="classroom-details" className="absolute z-10 max-w-4xl text-center space-y-6 select-none opacity-0">
        <span className="text-xs font-mono text-gold tracking-[0.25em] uppercase font-semibold">
          01 // ARCHITECTURE & STACK
        </span>
        <h2 className="font-display text-3xl md:text-5xl tracking-[0.1em] uppercase text-gold-light font-bold">
          WebGL Virtual Classrooms
        </h2>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-text-muted leading-relaxed font-light">
          Leveraging Draco compression filters, custom GLSL fragment shaders, and instanced geometry parameters to render interactive 3D rooms on mobile and desktop at 60 frames per second.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {["Next.js", "Three.js", "GLSL Shaders", "Draco Loader"].map((tag, idx) => (
            <span key={idx} className="px-3 py-1 border border-gold/20 text-[9px] sm:text-[10px] font-mono text-gold-light uppercase rounded-sm bg-white/5 backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Slide 3: Performance Impact */}
      <div id="classroom-impact" className="absolute z-10 max-w-4xl text-center space-y-8 select-none opacity-0">
        <span className="text-xs font-mono text-gold tracking-[0.25em] uppercase font-semibold">
          02 // THE DELIVERABLE
        </span>
        <h2 className="font-display text-3xl md:text-5xl tracking-[0.1em] uppercase text-gold-light font-bold">
          Gamified Engagement
        </h2>
        <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-text-muted leading-relaxed font-light">
          Combining visual excellence with high-performance execution. An experiential platform that increases active user session times by over 400% compared to flat learning management interfaces.
        </p>
        <div className="pt-2">
          <button className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-gold-dark via-gold-light to-gold-accent hover:brightness-110 text-bg font-semibold text-xs tracking-[0.25em] uppercase rounded-custom transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 pointer-events-auto">
            <span>Explore Case Study</span>
            <ArrowUpRight className="w-4 h-4 text-bg" />
          </button>
        </div>
      </div>
    </section>
  );
}
