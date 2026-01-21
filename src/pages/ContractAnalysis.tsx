import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContractHeroSection } from "@/components/contract/ContractHeroSection";
import { ContractHowItWorksSection } from "@/components/contract/ContractHowItWorksSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";

export default function ContractAnalysis() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <ContractHeroSection />
          <TrustBarSection />
          <ContractHowItWorksSection />
          <BenefitsSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}