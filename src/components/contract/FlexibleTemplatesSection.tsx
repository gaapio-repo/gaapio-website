import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { Settings, GitMerge, PenLine, ListFilter, Building2 } from "lucide-react";

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

const templateCards = [
  { name: "ASC 842 – Lease Analysis", steps: 12, groups: 3, status: "Published" },
  { name: "ASC 606 – Revenue Recognition", steps: 18, groups: 5, status: "Published" },
  { name: "ASC 805 – Business Combinations", steps: 9, groups: 2, status: "Draft" },
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
        {/* Centered header */}
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Flexible & Customizable
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-foreground !leading-tight">
            Templates that fit your process and policies
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Adapt templates to your contract types, accounting topics, and reporting needs. Built to be customized for how your team works.
          </p>
        </div>

        {/* Template library mockup cards */}
        <div className={cn(
          "mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )} style={{ transitionDelay: "200ms" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent rounded-3xl blur-2xl" />
            
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-muted/40">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Settings className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">Template Library</span>
                    <span className="text-xs text-muted-foreground ml-2">3 templates</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-md border border-border text-muted-foreground bg-background">+ New Template</span>
                </div>
              </div>

              {/* Template rows */}
              <div className="divide-y divide-border">
                {templateCards.map((tpl, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-between px-6 py-4 transition-all duration-500 hover:bg-muted/30",
                      isVisible ? "opacity-100" : "opacity-0"
                    )}
                    style={{ transitionDelay: `${350 + i * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                        i === 0 ? "bg-primary/10" : i === 1 ? "bg-blue-500/10" : "bg-amber-500/10"
                      )}>
                        <Settings className={cn(
                          "w-4 h-4",
                          i === 0 ? "text-primary" : i === 1 ? "text-blue-500" : "text-amber-500"
                        )} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{tpl.name}</h4>
                        <p className="text-xs text-muted-foreground">{tpl.steps} steps · {tpl.groups} parent groups</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[11px] font-medium px-2 py-0.5 rounded-full",
                        tpl.status === "Published"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      )}>{tpl.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded template detail preview */}
              <div className="border-t border-border bg-muted/20 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-background rounded-lg border border-border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GitMerge className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      <span className="text-xs font-semibold text-foreground">Parent-Child</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">3 parent groups with 9 child analysis steps</p>
                  </div>
                  <div className="bg-background rounded-lg border border-border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ListFilter className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      <span className="text-xs font-semibold text-foreground">Response Types</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">Picklists, dates, amounts, yes/no, text</p>
                  </div>
                  <div className="bg-background rounded-lg border border-border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      <span className="text-xs font-semibold text-foreground">Scope</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">Global template, 4 company overrides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div
                key={index}
                className={cn(
                  "text-center transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${600 + index * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {cap.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </ResponsiveContainer>
    </section>
  );
});
