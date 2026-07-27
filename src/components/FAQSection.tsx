"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordionItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/5 last:border-0 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-2 text-gold-light hover:text-white transition-colors duration-300 group"
      >
        <span className="font-display text-base md:text-lg tracking-wider uppercase font-semibold">
          {item.question}
        </span>
        <div className="p-1.5 bg-white/5 border border-white/10 rounded-custom group-hover:border-gold/40 transition-all duration-300 ml-4 flex-shrink-0">
          {isOpen ? <Minus className="w-4 h-4 text-gold" /> : <Plus className="w-4 h-4 text-gold" />}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-text-muted leading-relaxed font-light py-4 pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What does the name Larkspire represent?",
      answer: "Larkspire represents the synthesis of the Lark (a songbird signifying creative flight, communication, and visual design) and the Spire (a tall serif architectural column signifying engineering height, strength, and structure). It represents our philosophy: We Design | We Develop | We Deliver.",
    },
    {
      question: "How long does a typical 3D website project take?",
      answer: "A bespoke cinematic website typically requires 4 to 8 weeks. This timeframe encompasses discovery, wireframing, high-fidelity Figma models, WebGL asset engineering, Core Web Vitals optimization, and extensive cross-device QA.",
    },
    {
      question: "Will a 3D website perform well on mobile devices?",
      answer: "Yes, performance is a primary pillar of our engineering. We compress models using Draco loaders, cap device ratios, and implement performance safeguards. On lower-end devices or mobile when hardware concurrency is low, the system automatically degrades WebGL overlays to static poster frames to maintain a smooth 60fps scroll.",
    },
    {
      question: "How do you handle SEO with WebGL layouts?",
      answer: "All WebGL assets are decorative layers positioned on top of semantic HTML5 code. Crawlers read standard title tags, headers, paragraphs, and schema JSON-LD scripts underneath the canvas. We build the complete visual page as accessible DOM elements so that search indexing is never compromised.",
    },
    {
      question: "What core tech stack does Larkspire use?",
      answer: "Our production pipeline is built on Next.js 14+ (App Router), TypeScript, Tailwind CSS, React Three Fiber, GSAP, and Framer Motion. We deploy to global Vercel serverless edge nodes for sub-second loading speeds.",
    },
  ];

  // Animate golden dust particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulse: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Generate gold dust particles
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1), // float up
        speedX: (Math.random() * 0.4 - 0.2), // drift sideways
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * 0.02,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.pulse;

        // Pulse opacity limits
        if (p.opacity > 0.6 || p.opacity < 0.1) {
          p.pulse = -p.pulse;
        }

        // Wrap particles around borders
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 229, 178, ${p.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#D4AF37";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="faq" className="relative min-h-[80vh] w-full flex flex-col justify-center items-center py-24 px-6 z-10 overflow-hidden bg-bg-alt/30 border-t border-b border-white/5">
      {/* Golden Particle Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-40"
      />

      <div className="max-w-3xl w-full space-y-16 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase">
            FAQ
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
          <p className="max-w-lg mx-auto text-sm text-text-muted leading-relaxed font-light">
            Answers to common questions regarding timelines, integrations, and performance.
          </p>
        </div>

        {/* Accordions Wrapper */}
        <div className="glass-panel p-6 sm:p-10 rounded-custom border border-white/5">
          {faqs.map((faq, idx) => (
            <FAQAccordionItem
              key={idx}
              item={faq}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
