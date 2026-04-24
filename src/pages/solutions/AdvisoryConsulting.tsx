import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { FirmModulesSection } from "@/components/solutions/FirmModulesSection";
import { FirmTiersSection } from "@/components/solutions/FirmTiersSection";
import { Briefcase } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ServiceSchema } from "@/components/StructuredData";

// Hero Product Screenshot Mockup - Memo workflow view
const HeroScreenshotMockup = () => (
  <div className="w-full max-w-lg mx-auto">
    <div className="bg-background rounded-xl border border-border shadow-2xl overflow-hidden">
      {/* Window chrome */}
      <div className="bg-muted px-4 py-2.5 flex items-center gap-2 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-5 w-32 bg-muted rounded-md"></div>
        </div>
      </div>

      {/* App content - Memo workflow */}
      <div className="p-4 flex gap-3">
        {/* Sidebar - Client list */}
        <div className="w-1/4 space-y-2">
          <div className="h-6 w-full bg-primary/20 rounded-md"></div>
          <div className="h-4 w-4/5 bg-primary/30 rounded"></div>
          <div className="h-4 w-3/5 bg-muted rounded"></div>
          <div className="h-4 w-4/5 bg-muted rounded"></div>
          <div className="h-4 w-2/3 bg-muted rounded"></div>
        </div>

        {/* Main content - Memo view */}
        <div className="flex-1 space-y-3">
          {/* Header with client badge */}
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="h-5 w-28 bg-primary/40 rounded"></div>
            <div className="h-4 w-20 bg-green-500/30 rounded-full"></div>
          </div>

          {/* Memo content */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-amber-400/60 rounded"></div>
            <div className="h-3 w-full bg-muted rounded"></div>
            <div className="h-3 w-11/12 bg-muted rounded"></div>
            <div className="h-3 w-4/5 bg-muted rounded"></div>
            <div className="mt-3 h-4 w-24 bg-primary/30 rounded"></div>
            <div className="h-3 w-full bg-muted rounded"></div>
            <div className="h-3 w-10/12 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const advisoryUseCases = [
  {
    category: "Technical Accounting Consulting",
    headline: "Deliver senior-level technical work on every engagement.",
    bullets: [
      "Generate audit-ready memos for revenue, leases, debt, stock comp, and business combinations in minutes",
      "Combine Gaapio's CPA judgment with your firm's methodology — consultants operate from the same playbook",
      "Source-referenced outputs tie every conclusion back to the codification, not a blog post",
    ],
  },
  {
    category: "Managed Services & SOX Advisory",
    headline: "Scale recurring client work without scaling headcount.",
    bullets: [
      "Standardize disclosure checklists, control documentation, and close-cycle deliverables across clients",
      "Onboard new consultants faster with expertise embedded directly into prompts and templates",
      "Customize templates per client or industry — consistent output, client-specific branding",
    ],
  },
];

const securityItems = [
  "Customer data never trains public AI models",
  "End-to-end encryption in transit and at rest",
  "Role-based access controls and audit logs",
  "SOC 2–aligned infrastructure and controls",
];

export default function AdvisoryConsulting() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Advisory & Consulting Solutions - AI for CPA Firm Advisory Practices"
        description="AI-powered technical accounting for CPA firm advisory and consulting practices. Scale senior expertise, standardize client deliverables, and onboard consultants faster."
        canonical="/solutions/advisory"
        keywords={['CPA advisory software', 'technical accounting consulting', 'managed services accounting', 'SOX advisory tools', 'consulting firm AI']}
      />
      <ServiceSchema
        name="Gaapio for Advisory & Consulting Practices"
        description="Technical accounting and managed-services tools for CPA firm advisory and consulting practices — standardize client deliverables and scale senior expertise."
        url="/solutions/advisory"
        audience="CPA Firm Advisory Partners, Technical Accounting Consultants, Managed Services Leaders"
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
                <Briefcase className="h-5 w-5 text-gray-900" />
                <span className="text-sm font-medium text-gray-900">Advisory &amp; Consulting</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                <span className="text-gray-900">Scale Senior Expertise.</span>{" "}
                <span className="text-white">Not Headcount.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-900/90 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
                Deliver senior-level technical memos, research, and SOX work for every client — anchored in the codification and your firm's methodology. One platform, every engagement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="black" className="text-base px-8 py-6 h-auto font-semibold" asChild>
                  <Link to="/firm-signup">Sign Up Now</Link>
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

      {/* Why Firms Section - With Gradient Background */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted via-blue-50/40 to-muted dark:from-background dark:via-background dark:to-background" />
        
        {/* Decorative blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Built for How Advisory Practices Actually Work
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              From one-off technical accounting memos to recurring managed services, Gaapio combines your firm's methodology with real CPA judgment — so every deliverable reflects senior-level thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {advisoryUseCases.map((useCase, index) => (
              <div
                key={index}
                className="group p-10 lg:p-12 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-muted hover:border-border"
              >
                <div className="text-sm font-bold text-primary tracking-wider uppercase mb-3">
                  {useCase.category}
                </div>
                <h3 className="text-2xl lg:text-[1.75rem] font-bold text-foreground mb-6 leading-tight">
                  {useCase.headline}
                </h3>
                <ul className="space-y-3">
                  {useCase.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                      <span className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Firm Tiers Section - Package pricing */}
      <FirmTiersSection />

      {/* Modules Section - Using the tabbed layout */}
      <FirmModulesSection />

      {/* Security & Trust Section */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted via-blue-50/40 to-muted dark:from-background dark:via-background dark:to-background" />
        
        {/* Decorative blurs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Security & Trust
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Built for the security and compliance expectations of finance and audit teams.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 text-left max-w-2xl mx-auto">
              {securityItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-foreground">
                    {item}
                  </span>
                </div>
              ))}
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