
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DemoRequestForm } from "@/components/demo/DemoRequestForm";
import { useState } from "react";
import { DemoRequestSuccess } from "@/components/demo/DemoRequestSuccess";
import { SEO } from "@/components/SEO";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { Check, Shield } from "lucide-react";

export default function RequestDemo() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const benefits = [
    "Personalized 30-minute walkthrough",
    "See AI-powered memos & disclosures live",
    "Get answers to your specific use case",
    "No commitment required",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Request a Gaapio Demo - See AI Accounting in Action"
        description="Schedule a personalized demonstration of Gaapio's AI-powered technical accounting platform. See how to create memos, disclosures, and compliance documentation faster."
        canonical="/request-demo"
        keywords={['Gaapio demo', 'accounting software demo', 'AI accounting demo', 'technical accounting demo']}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Gradient */}
        <section className="relative min-h-[80vh] flex items-center -mt-[1px] pt-24 pb-16 overflow-hidden">
          <GradientBackground />
          
          <div className="container px-4 md:px-6 relative z-10">
            {isSubmitted ? (
              <div className="max-w-3xl mx-auto">
                <DemoRequestSuccess />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
                {/* Left Column - Value Proposition */}
                <div className="flex flex-col items-start text-left space-y-6 animate-fade-up">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold tracking-wide">
                    AI with Receipts.
                  </span>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                    <span className="text-gray-900 dark:text-white">See Gaapio</span>{" "}
                    <span className="text-white">in Action</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-900 dark:text-gray-900 max-w-lg leading-relaxed">
                    Discover how AI-powered technical accounting saves your team hours every week — with full transparency and audit-ready documentation.
                  </p>
                  
                  <ul className="space-y-3 pt-2">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                        </span>
                        <span className="text-base md:text-lg font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center gap-2 pt-2 text-gray-800 dark:text-gray-200">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">Your information is secure and never shared</span>
                  </div>
                </div>
                
                {/* Right Column - Form Card */}
                <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
                  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8 border border-white/20">
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Request Your Demo</h2>
                      <p className="text-sm text-muted-foreground mt-1">Fill out the form and we'll be in touch shortly</p>
                    </div>
                    <DemoRequestForm onSuccess={handleSubmitSuccess} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Social Proof */}
        <TrustBarSection />
      </main>
      
      <Footer />
    </div>
  );
}
