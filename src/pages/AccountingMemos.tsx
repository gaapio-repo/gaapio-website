import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/HeroSectionRight";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SEO } from "@/components/SEO";
import { ProductSchema } from "@/components/StructuredData";

export default function AccountingMemos() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="AI Accounting Memos - Generate Technical Memos in Minutes"
        description="Create audit-ready technical accounting memos with AI. Generate ASC 606, ASC 842, and other technical memos in minutes with version history and reviewer comments."
        canonical="/accounting-memos"
        type="product"
        keywords={['accounting memos', 'technical accounting', 'ASC 606 memos', 'ASC 842 memos', 'audit documentation']}
      />
      <ProductSchema
        name="Gaapio Accounting Memos"
        description="AI-powered technical accounting memo generation with version history, reviewer comments, and exportable audit packages."
        url="/accounting-memos"
        features={['AI-powered memo generation', 'Version history', 'Reviewer comments', 'Audit-ready exports']}
      />
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <HeroSection />
          <TrustBarSection />
          <HowItWorksSection />
          <BenefitsSection />
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
