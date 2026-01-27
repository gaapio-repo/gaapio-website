import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResearchHeroSection } from "@/components/research/ResearchHeroSection";
import { ResearchHowItWorksSection } from "@/components/research/ResearchHowItWorksSection";
import { ResearchBenefitsSection } from "@/components/research/ResearchBenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function ResearchGPT() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - Blue Gradient */}
          <ResearchHeroSection />

          {/* Customer Logos / Trust Bar Section */}
          <TrustBarSection />
          
          {/* How It Works Section - White Background */}
          <ResearchHowItWorksSection />
          
          {/* Benefits Section - Light Blue-Gray Gradient */}
          <ResearchBenefitsSection />
          
          {/* Final CTA Section - Blue Gradient */}
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
