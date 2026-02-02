import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  FileText, 
  Search, 
  BookOpen,
  Bell,
  Shield,
  Lock,
  Bot,
  FileCheck
} from "lucide-react";

const coreValues = [
  {
    icon: TrendingUp,
    title: "Upskills Staff + Increases Leverage",
    description: "Gaapio helps less-experienced team members produce higher-quality work faster—research → memo → reviewer-ready output.",
  },
  {
    icon: Clock,
    title: "Focus on What Matters",
    description: "Cuts time spent on minutia so staff focus on judgment + client-facing value.",
  },
];

const modules = [
  {
    icon: FileText,
    title: "Contract Analysis",
    tag: "Very Robust",
    features: [
      "Mass contract analysis + summary for large sets of agreements",
      "Revenue contract analysis (ASC 606 abstraction and evaluation support)",
      "Lease abstraction + evaluation (ASC 842 workflows)",
      "Business combinations, debt, stock comp, and much more",
      "Designed for accurate data abstraction + structured output"
    ]
  },
  {
    icon: Search,
    title: "Accounting Research",
    tag: "Deep + Thorough",
    features: [
      "Research across public filings, firm guidance, internal documents, and Codification",
      "Built for real supportable conclusions—not generic AI answers"
    ]
  },
  {
    icon: BookOpen,
    title: "Memos / Policies",
    tag: "Workpaper-Quality",
    features: [
      "Guided prompts + AI follow-up questions for accurate technical accounting memos",
      "Internal sign-offs + audit trail",
      "Version history and reviewer comments (built for review workflows)"
    ]
  },
  {
    icon: FileCheck,
    title: "Footnote Disclosures",
    tag: null,
    features: [
      "AI-completed disclosure checklists (use Gaapio's or your auditors')",
      "Benchmarking with full analysis to support disclosure decisions"
    ]
  },
  {
    icon: Bell,
    title: "Guidance Updates",
    tag: "Stay Current",
    features: [
      "Monitoring + analysis of FASB updates, SEC comment letters, and Big 4 interpretations"
    ]
  },
  {
    icon: Bot,
    title: "Internal AI Assistant",
    tag: "Coming Soon",
    features: [
      "Internal GPT concept for the firm",
      "Safe, controlled knowledge access"
    ]
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
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-12 overflow-hidden">
        <GradientBackground />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Briefcase className="h-5 w-5 text-gray-800 dark:text-white" />
              <span className="text-sm font-medium text-gray-800 dark:text-white">Accounting Firm Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900 dark:text-white">
              AI-Powered Technical Accounting for CPA Firms
            </h1>
            
            <p className="text-lg md:text-xl text-gray-800 dark:text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
              Built by CPAs to modernize how firms handle research, documentation, and client deliverables.
            </p>
            
            <p className="text-base md:text-lg text-gray-700 dark:text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Move faster without sacrificing accuracy—while keeping the CPA's judgment at the center.
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

      {/* Core Value Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Value to Your Firm
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-primary text-white">
                  <value.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Accounting Firm Success
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive modules designed for real accounting workflows
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {modules.map((module, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <module.icon className="h-6 w-6" />
                  </div>
                  {module.tag && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {module.tag}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {module.title}
                </h3>
                
                <ul className="space-y-2">
                  {module.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
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
