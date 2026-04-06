-- Tool settings: per-tool configuration for public-facing tools
CREATE TABLE IF NOT EXISTS public.tool_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug TEXT UNIQUE NOT NULL,
  tool_name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  require_email BOOLEAN NOT NULL DEFAULT false,
  email_gate_hard BOOLEAN NOT NULL DEFAULT false,
  email_gate_page_threshold INTEGER NOT NULL DEFAULT 3,
  base_route TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed with SEC Comment Letters tool
INSERT INTO public.tool_settings (tool_slug, tool_name, description, base_route)
VALUES (
  'sec-comment-letters',
  'SEC Comment Letters',
  'Browse and search SEC comment letters organized by accounting topic',
  '/comment-letters'
) ON CONFLICT (tool_slug) DO NOTHING;

-- Tool page views: visitor tracking for each tool
CREATE TABLE IF NOT EXISTS public.tool_page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug TEXT NOT NULL,
  page_path TEXT NOT NULL,
  session_id TEXT,
  page_number_in_session INTEGER DEFAULT 1,
  ab_variant_id UUID,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  user_agent TEXT,
  country_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tool_page_views_slug_created ON public.tool_page_views (tool_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tool_page_views_page_path ON public.tool_page_views (page_path);
CREATE INDEX IF NOT EXISTS idx_tool_page_views_session ON public.tool_page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_tool_page_views_ab_variant ON public.tool_page_views (ab_variant_id);

-- Tool email captures: emails collected via gate or coming-soon signups
CREATE TABLE IF NOT EXISTS public.tool_email_captures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug TEXT NOT NULL,
  email TEXT NOT NULL,
  page_path TEXT,
  ab_variant_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tool_email_captures_slug_created ON public.tool_email_captures (tool_slug, created_at DESC);

-- Tool A/B tests: email gate configuration experiments
CREATE TABLE IF NOT EXISTS public.tool_ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug TEXT NOT NULL,
  test_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  traffic_split INTEGER NOT NULL DEFAULT 50,
  variant_a_config JSONB NOT NULL DEFAULT '{}',
  variant_b_config JSONB NOT NULL DEFAULT '{}',
  winner TEXT,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tool_ab_tests_slug_status ON public.tool_ab_tests (tool_slug, status);

-- RLS policies

ALTER TABLE public.tool_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_email_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_ab_tests ENABLE ROW LEVEL SECURITY;

-- tool_settings: anon can read, admin can do everything
DROP POLICY IF EXISTS "Anyone can read tool settings" ON public.tool_settings;
CREATE POLICY "Anyone can read tool settings"
  ON public.tool_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admins can manage tool settings" ON public.tool_settings;
CREATE POLICY "Admins can manage tool settings"
  ON public.tool_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- tool_page_views: anon can insert, admin can read
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.tool_page_views;
CREATE POLICY "Anyone can insert page views"
  ON public.tool_page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can read page views" ON public.tool_page_views;
CREATE POLICY "Admins can read page views"
  ON public.tool_page_views FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- tool_email_captures: anon can insert, admin can read
DROP POLICY IF EXISTS "Anyone can insert email captures" ON public.tool_email_captures;
CREATE POLICY "Anyone can insert email captures"
  ON public.tool_email_captures FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can read email captures" ON public.tool_email_captures;
CREATE POLICY "Admins can read email captures"
  ON public.tool_email_captures FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- tool_ab_tests: anon can read (for variant assignment), admin can manage
DROP POLICY IF EXISTS "Anyone can read AB tests" ON public.tool_ab_tests;
CREATE POLICY "Anyone can read AB tests"
  ON public.tool_ab_tests FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admins can manage AB tests" ON public.tool_ab_tests;
CREATE POLICY "Admins can manage AB tests"
  ON public.tool_ab_tests FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_tool_settings_updated_at ON public.tool_settings;
CREATE TRIGGER update_tool_settings_updated_at
  BEFORE UPDATE ON public.tool_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_tool_ab_tests_updated_at ON public.tool_ab_tests;
CREATE TRIGGER update_tool_ab_tests_updated_at
  BEFORE UPDATE ON public.tool_ab_tests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
