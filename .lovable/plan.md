

# Webhook-Driven Signup Flow Implementation Plan

## Overview

This plan implements a reliable, webhook-driven flow for the signup process with two key trigger points:

1. **Checkout Intent** - When user submits the signup form (before Stripe)
2. **Payment Success** - When Stripe confirms payment via webhook

---

## Current State Analysis

### What Exists Today
- **Signup Flow**: User selects plan -> fills form -> redirected to Stripe checkout
- **CRM Integration**: `sync-lead-to-crm` edge function already pushes to your CRM (DRCR) via `WEBSITE_LEAD_API_KEY`
- **Stripe Checkout**: `create-checkout` creates Stripe sessions with customer metadata
- **Webhook Outbox**: Database table + `queue-webhook`/`process-webhooks` functions for reliable delivery
- **No Stripe Webhook Handler**: Currently missing - payment success relies on redirect page only

### What's Missing
1. CRM notification on "checkout started" (intent to buy)
2. Stripe webhook handler for payment success events
3. Product provisioning logic (organization creation, seat limits, tier assignment)
4. Database tracking for checkout intents and conversions

---

## Implementation Architecture

```text
                           CHECKOUT STARTED FLOW
+------------------+     +---------------------+     +------------------+
|  Signup Form     | --> | create-checkout     | --> | sync-lead-to-crm |
|  (Submit Click)  |     | (Edge Function)     |     | (status: Intent) |
+------------------+     +---------------------+     +------------------+
                                   |
                                   v
                         +--------------------+
                         | Stripe Checkout    |
                         +--------------------+
                                   |
                           PAYMENT SUCCESS FLOW
                                   v
+------------------+     +---------------------+     +------------------+
|  Stripe Webhook  | --> | stripe-webhook      | --> | sync-lead-to-crm |
|  (payment event) |     | (Edge Function)     |     | (status: Paid)   |
+------------------+     +---------------------+     +------------------+
                                   |
                                   v
                         +--------------------+
                         | Product Provision  |
                         | (DB: companies,    |
                         |  users, status)    |
                         +--------------------+
```

---

## Detailed Implementation Steps

### Step 1: Database Schema Updates

Add tracking tables for checkout intents and conversions:

**New Table: `checkout_intents`**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| stripe_session_id | text | Stripe checkout session ID |
| email | text | User email |
| first_name | text | User first name |
| last_name | text | User last name |
| company | text | Company name |
| phone | text | Phone number |
| plan | text | Selected plan (research/core/pro) |
| seats | integer | Number of seats |
| utm_source | text | UTM source |
| utm_medium | text | UTM medium |
| utm_campaign | text | UTM campaign |
| page_url | text | Page URL where checkout started |
| status | text | intent/paid/cancelled |
| stripe_customer_id | text | Stripe customer ID (after payment) |
| stripe_subscription_id | text | Stripe subscription ID (after payment) |
| created_at | timestamp | Created timestamp |
| updated_at | timestamp | Updated timestamp |
| paid_at | timestamp | Payment timestamp |

**New Table: `stripe_events`** (for idempotency)
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| stripe_event_id | text | Stripe event ID (unique) |
| event_type | text | Event type (e.g., checkout.session.completed) |
| processed | boolean | Whether event was processed |
| payload | jsonb | Full event payload |
| created_at | timestamp | Created timestamp |

---

### Step 2: Modify `create-checkout` Edge Function

Update to:
1. Record checkout intent to database
2. Sync to CRM with status "Checkout Started"
3. Capture UTM parameters and page URL
4. Return session ID for tracking

**Key additions:**
- Accept `utm_source`, `utm_medium`, `utm_campaign`, `page_url` from frontend
- Insert into `checkout_intents` table
- Call `sync-lead-to-crm` with extended payload including:
  - All user data (name, email, company, phone)
  - Plan selected, seat count
  - UTM parameters
  - Status: "Checkout Started" / "Intent"
  - Timestamp

---

### Step 3: Update Frontend Signup Form

Modify `SignUp.tsx` to:
1. Capture UTM parameters from URL on page load
2. Pass UTM parameters and current page URL to checkout function

**Key changes:**
- Add `useEffect` to extract UTM params from `window.location.search`
- Include in the `supabase.functions.invoke("create-checkout")` body

---

### Step 4: Create Stripe Webhook Handler Edge Function

**New Edge Function: `stripe-webhook`**

Handles Stripe webhook events, specifically:
- `checkout.session.completed` - Payment successful
- `customer.subscription.created` - Subscription created
- `customer.subscription.updated` - Subscription updated
- `customer.subscription.deleted` - Subscription cancelled

**For `checkout.session.completed`:**

1. **Verify webhook signature** (using `STRIPE_WEBHOOK_SECRET`)
2. **Check idempotency** - Skip if event already processed in `stripe_events`
3. **Extract data** from session:
   - Customer ID, Subscription ID
   - Metadata (firstName, lastName, company, phone, etc.)
   - Price/product info for tier determination
4. **Update database:**
   - Update `checkout_intents` status to "paid"
   - Create/update `companies` record:
     - Set `stripe_customer_id`, `stripe_subscription_id`
     - Set `plan` based on product
     - Set `status` to "active"
     - Set `user_limit` based on seat count
   - Create/update `users` record linked to company
5. **Notify CRM:**
   - Call `sync-lead-to-crm` with:
     - Status: "Paid"
     - Stripe customer ID
     - Stripe subscription ID
     - Deal stage update info
6. **Mark event processed** in `stripe_events`

---

### Step 5: Update `sync-lead-to-crm` Edge Function

Extend payload format to support:
- Checkout status (Intent / Paid / Cancelled)
- Stripe IDs (customer, subscription)
- Plan/tier information
- Seat count
- UTM data

**Updated CRM payload structure:**
```json
{
  "company_name": "Acme Inc",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@acme.com",
  "phone": "555-1234",
  "source": "website",
  "status": "Checkout Started",  // or "Paid"
  "plan": "pro",
  "seats": 5,
  "stripe_customer_id": "cus_xxx",
  "stripe_subscription_id": "sub_xxx",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "spring2026",
  "page_url": "https://gaapio.com/signup"
}
```

---

### Step 6: Configure Stripe Webhook

**You will need to configure this in Stripe Dashboard:**

1. Go to Stripe Dashboard -> Developers -> Webhooks
2. Add endpoint: `https://bxojxrcerefklsrqkmrs.supabase.co/functions/v1/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret
5. Store as `STRIPE_WEBHOOK_SECRET` in Supabase secrets

---

### Step 7: Add Webhook Secret

A new secret will be required:
- **STRIPE_WEBHOOK_SECRET** - For verifying Stripe webhook signatures

---

## Technical Details

### Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/stripe-webhook/index.ts` | Handle Stripe webhook events |

### Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/create-checkout/index.ts` | Add checkout intent tracking and CRM sync |
| `supabase/functions/sync-lead-to-crm/index.ts` | Support extended payload with status/Stripe IDs |
| `src/pages/SignUp.tsx` | Capture and pass UTM parameters |
| `supabase/config.toml` | Register new edge function |

### Database Migrations

| Migration | Purpose |
|-----------|---------|
| Create `checkout_intents` table | Track checkout attempts |
| Create `stripe_events` table | Event idempotency |
| Add indexes for performance | On email, stripe_session_id, stripe_event_id |

---

## Event Flow Summary

### Flow 1: Checkout Started (Intent)

1. User fills form, clicks "Continue to Payment"
2. Frontend calls `create-checkout` with form data + UTM + page URL
3. `create-checkout`:
   - Creates Stripe checkout session
   - Inserts into `checkout_intents` with status "intent"
   - Calls `sync-lead-to-crm` with status "Checkout Started"
   - Returns checkout URL
4. User redirected to Stripe

### Flow 2: Payment Success (Conversion)

1. User completes payment on Stripe
2. Stripe sends webhook to `stripe-webhook`
3. `stripe-webhook`:
   - Verifies signature
   - Checks idempotency
   - Updates `checkout_intents` to status "paid"
   - Creates/updates `companies` with Stripe IDs and active status
   - Creates/updates `users` linked to company
   - Calls `sync-lead-to-crm` with status "Paid" + Stripe IDs
   - Records event for idempotency
4. User sees success page (redirect is just UX, webhook is source of truth)

---

## Product Provisioning Notes

The webhook will handle basic provisioning:
- **Company record**: Created with plan, seat limit, active status
- **User record**: Created and linked to company
- **Stripe IDs**: Stored for future reference

For full product access (your actual app), you mentioned this might need setup in your product. The webhook can:
1. Create records in your website database
2. Optionally call another webhook to your product's API for full provisioning

If your product has its own user/org management, we can add an additional webhook call to provision there.

---

## Dependencies & Prerequisites

1. **STRIPE_WEBHOOK_SECRET** - New secret needed from Stripe Dashboard
2. **Stripe Dashboard Configuration** - Webhook endpoint must be added manually
3. **CRM Compatibility** - Verify your CRM webhook can accept the extended payload fields

