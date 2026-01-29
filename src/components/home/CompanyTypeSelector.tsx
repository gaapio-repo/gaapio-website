import { memo } from "react";
import { Link } from "react-router-dom";
import { Building, Building2, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const companyTypes = [
  {
    id: "private",
    title: "Private Company",
    description: "Streamlined technical accounting and audit prep",
    icon: Building,
    href: "/solutions/private",
  },
  {
    id: "public",
    title: "Public Company",
    description: "SOX compliance, SEC reporting, and disclosures",
    icon: Building2,
    href: "/solutions/public",
  },
  {
    id: "firm",
    title: "Accounting Firm",
    description: "Multi-client efficiency and reviewer workflows",
    icon: Briefcase,
    href: "/solutions/firm",
  },
];

export const CompanyTypeSelector = memo(function CompanyTypeSelector() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Are you with a:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {companyTypes.map((type) => (
          <Link
            key={type.id}
            to={type.href}
            className={cn(
              "group relative flex flex-col items-center p-6 md:p-8",
              "bg-white dark:bg-gray-800 rounded-2xl",
              "border-2 border-gray-200 dark:border-gray-700",
              "shadow-sm hover:shadow-xl",
              "transition-all duration-200 ease-in-out",
              "hover:border-[#339CFF] hover:scale-[1.02]",
              "focus:outline-none focus:ring-2 focus:ring-[#339CFF] focus:ring-offset-2"
            )}
          >
            <div className={cn(
              "p-4 rounded-xl mb-4",
              "bg-gray-100 dark:bg-gray-700",
              "group-hover:bg-[#339CFF] transition-colors duration-200"
            )}>
              <type.icon className={cn(
                "h-8 w-8 md:h-10 md:w-10",
                "text-gray-600 dark:text-gray-300",
                "group-hover:text-white transition-colors duration-200"
              )} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              {type.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
              {type.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
});
