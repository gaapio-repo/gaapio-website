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
        window.location.href = data.checkoutUrl;
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
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to product selection
  const handleBack = () => {
    setCurrentStep("select");
    setSelectedProduct("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16">
        <ResponsiveContainer>
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sign Up for Gaapio</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with AI-powered technical accounting.
            </p>
          </div>

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
        </ResponsiveContainer>
      </main>
      <Footer />
    </div>
  );
}
