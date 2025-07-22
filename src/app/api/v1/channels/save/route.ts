import { NextRequest, NextResponse } from "next/server";
import { createClientServer } from "@/libs/supabase/server";

export async function POST(req: NextRequest) {
    const supabase = await createClientServer()
    const { data: { user }} = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ message: "Unauthorized" });
    }

    const body = await req.json();
    console.log('Received data:', body);
    const { channels } = body;

    const user_id = user.id

    const { error } = await supabase
        .from('user_channel')
        .delete()
        .eq('user_id', user_id)

    const { error: insertError } = await supabase
        .from('user_channel')
        .insert(channels.map((ch: any) => ({
            user_id,
            channel_id: ch.id,
            channel_name: ch.name
        }))
    )

    if (insertError) {
        return NextResponse.json({ error: insertError }, { status: 500 })
    }
    return NextResponse.json({ Success: true }, { status: 200 })
}