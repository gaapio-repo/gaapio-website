import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { ProductHighlightsSection } from "@/components/home/ProductHighlightsSection";
import { Building2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ServiceSchema } from "@/components/StructuredData";

// Mini UI mockup components - realistic product representations
const DisclosureMockup = () => (
  <div className="w-full h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 flex flex-col gap-2 overflow-hidden shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-2.5 w-20 bg-primary/60 rounded-sm"></div>
      <div className="h-2 w-12 bg-green-500/40 rounded-full ml-auto text-[6px] flex items-center justify-center text-green-700">SEC</div>
    </div>
    <div className="flex flex-col gap-1.5">
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-4/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-3/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
    </div>
  </div>
);

const SOXMockup = () => (
  <div className="w-full h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 overflow-hidden shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <div className="h-2.5 w-16 bg-amber-400/60 rounded-sm"></div>
      <div className="h-2 w-8 bg-primary/30 rounded ml-auto"></div>
    </div>
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded bg-green-500/60 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
        </div>
        <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded bg-green-500/60 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
        </div>
        <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded border border-slate-300 dark:border-slate-600"></div>
        <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      </div>
    </div>
  </div>
);

const ReportingMockup = () => (
  <div className="w-full h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 flex gap-2 overflow-hidden shadow-sm">
    <div className="w-1/3 flex flex-col gap-1.5">
      <div className="h-2 w-full bg-primary/40 rounded-sm"></div>
      <div className="h-1.5 w-4/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-3/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-4/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
    </div>
    <div className="flex-1 border-l border-slate-200 dark:border-slate-700 pl-2 flex flex-col gap-1.5">
      <div className="h-2 w-12 bg-primary/60 rounded-sm"></div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
    </div>
  </div>
);

const AuditMockup = () => (
  <div className="w-full h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 overflow-hidden shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      {['10-K', '10-Q', 'SOX'].map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div className={`h-4 px-2 rounded text-[8px] font-medium flex items-center ${i === 0 ? 'bg-green-500/20 text-green-700' : i === 1 ? 'bg-green-500/20 text-green-700' : 'bg-primary/20 text-primary'}`}>
            {label}
          </div>
        </div>
      ))}
    </div>
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex-1 h-6 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center">
          <div className="h-1.5 w-3/4 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
);

const benefits = [
  {
    Mockup: DisclosureMockup,
    title: "Disclosure-Ready in Hours",
    description: "Generate SEC-compliant footnotes with structured, reviewer-ready outputs.",
  },
  {
    Mockup: SOXMockup,
    title: "SOX Without the Spreadsheets",
    description: "AI-powered controls and narratives auditors can verify instantly.",
  },
  {
    Mockup: ReportingMockup,
    title: "Faster 10-Ks & 10-Qs",
    description: "Automated workflows that cut reporting cycles.",
  },
  {
    Mockup: AuditMockup,
    title: "Documentation Auditors Trust",
    description: "Standardized memos and workpapers accepted the first time.",
  },
];

// Hero Product Screenshot Mockup
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
      
      {/* App content */}
      <div className="p-4 flex gap-3">
        {/* Sidebar */}
        <div className="w-1/4 space-y-2">
          <div className="h-6 w-full bg-primary/20 rounded-md"></div>
          <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-600 rounded"></div>
          <div className="h-4 w-3/5 bg-primary/30 rounded"></div>
          <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-600 rounded"></div>
          <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-600 rounded"></div>
        </div>
        
        {/* Main content - Disclosure view */}
        <div className="flex-1 space-y-3">
          {/* Header with status */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-600">
            <div className="h-5 w-28 bg-primary/40 rounded"></div>
            <div className="h-4 w-16 bg-green-500/30 rounded-full"></div>
          </div>
          
          {/* Disclosure content */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-amber-400/60 rounded"></div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-11/12 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="mt-3 h-4 w-20 bg-primary/30 rounded"></div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-10/12 bg-slate-200 dark:bg-slate-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function PublicCompany() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Public Company Accounting Solutions - SEC & SOX Compliance"
        description="Enterprise-grade compliance solutions for SEC filers. Streamline SOX documentation, accelerate 10-K reporting, and maintain disclosure excellence with AI-powered automation."
        canonical="/solutions/public"
        keywords={['public company accounting', 'SEC reporting', 'SOX compliance', '10-K disclosures', 'SEC filer tools']}
      />
      <ServiceSchema
        name="Gaapio for Public Companies"
        description="SEC reporting, SOX compliance, and disclosure management solutions for public companies and SEC filers."
        url="/solutions/public"
        audience="SEC Filers, Public Company Controllers, Technical Accounting Managers"
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
                <Building2 className="h-5 w-5 text-gray-800 dark:text-white" />
                <span className="text-sm font-medium text-gray-800 dark:text-white">Public Company Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                <span className="text-gray-900 dark:text-white">SEC-Ready</span>{" "}
                <span className="text-white">Technical Accounting</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-800 dark:text-white/90 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
                Generate defensible memos, disclosures, and contract analysis for 10-Ks, 10-Qs, and SOX — in minutes, not weeks.
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

      {/* Benefits Section - With Gradient Background */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-800/40 dark:to-slate-900" />
        
        {/* Decorative blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Why Public Companies Choose Gaapio
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Enterprise-grade compliance without the enterprise overhead.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Mockup = benefit.Mockup;
              return (
                <div 
                  key={index}
                  className="group p-10 lg:p-12 rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/40 hover:border-slate-300 dark:hover:border-slate-600"
                >
                  {/* Mini UI Mockup */}
                  <div className="mb-8">
                    <Mockup />
                  </div>
                  
                  {/* Title - Large */}
                  <h3 className="text-2xl lg:text-[1.75rem] font-bold text-foreground mb-4 leading-tight">
                    {benefit.title}
                  </h3>
                  
                  {/* Description - Single sentence, muted */}
                  <p className="text-base lg:text-lg text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <ProductHighlightsSection />

      {/* CTA Section */}
      <FinalCtaSection />
      
      <Footer />
    </div>
  );
}
