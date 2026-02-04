-- Add stripe_subscription_id column to companies table
ALTER TABLE public.companies
ADD COLUMN IF NOT EXISTS stripe_subscription_id text;