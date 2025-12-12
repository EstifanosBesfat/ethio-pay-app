import { createClient } from '@supabase/supabase-js';

// Load keys from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the connection
export const supabase = createClient(supabaseUrl, supabaseKey);