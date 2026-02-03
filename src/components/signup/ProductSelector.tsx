import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Search, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

// Stripe product configuration
export const STRIPE_PRODUCTS = {
  pro: {
    id: "pro",
    name: "Gaapio Pro",
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
    icon: Star,
    popular: true
  },
  core: {
    id: "core",
    name: "Gaapio Core",
    price: 3000,
    priceId: "price_1Swn4DErMdi9YyI1fcLKGw2D",
    productId: "prod_TucIJkgqpx1dZr",
    description: "Contracts, Memos & Research tools",
    features: [
      "Contract analysis",
      "Accounting analysis & Memo writer",
      "Full Research suite (general search, internal GPT, public filings, Big 4 guides)"
    ],
    icon: Zap,
    popular: false
  },
  research: {
    id: "research",
    name: "Gaapio Research",
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
    icon: Search,
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
    icon: Phone,
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
          const Icon = product.icon;
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
              {/* Card Background with Glassmorphism */}
              <div className={cn(
                "absolute inset-0 rounded-2xl",
                isPopular
                  ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10"
                  : "bg-white/80 dark:bg-slate-800/80",
                "backdrop-blur-sm border",
                isPopular ? "border-primary/30" : "border-border/50"
              )} />

              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Card Content */}
              <div className="relative p-6 flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                  <div className={cn(
                    "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                    isPopular 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                      : "bg-primary/10 dark:bg-primary/20 text-primary"
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.price !== null && (
                      <span className="text-muted-foreground text-sm">/user/year</span>
                    )}
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 flex-grow mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm">
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
