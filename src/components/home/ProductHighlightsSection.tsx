import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, FileCheck, Bell, FileSearch, Brain, Shield, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function ProductHighlightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedBullet, setExpandedBullet] = useState<string | null>(null);

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
      hasHoverDescriptions: true,
      href: "/contract-analysis",
      icon: FileSearch,
      iconColor: "hsl(var(--primary))"
    },
    {
      id: "memos",
      label: "MEMOS",
      title: "Better Memos, Faster.",
      bulletPoints: [
        "Version history, reviewer comments, and internal sign offs",
        "Guided prompts + AI follow up questions = accurate AI generated memos",
        "Exportable Audit package"
      ],
      href: "/accounting-memos",
      icon: FileText,
      iconColor: "hsl(var(--primary))"
    },
    {
      id: "disclosures",
      label: "FOOTNOTE DISCLOSURES", 
      title: "Benchmark & AI completed Checklists",
      bulletPoints: [
        "AI trained benchmarking",
        "Footnote requirement checklists",
        "CPA approved, industry leading formatting"
      ],
      href: "/footnote-disclosures",
      icon: FileCheck,
      iconColor: "hsl(var(--primary))"
    },
    {
      id: "research-gpt",
      label: "ACCOUNTING RESEARCH",
      title: "Your Firm's AI Research Assistant",
      bulletPoints: [
        "Search Big 4 accounting guides and technical resources",
        "Natural language queries across comprehensive knowledge base",
        "Internal GPT (coming soon)"
      ],
      href: "/research-gpt",
      icon: Brain,
      iconColor: "hsl(var(--primary))"
    },
    {
      id: "updates",
      label: "GUIDANCE UPDATES",      
      title: "Apply New Guidance to Your Situation",
      bulletPoints: [
        "Instant alerts for new standards",
        "Actionable implementation guidance",
        "Turn new guidance into a memo"
      ],
      href: "/guidance-updates",
      icon: Bell,
      iconColor: "hsl(var(--primary))"
    },
    {
      id: "sox-controls",
      label: "SOX CONTROLS (COMING SOON)",
      title: "Coming Soon",
      bulletPoints: [],
      href: "/sox-controls",
      icon: Shield,
      iconColor: "hsl(var(--primary))"
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

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gaapio's Modules</h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We built a platform for a reason, need something that isn't on here? Let us know!
          </p>
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
                        className="w-full h-auto p-6 justify-start text-left bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-gray-200 dark:border-white/20 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary data-[state=active]:shadow-sm text-gray-900 dark:text-white data-[state=active]:text-white transition-all duration-300 shadow-sm dark:shadow-none"
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
                          <span className="text-sm font-bold text-primary tracking-wider">
                            {product.label}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                          {product.title}
                        </h3>

                        {/* Bullet points */}
                        <ul className="space-y-2 mb-8 flex-grow">
                          {product.bulletPoints.map((point, pointIndex) => {
                            const isObjectPoint = typeof point === 'object' && point !== null;
                            const title = isObjectPoint ? point.title : point;
                            const description = isObjectPoint ? point.description : null;
                            const hasExpandableContent = product.hasHoverDescriptions && description;
                            const bulletKey = `${product.id}-${pointIndex}`;
                            const isExpanded = expandedBullet === bulletKey;

                            const handleToggle = () => {
                              if (hasExpandableContent) {
                                setExpandedBullet(isExpanded ? null : bulletKey);
                              }
                            };

                            return (
                              <li key={pointIndex} className="flex flex-col">
                                <button
                                  type="button"
                                  onClick={handleToggle}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      handleToggle();
                                    }
                                  }}
                                  aria-expanded={hasExpandableContent ? isExpanded : undefined}
                                  className={cn(
                                    "flex items-start w-full text-left py-2 px-2 -mx-2 rounded-lg transition-colors duration-150",
                                    hasExpandableContent && "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50",
                                    isExpanded && "bg-slate-50 dark:bg-slate-700/50"
                                  )}
                                  disabled={!hasExpandableContent}
                                >
                                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
                                  <span className="text-gray-700 dark:text-gray-300 flex-1">
                                    {title}
                                  </span>
                                  {hasExpandableContent && (
                                    <ChevronDown 
                                      className={cn(
                                        "w-4 h-4 text-gray-400 ml-2 mt-1 flex-shrink-0 transition-transform duration-200 ease-in-out",
                                        isExpanded && "rotate-180"
                                      )}
                                    />
                                  )}
                                </button>
                                
                                {/* Expandable content */}
                                {hasExpandableContent && (
                                  <div
                                    className={cn(
                                      "overflow-hidden transition-all duration-200 ease-in-out",
                                      isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                  >
                                    <div className="ml-5 pl-3 py-2 mt-1 mb-1 border-l-2 border-slate-200 dark:border-slate-600 bg-[#f7f9fc] dark:bg-slate-800/50 rounded-r-md">
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                        {description}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </li>
                            );
                          })}
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