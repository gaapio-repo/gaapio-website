import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveCustomerLogos } from "@/hooks/useCustomerLogos";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export function TrustBarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { siteConfig, loading: configLoading } = useSiteConfig();
  const { data: logos, isLoading } = useActiveCustomerLogos();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Lower threshold to trigger sooner
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback: if element is already in viewport on mount, make visible
    const timeout = setTimeout(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setIsVisible(true);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [logos]); // Re-run when logos load

  // Don't render if feature is disabled
  if (configLoading || (siteConfig && !siteConfig.enable_customer_logos)) {
    return null;
  }

  // Don't render if no logos or still loading
  if (isLoading || !logos || logos.length === 0) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="py-8 bg-white border-b border-gray-100"
    >
      <ResponsiveContainer>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">
            Trusted by Leading Organizations
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <div 
                key={logo.id}
                className={cn(
                  "flex items-center justify-center transition-all duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[10px]"
                )}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                }}
              >
              <img
                  src={logo.logo_url}
                  alt={logo.company_name}
                  className="h-8 md:h-10 w-auto object-contain transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105"
                  title={logo.company_name}
                />
              </div>
            ))}
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
