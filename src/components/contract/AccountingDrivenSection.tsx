import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { BookOpen, GitBranch, HelpCircle, ListChecks, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "GAAP-Aligned Templates",
    description: "Templates built around standards like ASC 842 and ASC 606, so analysis matches your technical accounting process.",
  },
  {
    icon: GitBranch,
    title: "Issue-Centric Workflows",
    description: "Parent steps identify items like lease components or performance obligations, and child steps analyze each one.",
  },
  {
    icon: HelpCircle,
    title: "Clear Questions at Each Step",
    description: "Each analysis item has a specific question so reviewers know exactly what to decide and document.",
  },
  {
    icon: ListChecks,
    title: "Structured Response Types",
    description: "Steps support text, yes/no, amounts, dates, and picklists to capture the right type of information at each point.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-Ready Documentation",
    description: "Explicit applicability and conclusion steps support a clear path from facts to treatment.",
  },
];

export const AccountingDrivenSection = memo(function AccountingDrivenSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#F8FBFF] dark:bg-[#1A1F2B]">
      <ResponsiveContainer>
        <div className="text-center mb-16">
          <p className={cn(
            "text-sm font-semibold uppercase tracking-wider text-[#0099FF] mb-3 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Accounting-Driven Structure
          </p>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "100ms" }}>
            Analysis that follows how you think about accounting
          </h2>
          <p className={cn(
            "text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "200ms" }}>
            Structured templates, GAAP-aligned workflows, and repeatable extraction from contracts to spreadsheets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center text-center transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-[#0099FF]/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#0099FF]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-[280px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </ResponsiveContainer>
    </section>
  );
});
