import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Shield, CheckCircle } from "lucide-react";

export const SOXHeroSection = memo(function SOXHeroSection() {
  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 bg-white dark:bg-background overflow-hidden">
      <div className="container px-4 md:px-6 text-center relative z-10">
        {/* Text content centered */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 animate-fade-up">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">Coming Soon</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up dark:text-white" style={{ animationDelay: "100ms" }}>
            SOX Controls Management
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-up dark:text-gray-300" style={{ animationDelay: "200ms" }}>
            Streamline SOX compliance with AI-powered control testing and documentation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Button size="lg" variant="blue" asChild>
              <Link to="/request-demo">Request Early Access</Link>
            </Button>
            <Button size="lg" variant="blueOutline" asChild>
              <Link to="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
        
        {/* Visual Element */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="relative w-full max-w-4xl">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              {/* Mock Control Dashboard */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2"></div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-24"></div>
                    </div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mock Control List */}
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
});
