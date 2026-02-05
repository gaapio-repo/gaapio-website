
import { FileText, Shield, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function BenefitsSection() {
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

  const benefits = [
    {
      icon: CheckCircle2,
      title: "Audit Ready",
      description: "Structured documentation that satisfies auditor requirements including version history and review notes.",
      delay: 0
    },
    {
      icon: Clock,
      title: "Time & Cost Savings",
      description: "Cut memo and disclosure creation time by up to 90%. Make your internal team look like rockstars — or save thousands compared to outsourced memos.",
      delay: 100
    },
    {
      icon: FileText,
      title: "CPA-Level Output",
      description: "AI-generated memos and disclosures that match or exceed the quality of experienced CPAs.",
      delay: 200
    },
    {
      icon: Shield,
      title: "GAAP Compliance",
      description: "Always up-to-date with the latest accounting standards and guidelines.",
      delay: 300
    },
    {
      icon: ShieldCheck,
      title: "Enterprise-Grade Security",
      description: "Your data stays private — never used to train public AI models. We follow strict security protocols.",
      delay: 400
    }
  ];

  return (
    <section 
      id="benefits" 
      ref={sectionRef}
      className="py-24 md:py-36 relative"
      style={{ backgroundColor: '#F8FBFF' }}
    >
      {/* Dark mode background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/80 via-slate-800/80 to-slate-800/80 dark:opacity-100 opacity-0 transition-opacity" />
      
      <div className="container px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column - Heading and description */}
          <div className="space-y-6 lg:sticky lg:top-32">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Key Benefits
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
              AI-powered confidence. CPA-quality output. Enterprise-grade security.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
              Save time, reduce costs, and deliver audit-ready documentation — every time.
            </p>
          </div>
          
          {/* Right column - Benefits list */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={cn(
                  "flex gap-5 transition-all",
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-[20px]"
                )}
                style={{ 
                  transitionDelay: `${benefit.delay}ms`,
                  transitionDuration: "500ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
                }}
              >
                {/* Icon with circular background */}
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#0099FF]/10 dark:bg-[#0099FF]/15 flex items-center justify-center">
                    <benefit.icon className="h-5 w-5 text-[#0099FF]" strokeWidth={2} />
                  </div>
                </div>
                
                {/* Text content */}
                <div className="text-left pt-1">
                  <h3 className="text-[17px] font-semibold text-gray-900 dark:text-white mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-[1.7]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
