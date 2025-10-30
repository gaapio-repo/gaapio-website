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
    <section className="py-20 bg-white dark:bg-[#1A1F2B]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            Why Choose Accounting Research?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto dark:text-gray-300">
            The fastest way to find reliable answers to your accounting and auditing questions
          </p>
        </div>

        {/* Two-column feature layout */}
        <div className="max-w-6xl mx-auto space-y-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-6 items-start p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 bg-gradient-to-br ${
                  isEven 
                    ? 'from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10' 
                    : 'from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10'
                }`}
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                  isEven
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    isEven 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-purple-600 dark:text-purple-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
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
