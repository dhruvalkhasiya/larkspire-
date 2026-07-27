"use client";

import React from "react";

// Import Layout & UI components
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import WhyGrid from "@/components/WhyGrid";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {

  return (
    <main className="relative min-h-screen w-full text-text selection:bg-gold selection:text-bg">
      {/* Butter-Smooth Scroll Engine */}
      <SmoothScroll />




      {/* Global Navbar */}
      <Navbar />

      {/* Page Sections Content Layout */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Hero Area */}
        <HeroSection />

        {/* Studio overview & 3D tilt founder cards */}
        <AboutSection />

        {/* Services 3D Orbit Carousel */}
        <ServicesSection />

        {/* Selected Work 3D Corridor walkthrough */}
        <PortfolioSection />

        {/* Dials & Gauges performance benchmarks */}
        <StatsSection />

        {/* Spiral Helical development road map */}
        <ProcessSection />

        {/* Why Larkspire 3D isometric floating grid */}
        <WhyGrid />

        {/* Pricing tiers upright slabs */}
        <PricingSection />

        {/* FAQ Accordions with slow golden dust starfield */}
        <FAQSection />

        {/* Contact form and correspondence details */}
        <ContactSection />

        {/* Site Footer */}
        <Footer />
      </div>

      {/* WhatsApp Pulse Trigger */}
      <WhatsAppButton />
    </main>
  );
}
