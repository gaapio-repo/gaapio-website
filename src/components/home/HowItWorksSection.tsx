
import { Search, Calculator, FileText, RefreshCw, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Search,
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
    icon: Calculator,
    title: "Analyze",
    delay: 300,
    bullets: [
      "Scope the accounting issue",
      "Identify risks and grey areas",
      "Apply relevant standards to the facts"
    ]
  },
  {
    number: "03",
    icon: FileText,
    title: "Draft",
    delay: 600,
    bullets: [
      "AI drafts memo with built-in guardrails",
      "Up-to-date with latest standards",
      "Guided prompts ensure accuracy"
    ]
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "Review & Iterate",
    delay: 900,
    bullets: [
      "AI reviews and suggests improvements",
      "Internal sign-offs and audit trail",
      "Full version history and comments"
    ]
  },
  {
    number: "05",
    icon: Download,
    title: "Deliver",
    delay: 1200,
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
      { threshold: 0.3 }
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
      className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-[#1A1F2B] dark:text-white"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-[#f0f0f0]">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto dark:text-gray-300">
            Streamline your technical accounting memos in five powerful steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={cn(
                "flex flex-col bg-white dark:bg-[#1a2234] rounded-2xl p-6 relative overflow-hidden transition-all",
                "hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_6px_16px_rgba(255,255,255,0.05)] hover:translate-y-[-4px]",
                "shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.03)]",
                "dark:border dark:border-white/5",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
              )}
              style={{ 
                transitionDelay: `${step.delay}ms`,
                transitionDuration: "2000ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
              }}
            >
              <div className="absolute right-4 top-2 text-[60px] font-bold opacity-10 text-[#339CFF] dark:text-[rgba(255,255,255,0.05)] dark:opacity-100">
                {step.number}
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#339CFF20] mb-4 transition-transform duration-300 hover:scale-105 dark:bg-[#339CFF10]">
                <step.icon className="h-6 w-6 text-[#339CFF]" />
              </div>
              <h3 className="inline-block text-lg font-semibold mb-3 relative z-10 px-3 py-1 bg-[#339CFF] text-white rounded-md">{step.title}</h3>
              <ul className="text-muted-foreground text-left text-sm space-y-2 dark:text-gray-400">
                {step.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#339CFF] mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>{bullet}</span>
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
