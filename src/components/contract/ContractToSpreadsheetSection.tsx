import { memo, useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { cn } from "@/lib/utils";
import { FileSpreadsheet, Download, Layers, RefreshCw, Pencil, Ruler } from "lucide-react";

const features = [
  { icon: Ruler, title: "Defined Extraction", description: "Templates define exactly which fields to extract—parties, dates, amounts, terms." },
  { icon: FileSpreadsheet, title: "Standardized Formats", description: "Dates, amounts, and values are normalized for reporting and analytics." },
  { icon: Download, title: "Excel & CSV Export", description: "Separate sheets by object type—lease components, payment schedules, and more." },
  { icon: Layers, title: "Multi-Contract Comparison", description: "Combine data from many contracts into a single report." },
  { icon: RefreshCw, title: "Consistent Across Runs", description: "Same template guarantees the same fields and layout every time." },
  { icon: Pencil, title: "Editable Outputs", description: "Correct or supplement AI-extracted values; edits are preserved in exports." },
];

const mockTableData = [
  { contract: "Office Lease – 123 Main", type: "Operating", commence: "01/01/2024", term: "60 mo", payment: "$12,500", liability: "$687,230" },
  { contract: "Warehouse – 456 Oak Ave", type: "Finance", commence: "03/01/2024", term: "120 mo", payment: "$28,000", liability: "$2,814,500" },
  { contract: "Equipment Lease – Fleet", type: "Finance", commence: "06/15/2024", term: "36 mo", payment: "$4,200", liability: "$142,800" },
  { contract: "Retail Space – Mall Unit 9", type: "Operating", commence: "09/01/2024", term: "84 mo", payment: "$18,750", liability: "$1,387,200" },
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(220 25% 10%) 0%, hsl(220 30% 7%) 100%)" }}
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <ResponsiveContainer className="relative z-10">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Contracts to Spreadsheets
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white !leading-tight">
            From contracts to spreadsheets in a<br className="hidden md:block" /> consistent, repeatable way
          </h2>
          <p className="text-lg text-[hsl(220_15%_65%)] max-w-2xl mx-auto">
            One-click export to Excel with consistent structure, so you can compare terms and obligations across your contract portfolio.
          </p>
        </div>

        {/* Export table mockup */}
        <div className={cn(
          "mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )} style={{ transitionDelay: "200ms" }}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-2xl blur-xl" />
            
            <div className="relative bg-[hsl(220_25%_14%)] rounded-2xl border border-[hsl(220_20%_22%)] shadow-2xl overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-[hsl(220_20%_20%)]">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-white">Lease Portfolio Export</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">4 contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 text-xs text-[hsl(220_15%_65%)] hover:text-white transition-colors px-3 py-1.5 rounded-md border border-[hsl(220_20%_22%)] hover:border-[hsl(220_20%_28%)]">
                    <Download className="w-3 h-3" />
                    Export .xlsx
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[hsl(220_20%_20%)]">
                      {["Contract", "Classification", "Commence", "Term", "Monthly Payment", "Total Liability"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[hsl(220_15%_50%)]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockTableData.map((row, i) => (
                      <tr
                        key={i}
                        className={cn(
                          "border-b border-[hsl(220_20%_18%)] transition-all duration-500",
                          isVisible ? "opacity-100" : "opacity-0",
                          i % 2 === 0 ? "bg-transparent" : "bg-[hsl(220_25%_12%)]"
                        )}
                        style={{ transitionDelay: `${400 + i * 100}ms` }}
                      >
                        <td className="px-6 py-3.5 text-white font-medium text-[13px]">{row.contract}</td>
                        <td className="px-6 py-3.5">
                          <span className={cn(
                            "text-[11px] font-medium px-2 py-0.5 rounded-full",
                            row.type === "Finance"
                              ? "bg-blue-500/15 text-blue-400"
                              : "bg-emerald-500/15 text-emerald-400"
                          )}>
                            {row.type}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-[hsl(220_15%_65%)] text-[13px]">{row.commence}</td>
                        <td className="px-6 py-3.5 text-[hsl(220_15%_65%)] text-[13px]">{row.term}</td>
                        <td className="px-6 py-3.5 text-white font-medium text-[13px]">{row.payment}</td>
                        <td className="px-6 py-3.5 text-white font-medium text-[13px]">{row.liability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={cn(
                  "bg-[hsl(220_25%_14%)] rounded-xl p-6 border border-[hsl(220_20%_20%)] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${600 + index * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-[hsl(220_15%_55%)] text-[13px] leading-relaxed">
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
