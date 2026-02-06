import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { BookOpen, GitBranch, HelpCircle, ListChecks, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "GAAP-Aligned Templates",
    description: "Templates built around ASC 842 and ASC 606, so analysis matches your technical accounting process.",
  },
  {
    icon: GitBranch,
    title: "Issue-Centric Workflows",
    description: "Parent steps identify items like lease components; child steps analyze each one.",
  },
  {
    icon: HelpCircle,
    title: "Clear Questions at Each Step",
    description: "Each item has a specific question so reviewers know exactly what to decide.",
  },
  {
    icon: ListChecks,
    title: "Structured Response Types",
    description: "Text, yes/no, amounts, dates, and picklists capture the right information at each point.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-Ready Documentation",
    description: "Explicit applicability and conclusion steps support a clear path from facts to treatment.",
  },
];

export const AccountingDrivenSection = memo(function AccountingDrivenSection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.03] to-transparent pointer-events-none" />

      <ResponsiveContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Accounting-Driven Structure
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-foreground !leading-tight">
              Analysis that follows how you think about accounting
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              GAAP-aligned templates with issue-centric workflows, so every contract follows the same rigorous path from identification to conclusion.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
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
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Product screenshot mockup */}
          <div className={cn(
            "relative transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )} style={{ transitionDelay: "300ms" }}>
            {/* Glow behind the screenshot */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl blur-2xl" />
            
            {/* Screenshot container */}
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-muted rounded-md flex items-center px-3">
                    <span className="text-[11px] text-muted-foreground">app.gaapio.com/contracts/analysis</span>
                  </div>
                </div>
              </div>
              
              {/* Mock UI - Analysis checklist */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">ASC 842 – Lease Analysis</h4>
                    <p className="text-xs text-muted-foreground">Office Lease Agreement – 123 Main St</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">In Progress</span>
                </div>
                
                {/* Steps */}
                {[
                  { step: "1", q: "Does the arrangement contain a lease?", status: "done", answer: "Yes" },
                  { step: "2", q: "Identify lease components", status: "done", answer: "2 components" },
                  { step: "2a", q: "Component 1: Office space classification", status: "active", answer: "" },
                  { step: "2b", q: "Component 2: Equipment classification", status: "pending", answer: "" },
                  { step: "3", q: "Determine lease term", status: "pending", answer: "" },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                    item.status === "active" 
                      ? "border-primary/30 bg-primary/5" 
                      : item.status === "done"
                        ? "border-border bg-muted/30"
                        : "border-border/50 bg-transparent"
                  )}>
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                      item.status === "done" 
                        ? "bg-green-500/15 text-green-600 dark:text-green-400" 
                        : item.status === "active"
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                    )}>
                      {item.status === "done" ? "✓" : item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-xs font-medium truncate",
                        item.status === "pending" ? "text-muted-foreground" : "text-foreground"
                      )}>{item.q}</p>
                    </div>
                    {item.answer && (
                      <span className="text-xs text-muted-foreground flex-shrink-0">{item.answer}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
});
