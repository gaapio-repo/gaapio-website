import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  const products = Object.values(STRIPE_PRODUCTS);

  const formatPrice = (price: number | null) => {
    if (price === null) return "Contact Sales";
    return `$${price.toLocaleString()}/year`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground">Select the plan that best fits your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const Icon = product.icon;
          const isSelected = selectedProduct === product.id;
          
          return (
            <Card 
              key={product.id} 
              className={cn(
                "cursor-pointer transition-all h-full flex flex-col relative",
                isSelected 
                  ? "border-primary shadow-lg ring-2 ring-primary/20" 
                  : "hover:border-primary/50 hover:shadow-md",
                product.popular && "border-primary/50"
              )}
              onClick={() => onSelectProduct(product.id)}
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "p-2 rounded-full",
                    isSelected 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </div>
                
                <div className="mt-2">
                  <span className="text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  {product.description}
                </p>
              </CardHeader>
              
              <CardContent className="flex-grow pt-0">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-primary mr-2 shrink-0 mt-0.5" />
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="mt-auto pt-4">
                <Button 
                  variant={isSelected ? "default" : "outline"} 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product.id);
                  }}
                >
                  {product.id === "contact" 
                    ? "Contact Sales" 
                    : isSelected 
                      ? "Selected" 
                      : "Select Plan"
                  }
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
