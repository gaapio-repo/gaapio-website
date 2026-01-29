import { memo } from "react";
import { Link } from "react-router-dom";
import { Layers, Network, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

const companyTypes = [
  {
    id: "private",
    title: "Private Company",
    description: "Streamlined technical accounting and audit prep",
    icon: Layers,
    href: "/solutions/private",
    delay: "0ms",
  },
  {
    id: "public",
    title: "Public Company",
    description: "SOX compliance, SEC reporting, and disclosures",
    icon: Network,
    href: "/solutions/public",
    delay: "75ms",
  },
  {
    id: "firm",
    title: "Accounting Firm",
    description: "Advisory prep and audit workflows",
    icon: GitBranch,
    href: "/solutions/firm",
    delay: "150ms",
  },
];

export const CompanyTypeSelector = memo(function CompanyTypeSelector() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-medium text-white/90 mb-8 text-center tracking-tight">
        Are you with a:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
        {companyTypes.map((type) => (
          <Link
            key={type.id}
            to={type.href}
            className={cn(
              "group relative flex flex-col items-center p-6 md:p-8",
              // Glassmorphism base
              "bg-white/[0.08] backdrop-blur-xl",
              "border border-white/[0.12]",
              "rounded-2xl",
              // Subtle inner glow
              "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
              // Smooth transitions
              "transition-all duration-300 ease-out",
              // Hover: lift + glow effect
              "hover:bg-white/[0.12]",
              "hover:border-white/[0.2]",
              "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_32px_-8px_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.05)]",
              "hover:-translate-y-1",
              // Focus state
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            )}
            style={{ animationDelay: type.delay }}
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Icon container with subtle depth */}
            <div className={cn(
              "relative z-10 p-3.5 rounded-xl mb-5",
              "bg-white/[0.06] border border-white/[0.08]",
              "group-hover:bg-white/[0.1] group-hover:border-white/[0.15]",
              "transition-all duration-300"
            )}>
              <type.icon className={cn(
                "h-7 w-7 md:h-8 md:w-8",
                "text-white/70",
                "group-hover:text-white/90",
                "transition-colors duration-300",
                "stroke-[1.5]"
              )} />
            </div>
            
            {/* Title */}
            <h3 className="relative z-10 text-lg md:text-xl font-semibold text-white/95 mb-2 text-center tracking-tight">
              {type.title}
            </h3>
            
            {/* Description */}
            <p className="relative z-10 text-sm text-white/60 text-center leading-relaxed group-hover:text-white/70 transition-colors duration-300">
              {type.description}
            </p>
            
            {/* Subtle bottom accent line on hover */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
});
