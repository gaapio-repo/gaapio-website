import { memo } from "react";
import { FileText, Search, Zap, CheckCircle } from "lucide-react";

export const ResearchHowItWorksSection = memo(function ResearchHowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Ask Your Question",
      description: "Type your accounting or auditing question in plain language. No complex search syntax needed."
    },
    {
      icon: Zap,
      title: "AI-Powered Research",
      description: "Our AI searches authoritative sources including FASB, GASB, AICPA guidance, and technical accounting literature."
    },
    {
      icon: FileText,
      title: "Get Expert Answers",
      description: "Receive clear, contextualized answers with direct citations to relevant standards and guidance."
    },
    {
      icon: CheckCircle,
      title: "Verify & Apply",
      description: "Review source references and apply the guidance confidently to your specific situation."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant answers to your accounting and auditing questions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#339CFF] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-[#339CFF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-[#339CFF]" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#339CFF] to-[#1F8FFF] rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-background px-6 py-3 rounded-full shadow-md border border-border">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Authoritative answers with source citations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});
