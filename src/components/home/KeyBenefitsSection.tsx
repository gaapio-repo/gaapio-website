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
  proofLine: string;
  chips: string[];
  delay: number;
}

function MetadataTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium text-muted-foreground/80 bg-muted/40 dark:bg-muted/20 border border-border/40 whitespace-nowrap">
      {label}
    </span>
  );
}

function BenefitCard({ benefit, isVisible }: { benefit: Benefit; isVisible: boolean }) {
  const WatermarkIcon = benefit.watermarkIcon;
  
  return (
    <div 
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        // Top accent line
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]",
        "before:bg-gradient-to-r before:from-[#339CFF] before:via-[#339CFF]/80 before:to-[#339CFF]/40",
        // Card background with subtle gradient
        "bg-gradient-to-br from-white via-white to-[#f8fbff] dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800/90",
        // Border
        "border border-gray-200/80 dark:border-gray-700/50",
        // Shadow - stronger depth
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(51,156,255,0.06)]",
        "dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]",
        // Hover effects
        "hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12),0_16px_40px_-12px_rgba(51,156,255,0.15)]",
        "hover:border-[#339CFF]/40",
        "hover:-translate-y-1.5",
        "transition-all duration-300 ease-out",
        // Animation
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-6"
      )}
      style={{ 
        transitionDelay: `${benefit.delay}ms`,
        transitionProperty: "opacity, transform, box-shadow, border-color"
      }}
    >
      {/* Watermark decoration - positioned bottom right */}
      <div className="absolute -right-4 -bottom-4 pointer-events-none opacity-[0.035] dark:opacity-[0.05]">
        <WatermarkIcon className="w-28 h-28 text-[#339CFF]" strokeWidth={0.75} />
      </div>
      
      {/* Corner glow effect on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#339CFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Card content - all left aligned */}
      <div className="relative p-5 md:p-6">
        {/* Top row: Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-[#339CFF]/15 via-[#339CFF]/10 to-[#339CFF]/5 dark:from-[#339CFF]/25 dark:to-[#339CFF]/10 rounded-xl flex items-center justify-center shadow-sm border border-[#339CFF]/10">
            <benefit.icon className="h-5 w-5 text-[#339CFF]" strokeWidth={1.75} />
          </div>
          <h3 className="text-sm font-semibold text-foreground/90 tracking-tight uppercase">
            {benefit.title}
          </h3>
        </div>

        {/* Punchline - large and bold */}
        <p className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug tracking-tight">
          {benefit.punchline}
        </p>

        {/* Supporting bullets - short and muted */}
        <ul className="space-y-2 mb-3">
          {benefit.bullets.map((bullet, idx) => (
            <li 
              key={idx} 
              className="flex items-start gap-2.5 text-[13px] text-muted-foreground/90 leading-relaxed"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#339CFF]/50 mt-[7px]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Proof line - small muted text */}
        <p className="text-[11px] text-muted-foreground/60 mb-4 italic">
          {benefit.proofLine}
        </p>

        {/* Footer: metadata tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 dark:border-gray-700/30">
          {benefit.chips.map((chip) => (
            <MetadataTag key={chip} label={chip} />
          ))}
        </div>
      </div>
      
      {/* Hover ring glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl ring-1 ring-inset ring-[#339CFF]/25" />
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
      proofLine: "Built for: centralized workspaces, consistent deliverables",
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
      proofLine: "Built for: audit trails, sign-offs, exports",
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
      proofLine: "Built for: privacy-first teams, compliance requirements",
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
      proofLine: "Built for: technical precision, consistent formatting",
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
