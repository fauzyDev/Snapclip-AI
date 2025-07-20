import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/libs/supabase/client";

export async function POST(req: NextRequest) {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" });
    }

    const body = await req.json();
    const { channels } = body;

    const userId = session.user.id;

    const { error } = await supabase
        .from('user_channel')
        .delete()
        .eq('user_id', userId)

    const { error: insertError } = await supabase
        .from('user_channel')
        .insert(channels.map((ch: any) => ({
            userId,
            channelId: ch.id,
            channelName: ch.name
        }))
    )

    if (insertError) {
        return NextResponse.json({ error: insertError }, { status: 500 })
    }
    return NextResponse.json({ Success: true }, { status: 200 })
}