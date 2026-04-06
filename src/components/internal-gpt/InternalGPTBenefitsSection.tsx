import { memo, useEffect, useRef, useState } from "react";
import { Clock, Users, Brain, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export const InternalGPTBenefitsSection = memo(function InternalGPTBenefitsSection() {
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
      icon: Users,
      title: "Reduce Manager Burden",
      description: "Staff get instant answers instead of waiting for manager availability",
      delay: 0
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Your knowledge base is always accessible, even outside office hours",
      delay: 100
    },
    {
      icon: Brain,
      title: "Preserve Institutional Knowledge",
      description: "Capture and retain expertise from senior team members",
      delay: 200
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data stays private—never used to train external AI models",
      delay: 300
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Key Benefits
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Empower your team with instant access to institutional knowledge
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className={cn(
                  "flex flex-col items-center text-center transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ 
                  transitionDelay: `${benefit.delay}ms`,
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
                }}
              >
                {/* Icon with subtle background */}
                <div className="w-14 h-14 rounded-full bg-[#0099FF]/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#0099FF]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[240px]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
