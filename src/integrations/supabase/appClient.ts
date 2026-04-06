import { createClient } from '@supabase/supabase-js';

/**
 * Gaapio **application** Supabase project (e.g. SEC comment letters and other app data).
 * Do not use for marketing-site tables (blog, auth, admin, etc.) — use `supabase` from `./client`.
 */
const DEFAULT_APP_SUPABASE_URL = 'https://pcujepwgtvxhwguqekpu.supabase.co';
const DEFAULT_APP_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdWplcHdndHZ4aHdndXFla3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNzM4MjQsImV4cCI6MjA4MTY0OTgyNH0.-QfS-rOp8IL6VFDUlsCMBHIaoFj7ILROrO2RWtBALCU';

function firstNonEmpty(...candidates: (string | undefined)[]): string {
  for (const c of candidates) {
    const t = typeof c === 'string' ? c.trim() : '';
    if (t) return t;
  }
  return '';
}

const APP_SUPABASE_URL =
  firstNonEmpty(import.meta.env.VITE_APP_SUPABASE_URL) || DEFAULT_APP_SUPABASE_URL;

const APP_SUPABASE_ANON_KEY =
  firstNonEmpty(import.meta.env.VITE_APP_SUPABASE_ANON_KEY) || DEFAULT_APP_SUPABASE_ANON_KEY;

export const appSupabase = createClient(APP_SUPABASE_URL, APP_SUPABASE_ANON_KEY);
