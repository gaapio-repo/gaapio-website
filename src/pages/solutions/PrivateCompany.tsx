import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Building, Zap, Users, BookOpen, RefreshCw } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ServiceSchema } from "@/components/StructuredData";

const benefits = [
  {
    icon: Zap,
    title: "Audit-Ready in Days, Not Weeks",
    description: "Generate memos and disclosures your auditors accept the first time.",
  },
  {
    icon: Users,
    title: "Operate Like a Bigger Team",
    description: "AI assists junior staff so seniors focus on judgment.",
  },
  {
    icon: BookOpen,
    title: "Big 4-Level Technical Depth",
    description: "Built-in guidance and citations without consultant fees.",
  },
  {
    icon: RefreshCw,
    title: "Standardized Workflows",
    description: "Contracts, leases, and revenue handled consistently every time.",
  },
];

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
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-12 overflow-hidden">
        <GradientBackground />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Building className="h-5 w-5 text-gray-800 dark:text-white" />
              <span className="text-sm font-medium text-gray-800 dark:text-white">Private Company Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-gray-900 dark:text-white">Technical Accounting</span>{" "}
              <span className="text-white">Made Simple</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-800 dark:text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Purpose-built for CFOs and Controllers at private companies. Streamline your technical accounting, prepare for audits faster, and maintain compliance with confidence.
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

      {/* Benefits Section - Enterprise Style */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Private Companies Choose Gaapio
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Enterprise-grade technical accounting without the enterprise overhead.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group relative p-8 lg:p-10 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6 transition-transform duration-300 group-hover:scale-110">
                  <benefit.icon className="h-6 w-6" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                
                {/* Description - single sentence */}
                <p className="text-base text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
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
