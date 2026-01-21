import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResearchHeroSection } from "@/components/research/ResearchHeroSection";
import { ResearchHowItWorksSection } from "@/components/research/ResearchHowItWorksSection";
import { ResearchBenefitsSection } from "@/components/research/ResearchBenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";

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

          {/* Customer Logos / Trust Bar Section */}
          <TrustBarSection />
          
          {/* How It Works Section - Gradient Background */}
          <ResearchHowItWorksSection />
          
          {/* Benefits Section */}
          <ResearchBenefitsSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
