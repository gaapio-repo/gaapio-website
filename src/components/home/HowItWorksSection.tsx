
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Research",
    delay: 0,
    bullets: [
      "Research guidance quickly",
      "Upload and analyze contracts for key terms",
      "Access authoritative sources and Big 4 resources"
    ]
  },
  {
    number: "02",
    title: "Analyze",
    delay: 100,
    bullets: [
      "Scope the accounting issue",
      "Identify risks and grey areas",
      "Apply relevant standards to the facts"
    ]
  },
  {
    number: "03",
    title: "Draft",
    delay: 200,
    bullets: [
      "AI drafts memo with built-in guardrails",
      "Up-to-date with latest standards",
      "Guided prompts ensure accuracy"
    ]
  },
  {
    number: "04",
    title: "Review & Iterate",
    delay: 300,
    bullets: [
      "AI reviews and suggests improvements",
      "Internal sign-offs and audit trail",
      "Full version history and comments"
    ]
  },
  {
    number: "05",
    title: "Deliver",
    delay: 400,
    bullets: [
      "Presentation-ready memos",
      "Exportable audit package",
      "Organized file cabinet for final versions"
    ]
  }
];

export function HowItWorksSection() {
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

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: '#F8FBFF' }}
    >
      {/* Dark mode background overlay */}
      <div className="absolute inset-0 bg-[#1A1F2B] dark:opacity-100 opacity-0 transition-opacity" />
      
      <div className="container px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How It Works</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your technical accounting memos in five powerful steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={cn(
                "group flex flex-col rounded-[18px] py-9 px-7 relative overflow-hidden",
                "transition-all duration-300 ease-out",
                "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]",
                "dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
                "hover:shadow-[0_6px_20px_rgba(0,0,0,0.08),0_12px_28px_rgba(0,153,255,0.06)]",
                "dark:hover:shadow-[0_8px_24px_rgba(0,153,255,0.15)]",
                "hover:-translate-y-[3px]",
                "border border-border/80 hover:border-[#0099FF]/25",
                "dark:border-white/5 dark:hover:border-[#0099FF]/40",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
              )}
              style={{ 
                transitionDelay: `${step.delay}ms`,
                transitionDuration: "500ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                backgroundColor: '#FFFFFF',
              }}
            >
              {/* Dark mode background */}
              <div className="absolute inset-0 bg-[#1a2234] opacity-0 dark:opacity-100 -z-10" />
              
              {/* Blue accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#0099FF] rounded-t-[18px]" />
              
              {/* Background step number - decorative */}
              <div 
                className="absolute right-3 top-8 text-[72px] font-bold leading-none select-none pointer-events-none"
                style={{ 
                  color: 'rgba(0, 153, 255, 0.06)',
                }}
              >
                <span className="dark:hidden">{step.number}</span>
                <span className="hidden dark:inline text-white/[0.04]">{step.number}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-[17px] font-semibold text-[#0099FF] mb-5 mt-1 relative z-10 group-hover:text-[#0088EE] transition-colors duration-300">
                {step.title}
              </h3>
              
              {/* Bullets */}
              <ul className="text-left space-y-3.5 relative z-10 flex-grow">
                {step.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0099FF]/50 mt-[7px] mr-2.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-[14px] leading-[1.7] font-normal">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
