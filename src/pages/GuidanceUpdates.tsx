
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GuidanceHeroSection } from "@/components/guidance/GuidanceHeroSection";
import { GuidanceHowItWorksSection } from "@/components/guidance/GuidanceHowItWorksSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { NeverMissUpdateSection } from "@/components/guidance/NeverMissUpdateSection";
import { GuidanceMakesSenseSection } from "@/components/guidance/GuidanceMakesSenseSection";
import { FinalCtaBanner } from "@/components/guidance/FinalCtaBanner";

export default function GuidanceUpdates() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - White Background */}
          <GuidanceHeroSection 
            title="Stay Current with Guidance Updates" 
            subtitle="AI-Powered. Always Updated."
          />
          
          {/* How It Works Section - Light Gradient Background */}
          <GuidanceHowItWorksSection />
          
          {/* Social Proof Section - White Background */}
          <SocialProofSection />
          
          {/* Never Miss Update Section - Blue Solid Background */}
          <NeverMissUpdateSection />
          
          {/* Guidance Makes Sense Section - White Background */}
          <GuidanceMakesSenseSection />
          
          {/* Final CTA Banner - White Background */}
          <FinalCtaBanner />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
