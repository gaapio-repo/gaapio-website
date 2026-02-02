import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContractHeroSection } from "@/components/contract/ContractHeroSection";
import { ContractHowItWorksSection } from "@/components/contract/ContractHowItWorksSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SEO } from "@/components/SEO";
import { ProductSchema } from "@/components/StructuredData";

export default function ContractAnalysis() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="AI Contract Analysis for ASC 606 & ASC 842 Compliance"
        description="Automated contract analysis for lease abstraction, revenue recognition, and ASC 606/842 compliance. Extract key terms and identify accounting implications automatically."
        canonical="/contract-analysis"
        type="product"
        keywords={['contract analysis', 'ASC 606 compliance', 'ASC 842 compliance', 'lease abstraction', 'revenue recognition']}
      />
      <ProductSchema
        name="Gaapio Contract Analysis"
        description="Automated lease abstraction, revenue contract analysis, and ASC 606/842 compliance evaluation."
        url="/contract-analysis"
        features={['Lease abstraction', 'Revenue contract analysis', 'ASC 606 compliance', 'ASC 842 compliance']}
      />
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <ContractHeroSection />
          <TrustBarSection />
          <ContractHowItWorksSection />
          <BenefitsSection />
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}