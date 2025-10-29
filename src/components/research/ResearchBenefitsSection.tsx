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
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Why Choose Research/Internal GPT?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need to make your firm's knowledge instantly accessible
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
