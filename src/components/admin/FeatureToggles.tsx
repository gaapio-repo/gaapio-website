
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Skeleton } from "@/components/ui/skeleton";

interface FeatureToggle {
  id: 'enable_customer_logos' | 'enable_testimonials' | 'enable_footer_logos';
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
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-6 w-11" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-left">
      <thead>
        <tr className="border-b text-left text-muted-foreground">
          <th className="pb-2 font-medium">Feature</th>
          <th className="pb-2 font-medium">Description</th>
          <th className="pb-2 font-medium text-right">Enabled</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {featureToggles.map((toggle) => (
          <tr key={toggle.id}>
            <td className="py-2.5 font-medium">
              <Label htmlFor={toggle.id}>{toggle.name}</Label>
            </td>
            <td className="py-2.5 text-muted-foreground">{toggle.description}</td>
            <td className="py-2.5 text-right">
              <Switch
                id={toggle.id}
                checked={siteConfig?.[toggle.id] ?? true}
                onCheckedChange={(checked) => handleToggleChange(toggle.id, checked)}
                disabled={updating}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
