import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import researchImage from "@/assets/gaapio-research.png";

export const ResearchHeroSection = memo(function ResearchHeroSection() {
  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 bg-white dark:bg-background overflow-hidden">
      <div className="container px-4 md:px-6 text-center relative z-10">
        {/* Text content centered */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6 animate-fade-up">
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">AI-Powered Research Assistant</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up dark:text-white" style={{ animationDelay: "100ms" }}>
            Accounting Research
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-up dark:text-gray-300" style={{ animationDelay: "200ms" }}>
            Unlock instant access to your firm's collective knowledge with AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Button size="lg" variant="blue" asChild>
              <Link to="/request-demo">Request a Demo</Link>
            </Button>
            <Button size="lg" variant="blueOutline" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
        
        {/* Visual Element */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="relative w-full max-w-5xl">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
              <img 
                src={researchImage} 
                alt="Gaapio Accounting Research Interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
