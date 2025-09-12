import { SignOut_User_URL } from "@repo/config/URL";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const backendRes = await fetch(SignOut_User_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await backendRes.json();

        const response = NextResponse.json(data, {
            status: data?.status || backendRes.status,
        });

        response.cookies.delete("authToken");

        response.cookies.set("authToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // Expire immediately
            path: "/",
        });

        return response;
    } catch (error: any) {
        console.error("Signout error:", error);

        const response = NextResponse.json(
            {
                success: false,
                message: error.message || "Something went wrong during signout",
            },
            { status: 500 }
        );

        response.cookies.delete("authToken");
        response.cookies.set("authToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });

        return response;
    }
}
