import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { FirmModulesSection } from "@/components/solutions/FirmModulesSection";
import { 
  Briefcase, 
  Lock,
  Shield
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { ServiceSchema } from "@/components/StructuredData";

// Hero Product Screenshot Mockup - Memo workflow view
const HeroScreenshotMockup = () => (
  <div className="w-full max-w-lg mx-auto">
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
      {/* Window chrome */}
      <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200 dark:border-slate-600">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-5 w-32 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
        </div>
      </div>
      
      {/* App content - Memo workflow */}
      <div className="p-4 flex gap-3">
        {/* Sidebar - Client list */}
        <div className="w-1/4 space-y-2">
          <div className="h-6 w-full bg-primary/20 rounded-md"></div>
          <div className="h-4 w-4/5 bg-primary/30 rounded"></div>
          <div className="h-4 w-3/5 bg-slate-200 dark:bg-slate-600 rounded"></div>
          <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-600 rounded"></div>
          <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-600 rounded"></div>
        </div>
        
        {/* Main content - Memo view */}
        <div className="flex-1 space-y-3">
          {/* Header with client badge */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-600">
            <div className="h-5 w-28 bg-primary/40 rounded"></div>
            <div className="h-4 w-20 bg-green-500/30 rounded-full"></div>
          </div>
          
          {/* Memo content */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-amber-400/60 rounded"></div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-11/12 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="mt-3 h-4 w-24 bg-primary/30 rounded"></div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-10/12 bg-slate-200 dark:bg-slate-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const benefits = [
  {
    title: "Multiply Staff Leverage",
    description: "Associates produce senior-level research and memos in minutes.",
  },
  {
    title: "Increase Margins per Engagement",
    description: "Standardized workflows cut prep time and deliver consistent output.",
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "Private by Design",
    description: "Customer data does not train public AI."
  },
  {
    icon: Shield,
    title: "End-to-End Encrypted",
    description: "Structured output ready for audit support."
  },
];

const comingSoon = [
  "SOX controls module (to support control documentation + evidence workflows)",
  "Codification checker (we are in the process of licensing the codification)"
];

export default function AccountingFirm() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="CPA Firm Solutions - AI Technical Accounting for Firms"
        description="AI-powered technical accounting platform for CPA firms. Upskill staff, increase leverage, and deliver higher-quality client work faster with multi-client workflows."
        canonical="/solutions/firm"
        keywords={['CPA firm software', 'accounting firm tools', 'multi-client accounting', 'CPA practice management', 'firm leverage']}
      />
      <ServiceSchema
        name="Gaapio for Accounting Firms"
        description="Multi-client workflows and advisory preparation tools for CPA firms to scale technical accounting services."
        url="/solutions/firm"
        audience="CPA Firms, Accounting Partners, Technical Accounting Consultants"
      />
      <Header />
      
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
        <GradientBackground />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Briefcase className="h-5 w-5 text-gray-800 dark:text-white" />
                <span className="text-sm font-medium text-gray-800 dark:text-white">Accounting Firm Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                <span className="text-gray-900 dark:text-white">Multiply Your</span>{" "}
                <span className="text-white">Firm's Capacity</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-800 dark:text-white/90 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
                Standardize research, memos, and deliverables so every associate performs like a senior — without adding headcount.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="black" className="text-base px-8 py-6 h-auto font-semibold" asChild>
                  <Link to="/request-demo">Request a Demo</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100 text-base px-8 py-6 h-auto font-semibold" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            
            {/* Right - Product Screenshot */}
            <div className="hidden lg:block">
              <HeroScreenshotMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBarSection />

      {/* Why Firms Section - With Gradient Background */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-800/40 dark:to-slate-900" />
        
        {/* Decorative blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Why Firms Run on Gaapio
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group p-10 lg:p-12 rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/40 hover:border-slate-300 dark:hover:border-slate-600"
              >
                {/* Title - Large */}
                <h3 className="text-2xl lg:text-[1.75rem] font-bold text-foreground mb-4 leading-tight">
                  {benefit.title}
                </h3>
                
                {/* Description - Single sentence, muted */}
                <p className="text-base lg:text-lg text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section - Using the tabbed layout */}
      <FirmModulesSection />

      {/* Security Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Security & AI Posture
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {securityFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-3 rounded-xl bg-primary text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-cyan-500/5 border border-primary/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Coming Soon
                </span>
              </h3>
              <ul className="space-y-2">
                {comingSoon.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FinalCtaSection />
      
      <Footer />
    </div>
  );
}