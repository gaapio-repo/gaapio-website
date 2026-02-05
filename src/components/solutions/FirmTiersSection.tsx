import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const firmTiers = [
  {
    id: "smallFirm",
    name: "Small Firm",
    price: 1500,
    targetAudience: "For firms with pre-audit stage clients",
    features: [
      "Internal GPT for your firm",
      "Contract Analysis",
      "Lease Accounting Export",
      "Low-volume focus (1-2 leases per client)"
    ],
    popular: false
  },
  {
    id: "technicalAccounting",
    name: "Technical Accounting",
    price: 3000,
    targetAudience: "For firms doing technical accounting work",
    features: [
      "Technical Accounting Memos",
      "Accounting Research tools",
      "Analysis & Memo writer",
      "All Small Firm features included"
    ],
    popular: false
  },
  {
    id: "fullFirm",
    name: "Full Firm",
    price: 3600,
    targetAudience: "For firms serving public companies",
    features: [
      "SOX Compliance module",
      "Footnote Disclosure generation & benchmarking",
      "Audit suite (memo auditor, lease auditor)",
      "All lower-tier features included"
    ],
    popular: true
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
            Firm Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the package that fits your firm's needs. All plans include per-user pricing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {firmTiers.map((tier, index) => (
            <div 
              key={tier.id}
              className={cn(
                "relative group rounded-2xl transition-all duration-300",
                "hover:-translate-y-2 hover:shadow-2xl",
                tier.popular 
                  ? "ring-2 ring-primary shadow-xl shadow-primary/10" 
                  : "shadow-lg hover:shadow-xl"
              )}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Card Background */}
              <div className={cn(
                "absolute inset-0 rounded-2xl overflow-hidden",
                "bg-white dark:bg-slate-800",
                "border",
                tier.popular ? "border-primary" : "border-border/50"
              )}>
                {/* Blue header band */}
                <div className="h-14 bg-gradient-to-r from-[#0099FF] to-[#33ADFF] dark:from-[#0088EE] dark:to-[#0099FF] flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                </div>
              </div>

              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gray-900 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Card Content */}
              <div className="relative p-6 pt-20 flex flex-col h-full min-h-[420px]">
                {/* Pricing */}
                <div className="mb-4 text-center">
                  <div className="flex items-baseline gap-1 justify-center">
                    <span className="text-3xl font-bold text-foreground">
                      ${tier.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-sm">/user/year</span>
                  </div>
                </div>
                
                {/* Target Audience */}
                <p className="text-center text-sm text-muted-foreground mb-6">
                  {tier.targetAudience}
                </p>
                
                {/* Features */}
                <ul className="space-y-3 flex-grow mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-left">
                      <Check className={cn(
                        "h-4 w-4 mr-2.5 shrink-0 mt-0.5",
                        tier.popular ? "text-primary" : "text-primary/80"
                      )} />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button 
                  variant={tier.popular ? "default" : "outline"} 
                  className={cn(
                    "w-full mt-auto font-semibold transition-all",
                    tier.popular && "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
                    !tier.popular && "hover:bg-primary hover:text-primary-foreground"
                  )}
                  asChild
                >
                  <Link to="/firm-signup">Get Started</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
