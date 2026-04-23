import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { AnimatedDisclosure } from "@/components/home/AnimatedDisclosure";
import { GradientBackground } from "@/components/home/GradientBackground";

interface DisclosureHeroSectionProps {
  title?: string;
  subtitle?: string;
}

export const DisclosureHeroSection = memo(function DisclosureHeroSection({ 
  title = "Comprehensive Footnote Disclosures",
  subtitle = "AI-completed checklists and industry benchmarking — significant time savings on the work AI is built for."
}: DisclosureHeroSectionProps) {
  
  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 overflow-hidden">
      {/* Blue gradient background */}
      <GradientBackground />
      
      <div className="container px-4 md:px-6 text-center relative z-10">
        
        {/* Text content centered */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
            <span className="text-gray-900">Comprehensive </span>
            <span className="text-white">Footnote Disclosures</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-900 mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Button size="lg" variant="black" asChild>
              <Link to="/signup-select">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100" asChild>
              <Link to="/request-demo">Request a Demo</Link>
            </Button>
          </div>
        </div>
        
        {/* Animated Disclosure mockup centered */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: "300ms" }}>
          <AnimatedDisclosure />
        </div>
      </div>
    </section>
  );
});
