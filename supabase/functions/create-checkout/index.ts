import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Helper logging function
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Validate Stripe key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    logStep("Stripe key verified");

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Get request body
    const { 
      priceIds, 
      successUrl, 
      cancelUrl, 
      userEmail,
      firstName,
      lastName,
      company,
      phone,
      userId,
      companyId
    } = await req.json();

    logStep("Request received", { 
      priceIds, 
      userEmail, 
      firstName, 
      lastName, 
      company,
      successUrl, 
      cancelUrl 
    });

    // Validate required fields
    if (!priceIds || !Array.isArray(priceIds) || priceIds.length === 0) {
      throw new Error("Invalid request: priceIds must be a non-empty array");
    }

    if (!successUrl || !cancelUrl) {
      throw new Error("Invalid request: successUrl and cancelUrl are required");
    }

    // Create line items
    const lineItems = priceIds.map((priceId: string) => ({
      price: priceId,
      quantity: 1,
    }));
    logStep("Line items created", { lineItems });

    // Check for existing Stripe customer or create new one
    let customerId: string | undefined;
    
    if (userEmail) {
      try {
        const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
        
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
          logStep("Found existing customer", { customerId });
          
          // Update customer metadata
          await stripe.customers.update(customerId, {
            metadata: {
              firstName: firstName || '',
              lastName: lastName || '',
              company: company || '',
              phone: phone || '',
              userId: userId || '',
              companyId: companyId || ''
            }
          });
        } else {
          // Create new customer
          const newCustomer = await stripe.customers.create({
            email: userEmail,
            name: `${firstName || ''} ${lastName || ''}`.trim() || undefined,
            metadata: {
              firstName: firstName || '',
              lastName: lastName || '',
              company: company || '',
              phone: phone || '',
              userId: userId || '',
              companyId: companyId || ''
            }
          });
          customerId = newCustomer.id;
          logStep("Created new customer", { customerId });
        }
      } catch (customerError) {
        logStep("Warning: Error managing customer", { error: String(customerError) });
        // Continue without customer ID
      }
    }

    // Create Checkout Session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      customer_email: !customerId && userEmail ? userEmail : undefined,
      line_items: lineItems,
      mode: "subscription",
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      billing_address_collection: "required",
      customer_creation: customerId ? undefined : "always",
      metadata: {
        firstName: firstName || '',
        lastName: lastName || '',
        company: company || '',
        phone: phone || '',
        userId: userId || '',
        companyId: companyId || ''
      }
    };

    logStep("Creating checkout session", { mode: "subscription" });
    const session = await stripe.checkout.sessions.create(sessionParams);
    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(
      JSON.stringify({ checkoutUrl: session.url }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
