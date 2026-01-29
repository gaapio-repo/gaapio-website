import { memo } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Building2, Building, Briefcase, ArrowRight } from "lucide-react";

const entryPoints = [
  {
    id: "private",
    title: "Private Companies",
    outcome: "Audit-ready memos & technical accounting support",
    href: "/solutions/private",
    icon: Building2,
  },
  {
    id: "public",
    title: "Public Companies",
    outcome: "SEC reporting, SOX compliance & disclosure management",
    href: "/solutions/public",
    icon: Building,
  },
  {
    id: "firm",
    title: "Accounting Firms",
    outcome: "Multi-client efficiency & advisory workflows",
    href: "/solutions/firm",
    icon: Briefcase,
  },
];

export const CompanyTypeSelector = memo(function CompanyTypeSelector() {
  return (
    <div className="w-full max-w-xl">
      {/* Section label */}
      <p className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-[0.2em] mb-4">
        Built for:
      </p>
      
      {/* Stacked cards */}
      <div className="flex flex-col gap-3">
        {entryPoints.map((entry) => {
          const Icon = entry.icon;
          return (
            <Link
              key={entry.id}
              to={entry.href}
              className={cn(
                "group flex items-center gap-4 p-4 md:p-5",
                "bg-white dark:bg-gray-900",
                "border border-gray-200 dark:border-gray-700",
                "rounded-xl shadow-sm",
                "transition-all duration-200 ease-out",
                "hover:shadow-lg hover:border-primary",
                "hover:-translate-y-0.5"
              )}
            >
              {/* Icon */}
              <div className={cn(
                "flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg",
                "bg-primary/10 dark:bg-primary/20",
                "flex items-center justify-center",
                "group-hover:bg-primary group-hover:text-white",
                "transition-colors duration-200"
              )}>
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  {entry.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {entry.outcome}
                </p>
              </div>
              
              {/* Arrow */}
              <ArrowRight className={cn(
                "flex-shrink-0 w-5 h-5 text-gray-400",
                "group-hover:text-primary group-hover:translate-x-1",
                "transition-all duration-200"
              )} />
            </Link>
          );
        })}
      </div>
    </div>
  );
});
