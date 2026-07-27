"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Palette, Code, Cpu, LineChart, ShieldCheck, Server, Settings } from "lucide-react";

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      icon: <Palette className="w-10 h-10 text-gold-light" />,
      title: "Website Design",
      description: "Artistic, typography-focused layouts tailored specifically to your brand. We design bespoke visual languages that transcend flat templates.",
      bullets: ["Art Direction & Branding", "UI/UX Layout Systems", "Interactive Wireframes", "Framer/Figma Prototypes"],
    },
    {
      icon: <Code className="w-10 h-10 text-gold-light" />,
      title: "Website Development",
      description: "Blazing-fast engineering utilizing Next.js, React, and TypeScript. Optimized for SEO, speed, and strict semantic accessibility.",
      bullets: ["Next.js App Router Setup", "TypeScript Typings", "Tailwind CSS Layouts", "Vercel Fast Deployments"],
    },
    {
      icon: <Cpu className="w-10 h-10 text-gold-light" />,
      title: "3D & Motion Design",
      description: "WebGL interactive graphics (Three.js/R3F) and GSAP micro-animations. We build websites that feel alive and respond to touch.",
      bullets: ["Three.js Shader Effects", "GSAP Scroll Timeline", "Draco Model Optimization", "Canvas Video Scrubbing"],
    },
    {
      icon: <LineChart className="w-10 h-10 text-gold-light" />,
      title: "SEO Optimization",
      description: "Advanced keyword structuring, lightning-fast Core Web Vitals audit, and rich schema JSON-LD configurations for organic ranking.",
      bullets: ["Google Search Console Sync", "Semantic Code Structuring", "Speed & LCP Audits", "Schema Metadata Config"],
    },
    {
      icon: <Settings className="w-10 h-10 text-gold-light" />,
      title: "Website Maintenance",
      description: "Proactive uptime checks, version upgrades, content revisions, and routine database cleanup to ensure zero launch decay.",
      bullets: ["Uptime Monitoring", "Dependency Upgrades", "Backup Automations", "Performance Tuning"],
    },
    {
      icon: <Server className="w-10 h-10 text-gold-light" />,
      title: "Domain & Hosting Setup",
      description: "Production routing configuration, DNS records (MX, TXT, CNAME) styling, SSL validation, and Content Delivery Network (CDN) setups.",
      bullets: ["Custom Domain Routing", "SSL Certificate Checks", "CDN Cache Optimizations", "Serverless Edge Config"],
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-gold-light" />,
      title: "Security & Compliance",
      description: "Strict HTTPS protocols, secure API integrations, privacy policy guidelines, cookie compliance banners, and code penetration audits.",
      bullets: ["HTTPS & SSL Configurations", "Secure Environment Keys", "GDPR Cookie Compliance", "Strict CSP Policy Header"],
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="services" className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-6 overflow-hidden z-10">
      <div className="max-w-6xl w-full space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase">
            Our <span className="text-gold-gradient font-semibold">Services</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="max-w-2xl mx-auto text-sm md:text-base text-text-muted leading-relaxed font-light">
            We cover the full spectrum of digital craftsmanship, from high-fidelity visual concepts to secure, high-performance deployment.
          </p>
        </div>

        {/* 3D Depth Carousel Container */}
        <div className="relative h-[480px] md:h-[420px] w-full flex items-center justify-center select-none" style={{ perspective: "1000px" }}>
          {services.map((service, idx) => {
            const distance = idx - activeIndex;
            const isCenter = idx === activeIndex;
            const absDistance = Math.abs(distance);
            
            // Limit visible cards in orbit to max 3 on each side
            if (absDistance > 2 && absDistance < services.length - 2) return null;

            // Compute circular/orbit transform properties
            let xOffset = distance * 320;
            let zOffset = -absDistance * 120;
            let rotationY = distance * -12;
            let scale = 1 - absDistance * 0.12;
            let opacity = 1 - absDistance * 0.4;
            let zIndex = 100 - absDistance;
            let blur = absDistance * 2;

            // Handle wrap-around index offsets for circular scrolling
            if (distance < -services.length / 2) {
              const newDist = distance + services.length;
              xOffset = newDist * 320;
              zOffset = -Math.abs(newDist) * 120;
              rotationY = newDist * -12;
              scale = 1 - Math.abs(newDist) * 0.12;
              opacity = 1 - Math.abs(newDist) * 0.4;
              zIndex = 100 - Math.abs(newDist);
              blur = Math.abs(newDist) * 2;
            } else if (distance > services.length / 2) {
              const newDist = distance - services.length;
              xOffset = newDist * 320;
              zOffset = -Math.abs(newDist) * 120;
              rotationY = newDist * -12;
              scale = 1 - Math.abs(newDist) * 0.12;
              opacity = 1 - Math.abs(newDist) * 0.4;
              zIndex = 100 - Math.abs(newDist);
              blur = Math.abs(newDist) * 2;
            }

            return (
              <motion.div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: rotationY,
                  scale: scale,
                  opacity: opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`absolute w-[300px] md:w-[360px] p-8 glass-panel rounded-custom flex flex-col justify-between space-y-6 h-[400px] md:h-[360px] cursor-pointer ${
                  isCenter ? "border-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.15)]" : "border-white/5 opacity-50"
                }`}
              >
                {/* Card Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-custom bg-gold/10 border border-gold/20 w-fit ${isCenter ? "animate-pulse-glow" : ""}`}>
                      {service.icon}
                    </div>
                    <span className="text-[10px] text-gold-dark font-mono uppercase tracking-widest">
                      0{idx + 1} // SERV
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl md:text-2xl tracking-wider text-gold-light uppercase font-semibold">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Sub features */}
                {isCenter && (
                  <motion.ul 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5 text-[10px] text-text-muted font-mono"
                  >
                    {service.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center space-x-1.5">
                        <span className="w-1 h-1 bg-gold rounded-full" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex justify-center items-center space-x-6 z-20 relative">
          <button
            onClick={handlePrev}
            className="p-3 bg-white/5 border border-white/10 hover:border-gold/40 text-gold-light rounded-custom hover:brightness-110 active:scale-95 transition-all duration-300 backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-mono tracking-widest text-text-muted">
            0{activeIndex + 1} <span className="text-gold-dark">/</span> 0{services.length}
          </span>

          <button
            onClick={handleNext}
            className="p-3 bg-white/5 border border-white/10 hover:border-gold/40 text-gold-light rounded-custom hover:brightness-110 active:scale-95 transition-all duration-300 backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
