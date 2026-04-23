
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveCustomerLogos } from "@/hooks/useCustomerLogos";

export function TrustBarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { data: logos, isLoading } = useActiveCustomerLogos();

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

  // Don't render if no logos or still loading
  if (isLoading || !logos || logos.length === 0) {
    return null;
  }

  // Double the array for seamless marquee scrolling
  const doubledLogos = [...logos, ...logos];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-white border-t border-gray-100 overflow-hidden"
    >
      <ResponsiveContainer>
        <div className="text-center mb-8">
          <h3 className="text-lg font-medium text-gray-600 mb-8">
            Trusted by Leading Organizations
          </h3>
        </div>

        <div className="relative w-full">
          <div className="flex whitespace-nowrap py-4 overflow-hidden">
            <div className="animate-trustbar-marquee flex shrink-0 gap-8 pr-8">
              {doubledLogos.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className={cn(
                    "shrink-0 flex items-center justify-center transition-all duration-1000",
                    isVisible ? "opacity-80" : "opacity-0"
                  )}
                >
                  <div className="w-32 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:scale-105 transition-transform duration-300 p-2">
                    <img
                      src={logo.logo_url}
                      alt={logo.company_name}
                      className="max-w-full max-h-full object-contain"
                      title={logo.company_name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />
        </div>
      </ResponsiveContainer>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes trustbar-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-trustbar-marquee {
            animation: trustbar-marquee 40s linear infinite;
          }
        `
      }} />
    </section>
  );
}
