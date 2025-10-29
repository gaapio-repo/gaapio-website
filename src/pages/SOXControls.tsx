import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SOXHeroSection } from "@/components/sox/SOXHeroSection";
import { SOXHowItWorksSection } from "@/components/sox/SOXHowItWorksSection";
import { SOXBenefitsSection } from "@/components/sox/SOXBenefitsSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";

export default function SOXControls() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - White Background */}
          <div className="bg-white dark:bg-background">
            <SOXHeroSection />
          </div>
          
          {/* How It Works Section - Gradient Background */}
          <SOXHowItWorksSection />
          
          {/* Social Proof Section - White Background */}
          <div className="bg-white dark:bg-background">
            <SocialProofSection />
          </div>
          
          {/* Benefits Section - Blue Background */}
          <div className="bg-[#339CFF] dark:bg-[#2563eb]">
            <SOXBenefitsSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
