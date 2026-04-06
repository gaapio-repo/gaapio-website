import { Button } from "@/components/ui/button";
import { Check, Building2, FileText, Shield, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FirmChallenge {
  id: string;
  name: string;
  icon: LucideIcon;
  headline: string;
  challenge: string;
  solutions: string[];
  reversed: boolean;
  bgVariant: "white" | "gradient";
}

const firmChallenges: FirmChallenge[] = [
  {
    id: "smallFirm",
    name: "Small Firms",
    icon: Building2,
    headline: "Scale Your Practice Without Scaling Headcount",
    challenge: "You have plenty of staff but are light on managers and senior specialists. Clients still need reliable guidance on contracts, leases, and technical questions — and your team shouldn't have to wait for a partner to get answers.",
    solutions: [
      "Internal GPT gives staff instant answers without interrupting management",
      "Contract Analysis handles complex reviews",
      "Lease Accounting tools let junior staff perform senior-level work"
    ],
    reversed: false,
    bgVariant: "white"
  },
  {
    id: "technicalAccounting",
    name: "Technical Accounting Practices",
    icon: FileText,
    headline: "Deliver Big 4–Quality Work at Regional Firm Prices",
    challenge: "Research and memo-writing consumes hours of senior time. Quality varies across staff, and clients expect premium deliverables.",
    solutions: [
      "AI-powered research cuts hours to minutes",
      "Memo generation ensures consistent, defensible output",
      "Standardized workflows reduce prep time"
    ],
    reversed: true,
    bgVariant: "gradient"
  },
  {
    id: "fullFirm",
    name: "Firms Serving Public Companies",
    icon: Shield,
    headline: "Your Firm Does It All—Private to Public, Advisory to Audit",
    challenge: "SEC deadlines are unforgiving. SOX documentation is tedious. Disclosure benchmarking requires expensive tools or manual work.",
    solutions: [
      "SOX Compliance module streamlines control documentation",
      "Footnote Disclosure generation with peer benchmarking",
      "Audit suite delivers audit-ready output fast"
    ],
    reversed: false,
    bgVariant: "white"
  }
];

interface VisualCardProps {
  icon: LucideIcon;
  name: string;
}

const VisualCard = ({ icon: Icon, name }: VisualCardProps) => (
  <div className="relative w-full max-w-md mx-auto">
    {/* Decorative blur circles */}
    <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
    <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
    
    {/* Main card */}
    <div className="relative bg-background rounded-2xl p-8 shadow-xl border border-border/80">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-b-full" />
      
      {/* Icon container */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
      
      {/* Decorative content lines */}
      <div className="space-y-3">
        <div className="h-3 bg-muted rounded-full w-3/4 mx-auto" />
        <div className="h-3 bg-muted rounded-full w-full" />
        <div className="h-3 bg-muted rounded-full w-5/6 mx-auto" />
        <div className="pt-2 flex justify-center gap-2">
          <div className="h-8 w-20 bg-primary/20 rounded-md" />
          <div className="h-8 w-20 bg-muted rounded-md" />
        </div>
      </div>
      
      {/* Floating badge */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full shadow-md">
        {name}
      </div>
    </div>
  </div>
);

interface ChallengeSectionProps {
  item: FirmChallenge;
}

const ChallengeSection = ({ item }: ChallengeSectionProps) => {
  const IconComponent = item.icon;
  
  return (
    <section 
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        item.bgVariant === "gradient" 
          ? "bg-gradient-to-b from-muted via-blue-50/40 to-muted dark:from-background dark:via-background dark:to-background"
          : "bg-background"
      )}
    >
      {/* Background decorative elements */}
      {item.bgVariant === "gradient" && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </>
      )}
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
          item.reversed && "lg:grid-flow-dense"
        )}>
          {/* Text Content */}
          <div className={cn(
            "text-center lg:text-left",
            item.reversed && "lg:col-start-2"
          )}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
              <IconComponent className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{item.name}</span>
            </div>
            
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-6 leading-tight">
              {item.headline}
            </h2>
            
            {/* The Challenge */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                The Challenge
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {item.challenge}
              </p>
            </div>
            
            {/* How Gaapio Helps */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                How Gaapio Helps
              </h3>
              <ul className="space-y-3">
                {item.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3 text-left">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground/90">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* CTA */}
            <Button 
              size="lg" 
              className="font-semibold px-8"
              asChild
            >
              <Link to="/firm-signup">Get Started</Link>
            </Button>
          </div>
          
          {/* Visual Side */}
          <div className={cn(
            "flex items-center justify-center",
            item.reversed && "lg:col-start-1"
          )}>
            <VisualCard icon={IconComponent} name={item.name} />
          </div>
        </div>
      </div>
    </section>
  );
};

export function FirmTiersSection() {
  return (
    <>
      {firmChallenges.map((item) => (
        <ChallengeSection key={item.id} item={item} />
      ))}
    </>
  );
}
