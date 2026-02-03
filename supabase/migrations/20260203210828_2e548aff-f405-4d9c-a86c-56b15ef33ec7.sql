-- Add terms acceptance tracking to checkout_intents table
ALTER TABLE public.checkout_intents 
ADD COLUMN terms_accepted BOOLEAN DEFAULT false,
ADD COLUMN terms_accepted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN terms_version TEXT DEFAULT '1.0',
ADD COLUMN ip_address TEXT;