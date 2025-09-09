import { SignIn_User_URL } from "@repo/config/URL";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json();        
        const backendRes = await fetch(SignIn_User_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body)
        });

        const data = await backendRes.json();

        const newCookie = backendRes.headers.get("Set-Cookie")!;

        console.log("newCookie" , newCookie);

        return NextResponse.json(data, { status: data?.status || backendRes.status , headers: { "Set-Cookie": newCookie || "" } });
    } catch (error) {
        console.error("Sign in error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}