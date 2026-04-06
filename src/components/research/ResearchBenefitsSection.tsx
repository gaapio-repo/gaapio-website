import { memo } from "react";
import { Shield, FileText, Clock, CheckCircle, BookOpen, Users } from "lucide-react";

export const ResearchBenefitsSection = memo(function ResearchBenefitsSection() {
  const benefits = [
    {
      icon: BookOpen,
      title: "Comprehensive Coverage",
      description: "Access FASB, GASB, AICPA, SEC, and PCAOB guidance all in one place."
    },
    {
      icon: Shield,
      title: "Reliable & Accurate",
      description: "AI-powered search backed by authoritative accounting standards and professional literature."
    },
    {
      icon: FileText,
      title: "Direct Citations",
      description: "Every answer includes references to specific standards and sections for easy verification."
    },
    {
      icon: Clock,
      title: "Save Hours of Research",
      description: "Get instant answers instead of manually searching through multiple codifications and databases."
    },
    {
      icon: CheckCircle,
      title: "Stay Current",
      description: "Always access the latest guidance and updates to accounting standards."
    },
    {
      icon: Users,
      title: "Team Knowledge Sharing",
      description: "Share research findings across your team to build institutional knowledge."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 dark:from-background dark:via-background dark:to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Why Choose Accounting Research?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The fastest way to find reliable answers to your accounting and auditing questions
          </p>
        </div>

        {/* Two-column feature layout */}
        <div className="max-w-6xl mx-auto space-y-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-start p-8 rounded-2xl border border-border hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30 dark:from-muted dark:to-muted"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-100 dark:bg-muted flex items-center justify-center">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
