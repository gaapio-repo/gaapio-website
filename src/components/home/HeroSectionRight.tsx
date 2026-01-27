import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedMemoRight } from "./AnimatedMemoRight";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GradientBackground } from "./GradientBackground";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export const HeroSection = memo(function HeroSection({ 
  title = "Better Memos, Faster",
  subtitle = "AI-Powered. CPA-Approved."
}: HeroSectionProps) {
  const [isClient, setIsClient] = useState(false);
  const [enableSelfSignup, setEnableSelfSignup] = useState(true);
  const isLargeScreen = useMediaQuery('lg');
  
  useEffect(() => {
    console.log('Hero: isLargeScreen =', isLargeScreen, 'window.innerWidth =', window.innerWidth);
  }, [isLargeScreen]);
  
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
  
  // Scroll to Product Highlights section when arrow is clicked
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('product-highlights');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 overflow-hidden">
      {/* Blue gradient background */}
      <GradientBackground />
      
      {/* Hero content with improved spacing */}
      <div className="container px-4 md:px-6 flex flex-col items-center relative z-10">
        {/* Text content centered */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-white/90 mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Button size="lg" variant="black" asChild>
              <Link to="/request-demo">Request a Demo</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100" asChild>
              <Link to="/contact">Ask a Question</Link>
            </Button>
          </div>
        </div>
        
        {/* Constrained animated memo display with better mobile spacing */}
        {isClient && (
          <div className="hero-memo-container mb-24 md:mb-16">
            <AnimatedMemoRight />
          </div>
        )}
      </div>
      
      {/* Down arrow for scrolling to next section - now with proper spacing */}
      <div 
        className="animate-fade-up absolute bottom-8 md:bottom-6" 
        style={{ animationDelay: "400ms" }} 
        onClick={scrollToNextSection}
      >
        <ArrowDownCircle className="h-10 w-10 text-muted-foreground/50 dark:text-gray-400/70 animate-pulse-slow cursor-pointer" aria-hidden="true" />
      </div>
    </section>
  );
});
