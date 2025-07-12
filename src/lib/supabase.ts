import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DAMDA_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_DAMDA_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);