import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { Settings, GitMerge, PenLine, ListFilter, Building2, ChevronRight, Check } from "lucide-react";

const steps = [
  { indent: 0, label: "Identification", type: "Parent", icon: "folder" as const },
  { indent: 1, label: "Does arrangement contain a lease?", type: "Yes/No", icon: "step" as const },
  { indent: 1, label: "Identify lease components", type: "Count", icon: "step" as const },
  { indent: 0, label: "Classification", type: "Parent", icon: "folder" as const },
  { indent: 1, label: "Lease type determination", type: "Picklist", icon: "step" as const },
  { indent: 1, label: "Commencement date", type: "Date", icon: "step" as const },
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

  const cell = (delay: number, className?: string) =>
    cn(
      "transition-all duration-700",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      className
    );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      <ResponsiveContainer className="relative z-10">
        {/* Header */}
        <div className={cn(
          "text-center mb-14 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Flexible & Customizable
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground !leading-tight">
            Templates that fit your process and policies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Adapt templates to your contract types, accounting topics, and reporting needs. Built to be customized for how your team works.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {/* Cell 1: Large — Template tree view (spans 4 cols, 2 rows) */}
          <div
            className={cell(200, "md:col-span-4 md:row-span-2 bg-card rounded-2xl border border-border shadow-lg p-6 overflow-hidden")}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">ASC 842 – Lease Analysis</h4>
                  <p className="text-xs text-muted-foreground">12 steps · 3 parent groups</p>
                </div>
              </div>
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">Published</span>
            </div>

            <div className="bg-muted/40 rounded-xl p-5 space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2.5" style={{ paddingLeft: `${step.indent * 24}px` }}>
                  {step.icon === "folder" ? (
                    <ChevronRight className="w-3.5 h-3.5 text-primary rotate-90 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-border flex-shrink-0 flex items-center justify-center">
                      {i < 3 && <Check className="w-2.5 h-2.5 text-green-500" />}
                    </div>
                  )}
                  <span className={cn(
                    "text-sm flex-1",
                    step.icon === "folder" ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}>{step.label}</span>
                  <span className="text-xs text-muted-foreground/60 flex-shrink-0 hidden sm:block">{step.type}</span>
                </div>
              ))}
            </div>

            {/* Additional templates below */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-3 border border-border/50">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Settings className="w-3.5 h-3.5 text-blue-500" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">ASC 606 – Revenue</p>
                  <p className="text-[10px] text-muted-foreground">18 steps</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-3 border border-border/50">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Settings className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">ASC 805 – Combinations</p>
                  <p className="text-[10px] text-muted-foreground">9 steps · Draft</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cell 2: Top-right — Reusable Templates (spans 2 cols) */}
          <div
            className={cell(350, "md:col-span-2 bg-card rounded-2xl border border-border shadow-md p-6 flex flex-col justify-between")}
            style={{ transitionDelay: "350ms" }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Settings className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1.5">Reusable Templates</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Build and adapt analysis checklists for your contract types and reporting needs.
              </p>
            </div>
          </div>

          {/* Cell 3: Bottom-right — Parent-Child (spans 2 cols) */}
          <div
            className={cell(450, "md:col-span-2 bg-card rounded-2xl border border-border shadow-md p-6 flex flex-col justify-between")}
            style={{ transitionDelay: "450ms" }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <GitMerge className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1.5">Parent-Child Relationships</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Steps that identify items and steps that analyze each one—no redundant work.
              </p>
            </div>
          </div>

          {/* Bottom row: 3 equal feature cells */}
          <div
            className={cell(550, "md:col-span-2 bg-card rounded-2xl border border-border shadow-md p-6")}
            style={{ transitionDelay: "550ms" }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <PenLine className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1.5">Custom Questions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Specify what AI looks for and how to interpret terms for consistency.
            </p>
          </div>

          <div
            className={cell(650, "md:col-span-2 bg-card rounded-2xl border border-border shadow-md p-6")}
            style={{ transitionDelay: "650ms" }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <ListFilter className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1.5">Picklist Controls</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Restrict values like lease types or recognition decisions for uniform outputs.
            </p>
          </div>

          <div
            className={cell(750, "md:col-span-2 bg-card rounded-2xl border border-border shadow-md p-6")}
            style={{ transitionDelay: "750ms" }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1.5">Global & Company</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Standard templates across your org, customized for specific entities.
            </p>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
});
