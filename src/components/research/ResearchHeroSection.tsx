import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import researchImage from "@/assets/gaapio-research.png";
import { GradientBackground } from "@/components/home/GradientBackground";

export const ResearchHeroSection = memo(function ResearchHeroSection() {
  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 overflow-hidden">
      {/* Blue gradient background */}
      <GradientBackground />
      
      <div className="container px-4 md:px-6 text-center relative z-10">
        {/* Text content centered */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
            <span className="text-foreground">Accounting </span>
            <span className="text-white">Research</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
            CPA Asked. AI Answered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Button size="lg" variant="black" asChild>
              <Link to="/signup-select">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-foreground text-foreground bg-background hover:bg-muted" asChild>
              <Link to="/request-demo">Request a Demo</Link>
            </Button>
          </div>
        </div>
        
        {/* Visual Element */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="max-w-5xl w-full">
            <img 
              src={researchImage} 
              alt="Gaapio Accounting Research Interface" 
              className="w-full rounded-xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
