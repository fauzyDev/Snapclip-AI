import { NextResponse } from "next/server";
import { createClientServer } from "@/libs/supabase/server";

export async function GET() {
    const supabase = await createClientServer()
    const { data: { user }} = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ message: "Unauthorized"});
    }

    const { data, error } = await supabase
        .from('user_channel')
        .select('channel_id, channel_name')
        .eq('user_id', user.id)

    if (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
    return NextResponse.json({ Success: data }, { status: 200 })
}