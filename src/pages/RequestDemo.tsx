
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
      
      <main className="flex-1 -mt-20">
        {/* Hero Section with Gradient */}
        <section className="relative min-h-[85vh] flex items-center -mt-[1px] pt-32 pb-20 overflow-hidden">
          <GradientBackground />
          
          {/* Softened mesh pattern overlay - reduced opacity */}
          <div 
            className="absolute inset-0 z-[1] pointer-events-none opacity-[0.06] blur-[0.5px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="container px-4 md:px-6 relative z-10">
            {isSubmitted ? (
              <div className="max-w-3xl mx-auto">
                <DemoRequestSuccess />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
                {/* Left Column - Value Proposition */}
                <div className="flex flex-col items-start text-left space-y-7 animate-fade-up">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold tracking-wide border border-white/20">
                    AI with Receipts.
                  </span>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
                    <span className="text-gray-900 dark:text-white">See Gaapio in</span>{" "}
                    <span className="text-white drop-shadow-sm">Action</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/95 max-w-lg leading-relaxed font-medium">
                    Discover how AI-powered technical accounting saves your team hours every week — with full transparency and audit-ready documentation.
                  </p>
                  
                  {/* Subtle card behind bullets */}
                  <div className="bg-white/[0.08] backdrop-blur-sm rounded-xl p-5 border border-white/10 w-full max-w-lg">
                    <ul className="space-y-4">
                      {benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-white">
                          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-sm">
                            <Check className="h-4 w-4 text-white" strokeWidth={3} />
                          </span>
                          <span className="text-base md:text-lg font-semibold">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>


                  <div className="flex items-center gap-2 pt-1 text-white/80">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Your information is secure and never shared</span>
                  </div>
                </div>
                
                {/* Right Column - Form Card */}
                <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
                  <div className="bg-white dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] p-7 md:p-9 border border-white/30">
                    <div className="text-center mb-7">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Request Your Demo</h2>
                      <p className="text-sm text-muted-foreground mt-1.5">Fill out the form and we'll be in touch shortly</p>
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
