"use client";

import React from "react";
import { Sparkles, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-bg-alt border-t border-white/5 py-16 px-6 z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Upper Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <span className="font-display text-xl tracking-[0.2em] font-bold text-gold-light uppercase">
                Larkspire
              </span>
              <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase">Studios</span>
            </div>
            
            <p className="text-xs text-text-muted tracking-widest uppercase font-mono">
              We Design • We Develop • We Deliver
            </p>
            
            <p className="max-w-sm text-xs text-text-muted leading-relaxed font-light">
              Boutique design and development agency engineering premium 3D web structures and bespoke digital designs.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-gold tracking-widest uppercase font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-text-muted font-light">
              <li>
                <a href="#about" className="hover:text-gold-light transition-colors duration-300">
                  About Studio
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold-light transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-gold-light transition-colors duration-300">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-gold-light transition-colors duration-300">
                  Pricing Tiers
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-light transition-colors duration-300">
                  FAQ Accordion
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Top Scroll Column */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono text-gold tracking-widest uppercase font-bold">
                Connect
              </h4>
              <div className="flex items-center space-x-3.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 hover:border-gold/50 text-gold-light rounded-custom hover:-translate-y-1 hover:bg-gold/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 hover:border-gold/50 text-gold-light rounded-custom hover:-translate-y-1 hover:bg-gold/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 hover:border-gold/50 text-gold-light rounded-custom hover:-translate-y-1 hover:bg-gold/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-fit flex items-center space-x-2 px-3 py-1.5 border border-white/10 hover:border-gold/40 text-[10px] text-text-muted hover:text-gold-light tracking-widest font-mono rounded-custom transition-all duration-300 uppercase mt-4 md:mt-0"
            >
              <span>BACK TO SUMMIT</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-text-muted font-mono tracking-wider space-y-4 sm:space-y-0 text-center">
          <span>
            © 2026 LARKSPIRE STUDIOS. ALL RIGHTS RESERVED.
          </span>
          <span className="flex items-center justify-center space-x-1 uppercase">
            <span>DESIGN & DEVELOPMENT BY</span>
            <span className="text-gold">PARMAR TIRTHRAJ</span>
            <span>&</span>
            <span className="text-gold">DHRUVAL KHASIYA</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
