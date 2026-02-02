import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { Building2, Landmark, Briefcase, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  {
    icon: Building2,
    title: "Private Companies",
    description: "Audit-ready memos & technical accounting support",
    href: "/solutions/private"
  },
  {
    icon: Landmark,
    title: "Public Companies",
    description: "SEC reporting, SOX compliance & disclosure management",
    href: "/solutions/public"
  },
  {
    icon: Briefcase,
    title: "Accounting Firms",
    description: "Multi-client efficiency & advisory workflows",
    href: "/solutions/firm"
  }
];

export function SolutionsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-800/60">
      <ResponsiveContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Gaapio's Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built workflows for your organization type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Link
                key={solution.title}
                to={solution.href}
                className={cn(
                  "group relative p-8 rounded-2xl",
                  "bg-gradient-to-br from-white via-white to-muted/30 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700/80",
                  "border border-border/60 dark:border-slate-700",
                  "shadow-sm hover:shadow-lg hover:shadow-primary/5",
                  "hover:border-primary/30 hover:-translate-y-1",
                  "transition-all duration-300 ease-out"
                )}
              >
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/20 mb-5">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={1.75} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {solution.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {solution.description}
                  </p>
                  
                  <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
