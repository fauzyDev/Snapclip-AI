"use client"

import React from 'react'
import { supabase } from '@/libs/supabase/client';
import { Session } from '@supabase/supabase-js';

export default function useSessionRedirect() {
    const [session, setSession] = React.useState<Session | null>(null);

    React.useEffect(() => {
        let ignore = false;

        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            if (!ignore) {
                setSession(data.session ?? null)
            }
        }
        checkSession()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
            if (!ignore) {
                setSession(sess)
            }
        })

        return () => {
            ignore = true
            listener.subscription.unsubscribe()
        }

    }, [])

    return { session }
}