import { FileCheck, BadgeCheck, BookCheck, Shield, Check, Files, Clock, Lock, Sparkles } from "lucide-react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface Benefit {
  icon: typeof BookCheck;
  watermarkIcon: typeof Files;
  title: string;
  punchline: string;
  bullets: string[];
  chips: string[];
  delay: number;
}

function MetadataPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium text-muted-foreground bg-muted/50 dark:bg-muted/30 whitespace-nowrap">
      {label}
    </span>
  );
}

function BenefitCard({ benefit, isVisible }: { benefit: Benefit; isVisible: boolean }) {
  const WatermarkIcon = benefit.watermarkIcon;
  
  return (
    <div 
      className={cn(
        "group relative rounded-2xl border border-gray-200 dark:border-gray-700/60",
        "bg-white dark:bg-gray-800/90",
        "shadow-md shadow-gray-200/50 dark:shadow-none",
        "hover:shadow-xl hover:shadow-[#339CFF]/10 hover:border-[#339CFF]/30",
        "hover:-translate-y-1 transition-all duration-300 ease-out",
        "overflow-hidden",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-[20px]"
      )}
      style={{ 
        transitionDelay: `${benefit.delay}ms`,
        transitionProperty: "opacity, transform, box-shadow, border-color"
      }}
    >
      {/* Watermark decoration */}
      <div className="absolute -right-6 -bottom-6 pointer-events-none opacity-[0.04] dark:opacity-[0.06]">
        <WatermarkIcon className="w-32 h-32 text-[#339CFF]" strokeWidth={1} />
      </div>
      
      {/* Header strip with gradient */}
      <div className="relative px-5 py-4 bg-gradient-to-r from-[#339CFF]/[0.04] via-[#339CFF]/[0.02] to-transparent dark:from-[#339CFF]/[0.08] dark:via-[#339CFF]/[0.04] dark:to-transparent border-b border-gray-100 dark:border-gray-700/40">
        <div className="flex items-center gap-3.5">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#339CFF]/15 to-[#339CFF]/5 dark:from-[#339CFF]/20 dark:to-[#339CFF]/10 rounded-xl flex items-center justify-center shadow-sm">
            <benefit.icon className="h-6 w-6 text-[#339CFF]" strokeWidth={1.75} />
          </div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">
            {benefit.title}
          </h3>
        </div>
      </div>

      {/* Main body content */}
      <div className="px-5 py-5">
        {/* Punchline - hero text */}
        <p className="text-xl md:text-[22px] font-semibold text-foreground mb-4 leading-tight tracking-tight">
          {benefit.punchline}
        </p>

        {/* Bullets with check icons */}
        <ul className="space-y-2 mb-5">
          {benefit.bullets.map((bullet, idx) => (
            <li 
              key={idx} 
              className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed"
            >
              <Check className="h-3.5 w-3.5 text-[#339CFF]/70 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Footer divider + chips */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700/30">
          <div className="flex flex-wrap gap-1.5">
            {benefit.chips.map((chip) => (
              <MetadataPill key={chip} label={chip} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Hover glow accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl ring-1 ring-inset ring-[#339CFF]/20" />
    </div>
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
        rootMargin: "0px 0px -25% 0px"
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
      watermarkIcon: Files,
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
      watermarkIcon: Clock,
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
      watermarkIcon: Lock,
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
      watermarkIcon: Sparkles,
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
      className="relative z-10 py-20 md:py-28"
    >
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] via-[#f5f9ff] to-white dark:from-gray-900/80 dark:via-gray-900/60 dark:to-background -z-10" />
      
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/80 dark:via-gray-700/50 to-transparent" />
      
      <ResponsiveContainer>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-2.5 tracking-tight text-foreground">
            Why Gaapio?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            See why accounting teams are making the switch to AI-powered documentation.
          </p>
        </div>
        
        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto mb-12">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} isVisible={isVisible} />
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
            style={{ transitionDelay: "450ms" }}
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
