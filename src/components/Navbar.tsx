"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-bg/80 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center select-none">
          {/* Logo Monogram text mark */}
          <a href="#" className="flex items-center space-x-2 group">
            <span className="font-display text-lg tracking-[0.25em] font-bold text-gold-light uppercase group-hover:text-gold transition-colors duration-300">
              Larkspire
            </span>
            <span className="text-[9px] tracking-[0.25em] text-text-muted font-mono uppercase">
              Studios
            </span>
          </a>

          {/* Desktop Navigation Link row */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest text-text-muted">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gold-light transition-colors duration-300 relative uppercase"
              >
                {link.name}
              </a>
            ))}
            
            <a
              href="#contact"
              className="px-5 py-2.5 bg-gradient-to-r from-gold-dark to-gold-accent hover:brightness-110 text-bg text-[10px] font-bold tracking-widest rounded-custom transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] uppercase"
            >
              Consultation
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-white/5 border border-white/10 text-gold-light rounded-custom hover:border-gold/50 transition-all duration-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[70px] bg-bg/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 border-b border-white/5 md:hidden"
          >
            <nav className="flex flex-col items-center space-y-6 text-sm font-mono tracking-widest text-text-muted">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-light transition-colors duration-300 uppercase py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-6 py-3 bg-gradient-to-r from-gold-dark to-gold-accent text-bg font-bold tracking-widest rounded-custom shadow-[0_0_15px_rgba(212,175,55,0.15)] uppercase"
              >
                Start a Project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
