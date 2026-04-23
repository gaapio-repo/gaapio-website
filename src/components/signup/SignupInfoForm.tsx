import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { STRIPE_PRODUCTS } from "./ProductSelector";
import { ArrowLeft, Loader2, Users, Check, Shield, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SignupInfoFormProps {
  selectedProduct: string;
  onBack: () => void;
  onSubmit: (data: SignupFormData) => void;
  isLoading: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  userCount: number;
  termsAccepted: boolean;
}

export function SignupInfoForm({ selectedProduct, onBack, onSubmit, isLoading }: SignupInfoFormProps) {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    userCount: 1,
    termsAccepted: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});

  const product = STRIPE_PRODUCTS[selectedProduct as keyof typeof STRIPE_PRODUCTS];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignupFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (formData.userCount < 1) {
      newErrors.userCount = "At least 1 user is required";
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof SignupFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleUserCountChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userCount: parseInt(value, 10) }));
    if (errors.userCount) {
      setErrors((prev) => ({ ...prev, userCount: undefined }));
    }
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "Contact Sales";
    return `$${price.toLocaleString()}`;
  };

  const calculateTotal = () => {
    if (!product?.price) return "Contact Sales";
    const total = product.price * formData.userCount;
    return `$${total.toLocaleString()}/year`;
  };

  // Generate user count options (1-50, then 50+)
  const userCountOptions = [
    ...Array.from({ length: 20 }, (_, i) => i + 1),
  ];

  const steps = [
    { label: "Plan", completed: true },
    { label: "Details", completed: false, active: true },
    { label: "Payment", completed: false },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all",
              step.completed 
                ? "bg-primary text-primary-foreground" 
                : step.active 
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20" 
                  : "bg-muted text-muted-foreground"
            )}>
              {step.completed ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span className={cn(
              "ml-2 text-sm font-medium",
              step.active ? "text-foreground" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-12 h-0.5 mx-4",
                step.completed ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>

      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-6"
        disabled={isLoading}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Plans
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-border/50 bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Complete Your Signup</CardTitle>
              <p className="text-muted-foreground">
                Enter your details to continue to payment
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* User Count Selection */}
                <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <Label htmlFor="userCount" className="text-base font-semibold">Number of Users</Label>
                  </div>
                  <Select 
                    value={formData.userCount.toString()} 
                    onValueChange={handleUserCountChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Select number of users" />
                    </SelectTrigger>
                    <SelectContent>
                      {userCountOptions.map((count) => (
                        <SelectItem key={count} value={count.toString()}>
                          {count} {count === 1 ? "user" : "users"}
                        </SelectItem>
                      ))}
                      <SelectItem value="25">25 users</SelectItem>
                      <SelectItem value="30">30 users</SelectItem>
                      <SelectItem value="40">40 users</SelectItem>
                      <SelectItem value="50">50 users</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.userCount && (
                    <p className="text-sm text-destructive">{errors.userCount}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                      placeholder="John"
                      disabled={isLoading}
                      className={cn(
                        "bg-background",
                        errors.firstName && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                      placeholder="Doe"
                      disabled={isLoading}
                      className={cn(
                        "bg-background",
                        errors.lastName && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={handleChange("company")}
                    placeholder="Acme Inc."
                    disabled={isLoading}
                    className={cn(
                      "bg-background",
                      errors.company && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {errors.company && (
                    <p className="text-sm text-destructive">{errors.company}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    placeholder="john@company.com"
                    disabled={isLoading}
                    className={cn(
                      "bg-background",
                      errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    placeholder="(555) 123-4567"
                    disabled={isLoading}
                    className="bg-background"
                  />
                </div>

                {/* Terms Acceptance Checkbox */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({ ...prev, termsAccepted: checked === true }));
                        if (errors.termsAccepted) {
                          setErrors((prev) => ({ ...prev, termsAccepted: undefined }));
                        }
                      }}
                      disabled={isLoading}
                      className={cn(
                        "!h-[18px] !w-[18px] !min-h-[18px] !min-w-[18px] shrink-0 aspect-square rounded-[3px]",
                        errors.termsAccepted && "border-destructive"
                      )}
                    />
                    <Label 
                      htmlFor="termsAccepted" 
                      className={cn(
                        "text-sm font-normal leading-relaxed cursor-pointer",
                        errors.termsAccepted && "text-destructive"
                      )}
                    >
                      I have read and agree to the{" "}
                      <a 
                        href="https://gaapio.com/ssa" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Subscription Service Agreement
                      </a>
                    </Label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-sm text-destructive pl-7">{errors.termsAccepted}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-4 h-12 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all" 
                  size="lg"
                  disabled={isLoading || !formData.termsAccepted}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Continue to Payment — {calculateTotal()}</>
                  )}
                </Button>

                {/* Trust Elements */}
                <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>Powered by Stripe</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="shadow-xl border-border/50 bg-background/80 backdrop-blur-sm sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product Info */}
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <h4 className="font-semibold text-primary text-lg">{product?.name}</h4>
                    <p className="text-sm text-muted-foreground">{product?.description}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per user</span>
                  <span className="text-foreground">{formatPrice(product?.price ?? null)}/year</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Users</span>
                  <span className="text-foreground">× {formData.userCount}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">{calculateTotal()}</span>
                </div>
              </div>

              {/* Features Preview */}
              <div className="pt-4 border-t border-border">
                <h5 className="text-sm font-medium text-foreground mb-3 text-left">What's included:</h5>
                <ul className="space-y-2 text-left">
                  {product?.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-left">
                      <Check className="h-4 w-4 text-primary mr-2 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
