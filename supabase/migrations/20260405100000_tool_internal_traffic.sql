-- Add internal traffic tracking

-- Flag on page views to mark internal traffic
ALTER TABLE public.tool_page_views
  ADD COLUMN IF NOT EXISTS is_internal BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_tool_page_views_is_internal
  ON public.tool_page_views (is_internal);

-- Configurable internal domains per tool (e.g. ["gaapio.com", "partner.com"])
ALTER TABLE public.tool_settings
  ADD COLUMN IF NOT EXISTS internal_domains JSONB NOT NULL DEFAULT '["gaapio.com"]';

-- Also flag email captures as internal
ALTER TABLE public.tool_email_captures
  ADD COLUMN IF NOT EXISTS is_internal BOOLEAN NOT NULL DEFAULT false;
