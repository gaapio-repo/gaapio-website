import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/HeroSectionRight";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";

export default function AccountingMemos() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <HeroSection />
          <TrustBarSection />
          <HowItWorksSection />
          <BenefitsSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
