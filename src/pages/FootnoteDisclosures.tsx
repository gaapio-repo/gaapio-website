import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DisclosureHeroSection } from "@/components/disclosures/DisclosureHeroSection";
import { DisclosureHowItWorksSection } from "@/components/disclosures/DisclosureHowItWorksSection";
import { DisclosureBenefitsSection } from "@/components/disclosures/DisclosureBenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SEO } from "@/components/SEO";
import { ProductSchema } from "@/components/StructuredData";

export default function FootnoteDisclosures() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="AI Footnote Disclosures - Complete Financial Statement Disclosures"
        description="Generate comprehensive footnote disclosures with AI-trained benchmarking and requirement checklists. Ensure complete and compliant financial statement disclosures."
        canonical="/footnote-disclosures"
        type="product"
        keywords={['footnote disclosures', 'financial statement disclosures', 'SEC disclosures', 'GAAP compliance', 'audit disclosures']}
      />
      <ProductSchema
        name="Gaapio Footnote Disclosures"
        description="AI-trained benchmarking and footnote requirement checklists with CPA-approved formatting for complete financial statement disclosures."
        url="/footnote-disclosures"
        features={['AI benchmarking', 'Requirement checklists', 'CPA-approved formatting', 'Compliance verification']}
      />
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - Blue Gradient with Animated Disclosure */}
          <DisclosureHeroSection 
            title="Comprehensive Footnote Disclosures" 
            subtitle="AI-Powered. Compliance-Ready."
          />

          {/* Customer Logos / Trust Bar Section */}
          <TrustBarSection />
          
          {/* How It Works Section - White Background */}
          <DisclosureHowItWorksSection />
          
          {/* Benefits Section - Light Blue-Gray Gradient */}
          <DisclosureBenefitsSection />
          
          {/* Final CTA Section - Blue Gradient */}
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
