import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@repo/backend-common/backend-common";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value;
    const { pathname } = req.nextUrl;

    // console.log("Middleware Token:", token);

    // If user is NOT authenticated, redirect to /signin
    if (!token) {
        if (pathname !== "/signin" && pathname !== "/signup") {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
        return NextResponse.next();
    }

    try {
        // Verify JWT token
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

        // If authenticated user visits /signin or /signup, redirect to dashboard
        if (pathname === "/signin" || pathname === "/signup") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("JWT Verification Failed:", error);
        return NextResponse.redirect(new URL("/signin", req.url));
    }
}

export const config = {
    matcher: ["/dashboard", "/signin", "/signup"],
};
