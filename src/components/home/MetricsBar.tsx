import { memo } from "react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";

export const MetricsBar = memo(function MetricsBar() {
  const metrics = [
    { value: "10,000+", label: "Memos Generated" },
    { value: "5,000+", label: "Hours Saved" },
    { value: "99.8%", label: "CPA Accuracy" },
    { value: "500+", label: "Firms Trust Us" },
  ];

  return (
    <section className="py-12 bg-white/10 dark:bg-black/20 backdrop-blur-sm border-y border-white/20 dark:border-gray-800/50">
      <ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {metric.value}
              </div>
              <div className="text-sm md:text-base text-white/80">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
});
