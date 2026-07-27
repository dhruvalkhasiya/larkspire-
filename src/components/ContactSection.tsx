"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";

export default function ContactSection() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [service, setService] = useState("Website Development");
  const [budget, setBudget] = useState("$6,000 - $10,000");
  const [message, setMessage] = useState("");

  // Parallax for the side graphics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setWebsite("");
      setService("Website Development");
      setBudget("$6,000 - $10,000");
      setMessage("");
    }, 3000);
  };

  return (
    <section id="contact" className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-6 z-10 bg-transparent">
      <div className="max-w-6xl w-full space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase">
            Start A <span className="text-gold-gradient font-semibold">Project</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="max-w-2xl mx-auto text-sm md:text-base text-text-muted leading-relaxed font-light">
            Tell us about your project. Complete the inquiry form below, and we will get back to you within 24 hours to schedule an initial consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Direct details & 3D Envelope Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 h-full">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="glass-panel p-8 rounded-custom border border-white/5 space-y-6 flex-grow flex flex-col justify-center select-none"
            >
              <div style={{ transform: "translateZ(20px)" }} className="space-y-6">
                <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">
                  Direct Correspondence
                </span>
                
                <h3 className="font-display text-2xl tracking-wider text-gold-light uppercase font-bold">
                  Larkspire Headquarters
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-text-muted font-mono">
                  <div className="flex items-center space-x-3.5">
                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                    <a href="mailto:hello@larkspire.com" className="hover:text-gold-light transition-colors duration-300">
                      hello@larkspire.com
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3.5">
                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                    <a href="tel:+1234567890" className="hover:text-gold-light transition-colors duration-300">
                      +1 (234) 567-890
                    </a>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Remote / Gujarat, India</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-3 font-mono text-[11px] text-text-muted">
                  <p>
                    <span className="text-gold font-bold">Parmar Tirthraj:</span> design@larkspire.com
                  </p>
                  <p>
                    <span className="text-gold font-bold">Dhruval Khasiya:</span> tech@larkspire.com
                  </p>
                </div>
              </div>

              {/* Styled 3D floating envelope outline visual */}
              <div 
                className="w-full h-32 flex items-center justify-center pt-4 relative overflow-hidden" 
                style={{ transform: "translateZ(10px)" }}
              >
                <div className="absolute w-24 h-24 rounded-full bg-gold/5 filter blur-xl animate-pulse-glow" />
                <svg className="w-20 h-20 text-gold/30 animate-float" viewBox="0 0 100 100">
                  <path 
                    d="M10 25 L50 55 L90 25 L90 75 L10 75 Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                  />
                  <path 
                    d="M10 25 L50 55 L90 25" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-custom border border-white/5 relative">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-text-muted tracking-wider uppercase font-semibold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Parmar Tirthraj"
                          className="w-full bg-white/5 border border-white/10 focus:border-gold/40 focus:bg-white/10 px-4 py-3 text-xs uppercase tracking-wider rounded-custom outline-none transition-all duration-300 text-text"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-text-muted tracking-wider uppercase font-semibold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hello@larkspire.com"
                          className="w-full bg-white/5 border border-white/10 focus:border-gold/40 focus:bg-white/10 px-4 py-3 text-xs tracking-wider rounded-custom outline-none transition-all duration-300 text-text"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-text-muted tracking-wider uppercase font-semibold">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 00000 00000"
                          className="w-full bg-white/5 border border-white/10 focus:border-gold/40 focus:bg-white/10 px-4 py-3 text-xs tracking-wider rounded-custom outline-none transition-all duration-300 text-text"
                        />
                      </div>

                      {/* Company */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-text-muted tracking-wider uppercase font-semibold">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Larkspire Studios"
                          className="w-full bg-white/5 border border-white/10 focus:border-gold/40 focus:bg-white/10 px-4 py-3 text-xs uppercase tracking-wider rounded-custom outline-none transition-all duration-300 text-text"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Service Dropdown */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-text-muted tracking-wider uppercase font-semibold">
                          Service Required
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-bg border border-white/10 focus:border-gold/40 px-4 py-3 text-xs uppercase tracking-wider rounded-custom outline-none transition-all duration-300 text-text"
                        >
                          <option>Website Design</option>
                          <option>Website Development</option>
                          <option>3D & Motion Design</option>
                          <option>SEO Optimization</option>
                          <option>Website Maintenance</option>
                          <option>Security & Compliance</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>

                      {/* Budget Dropdown */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-text-muted tracking-wider uppercase font-semibold">
                          Project Budget
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full bg-bg border border-white/10 focus:border-gold/40 px-4 py-3 text-xs uppercase tracking-wider rounded-custom outline-none transition-all duration-300 text-text"
                        >
                          <option>&lt; $3,000</option>
                          <option>$3,000 - $6,000</option>
                          <option>$6,000 - $10,000</option>
                          <option>$10,000 - $20,000</option>
                          <option>$20,000+</option>
                        </select>
                      </div>
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-text-muted tracking-wider uppercase font-semibold">
                        Current Website (Optional)
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://larkspire.com"
                        className="w-full bg-white/5 border border-white/10 focus:border-gold/40 focus:bg-white/10 px-4 py-3 text-xs tracking-wider rounded-custom outline-none transition-all duration-300 text-text"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-text-muted tracking-wider uppercase font-semibold">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail your requirements here..."
                        className="w-full bg-white/5 border border-white/10 focus:border-gold/40 focus:bg-white/10 px-4 py-3 text-xs tracking-wider rounded-custom outline-none transition-all duration-300 text-text resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-gold-dark via-gold-light to-gold-accent hover:brightness-110 text-bg font-bold text-xs tracking-[0.25em] uppercase rounded-custom transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] flex justify-center items-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5 mr-1" />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-20 min-h-[400px]"
                  >
                    <div className="p-4 bg-gold/15 border border-gold/40 rounded-full animate-pulse-glow">
                      <Sparkles className="w-10 h-10 text-gold-light" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl tracking-wider text-gold uppercase font-bold">
                        Inquiry Received
                      </h3>
                      <p className="text-xs text-text-muted font-mono tracking-widest uppercase">
                        We will make contact within 24 hours.
                      </p>
                    </div>
                    <p className="max-w-xs text-sm text-text-muted font-light leading-relaxed">
                      Thank you for choosing Larkspire Studios. Parmar and Dhruval have been notified.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
