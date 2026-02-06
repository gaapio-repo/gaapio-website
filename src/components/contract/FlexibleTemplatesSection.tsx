import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { Settings, GitMerge, PenLine, ListFilter, Building2, ChevronRight } from "lucide-react";

const capabilities = [
  {
    icon: Settings,
    title: "Reusable, Editable Templates",
    description: "Build and adapt analysis checklists for your contract types and reporting needs.",
  },
  {
    icon: GitMerge,
    title: "Parent-Child Relationships",
    description: "Steps that identify items and steps that analyze each one—model complex arrangements without redundant work.",
  },
  {
    icon: PenLine,
    title: "Custom Questions & Instructions",
    description: "Specify what the AI should look for and how to interpret terms, improving consistency.",
  },
  {
    icon: ListFilter,
    title: "Picklist Controls",
    description: "Restrict values like lease types or recognition decisions so outputs stay uniform.",
  },
  {
    icon: Building2,
    title: "Global & Company Templates",
    description: "Standard templates across your org, customized for specific entities or contract types.",
  },
];

const workflowSteps = [
  { label: "Select Template", sub: "ASC 842 · Lease Analysis" },
  { label: "Configure Steps", sub: "12 steps · 3 parent groups" },
  { label: "Set Response Types", sub: "Picklists, dates, amounts" },
  { label: "Assign to Contract", sub: "Office Lease – 123 Main St" },
  { label: "Run Analysis", sub: "AI + reviewer workflow" },
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(210 40% 97%) 0%, hsl(210 40% 98.5%) 100%)" }}>
      {/* Dark mode override */}
      <div className="absolute inset-0 bg-[hsl(220_20%_12%)] dark:block hidden" />
      
      <ResponsiveContainer className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text content */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Flexible & Customizable
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-foreground !leading-tight">
              Templates that fit your process and policies
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Adapt templates to your contract types, accounting topics, and reporting needs. Built to be customized for how your team works.
            </p>

            <div className="space-y-5">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex gap-4 transition-all duration-600",
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                    )}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-foreground mb-0.5">
                        {cap.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Vertical workflow diagram */}
          <div className={cn(
            "relative transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )} style={{ transitionDelay: "300ms" }}>
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent rounded-3xl blur-2xl" />
            
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl p-8">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Template Workflow</h4>
                  <p className="text-xs text-muted-foreground">From setup to analysis</p>
                </div>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-border" />

                <div className="space-y-0">
                  {workflowSteps.map((step, i) => (
                    <div
                      key={i}
                      className={cn(
                        "relative flex items-start gap-4 py-4 transition-all duration-500",
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                      )}
                      style={{ transitionDelay: `${500 + i * 120}ms` }}
                    >
                      {/* Node */}
                      <div className={cn(
                        "relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors",
                        i === 0 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : i < 3
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-muted border-border text-muted-foreground"
                      )}>
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>

                      <div className="flex-1 pt-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-foreground">{step.label}</h4>
                          {i < workflowSteps.length - 1 && (
                            <ChevronRight className="w-3 h-3 text-muted-foreground/50 rotate-90 hidden" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.sub}</p>
                      </div>

                      {i === 0 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mt-2 flex-shrink-0">Active</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
});
