"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PremiumHeader from "./PremiumHeader";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import PremiumFooter from "./PremiumFooter";

export default function PremiumLanding() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-950 to-black pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <PremiumHeader scrolled={scrolled} />
        <main>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <ServicesSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <PremiumFooter />
      </div>
    </div>
  );
}
