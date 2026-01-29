import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, FileCheck, Bell, FileSearch, Brain, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function ProductHighlightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Product order: Contract Analysis, Memos, Footnote Disclosures, Accounting Research, Guidance Updates, SOX Controls
  const products = [
    {
      id: "contracts",
      label: "CONTRACT ANALYSIS",
      title: "AI-Powered Contract Analysis",
      bulletPoints: [
        { title: "Mass contract ingestion & analysis", description: "Analyze large populations of contracts together or individually — no manual sorting, no CSV gymnastics." },
        { title: "Structured by contract type", description: "Revenue, leases, debt, stock compensation, business combinations, and more — each analyzed using purpose-built accounting logic." },
        { title: "Accounting-ready structured outputs", description: "Clean, consistent data that flows directly into memos, disclosures, and downstream workflows — not legal summaries." },
        { title: "Revenue contract analysis (ASC 606)", description: "Automated abstraction and evaluation support for performance obligations, contract terms, etc." },
        { title: "Lease abstraction & evaluation (ASC 842)", description: "Identify embedded leases, extract key data, and support classification and accounting conclusions." }
      ],
      href: "/contract-analysis",
      icon: FileSearch,
      iconColor: "#339CFF"
    },
    {
      id: "memos",
      label: "MEMOS",
      title: "Better Memos, Faster.",
      bulletPoints: [
        { title: "Version history, reviewer comments, and internal sign offs", description: "" },
        { title: "Guided prompts + AI follow up questions = accurate AI generated memos", description: "" },
        { title: "Exportable Audit package", description: "" }
      ],
      href: "/accounting-memos",
      icon: FileText,
      iconColor: "#339CFF"
    },
    {
      id: "disclosures",
      label: "FOOTNOTE DISCLOSURES", 
      title: "Benchmark & AI completed Checklists",
      bulletPoints: [
        { title: "AI trained benchmarking", description: "" },
        { title: "Footnote requirement checklists", description: "" },
        { title: "CPA approved, industry leading formatting", description: "" }
      ],
      href: "/footnote-disclosures",
      icon: FileCheck,
      iconColor: "#339CFF"
    },
    {
      id: "research-gpt",
      label: "ACCOUNTING RESEARCH",
      title: "Your Firm's AI Research Assistant",
      bulletPoints: [
        { title: "Search Big 4 accounting guides and technical resources", description: "" },
        { title: "Natural language queries across comprehensive knowledge base", description: "" },
        { title: "Internal GPT (coming soon)", description: "" }
      ],
      href: "/research-gpt",
      icon: Brain,
      iconColor: "#339CFF"
    },
    {
      id: "updates",
      label: "GUIDANCE UPDATES",      
      title: "Apply New Guidance to Your Situation",
      bulletPoints: [
        { title: "Instant alerts for new standards", description: "" },
        { title: "Actionable implementation guidance", description: "" },
        { title: "Turn new guidance into a memo", description: "" }
      ],
      href: "/guidance-updates",
      icon: Bell,
      iconColor: "#339CFF"
    },
    {
      id: "sox-controls",
      label: "SOX CONTROLS (COMING SOON)",
      title: "Coming Soon",
      bulletPoints: [],
      href: "/sox-controls",
      icon: Shield,
      iconColor: "#339CFF"
    }
  ];

  return (
    <section 
      id="product-highlights" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Background decorative elements - subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/3 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/3 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
      </div>

      <ResponsiveContainer>
        <div className="text-center mb-16 relative z-10">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gaapio's Solutions</h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           We built a platform for a reason, need something that isn't on here? Let us know! </p>
        </div>
        <div 
          className={cn(
            "max-w-7xl mx-auto transition-all duration-1000",
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-[30px]"
          )}
        >
          <Tabs defaultValue="contracts" className="w-full">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side - Tab buttons */}
              <div className="lg:w-1/3">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2 p-0">
                  {products.map((product) => {
                    return (
                      <TabsTrigger
                        key={product.id}
                        value={product.id}
                        className="w-full h-auto p-6 justify-start text-left bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-gray-200 dark:border-white/20 rounded-xl data-[state=active]:bg-[#339CFF] data-[state=active]:text-white data-[state=active]:border-[#339CFF] text-gray-900 dark:text-white data-[state=active]:text-white transition-all duration-300 shadow-sm dark:shadow-none"
                      >
                        <div className="font-semibold text-base leading-tight">
                          {product.label}
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Right side - Tab content */}
              <div className="lg:w-2/3">
                {products.map((product) => {
                  const IconComponent = product.icon;
                  return (
                    <TabsContent
                      key={product.id}
                      value={product.id}
                      className="mt-0 h-full data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-right-2"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                        <div className="mb-6">
                          <span className="text-sm font-bold text-[#339CFF] tracking-wider">
                            {product.label}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                          {product.title}
                        </h3>

                        {/* Bullet points */}
                        <ul className="space-y-4 mb-8 flex-grow">
                          {product.bulletPoints.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start">
                              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#339CFF] mt-2 mr-3"></div>
                              <div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {point.title}
                                </span>
                                {point.description && (
                                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                    {point.description}
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>

                        <Button asChild variant="blue" className="w-auto mt-auto">
                          <Link to={product.href}>
                            Learn more →
                          </Link>
                        </Button>
                      </div>
                    </TabsContent>
                  );
                })}
              </div>
            </div>
          </Tabs>
        </div>
      </ResponsiveContainer>
    </section>
  );
}