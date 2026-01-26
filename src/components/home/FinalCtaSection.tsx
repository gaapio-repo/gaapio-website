import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Light Gaapio blue gradient background */}
      <div className="absolute inset-0 cta-gradient-bg" />
      
      {/* Subtle dot grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Subtle white glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      {/* Footer transition gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      <ResponsiveContainer className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            )}
          >
            Ready to transform your technical accounting?
          </h2>
          <p 
            className={cn(
              "text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            )} 
            style={{ transitionDelay: "200ms" }}
          >
            Join the CPAs who are already saving hours every month with AI-powered accounting documentation.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            )} 
            style={{ transitionDelay: "400ms" }}
          >
            <Button 
              size="lg" 
              variant="black" 
              className="px-8 hover:bg-gray-800 hover:scale-105 transition-all"
              asChild
            >
              <Link to="/request-demo">Request a Demo</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 border-2 border-white text-white bg-transparent hover:bg-white/10 transition-all"
              asChild
            >
              <Link to="/contact">Ask a Question</Link>
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}