import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@/config/env';

const url: string = SUPABASE_URL;
const key: string = SUPABASE_KEY;

export const supabase = createClient(url, key);