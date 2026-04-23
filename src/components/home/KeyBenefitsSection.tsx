import { Shield, FileCheck, Lock, Sparkles } from "lucide-react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import gaapioIcon from "@/assets/gaapio-icon.png";

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
        // Card background - light with subtle gradient in light mode, dark solid in dark mode
        "bg-gradient-to-br from-white via-white to-muted/30 dark:from-card dark:via-card dark:to-card/80",
        // Border with subtle shadow
        "border border-border/60",
        "shadow-sm",
        // Hover effects
        "hover:border-primary/30 hover:-translate-y-1",
        "hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300 ease-out"
      )}
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon + Title row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/20">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
          </div>
          <h3 className="text-lg font-semibold text-foreground dark:text-white tracking-tight">
            {benefit.title}
          </h3>
        </div>
        
        {/* Description paragraph */}
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </div>
  );
}

export function KeyBenefitsSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Light blue-gray gradient band - light mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted via-blue-50/40 to-muted dark:via-muted/40 -z-10" />
      
      {/* Subtle accent overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.04)_0%,_transparent_50%)] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(var(--primary)/0.03)_0%,_transparent_50%)] -z-10" />
      
      <ResponsiveContainer>
        {/* Top Hero Row - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left side - Headline + Paragraph */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Why Gaapio
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Gaapio is built by CPAs who've lived through audits, close cycles, and technical accounting reviews. We combine structured workflows, audit-ready documentation, and purpose-built AI so teams move faster without sacrificing quality.
            </p>
          </div>
          
          {/* Right side - Visual Card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glowing circle accent behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 blur-3xl" />
            
            {/* Image container */}
            <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden p-8 md:p-12">
                <img 
                  src={gaapioIcon} 
                  alt="Gaapio - AI-Powered Technical Accounting"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl"
                />
              </div>
              
              {/* Decorative accent circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
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
