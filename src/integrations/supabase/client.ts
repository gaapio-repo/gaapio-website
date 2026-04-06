import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Marketing **website** Supabase project (bxojx…): blog, auth, admin, forms, etc.
 * For the separate **app** project (comment letters, etc.), use `appSupabase` from `./appClient`.
 */
const DEFAULT_WEB_SUPABASE_URL = 'https://bxojxrcerefklsrqkmrs.supabase.co';
const DEFAULT_WEB_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4b2p4cmNlcmVma2xzcnFrbXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDQwODksImV4cCI6MjA2MDkyMDA4OX0.-zeHbPQbjHG5sHMS6985h_FKcPuPo1yUEU2ucRZHil8';

function firstNonEmpty(...candidates: (string | undefined)[]): string {
  for (const c of candidates) {
    const t = typeof c === 'string' ? c.trim() : '';
    if (t) return t;
  }
  return '';
}

const SUPABASE_URL =
  firstNonEmpty(import.meta.env.VITE_SUPABASE_URL) || DEFAULT_WEB_SUPABASE_URL;

const SUPABASE_ANON_KEY =
  firstNonEmpty(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  DEFAULT_WEB_SUPABASE_ANON_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});