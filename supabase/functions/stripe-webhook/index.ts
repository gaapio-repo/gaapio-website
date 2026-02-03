import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

// Helper logging function
const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

// Map price IDs to plan names
const PRICE_TO_PLAN: Record<string, string> = {
  'price_1RUDyBGPdCCqdZ0PUkG0MU8y': 'research',
  'price_1RUE0DGPdCCqdZ0PJmxGZ7nP': 'core',
  'price_1RUE10GPdCCqdZ0PNfY0MuqR': 'pro',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    // Get required environment variables
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing required environment variables");
    }

    // Initialize clients
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    // deno-lint-ignore no-explicit-any
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    }) as any;

    // Get the raw body and signature
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
      logStep("Webhook verified", { eventId: event.id, type: event.type });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      logStep("Webhook verification failed", { error: message });
      return new Response(JSON.stringify({ error: `Webhook signature verification failed: ${message}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Check idempotency - skip if already processed
    const { data: existingEvent } = await supabase
      .from('stripe_events')
      .select('id, processed')
      .eq('stripe_event_id', event.id)
      .single();

    if (existingEvent?.processed) {
      logStep("Event already processed, skipping", { eventId: event.id });
      return new Response(JSON.stringify({ received: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Record the event for idempotency
    await supabase.from('stripe_events').upsert({
      stripe_event_id: event.id,
      event_type: event.type,
      processed: false,
      payload: event
    });

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(supabase, stripe, session);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(supabase, subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(supabase, subscription);
        break;
      }
      default:
        logStep("Unhandled event type", { type: event.type });
    }

    // Mark event as processed
    await supabase
      .from('stripe_events')
      .update({ processed: true })
      .eq('stripe_event_id', event.id);

    logStep("Event processed successfully", { eventId: event.id });

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

// deno-lint-ignore no-explicit-any
async function handleCheckoutCompleted(
  supabase: any,
  stripe: Stripe,
  session: Stripe.Checkout.Session
) {
  logStep("Processing checkout.session.completed", { sessionId: session.id });

  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const metadata = session.metadata || {};
  const customerEmail = session.customer_email || session.customer_details?.email;

  // Extract metadata
  const firstName = metadata.firstName || '';
  const lastName = metadata.lastName || '';
  const company = metadata.company || '';
  const phone = metadata.phone || '';
  const seats = parseInt(metadata.seats || '1', 10);

  // Get subscription details for plan info
  let plan = 'core';
  if (subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
      plan = PRICE_TO_PLAN[priceId] || 'core';
      logStep("Determined plan from subscription", { priceId, plan });
    } catch (err) {
      logStep("Could not retrieve subscription details", { error: String(err) });
    }
  }

  // 1. Update checkout_intents if exists
  const { data: intentData } = await supabase
    .from('checkout_intents')
    .update({
      status: 'paid',
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      paid_at: new Date().toISOString()
    })
    .eq('stripe_session_id', session.id)
    .select()
    .single();

  if (intentData) {
    logStep("Updated checkout intent to paid", { intentId: intentData.id });
  }

  // 2. Create or update company record
  let companyId: string | null = null;
  
  // Check if company exists by stripe_customer_id
  const { data: existingCompany } = await supabase
    .from('companies')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (existingCompany) {
    companyId = existingCompany.id;
    // Update existing company
    await supabase
      .from('companies')
      .update({
        status: 'active',
        plan: plan,
        user_limit: seats.toString(),
        stripe_subscription_id: subscriptionId,
        updated_at: new Date().toISOString()
      })
      .eq('id', companyId);
    logStep("Updated existing company", { companyId });
  } else {
    // Create new company
    const { data: newCompany, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: company || `${firstName} ${lastName}'s Company`,
        status: 'active',
        plan: plan,
        amount: 0,
        user_limit: seats.toString(),
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId
      })
      .select('id')
      .single();

    if (companyError) {
      logStep("Error creating company", { error: companyError.message });
    } else {
      companyId = newCompany.id;
      logStep("Created new company", { companyId });
    }
  }

  // 3. Create or update user record
  if (customerEmail) {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', customerEmail)
      .single();

    if (existingUser) {
      // Update existing user
      await supabase
        .from('users')
        .update({
          company_id: companyId,
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', existingUser.id);
      logStep("Updated existing user", { userId: existingUser.id });
    } else {
      // Create new user
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: customerEmail,
          first_name: firstName || 'Unknown',
          last_name: lastName || 'User',
          phone: phone || null,
          company_id: companyId,
          status: 'active',
          user_type: 'customer'
        })
        .select('id')
        .single();

      if (userError) {
        logStep("Error creating user", { error: userError.message });
      } else {
        logStep("Created new user", { userId: newUser?.id });
      }
    }
  }

  // 4. Notify CRM with "Paid" status
  try {
    const crmPayload = {
      company: company,
      first_name: firstName,
      last_name: lastName,
      email: customerEmail,
      phone: phone,
      source: 'website',
      status: 'Paid',
      plan: plan,
      seats: seats,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      utm_source: intentData?.utm_source || null,
      utm_medium: intentData?.utm_medium || null,
      utm_campaign: intentData?.utm_campaign || null,
      page_url: intentData?.page_url || null
    };

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const response = await fetch(`${supabaseUrl}/functions/v1/sync-lead-to-crm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`
      },
      body: JSON.stringify(crmPayload)
    });

    if (response.ok) {
      logStep("CRM notified of payment success");
    } else {
      logStep("CRM notification failed", { status: response.status });
    }
  } catch (crmError) {
    logStep("Error notifying CRM", { error: String(crmError) });
  }
}

// deno-lint-ignore no-explicit-any
async function handleSubscriptionUpdated(
  supabase: any,
  subscription: Stripe.Subscription
) {
  logStep("Processing subscription update", { subscriptionId: subscription.id });

  const customerId = subscription.customer as string;
  const status = subscription.status;

  // Update company status based on subscription status
  const companyStatus = status === 'active' ? 'active' : 
                        status === 'past_due' ? 'past_due' : 
                        status === 'canceled' ? 'cancelled' : 'inactive';

  await supabase
    .from('companies')
    .update({ 
      status: companyStatus,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);

  logStep("Updated company status", { customerId, status: companyStatus });
}

// deno-lint-ignore no-explicit-any
async function handleSubscriptionDeleted(
  supabase: any,
  subscription: Stripe.Subscription
) {
  logStep("Processing subscription deletion", { subscriptionId: subscription.id });

  const customerId = subscription.customer as string;

  // Mark company as cancelled
  await supabase
    .from('companies')
    .update({ 
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);

  logStep("Marked company as cancelled", { customerId });
}