import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { SignupSuccess } from "@/components/signup/SignupSuccess";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { FirmProductSelector } from "@/components/signup/FirmProductSelector";
import { FirmContactForm } from "@/components/signup/FirmContactForm";
import { FirmSignupInfoForm, FirmSignupFormData } from "@/components/signup/FirmSignupInfoForm";
import { FIRM_STRIPE_PRODUCTS } from "@/constants/firmPlanConfig";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function FirmSignup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<"plan" | "info" | "success">("plan");
  const [selectedPlan, setSelectedPlan] = useState("fullFirm");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Go directly to info step when a plan is selected
    setStep("info");
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

  const trustBadges = [
    { icon: Shield, label: "Enterprise-Grade Security" },
    { icon: CheckCircle, label: "SOC 2 Type II Ready" },
  ];
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO 
        title="CPA Firm Signup - Gaapio for Accounting Firms"
        description="Choose the right Gaapio package for your CPA firm. Small Firm, Technical Accounting, or Full Firm access."
        canonical="/firm-signup"
        keywords={['CPA firm pricing', 'accounting firm software', 'multi-user discount']}
      />
      <Header />
      
      {step === "plan" && (
        <>
          {/* Hero Section with Brand Gradient */}
          <section className="relative pt-28 pb-6 md:pt-32 md:pb-8 hero-gradient-bg overflow-hidden">
            {/* Decorative blur orbs */}
            <div className="absolute top-0 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
            <div className="absolute bottom-0 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: "1.5s" }} />
            
            <ResponsiveContainer className="relative z-10">
              <div className="text-center animate-fade-in">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  <span className="text-foreground">Multiply</span> Your Firm's Capacity
                </h1>
                <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto">
                  Choose the package that fits your firm. Built by Big 4 CPAs for modern accounting workflows.
                </p>
              </div>
            </ResponsiveContainer>
          </section>

          {/* Main Content Section */}
          <main className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-muted via-blue-50/40 to-muted dark:from-background dark:via-background dark:to-background pointer-events-none" />
            
            <div className="relative z-10 pt-2 pb-8 md:pt-4 md:pb-10">
              <ResponsiveContainer>
                <div className="mx-auto max-w-6xl">
                  <ErrorBoundary fallback={
                    <div className="p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-md my-4">
                      <p className="text-red-500 dark:text-red-400">An error occurred loading this section. Please try refreshing the page.</p>
                      <Button onClick={() => window.location.reload()} variant="outline" className="mt-2">Refresh Page</Button>
                    </div>
                  }>
                    <FirmProductSelector 
                      selectedProduct={selectedPlan} 
                      onSelectProduct={handlePlanSelect} 
                    />
                  </ErrorBoundary>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {trustBadges.map((badge, index) => (
                      <div 
                        key={badge.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm"
                        style={{ animationDelay: `${0.1 * index}s` }}
                      >
                        <badge.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ResponsiveContainer>
            </div>
          </main>

          {/* Customer Logos */}
          <TrustBarSection />
        </>
      )}
      
      {step === "info" && selectedPlan === "contact" && (
        <main className="flex-1 pt-32 pb-16">
          <ResponsiveContainer>
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
          </ResponsiveContainer>
        </main>
      )}
      
      {step === "info" && selectedPlan !== "contact" && (
        <main className="flex-1 pt-32 pb-16">
          <ResponsiveContainer>
            <FirmSignupInfoForm
              selectedProduct={selectedPlan}
              onBack={handleBack}
              onSubmit={handleInfoFormSubmit}
              isLoading={isLoading}
            />
          </ResponsiveContainer>
        </main>
      )}
      
      {step === "success" && (
        <main className="flex-1 pt-32 pb-16">
          <ResponsiveContainer>
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
          </ResponsiveContainer>
        </main>
      )}

      <Footer />
    </div>
  );
}
