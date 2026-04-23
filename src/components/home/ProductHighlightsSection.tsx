import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, FileCheck, Bell, FileSearch } from "lucide-react";
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

  const products = [
    {

      id: "memos",
      label: "ACCOUNTING MEMOS",
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
      id: "contracts",
      label: "CONTRACT ANALYSIS",
      title: "Source-Referenced Contract Analysis",
      bulletPoints: [
        "Every output cites the source language in the contract",
        "Customizable templates for structured, consistent deliverables",
        "Flows straight into lease schedules, accounting analyses, and memos"
      ],
      href: "/contract-analysis",
      icon: FileSearch,
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
    }
  ];

  return (
    <section 
      id="product-highlights" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-[#f4faff] to-white dark:from-[#1A1F2B] dark:to-[#1A1F2B] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#339CFF]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#339CFF]/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#339CFF]/10 rounded-full blur-lg"></div>
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
          <Tabs defaultValue="memos" className="w-full">
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
                      className="mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-right-2"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full">
                        <div className="mb-6">
                          <span className="text-sm font-bold text-[#339CFF] tracking-wider">
                            {product.label}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                          {product.title}
                        </h3>

                        {/* Bullet points */}

                        {/* Bullet points */}
                        <ul className="space-y-3 mb-8">
                          {product.bulletPoints.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start">
                              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#339CFF] mt-2 mr-3"></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <Button asChild variant="blue" className="w-auto">
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