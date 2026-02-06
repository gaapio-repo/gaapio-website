import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { FileSpreadsheet, Ruler, Download, Layers, RefreshCw, Pencil } from "lucide-react";

const steps = [
  {
    icon: Ruler,
    title: "Defined Extraction",
    description: "Templates define exactly which fields to extract—parties, dates, amounts, terms—so every contract is processed the same way.",
  },
  {
    icon: FileSpreadsheet,
    title: "Standardized Data Formats",
    description: "Dates, amounts, and other values are normalized so they're ready for reporting and analytics.",
  },
  {
    icon: Download,
    title: "Excel & CSV Export",
    description: "Export structured data to spreadsheets with separate sheets by object type—lease components, payment schedules, and more.",
  },
  {
    icon: Layers,
    title: "Multi-Contract Comparison",
    description: "Combine data from many contracts into a single report to compare terms, dates, and obligations.",
  },
  {
    icon: RefreshCw,
    title: "Consistent Structure Across Runs",
    description: "Using the same template guarantees the same fields and layout every time, so reports stay comparable.",
  },
  {
    icon: Pencil,
    title: "Editable Outputs",
    description: "Correct or supplement AI-extracted values in the app; edits are preserved and reflected in exports.",
  },
];

export const ContractToSpreadsheetSection = memo(function ContractToSpreadsheetSection() {
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
            Contracts to Spreadsheets
          </p>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "100ms" }}>
            From contracts to spreadsheets in a consistent, repeatable way
          </h2>
          <p className={cn(
            "text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "200ms" }}>
            One-click export to Excel with consistent structure, so you can compare terms and obligations across your contract portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={cn(
                  "bg-white dark:bg-gray-800/50 rounded-xl p-7 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:-translate-y-[3px] transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-[#0099FF]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#0099FF]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </ResponsiveContainer>
    </section>
  );
});
