
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Loader2 } from "lucide-react";

export function UnderConstructionToggle() {
  const { siteConfig, loading, updating, updateUnderConstruction } = useSiteConfig();

  const handleToggle = async (checked: boolean) => {
    await updateUnderConstruction(checked);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium">Under Construction Mode</p>
        <p className="text-sm text-muted-foreground">
          When enabled, visitors will see a "404 - Page Not Found" message instead of the website
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="under-construction"
          checked={siteConfig?.under_construction || false}
          onCheckedChange={handleToggle}
          disabled={updating}
        />
        <Label htmlFor="under-construction" className="flex items-center gap-2">
          {updating && <Loader2 className="h-4 w-4 animate-spin" />}
          {siteConfig?.under_construction ? 'Site is under construction' : 'Site is live'}
        </Label>
      </div>
    </div>
  );
}
