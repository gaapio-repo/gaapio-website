import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";

interface ContractHeroSectionProps {
  title?: string;
  subtitle?: string;
}

export const ContractHeroSection = memo(function ContractHeroSection({ 
  title = "AI-Powered Contract Analysis",
  subtitle = "AI-Powered. Contract-Analyzed"
}: ContractHeroSectionProps) {
  
  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 overflow-hidden">
      {/* Blue gradient background */}
      <GradientBackground />
      
      <div className="container px-4 md:px-6 text-center relative z-10">
        
        {/* Text content centered */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-white/90 mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
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
        
        {/* Contract Analysis Interface */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="max-w-5xl w-full">
            <img 
              src="/lovable-uploads/3a657ff4-6c15-4cac-9ca2-12382772e241.png" 
              alt="Contract Analysis Interface showing lease agreement analysis with key insights and AI-powered recommendations"
              className="w-full rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 dark:hidden"
            />
            <img 
              src="/lovable-uploads/3f032ae1-2451-4150-bd12-137d7424d9b1.png" 
              alt="Contract Analysis Interface showing lease agreement analysis with key insights and AI-powered recommendations in dark mode"
              className="w-full rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
