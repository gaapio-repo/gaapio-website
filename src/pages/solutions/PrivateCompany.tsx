import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Building, FileText, Clock, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ServiceSchema } from "@/components/StructuredData";

const benefits = [
  {
    icon: FileText,
    title: "Streamlined Technical Accounting",
    description: "Generate audit-ready memos in minutes, not hours. Our AI understands private company accounting standards.",
  },
  {
    icon: Clock,
    title: "Faster Audit Prep",
    description: "Organize your documentation and create comprehensive audit packages that satisfy auditor requirements.",
  },
  {
    icon: Shield,
    title: "CPA-Approved Quality",
    description: "Every memo and disclosure follows professional standards, reviewed by CPAs with Big 4 experience.",
  },
  {
    icon: CheckCircle,
    title: "Simplified Compliance",
    description: "Stay current with guidance updates and implement new standards with confidence.",
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

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Private Company Needs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From lease accounting to revenue recognition, we help you tackle complex accounting challenges efficiently.
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
