
-- Create a table for site configuration
CREATE TABLE IF NOT EXISTS public.site_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  under_construction BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial configuration row (idempotent)
INSERT INTO public.site_config (under_construction)
SELECT false
WHERE NOT EXISTS (SELECT 1 FROM public.site_config LIMIT 1);

-- Add trigger to update the updated_at column
CREATE OR REPLACE FUNCTION public.update_site_config_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS update_site_config_updated_at ON public.site_config;
CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON public.site_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_site_config_updated_at();

-- Add Row Level Security (RLS) - only admins can modify
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Policy for reading site config (anyone can read)
DROP POLICY IF EXISTS "Anyone can view site config" ON public.site_config;
CREATE POLICY "Anyone can view site config" 
  ON public.site_config 
  FOR SELECT 
  USING (true);

-- Policy for updating site config (only admins)
DROP POLICY IF EXISTS "Only admins can update site config" ON public.site_config;
CREATE POLICY "Only admins can update site config" 
  ON public.site_config 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
