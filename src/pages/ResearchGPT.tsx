import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResearchHeroSection } from "@/components/research/ResearchHeroSection";
import { ResearchHowItWorksSection } from "@/components/research/ResearchHowItWorksSection";
import { ResearchBenefitsSection } from "@/components/research/ResearchBenefitsSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SEO } from "@/components/SEO";
import { ProductSchema } from "@/components/StructuredData";

export default function ResearchGPT() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="ResearchGPT - AI Accounting Research Assistant"
        description="AI-powered research assistant for technical accounting questions. Get answers with citations to ASC, SEC guidance, and Big 4 resources."
        canonical="/research-gpt"
        type="product"
        keywords={['accounting research', 'AI research assistant', 'ASC guidance', 'SEC research', 'technical accounting questions']}
      />
      <ProductSchema
        name="Gaapio ResearchGPT"
        description="AI-powered research assistant with access to authoritative accounting guidance and Big 4 resources."
        url="/research-gpt"
        features={['AI research assistant', 'ASC citations', 'SEC guidance', 'Big 4 resources']}
      />
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - Blue Gradient */}
          <ResearchHeroSection />

          {/* Customer Logos / Trust Bar Section */}
          <TrustBarSection />
          
          {/* How It Works Section - White Background */}
          <ResearchHowItWorksSection />
          
          {/* Benefits Section - Light Blue-Gray Gradient */}
          <ResearchBenefitsSection />
          
          {/* Final CTA Section - Blue Gradient */}
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
