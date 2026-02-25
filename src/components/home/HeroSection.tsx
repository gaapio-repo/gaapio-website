import { Button } from "@/components/ui/button";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GradientBackground } from "./GradientBackground";
import { AnimatedMemo } from "./AnimatedMemo";
import { useSiteConfig } from "@/hooks/useSiteConfig";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export const HeroSection = memo(function HeroSection({ 
  title = "Your AI-Powered Technical Accounting Platform",
  subtitle = "AI-Powered. CPA-Approved."
}: HeroSectionProps) {
  const [isClient, setIsClient] = useState(false);
  const { siteConfig, loading } = useSiteConfig();
  const enableSelfSignup = siteConfig?.enable_self_signup ?? true;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Split title into parts for gradient effect
  const titleParts = title.split(" ");
  const firstPart = titleParts.slice(0, 2).join(" "); // "Better Accounting"
  const secondPart = titleParts.slice(2).join(" "); // "Memos. Faster."

  return (
    <section className="relative min-h-[70vh] md:min-h-[65vh] flex items-center pt-24 pb-12 overflow-visible">
      {/* Gradient Background */}
      <GradientBackground />
      
      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 xl:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-start text-left space-y-6 md:space-y-8 animate-fade-up order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gray-900 dark:text-white">
                {firstPart}
              </span>
              {" "}
              <span className="text-white">
                {secondPart}
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-900 dark:text-gray-900 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "100ms" }}>
              {subtitle}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 animate-fade-up${loading ? " invisible" : ""}`} style={{ animationDelay: "200ms" }}>
              {enableSelfSignup ? (
                <Button size="lg" variant="black" className="text-base px-8 py-6 h-auto font-semibold hover:scale-105 transition-all" asChild>
                  <Link to="/signup-select">Sign Up Now</Link>
                </Button>
              ) : (
                <Button size="lg" variant="black" className="text-base px-8 py-6 h-auto font-semibold hover:scale-105 transition-all" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100 hover:scale-105 text-base px-8 py-6 h-auto font-semibold transition-all" asChild>
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Animated Memo */}
          <div className="relative min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] xl:min-h-[600px] 2xl:min-h-[700px] -mx-4 sm:mx-0 xl:-mr-8 2xl:-mr-16 overflow-visible animate-fade-up flex justify-center xl:justify-end items-center order-2" style={{ animationDelay: "200ms" }}>
            <div className="relative w-full h-full flex items-center justify-center xl:justify-end">
              {isClient && <AnimatedMemo />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
