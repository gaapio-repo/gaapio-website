import { memo } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const entryPoints = [
  {
    id: "private",
    title: "Private Company",
    outcome: "Audit-ready memos",
    href: "/solutions/private",
    size: "standard",
  },
  {
    id: "public",
    title: "Public Company",
    outcome: "SEC & SOX workflows",
    href: "/solutions/public",
    size: "prominent",
  },
  {
    id: "firm",
    title: "Accounting Firm",
    outcome: "Multi-client efficiency",
    href: "/solutions/firm",
    size: "standard",
  },
];

export const CompanyTypeSelector = memo(function CompanyTypeSelector() {
  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Faint grid texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Section label */}
      <p className="text-xs md:text-sm font-medium text-white/40 uppercase tracking-[0.2em] mb-10 text-center">
        Built for:
      </p>
      
      {/* Entry modules container */}
      <div className="flex items-end justify-center gap-6 md:gap-10 lg:gap-14">
        {entryPoints.map((entry) => (
          <Link
            key={entry.id}
            to={entry.href}
            className={cn(
              "group relative flex flex-col items-center",
              "transition-all duration-500 ease-out",
              // Asymmetric sizing
              entry.size === "prominent" 
                ? "flex-[1.3] max-w-[200px]" 
                : "flex-1 max-w-[160px]",
            )}
          >
            {/* Abstract glyph / node */}
            <div className={cn(
              "relative mb-6 transition-all duration-500 ease-out",
              "group-hover:-translate-y-2",
              entry.size === "prominent" ? "scale-110" : "scale-100"
            )}>
              {/* Outer ring */}
              <div className={cn(
                "absolute inset-0 rounded-full",
                "border border-white/10",
                "group-hover:border-white/25",
                "group-hover:scale-150 group-hover:opacity-0",
                "transition-all duration-700 ease-out",
                entry.size === "prominent" ? "w-16 h-16" : "w-12 h-12"
              )} />
              
              {/* Core node */}
              <div className={cn(
                "relative rounded-full",
                "bg-white/[0.08]",
                "group-hover:bg-white/[0.15]",
                "transition-all duration-300",
                entry.size === "prominent" ? "w-16 h-16" : "w-12 h-12",
                "flex items-center justify-center"
              )}>
                {/* Inner dot */}
                <div className={cn(
                  "rounded-full bg-white/60",
                  "group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
                  "transition-all duration-300",
                  entry.size === "prominent" ? "w-2.5 h-2.5" : "w-2 h-2"
                )} />
              </div>
              
              {/* Connecting line down */}
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 w-px",
                "bg-gradient-to-b from-white/20 to-transparent",
                "transition-all duration-500",
                "group-hover:from-white/40",
                entry.size === "prominent" ? "top-16 h-8" : "top-12 h-6"
              )} />
            </div>
            
            {/* Title */}
            <h3 className={cn(
              "font-semibold text-white/90 text-center tracking-tight",
              "group-hover:text-white",
              "transition-colors duration-300",
              entry.size === "prominent" 
                ? "text-lg md:text-xl mb-2" 
                : "text-base md:text-lg mb-1.5"
            )}>
              {entry.title}
            </h3>
            
            {/* Outcome - short, confident */}
            <p className={cn(
              "text-white/40 text-center",
              "group-hover:text-white/60",
              "transition-colors duration-300",
              entry.size === "prominent" ? "text-sm" : "text-xs"
            )}>
              {entry.outcome}
            </p>
            
            {/* Subtle underline accent on hover */}
            <div className={cn(
              "absolute -bottom-4 left-1/2 -translate-x-1/2",
              "h-px bg-gradient-to-r from-transparent via-white/30 to-transparent",
              "opacity-0 group-hover:opacity-100",
              "transition-all duration-500",
              entry.size === "prominent" ? "w-24" : "w-16"
            )} />
          </Link>
        ))}
      </div>
      
      {/* Faint horizontal baseline */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
});
