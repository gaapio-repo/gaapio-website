import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FIRM_STRIPE_PRODUCTS, FirmProductId } from "@/constants/firmPlanConfig";

interface FirmProductSelectorProps {
  selectedProduct: string;
  onSelectProduct: (productId: string) => void;
}

export function FirmProductSelector({ selectedProduct, onSelectProduct }: FirmProductSelectorProps) {
  // Order: Small Firm, Technical Accounting, Full Firm, Custom
  const products = [
    FIRM_STRIPE_PRODUCTS.smallFirm,
    FIRM_STRIPE_PRODUCTS.technicalAccounting,
    FIRM_STRIPE_PRODUCTS.fullFirm,
    FIRM_STRIPE_PRODUCTS.contact
  ];

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Choose Your Firm Package</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          All plans include unlimited AI-generated outputs. Scale your team with per-user pricing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const isSelected = selectedProduct === product.id;
          const isPopular = product.popular;
          
          return (
            <div 
              key={product.id}
              className={cn(
                "relative group rounded-2xl transition-all duration-300 cursor-pointer",
                "hover:-translate-y-2 hover:shadow-2xl",
                isPopular 
                  ? "ring-2 ring-primary shadow-xl shadow-primary/10" 
                  : "shadow-lg hover:shadow-xl",
                isSelected && !isPopular && "ring-2 ring-primary",
              )}
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => onSelectProduct(product.id)}
            >
              {/* Card Background */}
              <div className={cn(
                "absolute inset-0 rounded-2xl overflow-hidden",
                "bg-white dark:bg-slate-800",
                "border",
                isPopular ? "border-gray-900" : "border-border/50"
              )}>
                {/* Blue header band */}
                <div className="h-14 bg-gradient-to-r from-[#0099FF] to-[#33ADFF] dark:from-[#0088EE] dark:to-[#0099FF] flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                </div>
              </div>

              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gray-900 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Card Content */}
              <div className="relative p-6 pt-20 flex flex-col h-full">
                {/* Pricing - Fixed height for alignment */}
                <div className="mb-6 text-center h-14 flex flex-col justify-center">
                  <div className="flex items-baseline gap-1 justify-center">
                    <span className="text-3xl font-bold text-foreground">
                      {product.price === null ? "Contact Sales" : formatPrice(product.price)}
                    </span>
                    {product.price !== null && (
                      <span className="text-muted-foreground text-sm">/user/year</span>
                    )}
                  </div>
                </div>
                
                {/* Features - Left aligned */}
                <ul className="space-y-3 flex-grow mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-left">
                      <Check className={cn(
                        "h-4 w-4 mr-2.5 shrink-0 mt-0.5",
                        isPopular ? "text-primary" : "text-primary/80"
                      )} />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button 
                  variant={isPopular ? "default" : isSelected ? "default" : "outline"} 
                  className={cn(
                    "w-full mt-auto font-semibold transition-all",
                    isPopular && "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
                    !isPopular && !isSelected && "hover:bg-primary hover:text-primary-foreground"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product.id);
                  }}
                >
                  {product.id === "contact" 
                    ? "Contact Sales" 
                    : isSelected 
                      ? "Selected" 
                      : "Get Started"
                  }
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
