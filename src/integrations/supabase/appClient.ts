import { createClient } from '@supabase/supabase-js';

const APP_SUPABASE_URL = import.meta.env.VITE_APP_SUPABASE_URL;
const APP_SUPABASE_ANON_KEY = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

export const appSupabase = createClient(APP_SUPABASE_URL, APP_SUPABASE_ANON_KEY);
