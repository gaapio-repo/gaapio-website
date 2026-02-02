import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductHighlightsSection } from "@/components/home/ProductHighlightsSection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { KeyBenefitsSection } from "@/components/home/KeyBenefitsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { SEO } from "@/components/SEO";
import { SoftwareApplicationSchema } from "@/components/StructuredData";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Gaapio - AI-Powered Technical Accounting Platform"
        description="AI-powered platform built by CPAs for CPAs. Create technical accounting memos, footnote disclosures, contract analysis, and compliance documentation faster and more accurately."
        canonical="/"
        keywords={['technical accounting software', 'AI accounting memos', 'CPA tools', 'ASC 606', 'ASC 842', 'footnote disclosures']}
      />
      <SoftwareApplicationSchema />
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