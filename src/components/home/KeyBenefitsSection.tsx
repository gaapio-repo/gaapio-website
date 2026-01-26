import { FileCheck, BadgeCheck, BookCheck, Shield, Check } from "lucide-react";
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
  chips: string[];
  delay: number;
}

function FeatureChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium text-[#339CFF] border border-[#339CFF]/25 bg-transparent whitespace-nowrap">
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
      chips: ["Centralized workspace", "CPA-built workflows"],
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
      chips: ["Version history", "Sign-offs", "Audit export"],
      delay: 100
    },
    {
      icon: Shield,
      title: "Data Security",
      punchline: "Enterprise-grade privacy by default.",
      bullets: [
        "Your data stays private to your organization—never used to train public models.",
        "Encryption + access controls built in, with SOC 2 in progress."
      ],
      chips: ["Encryption", "Access controls", "SOC 2 readiness"],
      delay: 200
    },
    {
      icon: BadgeCheck,
      title: "Highly Trained Models",
      punchline: "Outputs that sound like a real CPA.",
      bullets: [
        "Not generic 'chat' — models tuned for technical accounting workflows and documentation.",
        "More structured inputs → more precise, reliable deliverables."
      ],
      chips: ["Technical-accounting tuned", "Consistent formatting"],
      delay: 300
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative z-10 py-24 md:py-32 bg-gradient-to-b from-[#f8fafc] to-white dark:from-gray-900/50 dark:to-background"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      
      <ResponsiveContainer>
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Why Gaapio?</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            See why accounting teams are making the switch to AI-powered documentation.
          </p>
        </div>
        
        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto mb-14">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title}
              className={cn(
                "group relative p-6 md:p-8 rounded-2xl border border-gray-200/80 dark:border-gray-700/50",
                "bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-900/40",
                "shadow-sm hover:shadow-lg hover:shadow-[#339CFF]/5",
                "hover:-translate-y-1 transition-all duration-300 ease-out",
                "overflow-hidden",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-[20px]"
              )}
              style={{ 
                transitionDelay: `${benefit.delay}ms`,
              }}
            >
              {/* Hover accent glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#339CFF]/40 to-transparent" />
              </div>

              {/* Top Row: Icon + Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-shrink-0 w-11 h-11 bg-[#339CFF]/10 rounded-xl flex items-center justify-center">
                  <benefit.icon className="h-5 w-5 text-[#339CFF]" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
              </div>

              {/* Punchline */}
              <p className="text-base md:text-[17px] font-medium text-foreground/90 mb-4 leading-snug">
                {benefit.punchline}
              </p>

              {/* Bullets with checkmarks */}
              <ul className="space-y-2.5 mb-6">
                {benefit.bullets.map((bullet, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                  >
                    <Check className="h-4 w-4 text-[#339CFF]/60 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Feature Chips Row */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700/40">
                {benefit.chips.map((chip) => (
                  <FeatureChip key={chip} label={chip} />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <div 
            className={cn(
              "transition-all duration-700",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-[20px]"
            )}
            style={{ transitionDelay: "500ms" }}
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
