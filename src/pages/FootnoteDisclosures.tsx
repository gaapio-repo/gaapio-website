import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DisclosureHeroSection } from "@/components/disclosures/DisclosureHeroSection";
import { DisclosureHowItWorksSection } from "@/components/disclosures/DisclosureHowItWorksSection";
import { DisclosureBenefitsSection } from "@/components/disclosures/DisclosureBenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function FootnoteDisclosures() {
  return (
    <div className="flex min-h-screen flex-col">
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
