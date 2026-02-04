
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Skeleton } from "@/components/ui/skeleton";

interface FeatureToggle {
  id: 'enable_customer_logos' | 'enable_testimonials' | 'enable_pricing' | 'enable_footer_logos';
  name: string;
  description: string;
}

const featureToggles: FeatureToggle[] = [
  {
    id: "enable_customer_logos",
    name: "Customer Logos Section",
    description: "Show or hide the customer logos section on the homepage"
  },
  {
    id: "enable_testimonials",
    name: "Testimonials Section",
    description: "Show or hide the testimonials section on the homepage"
  },
  {
    id: "enable_pricing",
    name: "Pricing Section",
    description: "Show or hide the pricing section on the homepage"
  },
  {
    id: "enable_footer_logos",
    name: "Footer Logos",
    description: "Show or hide partner logos in the footer"
  }
];

export function FeatureToggles() {
  const { siteConfig, loading, updating, updateFeatureToggle } = useSiteConfig();

  const handleToggleChange = async (id: FeatureToggle['id'], checked: boolean) => {
    await updateFeatureToggle(id, checked);
  };

  if (loading) {
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-11" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

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
                checked={siteConfig?.[toggle.id] ?? true}
                onCheckedChange={(checked) => handleToggleChange(toggle.id, checked)}
                disabled={updating}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
