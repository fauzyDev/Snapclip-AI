import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SUPABASE_URL, SUPABASE_KEY } from '@/config/env';

const url: string = SUPABASE_URL;
const key: string = SUPABASE_KEY;

export async function createClientServer() {
  const cookieStore = await cookies()

  return createServerClient(url, key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          } 
        },
      },
    }
  )
}