import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from './libs/supabase/middleware'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    await updateSession(request)
    return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/about/:path*',


        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
}