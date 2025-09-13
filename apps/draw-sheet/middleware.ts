import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
// import { JWT_SECRET } from "@repo/backend-common/backend-common"
const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
    const cookie = req.cookies.get("authToken")?.value;
    const { pathname } = req.nextUrl

    if (!cookie) {
        if (pathname === '/' || pathname === '/signup' || pathname === '/signin' || pathname === '/forgot-password') return NextResponse.next()
        return NextResponse.redirect(new URL('/signin', req.url))
    }
    try {
        const validateCookie = jwtVerify(cookie, new TextEncoder().encode(JWT_SECRET))
        if (pathname === '/signup' || pathname === '/signin' || pathname === '/forgot-password') return NextResponse.redirect(new URL('/sheets', req.url))
        return NextResponse.next()
    } catch (error) {
        console.error("JWT Verification Failed:", error);
        return NextResponse.redirect(new URL("/signin", req.url));
    }

}

export const config = {
    matcher: ["/sheets", '/sheets/:sheet*', "/signin", "/signup" , "/forgot-password"],
};
