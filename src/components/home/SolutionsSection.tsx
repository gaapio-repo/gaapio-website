import { useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mini UI mockup components for each card
const PrivateMockup = () => (
  <div className="w-full h-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-2.5 flex gap-2 overflow-hidden">
    <div className="w-1/3 bg-white dark:bg-slate-900 rounded shadow-sm p-2 flex flex-col gap-1.5">
      <div className="h-2 w-3/4 bg-primary/30 rounded-full"></div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-2/3 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
    </div>
    <div className="flex-1 bg-white dark:bg-slate-900 rounded shadow-sm p-2 flex flex-col gap-1.5">
      <div className="h-2 w-1/2 bg-primary/40 rounded-full"></div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-3/4 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
    </div>
  </div>
);

const PublicMockup = () => (
  <div className="w-full h-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-2.5 flex gap-2 overflow-hidden">
    <div className="flex-1 bg-white dark:bg-slate-900 rounded shadow-sm p-2 flex flex-col justify-between">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-blue-400"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
      </div>
      <div className="flex items-end gap-1 h-10">
        <div className="w-2.5 bg-primary/40 rounded-t" style={{height: '40%'}}></div>
        <div className="w-2.5 bg-primary/50 rounded-t" style={{height: '65%'}}></div>
        <div className="w-2.5 bg-primary/60 rounded-t" style={{height: '50%'}}></div>
        <div className="w-2.5 bg-primary/70 rounded-t" style={{height: '80%'}}></div>
        <div className="w-2.5 bg-primary rounded-t" style={{height: '100%'}}></div>
      </div>
    </div>
    <div className="w-1/3 bg-white dark:bg-slate-900 rounded shadow-sm p-2 flex flex-col gap-1.5">
      <div className="h-2 w-full bg-primary/30 rounded-full"></div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-2/3 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-4 w-full bg-green-100 dark:bg-green-900/30 rounded mt-auto flex items-center justify-center">
        <div className="h-1.5 w-1/2 bg-green-500 rounded-full"></div>
      </div>
    </div>
  </div>
);

const FirmMockup = () => (
  <div className="w-full h-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-2.5 flex gap-2 overflow-hidden">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex-1 bg-white dark:bg-slate-900 rounded shadow-sm p-2 flex flex-col gap-1.5">
        <div className="h-2 w-2/3 bg-primary/30 rounded-full"></div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
        <div className="h-1.5 w-3/4 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
        <div className="mt-auto h-3 w-full bg-primary/10 rounded flex items-center px-1.5">
          <div className="h-1.5 w-1/2 bg-primary/40 rounded-full"></div>
        </div>
      </div>
    ))}
  </div>
);

const solutions = [
  {
    title: "Private Companies",
    beforeBold: "Audit-ready memos, disclosures & contract workflows for ",
    boldPart: "growing teams",
    afterBold: " — no Big 4 required.",
    href: "/solutions/private",
    Mockup: PrivateMockup,
  },
  {
    title: "Public Companies",
    beforeBold: "SEC, SOX & technical accounting ",
    boldPart: "documentation at scale",
    afterBold: " — fast and auditor-ready.",
    href: "/solutions/public",
    Mockup: PublicMockup,
  },
  {
    title: "Accounting Firms",
    beforeBold: "Multi-client efficiency for ",
    boldPart: "audit & advisory",
    afterBold: " with standardized, repeatable deliverables.",
    href: "/solutions/firm",
    Mockup: FirmMockup,
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Gaapio's Solutions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Solutions for every stage of accounting maturity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {solutions.map((solution, index) => {
            const isHovered = hoveredIndex === index;
            const Mockup = solution.Mockup;
            
            return (
              <Link
                key={solution.title}
                to={solution.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "group relative rounded-2xl transition-all duration-300 ease-out p-8 lg:p-10 flex flex-col",
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
                  {/* Mini UI mockup */}
                  <div className="w-full mb-6">
                    <Mockup />
                  </div>
                  
                  {/* Title - larger */}
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {solution.title}
                  </h3>
                  
                  {/* Description - lighter color, constrained width */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed flex-1 max-w-[220px]">
                    {solution.beforeBold}
                    <span className="font-medium text-foreground">{solution.boldPart}</span>
                    {solution.afterBold}
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
