import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { Settings, GitMerge, PenLine, ListFilter, Building2 } from "lucide-react";

const capabilities = [
  {
    icon: Settings,
    title: "Reusable, Editable Templates",
    description: "Build and adapt analysis checklists for your contract types, accounting topics, and reporting needs.",
  },
  {
    icon: GitMerge,
    title: "Parent-Child Relationships",
    description: "Define steps that identify items and steps that analyze each one—model complex arrangements without redundant work.",
  },
  {
    icon: PenLine,
    title: "Custom Questions & Instructions",
    description: "Specify what the AI should look for and how to interpret terms, improving consistency and reducing rework.",
  },
  {
    icon: ListFilter,
    title: "Picklist Controls",
    description: "Restrict values like lease types or recognition decisions so outputs stay uniform across contracts.",
  },
  {
    icon: Building2,
    title: "Global & Company Templates",
    description: "Use standard templates across your organization and customize them for specific entities or contract types.",
  },
];

export const FlexibleTemplatesSection = memo(function FlexibleTemplatesSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white dark:bg-background">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Header */}
          <div className={cn(
            "lg:sticky lg:top-32 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0099FF] mb-3">
              Flexible & Customizable
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Templates that fit your process and policies
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Adapt templates to your contract types, accounting topics, and reporting needs. Built to be customized for how your team actually works.
            </p>
          </div>

          {/* Right: Feature list */}
          <div className="space-y-8">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex gap-5 transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                  style={{ transitionDelay: `${200 + index * 120}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0099FF]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0099FF]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {cap.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
});
