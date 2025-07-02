"use client"

import React from 'react'
import { supabase } from '@/libs/supabase/client';
import type { Session, AuthError } from '@supabase/supabase-js';

export default function useSessionRedirect() {
    const [session, setSession] = React.useState<Session | null>(null);
    const [error, setError] = React.useState<AuthError | null>(null);

    React.useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession()

            if (error) {
                setError(error)
            }

            if (data?.session) {
                setSession(data.session)
            } else {
                setError(error)
            }
        }
        checkSession()

    }, [])

    return { session, error }
}