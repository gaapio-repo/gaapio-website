
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export function FeatureToggles() {
  const [featureToggles, setFeatureToggles] = useState<FeatureToggle[]>([
    {
      id: "customer-logos",
      name: "Customer Logos Section",
      description: "Show or hide the customer logos section on the homepage",
      enabled: true
    },
    {
      id: "testimonials",
      name: "Testimonials Section",
      description: "Show or hide the testimonials section on the homepage",
      enabled: true
    },
    {
      id: "pricing",
      name: "Pricing Section",
      description: "Show or hide the pricing section on the homepage",
      enabled: true
    },
    {
      id: "footer-logos",
      name: "Footer Logos",
      description: "Show or hide partner logos in the footer",
      enabled: true
    }
  ]);

  // Load saved toggle states
  useEffect(() => {
    const savedToggles = localStorage.getItem("featureToggles");
    if (savedToggles) {
      setFeatureToggles(JSON.parse(savedToggles));
    }
  }, []);

  // Save toggle states when changed
  useEffect(() => {
    localStorage.setItem("featureToggles", JSON.stringify(featureToggles));
  }, [featureToggles]);

  const handleToggleChange = (id: string, checked: boolean) => {
    const updatedToggles = featureToggles.map((toggle) =>
      toggle.id === id ? { ...toggle, enabled: checked } : toggle
    );
    setFeatureToggles(updatedToggles);
    
    // Trigger storage event for other tabs/windows
    localStorage.setItem("featureToggles", JSON.stringify(updatedToggles));
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'featureToggles',
      newValue: JSON.stringify(updatedToggles)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Toggles</CardTitle>
        <CardDescription>
          Enable or disable features on your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {featureToggles.map((toggle) => (
            <div key={toggle.id} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor={toggle.id}>{toggle.name}</Label>
                <p className="text-sm text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
              <Switch
                id={toggle.id}
                checked={toggle.enabled}
                onCheckedChange={(checked) => handleToggleChange(toggle.id, checked)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
