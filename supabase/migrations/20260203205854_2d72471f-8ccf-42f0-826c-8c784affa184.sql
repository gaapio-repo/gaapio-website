-- Create checkout_intents table to track checkout attempts
CREATE TABLE public.checkout_intents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  phone TEXT,
  plan TEXT NOT NULL,
  seats INTEGER DEFAULT 1,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  page_url TEXT,
  status TEXT NOT NULL DEFAULT 'intent',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Create stripe_events table for webhook idempotency
CREATE TABLE public.stripe_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT false,
  payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_checkout_intents_email ON public.checkout_intents(email);
CREATE INDEX idx_checkout_intents_stripe_session_id ON public.checkout_intents(stripe_session_id);
CREATE INDEX idx_checkout_intents_status ON public.checkout_intents(status);
CREATE INDEX idx_stripe_events_stripe_event_id ON public.stripe_events(stripe_event_id);

-- Add trigger for updated_at on checkout_intents
CREATE OR REPLACE FUNCTION public.update_checkout_intents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_checkout_intents_updated_at
BEFORE UPDATE ON public.checkout_intents
FOR EACH ROW
EXECUTE FUNCTION public.update_checkout_intents_updated_at();

-- Enable RLS on both tables
ALTER TABLE public.checkout_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;

-- RLS policies for checkout_intents - only admins can view
CREATE POLICY "Admins can view checkout intents"
ON public.checkout_intents
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage checkout intents"
ON public.checkout_intents
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for stripe_events - only admins can view
CREATE POLICY "Admins can view stripe events"
ON public.stripe_events
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage stripe events"
ON public.stripe_events
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));