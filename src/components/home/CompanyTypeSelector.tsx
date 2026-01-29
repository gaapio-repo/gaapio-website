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
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Section label */}
      <p className="text-sm md:text-base font-semibold text-white/80 uppercase tracking-[0.25em] mb-8 text-center">
        Built for:
      </p>
      
      {/* Tech container with glowing border */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 via-primary/40 to-cyan-400/30 rounded-2xl blur-lg opacity-60" />
        
        {/* Main container */}
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
          {/* Circuit pattern overlay */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200">
              <defs>
                <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="2" fill="white"/>
                  <path d="M25 0 V20 M25 30 V50 M0 25 H20 M30 25 H50" stroke="white" strokeWidth="0.5" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)"/>
            </svg>
          </div>
          
          {/* Entry points grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {entryPoints.map((entry, index) => (
              <Link
                key={entry.id}
                to={entry.href}
                className={cn(
                  "group relative flex flex-col items-center p-5 md:p-6 rounded-xl",
                  "bg-white/5 hover:bg-white/15",
                  "border border-white/10 hover:border-cyan-400/50",
                  "transition-all duration-300 ease-out",
                  "hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
                  "hover:-translate-y-1"
                )}
              >
                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Node indicator */}
                <div className="relative mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-gradient-to-br from-cyan-400/20 to-primary/20",
                    "border border-cyan-400/30",
                    "group-hover:border-cyan-400/60 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
                    "transition-all duration-300"
                  )}>
                    <span className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-0 group-hover:opacity-30" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 text-center tracking-tight group-hover:text-cyan-100 transition-colors">
                  {entry.title}
                </h3>
                
                {/* Outcome */}
                <p className="text-sm text-white/60 text-center group-hover:text-white/80 transition-colors">
                  {entry.outcome}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-1 text-cyan-400/60 group-hover:text-cyan-400 transition-colors">
                  <span className="text-xs font-medium uppercase tracking-wider">Enter</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
