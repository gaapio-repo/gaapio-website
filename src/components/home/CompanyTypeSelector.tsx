import { memo } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const entryPoints = [
  {
    id: "private",
    title: "Private Companies",
    outcome: "Audit-ready memos & technical accounting support",
    href: "/solutions/private",
  },
  {
    id: "public",
    title: "Public Companies",
    outcome: "SEC reporting, SOX compliance & disclosure management",
    href: "/solutions/public",
  },
  {
    id: "firm",
    title: "Accounting Firms",
    outcome: "Multi-client efficiency & advisory workflows",
    href: "/solutions/firm",
  },
];

export const CompanyTypeSelector = memo(function CompanyTypeSelector() {
  return (
    <div className="w-full max-w-xl">
      {/* Section label */}
      <p className="text-sm font-semibold text-foreground uppercase tracking-[0.2em] mb-6">
        Built for:
      </p>
      
      {/* Typography-forward links */}
      <div className="flex flex-col space-y-6">
        {entryPoints.map((entry) => (
          <Link
            key={entry.id}
            to={entry.href}
            className="group flex items-start justify-between gap-4"
          >
            {/* Text content */}
            <div className="flex-1">
              {/* Title with animated underline */}
              <div className="relative inline-block">
                <h3 className={cn(
                  "text-xl md:text-2xl font-bold",
                  "text-foreground",
                  "group-hover:text-primary dark:group-hover:text-primary",
                  "transition-colors duration-200"
                )}>
                  {entry.title}
                </h3>
                {/* Animated gradient underline */}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5",
                  "bg-gradient-to-r from-primary to-cyan-400",
                  "w-0 group-hover:w-full",
                  "transition-all duration-300 ease-out"
                )} />
              </div>
              
              {/* Subtitle */}
              <p className="mt-1 text-sm text-muted-foreground">
                {entry.outcome}
              </p>
            </div>
            
            {/* Arrow - appears and slides on hover */}
            <ArrowRight className={cn(
              "flex-shrink-0 w-5 h-5 mt-1",
              "text-muted-foreground",
              "opacity-0 -translate-x-2",
              "group-hover:opacity-100 group-hover:translate-x-0",
              "group-hover:text-primary",
              "transition-all duration-200"
            )} />
          </Link>
        ))}
      </div>
    </div>
  );
});
