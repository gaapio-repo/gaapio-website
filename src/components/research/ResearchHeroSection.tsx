import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Brain, Sparkles } from "lucide-react";

export const ResearchHeroSection = memo(function ResearchHeroSection() {
  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 bg-white dark:bg-background overflow-hidden">
      <div className="container px-4 md:px-6 text-center relative z-10">
        {/* Text content centered */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6 animate-fade-up">
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">AI-Powered Research Assistant</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up dark:text-white" style={{ animationDelay: "100ms" }}>
            Your Firm's Internal GPT
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-up dark:text-gray-300" style={{ animationDelay: "200ms" }}>
            Unlock instant access to your firm's collective knowledge with AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Button size="lg" variant="blue" asChild>
              <Link to="/request-demo">Request a Demo</Link>
            </Button>
            <Button size="lg" variant="blueOutline" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
        
        {/* Visual Element */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="relative w-full max-w-4xl">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              {/* Mock Search Interface */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-4/6"></div>
                </div>
              </div>
              
              {/* Mock Results */}
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
});
