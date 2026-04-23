import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Bell, Calendar, FileText } from "lucide-react";
import { GradientBackground } from "@/components/home/GradientBackground";

interface GuidanceHeroSectionProps {
  title?: string;
  subtitle?: string;
}

export const GuidanceHeroSection = memo(function GuidanceHeroSection({ 
  title = "Stay Current with Guidance Updates",
  subtitle = "High-accuracy answers, fast — every citation links back to an authoritative source."
}: GuidanceHeroSectionProps) {
  
  return (
    <section className="relative min-h-[100vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 md:pb-12 overflow-hidden">
      {/* Blue gradient background */}
      <GradientBackground />
      
      <div className="container px-4 md:px-6 text-center relative z-10">
        
        {/* Text content centered */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
            <span className="text-gray-900">Stay Current </span>
            <span className="text-white">with Guidance Updates</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-900 mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Button size="lg" variant="black" asChild>
              <Link to="/signup-select">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100" asChild>
              <Link to="/request-demo">Request a Demo</Link>
            </Button>
          </div>
        </div>
        
        {/* Larger static mockup card centered */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-8 max-w-lg w-full hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-600">New Guidance Alert</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <h3 className="font-bold text-xl text-gray-900">ASC 842 Update — Leases</h3>
              </div>

              <p className="text-gray-600 text-base leading-relaxed">
                FASB clarifies embedded lease treatment in service arrangements.
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Effective for FYs after Dec 15, 2025</span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button size="sm" variant="outline" className="w-full border-gray-300 text-gray-900 bg-white hover:bg-gray-100">
                  View Full Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
