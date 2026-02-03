import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { ProductHighlightsSection } from "@/components/home/ProductHighlightsSection";
import { Building } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ServiceSchema } from "@/components/StructuredData";

// Mini UI mockup components - realistic product representations
const MemoMockup = () => (
  <div className="w-full h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 flex flex-col gap-2 overflow-hidden shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-2.5 w-16 bg-primary/60 rounded-sm"></div>
      <div className="h-2 w-8 bg-green-500/40 rounded-full ml-auto"></div>
    </div>
    <div className="flex flex-col gap-1.5">
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-4/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-3/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
    </div>
  </div>
);

const TeamMockup = () => (
  <div className="w-full h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 overflow-hidden shadow-sm">
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        <div className="w-6 h-6 rounded-full bg-primary/70"></div>
        <div className="w-6 h-6 rounded-full bg-primary/50"></div>
        <div className="w-6 h-6 rounded-full bg-primary/30"></div>
      </div>
      <div className="flex-1">
        <div className="h-2 w-20 bg-slate-300 dark:bg-slate-600 rounded-full mb-1.5"></div>
        <div className="h-1.5 w-14 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
    <div className="mt-3 flex gap-2">
      <div className="h-4 flex-1 bg-primary/10 rounded flex items-center px-2">
        <div className="h-1.5 w-full bg-primary/40 rounded-full"></div>
      </div>
    </div>
  </div>
);

const ResearchMockup = () => (
  <div className="w-full h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 flex gap-2 overflow-hidden shadow-sm">
    <div className="w-1/3 flex flex-col gap-1.5">
      <div className="h-2 w-full bg-primary/40 rounded-sm"></div>
      <div className="h-1.5 w-4/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-3/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-4/5 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
    </div>
    <div className="flex-1 border-l border-slate-200 dark:border-slate-700 pl-2 flex flex-col gap-1.5">
      <div className="h-2 w-1/2 bg-amber-400/60 rounded-sm"></div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
    </div>
  </div>
);

const WorkflowMockup = () => (
  <div className="w-full h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 overflow-hidden shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      {['Contract', 'Lease', 'Revenue'].map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-green-500' : 'bg-primary/60'}`}></div>
          <div className="h-1.5 w-10 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
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
    Mockup: MemoMockup,
    title: "Audit-Ready in Days, Not Weeks",
    description: "Generate memos and disclosures your auditors accept the first time.",
  },
  {
    Mockup: TeamMockup,
    title: "Operate Like a Bigger Team",
    description: "AI assists junior staff so seniors focus on judgment.",
  },
  {
    Mockup: ResearchMockup,
    title: "Big 4-Level Technical Depth",
    description: "Built-in guidance and citations without consultant fees.",
  },
  {
    Mockup: WorkflowMockup,
    title: "Standardized Workflows",
    description: "Contracts, leases, and revenue handled consistently every time.",
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
          <div className="h-4 w-3/5 bg-slate-200 dark:bg-slate-600 rounded"></div>
          <div className="h-4 w-4/5 bg-primary/30 rounded"></div>
          <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-600 rounded"></div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 space-y-3">
          {/* Header with tabs */}
          <div className="flex gap-2 pb-2 border-b border-slate-200 dark:border-slate-600">
            <div className="h-5 w-16 bg-primary/40 rounded"></div>
            <div className="h-5 w-16 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-5 w-16 bg-slate-200 dark:bg-slate-600 rounded"></div>
          </div>
          
          {/* Memo content */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-40 bg-amber-400/60 rounded"></div>
              <div className="h-4 w-16 bg-green-500/40 rounded-full ml-auto"></div>
            </div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-11/12 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="mt-4 h-4 w-32 bg-primary/30 rounded"></div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-10/12 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div className="h-3 w-9/12 bg-slate-200 dark:bg-slate-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function PrivateCompany() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Private Company Accounting Solutions - Gaapio"
        description="Technical accounting solutions for private companies. Streamline audit preparation, generate technical memos, and maintain compliance with AI-powered tools built for CFOs and Controllers."
        canonical="/solutions/private"
        keywords={['private company accounting', 'CFO tools', 'controller software', 'audit preparation', 'technical accounting']}
      />
      <ServiceSchema
        name="Gaapio for Private Companies"
        description="Technical accounting and audit preparation solutions for CFOs and Controllers at private companies."
        url="/solutions/private"
        audience="CFOs, Controllers, Private Company Accounting Teams"
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
                <Building className="h-5 w-5 text-gray-800 dark:text-white" />
                <span className="text-sm font-medium text-gray-800 dark:text-white">Private Company Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                <span className="text-gray-900 dark:text-white">Technical Accounting</span>{" "}
                <span className="text-white">Without Big 4 Headcount</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-800 dark:text-white/90 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
                Move faster through audits with AI-generated memos, disclosures, and contract workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="black" className="text-base px-8 py-6 h-auto font-semibold" asChild>
                  <Link to="/signup">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100 text-base px-8 py-6 h-auto font-semibold" asChild>
                  <Link to="/request-demo">Request a Demo</Link>
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
              Why Private Companies Choose Gaapio
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Enterprise-grade technical accounting without the overhead.
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
