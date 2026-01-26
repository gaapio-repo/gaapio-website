import { Shield, FileCheck, Lock, Sparkles } from "lucide-react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";

interface BenefitCard {
  icon: typeof Shield;
  title: string;
  description: string;
}

const benefits: BenefitCard[] = [
  {
    icon: FileCheck,
    title: "Trusted",
    description: "Gaapio is designed around professional-grade documentation workflows. Inputs, assumptions, and outputs stay structured so teams can rely on consistent, review-ready deliverables."
  },
  {
    icon: Shield,
    title: "Audit Ready",
    description: "Every change, reviewer comment, and sign-off is captured automatically. Export a complete audit package with a clear trail of how conclusions were reached."
  },
  {
    icon: Lock,
    title: "Secure",
    description: "Security is built into the platform from day one. Your data stays private to your organization with encryption, access controls, and SOC 2 readiness in progress."
  },
  {
    icon: Sparkles,
    title: "Purpose-Built",
    description: "Gaapio isn't generic AI chat. It's tuned for technical accounting workflows so outputs feel like they were written by an experienced CPA—polished, consistent, and firm-ready."
  }
];

function FeatureCard({ benefit }: { benefit: BenefitCard }) {
  const Icon = benefit.icon;
  
  return (
    <div 
      className={cn(
        "group relative rounded-2xl p-6 md:p-8",
        // Card background - slightly lighter than section
        "bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80",
        // Border with subtle glow
        "border border-slate-700/50",
        // Hover effects
        "hover:border-[#339CFF]/40 hover:-translate-y-1",
        "hover:shadow-[0_0_30px_-5px_rgba(51,156,255,0.25)]",
        "transition-all duration-300 ease-out"
      )}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#339CFF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon + Title row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#339CFF]/20 to-[#339CFF]/5 flex items-center justify-center border border-[#339CFF]/20">
            <Icon className="w-5 h-5 text-[#339CFF]" strokeWidth={1.75} />
          </div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            {benefit.title}
          </h3>
        </div>
        
        {/* Description paragraph */}
        <p className="text-slate-400 text-[15px] leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </div>
  );
}

export function KeyBenefitsSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 -z-10" />
      
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(51,156,255,0.08)_0%,_transparent_50%)] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(51,156,255,0.05)_0%,_transparent_50%)] -z-10" />
      
      <ResponsiveContainer>
        {/* Top Hero Row - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left side - Headline + Paragraph */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Why Gaapio
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Gaapio is built by CPAs who've lived through audits, close cycles, and technical accounting reviews. We combine structured workflows, audit-ready documentation, and purpose-built AI so teams move faster without sacrificing quality.
            </p>
          </div>
          
          {/* Right side - Visual Card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glowing circle accent behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full bg-gradient-to-br from-[#339CFF]/30 via-[#339CFF]/10 to-purple-500/10 blur-3xl" />
            
            {/* Image container */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-[#339CFF]/10">
                {/* Placeholder for product image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 via-slate-800/90 to-slate-900 flex items-center justify-center">
                  <img 
                    src="/assets/images/gaapio-app-dark.png" 
                    alt="Gaapio Application Interface"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-800/90 to-slate-900">
                          <div class="text-center p-8">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#339CFF]/20 to-[#339CFF]/5 flex items-center justify-center border border-[#339CFF]/20">
                              <svg class="w-8 h-8 text-[#339CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                              </svg>
                            </div>
                            <p class="text-slate-500 text-sm">Gaapio Interface</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
                
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Decorative accent circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-[#339CFF]/40 to-purple-500/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/30 to-[#339CFF]/10 blur-2xl" />
            </div>
          </div>
        </div>
        
        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {benefits.map((benefit) => (
            <FeatureCard key={benefit.title} benefit={benefit} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
