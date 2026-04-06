-- Add terms acceptance tracking to checkout_intents table
ALTER TABLE public.checkout_intents 
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS terms_version TEXT DEFAULT '1.0',
ADD COLUMN IF NOT EXISTS ip_address TEXT;