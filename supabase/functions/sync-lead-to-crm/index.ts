import { corsHeaders } from '../_shared/cors.ts';

const CRM_WEBHOOK_URL = 'https://mfsfgmhfavwwqfmtcckb.supabase.co/functions/v1/website-lead-webhook';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData = await req.json();
    console.log('Received lead data:', { 
      ...leadData, 
      email: leadData.email?.substring(0, 3) + '***',
      status: leadData.status 
    });

    // Get the API key from environment variables
    const apiKey = Deno.env.get('WEBSITE_LEAD_API_KEY');
    if (!apiKey) {
      console.error('WEBSITE_LEAD_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'CRM integration not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Transform data to match CRM webhook expected format
    // Extended payload now includes checkout status, Stripe IDs, and UTM data
    const crmPayload: Record<string, any> = {
      company_name: leadData.company,
      domain: null,
      website: null,
      first_name: leadData.first_name || leadData.firstName,
      last_name: leadData.last_name || leadData.lastName,
      email: leadData.email,
      phone: leadData.phone,
      notes: leadData.notes,
      source: leadData.source || 'website',
      // New fields for checkout flow
      status: leadData.status || null, // 'Checkout Started', 'Paid', 'Cancelled'
      plan: leadData.plan || null,
      seats: leadData.seats || null,
      stripe_customer_id: leadData.stripe_customer_id || null,
      stripe_subscription_id: leadData.stripe_subscription_id || null,
      // UTM tracking
      utm_source: leadData.utm_source || null,
      utm_medium: leadData.utm_medium || null,
      utm_campaign: leadData.utm_campaign || null,
      page_url: leadData.page_url || null
    };

    // Remove null values to keep payload clean
    Object.keys(crmPayload).forEach(key => {
      if (crmPayload[key] === null) {
        delete crmPayload[key];
      }
    });

    console.log('Sending to CRM:', { 
      ...crmPayload, 
      email: crmPayload.email?.substring(0, 3) + '***' 
    });

    // Forward to CRM webhook
    const response = await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(crmPayload)
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('CRM webhook failed:', response.status, responseText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to sync to CRM', 
          details: responseText,
          status: response.status 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = responseText ? JSON.parse(responseText) : {};
    console.log('Successfully synced to CRM:', result);

    return new Response(
      JSON.stringify({ success: true, result }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sync-lead-to-crm:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
