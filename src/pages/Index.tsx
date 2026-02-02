import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductHighlightsSection } from "@/components/home/ProductHighlightsSection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { KeyBenefitsSection } from "@/components/home/KeyBenefitsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Customer Logos / Trust Bar Section */}
      <TrustBarSection />

      {/* Solutions Section - Private, Public, Firms */}
      <SolutionsSection />

      {/* Modules Section (formerly Product Highlights) */}
      <ProductHighlightsSection />

      {/* Key Benefits Section */}
      <KeyBenefitsSection />

      {/* Final CTA Section */}
      <FinalCtaSection />
      
      <Footer />
    </div>
  );
}