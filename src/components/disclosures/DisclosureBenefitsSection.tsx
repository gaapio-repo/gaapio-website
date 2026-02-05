import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const DisclosureBenefitsSection = memo(function DisclosureBenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      number: 1,
      title: "Input Details",
      description: "Enter accounting area and key activity information",
      delay: 0
    },
    {
      number: 2,
      title: "AI Generation",
      description: "Generate compliant footnote content in seconds",
      delay: 150
    },
    {
      number: 3,
      title: "Review & Edit",
      description: "Refine and customize your disclosures",
      delay: 300
    },
    {
      number: 4,
      title: "Export Ready",
      description: "Download audit-ready documentation",
      delay: 450
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-white dark:bg-slate-900"
    >
      <div className="container px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Key Benefits
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your footnote disclosure process with AI-powered automation
          </p>
        </div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Connecting line - visible on larger screens */}
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-gray-200 dark:bg-gray-700" />
          
          {/* Progress line overlay (blue) */}
          <div 
            className={cn(
              "hidden lg:block absolute top-8 left-[12%] h-[2px] bg-[#0099FF] transition-all duration-1000 ease-out",
              isVisible ? "right-[12%]" : "right-[88%]"
            )}
            style={{ transitionDelay: "300ms" }}
          />

          {/* Steps container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={cn(
                  "flex flex-col items-center text-center transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ 
                  transitionDelay: `${step.delay}ms`,
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
                }}
              >
                {/* Number badge */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-[#0099FF] flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-xl font-bold text-[#0099FF]">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
