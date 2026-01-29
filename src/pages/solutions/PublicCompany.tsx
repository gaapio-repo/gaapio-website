import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Building2, Shield, FileCheck, Bell, Scale, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "SOX Compliance",
    description: "Maintain robust internal controls with AI-powered documentation and control narratives.",
  },
  {
    icon: FileCheck,
    title: "SEC Reporting Excellence",
    description: "Generate disclosure-ready footnotes that meet SEC requirements and industry benchmarks.",
  },
  {
    icon: Bell,
    title: "Real-Time Guidance Updates",
    description: "Stay ahead of new accounting standards with instant alerts and implementation guidance.",
  },
  {
    icon: Scale,
    title: "Audit-Ready Documentation",
    description: "Create comprehensive audit packages that satisfy external auditor requirements.",
  },
];

export default function PublicCompany() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-12 overflow-hidden">
        <GradientBackground />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Building2 className="h-5 w-5 text-gray-800 dark:text-white" />
              <span className="text-sm font-medium text-gray-800 dark:text-white">Public Company Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-gray-900 dark:text-white">Enterprise-Grade</span>{" "}
              <span className="text-white">Compliance</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-800 dark:text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Purpose-built for SEC filers. Streamline SOX compliance, accelerate SEC reporting, and maintain disclosure excellence with AI-powered automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="black" className="text-base px-8 py-6 h-auto font-semibold" asChild>
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100 text-base px-8 py-6 h-auto font-semibold" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBarSection />

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Public Company Requirements
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From 10-K disclosures to SOX documentation, we help you meet the highest standards of public company reporting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-[#339CFF] text-white">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FinalCtaSection />
      
      <Footer />
    </div>
  );
}
