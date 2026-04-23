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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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
  }, [logos]);

  // Don't render if feature is disabled
  if (configLoading || (siteConfig && !siteConfig.enable_customer_logos)) {
    return null;
  }

  // Don't render if no logos or still loading
  if (isLoading || !logos || logos.length === 0) {
    return null;
  }

  // Duplicate logos for seamless marquee loop
  const doubledLogos = [...logos, ...logos];

  return (
    <section
      ref={sectionRef}
      className="py-10 bg-white border-y border-gray-200 overflow-hidden"
    >
      <ResponsiveContainer>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-600 mb-6 uppercase tracking-wider">
            Trusted by Leading Organizations
          </h3>

          <div className="relative w-full">
            <div className="flex whitespace-nowrap py-2 overflow-hidden">
              <div
                className={cn(
                  "animate-trustbar-marquee flex shrink-0 gap-12 md:gap-16 pr-12 md:pr-16 items-center transition-opacity duration-700",
                  isVisible ? "opacity-80" : "opacity-0"
                )}
              >
                {doubledLogos.map((logo, index) => (
                  <div
                    key={`${logo.id}-${index}`}
                    className="shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={logo.logo_url}
                      alt={logo.company_name}
                      className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
                      title={logo.company_name}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient fade edges (always white so it blends both modes) */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </ResponsiveContainer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes trustbar-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-trustbar-marquee {
              animation: trustbar-marquee 40s linear infinite;
            }
          `,
        }}
      />
    </section>
  );
}
