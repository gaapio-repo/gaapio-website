import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContractHeroSection } from "@/components/contract/ContractHeroSection";
import { AccountingDrivenSection } from "@/components/contract/AccountingDrivenSection";
import { FlexibleTemplatesSection } from "@/components/contract/FlexibleTemplatesSection";
import { ContractToSpreadsheetSection } from "@/components/contract/ContractToSpreadsheetSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SEO } from "@/components/SEO";
import { ProductSchema } from "@/components/StructuredData";

export default function ContractAnalysis() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="AI Contract Analysis for ASC 606 & ASC 842 Compliance"
        description="Structured templates, GAAP-aligned workflows, and repeatable extraction from contracts to spreadsheets. Analyze leases, revenue contracts, and more."
        canonical="/contract-analysis"
        type="product"
        keywords={['contract analysis', 'ASC 606 compliance', 'ASC 842 compliance', 'lease abstraction', 'revenue recognition', 'contract to spreadsheet']}
      />
      <ProductSchema
        name="Gaapio Contract Analysis"
        description="Structured templates, GAAP-aligned workflows, and repeatable extraction from contracts to spreadsheets."
        url="/contract-analysis"
        features={['GAAP-aligned templates', 'Issue-centric workflows', 'Excel & CSV export', 'Multi-contract comparison']}
      />
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <ContractHeroSection />
          <TrustBarSection />
          <AccountingDrivenSection />
          <FlexibleTemplatesSection />
          <ContractToSpreadsheetSection />
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}