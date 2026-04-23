import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GuidanceHeroSection } from "@/components/guidance/GuidanceHeroSection";
import { GuidanceHowItWorksSection } from "@/components/guidance/GuidanceHowItWorksSection";
import { NeverMissUpdateSection } from "@/components/guidance/NeverMissUpdateSection";
import { GuidanceMakesSenseSection } from "@/components/guidance/GuidanceMakesSenseSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { SEO } from "@/components/SEO";
import { ProductSchema } from "@/components/StructuredData";

export default function GuidanceUpdates() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Accounting Guidance Updates - Stay Current with FASB Standards"
        description="Real-time alerts for new accounting standards with implementation guidance. Stay current with FASB updates, SEC comment letter trends, and emerging issues."
        canonical="/guidance-updates"
        type="product"
        keywords={['accounting guidance', 'FASB updates', 'accounting standards', 'SEC guidance', 'ASU updates']}
      />
      <ProductSchema
        name="Gaapio Guidance Updates"
        description="Real-time alerts for new accounting standards with implementation guidance."
        url="/guidance-updates"
        features={['Real-time alerts', 'FASB updates', 'SEC guidance', 'Implementation support']}
      />
      <Header />
      
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section - White Background */}
          <GuidanceHeroSection 
            title="Stay Current with Guidance Updates" 
            subtitle="AI-Powered. Always Updated."
          />

          {/* Customer Logos / Trust Bar Section */}
          <TrustBarSection />
          
          {/* How It Works Section - Light Gradient Background */}
          <GuidanceHowItWorksSection />
          
          {/* Never Miss Update Section - Blue Solid Background */}
          <NeverMissUpdateSection />
          
          {/* Guidance Makes Sense Section - White Background */}
          <GuidanceMakesSenseSection />
          
          {/* Final CTA Section - Blue Gradient */}
          <FinalCtaSection />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
