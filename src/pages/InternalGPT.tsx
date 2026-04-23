import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InternalGPTHeroSection } from "@/components/internal-gpt/InternalGPTHeroSection";
import { InternalGPTHowItWorksSection } from "@/components/internal-gpt/InternalGPTHowItWorksSection";
import { InternalGPTBenefitsSection } from "@/components/internal-gpt/InternalGPTBenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SEO } from "@/components/SEO";
import { ProductSchema } from "@/components/StructuredData";

export default function InternalGPT() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Internal GPT - AI Knowledge Base for Accounting Teams"
        description="Upload your policies, procedures, and memos to create an AI-powered knowledge base. Enable staff to self-serve answers and reduce manager burden."
        canonical="/internal-gpt"
        type="product"
        keywords={['internal GPT', 'knowledge base', 'AI assistant', 'accounting policies', 'document search', 'institutional knowledge']}
      />
      <ProductSchema
        name="Gaapio Internal GPT"
        description="AI-powered internal knowledge base for accounting teams. Upload documents and get instant answers with citations."
        url="/internal-gpt"
        features={['Document upload', 'Natural language queries', 'Citation tracking', 'Institutional knowledge preservation']}
      />
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - Blue Gradient */}
          <InternalGPTHeroSection />

          {/* Customer Logos / Trust Bar Section */}
          <TrustBarSection />
          
          {/* How It Works Section */}
          <InternalGPTHowItWorksSection />
          
          {/* Benefits Section */}
          <InternalGPTBenefitsSection />
          
          {/* Final CTA Section - Blue Gradient */}
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
