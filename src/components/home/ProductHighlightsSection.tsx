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
      iconColor: "#339CFF"
    },
    {
      id: "memos",
      label: "MEMOS",
      title: "ChatGPT gets you in the news. Gaapio gets you through an audit.",
      bulletPoints: [
        "Built by CPAs — asks the right questions, the first time",
        "Consistent, audit-ready formatting that reflects your brand",
        "Version history, reviewer comments, sign-offs, and exportable audit packages"
      ],
      href: "/accounting-memos",
      icon: FileText,
      iconColor: "#339CFF"
    },
    {
      id: "disclosures",
      label: "FOOTNOTE DISCLOSURES",
      title: "AI-Completed Checklists. Real Time Savings.",
      bulletPoints: [
        "The ideal AI use case — high-confidence verification, no judgment calls",
        "Cut manual review time with AI-completed disclosure checklists",
        "Fast, budget-friendly benchmarking against peers in your industry"
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
        "Search Big 4 accounting guides and technical resources",
        "Natural language queries across comprehensive knowledge base",
        "Internal GPT (coming soon)"
      ],
      href: "/research-gpt",
      icon: Brain,
      iconColor: "#339CFF"
    },
    {
      id: "updates",
      label: "GUIDANCE UPDATES",
      title: "Research-Grade Answers, in Seconds",
      bulletPoints: [
        "High-accuracy answers backed by verifiable, authoritative sources",
        "Instant alerts when new standards affect your situation",
        "Turn new guidance straight into a memo — no blank page"
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
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decorative elements - subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/3 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/3 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
      </div>

      <ResponsiveContainer>
        <div className="text-center mb-16 relative z-10">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">One Platform. Every Technical Accounting Workflow.</h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Purpose-built modules for memos, disclosures, contracts, and guidance — all connected, all audit-ready.
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
                <TabsList className="flex flex-col h-auto w-full bg-transparent border-0 shadow-none space-y-2 p-0">
                  {products.map((product) => {
                    return (
                      <TabsTrigger
                        key={product.id}
                        value={product.id}
                        className="w-full h-auto p-6 justify-start text-left rounded-lg bg-muted/70 shadow-inner hover:shadow-md !border-0 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md text-foreground transition-shadow duration-200"
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
                      <div className="rounded-lg bg-muted/70 shadow-inner p-8 h-full flex flex-col">
                        <div className="mb-6">
                          <span className="text-sm font-bold text-[#339CFF] tracking-wider">
                            {product.label}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-foreground">
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
                                    hasExpandableContent && "cursor-pointer hover:bg-muted",
                                    isExpanded && "bg-muted"
                                  )}
                                  disabled={!hasExpandableContent}
                                >
                                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#339CFF] mt-2 mr-3"></div>
                                  <span className="text-muted-foreground flex-1">
                                    {title}
                                  </span>
                                  {hasExpandableContent && (
                                    <ChevronDown 
                                      className={cn(
                                        "w-4 h-4 text-muted-foreground ml-2 mt-1 flex-shrink-0 transition-transform duration-200 ease-in-out",
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
                                    <div className="ml-5 pl-3 py-2 mt-1 mb-1 border-l-2 border-border bg-muted rounded-r-md">
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