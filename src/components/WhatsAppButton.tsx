"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/1234567890"; // Placeholder whatsapp number

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-gold-dark via-gold-light to-gold-accent hover:brightness-110 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] active:scale-95 transition-all duration-300 group hover:-translate-y-1 animate-pulse-glow"
    >
      <MessageCircle className="w-6 h-6 text-bg group-hover:scale-105 transition-transform duration-300" />
      <span className="absolute right-full mr-3 py-1 px-3 bg-bg-alt/90 border border-gold/20 text-[9px] font-mono text-gold-light uppercase tracking-widest rounded-custom opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block whitespace-nowrap backdrop-blur-sm">
        Direct Chat
      </span>
    </a>
  );
}
