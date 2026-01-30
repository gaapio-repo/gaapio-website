import { memo, useEffect, useState } from "react";
import { GradientBackground } from "./GradientBackground";
import { CompanyTypeSelector } from "./CompanyTypeSelector";

interface HeroSectionAltProps {
  title?: string;
  subtitle?: string;
}

export const HeroSectionAlt = memo(function HeroSectionAlt({ 
  title = "Your AI-Powered Technical Accounting Platform",
  subtitle = "AI-Powered. CPA-Approved."
}: HeroSectionAltProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Split title into parts for gradient effect
  const titleParts = title.split(" ");
  const firstPart = titleParts.slice(0, 2).join(" ");
  const secondPart = titleParts.slice(2).join(" ");

  return (
    <section className="relative min-h-[70vh] md:min-h-[65vh] flex items-center pt-24 pb-12 overflow-visible">
      {/* Gradient Background */}
      <GradientBackground />
      
      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-start text-left space-y-6 md:space-y-8 animate-fade-up order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gray-900">
                {firstPart}
              </span>
              {" "}
              <span className="text-white inline-block">
                {secondPart}
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-800 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "100ms" }}>
              {subtitle}
            </p>
          </div>
          
          {/* Right Column - Company Type Selector */}
          <div className="relative min-h-[350px] sm:min-h-[400px] flex justify-center xl:justify-end items-center order-2 animate-fade-up" style={{ animationDelay: "200ms" }}>
            {isClient && <CompanyTypeSelector />}
          </div>
        </div>
      </div>
    </section>
  );
});
