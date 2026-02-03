import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Stripe product configuration
export const STRIPE_PRODUCTS = {
  pro: {
    id: "pro",
    name: "Pro",
    price: 3600,
    priceId: "price_1Swn5jErMdi9YyI1bOirPgfH",
    productId: "prod_TucKE8DFzL07Ud",
    description: "SOX controls, Disclosures, Contracts, Memos & Research",
    features: [
      "SOX controls module",
      "Footnote Disclosure analysis",
      "Contract analysis",
      "Accounting analysis & Memo writer",
      "Full Research suite (general search, internal GPT, public filings, Big 4 guides)",
      "SSO included (minimum 5 users)"
    ],
    popular: true
  },
  core: {
    id: "core",
    name: "Core",
    price: 3000,
    priceId: "price_1Swn4DErMdi9YyI1fcLKGw2D",
    productId: "prod_TucIJkgqpx1dZr",
    description: "Contracts, Memos & Research tools",
    features: [
      "Contract analysis",
      "Accounting analysis & Memo writer",
      "Full Research suite (general search, internal GPT, public filings, Big 4 guides)"
    ],
    popular: false
  },
  research: {
    id: "research",
    name: "Research",
    price: 1500,
    priceId: "price_1Swn0EErMdi9YyI17uhbXifO",
    productId: "prod_TucESMuhI341UH",
    description: "Accounting research tool",
    features: [
      "General search",
      "Internal GPT",
      "Public filings search",
      "Big 4 guides search"
    ],
    popular: false
  },
  contact: {
    id: "contact",
    name: "Enterprise / High Volume",
    price: null,
    priceId: null,
    productId: null,
    description: "Custom pricing for larger teams",
    features: [
      "Custom user limits",
      "Volume discounts",
      "Dedicated support",
      "Custom integrations"
    ],
    popular: false
  }
};

export type ProductId = keyof typeof STRIPE_PRODUCTS;

interface ProductSelectorProps {
  selectedProduct: string;
  onSelectProduct: (productId: string) => void;
}

export function ProductSelector({ selectedProduct, onSelectProduct }: ProductSelectorProps) {
  // Order: Research, Core, Pro, Enterprise
  const products = [
    STRIPE_PRODUCTS.research,
    STRIPE_PRODUCTS.core,
    STRIPE_PRODUCTS.pro,
    STRIPE_PRODUCTS.contact
  ];

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Choose Your Plan</h2>
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
