import { FileCheck, BadgeCheck, BookCheck, Shield } from "lucide-react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface Benefit {
  icon: typeof BookCheck;
  title: string;
  punchline: string;
  bullets: string[];
  proofChips: string[];
  delay: number;
}

function ProofChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#339CFF]/10 text-[#339CFF] border border-[#339CFF]/20">
      {label}
    </span>
  );
}

export function KeyBenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer);
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0,
        rootMargin: "0px 0px -35% 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMobile]);

  const benefits: Benefit[] = [
    {
      icon: BookCheck,
      title: "Organized & Trusted",
      punchline: "Everything in one place.",
      bullets: [
        "Built end-to-end so teams stop digging through scattered files and outdated templates.",
        "Deliverables stay consistent, clear, and partner-ready."
      ],
      proofChips: ["Centralized workspace", "CPA-built workflows"],
      delay: 0
    },
    {
      icon: FileCheck,
      title: "Audit Ready",
      punchline: "Be ready in minutes, not weeks.",
      bullets: [
        "Every input, revision, and approval is automatically captured for a clean audit trail.",
        "Export a complete audit package without chasing comments or history."
      ],
      proofChips: ["Version history", "Sign-offs", "Audit export"],
      delay: 200
    },
    {
      icon: Shield,
      title: "Data Security",
      punchline: "Enterprise-grade privacy by default.",
      bullets: [
        "Your data stays private to your organization—never used to train public models.",
        "Encryption + access controls built in, with SOC 2 in progress."
      ],
      proofChips: ["Encryption", "Access controls", "SOC 2 readiness"],
      delay: 400
    },
    {
      icon: BadgeCheck,
      title: "Highly Trained Models",
      punchline: "Outputs that sound like a real CPA.",
      bullets: [
        "Not generic 'chat' — models tuned for technical accounting workflows and documentation.",
        "More structured inputs → more precise, reliable deliverables."
      ],
      proofChips: ["Technical-accounting tuned", "Consistent formatting"],
      delay: 600
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative z-10 py-20 md:py-32 bg-white dark:bg-background"
    >
      <ResponsiveContainer>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Gaapio?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See why accounting teams are making the switch to AI-powered documentation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title}
              className={cn(
                "p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-[30px]"
              )}
              style={{ 
                transitionDelay: `${benefit.delay}ms`,
              }}
            >
              {/* Icon Badge - Larger with soft background */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#339CFF]/15 to-[#339CFF]/5 rounded-2xl flex items-center justify-center shadow-sm border border-[#339CFF]/10">
                  <benefit.icon className="h-8 w-8 text-[#339CFF]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-left text-foreground">
                {benefit.title}
              </h3>

              {/* Punchline - Bold and prominent */}
              <p className="text-lg font-semibold text-foreground/90 mb-4 leading-relaxed">
                {benefit.punchline}
              </p>

              {/* Micro Bullets */}
              <ul className="space-y-3 mb-6 flex-grow">
                {benefit.bullets.map((bullet, idx) => (
                  <li 
                    key={idx} 
                    className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#339CFF]/40 before:rounded-full"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Proof Chip Row */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                {benefit.proofChips.map((chip) => (
                  <ProofChip key={chip} label={chip} />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <div 
            className={cn(
              "transition-all duration-1000",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-[30px]"
            )}
            style={{ transitionDelay: "1200ms" }}
          >
            <Button size="lg" variant="blueOutline" asChild>
              <Link to="/faq?open=chatgpt">How is this different than ChatGPT?</Link>
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
