import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { Settings, GitMerge, PenLine, ListFilter, Building2, ChevronRight, Check } from "lucide-react";

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
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      <ResponsiveContainer className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Template builder mockup */}
          <div className={cn(
            "relative transition-all duration-700 lg:pt-8 order-2 lg:order-1",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )} style={{ transitionDelay: "300ms" }}>
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent rounded-3xl blur-2xl" />

            <div className="relative space-y-4">
              {/* Card 1 — Expanded */}
              <div className={cn(
                "relative bg-card rounded-xl border-2 border-primary/30 shadow-xl p-5 transition-all duration-500",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              )} style={{ transitionDelay: "400ms" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Settings className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">ASC 842 – Lease Analysis</h4>
                      <p className="text-xs text-muted-foreground">12 steps · 3 parent groups</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">Published</span>
                </div>

                <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                  {[
                    { indent: 0, label: "Identification", type: "Parent", icon: "folder" },
                    { indent: 1, label: "Does arrangement contain a lease?", type: "Yes/No", icon: "step" },
                    { indent: 1, label: "Identify lease components", type: "Count", icon: "step" },
                    { indent: 0, label: "Classification", type: "Parent", icon: "folder" },
                    { indent: 1, label: "Lease type determination", type: "Picklist", icon: "step" },
                    { indent: 1, label: "Commencement date", type: "Date", icon: "step" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2" style={{ paddingLeft: `${step.indent * 20}px` }}>
                      {step.icon === "folder" ? (
                        <ChevronRight className="w-3 h-3 text-primary rotate-90 flex-shrink-0" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-border flex-shrink-0 flex items-center justify-center">
                          {i < 3 && <Check className="w-2 h-2 text-green-500" />}
                        </div>
                      )}
                      <span className={cn("text-xs flex-1 truncate", step.icon === "folder" ? "font-semibold text-foreground" : "text-muted-foreground")}>{step.label}</span>
                      <span className="text-[10px] text-muted-foreground/70 flex-shrink-0 hidden sm:block">{step.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 — Collapsed */}
              <div className={cn(
                "relative bg-card rounded-xl border border-border shadow-lg p-5 flex items-center justify-between transition-all duration-500",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              )} style={{ transitionDelay: "550ms" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">ASC 606 – Revenue Recognition</h4>
                    <p className="text-xs text-muted-foreground">18 steps · 5 parent groups</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">Published</span>
              </div>

              {/* Card 3 — Collapsed */}
              <div className={cn(
                "relative bg-card rounded-xl border border-border shadow-md p-5 flex items-center justify-between transition-all duration-500",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              )} style={{ transitionDelay: "650ms" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">ASC 805 – Business Combinations</h4>
                    <p className="text-xs text-muted-foreground">9 steps · 2 parent groups</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">Draft</span>
              </div>
            </div>
          </div>

          {/* Right: Text + capabilities list */}
          <div className={cn(
            "transition-all duration-700 order-1 lg:order-2",
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
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
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
        </div>
      </ResponsiveContainer>
    </section>
  );
});
