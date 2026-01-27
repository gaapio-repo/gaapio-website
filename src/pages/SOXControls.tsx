import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SOXHeroSection } from "@/components/sox/SOXHeroSection";
import { SOXHowItWorksSection } from "@/components/sox/SOXHowItWorksSection";
import { SOXBenefitsSection } from "@/components/sox/SOXBenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function SOXControls() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - Blue Gradient */}
          <SOXHeroSection />

          {/* Customer Logos / Trust Bar Section */}
          <TrustBarSection />
          
          {/* How It Works Section - White Background */}
          <SOXHowItWorksSection />
          
          {/* Benefits Section - Blue Background */}
          <div className="bg-[#339CFF] dark:bg-[#2563eb]">
            <SOXBenefitsSection />
          </div>
          
          {/* Final CTA Section - Blue Gradient */}
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
