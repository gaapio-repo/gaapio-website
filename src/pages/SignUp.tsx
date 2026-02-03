import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useToast } from "@/components/ui/use-toast";
import { ProductSelector, STRIPE_PRODUCTS } from "@/components/signup/ProductSelector";
import { SignupInfoForm, SignupFormData } from "@/components/signup/SignupInfoForm";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle } from "lucide-react";
import { TrustBarSection } from "@/components/home/TrustBarSection";

export default function SignUp() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<"select" | "info">("select");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Handle product selection
  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    
    // If "Contact Sales" is selected, redirect to contact page
    if (productId === "contact") {
      navigate("/contact");
      return;
    }
    
    // Otherwise, move to the info form step
    setCurrentStep("info");
  };

  // Handle form submission and Stripe checkout
  const handleFormSubmit = async (formData: SignupFormData) => {
    setIsLoading(true);

    try {
      const product = STRIPE_PRODUCTS[selectedProduct as keyof typeof STRIPE_PRODUCTS];
      
      if (!product || !product.priceId) {
        throw new Error("Invalid product selected");
      }

      console.log("Creating checkout session for:", product.name);
      console.log("Price ID:", product.priceId);
      console.log("User data:", formData);

      // Call the create-checkout edge function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceIds: [product.priceId],
          quantity: formData.userCount,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
          userEmail: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company,
          phone: formData.phone,
          userCount: formData.userCount
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to create checkout session");
      }

      if (data?.checkoutUrl) {
        console.log("Redirecting to Stripe checkout:", data.checkoutUrl);
        // Open in new tab to avoid iframe navigation issues
        window.open(data.checkoutUrl, "_blank");
        setIsLoading(false);
        return;
      } else {
        console.error("No checkout URL returned:", data);
        throw new Error("No checkout URL returned from server");
      }
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false); // Only reset on error
    }
  };

  // Go back to product selection
  const handleBack = () => {
    setCurrentStep("select");
    setSelectedProduct("");
  };

  const trustBadges = [
    { icon: Shield, label: "Enterprise-Grade Security" },
    { icon: CheckCircle, label: "SOC 2 Type II Ready" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      {/* Hero Section with Brand Gradient */}
      <section className="relative pt-28 pb-6 md:pt-32 md:pb-8 hero-gradient-bg overflow-hidden">
        {/* Decorative blur orbs */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: "1.5s" }} />
        
        <ResponsiveContainer className="relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gray-900">Simplify</span> Your Technical Accounting Journey
            </h1>
            <p className="text-lg md:text-xl text-gray-900 max-w-2xl mx-auto">
              Choose the plan that fits your team. Built by Big 4 CPAs for modern accounting workflows.
            </p>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Main Content Section with Light Blue-Gray Gradient */}
      <main className="flex-1 relative">
        {/* Gradient background for pricing section */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-800/40 dark:to-slate-900 pointer-events-none" />
        
        <div className="relative z-10 pt-2 pb-8 md:pt-4 md:pb-10">
          <ResponsiveContainer>
            <div className="mx-auto max-w-6xl">
              <ErrorBoundary fallback={
                <div className="p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-md my-4">
                  <p className="text-red-500 dark:text-red-400">An error occurred loading this section. Please try refreshing the page or contact support.</p>
                  <Button onClick={() => window.location.reload()} variant="outline" className="mt-2">Refresh Page</Button>
                </div>
              }>
                {currentStep === "select" ? (
                  <ProductSelector
                    selectedProduct={selectedProduct}
                    onSelectProduct={handleProductSelect}
                  />
                ) : (
                  <SignupInfoForm
                    selectedProduct={selectedProduct}
                    onBack={handleBack}
                    onSubmit={handleFormSubmit}
                    isLoading={isLoading}
                  />
                )}
              </ErrorBoundary>
            </div>

            {/* Trust Bar - Only show on selection step */}
            {currentStep === "select" && (
              <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                  {trustBadges.map((badge, index) => (
                    <div 
                      key={badge.label}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-border/50 shadow-sm"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <badge.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </main>

      {/* Customer Logos Section */}
      <TrustBarSection />

      <Footer />
    </div>
  );
}
