import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DisclosureHeroSection } from "@/components/disclosures/DisclosureHeroSection";
import { DisclosureHowItWorksSection } from "@/components/disclosures/DisclosureHowItWorksSection";
import { DisclosureBenefitsSection } from "@/components/disclosures/DisclosureBenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";

export default function FootnoteDisclosures() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - White Background with Animated Disclosure */}
          <div className="bg-white dark:bg-background">
            <DisclosureHeroSection 
              title="Comprehensive Footnote Disclosures" 
              subtitle="AI-Powered. Compliance-Ready."
            />
          </div>

          {/* Customer Logos / Trust Bar Section */}
          <TrustBarSection />
          
          {/* How It Works Section - Custom Disclosure Version - Gradient Background */}
          <DisclosureHowItWorksSection />
          
          {/* Benefits Section - Blue Background */}
          <div className="bg-[#339CFF] dark:bg-[#2563eb]">
            <DisclosureBenefitsSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
