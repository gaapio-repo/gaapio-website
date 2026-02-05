import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { SignupSuccess } from "@/components/signup/SignupSuccess";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { FirmProductSelector } from "@/components/signup/FirmProductSelector";
import { FirmContactForm } from "@/components/signup/FirmContactForm";
import { FirmSignupInfoForm, FirmSignupFormData } from "@/components/signup/FirmSignupInfoForm";
import { FIRM_STRIPE_PRODUCTS } from "@/constants/firmPlanConfig";
import { supabase } from "@/integrations/supabase/client";

export default function FirmSignup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<"plan" | "info" | "success">("plan");
  const [selectedPlan, setSelectedPlan] = useState("technicalAccounting");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    
    // For contact plan, go directly to contact form
    if (planId === "contact") {
      setStep("info");
    }
  };

  const handleContinue = () => {
    setStep("info");
  };

  const handleBack = () => {
    if (step === "info") {
      setStep("plan");
    }
  };

  const handleContactFormSuccess = (data: any) => {
    setUserInfo(data);
    setStep("success");
    
    toast({
      title: "Form Submitted",
      description: "Thanks for your interest! Our team will be in touch with you shortly.",
    });
  };

  const handleInfoFormSubmit = async (data: FirmSignupFormData) => {
    setIsLoading(true);
    setUserInfo(data);
    
    try {
      const product = FIRM_STRIPE_PRODUCTS[selectedPlan as keyof typeof FIRM_STRIPE_PRODUCTS];
      
      if (!product?.priceId) {
        throw new Error("Invalid product selected");
      }
      
      // Calculate total price IDs based on user count
      const priceIds = Array(data.userCount).fill(product.priceId);
      
      const { data: checkoutData, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceIds,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
          userEmail: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          phone: data.phone,
          seats: data.userCount,
          plan: selectedPlan,
          termsAccepted: data.termsAccepted,
          termsVersion: data.termsVersion
        }
      });

      if (error) {
        console.error("Checkout error:", error);
        throw new Error(error.message || "Failed to create checkout session");
      }
      
      if (checkoutData?.checkoutUrl) {
        window.open(checkoutData.checkoutUrl, "_blank");
        setStep("success");
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      toast({
        title: "Error creating checkout",
        description: error.message || "An error occurred while setting up payment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleBackToSignup = () => {
    navigate("/signup-select");
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <SEO 
        title="CPA Firm Signup - Gaapio for Accounting Firms"
        description="Choose the right Gaapio package for your CPA firm. Audit Support, Technical Accounting, or Full Firm access."
        canonical="/firm-signup"
        keywords={['CPA firm pricing', 'accounting firm software', 'multi-user discount']}
      />
      <Header />
      <main className="flex-1 pt-32 pb-16">
        <ResponsiveContainer>
          {step === "plan" && (
            <>
              <div className="mb-8">
                <Button variant="ghost" onClick={handleBackToSignup} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Account Selection
                </Button>
              </div>
              
              <FirmProductSelector 
                selectedProduct={selectedPlan} 
                onSelectProduct={handlePlanSelect} 
              />
              
              {selectedPlan && selectedPlan !== "contact" && (
                <div className="mt-8 text-center">
                  <Button size="lg" onClick={handleContinue}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
          
          {step === "info" && selectedPlan === "contact" && (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Custom Firm Pricing</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get in touch with our team to learn more about custom pricing for your firm.
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <FirmContactForm onSuccess={handleContactFormSuccess} />
                
                <div className="mt-6">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Plans
                  </Button>
                </div>
              </div>
            </>
          )}
          
          {step === "info" && selectedPlan !== "contact" && (
            <FirmSignupInfoForm
              selectedProduct={selectedPlan}
              onBack={handleBack}
              onSubmit={handleInfoFormSubmit}
              isLoading={isLoading}
            />
          )}
          
          {step === "success" && (
            <>
              <SignupSuccess
                showFirmContact={selectedPlan === "contact"}
                userInfo={userInfo}
                paymentInfo={null}
                selectedPlan={selectedPlan}
                onHomeClick={handleHomeClick}
              />
              
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={handleBackToSignup}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Signup
                </Button>
              </div>
            </>
          )}
        </ResponsiveContainer>
      </main>
      <Footer />
    </div>
  );
}
