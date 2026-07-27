"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface PriceTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export default function PricingSection() {
  const tiers: PriceTier[] = [
    {
      name: "Starter",
      price: "$2,500",
      description: "For startups seeking an elegant, high-performance visual landing page.",
      features: [
        "1 Immersive Landing Page",
        "3D Monogram Setup",
        "Fully Responsive Layout",
        "Basic SEO Structure",
        "1 Month Bug Support",
      ],
      cta: "Acquire Starter",
      popular: false,
    },
    {
      name: "Business",
      price: "$4,800",
      description: "For growing brands requiring a comprehensive multi-page presence.",
      features: [
        "Up to 5 Pages Structure",
        "3D Monogram + Orbit Scene",
        "Custom Design System Tokens",
        "Core Web Vitals Optimizations",
        "3 Months Dev Support",
      ],
      cta: "Acquire Business",
      popular: false,
    },
    {
      name: "Premium",
      price: "$8,500",
      description: "Our signature cinematic tier with advanced WebGL interactions.",
      features: [
        "Multi-page & CMS Config",
        "Full 3D Corridor Gallery",
        "Custom Shader Particles",
        "Advanced JSON-LD Schema SEO",
        "6 Months Priority Support",
        "High-End Speed Optimization",
      ],
      cta: "Acquire Premium",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For agencies wanting custom architectures and bespoke designs.",
      features: [
        "Fully Bespoke Web Assets",
        "Dedicated R3F Pipelines",
        "Penetration Security Audit",
        "Ongoing Service Level SLA",
        "Lifetime Collaboration",
      ],
      cta: "Initiate Dialogue",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-6 z-10 bg-gradient-to-b from-transparent to-bg-alt/30">
      <div className="max-w-6xl w-full space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase">
            Pricing <span className="text-gold-gradient font-semibold">Tiers</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="max-w-2xl mx-auto text-sm md:text-base text-text-muted leading-relaxed font-light">
            Invest in a digital flagship. Select a tier that fits your stage, or schedule a consultation to map custom specifications.
          </p>
        </div>

        {/* Pricing Slabs Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch pt-8"
          style={{ perspective: "1500px" }}
        >
          {tiers.map((tier, idx) => {
            return (
              <motion.div
                key={idx}
                className={`glass-panel p-8 rounded-custom flex flex-col justify-between space-y-6 relative transition-all duration-300 ${
                  tier.popular 
                    ? "border-gold border-2 shadow-[0_0_30px_rgba(212,175,55,0.25)] bg-bg-alt md:scale-105 z-20" 
                    : "border-white/5 opacity-90 z-10"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
                whileHover={{
                  y: -10,
                  z: 20,
                  borderColor: "rgba(212, 175, 55, 0.4)",
                  boxShadow: "0 15px 35px rgba(212, 175, 55, 0.15)",
                }}
              >
                {/* Popular Ribbon Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-gold-dark to-gold-accent text-bg text-[8px] font-mono font-bold tracking-[0.2em] uppercase rounded-full flex items-center space-x-1 shadow-md shadow-black/50">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>POPULAR CHOICE</span>
                  </div>
                )}

                {/* Upper Details */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gold tracking-widest uppercase font-semibold block">
                      {tier.name}
                    </span>
                    <h3 className="font-display text-4xl font-bold tracking-tight text-gold-light">
                      {tier.price}
                    </h3>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed font-light">
                    {tier.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-3 pt-6 border-t border-white/5 text-xs text-text-muted">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action */}
                <button
                  className={`w-full py-3 rounded-custom text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 ${
                    tier.popular
                      ? "bg-gradient-to-r from-gold-dark via-gold-light to-gold-accent hover:brightness-110 text-bg shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                      : "bg-white/5 border border-white/10 hover:border-gold/50 text-gold-light hover:text-white"
                  }`}
                >
                  {tier.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
