import { Button } from "@/components/ui/button";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { Database } from "lucide-react";

export const InternalGPTHeroSection = memo(function InternalGPTHeroSection() {
  const [enableSelfSignup, setEnableSelfSignup] = useState(true);
  
  useEffect(() => {
    const loadSelfSignupSetting = () => {
      const savedSetting = localStorage.getItem("enableSelfSignup");
      setEnableSelfSignup(savedSetting !== null ? savedSetting === "true" : true);
    };
    
    loadSelfSignupSetting();
  }, []);

  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 overflow-hidden">
      {/* Blue gradient background */}
      <GradientBackground />
      
      <div className="container px-4 md:px-6 text-center relative z-10">
        {/* Text content centered */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
            <span className="text-gray-900 dark:text-white">Your Firm's </span>
            <span className="text-white">Internal GPT</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-white/90 mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
            AI-Powered Knowledge Base. Instant Answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            {enableSelfSignup ? (
              <Button size="lg" variant="black" asChild>
                <Link to="/signup-select">Sign Up Now</Link>
              </Button>
            ) : (
              <Button size="lg" variant="black" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            )}
            <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100" asChild>
              <Link to="/request-demo">Request a Demo</Link>
            </Button>
          </div>
        </div>
        
        {/* Visual representation */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="relative w-full max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              {/* Mock chat interface */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-[#0099FF]/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#0099FF]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Internal GPT</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connected to your knowledge base</p>
                </div>
              </div>
              
              {/* Sample conversation */}
              <div className="space-y-4 text-left">
                <div className="flex justify-end">
                  <div className="bg-[#0099FF] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[80%]">
                    <p className="text-sm">What's our policy on revenue recognition for multi-element arrangements?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-2xl rounded-bl-md max-w-[85%]">
                    <p className="text-sm leading-relaxed">Based on your uploaded policy documents, multi-element arrangements should be evaluated under ASC 606-10-25. Your internal memo from Q2 2024 specifies that...</p>
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-500 dark:text-gray-400">📎 Source: Revenue Recognition Policy v3.2, Internal Memo 2024-Q2-007</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
