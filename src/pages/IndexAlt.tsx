import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSectionAlt } from "@/components/home/HeroSectionAlt";
import { ProductHighlightsSection } from "@/components/home/ProductHighlightsSection";
import { KeyBenefitsSection } from "@/components/home/KeyBenefitsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";

export default function IndexAlt() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section with Company Selector */}
      <HeroSectionAlt />

      {/* Customer Logos / Trust Bar Section */}
      <TrustBarSection />

      {/* Product Highlights Section */}
      <ProductHighlightsSection />

      {/* Key Benefits Section */}
      <KeyBenefitsSection />

      {/* Final CTA Section */}
      <FinalCtaSection />
      
      <Footer />
    </div>
  );
}
