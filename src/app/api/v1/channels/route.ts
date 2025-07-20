import { NextResponse } from "next/server";
import { supabase } from "@/libs/supabase/client";

export async function GET() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" });
    }

    const { data, error } = await supabase
        .from('user_channel')
        .select('channel_id, channel_name')
        .eq('user_id', session.user.id)

    if (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
    return NextResponse.json({ Success: true }, { status: 200 })
}