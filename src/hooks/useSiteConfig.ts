
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SiteConfig {
  id: string;
  under_construction: boolean;
  enable_self_signup: boolean;
  enable_customer_logos: boolean;
  enable_testimonials: boolean;
  enable_pricing: boolean;
  enable_footer_logos: boolean;
  created_at: string;
  updated_at: string;
}

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  const fetchSiteConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching site config:', error);
        return;
      }

      setSiteConfig(data as SiteConfig);
    } catch (error) {
      console.error('Error fetching site config:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUnderConstruction = async (underConstruction: boolean) => {
    if (!siteConfig) return false;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('site_config')
        .update({ under_construction: underConstruction })
        .eq('id', siteConfig.id);

      if (error) {
        console.error('Error updating site config:', error);
        toast({
          title: "Error",
          description: "Failed to update construction mode",
          variant: "destructive",
        });
        return false;
      }

      setSiteConfig(prev => prev ? { ...prev, under_construction: underConstruction } : null);
      toast({
        title: "Success",
        description: `Construction mode ${underConstruction ? 'enabled' : 'disabled'}`,
      });
      return true;
    } catch (error) {
      console.error('Error updating site config:', error);
      toast({
        title: "Error",
        description: "Failed to update construction mode",
        variant: "destructive",
      });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const updateFeatureToggle = async (field: keyof Pick<SiteConfig, 'enable_self_signup' | 'enable_customer_logos' | 'enable_testimonials' | 'enable_pricing' | 'enable_footer_logos'>, value: boolean) => {
    if (!siteConfig) return false;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('site_config')
        .update({ [field]: value })
        .eq('id', siteConfig.id);

      if (error) {
        console.error('Error updating site config:', error);
        toast({
          title: "Error",
          description: "Failed to update setting",
          variant: "destructive",
        });
        return false;
      }

      setSiteConfig(prev => prev ? { ...prev, [field]: value } : null);
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating site config:', error);
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchSiteConfig();
  }, []);

  return {
    siteConfig,
    loading,
    updating,
    updateUnderConstruction,
    updateFeatureToggle,
    refetch: fetchSiteConfig,
  };
}
