import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveCustomerLogos } from "@/hooks/useCustomerLogos";

export function TrustBarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const { data: logos, isLoading } = useActiveCustomerLogos();

  useEffect(() => {
    // Check feature toggle setting
    const checkToggle = () => {
      const savedToggles = localStorage.getItem("featureToggles");
      if (savedToggles) {
        const toggles = JSON.parse(savedToggles);
        const logosToggle = toggles.find((toggle: any) => toggle.id === "customer-logos");
        if (logosToggle) {
          setIsEnabled(logosToggle.enabled);
        }
      }
    };

    checkToggle();

    // Listen for changes in localStorage (from admin panel)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'featureToggles') {
        checkToggle();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
  if (!isEnabled) {
    return null;
  }

  // Don't render if no logos or still loading
  if (isLoading || !logos || logos.length === 0) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="py-8 bg-slate-50 dark:bg-slate-200 border-b border-gray-100 dark:border-slate-300"
    >
      <ResponsiveContainer>
        <div className="text-center">
          <h3 className="text-sm font-medium text-muted-foreground dark:text-black mb-6 uppercase tracking-wider">
            Trusted by Leading Organizations
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <div 
                key={logo.id}
                className={cn(
                  "flex items-center justify-center transition-all duration-700",
                  isVisible 
                    ? "opacity-70 translate-y-0 hover:opacity-100" 
                    : "opacity-0 translate-y-[10px]"
                )}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                }}
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
      </ResponsiveContainer>
    </section>
  );
}
