import { memo } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const entryPoints = [
  {
    id: "private",
    title: "Private Companies",
    outcome: "Audit-ready memos",
    href: "/solutions/private",
  },
  {
    id: "public",
    title: "Public Companies",
    outcome: "SEC & SOX workflows",
    href: "/solutions/public",
  },
  {
    id: "firm",
    title: "Accounting Firms",
    outcome: "Multi-client efficiency",
    href: "/solutions/firm",
  },
];

export const CompanyTypeSelector = memo(function CompanyTypeSelector() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Section label */}
      <p className="text-sm md:text-base font-semibold text-white uppercase tracking-[0.25em] mb-6 text-center">
        Built for:
      </p>
      
      {/* Panels grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {entryPoints.map((entry) => (
          <Link
            key={entry.id}
            to={entry.href}
            className={cn(
              "group relative flex flex-col overflow-hidden",
              "bg-gray-900/90 backdrop-blur-xl",
              "border border-white/20 hover:border-primary",
              "rounded-2xl shadow-2xl",
              "transition-all duration-300 ease-out",
              "hover:-translate-y-2",
              "hover:shadow-[0_0_30px_rgba(0,153,255,0.4)]"
            )}
          >
            {/* Top gradient accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary to-cyan-400" />
            
            {/* Content */}
            <div className="flex flex-col items-center p-6 md:p-8">
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">
                {entry.title}
              </h3>
              
              {/* Outcome */}
              <p className="text-sm md:text-base text-gray-300 text-center mb-4">
                {entry.outcome}
              </p>
              
              {/* Arrow indicator */}
              <div className="flex items-center gap-1.5 text-primary group-hover:text-cyan-400 transition-colors">
                <span className="text-sm font-medium">Learn more</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
            
            {/* Corner accent dots on hover */}
            <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
});
