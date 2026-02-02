import { useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { Building2, Landmark, Briefcase, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  {
    icon: Building2,
    title: "Private Companies",
    description: "Audit-ready memos & technical accounting support for growing businesses",
    href: "/solutions/private",
  },
  {
    icon: Landmark,
    title: "Public Companies",
    description: "SEC reporting, SOX compliance & disclosure management at scale",
    href: "/solutions/public",
  },
  {
    icon: Briefcase,
    title: "Accounting Firms",
    description: "Multi-client efficiency & advisory workflows that drive results",
    href: "/solutions/firm",
  }
];

export function SolutionsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900" />
      
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <ResponsiveContainer className="relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Gaapio's Solutions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Purpose-built workflows for your organization type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-center">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <Link
                key={solution.title}
                to={solution.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "group relative rounded-2xl transition-all duration-300 ease-out p-8",
                  // Base card styling with glassmorphism
                  "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                  "border border-white/50 dark:border-slate-700/50",
                  // Shadows
                  "shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50",
                  // Default hover transforms
                  "hover:-translate-y-2",
                  // Featured state when hovered
                  isHovered ? [
                    "md:-mt-4 md:mb-4 md:p-10",
                    "shadow-2xl shadow-primary/20 dark:shadow-primary/10",
                    "scale-[1.02]",
                    "ring-2 ring-primary/20 dark:ring-primary/30",
                    "bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700/50",
                  ] : [
                    "hover:shadow-xl hover:shadow-primary/10",
                  ]
                )}
              >
                {/* Badge that appears on hover */}
                <div className={cn(
                  "absolute -top-3 left-1/2 -translate-x-1/2 transition-all duration-300",
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                )}>
                  <span className="px-4 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 whitespace-nowrap">
                    Your Organization Type
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
                )} />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon with blue circle background */}
                  <div className={cn(
                    "flex items-center justify-center rounded-2xl mb-6 transition-all duration-300",
                    "bg-gradient-to-br from-primary to-primary/80",
                    "shadow-lg shadow-primary/30",
                    isHovered 
                      ? "w-16 h-16 md:w-20 md:h-20 shadow-xl shadow-primary/40 scale-110" 
                      : "w-14 h-14 md:w-16 md:h-16 group-hover:shadow-xl group-hover:shadow-primary/40"
                  )}>
                    <Icon 
                      className={cn(
                        "text-white transition-all duration-300",
                        isHovered ? "w-8 h-8 md:w-10 md:h-10" : "w-7 h-7 md:w-8 md:h-8"
                      )} 
                      strokeWidth={1.75} 
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className={cn(
                    "font-bold text-foreground mb-3 transition-all duration-300",
                    isHovered ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                  )}>
                    {solution.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={cn(
                    "text-muted-foreground mb-6 leading-relaxed transition-all duration-300",
                    isHovered ? "text-base" : "text-sm md:text-base"
                  )}>
                    {solution.description}
                  </p>
                  
                  {/* CTA Link */}
                  <div className="flex items-center gap-1.5 text-primary font-semibold text-sm group/cta">
                    <span className="group-hover/cta:underline">Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
