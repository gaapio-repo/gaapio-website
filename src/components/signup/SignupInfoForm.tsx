import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STRIPE_PRODUCTS } from "./ProductSelector";
import { ArrowLeft, Loader2, Users } from "lucide-react";

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
}

export function SignupInfoForm({ selectedProduct, onBack, onSubmit, isLoading }: SignupInfoFormProps) {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    userCount: 1
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

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-6"
        disabled={isLoading}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Plans
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Complete Your Signup</CardTitle>
          <CardDescription>
            You selected <strong>{product?.name}</strong> at <strong>{formatPrice(product?.price ?? null)}</strong> per user/year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Count Selection */}
            <div className="p-4 bg-muted/50 rounded-lg border space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <Label htmlFor="userCount" className="text-base font-medium">Number of Users *</Label>
              </div>
              <Select 
                value={formData.userCount.toString()} 
                onValueChange={handleUserCountChange}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
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
              
              {/* Price Summary */}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  {formData.userCount} {formData.userCount === 1 ? "user" : "users"} × {formatPrice(product?.price ?? null)}
                </span>
                <span className="text-lg font-bold text-primary">
                  {calculateTotal()}
                </span>
              </div>
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
                  className={errors.firstName ? "border-destructive" : ""}
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
                  className={errors.lastName ? "border-destructive" : ""}
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
                className={errors.company ? "border-destructive" : ""}
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
                className={errors.email ? "border-destructive" : ""}
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
              />
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Continue to Payment — {calculateTotal()}</>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              You'll be redirected to Stripe to complete your payment securely.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
