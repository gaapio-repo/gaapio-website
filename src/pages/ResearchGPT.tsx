import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResearchHeroSection } from "@/components/research/ResearchHeroSection";
import { ResearchHowItWorksSection } from "@/components/research/ResearchHowItWorksSection";
import { ResearchBenefitsSection } from "@/components/research/ResearchBenefitsSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";

export default function ResearchGPT() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - White Background */}
          <div className="bg-white dark:bg-background">
            <ResearchHeroSection />
          </div>
          
          {/* How It Works Section - Gradient Background */}
          <ResearchHowItWorksSection />
          
          {/* Social Proof Section - White Background */}
          <div className="bg-white dark:bg-background">
            <SocialProofSection />
          </div>
          
          {/* Benefits Section - Blue Background */}
          <div className="bg-[#339CFF] dark:bg-[#2563eb]">
            <ResearchBenefitsSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
