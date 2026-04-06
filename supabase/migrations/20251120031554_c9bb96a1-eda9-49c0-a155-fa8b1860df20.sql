-- Add company column to demo_requests table
ALTER TABLE public.demo_requests 
ADD COLUMN IF NOT EXISTS company TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.demo_requests.company IS 'Company name of the demo requestor';