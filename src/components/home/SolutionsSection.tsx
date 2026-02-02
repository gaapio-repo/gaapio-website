import { useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Abstract pattern components for each card
const PrivatePattern = () => (
  <svg className="w-full h-24 opacity-[0.08]" viewBox="0 0 200 80" fill="none">
    <circle cx="30" cy="40" r="25" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="70" cy="40" r="15" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="100" cy="40" r="20" stroke="currentColor" strokeWidth="1.5" />
    <path d="M130 20 L170 40 L130 60" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="150" y1="30" x2="190" y2="30" stroke="currentColor" strokeWidth="1.5" />
    <line x1="150" y1="50" x2="180" y2="50" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PublicPattern = () => (
  <svg className="w-full h-24 opacity-[0.08]" viewBox="0 0 200 80" fill="none">
    <rect x="20" y="20" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <rect x="70" y="15" width="30" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <rect x="110" y="25" width="35" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M155 20 L155 60 L190 60" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="165" cy="35" r="4" fill="currentColor" />
    <circle cx="180" cy="45" r="4" fill="currentColor" />
  </svg>
);

const FirmPattern = () => (
  <svg className="w-full h-24 opacity-[0.08]" viewBox="0 0 200 80" fill="none">
    <path d="M20 60 L40 20 L60 60" stroke="currentColor" strokeWidth="1.5" />
    <path d="M70 60 L90 25 L110 60" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="140" cy="40" r="20" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="140" cy="40" r="10" stroke="currentColor" strokeWidth="1.5" />
    <line x1="170" y1="25" x2="190" y2="25" stroke="currentColor" strokeWidth="1.5" />
    <line x1="170" y1="40" x2="190" y2="40" stroke="currentColor" strokeWidth="1.5" />
    <line x1="170" y1="55" x2="190" y2="55" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const solutions = [
  {
    title: "Private Companies",
    tagline: "Built for growing teams that need enterprise-grade accounting without enterprise headcount.",
    description: "Audit-ready memos, disclosures & contract workflows",
    href: "/solutions/private",
    Pattern: PrivatePattern,
  },
  {
    title: "Public Companies",
    tagline: "Documentation your auditors love. Speed your team needs.",
    description: "Automated research, contract abstraction, and disclosure support for 10-Ks, 10-Qs, and complex transactions.",
    href: "/solutions/public",
    Pattern: PublicPattern,
  },
  {
    title: "Accounting Firms",
    tagline: "Multi-client efficiency for audit & advisory",
    description: "Collaborative workflows, consistent deliverables, and faster turnaround across every engagement.",
    href: "/solutions/firm",
    Pattern: FirmPattern,
  }
];

export function SolutionsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {solutions.map((solution, index) => {
            const isHovered = hoveredIndex === index;
            const Pattern = solution.Pattern;
            
            return (
              <Link
                key={solution.title}
                to={solution.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "group relative rounded-2xl transition-all duration-300 ease-out p-6 lg:p-8 flex flex-col",
                  "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                  "border border-white/50 dark:border-slate-700/50",
                  "shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50",
                  "hover:-translate-y-2",
                  isHovered ? [
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
                    Choose Your Organization Type
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
                )} />
                
                <div className="relative z-10 flex flex-col items-center text-center flex-1">
                  {/* Abstract pattern instead of icon */}
                  <div className="w-full mb-4 text-primary">
                    <Pattern />
                  </div>
                  
                  {/* Title - consistent sizing */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {solution.title}
                  </h3>
                  
                  {/* Tagline */}
                  <p className="text-sm font-medium text-foreground/80 mb-3">
                    {solution.tagline}
                  </p>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
                    {solution.description}
                  </p>
                  
                  {/* CTA Link */}
                  <div className="flex items-center gap-1.5 text-primary font-semibold text-sm group/cta mt-auto">
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
