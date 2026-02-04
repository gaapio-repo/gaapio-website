
import { Switch } from "@/components/ui/switch";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Skeleton } from "@/components/ui/skeleton";

export function HomepageCtaToggle() {
  const { siteConfig, loading, updating, updateFeatureToggle } = useSiteConfig();
  
  const handleToggleChange = async (checked: boolean) => {
    await updateFeatureToggle('enable_self_signup', checked);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-6 w-11" />
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <Skeleton className="h-4 w-40 mb-2" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  const enableSelfSignup = siteConfig?.enable_self_signup ?? true;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="font-medium">Enable Self-Signup</p>
          <p className="text-sm text-muted-foreground">
            {enableSelfSignup 
              ? "Users can sign up directly on the website" 
              : "Users must contact sales to get started"}
          </p>
        </div>
        <Switch 
          id="enable-self-signup" 
          checked={enableSelfSignup}
          onCheckedChange={handleToggleChange}
          disabled={updating}
        />
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm font-medium mb-2">Primary homepage button:</p>
        <div className="bg-primary text-primary-foreground rounded px-4 py-2 inline-block">
          {enableSelfSignup ? "Sign Up Now" : "Contact Sales"}
        </div>
      </div>
    </div>
  );
}
