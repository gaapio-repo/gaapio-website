import { memo } from "react";
import { Shield, Clock, FileCheck, Users, TrendingUp, Lock } from "lucide-react";

export const SOXBenefitsSection = memo(function SOXBenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Reduce Risk",
      description: "Minimize control deficiencies and compliance violations with AI-powered risk assessment and continuous monitoring."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate repetitive testing procedures and documentation. Reduce audit preparation time by up to 60%."
    },
    {
      icon: FileCheck,
      title: "Audit-Ready Documentation",
      description: "Maintain complete, organized, and audit-ready documentation. Generate reports that auditors love."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Centralize control ownership, testing responsibilities, and remediation tracking across your organization."
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description: "Track trends, identify control weaknesses early, and implement improvements before they become issues."
    },
    {
      icon: Lock,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with role-based access controls. Stay compliant with SOX, COSO, and other frameworks."
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Why Choose SOX Controls?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Transform your SOX compliance program from a burden into a strategic advantage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#339CFF]" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {benefit.title}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
