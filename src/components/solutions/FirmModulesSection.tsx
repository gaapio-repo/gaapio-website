import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, FileCheck, Bell, FileSearch, Brain, Bot, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function FirmModulesSection() {
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

  const modules = [
    {
      id: "contracts",
      label: "CONTRACT ANALYSIS",
      tag: "Full Coverage",
      title: "AI-Powered Contract Analysis",
      bulletPoints: [
        { title: "Mass contract analysis + summary for large sets of agreements", description: "Analyze large populations of contracts together or individually — no manual sorting, no CSV gymnastics." },
        { title: "Revenue contract analysis (ASC 606 abstraction and evaluation support)", description: "Automated abstraction and evaluation support for performance obligations, contract terms, and more." },
        { title: "Lease abstraction + evaluation (ASC 842 workflows)", description: "Identify embedded leases, extract key data, and support classification and accounting conclusions." },
        { title: "Business combinations, debt, stock comp, and much more", description: "Purpose-built workflows for complex accounting areas beyond just revenue and leases." },
        { title: "Designed for accurate data abstraction + structured output", description: "Clean, consistent data that flows directly into memos, disclosures, and downstream workflows." }
      ],
      hasHoverDescriptions: true,
      href: "/contract-analysis",
      icon: FileSearch
    },
    {
      id: "research",
      label: "ACCOUNTING RESEARCH",
      tag: "Deep + Thorough",
      title: "Real Supportable Conclusions",
      bulletPoints: [
        { title: "Research across public filings, firm guidance, internal documents, and Codification", description: "Comprehensive search across the sources that matter for real accounting conclusions." },
        { title: "Built for real supportable conclusions—not generic AI answers", description: "Every output is designed to support your professional judgment, not replace it." }
      ],
      hasHoverDescriptions: true,
      href: "/research-gpt",
      icon: Brain
    },
    {
      id: "memos",
      label: "MEMOS / POLICIES",
      tag: "Workpaper-Quality",
      title: "Workpaper-Quality Memos",
      bulletPoints: [
        { title: "Guided prompts + AI follow-up questions for accurate technical accounting memos", description: "Structured workflows that capture the right information for complete, accurate documentation." },
        { title: "Internal sign-offs + audit trail", description: "Built-in approval workflows with complete audit trail of who signed off and when." },
        { title: "Version history and reviewer comments (built for review workflows)", description: "Full version control with inline comments designed for the way CPA firms actually review work." }
      ],
      hasHoverDescriptions: true,
      href: "/accounting-memos",
      icon: FileText
    },
    {
      id: "disclosures",
      label: "FOOTNOTE DISCLOSURES",
      title: "AI-Completed Disclosure Checklists",
      bulletPoints: [
        "AI-completed disclosure checklists (use Gaapio's or your auditors')",
        "Benchmarking with full analysis to support disclosure decisions"
      ],
      href: "/footnote-disclosures",
      icon: FileCheck
    },
    {
      id: "updates",
      label: "GUIDANCE UPDATES",
      tag: "Stay Current",
      title: "Never Miss an Update",
      bulletPoints: [
        "Monitoring + analysis of FASB updates, SEC comment letters, and Big 4 interpretations"
      ],
      href: "/guidance-updates",
      icon: Bell
    },
    {
      id: "internal-ai",
      label: "INTERNAL AI ASSISTANT",
      title: "Your Firm's Private AI",
      bulletPoints: [
        "Internal GPT concept for the firm",
        "Safe, controlled knowledge access"
      ],
      href: "#",
      icon: Bot
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/3 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/3 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
      </div>

      <ResponsiveContainer>
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Gaapio's Modules
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive modules designed for real accounting workflows
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
                  {modules.map((module) => {
                    return (
                      <TabsTrigger
                        key={module.id}
                        value={module.id}
                        className="w-full h-auto p-6 justify-start text-left bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-gray-200 dark:border-white/20 rounded-xl data-[state=active]:bg-[#339CFF] data-[state=active]:text-white data-[state=active]:border-[#339CFF] text-gray-900 dark:text-white data-[state=active]:text-white transition-all duration-300 shadow-sm dark:shadow-none"
                      >
                        <div className="font-semibold text-base leading-tight">
                          {module.label}
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Right side - Tab content */}
              <div className="lg:w-2/3">
                {modules.map((module) => {
                  return (
                    <TabsContent
                      key={module.id}
                      value={module.id}
                      className="mt-0 h-full data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-right-2"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                        <div className="mb-6 flex items-center gap-3">
                          <span className="text-sm font-bold text-[#339CFF] tracking-wider">
                            {module.label}
                          </span>
                          {module.tag && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {module.tag}
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                          {module.title}
                        </h3>

                        {/* Bullet points */}
                        <ul className="space-y-2 mb-8 flex-grow">
                          {module.bulletPoints.map((point, pointIndex) => {
                            const isObjectPoint = typeof point === 'object' && point !== null;
                            const title = isObjectPoint ? point.title : point;
                            const description = isObjectPoint ? point.description : null;
                            const hasExpandableContent = module.hasHoverDescriptions && description;
                            const bulletKey = `${module.id}-${pointIndex}`;
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
                                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#339CFF] mt-2 mr-3"></div>
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

                        {module.href !== "#" && (
                          <Button asChild variant="blue" className="w-auto mt-auto">
                            <Link to={module.href}>
                              Learn more →
                            </Link>
                          </Button>
                        )}
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
