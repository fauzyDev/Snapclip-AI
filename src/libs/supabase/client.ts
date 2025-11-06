import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_KEY } from '@/config/env';

const url: string = SUPABASE_URL;
const key: string = SUPABASE_KEY;

export const supabase = createBrowserClient(url, key,
    { 
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    }
);

supabase.auth.onAuthStateChange(async (event) => {
    if (event === "TOKEN_REFRESHED") {
        await supabase.auth.signOut();
        window.location.href = '/login'
    }
})