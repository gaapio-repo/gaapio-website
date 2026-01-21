import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { setProtectionStatus, setSitePassword, getSessionVersion } from "@/utils/securityUtils";
import { HeroSection } from "@/components/home/HeroSection";
import { MetricsBar } from "@/components/home/MetricsBar";
import { ProductHighlightsSection } from "@/components/home/ProductHighlightsSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { KeyBenefitsSection } from "@/components/home/KeyBenefitsSection";
import { WhatYoullLearnSection } from "@/components/home/WhatYoullLearnSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
export default function Index() {
  console.log("[Index] Component rendering");

  // Temporarily disable all localStorage/metrics logic to fix loading issue

  return <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Metrics Bar */}
      

      {/* Product Highlights Section */}
      <ProductHighlightsSection />

      {/* Customer Logos / Trust Bar Section */}
      <TrustBarSection />

      {/* Key Benefits Section */}
      <KeyBenefitsSection />

      {/* Testimonials Section */}
      {/* <TestimonialsSection /> */}

      {/* Final CTA Section */}
      <FinalCtaSection />
      
      <Footer />
    </div>;
}