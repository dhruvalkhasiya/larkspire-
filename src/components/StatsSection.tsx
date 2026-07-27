"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Gauge, Sparkles } from "lucide-react";

interface StatItem {
  label: string;
  beforeVal: number;
  afterVal: number;
  unit: string;
  metric: string;
}

function GaugeWidget({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [value, setValue] = useState(stat.beforeVal);

  useEffect(() => {
    if (!isInView) return;

    // Animate counter value
    let start = stat.beforeVal;
    const end = stat.afterVal;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    
    const timer = setInterval(() => {
      if (start < end) {
        start += 1;
        setValue(start);
      } else {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [isInView, stat.beforeVal, stat.afterVal]);

  // Compute needle rotation angle: map percentage/value to degree range [-120deg, 120deg]
  const maxVal = stat.unit === "/10" ? 10 : 100;
  const percentage = value / maxVal;
  const needleRotation = -120 + percentage * 240;

  return (
    <div ref={ref} className="glass-panel p-8 rounded-custom flex flex-col items-center justify-between space-y-6 min-h-[300px] border border-white/5">
      <h3 className="font-display text-xs text-text-muted tracking-[0.25em] uppercase font-semibold text-center">
        {stat.label}
      </h3>

      {/* Speedometer Gauge Visual */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Gauge Background Ring */}
        <svg className="w-full h-full rotate-[150deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="6"
            strokeDasharray="251"
            strokeDashoffset="75" // leaves bottom gap
          />
          {/* Active Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="6"
            strokeDasharray="251"
            initial={{ strokeDashoffset: 251 }}
            animate={isInView ? { strokeDashoffset: 251 - (176 * percentage) } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Defs for gold gradient */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9C7A1F" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#F4E5B2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-3xl font-display font-bold tracking-tight text-gold-light">
            {value}
            <span className="text-xs font-mono text-text-muted ml-0.5">{stat.unit}</span>
          </div>
          <span className="text-[9px] font-mono text-gold tracking-widest uppercase">
            {stat.metric}
          </span>
        </div>

        {/* Speedometer Needle */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 w-[2px] h-[52px] bg-gradient-to-t from-gold-accent to-gold-light origin-bottom"
          style={{
            x: "-50%",
            y: "0%",
            rotate: -120, // initial
          }}
          animate={isInView ? { rotate: needleRotation } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Center Pin */}
        <div className="absolute bottom-[calc(50%-4px)] left-[calc(50%-4px)] w-2.5 h-2.5 bg-gold border border-bg rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
      </div>

      {/* Before / After Stats Footer */}
      <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-center text-xs font-mono">
        <div>
          <span className="block text-[9px] text-text-muted tracking-widest uppercase">BEFORE</span>
          <span className="text-red-400 font-bold line-through">
            {stat.beforeVal}
            {stat.unit}
          </span>
        </div>
        <div className="border-l border-white/5">
          <span className="block text-[9px] text-gold tracking-widest uppercase">AFTER</span>
          <span className="text-green-400 font-bold">
            {stat.afterVal}
            {stat.unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const stats: StatItem[] = [
    {
      label: "Visual Design & UX",
      beforeVal: 2,
      afterVal: 10,
      unit: "/10",
      metric: "Aesthetic",
    },
    {
      label: "Core Web Vitals Speed",
      beforeVal: 34,
      afterVal: 98,
      unit: "%",
      metric: "Performance",
    },
    {
      label: "SEO Visibility Index",
      beforeVal: 51,
      afterVal: 100,
      unit: "%",
      metric: "Optimization",
    },
    {
      label: "Conversion Rates",
      beforeVal: 1, // 1%
      afterVal: 5, // 5%
      unit: "%",
      metric: "Revenue",
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-6 z-10 bg-gradient-to-b from-bg-alt/30 to-transparent">
      <div className="max-w-6xl w-full space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase">
            Client <span className="text-gold-gradient font-semibold">Impact</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="max-w-2xl mx-auto text-sm md:text-base text-text-muted leading-relaxed font-light">
            We don't just deliver animations; we optimize business infrastructure. Here is the average performance leap our clients experience.
          </p>
        </div>

        {/* Dials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <GaugeWidget key={idx} stat={stat} />
          ))}
        </div>

        {/* Feature Quote */}
        <div className="max-w-3xl mx-auto text-center border-t border-b border-white/5 py-8 space-y-4">
          <Sparkles className="w-6 h-6 text-gold mx-auto animate-pulse-glow" />
          <blockquote className="font-display text-lg md:text-xl italic text-text-muted font-light leading-relaxed">
            "A premium aesthetic creates instant trust. A high-performance codebase converts that trust into client action. We deliver both."
          </blockquote>
          <cite className="block text-xs font-mono tracking-widest text-gold uppercase not-italic">
            — Parmar Tirthraj & Dhruval Khasiya
          </cite>
        </div>

      </div>
    </section>
  );
}
