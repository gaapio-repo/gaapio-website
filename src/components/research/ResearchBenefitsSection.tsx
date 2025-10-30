import { memo } from "react";
import { Shield, Brain, Users, FileText, Clock, Lock } from "lucide-react";

export const ResearchBenefitsSection = memo(function ResearchBenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your firm's data stays private and secure. Enterprise-grade encryption ensures your sensitive information never leaves your control."
    },
    {
      icon: Brain,
      title: "Context-Aware Responses",
      description: "Get answers that understand your firm's unique context, terminology, and procedures. Not just generic responses."
    },
    {
      icon: FileText,
      title: "Source Citations",
      description: "Every answer includes references to the source documents, so you can verify and dive deeper when needed."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights across your team. Make your firm's institutional knowledge accessible to everyone who needs it."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Stop searching through endless files and folders. Get instant answers to your questions in seconds, not hours."
    },
    {
      icon: Lock,
      title: "Access Control",
      description: "Control who can access what information. Set permissions and maintain compliance with your firm's security policies."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f4faff] dark:from-[#1A1F2B] dark:to-[#1A1F2B]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            Why Choose Accounting Research?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto dark:text-gray-300">
            Everything you need for fast, accurate accounting research
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
