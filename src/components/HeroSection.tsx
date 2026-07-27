"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FrameScrollBackground from "./FrameScrollBackground";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWork = () => {
    const workSection = document.getElementById("portfolio");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Pin the hero section during the 3D scroll sequence (matching background duration)
    const pin = ScrollTrigger.create({
      trigger: "#hero-section",
      start: "top top",
      end: () => `+=${window.innerHeight * 3.5}`,
      pin: true,
      pinSpacing: true,
    });

    // Fade out and transform individual elements on scroll in a staggered, cinematic fashion
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "html",
        start: "top top",
        end: () => `+=${window.innerHeight * 3.0}`, // fully faded out before unpinning
        scrub: true,
      },
    });

    tl.to("#hero-badge, #scroll-indicator", {
      opacity: 0,
      y: -30,
      duration: 0.4,
    }, 0);

    tl.to("#hero-desc, #hero-tagline", {
      opacity: 0,
      y: -40,
      duration: 0.5,
    }, 0.2);

    tl.to("#hero-buttons", {
      opacity: 0,
      y: -50,
      scale: 0.95,
      duration: 0.5,
    }, 0.4);

    tl.to("#hero-title", {
      opacity: 0,
      scale: 1.15,
      y: -80,
      duration: 0.8,
    }, 0.6);

    return () => {
      pin.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="hero-section" className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 md:py-24 overflow-hidden">
      {/* Cinematic 3D Scroll Canvas Background */}
      <FrameScrollBackground />

      {/* Spacer to push content down slightly for R3F monogram center alignment */}
      <div />

      {/* Main Hero Header */}
      <div id="hero-content" className="relative z-10 max-w-4xl text-center space-y-8 my-auto select-none">
        {/* Founders Badge */}
        <motion.div
          id="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-light" />
          <span className="text-[10px] md:text-xs text-text-muted tracking-[0.2em] uppercase font-medium">
            Founded by Parmar Tirthraj & Dhruval Khasiya
          </span>
        </motion.div>

        {/* Title */}
        <div className="space-y-4">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="font-display text-5xl md:text-8xl tracking-[0.15em] leading-none uppercase"
          >
            Larkspire <br className="md:hidden" />
            <span className="text-gold-gradient font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.15)]">Studios</span>
          </motion.h1>
          
          <motion.p
            id="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs md:text-sm text-text tracking-[0.4em] uppercase"
          >
            We Design <span className="text-gold">•</span> We Develop <span className="text-gold">•</span> We Deliver
          </motion.p>
        </div>

        {/* Subheadline */}
        <motion.p
          id="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-xl mx-auto text-sm md:text-base text-text-muted leading-relaxed tracking-wide font-light"
        >
          A bespoke creative agency crafting cinematic digital experiences that blend fine-art aesthetics with high-performance code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          id="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-dark via-gold-light to-gold-accent hover:brightness-110 text-bg font-semibold text-xs tracking-[0.25em] uppercase rounded-custom transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
          >
            Start a Project
          </button>
          
          <button
            onClick={scrollToWork}
            className="w-full sm:w-auto px-8 py-3.5 border border-gold/30 hover:border-gold-light/80 hover:bg-gold/5 text-gold-light hover:text-white text-xs tracking-[0.25em] uppercase rounded-custom transition-all duration-300 backdrop-blur-sm"
          >
            View Our Work
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        id="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="flex flex-col items-center space-y-2 pointer-events-none mt-12 md:mt-0"
      >
        <span className="text-[10px] text-text-muted tracking-[0.3em] uppercase">Scroll to Discover</span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-gold-light to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
