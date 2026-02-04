-- Add feature toggle columns to site_config table
ALTER TABLE public.site_config 
ADD COLUMN IF NOT EXISTS enable_self_signup boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_customer_logos boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_testimonials boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_pricing boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_footer_logos boolean NOT NULL DEFAULT true;