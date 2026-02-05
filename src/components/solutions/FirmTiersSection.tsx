import { Button } from "@/components/ui/button";
import { Check, Building2, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const firmChallenges = [
  {
    id: "smallFirm",
    name: "Small Firms",
    subtitle: "Pre-audit stage clients",
    icon: Building2,
    challenge: "Hiring specialized technical staff isn't cost-effective, but clients still need reliable guidance on contracts, leases, and accounting questions.",
    solutions: [
      "Internal GPT answers technical questions instantly",
      "Contract Analysis handles complex reviews",
      "Lease Accounting tools let junior staff perform senior-level work"
    ]
  },
  {
    id: "technicalAccounting",
    name: "Technical Accounting Practices",
    subtitle: "Complex research & deliverables",
    icon: FileText,
    challenge: "Research and memo-writing consumes hours of senior time. Quality varies across staff, and clients expect Big 4–level deliverables.",
    solutions: [
      "AI-powered research cuts hours to minutes",
      "Memo generation ensures consistent, defensible output",
      "Standardized workflows reduce prep time"
    ]
  },
  {
    id: "fullFirm",
    name: "Firms Serving Public Companies",
    subtitle: "SEC filings & SOX compliance",
    icon: Shield,
    challenge: "SEC deadlines are unforgiving. SOX documentation is tedious. Disclosure benchmarking requires expensive tools or manual work.",
    solutions: [
      "SOX Compliance module streamlines control documentation",
      "Footnote Disclosure generation with peer benchmarking",
      "Audit suite delivers audit-ready output fast"
    ]
  }
];

export function FirmTiersSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900" />
      
      {/* Decorative blurs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Challenges We Solve
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every firm type faces unique obstacles. Here's how Gaapio helps you overcome them.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {firmChallenges.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className={cn(
                  "relative group rounded-2xl transition-all duration-300",
                  "hover:-translate-y-2 hover:shadow-2xl",
                  "shadow-lg hover:shadow-xl"
                )}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Card Background */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl overflow-hidden",
                  "bg-white dark:bg-slate-800",
                  "border border-border/50"
                )}>
                  {/* Blue header band */}
                  <div className="h-14 bg-gradient-to-r from-[#0099FF] to-[#33ADFF] dark:from-[#0088EE] dark:to-[#0099FF] flex items-center justify-center gap-2">
                    <IconComponent className="h-5 w-5 text-white" />
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="relative p-6 pt-20 flex flex-col h-full min-h-[420px]">
                  {/* Subtitle */}
                  <p className="text-center text-sm font-medium text-primary mb-4">
                    {item.subtitle}
                  </p>
                  
                  {/* The Challenge */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      The Challenge
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      {item.challenge}
                    </p>
                  </div>
                  
                  {/* How Gaapio Helps */}
                  <div className="flex-grow mb-6">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      How Gaapio Helps
                    </h4>
                    <ul className="space-y-2.5">
                      {item.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex} className="flex items-start text-sm text-left">
                          <Check className="h-4 w-4 mr-2.5 shrink-0 mt-0.5 text-primary" />
                          <span className="text-foreground/90">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full mt-auto font-semibold transition-all",
                      "hover:bg-primary hover:text-primary-foreground"
                    )}
                    asChild
                  >
                    <Link to="/firm-signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
