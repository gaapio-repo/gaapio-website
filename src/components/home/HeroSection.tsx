import { Button } from "@/components/ui/button";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GradientBackground } from "./GradientBackground";
import { AnimatedMemo } from "./AnimatedMemo";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export const HeroSection = memo(function HeroSection({ 
  title = "Your AI-Powered Technical Accounting Platform",
  subtitle = "AI-Powered. CPA-Approved."
}: HeroSectionProps) {
  const [isClient, setIsClient] = useState(false);
  const [enableSelfSignup, setEnableSelfSignup] = useState(true);
  
  useEffect(() => {
    setIsClient(true);
    
    // Load the self-signup setting
    const loadSelfSignupSetting = () => {
      const savedSetting = localStorage.getItem("enableSelfSignup");
      setEnableSelfSignup(savedSetting !== null ? savedSetting === "true" : true);
    };
    
    // Initial load
    loadSelfSignupSetting();
    
    // Listen for storage changes (in case admin updates in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "enableSelfSignup") {
        loadSelfSignupSetting();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [enableSelfSignup]);

  // Split title into parts for gradient effect
  const titleParts = title.split(" ");
  const firstPart = titleParts.slice(0, 2).join(" "); // "Better Accounting"
  const secondPart = titleParts.slice(2).join(" "); // "Memos. Faster."

  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Gradient Background */}
      <GradientBackground />
      
      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-start text-left space-y-8 animate-fade-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gray-900 dark:text-white">
                {firstPart}
              </span>
              {" "}
              <span className="text-white dark:text-white inline-block">
                {secondPart}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-white/90 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "100ms" }}>
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 h-auto font-semibold" asChild>
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 text-base px-8 py-6 h-auto font-semibold" asChild>
                <Link to="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Animated Memo */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] -mr-16 md:-mr-24 lg:-mr-32 overflow-visible animate-fade-up flex justify-end items-center" style={{ animationDelay: "200ms" }}>
            <div className="relative scale-90 md:scale-100 lg:scale-110">
              {isClient && <AnimatedMemo />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
